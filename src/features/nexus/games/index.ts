import { existingGamesList } from './existingGames'
import { newGamesList } from './newGames'
import { nexusGameMetadataBySlug } from './metadata'
import type { NexusGame, NexusGenre } from './types'

const featuredSlugs = [
  'among-us',
  'tetris',
  'subway-surfers',
  '2048',
  'chess',
  'impostor',
  'smash-karts',
  'krunker-io',
  'shell-shockers',
  'slope-tunnel',
]

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function inferGenre(slug: string): Exclude<NexusGenre, 'all'> {
  const s = slug

  const has = (keywords: string[]) => keywords.some((k) => s.includes(k))

  if (has(['io', 'poxel', 'evowars', 'cuberealm', 'smash-karts', 'krunker', 'shell-shockers', 'fortzone'])) return 'io'
  if (has(['puzzle', 'mahjong', 'word', 'alchemy', '2048', 'tetris', 'chess'])) return 'puzzle'
  if (has(['shooter', 'war', 'battle', 'clash', 'archers', 'aim', 'pixel-warfare'])) return 'action'
  if (has(['drift', 'race', 'simulator', 'truck', 'moto', 'drive', 'stunt', 'traffic', 'karts'])) return 'racing'
  if (has(['obby', 'jumper', 'climber', 'tower', 'run-3', 'geometry', 'parkour'])) return 'platformer'
  if (has(['basketball', 'golf', 'meters', 'billiards', '8-ball'])) return 'sports'
  if (has(['papas', 'tycoon', 'factory', 'farmer', 'mine', 'ants', 'clicker', 'farm'])) return 'simulation'
  if (has(['uno', 'poker', 'mancala', 'among-us', 'family-feud', 'foono'])) return 'board'
  if (has(['adventure', 'runic-curse', 'jacksmith', 'pac-man', 'fireboy'])) return 'adventure'
  if (has(['crossy-road', 'snake', 'slice-master', 'bubble-shooter', 'knife'])) return 'arcade'

  return 'casual'
}

function inferIcon(genre: Exclude<NexusGenre, 'all'>) {
  switch (genre) {
    case 'io':
      return 'fa-globe'
    case 'puzzle':
      return 'fa-puzzle-piece'
    case 'action':
      return 'fa-fighter-jet'
    case 'racing':
      return 'fa-car'
    case 'platformer':
      return 'fa-person-running'
    case 'arcade':
      return 'fa-ghost'
    default:
      return 'fa-gamepad'
  }
}

function getDefaultControls(genre: Exclude<NexusGenre, 'all'>): Array<{ keys: string; action: string }> {
  switch (genre) {
    case 'puzzle':
      return [
        { keys: 'Mouse', action: 'Click / Drag' },
        { keys: 'E', action: 'Menu / Use' },
      ]
    case 'racing':
      return [
        { keys: 'WASD / Arrows', action: 'Drive' },
        { keys: 'Space', action: 'Brake / Action' },
      ]
    case 'sports':
      return [
        { keys: 'WASD / Arrows', action: 'Move' },
        { keys: 'Mouse', action: 'Aim / Action' },
      ]
    default:
      return [
        { keys: 'WASD / Arrows', action: 'Move' },
        { keys: 'Mouse', action: 'Aim / Click' },
        { keys: 'Space', action: 'Action' },
        { keys: 'E', action: 'Interact' },
      ]
  }
}

function getDefaultDescription(title: string) {
  return `Jump in and play ${title}. Explore the mechanics, chase high scores, and have fun.`
}

function getDefaultProTip() {
  return 'Try a few runs to learn patterns and optimize your strategy.'
}

export function buildGames(): NexusGame[] {
  const allGamesData = [...existingGamesList, ...newGamesList]
  const games: NexusGame[] = []
  const processedTitles = new Set<string>()

  let index = 0
  for (const item of allGamesData) {
    const normalizedTitle = item.name.toLowerCase().trim()
    if (processedTitles.has(normalizedTitle)) continue
    processedTitles.add(normalizedTitle)

    const title = item.name
    const url = item.url
    const slug = toSlug(title)
    const genre = inferGenre(slug)
    const rating = (Math.random() * 1.0 + 4.0).toFixed(1)
    const hue = (index * 137.5) % 360
    const featured = featuredSlugs.includes(slug)
    const icon = inferIcon(genre)

    const meta = nexusGameMetadataBySlug[slug]

    games.push({
      id: index,
      title,
      url,
      genre,
      rating,
      slug,
      hue,
      image: null,
      featured,
      icon,
      description: meta?.description ?? getDefaultDescription(title),
      controls: meta?.controls ?? getDefaultControls(genre),
      proTip: meta?.proTip ?? getDefaultProTip(),
    })
    index += 1
  }

  return games
}

export function getFeaturedGames(games: NexusGame[]) {
  return games.filter((g) => g.featured)
}

export function getAllGenres(games: NexusGame[]): NexusGenre[] {
  const set = new Set<string>()
  for (const g of games) set.add(g.genre)

  return ['all', ...Array.from(set).sort()] as NexusGenre[]
}

export type { NexusGame } from './types'
