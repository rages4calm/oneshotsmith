import type { ThemePack } from "./schema";

// The exemplar theme pack. Other themes follow this structure and quality bar.

export const DUNGEON_CRAWL: ThemePack = {
  theme: "Dungeon Crawl",
  moduleLetter: "B",

  titlePatterns: [
    "The {adj} {noun}",
    "{noun} of the {adj} King",
    "Beneath {place}",
    "The {noun} Below {place}",
    "In the Halls of the {adj} {noun}",
  ],
  titleAdjectives: ["Sunken", "Shattered", "Nameless", "Silent", "Broken", "Forgotten", "Hollow", "Blighted", "Sealed", "Weeping", "Iron", "Thrice-Cursed"],
  titleNouns: ["Vaults", "Barrow", "Catacombs", "Foundry", "Sanctum", "Warrens", "Reliquary", "Undercroft", "Cistern", "Threshold", "Ossuary", "Deep"],
  taglines: [
    "Some doors were sealed from the outside. This one was sealed from within.",
    "The dead kept excellent records. Someone has been editing them.",
    "Every level down is a century back.",
    "The miners broke through on Thursday. By Friday, no one would say into what.",
    "What sleeps below {place} has started keeping different hours.",
    "They built the shrine to keep something in. The shrine is failing.",
    "Golden rule of deep places: if the torches are already lit, leave.",
    "The map ends where the trouble begins.",
  ],

  sites: [
    {
      names: ["The Undervaults of {place}", "The Old Delve", "The Vaults Below the Millrace"],
      description:
        "A buried complex of pre-imperial stonework beneath {place}, rediscovered when spring floods collapsed a cellar. The upper halls were a mint and treasury; the lower galleries are older, cruder, and were walled off with unusual thoroughness. Cold air moves through it in slow tides, as if the place is breathing.",
      roomLabels: ["Collapsed cellar stair", "Counting hall", "Flooded gallery", "Iron door landing", "Mint workshop", "Guard alcove", "Cistern walk", "Toppled archive", "Smelting pit", "Sealed shrine", "Warded vault", "Bone niche", "Drowned stair", "Echoing rotunda"],
      terrain: ["waist-deep black water that douses dropped torches", "collapsed masonry giving half cover", "a narrow ledge over the smelting pit", "rows of mint-presses forming tight lanes"],
    },
    {
      names: ["The Barrowfields Crypt", "The Tomb of the Nine Banners", "The Kings' Rest at {place}"],
      description:
        "A royal barrow complex in the hills above {place}, nine burial halls arranged like spokes around a central shrine. Grave-goods lie untouched under centuries of dust — which is precisely what worries the barrow-wardens, because three nights ago the offering bowls started emptying themselves.",
      roomLabels: ["Processional gate", "Hall of banners", "Warden's cell", "Offering rotunda", "First barrow", "Collapsed spoke", "False tomb", "Embalming room", "Coin niche", "The long stair", "Shield wall", "King's hall", "Weeping wall", "Robbers' tunnel"],
      terrain: ["sarcophagi in ranks giving full cover", "grave-dust that billows into obscuring clouds", "a ceremonial trench splitting the floor", "burial goods that clatter underfoot, ruining stealth"],
    },
    {
      names: ["The Drowned Foundry", "The Forgeworks Under the Falls", "The Old Works at {place}"],
      description:
        "A dwarven foundry built into the cliff behind a waterfall near {place}, abandoned after 'the accident' three generations ago. The waterwheels still turn, which means the hammers still fall, somewhere deep — one strike every thirteen heartbeats, all day, all night. Lately, the rhythm has been getting faster.",
      roomLabels: ["Wheelhouse", "Soaked gantry", "Pattern shop", "Great hammer hall", "Quenching pools", "Master's office", "Ore stores", "Chain locker", "Broken lift", "Slag chute", "Ledger room", "The hot gallery", "Tool crypt", "Overseer's walk"],
      terrain: ["swinging chain hoists overhead", "quenching pools of scalding water", "a foreman's gantry running above the floor", "the great hammer falling on a fixed rhythm across the center of the room"],
    },
    {
      names: ["The Sunken Cloister", "The Priory of the Last Lamp", "The Cloisters Below the Fen"],
      description:
        "A monastery that the fen swallowed a lifetime ago, its bell tower still visible at low water. The order kept a lamp burning against something they never named in their letters. Fisherfolk from {place} say the lamp went out on the new moon — and that the bell has been ringing from underwater ever since.",
      roomLabels: ["Bell tower stair", "Drowned nave", "Scriptorium", "Refectory", "Lamp shrine", "Abbot's cell", "Flooded cloister walk", "Reliquary", "Kitchen undercroft", "Night stair", "Penitent's cell", "Chapter house", "Silted crypt", "The lamp room"],
      terrain: ["silt beds that grab boots (difficult terrain)", "pews rotted to sudden pitfalls", "stained-glass light making false floors of the water", "the great bell's rope, temptingly pullable"],
    },
  ],

  hooks: [
    {
      readAloud:
        "The magistrate's seal is still warm on the writ in your hands. Behind her desk, through the window, you can see the boarded-up wellhouse and the two very bored guards pretending it needs two guards. 'Nine days ago we lowered a lamp on sixty feet of rope,' she says. 'It came back up lit. Different lamp.'",
      summary:
        "{patron}, magistrate of {place}, hires the party to enter {site}, learn what's inside, and make it stop. Payment: 50 gp each now, the same on return, and salvage rights to anything without an heir.",
    },
    {
      readAloud:
        "The dwarf buys your table a round before she says a word, which in your experience means the job is terrible. 'My grandmother's crew sealed {site},' she finally says, turning her tankard. 'Sealed it, sang the rites, swore the oaths. Last week her signet ring turned up in a pawnshop in {place}. She was buried wearing it.'",
      summary:
        "{patron} wants the party to find how her grandmother's sealed delve was breached and by whom. She can provide the original survey map (the map handout) but insists on one rule: bring back the ring's finger too.",
    },
    {
      readAloud:
        "The survivor is maybe sixteen, wrapped in three blankets, and will not let go of the chair leg he carried out of the dark. 'We only wanted the coins,' he keeps saying. 'The floor of coins. But the coins were a skin over something, and Petya stepped wrong, and it opened its—' He stops. He starts again. 'We only wanted the coins.'",
      summary:
        "A crew of treasure-hunters from {place} broke into {site} and only one came back. The boy's mother, {patron}, begs the party to recover her other son — or what remains — and offers the family's heirloom blade as payment.",
    },
    {
      readAloud:
        "The letter found you at the {tavern}, sealed with wax the color of a bruise. Inside, in a scholar's hand: 'The survey lied. The lower galleries are not empty. I have gone down to prove it and if you are reading this I have been gone nine days. The stair behind the smelting pit. Bring rope. Bring more rope than that.' It is signed {patron}.",
      summary:
        "The antiquarian {patron} descended into {site} alone and left instructions for whoever came asking. Their academy will pay handsomely for their return — and quietly double it for their field journal.",
    },
    {
      readAloud:
        "They emptied the shrine at {place} last night — every relic, every silver offering bowl, gone. But the thieves left tracks a child could follow, heavy and dragging, straight across the fields toward the old sealed door in the hillside. The priest looks at you and says the difficult part out loud: 'Nothing walked INTO the shrine. The tracks only lead away.'",
      summary:
        "Something from {site} is raiding the surface by night. The village priest {patron} offers the shrine's remaining treasury to whoever follows the tracks down and ends the visits.",
    },
    {
      readAloud:
        "The auction sheet reads: 'LOT 34 — one iron key, provenance unknown, recovered {place}.' The bidding war between the calm man in gray and the sweating cultist tells you everything about lot 34. When the gray man wins, the cultist follows him out. When you follow the cultist, you find the gray man dead in the alley, keyless, with a wax rubbing of a door in his coat and one word written beneath it: HURRY.",
      summary:
        "The key to {site}'s inner vault is loose in {place}, and at least two factions are killing for it. The dead man's rubbing marks the door it opens. Whoever holds the key controls what's behind it — or lets it out.",
    },
  ],
  hookAlternates: [
    "A reward poster: 200 gp for the sigil-stone of {site}, no questions — posted by three different people, three different reasons.",
    "One of the party inherits a deed to {site} from a relative they've never heard of, with taxes shockingly overdue.",
    "The cult that {villain} broke away from wants their property back and hires the party without mentioning any of that.",
  ],

  villains: [
    {
      epithets: ["the Unforgiven", "Keeper of the Ninth Seal", "the Oathbreaker Below"],
      motivation: "Was entombed as a warden and has decided, after centuries of listening to the surface through the stones, that the living have not earned the protection.",
      plan: "Break the remaining seals of {site} one by one, using stolen relics as sacrifices, until the thing the wards contain can be bargained with — with {place} as the opening offer.",
      secret: "The final seal can only be broken by a willing living soul — every raid, every horror, is stage-setting to make one desperate hero volunteer.",
      mannerism: "Speaks in the plural ('we kept the watch, we were forgotten') and pauses mid-sentence to listen to something no one else hears.",
      bossTags: ["undead"],
    },
    {
      epithets: ["the Reclaimer", "Last Heir of the Deep Charter", "the Rightful"],
      motivation: "Genuinely, documentedly, is the legal heir to {site} — and has concluded that hired monsters are cheaper than lawyers and considerably more loyal.",
      plan: "Drive off or devour every trespasser, reopen the old works in secret, and present {place} with a functioning fortress-economy it can't afford to refuse.",
      secret: "The 'accident' that closed {site} generations ago was caused by their ancestor, and proof is still down there in the master's ledger — the one thing they truly want destroyed.",
      mannerism: "Quotes clauses of the original charter from memory, with citations, while people are fighting for their lives.",
    },
    {
      epithets: ["the Tidewarden", "Voice of the Flooded Court", "the Patient"],
      motivation: "Serves something old and drowned that pays for devotion in visions, and the visions have started showing a date.",
      plan: "Redirect the waters — the cistern, the falls, the fen — until the lower galleries of {site} flood completely and what sleeps there can finally move.",
      secret: "The flooding is ahead of schedule because the villain's own crew keeps drowning, and the drowned keep working.",
      mannerism: "Perpetually damp; leaves wet footprints even on dry stone; smiles at the sound of dripping water.",
      bossTags: ["caster", "undead"],
    },
    {
      epithets: ["the Collector of Doors", "the Gray Surveyor", "Cartographer of the Lost"],
      motivation: "Believes every sealed door is a debt the world owes them personally, and has a ring of stolen keys to prove it.",
      plan: "Loot {site} methodically — the crew, the tools, and the timetable of a mining operation — and sell the warding relics that keep the place quiet to buyers who should never have them.",
      secret: "They know exactly what the wards hold back, they simply believe they'll be three kingdoms away when it gets out — and they keep a fast horse saddled at all times because of it.",
      mannerism: "Sketches constantly in a field journal; measures rooms by pacing during conversations; corrects other people's directions.",
      bossTags: ["leader", "humanoid"],
    },
    {
      epithets: ["the Below-Bishop", "Shepherd of the Waking Stone", "the Kneeling King"],
      motivation: "Found religion in the worst possible place: something under {site} spoke back.",
      plan: "Convert the desperate of {place} into a congregation, feed the sanctum's hunger on schedule, and earn the promised 'inheritance' — dominion over everything the deep places touch.",
      secret: "The voice stopped answering weeks ago; the escalating rituals are the increasingly frantic knocking of a man abandoned by his god.",
      mannerism: "Blesses opponents mid-combat with absolute sincerity; keeps thanking people for 'attending.'",
      bossTags: ["caster", "leader"],
    },
  ],

  twists: [
    "The wards of {site} aren't keeping something in — they're keeping the site itself asleep. The dungeon is the creature, and the 'rooms' the party has been walking through are only where it dreams thinnest.",
    "{patron} knew exactly what was down here. The party was never meant to succeed — they were meant to be a measured offering, and the real expedition is one day behind them.",
    "The monsters are the previous adventuring party. The transformation takes about nine days, and it is already starting in whoever touched the relic first.",
    "The seals were failing on their own; {villain} is actually re-closing them in the only brutal way they know. Killing the villain without finishing the work unleashes everything.",
    "The treasure vault is real and untouched — because it is bait. The site was built as a trap for the greedy by something that farms ambition, and the vault door counts everyone who enters.",
    "Every level of {site} is a century deep, literally: time runs slower below. The 'ancient' lower halls are still inhabited by the original builders, one desperate hour into their catastrophe.",
    "{villain} is already dead and doesn't know it. The wards animate a caretaker; the caretaker believes it is still the person it was. Proof of their death, presented kindly, may end this without a fight.",
    "The thing below has been paying {place} for silence for generations — the town's prosperity is the salary of its secret-keeping, and the town council would very much like the party to stop investigating.",
  ],

  cluePool: [
    "Fresh tallow drippings on stairs no one admits to descending — someone lights the way down regularly.",
    "The rats climb OVER each other to flee upward past the party, and they are all soaking wet.",
    "A dead explorer's journal, final entry: 'The count is wrong. Nine doors on the map. We have closed ten.'",
    "Coin from the vaults is circulating in {place} — minted centuries ago, edges still sharp, smelling faintly of the sea.",
    "Chalk tally-marks inside the entrance: a fresh group of five went down recently. Only tally-marks for four came back past this point.",
    "The warding sigils are being cleaned, not vandalized — someone is maintaining them with expert care and the wrong intentions.",
    "{villain}'s abandoned camp: bedrolls for six, journals for one, and five sets of gear too neatly stacked to be voluntary.",
    "An offering bowl licked mirror-clean, set precisely in the center of a doorway, facing DOWN the corridor.",
    "Scratched into the wall at knee height, in a child's hand, dated this spring: 'the singing is louder on wet days.'",
    "The architecture changes mid-corridor: mortared stone gives way to seamless carved rock, and the carved sections have no tool marks at all.",
    "A prayer-strip nailed to a doorframe upside down — the old miners' sign for 'abandon this gallery, do not ask.'",
    "{patron}'s map is accurate everywhere except one hall, drawn at half its true size, in different ink.",
  ],

  monsterTags: ["dungeon"],
  bossTags: ["boss"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "The Threshold",
        readAloud:
          "The entrance to {site} exhales cold air that tastes of iron and old rain. Someone has been here recently: the vines are cut, not torn, and a lantern hook has been screwed into the stone — polished bright by use. From below, very faintly, comes a sound you each privately decide is water.",
        summary:
          "The descent into {site}. Establish the dungeon's mood, give the party their first choice of route, and plant the first clue.",
        details: [
          "Two ways down: the main stair (faster, and something knows it — note the tripwire at the ninth step, DC 13 Perception) or the collapsed side passage (slow, safe, exits at map area 2).",
          "The lantern hook and cut vines are recent — DC 12 Survival dates them within a week and counts at least four visitors.",
          "First clue lands here (see Secrets & Clues). Let whoever scouts find it; reward caution with information.",
          "If the party is loud here, the first encounter in area 2 is ready and waiting instead of surprised.",
        ],
      },
      {
        type: "arrival",
        title: "The Door That Was Opened",
        readAloud:
          "The famous seal of {site} — the one on the woodcuts, the one in the warning rhymes — lies in pieces. Not smashed: dismantled. Each fragment has been set down in order along the wall like a scholar's exhibit, and the crowbar left leaning beside them is polished from long, patient use.",
        summary:
          "The party arrives to find the legendary seal already open, methodically. Whoever did this was careful, funded, and unhurried.",
        details: [
          "DC 13 Investigation on the fragments: the seal was opened over weeks, from the OUTSIDE, by someone who understood it.",
          "The crowbar bears a maker's mark from {place} — traceable later, ties to {villain}'s operation.",
          "Beyond the door, the dust holds a clean record: booted feet in, booted feet out, many times. One set of prints stops appearing on the way out.",
          "This is the safest room in the dungeon. Say nothing to suggest that; let them fortify a place nothing will attack.",
        ],
      },
      {
        type: "arrival",
        title: "Lowered on Ropes",
        readAloud:
          "Sixty feet of rope creaks above you as the winch pays out and the circle of daylight shrinks to a coin. The shaft walls change as you sink — brick, then cut stone, then stone that was never cut but grew this way. When your boots finally touch bottom, the rope goes slack a half-second before it should, as if something above let go early.",
        summary:
          "A vertical insertion into {site} via the old shaft. The rope is the party's lifeline home; the dungeon knows that too.",
        details: [
          "Descending quietly requires a DC 12 group Athletics or Acrobatics check; failure means noise, and noise means the first encounter converges.",
          "The winch team topside ({patron}'s people) will haul up anyone who tugs three times — a genuine escape valve. Cutting or guarding the rope becomes a live tactical question later.",
          "At the bottom: a previous visitor's boot, laced, standing upright. DC 10 Medicine confirms nothing was in it when it was left. Standing upright. Laced.",
        ],
      },
    ],

    middle: [
      {
        type: "combat",
        title: "The Toll",
        readAloud:
          "The corridor widens into a hall where the dust is disturbed in a wide fan, as if the room is swept daily by something broad and slow. Coins, buttons, and one silver ring have been arranged along a crack in the floor in a dead-straight line — a toll paid at a border you can't see.",
        summary:
          "The site's inhabitants have a border, and the party is at it. First real fight — the toll-keepers collect from those who cross without paying.",
        details: [
          "Any character who places something of real value on the line may cross unbothered — this once. The creatures remember faces.",
          "The fight starts when someone crosses without paying, takes from the line, or attacks. Never explain the rule; the arrangement of the toll IS the explanation.",
          "Mid-fight reinforcement: on round 3, half the remaining foes peel off and retreat with the toll — they are on a schedule, and that fact is a clue.",
        ],
        combat: {
          tactics: "They fight to drive back, not to kill: shoving into the entry corridor, blocking the line. If reduced below half strength they retreat in order, taking the toll with them.",
          terrain: "the toll line splits the room; crossing it is what everything here reacts to",
        },
      },
      {
        type: "combat",
        title: "Nest in the Works",
        readAloud:
          "Something has made a home in this chamber and furnished it with the missing: bedrolls, packs, a cook-pot, all sorted into tidy heaps — cloth here, metal there, boots in a row by size. Whatever lives here is a keeper of things. From the dark beyond the heaps, several somethings shift their weight at once.",
        summary:
          "A lair fight in a room full of the previous expeditions' gear. The loot is real, and it is also the floor of the arena.",
        details: [
          "The sorted gear includes a previous adventurer's pack with a healing potion and a map fragment correcting {patron}'s map (reveals one unkeyed room).",
          "Fighting among the heaps: piles are difficult terrain, but a shove can topple a heap onto a foe (DC 12 Athletics, prone).",
          "The creatures defend the hoard, not the room — carry off a heap and half of them follow it, splitting the fight.",
        ],
        combat: {
          tactics: "They fight from behind the heaps, using them as cover, and target whoever carries the most interesting-looking equipment first — collectors recognize collectors.",
          terrain: "sorted heaps of stolen gear: half cover everywhere, difficult terrain, and topple-able",
        },
      },
      {
        type: "skill",
        title: "The Flooded Crossing",
        readAloud:
          "The gallery ahead is a black mirror — flooded to the waist, maybe deeper where the floor has settled. A rope crosses it at chest height, anchored to iron rings someone hammered in long ago. Halfway across, tied to the rope with a neat bowline, a lantern hangs an inch above its own reflection, still burning.",
        summary:
          "A hazard crossing that punishes carelessness and rewards planning. The lantern is bait and light source both.",
        details: [
          "The still-burning lantern was left by {villain}'s crew within the hour — the oil reservoir gives it away (DC 12 Investigation from the rope).",
          "Something lives in the water. It takes stragglers and the last in line, never the first. Foreshadow with a wake, a ripple against the current.",
          "Crossing loud or slow triggers one attack from below per straggler rather than a full encounter — wounds and dread, not a set-piece.",
        ],
        skill: {
          description: "Cross the flooded gallery without losing gear, light, or blood.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "haul along the rope with packs held high" },
            { skill: "Acrobatics", tier: "medium", use: "walk the submerged ledge, felt for by toe" },
            { skill: "Survival", tier: "easy", use: "read the water for the safe line and the wake that isn't current" },
            { skill: "Perception", tier: "medium", use: "watch the lantern's reflection for the moment something occludes it" },
          ],
          success: "The party crosses wet but whole, and learns from the lantern that they are an hour behind {villain}'s people.",
          failure: "Each failure: a pack goes under (retrievable, at a cost), a light drowns, or the thing below takes a bite — 2d6 piercing and a story.",
        },
      },
      {
        type: "exploration",
        title: "The Archive of the Keepers",
        readAloud:
          "Shelves cut into living rock hold ledgers, tablets, and scroll-tubes, all facing spine-out, all perfectly ordered — except one shelf, swept violently empty, its contents scattered face-down across the floor like a struck man's teeth. Every scattered page shows the same thing: a door, drawn over and over, by different hands, across different centuries.",
        summary:
          "The dungeon's memory. Research here answers questions the party hasn't thought to ask yet — and reveals what {villain} came here to take.",
        details: [
          "One hour and a DC 13 Investigation or History assembles the truth: what {site} held, how the wards work, and one fact about {villain}'s goal the villain doesn't know the party knows (pick a clue).",
          "The swept shelf held the founding charter — {villain}'s crew took it. What they missed, face-down under the table: the charter's DRAFT, with the crossed-out clauses. The differences are the secret.",
          "A careful listener (passive Perception 14+) notices the room eats echoes — no sound carries out of it. The one safe place to argue loudly.",
          "Taking ledgers off-site is fine. Re-shelving them wrong is not. Something tidies this room, and it holds grudges (later, it un-tidies the party's camp in return — no damage, maximum dread).",
        ],
      },
      {
        type: "social",
        title: "The One Who Stayed Behind",
        readAloud:
          "The barricade across the alcove is professional: braced, wedged, loopholed. Behind it, by the light of a shuttered lantern, someone has been living — neatly, desperately, and for some time. A voice from the dark says, with impressive steadiness: 'Password changes daily. Today's is: I don't have one, please don't be what I think you are.'",
        summary:
          "A survivor from an earlier expedition, holed up and rationing hope. They know the dungeon's habits — and one crucial thing about {villain} — but getting them to leave means winning an argument with their fear.",
        details: [
          "They know: the safe rooms, the toll rule, what the sounds mean at different hours, and that {villain}'s crew passed through recently, 'walking like people who had stopped being afraid, which down here means something is wrong with them.'",
          "They will NOT leave without their companion's signet, lost deeper in (place it in any later room — a free, humane side-objective).",
          "DC 13 Persuasion (or any genuinely kind gesture, no roll needed) recruits them as a guide to the next keyed area; Intimidation works instantly and means they bolt for the surface at the first fight.",
          "If asked how they've survived: 'I pay the toll. I re-shelve the books. I don't sing.' They will not explain the third rule.",
        ],
      },
      {
        type: "setpiece",
        title: "The Hall of the Great Engine",
        readAloud:
          "The chamber is dominated by the engine the whole site was built to serve — wheel, chain, hammer, counterweight — and it is RUNNING. Chains thick as a man rise into darkness, descending weights glide past ascending ones, and the great hammer falls on its ancient rhythm. On the far gantry, silhouetted by forge-light, figures are feeding something into the mechanism, sheet by sheet. It looks like paper. It is the charter.",
        summary:
          "The set-piece: a fight across a live machine while {villain}'s lieutenants destroy evidence in it. Two objectives, one countdown, everything moving.",
        details: [
          "The lieutenants feed one charter page into the works per round — after round 5, the proof of {villain}'s secret is gone and the endgame hardens.",
          "The machine is terrain, hazard, and weapon: the hammer falls on a fixed 2-round rhythm across the center (called shot of the room — DC 13 DEX or 4d10 bludgeoning, announced one round ahead).",
          "Riding the counterweights to the gantry is one move action and a DC 12 Athletics — the fast, loud, glorious route. The stairs are three rounds of cover-to-cover — the slow, sane one.",
          "Throwing the brake lever (on the gantry) stops the hammer AND the page-feeding — and wakes everything in the site that sleeps to the rhythm. Choose loudly.",
        ],
        combat: {
          tactics: "The lieutenants split: half hold the stairs with ranged fire, half keep feeding pages. If the brake is thrown, everything disengages and withdraws — the noise coming afterward frightens THEM too.",
          terrain: "a running siege of chains, counterweights, and the great hammer's announced, survivable, room-splitting rhythm",
        },
      },
      {
        type: "exploration",
        title: "The False Vault",
        readAloud:
          "The vault door stands open on a room of treasure so perfect it belongs on a tapestry: chests with their lids thrown back, coin in drifts, a crown on a velvet stand. Nothing is dusty. Nothing is tarnished. In a place where you have seen what centuries do to everything else, this room has decided to be beautiful, and that decision feels like being watched.",
        summary:
          "The dungeon's honeypot. The treasure is real enough to bank — and taking it is how the site marks its prey.",
        details: [
          "The treasure is genuine (add one parcel from the Treasure section if looted). The trap is not mechanical: everything taken from this room can be FELT by the site's master, wherever it goes. The party is now trackable — reveal via increasingly precise ambushes.",
          "DC 15 Arcana on the crown's stand: the velvet is new. Someone restocks this room. The obvious question — from what? — has an upsetting answer available in the ledger room.",
          "A character who takes nothing may notice (DC 13 Insight) the room's regard move off them like a light — and settle on whoever pocketed the most.",
          "This is deliberately skippable. If time is short, its treasure appears in the climax chamber instead.",
        ],
      },
      {
        type: "combat",
        title: "What Sleeps to the Rhythm",
        readAloud:
          "The passage opens into a gallery of alcoves, and the alcoves are occupied. They stand in rows in the dark — still as the statues you briefly hope they are — each facing out, each an arm's length from the walkway you have no choice but to use. As you watch, in perfect unison, all of them exhale.",
        summary:
          "A gauntlet fight the party starts on their own terms — or tiptoes through and saves for the worst possible moment. Waking one wakes a wave.",
        details: [
          "Sneaking the walkway is a group Stealth (DC 12); each failure wakes one alcove's worth. Total silence is possible and should feel like a heist.",
          "Light does not wake them. Sound does. A dropped coin is one; a fight is all of them, in waves of three per round.",
          "They do not pursue past the gallery door — they cannot leave the rhythm's range, and clever parties can weaponize that line on the floor.",
          "If the great engine's brake was thrown earlier: they are ALL awake when the party arrives, and standing in the walkway. Actions have echoes.",
        ],
        combat: {
          tactics: "Wave discipline: three wake per round of noise, converging on the loudest point. They stop dead at the gallery threshold as if against glass.",
          terrain: "a narrow walkway between occupied alcoves; every square is adjacent to something that might wake",
        },
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "The Warden's Confession",
        readAloud:
          "This room was a shrine, then an office, then a cell, and the walls confess all three: painted prayers, then shelf-brackets, then scratched tally-years in groups of five, hundreds of them. At a desk of stacked flagstones sits the room's last occupant — long past harm, hands folded, posture straight — before a single sheet of vellum weighted with a warden's seal. The first line reads: 'To whoever is sent when the seals fail. We must apologize. We knew.'",
        summary:
          "The truth room. The confession lays out what {site} really holds, what the wards cost, and exactly what {villain}'s plan will unleash — reframing the finale from a fight into a choice.",
        details: [
          "Read the confession as the twist reveal (see The Twist). It is written to be believed: names, dates, and one testable claim the party can verify within sight of this room.",
          "The seal on the vellum is the last working warden's seal — carrying it grants one-time safe passage through the climax chamber's defenses, a fact stated in the letter's postscript.",
          "The warden's remains hold nothing of value, deliberately: their last act was making themselves not worth disturbing. A party that leaves them untouched gains a quiet blessing — advantage on the first save of the finale.",
          "From here, the sounds of {villain}'s endgame are audible. No more side passages: the letter, the seal, and one corridor forward.",
        ],
      },
      {
        type: "social",
        title: "Parley at the Last Door",
        readAloud:
          "{villain} is waiting for you at the final door — unhurried, unarmed as far as you can see, in the manner of someone who has already moved the important pieces. 'You've read the confession by now,' they say. 'So you know I'm not the monster in this story. I'm the janitor. Now: you can help me finish, you can watch, or you can be the reason it takes longer. I'm told you're reasonable people. Which is it?'",
        summary:
          "The villain offers terms before the finale — and the terrible thing is that, given the twist, the offer is partly sincere. Whatever the party chooses here configures the final fight.",
        details: [
          "{villain} will genuinely trade: safe passage out for the warden's seal; the location of a hostage or treasure for non-interference; honest answers for honest answers. Every deal is kept to the letter and no further.",
          "DC 15 Insight during the parley: the mannerism slips once — {epithet} is afraid of the timetable, not of the party. Something below is holding THEM to a schedule.",
          "If the party stalls three rounds of conversation, the villain's preparations complete (one advantage in the finale becomes theirs — pre-cast ward, positioned minions, or the hostage moved).",
          "Combat can start here, on the party's initiative, at the cost of the information they didn't finish extracting. The door to the finale opens either way.",
        ],
      },
      {
        type: "skill",
        title: "The Collapsing Approach",
        readAloud:
          "Whatever {villain} has done in the deep chamber, the site is reacting: dust sifts from every joint, old cracks are having new ideas, and somewhere behind the walls, stone is grinding against stone with the sound of a decision being made. The corridor to the final chamber is still passable. The corridor is not going to stay that way.",
        summary:
          "A timed gauntlet to the finale as the dungeon destabilizes — fast, loud, and expensive to fumble. Arrive breathless or arrive battered.",
        details: [
          "Run as a group challenge: three successes before three failures, each character contributing one check from the list.",
          "Each failure costs: 2d6 bludgeoning from falling stone (DC 13 DEX halves), a dropped pack, or arriving one round after the finale's clock starts — party's choice, once each.",
          "A rope fixed earlier, a surviving guide, or the warden's seal each convert one failure to a success automatically — planning pays out here.",
          "Describe the site's distress as almost animal. Given the twist, it may literally be.",
        ],
        skill: {
          description: "Cross the failing gallery before it seals the way to the finale.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "vault the widening floor-crack at speed" },
            { skill: "Acrobatics", tier: "medium", use: "surf the tilting flagstones as they shift" },
            { skill: "Perception", tier: "easy", use: "call the next collapse before it lands" },
            { skill: "Arcana", tier: "hard", use: "read the wards' failure pattern and predict the safe line" },
          ],
          success: "The party arrives at the final chamber intact, with one round to act before {villain} expects them.",
          failure: "The way collapses behind them either way — but a majority-failure arrival is loud, late, and down the listed costs. There is no way back; the only exit is now through the finale.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "The Chamber of the Ninth Seal",
        readAloud:
          "The final chamber is a drum of stone around a single object: the last seal, a disk of gray metal the size of a millstone, and the only thing in {site} with no dust on it at all. {villain} stands over it, work interrupted, and for one long moment nobody moves — because everyone in this room, on both sides, can hear what is on the other side of that seal, and it has noticed the door is thinner.",
        summary:
          "The finale: stop {villain} at the seal itself. The fight has a clock, a centerpiece that must not break, and — thanks to the confession — at least two ways to 'win.'",
        details: [
          "Clock: each round, {villain} (or their strongest minion, if engaged) spends an action on the seal. After 4 such actions the seal opens — run the aftermath, not a TPK: what comes out is a campaign seed, and getting OUT alive becomes the scene.",
          "The seal is terrain: standing ON it grants the villain's foes advantage against fear (the wards' last kindness) — the confession's postscript says so.",
          "The warden's seal (if carried) can, once, as an action: counter one villain action at the disk, banish one summoned guard, or re-lock one opened increment. Spend it like the plot coupon it is.",
          "Endings that count as victory: villain dead or bound; villain PERSUADED (the confession gives the leverage — DC 15 with it, DC 20 without); or the seal held for 6 rounds until the site's own defenses finish waking. State the survivors' walk out; it is earned.",
        ],
        combat: {
          tactics: "{villain} fights at the seal and will not be baited off it; minions screen and body-block. At half HP the villain offers the parley terms one final time — sincerely, mid-swing.",
          terrain: "a circular chamber with the seal as its centerpiece; the seal is cover, objective, and moral question in one",
        },
      },
      {
        type: "climax",
        title: "The Rising Water",
        readAloud:
          "The deep chamber is already ankle-deep and filling — {villain}'s work, or the site's grief, or both. Black water pours in ropes down the walls with a sound like applause, and in the center, on the last dry dais, the endgame waits for you beside the thing they came all this way to finish. 'Five minutes,' they call out over the roar, conversationally. 'After that, the argument settles itself.'",
        summary:
          "A drowning-clock finale on shrinking ground. Every round the floor gets smaller, the options narrower, and the fight more honest.",
        details: [
          "Water rises one 'ring' per round: round 3 the outer floor is swimming-deep, round 5 only the dais is dry, round 7 the chamber is done. All clocks pause if the inflow is staunched (two DC 13 checks at the wall-breaches, one character-round each).",
          "Swimming in armor is the rule everyone forgets: heavy armor sinks — a doffing round now may be worth two later.",
          "{villain}'s ritual/device on the dais completes at round 6 unless disrupted (damage or a contested check). The party must budget rounds between the fight, the flood, and the finish line.",
          "Escape route out is UP: the rope shaft, the bell tower, the chain hoist — whichever this site established earlier. End the session on the climb into daylight, water roaring below.",
        ],
        combat: {
          tactics: "{villain} holds the dais — highest ground, driest ground — and lets the water do the crowd control, targeting whoever works the breaches. Minions fight from the water; they were chosen because drowning is not among their problems.",
          terrain: "concentric rings of floor vanishing under rising black water; the dry dais is the only stable footing by round 5",
        },
      },
      {
        type: "climax",
        title: "The Hollow Court",
        readAloud:
          "The last hall was a throne room before it was a tomb, and {villain} has restored it to use: torches lit in the old brackets, banners rehung, and the long-dead court arranged standing in their places down both walls. At the far end, beside the throne, your enemy turns — host, curator, and heir — and says, with real warmth: 'You're just in time. It only needed witnesses.'",
        summary:
          "A throne-room finale where the scenery is the second wave. The villain's coronation, ritual, or reckoning needs living witnesses — and the party qualifies whether they cooperate or not.",
        details: [
          "The standing court: use the gallery rule — they animate in waves of three when the villain falls below half HP, or instantly if a party member touches the throne.",
          "The ceremony completes in 5 rounds. Completion doesn't end the fight; it PROMOTES the villain (max HP, +2 to hit, visibly wrong) — a second phase with the same initiative order.",
          "The banners burn beautifully: fire panics the court (they shield the banners over themselves — 1 round of wave-delay per banner burnt, three banners).",
          "The throne is the site's true anchor (per the confession). Destroying it (AC 17, 40 HP, immune to piercing) ends the animation, the ceremony, and — gently, room by room — the site itself. Fifteen minutes to daylight. Make the walk out a victory lap with a countdown.",
        ],
        combat: {
          tactics: "{villain} opens with their strongest control option on the party's obvious heavy, monologues only while it holds, and uses the court as both shield wall and audience. They genuinely prefer the party alive until the ceremony completes.",
          terrain: "a long throne hall flanked by the standing dead; banners, braziers, and the throne itself are all interactive and all flammable",
        },
      },
    ],
  },

  complications: [
    "A tremor reshuffles the map: one corridor the party has used is now rubble, and one wall they passed has opened into somewhere new.",
    "The party's light sources start burning green and low — the air is changing. Torches now last half as long, and things with eyes adapted to the dark know it.",
    "A rival crew from {place} arrives, loud and underprepared, and heads straight for the worst possible room. Rescue, recruit, race, or wince.",
    "The toll-keepers upgrade their prices: the next border demands something that matters — a named weapon, a holy symbol, a memory of the way in.",
    "Water levels rise a foot everywhere. Rooms change shape, one crossing becomes a swim, and the thing in the flooded gallery gains territory.",
    "{villain}'s crew leaves a trap keyed to the party specifically — it uses something they lost or sold earlier as the lure.",
    "The rhythm — hammer, bell, breath, whatever this site keeps time by — skips one beat. Every native creature freezes for it. The silence afterward is worse.",
    "A door the party left open is found closed. A door they closed is found open. Nothing else appears to have changed. Nothing needs to.",
  ],

  sensory: [
    "Cold air moving in slow tides, as if the site is breathing through its corridors.",
    "Tallow smoke and old incense, sunk into the stone like a stain.",
    "The taste of iron on the back of the tongue that gets stronger going down.",
    "Distant, patient dripping that never quite lets you triangulate it.",
    "Dust hanging in lantern-light, perfectly still — until it isn't.",
    "The scrape of your own footsteps returning half a heartbeat late.",
    "Warding chalk gone brown with age, flaking like dried petals.",
    "Somewhere below, one heavy impact — then the long hum of settling chains.",
    "Prayer-graffiti in three languages and centuries, all asking for the same thing.",
    "A draft carrying, impossibly, the smell of the sea.",
  ],

  cutAdvice: [
    "Cut the False Vault first — move its treasure into the climax chamber as set dressing.",
    "Collapse the two middle fights into one: the Toll's keepers make their stand in the Nest, hoard and all.",
    "If the finale must start NOW, the Collapsing Approach becomes three sentences of description and one Dexterity save at the door.",
  ],
};
