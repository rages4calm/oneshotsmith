import type { ThemePack } from "./schema";

// Heist theme pack: an urban job against a defended place. Competence and wit —
// casing, infiltration, alarm escalation, and an escape that earns its own scene.

export const HEIST: ThemePack = {
  theme: "Heist",
  moduleLetter: "H",

  titlePatterns: [
    "The {adj} {noun}",
    "The {noun} Job",
    "One Last {noun}",
    "The {noun} at {place}",
    "Thieves of the {adj} {noun}",
  ],
  titleAdjectives: ["Gilded", "Velvet", "Silent", "Borrowed", "Crooked", "Perfect", "Unsigned", "Midnight", "Counterfeit", "Honest", "Ninth", "Patient"],
  titleNouns: ["Score", "Switch", "Masquerade", "Vault", "Commission", "Acquisition", "Errand", "Key", "Wager", "Inheritance", "Gambit", "Favor"],
  taglines: [
    "The invitations are engraved. The guest list is armed.",
    "Getting in is a trade. Getting out is an art. Getting paid is a miracle.",
    "The wine is excellent, the music is loud, and the floor plan is a lie.",
    "It only counts as stealing if the owner ever finds out.",
    "Everyone downstairs is dancing. Everyone upstairs is working.",
    "The vault at {site} has never been opened. Neither has the question of what it holds.",
    "The house has caught every thief who ever tried it. The thieves it didn't catch tell the story differently.",
    "Steal it back before midnight, and it was never stolen at all.",
  ],

  sites: [
    {
      names: ["Highcourt House", "The Glasswing Manor", "Verrel House Above {place}"],
      description:
        "A great house on the hill above {place}, built three fortunes ago by a smuggler who went respectable and never quite stopped building bolt-holes. The state floors glitter through a gala season that never truly ends; the vault sits behind the portrait gallery, defended by locks, liveried men, and etiquette. The servants' passages run like a second, secret house inside the walls — the staff see everything, and are paid handsomely to have seen nothing.",
      roomLabels: ["Carriage court", "Grand foyer", "Cloakroom", "Ballroom", "Musicians' gallery", "Portrait gallery", "Withdrawing room", "Servants' stair", "Kitchens", "Wine cellar", "Master's study", "Strongroom antechamber", "The vault", "Roof walk"],
      terrain: ["banquet tables, drapes, and scattering guests as moving cover", "a musicians' gallery overlooking the ballroom floor", "servants' doors hidden in the paneling of every room", "chandeliers on winch-ropes — lowerable, or droppable"],
    },
    {
      names: ["The Assay House", "The Customs House at {place}", "The Gilt Exchange"],
      description:
        "The customs house squats at the waterline of {place} with the smug bulk of a building that taxes everything it looks at. By day it weighs, stamps, and seizes; by night its bonded warehouse holds every cargo that couldn't pay, and a caged room of 'evidence' with a documented habit of shrinking. The clerks will swear the strongroom inventory balances. The clerks are remarkably well dressed, for clerks.",
      roomLabels: ["Weighing hall", "Clerks' floor", "Stamp office", "Records room", "Counting room", "Bonded warehouse", "Seized-goods cage", "Harbormaster's office", "Watch post", "Loading dock", "Undercroft", "Roof lantern", "Strongroom stair", "The long ledger hall"],
      terrain: ["scale platforms that tip and swing underfoot", "aisles of bonded crates stacked into a shifting maze", "the clerks' balcony ringing the weighing hall", "cargo nets on loading booms, ready to drop — or to ride"],
    },
    {
      names: ["The Hall of Nine Locks", "The Lockmakers' Guildhall", "The Guildhall at {place}"],
      description:
        "The lockmakers' guildhall is workshop, temple, and advertisement in one. Every strongbox in {place} is warranted under its charter, and its own vault — the masterpiece door, nine locks, one from each founding master — has stood unopened by force for two hundred years. Journeymen earn rank by adding to its defenses; masters retire by beating what the journeymen added. The guild has never seriously considered what it would mean if a stranger got through, which is exactly the sort of confidence that gets a building robbed.",
      roomLabels: ["Porters' lodge", "Court of the masters", "Apprentice workshop", "Pattern room", "Proofing cells", "Masters' library", "Charter room", "Dues office", "Guild kitchen", "Journeymen's dormitory", "Bell loft", "The trial door", "Undervault stair", "The masterpiece vault"],
      terrain: ["workbenches strewn with small sharp tools and half-built locks", "the trial door's antechamber of counterweights and moving cages", "narrow gallery stairs connecting the working floors", "display cases that ring like struck bells when broken"],
    },
    {
      names: ["Coldharbour Gaol", "The Old Fort Prison", "The Round Gaol of {place}"],
      description:
        "An old fort above the marsh road serves {place} as gaol, debtors' hold, and the warden's private economy: sentences shorten for coin, lengthen for spite, and the evidence room holds a decade of other people's property that the watch has 'secured.' The walls were built to keep armies out and now keep paupers in, and do both jobs badly. Visitors are searched thoroughly on the way in. On the way out, nobody bothers.",
      roomLabels: ["Gatehouse", "Visiting room", "Warden's office", "Turnkeys' mess", "The long gallery", "Debtors' ward", "The quiet wing", "Infirmary", "Chapel", "Exercise yard", "Laundry", "Evidence room", "Warden's strongroom", "Sally port"],
      terrain: ["iron-barred doors that lock behind whoever passes", "a central watch-post with sight-lines down every gallery", "hanging laundry lines giving soft concealment", "catwalks above the exercise yard, one guard wide"],
    },
  ],

  hooks: [
    {
      readAloud:
        "{patron} sets a flat velvet case on the table and opens it with ceremony: empty, except for the imprint in the silk where something used to lie. 'Taken legally,' they say, making the word sound like a disease. 'A debt I never owed, a magistrate I never met, and a seizure conducted at dawn with forty armed men. It sits in the vault at {site} now, being gloated over.'",
      summary:
        "{patron} hires the party to steal back {item}, stripped from them through a rigged debt and a bought court. Payment: 100 gp each and the satisfaction — plus everything else in the vault, which {patron} pointedly does not want.",
    },
    {
      readAloud:
        "The forger's workshop smells of hot metal and quiet pride, and the two objects on the bench are identical down to the scratches. 'Four hairs' weight,' she says, balancing one on each palm. 'That is the entire difference. That, and one of them has to be inside {site} before the appraiser's visit — in place of the one that is already there.'",
      summary:
        "A forger working for {patron} needs the original {item} lifted and its double left behind before an appraisal exposes a decades-old fraud. No one must ever know a theft occurred; the fee doubles if the owner dies suspecting nothing.",
    },
    {
      readAloud:
        "The letter that summoned you is short, unsigned, and folded around a page torn from an accounts book. Halfway down, among strangers' debts, is a name you know — and beside it a sum, and beside the sum, in fresher ink, one word: 'due.' On the back, an address in {place} and an hour.",
      summary:
        "The owner of {site} keeps a book of debts that are really leashes, and {patron}'s name is in it — perhaps a PC's too. The job: bring out the whole book. Every name in it will pay, pardon, or protect the crew that burns their page.",
    },
    {
      readAloud:
        "{patron} has the hands of a house-servant and the eyes of someone who has finished being afraid. 'Thirty years I kept that house, and I was put out with a letter — no pension, no character. So. The staff doors have no locks, the guard sleeps at the turn of the third watch, and the master's strongroom key is brass, not iron, whatever he shows his guests. I want nothing from the vault. I want you to empty it.'",
      summary:
        "The dismissed steward of {site} offers the party three decades of the house's secrets in exchange for one thing: the owner's ruin. The information is excellent; the hatred is a liability. Both should surface in play.",
    },
    {
      readAloud:
        "The catalogue found you at the {tavern}, wrapped in plain paper, one lot circled in red. 'LOT 9 — {item}, provenance private, viewing by appointment at {site}.' Beneath it, in a hand no one recognizes: 'It must not sell. The buyer is worse than the seller. You have until midnight, and the seller knows someone is coming.'",
      summary:
        "At midnight {item} goes to a buyer whose agents are already drinking in {place}, and whoever sent the catalogue knows too much about the party to refuse politely. Steal it before the hammer falls — and learn mid-job why the anonymous client could not come themselves.",
    },
    {
      readAloud:
        "The gentleman finds you by reputation and buys the good bottle before naming his business. 'The owner of {site} has published a boast: the vault cannot be opened, and there is a standing purse of five hundred crowns for any crew that proves otherwise. I represent parties who have wagered rather heavily on the vault's failure. You would be stealing with the owner's written permission — my clients find that detail hilarious.'",
      summary:
        "A public challenge, a private wager: crack the vault of {site}, leave the calling card, collect the purse as legal coin. The catch surfaces mid-job — the boast was engineered, and someone needs the party to reach that vault for reasons that have nothing to do with the bet.",
    },
  ],
  hookAlternates: [
    "The party's fence names their debt forgiven the day {item} leaves {site} — and doubled the day the job gets refused.",
    "A friend sits in the gaol on planted evidence; the real proof, and the planter's name, are filed in {site}'s strongroom.",
    "{villain} hires the party for the job openly, at generous rates, which every thief in {place} agrees is the most alarming part.",
  ],

  villains: [
    {
      epithets: ["the Gilded", "the Hand That Holds the Notes", "Master Upstairs"],
      motivation: "Collects obligations the way lesser magnates collect art: every treasure in the vault of {site} is a leash on somebody, and the interest is paid in obedience.",
      plan: "Use the season's gala to finish acquiring {place} — call in every note on the same morning, foreclose the town in one stroke of ink, and be publicly dancing when it happens.",
      secret: "The prize of the collection is stolen — the founding theft the whole fortune stands on — and one witness to the original crime is still alive, kept close, comfortable, and terrified on the household staff.",
      mannerism: "Greets people with their balance instead of their name, to the shilling, from memory — and never touches a door; one is always opened.",
      bossTags: ["leader", "humanoid"],
    },
    {
      epithets: ["the Locksmith", "Warden of the Ninety Doors", "the Sleepless"],
      motivation: "Built the security of {site} lock by lock into the masterpiece of a lifetime — and has begun to crave a worthy thief the way an artist craves an audience.",
      plan: "Tighten the house until it is perfect, then stage the proof: lure a capable crew into breaking in and take them at the vault door itself, publicly, mid-reach. The lure has already gone out. The party may be holding it.",
      secret: "There is a thief-door — one unwatched way through everything, unknown to the owner, kept because a masterpiece must bear a signature. They have never used it. They think about it every day.",
      mannerism: "Tests each door they pass with two fingers, without looking and without breaking conversation, and can name who last oiled a lock by the smell of it.",
    },
    {
      epithets: ["the Magpie", "the Second Shadow", "the Gentleman of the Gutters"],
      motivation: "Has retired twice, gone legendary three times over, and is dying quietly of something the physicians bill politely for — and wants one impossible score to be the story that outlives the body.",
      plan: "Take the same prize on the same night: they have spent a year inside {site} as a trusted fixture, and the party's louder attempt is the diversion under cover of which they walk out the front door, prize in hand.",
      secret: "Their hands have begun to shake. The fine work is beyond them now — the last lock needs someone else's fingers, and everything about the party's job, from the first tip to the convenient gaps in the plan, was arranged to bring those fingers to the keyhole.",
      mannerism: "Picks pockets compulsively and returns everything within the hour, wrapped and improved — a coin polished, a blade oiled, a misspelled note corrected.",
      bossTags: ["humanoid", "leader"],
    },
    {
      epithets: ["the Auctioneer", "Broker of Final Bids", "the Kindly Collector"],
      motivation: "Sells outcomes, not objects — and has promised the prize of {site} to three different buyers at three ruinous prices, with every intention of collecting all three.",
      plan: "Engineer the theft, the recovery, and the second theft of the same prize in a single season, taking a commission on every leg — then sell the thieves' names to the owner as a closing courtesy.",
      secret: "There are no buyers. The broker is the buyer, and what they are buying is destruction: their own hand forged the prize's provenance decades ago, and the fraud survives only as long as the object does.",
      mannerism: "Appraises everything aloud in a murmur — rooms, wine, bodyguards, threats — assigning each a reserve price; people they respect get higher figures.",
      bossTags: ["caster", "leader"],
    },
    {
      epithets: ["the Founder", "the Grandfather Upstairs", "Holder of the First Deed"],
      motivation: "Built the fortune, signed the deed, and declined to let death end the arrangement — the family lives magnificently, and the rent is that nobody ever asks what stays upstairs.",
      plan: "Be robbed. The compact binding them to {site} holds only while the fortune's first coin remains under its roof, so for ten years they have arranged — through dreams, debts, and dismissed servants — for talented strangers to carry it out.",
      secret: "Any blood relative who learns of them forgets by morning; the house tidies the memory away. Their only possible couriers, allies, and heirs are strangers under the roof — guests, staff, and thieves.",
      mannerism: "Speaks through the house — a voice down chimney-flues and along banisters — and counts occupants constantly; intruders are greeted by number: 'thirty-one and thirty-two, so late.'",
      bossTags: ["undead"],
    },
  ],

  twists: [
    "The vault has been empty for a year. The fortune is gone, the gala is a performance for creditors, and the prize on display is paste — the party was hired to be caught stealing it, so the owner's surety pays out and the books never face daylight.",
    "{patron} owns {site}. They are robbing themselves: the prize carries an obligation — a betrothal, a treaty, a curse, a debt — that ends only if it is convincingly, publicly stolen by strangers who can never be traced back.",
    "The prize is alive. What sits in the vault under glass is a person under an old enchantment, and the owner knows — which is why it is guarded like a prisoner, valued like a treasure, and never, ever appraised.",
    "The alarm bells do not summon the guards. The guards exist to reach intruders BEFORE what the bells actually wake, three floors down — and every guard knows the standing order: whatever you hear below the cellar, the answer is faster stairs.",
    "There is a second crew in the house tonight — quieter, better, one room ahead all evening. They are not stealing the prize; they are {villain}'s people MOVING it, because the villain has known for a week that thieves were coming.",
    "The staff have been robbing the house for a generation, replacing what sells with forgeries, and two-thirds of the vault is their work. They will help the party cheerfully — right up until someone reaches for the one real piece left, the piece that still covers twenty years of quiet theft.",
    "{villain} cannot touch the prize — an old ward sears their flesh on contact, which is the only reason it is still in {site}. Every defense the party has beaten was a filter, sieving {place} for thieves skilled enough to carry it over the threshold on the villain's behalf.",
    "The prize is collateral. While it sits in {site}, every major debt in {place} is pledged against it — and the moment it verifiably leaves, the notes come due at dawn. The party's perfect crime forecloses the town, unless the paper burns with equal care.",
  ],

  cluePool: [
    "The east walk goes unwatched for four minutes at shift change — and someone has been oiling that door's hinges, recently and well.",
    "A wax seal re-melted and re-stamped a hair off center: somebody reads the owner's letters before the owner does.",
    "The vault inventory, copied fair — except the figures are a clerk's and the corrections are in {villain}'s hand.",
    "Wages at {site} run triple the going rate and no servant has quit in a decade. Loyalty, or hush money; the kitchen won't say which.",
    "Fresh chalk on the carriage-gate post: thief-sign for 'job in progress — keep clear.' The party didn't leave it.",
    "Every portrait of the family founder wears the same ring on the same finger. So does the portrait of the current owner. So does the current owner.",
    "The dogs will not walk the north lawn, and the kennel-master has stopped making them.",
    "A proof-mark inside the strongroom keyhole: this lock has been out of its door within the month, worked in a shop vise, and put back.",
    "One window's bars are painted wax. Someone on the inside prepared their own way out — and hasn't used it yet.",
    "The gala's wine count is short one crate, and the crate went down — into cellars no guest will ever see.",
    "Fire-buckets stand full and fresh along one particular corridor. Someone expects that corridor to burn.",
    "Small treasures from {site} surface monthly in the pawnshops of {place}, sold by someone no two shopkeepers describe the same way.",
  ],

  monsterTags: ["urban", "manor"],
  bossTags: ["boss"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "The Service Gate",
        readAloud:
          "The tradesman's gate of {site} handles forty deliveries a day, and the under-porter checks precisely none of them against his list. Wine goes in, laundry comes out, and the guard on the arch spends his shift watching the kitchen girls instead of the carts. Above it all the house rises in tiers of lit windows, humming with preparation — somewhere upstairs, someone is tuning a viol.",
        summary:
          "The party enters as deliveries, staff, or cargo. Establish the below-stairs geography, the rhythm of the house, and the first clue.",
        details: [
          "Walking in with a delivery needs nothing but full hands and a bored expression — DC 10 Deception if anyone engages. Empty hands draw the under-porter's only question: 'Where's it going?'",
          "The service corridors connect every public room (see the site's hidden doors). Staff move on bells: three rings summons the floor, one ring is a single room. Ten minutes of lingering and the code is learnable.",
          "Plant the first clue here (see Secrets & Clues) — overheard between two servants, or chalked on the yard gate.",
          "A PC who lifts livery from the laundry gains one automatic pass on a later disguise moment — until they meet the person whose coat it is.",
        ],
      },
      {
        type: "arrival",
        title: "The Front Door",
        readAloud:
          "Carriages queue down the hill from {site}, lamps doubled in the wet cobbles, and the line of guests glitters its way past two footmen checking invitations against a book. The seal on the invitation in your hand is barely a day old — you watched the wax cool. From the ballroom above, the first dance is already turning, and the sound pours out of the windows like light.",
        summary:
          "A front-door infiltration under borrowed or forged credentials, straight into the crowded, well-lit heart of {site}.",
        details: [
          "The invitation book lists names with descriptions. A forged invitation passes on DC 12 Deception; claiming a listed no-show passes free — until the real one arrives (d6 each hour: on a 1, they do).",
          "Cloakroom rules: weapons and working tools go on the hook. DC 13 Sleight of Hand keeps something small; armor heavier than leather simply does not fit the fiction.",
          "Each PC who works the room earns one acquaintance who will vouch for them later — name, title, one fact. These are load-bearing when the alarm ladder starts to climb.",
          "The steward stands where the whole floor is visible, the case-ward rod on his belt. Point him out once, unprompted — the players should know the face whose job is noticing them.",
        ],
      },
      {
        type: "arrival",
        title: "The Dark Approach",
        readAloud:
          "By night the wall around {site} is a gray band under a rinsed sky, and the broken glass mortared along its top has been worn to pebbles by forty years of weather. Beyond it, gravel paths lattice a garden trimmed within an inch of its life, and one upstairs window burns yellow — a lamp somebody lit and left. The dogs have not spoken yet.",
        summary:
          "A night insertion over the wall and across the grounds — quiet, dark, and rich with information for a patient crew.",
        details: [
          "The wall is DC 10 Athletics, and the glass is toothless — a detail worth letting a scout discover, because it means this wall gets climbed regularly, and the party should wonder by whom.",
          "The grounds run two watchmen and a dog on a twenty-minute circuit. Ten minutes of observation and a DC 12 Survival yields the full pattern, including the four-minute gap.",
          "Gravel is the real sentry: crossing paths quietly is DC 12 Stealth; the lawns are silent but overlooked by that lit window.",
          "The lit window is the first clue — it belongs to a room that should be empty. Tie it to the chosen villain: their lamp, their vigil, their carelessness.",
        ],
      },
    ],

    middle: [
      {
        type: "exploration",
        title: "Casing the House",
        readAloud:
          "From the coffee-room window across the square, {site} performs its entire day for anyone patient enough to watch. Deliveries at the side door, guards changing on the church bells, the upstairs shutters opening west to east as the maids move with the sun. By late afternoon the house has repeated itself twice — and once, for four minutes, it held its breath.",
        summary:
          "A planning scene played as reconnaissance: the party buys, watches, and charms its way to a working picture of {site}'s defenses — then chooses the way in.",
        details: [
          "Let the players drive with questions and answer from the site's rooms and terrain, charging for the good material: the guard rotation costs an afternoon and DC 12 Perception, the servants' bell-code costs DC 12 Persuasion below stairs, the vault antechamber's layout costs DC 13 Investigation in public records or 25 gp to a retired chambermaid.",
          "Three successes build a plan with one banked advantage the party may invoke later ('we cased this — the coal chute is unbarred'). Declared once in play, it is simply true.",
          "Overreach is the lever: a fourth question in the same place gets remembered. When the alarm ladder starts climbing, it starts one rung higher.",
          "Seed one falsehood. One detail gathered here is wrong or out of date — the DM chooses which and keeps a straight face. Competent crews verify.",
        ],
      },
      {
        type: "social",
        title: "Working the Room",
        readAloud:
          "The ballroom of {site} holds two hundred people and one conversation, endlessly re-partnered: who owes whom. Candle-heat, face-powder, a quartet sawing gamely over the roar. Somewhere in this crowd is the person whose pocket, signature, or goodwill the plan requires — currently laughing at something that is not funny.",
        summary:
          "A social gauntlet: extract what the plan needs — a key, a name, an escort upstairs, ten unwatched minutes — from the gala's currents without becoming memorable.",
        details: [
          "Decide with the players what they are fishing for, then price it: a guest's vouching costs DC 12 Persuasion, the seating chart costs a servant's goodwill, the steward's key-ring costs DC 14 Sleight of Hand and a plan for putting it BACK.",
          "The host's midnight toast empties the upper floors for a quarter hour — every servant comes down for it. Deliver this through an NPC ('the staff won't miss the toast; cook flogs latecomers') and let the party build on it.",
          "Failure's price is memorability, not capture: each botched interaction adds one witness who can describe a PC. They surface at the alarm ladder's third rung.",
          "{villain} is here, working the same room for their own reasons. First to notice the other's craft wins an edge — one opposed Insight against Deception, winner gains advantage on their next move against the loser.",
        ],
      },
      {
        type: "skill",
        title: "The Roof Road",
        readAloud:
          "The roofscape of {place} runs toward {site} in a broken staircase of slates, party-walls, and chimney stacks still breathing the day's heat. Below, the streets go about their evening; ahead, the target's roofline is a black rail against the sky, walked once an hour by a man who hates ladders. Between here and there: four gaps, one bell tower, and a great deal of air.",
        summary:
          "A traverse over the roofs of {place} to a high, unwatched entry — fast, exposed, and unforgiving of showoffs.",
        details: [
          "The bell tower is the decision point: through it is fast and sheltered, but the ringer sleeps there — DC 12 Stealth past a professional listener, or wake him and improvise.",
          "A laden PC — armor heavier than leather, or the loot on the way OUT — makes the gaps at disadvantage. Say so before the first jump, not after.",
          "This route runs in reverse as an escape IF someone rigs a line at the long gap. Reward the one who thinks of it.",
        ],
        skill: {
          description: "Cross the roof road to {site}'s upper entry without noise, losses, or witnesses.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "make the gaps at a run, gear cinched tight" },
            { skill: "Acrobatics", tier: "medium", use: "walk the ridgelines and the one inevitable rotten gutter" },
            { skill: "Perception", tier: "easy", use: "read the next roof for rot, wire, and roosting birds before trusting it" },
            { skill: "Sleight of Hand", tier: "hard", use: "hook and pay out a line across the long gap for the rest of the crew" },
          ],
          success: "The party reaches the roof entry with the hour-patrol twenty minutes out and the high ground over the whole house — plus one free observation: which rooms are lit that should not be.",
          failure: "Each failure costs: a slipped tile clatters into the street (one rung up the alarm ladder), a dropped tool waits in a gutter to be found, or a straggler arrives shaken and last. No damage yet — but the patrol's lantern is early, and closer than it should be.",
        },
      },
      {
        type: "setpiece",
        title: "The Masterpiece",
        readAloud:
          "The vault door of {site} is a masterpiece and knows it: a face of black iron chased with silver, nine keyholes in a serpentine line, and a maker's mark polished bright by proud thumbs. The antechamber is clean as a chapel — no dust, no clutter, sight-lines like a stage. The room is arranged with the confidence of a trap that has never needed to apologize.",
        summary:
          "The security set-piece: beat the vault door's locks, wards, and waiting guardians while the antechamber does what it was built to do — catch thieves in the act.",
        details: [
          "The door: three of the nine keyholes are real (DC 13 Investigation reads the honest wear), three ring the alarm two rungs up the ladder, three are blanks that waste a careful minute each. Thieves' tools beat each true lock at DC 13; the steward's key-ring, if lifted earlier, turns two outright.",
          "The guardians do not challenge anyone who enters. They wait for the second lock to open, then move. Describe them as furniture until then.",
          "The floor is the witness: polished stone that carries footsteps to the post below. Stockinged feet or laid-down cloaks silence it — the detail that separates crews from burglars.",
          "On a full botch — two alarm holes, or a guardian out the door — the failsafe drops a portcullis across the stair. Locked IN with the prize is its own scene; play it, don't skip it.",
        ],
        combat: {
          tactics: "The guardians move first to block the exit and press intruders against the working wall — they aim to hold and detain until the house arrives, not to kill, and one always keeps the stair. If a lock is being worked mid-fight, they strike the tools, not the hands.",
          terrain: "a bare, polished antechamber with chapel sight-lines — no cover but the door's own bulk, and a floor that reports every footstep to the post below",
        },
      },
      {
        type: "combat",
        title: "The First Bell",
        readAloud:
          "It happens the way it always happens: a door opens that shouldn't, and a tray hits the floor with a crash like applause. For one long heartbeat you and the witness stand in perfect stillness, doing the same arithmetic. Then the corridor is full of running footsteps, and somewhere below, a hand is reaching for the bell-rope.",
        summary:
          "The party is spotted. This scene is the alarm made flesh — contain the witness and cut the bell, or the whole house changes state. Introduces the alarm ladder the rest of the night runs on.",
        details: [
          "THE ALARM LADDER (use adventure-wide): rung 0, quiet — rung 1, suspicion (a guard checks, singly) — rung 2, search (patrols pair up, doors lock on schedule) — rung 3, lockdown (gates barred, guests herded, the vault's failsafes armed) — rung 4, manhunt (everything hunts; exits must be forced). Noise, bodies, and botches climb it; minutes of quiet, a plausible face, or a staged explanation walk it back down one rung at a time. It never ends the heist. It changes the map.",
          "Start at the moment of spotting: the witness will scream (one round), run (two rounds to the bell), or freeze (negotiable — DC 13 Persuasion or Intimidation holds them, and a bribe converts them from problem to resource).",
          "The bell-rope is a place, not an abstraction. Put it two rooms away and let the party race the runner to it. Cutting the rope buys silence tonight and questions tomorrow.",
          "Foes arrive in ones and twos at the speed of shouting, not teleporting: reinforcements every 2 rounds while noise lasts. Silence, darkness, and closed doors starve the flow.",
        ],
        combat: {
          tactics: "The house guard fights to raise the ladder, not to win: one always breaks for the bell-rope or the stairs while the rest delay in doorways. They want intruders held, not dead — captured thieves answer questions, and the owner has so many questions.",
          terrain: "a servants' corridor of doors, laundry, and one bell-rope two rooms away — the geography of who reaches what first",
        },
      },
      {
        type: "combat",
        title: "Gallery Watch",
        readAloud:
          "The long gallery runs the spine of the house, moonlit in bars through the shutters, hung with six generations of the family looking down in identical disapproval. Halfway along it a watch-lantern sits on the floor beside a chair — occupied. The figure in the chair sits very still. A shade too still for sleep.",
        summary:
          "An interior patrol in the worst place: long sight-lines, one exit at each end, and a veteran watchman playing possum better than the party plays statues. A fight the party can shape before it starts.",
        details: [
          "The watchman counted footsteps and waits with a hand crossbow under his coat — but he is, by his own lights, reasonable: DC 14 Persuasion slows his response if approached without drawn steel, and he will forget one face entirely for 10 gp. He has seen the wages clue (Secrets & Clues) and can be drawn out about it.",
          "If it goes to blades, the shutters are the lever: thrown open, the moon-bars carve the dark into lit lanes; kept shut, everything is knife-dark and Stealth stays live mid-fight.",
          "Noise carries from here: every round of open fighting past the second adds a rung to the alarm ladder. Grapples, pins, and mercy are mechanically better than glory.",
          "His partner walks the floor below on a twenty-count. A body, a missing lantern, or an unanswered whistle brings the partner up the far stair — begin counting aloud where the players can hear you.",
        ],
        combat: {
          tactics: "He fights the gallery's length, backing toward the far door and the whistle on his belt-cord — every round of distance is a round closer to help. Cornered, he surrenders honestly, and remembers everything.",
          terrain: "a shuttered moonlit gallery, long and narrow — light itself is the cover, and both doors are the objectives",
        },
      },
      {
        type: "exploration",
        title: "The Counting Room",
        readAloud:
          "This room is where {site} does its real business, and it smells of ink, sand, and candle-smoke worked into the wood. Two desks: a grand one facing the door, dressed with silver and self-importance, and a plain one in the corner, worn pale at the elbows, its drawers fitted with good small locks. The grand desk's ledger lies open, balanced to the penny — display-neat, like a made bed in a house where nobody sleeps.",
        summary:
          "The discovery room: the owner's real books, and the proof that the target's owner is worse than the thieves. What the party learns here re-prices the whole job.",
        details: [
          "The corner desk's locks fall to DC 12 thieves' tools; inside sits the double ledger — the fair copy lies, the foul copy doesn't. One hour or DC 13 Investigation extracts the shape of the owner's true business. This is where the chosen villain's secret surfaces.",
          "The foul ledger is leverage, evidence, and a second prize: worth as much as the vault to the right buyer, to {patron}, or to the town of {place} it itemizes. Say nothing — let a player realize they are holding a bigger score than the one they came for.",
          "One entry names a PC, their patron, or the {tavern} in {place}: the job was priced into these books before it was ever offered. Someone in this plan appears in these accounts.",
          "Copying pages takes minutes. Taking the book leaves a hole the steward sees by morning — the alarm ladder starts tomorrow at rung 2, which matters enormously to any crew planning a second night.",
        ],
      },
      {
        type: "skill",
        title: "The Switch",
        readAloud:
          "{item} sits in its case in the middle of everything — lit, labeled, and looked at, which is of course the point of it. Guests orbit at arm's length; a footman stands post with the fixed stare of a man ordered to watch a box all evening; the quartet turns the crowd like a slow tide. In a sleeve nearby, its double waits, four hairs' weight from perfect.",
        summary:
          "The swap, performed in public: replace {item} with its double under a roomful of eyes. Pure craft — the loudest scene of the night if it fails, invisible if it doesn't.",
        details: [
          "The case is warded: lifting {item} without the steward's rod (his badge of office, currently on his belt in the ballroom) triggers a shriek-ward. DC 13 Arcana from a distance spots the sigil; lifting the rod first is its own small heist — charge for it.",
          "The footman rotates on the hour with a man who takes bribes, and the party may already know him. Timing the swap to the changeover turns one hard check easy — reward the crew that watched first.",
          "If the forgery is imperfect — never made, or bought cheap — the swap still works tonight, and starts a clock: three days to the appraiser's visit. That clock outlives the session. Say so, and let the epilogue mention where they were on day three.",
        ],
        skill: {
          description: "Swap {item} for the forgery in plain sight, using misdirection, timing, and nerve.",
          checks: [
            { skill: "Performance", tier: "medium", use: "make the distraction — a toast, a faint, a scandal precisely loud enough" },
            { skill: "Sleight of Hand", tier: "hard", use: "the lift and the lay-down, one motion, dry palms" },
            { skill: "Deception", tier: "medium", use: "be boring: the person nobody describes to the watch afterward" },
            { skill: "Insight", tier: "easy", use: "read the footman's rhythm and call the four seconds his attention rests" },
          ],
          success: "The double sits in the case being admired, and {item} rides out under a coat. Nobody knows tonight; the owner may never know — the version of victory that keeps.",
          failure: "Failures cascade in public: a gasp, a grab, a shout — each failed check climbs the alarm ladder one rung with the party standing at the center of the room. Two failures trigger the case's ward. The swap can still be finished; it is simply a heist with an audience now.",
        },
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "What the Vault Keeps",
        readAloud:
          "The vault of {site} is smaller than the door that guards it, and tidier than a chapel: velvet trays, labeled shelves, everything squared to everything else. It takes a moment to see what is wrong with the room, and then it arrives all at once — the trays are dressed, the labels are perfect, and what the labels describe is not what the trays hold. Someone has been curating an absence.",
        summary:
          "Inside at last — and the vault tells the truth about the job. The chosen twist surfaces here as physical evidence, and the finale re-forms around what the party now knows.",
        details: [
          "Stage the Twist as objects: an empty tray dressed for show, a bill of sale predating the 'theft,' a ward-scorch in the shape of a hand — {villain}'s. Let the players assemble it. Do not narrate the conclusion.",
          "The vault's own inventory (kept inside, naturally) is annotated in two hands — and the second matches the corrections in the counting room. Cross-reference for the table's quiet 'oh no.'",
          "Time pressure arrives politely: the party downstairs applauds something. The toast is ending, the staff are returning, and every extra two minutes in here costs a rung on the ladder.",
          "Note WHERE anything taken was sitting. The villain knows this room blind and will read the gaps at a glance — a fact that shapes the confrontation ahead.",
        ],
      },
      {
        type: "social",
        title: "Caught, Politely",
        readAloud:
          "The lamplight from the doorway arrives a second before the voice, and the voice belongs to {villain}, who does not shout. 'You've saved me a great deal of trouble,' they say, glancing past you at the open vault with something like satisfaction. 'Now — the bell is one shout away, and generosity has a short shelf life. Shall we talk like professionals?'",
        summary:
          "{villain} catches the party red-handed and offers a deal, because the twist means they need one. What the party accepts, refuses, or pretends to accept configures the finale.",
        details: [
          "The offer is real and rooted in the villain's secret: walk out rich for one small service — carry the prize past a threshold, leave the forgery, burn one page of the foul ledger. Every version has a hook in it; DC 15 Insight surfaces the catch without the DM confessing it.",
          "{epithet} negotiates like a craftsman: concedes small points graciously, never lies outright, prices everything. What they will not do is let the party leave with BOTH the prize and the proof. Watch which one they guard — it is the tell.",
          "Stalling works both ways. Every minute of talk keeps the gala running — but on the third stall, the villain's own arrangements complete: a rung on the ladder, or their people arriving below, whichever hurts more.",
          "Violence here is allowed and priced: the villain shouts, the ladder jumps to lockdown, and the finale opens with the house awake. Sometimes worth it. Say yes, and make it cost.",
        ],
      },
      {
        type: "skill",
        title: "Lockdown",
        readAloud:
          "Somewhere below, the bell finds its voice, and {site} begins to close like a fist. Doors you left open are shutting to a rhythm; iron sings in tracks disguised as decorative molding; the light in the stairwells changes as, one by one, the lamps are shuttered for the hunt. The house was always a trap. It is springing now, floor by floor, faster than it looks.",
        summary:
          "The alarm reaches lockdown and the house transforms. A timed gauntlet to cross a closing building and reach the finale's ground — scored by every preparation the party did or didn't make.",
        details: [
          "Everything pre-rigged pays here at full value: the roped gap, the waxed bars, a bribed guard, stolen livery, a vouching guest. Each converts one failure into a success. This is the scene the whole adventure has been auditing them for.",
          "The sweep has a shape — top-down and public-to-private, because the guards protect guests first and goods second. State it plainly if asked. Competent crews surf it.",
          "A PC cut off by a closing door is not out of the scene; cut between them. Lockdown plays best as four small problems solved at once.",
        ],
        skill: {
          description: "Cross {site} during lockdown — ahead of the sweep, behind the shutters, through a house rearranging itself.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "beat a falling grate, hold a closing door for the crew" },
            { skill: "Stealth", tier: "medium", use: "cross a swept corridor between lantern beams" },
            { skill: "Deception", tier: "hard", use: "walk THROUGH the searchers as staff or panicked guest — the brazen option" },
            { skill: "Perception", tier: "easy", use: "hear which corridors have already become dead ends before committing" },
          ],
          success: "The party reaches the finale's ground on their own terms — in position, unspotted, one round in hand, the prize or the plan intact.",
          failure: "The house wins a piece per failure: a PC is seen and described, a bag or tool is abandoned mid-squeeze, or the party is flushed into the finale — the opposition in place and expecting them.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "Nine Tenths of the Law",
        readAloud:
          "It ends where the money always said it would: in the strongroom of {site}, the prize in the middle, and everyone's reasons drawn up around it like bidders at a private auction. The bell has stopped — which is worse than the ringing, because it means the house has finished waking and started hunting. {villain} looks from the prize to you, counts the witnesses one last time, and stops pretending to be patient.",
        summary:
          "The finale as a possession fight: the prize in the room, {villain} across it, the house closing on everyone. Holding the prize matters more than the body count — several endings score as wins.",
        details: [
          "The clock is the house: the lockdown sweep arrives in 5 rounds, and anyone still here on round 6 contends with the house guard too — villain included. Announce arrivals by sound a round early: boots, keys, the door.",
          "The prize is an object with rules: it can be thrown, hidden, bagged, or dropped down the chute. Whoever HOLDS it when the party quits the room wins the story. Make its position matter every round.",
          "{villain} would rather trade than die and rather flee than trade: at half HP they offer the terms from the parley, one notch worse, and their escape route is real and pre-established. Letting them take it is an ending, not a failure — the epilogue names the price.",
          "Ways to win: leave with the prize; leave with the proof and let the prize stay; hand the villain to the arriving guard gift-wrapped with the foul ledger; or walk out empty-handed but unsuspected, every door still open for a second visit. Heists are scored in the epilogue — say which ending the table earned.",
        ],
        combat: {
          tactics: "{villain} fights for possession, not murder — disarm, shove, snatch, screen — and spends minions as body-blocks at the door. The moment holding the prize becomes impossible, they pivot entirely to ensuring nobody else leaves with it.",
          terrain: "a strongroom of shelves, trays, and one open door — tight lanes, throwable treasure, and the sweep's noise growing one corridor away",
        },
      },
      {
        type: "climax",
        title: "The Getaway",
        readAloud:
          "There is no more plan; there is only the route — down the servants' stair three steps at a stride, through heat and shouting and a kitchen that has just realized something is happening upstairs. Behind you the house is one long bell. Ahead, the night is checkered with lanterns arriving at a run from {place}, and somewhere in the noise a voice you know is naming a price for you, loudly, to anyone in boots.",
        summary:
          "The escape as the finale: a running fight from {site}'s heart to the getaway — cart, boat, roofline, or crowd — with pursuit behind and the net closing ahead. Ends at clean air or a cell.",
        details: [
          "Run it as three legs, each one obstacle and one choice: OUT of the house (the door they earned or must force), ACROSS the grounds or streets (where preparation pays), and AWAY (the pre-arranged getaway, or an improvised one at disadvantage). One fight beat per leg at most.",
          "The pursuers are hired courage, not fanatics, and the pay grade shows: barricades, scattered coin (each pursuer stops for it on a 50/50), and darkness all shed them. Killing them raises the price on the party's heads in the epilogue.",
          "The prize is weight and witness: whoever carries it goes last through every squeeze. A crew that plans handoffs — 'you take the roof, I take the bridge' — should feel the machine working.",
          "End on the getaway's own image: the boat pulling out as lanterns line the quay, the cart rolling as the gate groans down. If they earned the clean version, give it whole. If not, the epilogue opens with reward posters and one very good description.",
        ],
        combat: {
          tactics: "Pursuers converge on noise and light, race to hold chokepoints AHEAD of the party rather than chase from behind, and always send one runner for reinforcements — the runner is the target that matters.",
          terrain: "a moving fight through kitchens, yards, and streets — improvised cover everywhere, three chokepoints, and everything in reach droppable, spillable, or flammable",
        },
      },
      {
        type: "climax",
        title: "A Scene at the Ball",
        readAloud:
          "The ballroom has not stopped dancing — that is the strangeness of it — two hundred guests turning under the chandeliers while the house's trouble walks in wearing your faces. Across the floor, {villain} stands with the host's smile screwed on tight, and between you lies nothing but polished parquet, formal wear, and the entire social order of {place}. The quartet, sensing something, plays a little faster.",
        summary:
          "The finale in public: a confrontation on the ballroom floor where reputation is terrain, violence has an audience, and the winner is whoever the room believes. Fighting is allowed. It just isn't free.",
        details: [
          "The room is the third combatant: open steel turns two hundred guests into a stampede — round 1 screaming, round 2 crush at the doors, round 3 clear floor and the house guard inside. Before steel, everything runs on social rules, and {villain} is better at those. Unless the party brought the proof.",
          "Evidence played PUBLICLY does what swords can't: the foul ledger, the forged provenance, the founder's ring. Each solid proof presented buys a round of the crowd's doubt; three turn the house guard neutral — they stop being the villain's and start being {place}'s.",
          "{villain} plays to the room until it stops working, then plays to kill — and the turn is visible: the moment they take off the smile. Say it exactly that way. Their first violent act targets the evidence or its holder, never the biggest threat.",
          "Guests are cover, hostage pool, and jury. Harm one and the room is lost for good; save one from the villain's side and the room turns like a tide. The best exit: villain unmasked, ruined, and taken — the party gone before anyone thinks to ask who they arrived with.",
        ],
        combat: {
          tactics: "{villain} opens with position and voice — commanding the guard, naming the party as the criminals (true, irrelevant) — and keeps a guest between themselves and the nearest blade. Once the room turns, they fight for the door, not the win: this face is spent, and they know it.",
          terrain: "a crowded ballroom under chandeliers — guests as moving cover and moral hazard, a musicians' gallery above, waxed floor fast in every direction, and every eye in {place} watching",
        },
      },
    ],
  },

  complications: [
    "The watch doubles for the night and the rotation the party cased is wrong by an hour — every timed plan needs one improvised bridge, right now.",
    "A guest recognizes a PC — old job, old life, or a wanted bill — and hasn't decided what to do about it. Their silence is for sale, and the currency is a favor tonight.",
    "A second, clumsier crew is in the building. Their noise lands on everyone's timeline: any rung they ring, the whole night climbs.",
    "The inventory is already one item short of the fence's manifest. Someone got here first — tonight — and may still be inside the walls.",
    "River fog rolls in. Lanterns double, sound carries strangely, and every bell in {place} lands one street closer than it is.",
    "The owner is awake — sleepless, walking the house with a candle on no schedule and no route, and they know every board that creaks.",
    "One bought thing breaks: the getaway driver is drunk, the bribed door is bolted after all, the forgery sweats near candlelight. The plan's weakest purchased piece fails now.",
    "Downstairs, the music stops for the toast. Ten minutes of hush, every servant still and listening — and the household rhythm the crew memorized simply isn't there.",
  ],

  sensory: [
    "The party below, heard through floorboards: strings, laughter, the surf-sound of two hundred conversations.",
    "Beeswax and silver-polish, and under them the cold-iron smell of strongroom air.",
    "A guard's boots on parquet, unhurried: eight paces, turn, eight paces.",
    "Chandelier light through a keyhole, laying one bright coin on the dark floor.",
    "The whisper of a wax seal giving way under a warmed knife.",
    "Gravel that announces every footstep to the entire garden.",
    "A key-ring's jingle somewhere below — eleven keys by the count, and one oiled silent.",
    "Candle-smoke on the upper floors, where the lamps are trimmed low for the night.",
    "The bells of {place} counting the hour — and the house's clocks answering, all a deliberate minute fast.",
    "Under everything, the vault's silence: a quiet with a different texture, like held breath behind iron.",
  ],

  cutAdvice: [
    "Cut The Switch first — hand its forgery beat to the vault scene: the swap happens at the moment of the lift, one Sleight of Hand at the tray.",
    "Collapse Gallery Watch into The First Bell: the possum watchman becomes the witness who spots them, and his gallery is where the race to the bell-rope starts.",
    "If the night must end NOW, jump the ladder straight to lockdown and run The Getaway — a heist that ends mid-escape, prize in hand and bridges burning, is a finale, not a failure.",
  ],
};
