export type NexusGameMetadata = {
  description: string
  controls: Array<{ keys: string; action: string }>
  proTip: string
}

// Keyed by slug (same slug logic as buildGames())
export const nexusGameMetadataBySlug: Record<string, NexusGameMetadata> = {
  'heroes-assemble': {
    description:
      'Assemble your team of heroes and battle through waves of enemies. Upgrade your characters and unlock powerful abilities to dominate the battlefield.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Click' },
      { keys: 'Space', action: 'Special Ability' },
      { keys: '1-4', action: 'Switch Hero' },
    ],
    proTip: 'Combine different hero abilities for devastating combo attacks!',
  },
  'poxel-io': {
    description:
      'Fast-paced multiplayer voxel shooter. Collect weapons, eliminate opponents, and dominate the arena in this blocky battle royale.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'Shift', action: 'Sprint' },
    ],
    proTip: 'Keep moving to avoid being an easy target!',
  },
  bitcoiner: {
    description:
      'Mine cryptocurrency and build your digital empire. Upgrade your mining rigs and watch your profits soar in this idle clicker game.',
    controls: [
      { keys: 'Mouse', action: 'Click to mine' },
      { keys: 'E', action: 'Shop / Upgrades' },
    ],
    proTip: 'Invest in automation early to maximize passive income!',
  },
  'papas-wingeria': {
    description:
      'Run your own chicken wing restaurant! Take orders, cook wings to perfection, and serve hungry customers in this time management classic.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Memorize customer preferences to earn bigger tips!',
  },
  'the-farmer': {
    description:
      'Build and manage your farming empire from the ground up. Plant crops, raise animals, and expand your agricultural business.',
    controls: [
      { keys: 'Mouse', action: 'Click to interact' },
      { keys: 'E', action: 'Menu / Shop' },
    ],
    proTip: 'Focus on high-value crops early to grow your business faster!',
  },
  jacksmith: {
    description:
      'Forge legendary weapons as a skilled blacksmith donkey. Craft swords, bows, and armor for warriors heading into battle.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Perfect timing on hammer strikes creates better quality weapons!',
  },
  'magic-kingdom-hex-match': {
    description:
      'Match hexagonal tiles in this enchanting puzzle game. Clear the board by sorting and organizing magical gems.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Select' },
    ],
    proTip: 'Plan ahead to avoid getting stuck with unmatchable tiles!',
  },
  'mini-mine': {
    description:
      'Dig deep into the earth to uncover valuable resources. Upgrade your mining equipment and discover rare treasures.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Click' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Upgrade your pickaxe first to mine faster and deeper!',
  },
  'art-of-alchemy-merge-elements': {
    description:
      'Combine elements to discover new items and materials. Start with basic components and unlock hundreds of unique combinations.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag to combine' },
      { keys: 'E', action: 'Menu' },
    ],
    proTip: 'Think logically about how real-world elements combine!',
  },
  'idle-ants': {
    description:
      'Command an army of ants to gather food and expand your colony. Watch as your tiny workers grow into an unstoppable force.',
    controls: [
      { keys: 'Mouse', action: 'Click to collect' },
      { keys: 'E', action: 'Upgrades' },
    ],
    proTip: 'Balance between worker ants and speed upgrades for optimal growth!',
  },
  '100-meters-race': {
    description:
      'Sprint to victory in this fast-paced track and field game. Master the rhythm and beat your best time.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Alternate rapidly to run' },
      { keys: 'Space', action: 'Start' },
    ],
    proTip: 'Find a steady rhythm rather than button mashing for better speed!',
  },
  'neon-planet-idle-clicker': {
    description:
      'Click to generate energy and terraform alien planets. Unlock new worlds and automation upgrades.',
    controls: [
      { keys: 'Mouse', action: 'Click planet' },
      { keys: 'E', action: 'Shop / Upgrades' },
    ],
    proTip: 'Prestige early and often to maximize long-term growth!',
  },
  'ragdoll-archers': {
    description:
      'Physics-based archery combat with ragdoll characters. Aim carefully and watch your opponents tumble.',
    controls: [
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'WASD', action: 'Move' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Aim for headshots for instant kills!',
  },
  skydom: {
    description:
      'Match-3 puzzle adventure set in a magical sky kingdom. Complete levels and unlock power-ups.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag to match' },
      { keys: 'E', action: 'Use power-up' },
    ],
    proTip: 'Create special combos by matching 4 or more gems!',
  },
  'slice-master': {
    description:
      'Slice through objects with perfect timing and precision. Master your cuts to achieve high scores.',
    controls: [
      { keys: 'Mouse', action: 'Click / Hold' },
      { keys: 'Space', action: 'Slice' },
    ],
    proTip: 'Wait for the perfect angle before slicing for maximum points!',
  },
  'pixel-warfare': {
    description:
      'Blocky first-person shooter with multiple game modes. Battle opponents in pixelated combat arenas.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Shift', action: 'Sprint' },
      { keys: 'R', action: 'Reload' },
    ],
    proTip: 'Use cover effectively and aim for headshots!',
  },
  'thief-puzzle': {
    description:
      'Stretch your arm to steal treasures while avoiding guards and obstacles. Solve puzzles with creative thinking.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag arm' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Watch guard patterns before making your move!',
  },
  '8-ball-billiards-classic': {
    description:
      'Classic pool game with realistic physics. Sink all your balls and the 8-ball to win.',
    controls: [
      { keys: 'Mouse', action: 'Aim / Adjust power' },
      { keys: 'Click', action: 'Shoot' },
    ],
    proTip: 'Use english (spin) on the cue ball to control position!',
  },
  'draw-climber': {
    description:
      'Draw legs for your character to overcome obstacles. Adapt your drawings to different terrain types.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag to draw' },
      { keys: 'Space', action: 'Jump' },
    ],
    proTip: 'Change your leg shape for different obstacles - longer for gaps, wider for hills!',
  },
  'cuberealm-io': {
    description:
      'Multiplayer cube battle arena. Collect power-ups and eliminate other players in fast-paced action.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Shift', action: 'Dash' },
    ],
    proTip: 'Control the center of the map for better power-up access!',
  },
  skillwarz: {
    description:
      'Competitive multiplayer shooter with various weapons and abilities. Level up and dominate the battlefield.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Q/E', action: 'Abilities' },
      { keys: 'Shift', action: 'Sprint' },
    ],
    proTip: 'Learn the recoil patterns of each weapon for better accuracy!',
  },
  'guess-their-answer': {
    description:
      'Family Feud-style game where you guess the most popular survey answers. Think like the crowd to win.',
    controls: [
      { keys: 'Mouse', action: 'Click answers' },
      { keys: 'Keyboard', action: 'Type guesses' },
    ],
    proTip: 'Go for the most obvious answers first!',
  },
  'space-waves': {
    description:
      'Navigate through a geometric space tunnel at high speed. Avoid obstacles and test your reflexes.',
    controls: [
      { keys: 'Space / Click', action: 'Ascend' },
      { keys: 'Release', action: 'Descend' },
    ],
    proTip: 'Stay centered in the tunnel for more reaction time!',
  },
}
