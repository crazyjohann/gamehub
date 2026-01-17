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
  'bloxd-io': {
    description:
      'Minecraft-style multiplayer with various game modes including parkour, survival, and creative building.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Look / Break / Place' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'Shift', action: 'Sneak' },
      { keys: 'E', action: 'Inventory' },
    ],
    proTip: 'Practice parkour jumps to improve your movement skills!',
  },
  spearfishing: {
    description:
      'Dive underwater and hunt fish with your spear. Upgrade equipment and catch bigger prey.',
    controls: [
      { keys: 'Mouse', action: 'Aim' },
      { keys: 'Click', action: 'Shoot spear' },
      { keys: 'WASD', action: 'Move' },
    ],
    proTip: 'Lead your shots to account for fish movement!',
  },
  'night-club-security': {
    description:
      "Work as a bouncer and decide who gets into the club. Check IDs and keep troublemakers out.",
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Pay attention to details in IDs - age, expiration, and photo!',
  },
  'real-fishing-simulator': {
    description:
      'Realistic fishing simulation with various locations and fish species. Cast your line and reel in the big one.',
    controls: [
      { keys: 'Mouse', action: 'Cast / Reel' },
      { keys: 'Space', action: 'Set hook' },
      { keys: 'WASD', action: 'Move' },
    ],
    proTip: "Match your lure to the fish species you're targeting!",
  },
  'used-car-dealer-tycoon': {
    description:
      'Buy, fix, and sell used cars for profit. Build your dealership empire from the ground up.',
    controls: [
      { keys: 'Mouse', action: 'Click / Select' },
      { keys: 'WASD', action: 'Move around lot' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Invest in repairs before selling to maximize profit margins!',
  },
  'the-worlds-easyest-game': {
    description:
      "Ironically challenging game that tests your patience and precision. Don't be fooled by the title!",
    controls: [
      { keys: 'Mouse', action: 'Move character' },
      { keys: 'Click', action: 'Interact' },
    ],
    proTip: 'Take your time - rushing leads to mistakes!',
  },
  'ice-fishing': {
    description:
      'Drill holes in frozen lakes and catch fish below the ice. Upgrade your gear for better catches.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Drill / Fish' },
    ],
    proTip: 'Fish near structures under the ice for better catches!',
  },
  'emoji-puzzle': {
    description:
      'Solve puzzles by connecting related emojis. Think creatively about emoji meanings and associations.',
    controls: [
      { keys: 'Mouse', action: 'Click / Drag' },
      { keys: 'E', action: 'Submit' },
    ],
    proTip: 'Think outside the box - connections can be visual or conceptual!',
  },
  'venge-io': {
    description:
      'Fast-paced multiplayer FPS with unique abilities. Choose your character and dominate the arena.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'Shift', action: 'Sprint' },
      { keys: 'Q', action: 'Ability' },
    ],
    proTip: "Learn each character's ability timing for maximum effectiveness!",
  },
  murder: {
    description:
      'Social deduction game where one player is the murderer. Stay alert and survive the night.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Look / Interact' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'E', action: 'Pickup / Shoot' },
    ],
    proTip: 'Watch player behavior - the murderer often acts suspicious!',
  },
  'rocket-bot-royale': {
    description:
      'Battle royale with rocket-powered tanks. Last bot standing wins in this explosive arena.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Space', action: 'Boost' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Use rocket boosts to quickly escape dangerous situations!',
  },
  'boxing-random': {
    description:
      'Wacky physics-based boxing game. Throw punches in randomly generated scenarios.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Space', action: 'Punch' },
    ],
    proTip: 'Time your punches when you have good balance for more power!',
  },
  'sharkosaurus-rampage': {
    description:
      'Play as a prehistoric shark and cause mayhem. Eat everything in sight and grow stronger.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Mouse', action: 'Aim' },
      { keys: 'Space', action: 'Boost' },
    ],
    proTip: 'Attack smaller prey first to build up your health and size!',
  },
  'buildnow-gg': {
    description:
      'Fast-paced building and shooting game. Construct cover and eliminate opponents.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot / Build' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'Q/E/R', action: 'Build structures' },
      { keys: 'Numbers', action: 'Weapon select' },
    ],
    proTip: 'Build cover immediately when shot at!',
  },
  'rooftop-snipers': {
    description:
      'Two-button physics game on rooftops. Knock your opponent off to win.',
    controls: [
      { keys: 'W/I', action: 'Jump' },
      { keys: 'E/O', action: 'Shoot' },
    ],
    proTip: 'Jump shots are harder to predict than ground shots!',
  },
  'big-tower-tiny-square': {
    description:
      'Precision platformer where you navigate through a dangerous tower. One mistake sends you back to the start.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Space', action: 'Jump' },
    ],
    proTip: "Learn from each death - the patterns don't change!",
  },
  'temple-of-boom': {
    description:
      'Cooperative platformer shooter. Work with your partner to blast through ancient temples.',
    controls: [
      { keys: 'WASD', action: 'Move (P1)' },
      { keys: 'Arrows', action: 'Move (P2)' },
      { keys: 'Space/P', action: 'Shoot' },
      { keys: 'E/L', action: 'Bomb' },
    ],
    proTip: 'Communicate with your teammate to coordinate attacks!',
  },
  'penalty-shooters-2': {
    description:
      'Soccer penalty shootout game. Score goals and save shots to win the tournament.',
    controls: [{ keys: 'Mouse', action: 'Aim / Click to shoot/dive' }],
    proTip: "Mix up your shot placement - don't be predictable!",
  },
  'bomber-friends': {
    description:
      'Classic bomberman-style multiplayer game. Blow up opponents and be the last one standing.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Move' },
      { keys: 'Space', action: 'Place bomb' },
    ],
    proTip: 'Trap opponents by cornering them with bombs!',
  },
  'crazy-pixel-apocalypse': {
    description:
      'Blocky zombie shooter with crafting elements. Survive waves of pixelated undead.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'R', action: 'Reload' },
      { keys: 'E', action: 'Interact' },
    ],
    proTip: 'Aim for headshots to conserve ammo!',
  },
  'time-shooter-2': {
    description:
      'Time only moves when you move. Plan your actions carefully in this strategic FPS.',
    controls: [
      { keys: 'WASD', action: 'Move (moves time)' },
      { keys: 'Mouse', action: 'Aim / Shoot' },
      { keys: 'E', action: 'Pickup weapon' },
    ],
    proTip: 'Use slow movement to plan your next action!',
  },
  'taming-io': {
    description:
      'Survival game where you tame animals and build a base. Collect resources and defend against other players.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Aim / Attack' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'E', action: 'Interact / Tame' },
    ],
    proTip: 'Tame defensive animals early to protect your base!',
  },
  polytrack: {
    description:
      'Low-poly racing game with stunt tracks. Complete courses and beat time trials.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Drive' },
      { keys: 'Space', action: 'Handbrake' },
      { keys: 'R', action: 'Reset' },
    ],
    proTip: 'Memorize track layouts for faster times!',
  },
  'night-city-racing': {
    description:
      'Race through neon-lit city streets at night. Drift around corners and outrun opponents.',
    controls: [
      { keys: 'WASD / Arrows', action: 'Drive' },
      { keys: 'Space', action: 'Handbrake' },
      { keys: 'Shift', action: 'Nitro' },
    ],
    proTip: 'Master drifting to maintain speed through turns!',
  },
  'the-impossible-quiz': {
    description:
      'Absurdly difficult trivia game with trick questions. Think outside the box to progress.',
    controls: [
      { keys: 'Mouse', action: 'Click answers' },
      { keys: 'Keyboard', action: 'Type answers' },
    ],
    proTip: 'The answer is rarely what it seems - think creatively!',
  },
  'escape-or-die': {
    description:
      'Escape room puzzle game. Find clues and solve puzzles before time runs out.',
    controls: [
      { keys: 'Mouse', action: 'Click / Interact' },
      { keys: 'E', action: 'Examine' },
    ],
    proTip: 'Click everything - even small details can be important!',
  },
  'skribbl-io': {
    description:
      'Multiplayer drawing and guessing game. Take turns drawing words while others guess.',
    controls: [
      { keys: 'Mouse', action: 'Draw' },
      { keys: 'Keyboard', action: 'Type guesses' },
    ],
    proTip: 'Draw the most recognizable features first!',
  },
  'geometry-dash-online': {
    description:
      'Rhythm-based platformer with extreme difficulty. Jump and fly through geometric obstacles.',
    controls: [
      { keys: 'Space / Click', action: 'Jump' },
      { keys: 'Hold', action: 'Fly (in flight sections)' },
    ],
    proTip: "Listen to the music - it's synced with the obstacles!",
  },
  bloxorz: {
    description:
      'Roll a rectangular block to the goal hole. Plan your path carefully to avoid falling off.',
    controls: [
      { keys: 'Arrow Keys', action: 'Roll block' },
      { keys: 'Space', action: 'Reset' },
    ],
    proTip: 'Think several moves ahead - some paths lead to dead ends!',
  },
  ducklings: {
    description:
      'Guide a family of ducklings to safety. Avoid obstacles and grow your duckling chain.',
    controls: [
      { keys: 'Mouse', action: 'Move' },
      { keys: 'Click', action: 'Speed boost' },
    ],
    proTip: 'Take wide turns to prevent your ducklings from hitting obstacles!',
  },
  'color-tunnel': {
    description:
      'Navigate through a colorful rotating tunnel. Dodge obstacles while maintaining high speed.',
    controls: [{ keys: 'WASD / Arrows', action: 'Move left/right' }],
    proTip: 'Focus on the obstacles ahead, not the tunnel rotation!',
  },
  'mine-clone': {
    description:
      'Minecraft-inspired sandbox game. Mine, craft, and build in an endless blocky world.',
    controls: [
      { keys: 'WASD', action: 'Move' },
      { keys: 'Mouse', action: 'Look / Break / Place' },
      { keys: 'Space', action: 'Jump' },
      { keys: 'Shift', action: 'Sneak' },
      { keys: 'E', action: 'Inventory' },
    ],
    proTip: 'Always carry a crafting table and plenty of wood!',
  },
}
