export type NexusGenre =
  | 'all'
  | 'io'
  | 'puzzle'
  | 'action'
  | 'racing'
  | 'platformer'
  | 'sports'
  | 'simulation'
  | 'board'
  | 'adventure'
  | 'arcade'
  | 'casual'

export type NexusGame = {
  id: number
  title: string
  url: string
  genre: Exclude<NexusGenre, 'all'>
  rating: string
  slug: string
  hue: number
  image: string | null
  featured: boolean
  icon: string
}
