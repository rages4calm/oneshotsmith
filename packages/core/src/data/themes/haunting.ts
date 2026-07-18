import type { ThemePack } from "./schema";

// Haunting theme pack: gothic sorrow under the dread. The haunting has rules
// the party can learn; the truth arrives in fragments; laying-to-rest is
// always on the table and often better than the sword.

export const HAUNTING: ThemePack = {
  theme: "Haunting",
  moduleLetter: "S",

  titlePatterns: [
    "The {adj} {noun}",
    "The {noun} at {place}",
    "What the {noun} Keeps",
    "The Haunting of the {adj} {noun}",
    "The {noun} Remembers",
  ],
  titleAdjectives: ["Unquiet", "Grieving", "Veiled", "Drowned", "Shrouded", "Sleepless", "Pale", "Widowed", "Patient", "Cold", "Forsaken", "Wailing"],
  titleNouns: ["House", "Wake", "Bell", "Widow", "Gallery", "Nursery", "Parish", "Lantern", "Vigil", "Bride", "Portrait", "Hearth"],
  taglines: [
    "The house keeps its own hours, and it is nearly one of them.",
    "No one has kept house at {site} in forty years. The table is set for two.",
    "Say what you like about the dead. But never the name.",
    "The mirrors are covered for your protection — not from what you would see. From what would see you.",
    "Every haunting is a story told wrong, waiting for someone to listen it right.",
    "It does not want you gone. It wants something much harder.",
    "The windows went dark one by one, years ago. Last winter, one lit again.",
    "The dead of {place} are patient. Lately they have stopped being polite.",
  ],

  sites: [
    {
      names: ["Marrowick Hall", "The Sealed House Above {place}", "Hollowmere Manor"],
      description:
        "A great house above {place}, sealed by court order the winter of the tragedy and never unsealed: shutters nailed, furniture sheeted, the will still in probate two generations on because no clause can execute while 'the disturbance persists' — the law's phrase, written by a clerk who refused to go back inside. The estate pays its taxes on time from an account nobody administers. Lamplighters on the {place} road can set their watches by the candle that crosses the upper windows at dusk, and the floor plan filed at the courthouse no longer matches the rooms.",
      roomLabels: ["Nailed front hall", "Portrait stair", "Dust-sheet parlor", "The set dining room", "The kept nursery", "Mirror room, cloths drawn", "Servants' passage", "The cold study", "Master bedroom, locked from within", "Attic of trunks", "Wine cellar", "The burned wing", "Chapel niche", "Bricked garden door"],
      terrain: ["sheeted furniture giving half cover — and not always where it stood a moment ago", "the grand stair: high ground, long sightlines, a landing built for shoving", "a chandelier overhead on a chain one clean hit from letting go", "servants' passages, single file and pitch dark, with doors at both ends"],
    },
    {
      names: ["Old Renwick Under the Mere", "The Drowned Parish", "The Bell Below {place}"],
      description:
        "A valley town drowned two generations ago when the weir was raised, its houses bought out, its people resettled uphill to {place} — all but the ones in the churchyard, who were promised the water would never reach them. It did. At low water the bell tower breaks the surface, streaked and patient, and ferrymen will row you over the high street for a coin but refuse a second trip for any money. The mere has been sinking all season though no sluice stands open, and the town is coming back up one rooftop at a time — dry, somehow, where it ought to be rotten.",
      roomLabels: ["Bell tower, above the waterline", "Choir loft landing", "Drowned high street", "The ferry stage", "Chapel nave, knee-deep", "Vestry", "The crypt, impossibly dry", "Schoolhouse", "Flooded green", "Miller's row", "The manse", "Lych-gate", "The weed-wrapped well", "The old bridge, underfoot"],
      terrain: ["black water, knee to waist, over slick cobbles — difficult terrain that swallows dropped lights", "pews and market stalls rotted to sudden pitfalls", "the bell rope, live and temptingly reachable, running up through the tower's dark", "mist off the mere in banks that give and take sight by rounds"],
    },
    {
      names: ["Thornhaven Rest", "The Convalescent House on the Cliffs", "The Rest Above {place}"],
      description:
        "A private hospital for the wealthy unwell, built on the cliffs where sea air was thought to scour the lungs clean, and closed after a winter the ledgers call only 'the difficulties.' The fees kept arriving for months after the letters stopped leaving. Its intake book lists forty-one admissions in the final year and no discharges at all; its corridors were built wide for wheeled chairs that still take the cliff walk on windless mornings; every window that opens looks at the drop. The matron's handbell rings the rounds at dusk, and the matron has lain buried in {place} for sixty years.",
      roomLabels: ["Reception and the intake ledger", "Sun gallery", "Ward one", "Ward two, doors ajar", "The unnumbered ward", "Hydrotherapy baths", "Dispensary", "Matron's office", "Kitchens and dumbwaiter", "The quiet room", "Laundry and drying lines", "Doctor's residence", "Boiler cellar", "The cliff walk"],
      terrain: ["ranks of iron bedframes forming lanes, cover, and clatter", "a wheeled chair that is never quite where anyone last saw it", "the cliff walk's low rail and its long, listening drop", "steam off the baths — warm blindness drifting through a cold house"],
    },
    {
      names: ["Lastwick Light", "The Light on Widow's Tooth", "The Light Past {place}"],
      description:
        "A lighthouse on a tidal islet and the keepers' village that served it, joined at low tide by a causeway and separated the rest of the day by water that does not forgive impatience. Three keepers vanished one winter with the lamp left burning and supper warm on the table; the village emptied over the years afterward, officially for economic reasons, and the last families carried their doors away with them, which is not an economic custom. The oil was carted off decades ago, yet at dusk the lamp still lights. Harbormasters at {place} have logged two wrecks this season steering TOWARD it.",
      roomLabels: ["The causeway, tides permitting", "Oil store, long empty", "Keepers' kitchen", "Bunk room, three beds made", "The spiral stair", "Watch room", "Lamp room", "The gallery rail", "Signal shed", "Village chapel", "The dry harbor", "Net lofts", "The last kept cottage", "The graveyard above the tide line"],
      terrain: ["the spiral stair — single file, no cover but curvature, and a long way down the middle", "the gallery rail outside the lamp, in wind with opinions", "shingle beach and tide pools that stagger any charge", "the beam itself, sweeping — a wall of blindness whenever it crosses"],
    },
  ],

  hooks: [
    {
      readAloud:
        "The solicitor's office smells of ink and beeswax, and the file on the desk is thick with other people's failures: three surveyors' reports, each thinner than the last, the final one a single page reading 'Declined upon arrival.' 'The estate cannot be sold, inherited, or demolished until it is certified at rest,' the solicitor says, squaring the papers. 'The law, in its wisdom, does not define the term. My clients hope that you can.'",
      summary:
        "{patron}, executor of the estate that owns {site}, hires the party to establish what is wrong there and put it formally to rest — 60 gp each, doubled if the certification survives a magistrate's scrutiny, plus first pick of the contents.",
    },
    {
      readAloud:
        "{patron} lays nine letters on the table at the {tavern}, spread like a losing hand. The paper ages across the row — the first yellowed, the last crisp — but the handwriting never changes, and neither does the signature, and the signer has been dead for twenty years. The newest letter differs in only one way: it asks for help, and it asks for you — each of you, by name.",
      summary:
        "{patron} has been receiving letters from a dead relative at {site} for years and burning them unanswered. The letters know things — true, checkable things — and now they know the party. {patron} will pay everything they have for someone to answer in person.",
    },
    {
      readAloud:
        "The crew boss buys plain talk with a purse on the table: her salvage men went into {site} under contract, came out the same night, and one of them came out wrong. He sits facing walls now, she tells you, eats only if fed, and on market-day he wrote the same three words in the frost of every window on his street. She unfolds the paper where she copied them and turns it to face you: LET ME BACK.",
      summary:
        "{patron}'s salvager left something of himself inside {site} — his shadow does not always match his movements, and he wants back in. She will pay the crew's entire contract fee to whoever retrieves what he lost, or settles the matter some other way she prefers not to imagine.",
    },
    {
      readAloud:
        "The priest receives you in the vestry with the candles already lit against midafternoon. 'On the feast day, the whole parish processes past {site} — every year, one road, no exceptions; the route is older than the parish itself. Last year the lanterns died as we passed. All of them. At once. This year I have counted the days remaining, and I find I believe in very little that would help.'",
      summary:
        "The feast-day procession from {place} passes {site} in nine days, and {patron} the priest wants the dead laid to rest before it does. The parish offers its funeral fund and one thing money cannot buy: the old rite of committal, taught properly, to be spoken with the true name.",
    },
    {
      readAloud:
        "The children of {place} are skipping rope in the market square, chanting a counting rhyme you half-recognize — until the verses keep going past where every version you know stops. The new verses have names in them, and a door, and an hour, and the children cannot say who taught them. One girl skips with her eyes closed, and does not miss, and does not stop when the rope-turners let go.",
      summary:
        "The rhyme is new this season and accurate: its verses encode the rules of {site}. Lately a child has been found at dawn walking toward it, packed for a journey. The parents' council will empty its pockets for someone who makes the rhyme end.",
    },
    {
      readAloud:
        "The sickroom is warm, the invalid is not, and the instructions are extraordinarily specific: which room of {site} to enter first, which bundle of letters to burn UNREAD, which stone in the yard to break with the hammer provided. Payment sits on the coverlet in advance, and it is too much — heir's money, funeral money. 'I am putting my affairs in order,' says your host, gloved hands folded, and never once says the dead's name.",
      summary:
        "{patron} is old, dying, rich, and was present the night {site} went wrong. The commission is real and pays triple — because the job, read closely, is the destruction of evidence. What the party does upon reading it closely is the adventure.",
    },
  ],
  hookAlternates: [
    "An insurer in {place} offers 300 gp to make {site} insurable again; their assessor's complete report is one word long: 'No.'",
    "Each night a different sleeper in {place} dreams the same front door of {site} — and each morning the door in the dream stands one inch wider.",
    "{villain} is quietly buying every letter, portrait, and deed connected to {site}, paying triple and burning the lot; the question worth an adventure is what has not been sold to them yet.",
  ],

  villains: [
    {
      epithets: ["the Unquiet", "Keeper of the Ninth Hour", "the Sorrow in the Walls"],
      motivation: "Died wronged under the roof of {site} and was written out of the record — no grave, no name, no rite — and has concluded that if there is to be no rest, there will be no rest for anyone.",
      plan: "Extend the house's rules outward — first the grounds, then the road, then {place} — until the whole valley keeps the dead's hours and someone, at last, is forced to remember what happened.",
      secret: "They no longer remember their own name. It is the one thing they cannot haunt back into the world, and restoring it — the register mended, the portrait rehung, the wrong gravestone corrected — lays them to rest instantly, no rite, no fight.",
      mannerism: "Tidies as it manifests — straightens frames, closes drawers, sets places — and turns violent at exactly the moment someone undoes the tidying.",
      bossTags: ["undead"],
    },
    {
      epithets: ["Mother Vigil", "the Midwife of Sorrows", "the One Who Weeps Along"],
      motivation: "Feeds on grief the way bees farm flowers, and considers a well-tended haunting the finest garden there is: perennial, self-seeding, and fenced by fear.",
      plan: "Keep the tragedy of {site} forever unresolved — steal the proving letters, rehang the wrong portraits, frighten off priests and buyers — while selling the mourners of {place} charms that keep their grief fresh under the guise of easing it.",
      secret: "She brokered the original tragedy — the bargain, the dose, the storm-glass, whichever your table prefers — and the ghost has never seen her face. The night it learns her face is the night the haunting ends, and not on the party.",
      mannerism: "Mimics the beloved dead's voices almost perfectly — one endearment always wrong — and offers tea at the worst possible moments.",
      bossTags: ["caster"],
    },
    {
      epithets: ["Shepherd of the Quiet Saint", "Warden of the Third Vigil", "the Unfinished Celebrant"],
      motivation: "Leads the last three believers of the order whose 'mercy' caused the tragedy, and holds that the haunting is their saint's sermon — proof the great work was interrupted, never that it was wrong.",
      plan: "Complete the interrupted rite at {site} on the anniversary, with borrowed mourners from {place} in the pews and the dead arranged in their appointed places, so the saint can finally accept what was offered.",
      secret: "The founder's rite never worked, and the founder knew: the celebrant carries the founder's sealed retraction everywhere, unopened, marked 'to be read when doubt comes.' Doubt came years ago. The seal is worn from handling.",
      mannerism: "Speaks in the liturgical plural, checks a pocket-watch against every bell, and blesses interruptions as 'part of the service' — never once raising his voice.",
      bossTags: ["caster", "leader"],
    },
    {
      epithets: ["the Respectable", "Patron of the Sealed Door", "the One Who Walked Away"],
      motivation: "Caused the tragedy at {site} half a lifetime ago, has spent the decades since becoming unimpeachable, and intends to die honored, mourned, and unconfessed.",
      plan: "Fund 'restorations' and hire outsiders — perhaps the party — to cleanse {site} by fire, flood, or consecration, destroying the letters, the portrait, and the register page that together spell out a name and a night.",
      secret: "The ghost has never once tried to harm them. Every manifestation aimed their way has been an invitation: the dead do not want the architect punished, they want them to attend the funeral at last. A confession ends everything — and some buried part of the architect knows it, which is why they never sleep within sight of the house.",
      mannerism: "Never says the dead's name — 'that business,' 'the old trouble' — and wears gloves indoors, and no one living remembers why.",
      bossTags: ["humanoid", "leader"],
    },
    {
      epithets: ["the Second Ghost", "Wearer of Grief", "the Echo That Answers"],
      motivation: "Is not the ghost — is not any ghost — but found the tragedy of {site} standing empty like a well-built house, and moved in to feed on the fear the true story left behind.",
      plan: "Escalate the 'haunting' past anything the real dead would do — wounds, disappearances, voices at windows in {place} — until the region abandons the site entirely and it can hunt travelers from inside a story everyone already believes.",
      secret: "It gets the details wrong. It never read the letters, never saw the true portrait — and the real ghost, silenced and cornered in the one room the pretender cannot enter, has been trying to correct the record all along. Every contradictory clue is the true dead, calling for help.",
      mannerism: "Performs — cold spots a shade too cold, weeping a note too musical — and repeats phrases the party spoke hours earlier, in their own voices, slightly slowed.",
    },
  ],

  twists: [
    "The dead of {site} were not the victim. They were the cause — and the true victim, dying, forgave them aloud. It is the forgiveness they cannot rest under: they are waiting for someone to hear the confession and NOT pardon it. Judgment, honestly rendered, is the mercy.",
    "{patron} was there the night of the tragedy, on the wrong side of it. The commission is the burial of evidence with extra steps, and the real instructions were hidden in what the party was told not to read.",
    "The rules are not the curse — they are a ward the dead built, cold spot by cold spot, around something worse that shares the site. Every rule the party breaks 'to prove there is nothing to fear' is a bar coming off a cage.",
    "There are two ghosts wearing one story. The tragedy took two lives, and they do not agree on what happened; the manifestations contradict because they are an argument. The evidence, followed honestly, sides with the quieter one.",
    "The helpful one — caretaker, ferryman, night porter, whoever keeps handing over keys and warnings — has been dead since the tragedy and does not know it. Their name is on the gravestone everyone calls 'wrong.' Correcting the stone means telling them.",
    "The haunting is leaving. It has bound itself to something portable and is being carried, unknowing, toward {place} — the site's manifestations weaken nightly while somebody's luggage grows cold to the touch. The adventure becomes a deadline and a door-to-door search.",
    "The tragedy is still happening. Inside {site}, the last evening is being lived at one hour per outside day, and the wrong itself is still two of those 'days' from occurring. This is not a memory to lay to rest but a catastrophe to prevent — the dead can yet be saved.",
    "{site} was exorcised decades ago, successfully. What remains is the exorcism: a rite that never learned to stop, wearing the shape of a haunting because that is the only work it knows. It can be dismissed like any ritual — by someone who identifies its liturgy and pronounces it complete.",
  ],

  cluePool: [
    "A second place laid at every set table in the site — cup turned down, chair angled toward the door — no matter how often it is cleared away.",
    "A child-sized handprint in the dust near the top of a wall, a full arm's reach above any child's height, fingers spread like a signature.",
    "Every mirror in the site is draped — and under each cloth, the glass is warm.",
    "The parish register: one burial entry scraped and rewritten in a second hand. Date of death and date of burial sit eleven days apart, and no one buried anyone in between.",
    "One gravestone is spelled perfectly in a yard where every older family stone repeats the same small error — cut by a stranger's hand, and paid for in advance.",
    "Every clock stands stopped at the same hour but not the same minute — each a little later than the last, as if the hour is creeping forward to meet something.",
    "{villain} has paid for fresh flowers on one unmarked grave, weekly, for years. The sexton keeps the receipts and has never once been asked for a name.",
    "Salt lines across the thresholds — laid from INSIDE each room, boxing the corridors out. Whoever laid them believed the hallways belonged to something.",
    "A portrait with the sitter's face scratched out. DC 12 Investigation: the scratches are on the inside of the glass.",
    "The visitors' book has been signed nightly for forty years in the same name — and the ink grows fresher toward today, last night's entry still drying.",
    "A bundle of love letters with every endearment razored out — 'my dear,' 'your own' — each excised with surgical patience. The words were not censored. They were taken.",
    "Locals of {place} skip a certain name mid-sentence; asked directly, their mouths move and no sound comes. DC 13 Insight: they are not refusing to say it. Something is taking it.",
  ],

  monsterTags: ["manor", "crypt"],
  bossTags: ["boss"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "The Wreath on the Door",
        readAloud:
          "The great door of {site} is sealed with law rather than iron: ribbons, wax, a magistrate's knot, all bleached to bone colors. Above them hangs a mourning wreath so old it has gone gray — except for the flowers woven through it, which are fresh enough that you can smell them. In the grass below the step, a line of small offerings faces the house: buttons, a thimble, a tin soldier standing at attention.",
        summary:
          "The party's first sight of {site}: a door in mourning, tended by somebody unseen. Establish the dread, offer two ways in, and plant the first clue.",
        details: [
          "Two ways in: the front door — breaking the wax is loud and the house notices; the first manifestation comes sooner, but so does the first clue — or the badly bricked garden door around back (DC 12 Athletics to open quietly; enters at map area 2).",
          "The wreath's flowers are replaced weekly. DC 12 Survival finds a single line of footprints coming from the direction of {place} — small, light, always alone.",
          "The offerings are payments. Anyone who quietly adds something small before entering has advantage on their first saving throw inside {site}. Note who did, and who scoffed.",
          "Plant the first clue here (see Secrets & Clues); let whoever studies the door before opening it be the one to find it.",
        ],
      },
      {
        type: "arrival",
        title: "Lights at Dusk",
        readAloud:
          "You crest the last rise as the light fails, and {site} stands against the gray exactly as described — shuttered, dark, done. Then, in an upper window, a warm glow blooms: a candle carried from room to room, patient as a servant closing up a house. It crosses three windows, pauses in the fourth, and goes out facing you.",
        summary:
          "The site announces itself before the party ever touches the door. The candle's route is information; so is the fact that it stopped to look.",
        details: [
          "The circuit repeats every dusk, always the same route. DC 13 Investigation from outside maps it — the route ends at the room where the tragedy is best preserved. The house shows visitors where to look.",
          "Watching the full circuit costs the last daylight; entering during it means the 'servant' is mid-rounds. Both are fine choices. Say nothing to suggest either is safe.",
          "A spyglass or DC 15 Perception on the fourth window: the shutter stands open now. It was closed when the party crested the rise.",
          "If anyone calls out or signals, the candle stops mid-window for a long moment before moving on. Nothing else changes tonight. Remember that they did this.",
        ],
      },
      {
        type: "arrival",
        title: "The Keeper of the Keys",
        readAloud:
          "The caretaker meets you at the boundary stone, holding a ring of keys and standing with the toes of both boots exactly behind the property line. The keys are labeled in three generations of handwriting, and the caretaker recites rather than converses: which doors stick, which stair counts thirteen going up and twelve coming down, which rooms to be out of by dark. Only at the end, keys already in your hands, comes the part that sounds rehearsed because it is: 'Take nothing it has arranged. Cover anything that shows your face. And if it sets a place for you — do not sit.'",
        summary:
          "A guided handover at the property line. The caretaker's three rules are real, and the caretaker will not cross the line for wages, rescue, or shame.",
        details: [
          "The three rules are true and mechanically live: the haunting's manifestations can only touch someone who has broken one. The caretaker knows a fourth rule they do not say: the hour the house rearranges. DC 13 Insight catches them checking the sun as they leave.",
          "They answer three questions honestly at the line, then stop — 'Three is what you get. It counts questions. I don't know how, but it does.'",
          "The ring is complete except one key: small, brass, missing since before their time. Its door is wherever the DM wants the finale's proof to wait.",
          "If the party asks the caretaker's own name, there is a pause one beat too long before the answer. File it away (see the twist list).",
        ],
      },
    ],

    middle: [
      {
        type: "combat",
        title: "The Rule Made Plain",
        provides: ["haunting-rules"],
        readAloud:
          "The cold arrives first, rolling down the corridor like water finding a drain, and every flame narrows to a blue thread. Then the sound: one chair, somewhere ahead, dragged slowly back from a table. In the doorway where your lights cross, something has assembled itself out of the dark between lanterns — and though there are several of you, it faces only one.",
        summary:
          "The first true manifestation, and the first lesson: the haunting has rules, and it can only touch those who have broken one. A fight the party can end by understanding it.",
        details: [
          "It targets only rule-breakers — whoever said the name, uncovered a mirror, pocketed something arranged, sat where a place was set. If nobody has broken a rule yet, it walks through the party without touching anyone, which is worse. Track breaches from here on.",
          "Attacks against rule-keepers simply miss: the swing bends wide, the cold parts around them. State this plainly by round two — the mechanic IS the horror, and learning it is the reward.",
          "A breaker can leave the target list mid-fight by undoing the breach: replacing the cloth, returning the taken thing, an apology spoken aloud to the room (one action, no roll — sincerity is the roll).",
          "It cannot be destroyed here, only dispersed: at half HP, or the moment any breach is undone, it drops to mist until the next hour. Killing it is not the lesson. The lesson is that the rules are the dead's grammar — and that grammar can be read.",
        ],
        combat: {
          tactics: "It moves through walls and mirrors to reach its breaker and ignores everyone else absolutely — through opportunity attacks, through shields, through fire — stopping dead the instant its target undoes the breach.",
          terrain: "a lightless corridor where the cold snuffs unattended flames; mirrors and doorways serve it as doors",
        },
      },
      {
        type: "exploration",
        title: "The Kept Room",
        readAloud:
          "One room in {site} has refused the years. No dust, no rot: the bed turned down, a book split open over a chair arm, supper laid for two on the small table — one place used, one untouched, the untouched chair angled toward the door you came in by. High above the headboard, farther up the wall than any child could reach, a single small handprint is pressed into the plaster.",
        summary:
          "The house's reliquary: the night of the wrong, preserved in objects. It answers questions if read carefully — and it enforces the rules absolutely.",
        details: [
          "DC 13 Investigation reconstructs the last hour from positions alone: who sat where, who left mid-meal, which door was locked from which side. This is the true history's skeleton; whatever records survive elsewhere in {site} can put flesh on it.",
          "Everything here is 'arranged' (the first of the haunting's rules: take nothing it has arranged). Taking anything marks the taker as a breaker and starts the hour early. The room resets overnight — anything moved is back by morning, including things carried to other floors.",
          "Beside the handprint, faint pencil ticks climb the plaster with dates — a family measuring a child's reach, year by year. The marks stop the year of the tragedy. The print is a full hand's width above the highest tick.",
          "Righting one wrong detail (the fallen chair, the book closed on its ribbon) makes the cold withdraw from this room while the party works — first proof that the haunting can be soothed, not merely fought. A small gift left at the untouched place setting earns a quiet favor: one locked door, later, found open.",
        ],
      },
      {
        type: "skill",
        title: "The Séance",
        readAloud:
          "The circle is chalk, the candles are lit, and for a long while the only voice is yours, reading the invocation into still air. Then the temperature steps down, once, like a stair. The planchette — or the frost on the mirror, or the raps in the table wood — begins to move with the terrible patience of something that has waited years to be asked.",
        summary:
          "A structured attempt to question the presence directly. Done well it yields truth and terms; done badly it hands the haunting a door.",
        details: [
          "Before dice, the party sets three questions aloud. The presence answers truly but obliquely — frost-letters, raps, objects nudged an inch — never in plain speech. Play the answers; make the players interpret.",
          "If anything else is listening (see your villain's plan), the séance is where it eavesdrops — or impersonates. The Insight check below is what separates the voices.",
          "Each PC in the circle contributes one check; the circle holds at three successes before three failures.",
          "Asking for the name outright is legal and dangerous: on a success it arrives letter by letter, the temperature falling one coat per letter — and the DM decides what else hears it spelled.",
        ],
        skill: {
          description: "Hold a séance circle long enough to ask three questions and survive the answers.",
          checks: [
            { skill: "Religion", tier: "medium", use: "keep the invocation's cadence unbroken while the room changes" },
            { skill: "Insight", tier: "medium", use: "tell the true speaker from anything borrowing its voice" },
            { skill: "Arcana", tier: "hard", use: "read the manner of manifestation — what it cannot say is a clue" },
            { skill: "Performance", tier: "easy", use: "steady the circle's voices so no silence opens for something else" },
          ],
          success: "Three questions answered truly, one rule of the haunting named plainly, and the presence's demand stated — the first draft of the finale's moral choice.",
          failure: "The séance inverts: the presence asks the questions, and each one unanswered costs — a candle dies for good, a PC's reflection goes missing until dawn (disadvantage on their next save against fear), or something in the room learns a party member's name.",
        },
      },
      {
        type: "combat",
        title: "Where the Faces Hang",
        readAloud:
          "The long room is hung with faces — portraits, photographs, painted panels, whatever this house honors — and every one of them has been turned to face the door you came through. Your lights pick out varnish, gilt, dust. On the lantern's second pass, the count is wrong: there are more figures standing along the walls than there are frames hung on them.",
        summary:
          "A fight against what stands among the portraits — things that hold perfectly still in light and cross the room between lantern-swings.",
        details: [
          "In light they are indistinguishable from portraiture (passive Perception 16 catches one mid-settle). In darkness they move — fast, silent, converging. Every dropped or snuffed light is a gift to them.",
          "Each one is bound to the face it wears: holding its portrait up before it freezes it in place while the portrait stays raised — one hand occupied, one enemy parked. The party can figure this out or pay for not knowing it.",
          "One frame matters: the scratched-out face (see Secrets & Clues). It is the only portrait nothing will stand near, and taking it down reveals a name painted over on the wall behind — in paint younger than the portrait.",
        ],
        combat: {
          tactics: "They advance only through darkness and hold statue-still in any beam, spreading wide to force the party's lights apart until somebody stands in shadow.",
          terrain: "a long gallery where light is safety, lanterns swing, and every candle is one gust from going out",
        },
      },
      {
        type: "social",
        title: "The Last Witness",
        readAloud:
          "The witness agreed to meet you only at the {tavern}, in the corner with a wall at their back, and they have already arranged the table: salt cellar by the left hand, three candles lit and a fourth standing unlit, ready. They are old now — they were young that night — and they tell it in the flat voice of a story worn smooth from handling. Only twice does the telling snag: once at a name they step around like a hole in a floor, and once when the unlit candle, untouched, tips gently onto its side.",
        summary:
          "An interview with the last living person who was there. They know the rules, the hour, and the name — and they lie about exactly one thing: their own part in it.",
        details: [
          "Freely given: the rules (matching the caretaker's, if the party met them), the hour the house changes, and the tragedy as the official story tells it. DC 13 Insight during the telling: the official story has one seam, and the witness looks at their hands every time they cross it.",
          "The lie is theirs to own: they did something, or failed to do something, that night — pick the version that feeds your chosen villain and twist. They confess only to kindness; Intimidation shuts them like a door and loses the name for good.",
          "Shown any object from {site} — a letter, a child's toy, the portrait — they stop performing and start remembering: one automatic truth per object, delivered as your best slow monologue.",
          "When at last they write the name (they will not say it), every candle on the table leans. The witness watches this, nods, and says: 'It knows I'm talking to you. Good. Tell it I'm sorry I took this long.'",
        ],
      },
      {
        type: "setpiece",
        title: "The Hour of Rearrangement",
        readAloud:
          "Somewhere below, a clock that does not exist begins to strike, and {site} moves with it. Not a tremor — a decision: doors sighing shut in sequence, a corridor drawing itself longer ahead of you, the stair you climbed an hour ago now facing the wrong way in the dark. Between the strikes you can hear furniture walking politely back to where it stood on the night everything went wrong.",
        summary:
          "The site's signature move: at its hour, the house rearranges itself toward the layout of the tragedy night — with the party inside, and something walking the seams.",
        details: [
          "Run it as a moving maze with a fight in it: each round, one announced change (a door migrates, a corridor shortens by ten feet, a room rotates its exits). Doorframes never move — standing in one is safe ground, and clever parties will chain them like stepping stones.",
          "What walks the seams herds rather than kills: shoving, dragging, closing a wall between the strongest and the weakest. Separating the party is its victory condition; reunion is the party's.",
          "DC 15 Investigation or History mid-chaos: the moves are not random — the house is restoring the floor plan of the night of the wrong. Whoever passes can predict the final change before it lands and acts first in the last round. The house is rehearsing its worst night; remember that when the finale arrives.",
          "When the hour ends, redraw two map connections. Any change that would strand the party instead deposits them at the door of the room the house keeps best — the house is not killing them; it is showing them where to look.",
        ],
        combat: {
          tactics: "It works the geometry rather than the party: shoves through moving thresholds, walls closed between allies, and direct strikes reserved for whoever tries to hold a seam open.",
          terrain: "architecture in motion — migrating doors, a shortening corridor, unmoving doorframes as islands, and one wall closing like a slow eyelid",
        },
      },
      {
        type: "exploration",
        title: "The Paper Trail",
        readAloud:
          "The records survive the way records do — damp-swollen, mouse-eaten, stubborn: parish registers, intake ledgers, keepers' logs, a ribbon-tied brick of family letters. Someone has been here before you, and recently: the dust is wiped in tidy arcs, and pages have been razored out with a steadiness that took its time. What remains is a story with holes in exactly the shape of a name.",
        summary:
          "The archive assembles the true history — most of it. The gaps prove someone living is editing the record, and the gaps themselves are legible.",
        details: [
          "One hour and DC 13 Investigation or History yields the tragedy's true sequence except the who: the dates, the eleven-day gap between death and burial, the payment that changed hands. Every razored page ties to your chosen villain's secret — the edit is their fingerprint.",
          "The razor missed things: impressions on the pages beneath (a charcoal rubbing recovers them, no roll if a player thinks of it, DC 10 Investigation as a nudge), and one letter with every endearment cut away — the cuts, not the words, are the clue (see Secrets & Clues).",
          "Papers left here overnight are edited by morning. A stakeout (opposed Stealth, or DC 15 Perception in watches) catches the editor at work — a manifestation, a hireling, or the villain in person, per your build. This is the party's best chance to meet the enemy early and off-script.",
          "Nothing in the archive says the name. Where the name should be, every document defers outward — 'interred beneath stone at the yard' — which is how the archive quietly aims the party at the graveyard.",
        ],
      },
      {
        type: "skill",
        title: "Holding the Lamplit Room",
        readAloud:
          "It begins at full dark with one knock, patient and singular, at the door behind you. By the time the candles gutter there are knocks at the walls, the shutters, the floor — never hurried, never angry, a house asking to be let back into itself. The salt line trembles at each impact, fine grains hopping like rain on a drumhead, and the night outside the window has gone the flat black of a closed eye.",
        summary:
          "A siege of hours: the site's whole attention on one defended room until dawn. Nothing to hit — only rules to keep, nerve to hold, and a grammar to learn.",
        details: [
          "Group challenge, five successes before three failures, run in watches. Describe each failure as ground given: a shutter opening, the salt breached at one corner, the candle count falling.",
          "The knocking carries information: DC 15 Arcana or Religion (one attempt, counting toward the challenge) reads the rhythm — it is a date, struck over and over. The date belongs to the revelation; here it is the reward for listening to the thing everyone else is merely enduring.",
          "Any rule kept perfectly through the night (mirrors covered, nothing arranged touched, nobody in the set chair) visibly weakens the assault on that front — say so out loud. This scene exists to prove the rules are load-bearing.",
        ],
        skill: {
          description: "Hold a warded room from full dark to first light against the site's undivided attention.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "brace the door and shutters as they bow inward with each knock" },
            { skill: "Religion", tier: "medium", use: "re-lay the salt and keep the vigil-words going as drafts hunt the candles" },
            { skill: "Perception", tier: "easy", use: "call which wall the next assault lands on before it lands" },
            { skill: "Insight", tier: "hard", use: "pick out the one knock in a hundred that is asking, not attacking — and answer it" },
          ],
          success: "Dawn comes, the room holds, and the party owns the haunting's grammar: advantage on their next check to interpret, bargain with, or rite away the presence — plus the date hammered into the knocking.",
          failure: "The room is breached before light. Nobody dies; something is TAKEN — a keepsake, every flame at once, or the name of someone a PC loves, gone from memory until dawn. The site now holds a token of theirs, recoverable in the finale.",
        },
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "The Wrong Gravestone",
        provides: ["true-name"],
        readAloud:
          "The burial yard is small, walled, and honest — until the far corner, where the honesty stops. One stone stands fifty years newer than its carved date, the grass before it worn bare in a kneeling-shaped patch, and fresh lilies lie against it with their cut stems still beading water in front of you. In a yard where the family's older stones all repeat one small, faithful misspelling, this stone alone is spelled perfectly — cut by someone who never knew them.",
        summary:
          "The truth room. The stone, the register, and what lies — or does not lie — beneath assemble the full tragedy and hand the party the true name: the finale's key.",
        details: [
          "Assemble everything here: the scraped register, the eleven-day gap, every date and seam the house or its witnesses have surrendered. DC 13 Religion or Investigation cross-reads them into the true history — deliver it as one clean paragraph. This is the adventure's turn: from here the finale is a choice, not merely a fight.",
          "The stone is wrong on purpose — wrong name, wrong date, or wrong grave, per your villain: the body absent, the body doubled, or the body somebody else's. Opening the grave is loud, honest, and definitive; reading the stone-cutter's mark (DC 12 Investigation, traceable to a paid commission) is quiet and damning.",
          "The true name, once learned, is equipment: spoken aloud in the finale it staggers the haunting's fury for a round (once), slips a pretender's mask a layer, or — said kindly at the right moment — counts as one full step of any laying-to-rest.",
          "Fresh lilies mean a living visitor, weekly, for decades, and the worn footprints lead toward {place}. Whoever kneels here is the moral choice, walking — decide now whether it is your villain, your witness, or your patron.",
        ],
      },
      {
        type: "social",
        title: "What the Dead Ask",
        readAloud:
          "For once there is no cold and no theater — just a figure at the room's far end with its back to you, tidying something that does not need tidying, the way people do while deciding how to begin. When it turns, it wears its face the way the portraits remember it, and the room quietly puts on the past around you: dust sheets gone, candles lit, the supper places set. 'You have read everything,' it says, in a voice like a door kept oiled for years in the dark. 'So ask me. And then I will ask you.'",
        summary:
          "The presence grants an audience at the site's heart — answers freely, shows the night as moving shadow, then makes its demand. The demand is the problem.",
        details: [
          "It answers any question about the tragedy truthfully and completely; this is where the remaining mysteries close. What it cannot say (the pretender's nature, the hag's face, its own lost name — per your build) it SHOWS instead: frost pictures, shadow-play on the wall. Grief in full, gore in none.",
          "Then the demand, matched to your villain: bring the architect to this room; stay, and keep the child company forever; carve the stone true and burn the register; take the name out of the world entirely. At least one demand should be understandable AND wrong. DC 14 Insight separates what it wants from what it needs — to be witnessed, named, and buried, not obeyed.",
          "The party may bargain, refuse, or promise. Promises are load-bearing: kept ones convert finale rounds of fighting into rounds of rite; a false one is known the instant it is spoken, and the finale's fury begins pre-escalated. Say none of this — let honesty be the trap that never springs.",
          "However it goes, the audience ends AT the hour: mid-sentence the room resets — dust sheets, cold, dark — and the figure is one doorway from the finale, waiting to see what they do with the truth.",
        ],
      },
      {
        type: "skill",
        title: "The Hour Before",
        readAloud:
          "The whole site has begun to remember at once: doors opening on rooms wearing their old furniture, voices running ahead of you down corridors like water through pipes, the tragedy assembling itself scene by scene between you and the heart of the house. The route is still passable — but only along the path the night itself once took, and the night is walking it now. Behind you, rooms are going dark in order, like a hand closing.",
        summary:
          "A timed traverse to the finale through a site in full re-enactment. The safe path is the tragedy's own route — walk with the story, not against it.",
        details: [
          "Group challenge, three successes before three failures, each PC contributing once. The corridors crossed are the tragedy in fragments — narrate one image per check, so the traverse doubles as the story's final recap.",
          "Tokens spend here: the caretaker's keys convert one failure to a success; the true name lets the party pass one replay untouched (spoken softly, the figures make room); the witness's written apology quiets the worst corridor. Preparation is the difficulty slider.",
          "Every failure has a face, never a rockfall: a door forced while something watches, a replayed figure passing straight through a PC (stunned one round — icy, not injurious), the heart's door found already swinging shut. Costs are time, tokens, and position — never a TPK-shaped hole.",
        ],
        skill: {
          description: "Reach the heart of {site} along the tragedy's own route before the hour strikes.",
          checks: [
            { skill: "History", tier: "medium", use: "step where the story steps — match the route the records described" },
            { skill: "Athletics", tier: "medium", use: "force the one door the night wants closed" },
            { skill: "Insight", tier: "easy", use: "tell replay from present danger, and walk straight through the harmless" },
            { skill: "Religion", tier: "hard", use: "hold the vigil-words steady as the procession passes through the party" },
          ],
          success: "The party reaches the heart with a round in hand: positions chosen, tokens ready, and the presence's attention not yet turned their way.",
          failure: "They arrive marked by the crossing: the haunting's fury acts first, and each net failure has claimed its price — a carried proof taken ahead to the heart-room (retrievable there), one PC arriving a round late by another door, or every light they carry arriving out.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "The Laying to Rest",
        readAloud:
          "The heart of {site} is the one room where nothing is wrong, and that is what is wrong with it: candles burning that nobody lit, the bier dressed, the air warm for the first time since you crossed the boundary stone. The presence stands at the center in its true shape, and around it the fury moves like weather — a second thing wearing the same grief. Every candleflame in the room leans toward you in the doorway.",
        summary:
          "The finale as funeral: complete the laying-to-rest while the fury — the grief's reflex, not its wish — tries to stop everyone, the dead included. Stats stand ready for the moment mercy fails.",
        details: [
          "The rite is four steps, any order, one action each, by anyone: speak the true name kindly; return a token of the night to its place; right the central wrong (per your build — the stone corrected, the confession read aloud, the body carried home); and say the words of parting (DC 14 Religion, or no roll with the parish rite or the witness's blessing).",
          "The fury cannot help itself: it attacks the rite exactly as it attacked that night, and the presence cannot restrain it, because the fury IS its refusal. Each completed step visibly quiets one aspect — cold, dark, sound, then speed. After the third step it hesitates a full round, a face almost remembered. Finish kindly.",
          "Violence works. The fury has stats and can be dropped, and if the rite collapses — three steps interrupted, or a false name spoken — it must be. Afterward, state the cost honestly: the site goes quiet, not clean, and the last image is the supper place, still set.",
          "If a villain stands opposed (architect, hag, pretender, celebrant), they work a counter-clock: one rite-step undone every two rounds unless engaged. The party budgets actions among rite, fury, and villain — that budget IS the finale.",
        ],
        combat: {
          tactics: "The fury targets whoever holds the next rite-piece, interposes at thresholds, and snuffs one candle per round; while three or more candles burn, rite checks are made with advantage — and it knows that too.",
          terrain: "the heart-room: the anchor at center, candles that matter, tokens with true places, and cold that climbs one step every round the rite stalls",
        },
      },
      {
        type: "climax",
        title: "The Night, Replayed",
        readAloud:
          "The hour strikes, and the site stops pretending to be a ruin: light everywhere, voices everywhere, the whole tragedy risen and moving through its last evening with you inside it. The figures do not see you — until one of them sets an extra place, draws out a chair, and looks up. The house has written you into the script, and it is holding the night open at the last page.",
        summary:
          "The re-enactment finale: the tragedy replays at full strength with the party cast in it. Fight the night's momentum — or change the ending from inside it.",
        details: [
          "Script beats land on a clock, announced one round ahead like weather: the quarrel, the lights failing, the locked door, the wrong itself on round 5, the hush after. The party can spend actions on the fight or on the beats — holding a door open, keeping a lamp lit, standing in the way. Each beat broken weakens the haunting's fury (a cumulative -1 to its attack rolls) and loosens one lock on the ending.",
          "At the wrong's moment there is one window: a single interposing action (contested check or DC 15, fit to the deed — a catch, a parry, a truth shouted across the room) changes the ending. The replay collapses into a laying-to-rest already half-done. Reward it as the true victory.",
          "Failing the window is not defeat. The night completes, hardens, and the fury turns on the witnesses with everything it has: a straight, honest final fight in the wreck of the scene — ended by damage, or by the true name spoken to it while it stands over someone.",
          "PCs the house has 'cast' move through the replay untouched while they play along — carry the tray, dance the step, answer to the borrowed name — and draw every eye the instant they break character. Stepping in and out of the script is the scene's tactical texture.",
        ],
        combat: {
          tactics: "The night defends its script: cast figures body-block whoever moves toward a beat, the fury guards the site of the wrong like a standard, and everything in the room converges on the first PC to break character.",
          terrain: "the tragedy at full light — crowded rooms that change with every beat, script events announced a round ahead, and one door, one lamp, and one stair that decide the ending",
        },
      },
      {
        type: "climax",
        title: "The Unmasking",
        readAloud:
          "{villain} is already in the heart-room when you reach it, arranging the scene with a director's calm — and the cold in the corner is not theirs. 'You have the letters,' they say, unhurried, watching your hands rather than your eyes. 'Letters burn. Stones re-carve. Witnesses, historically, retire.' Behind them, in the one corner of the room their footprints never cross, something waits to hear what you will say.",
        summary:
          "The confrontation finale: {villain} against the party before the one witness that matters. Truth is ammunition — every proof spoken strips the villain of something — and the fight stands ready for when the last mask drops.",
        details: [
          "Each distinct proof presented aloud — the true name, a register page, a rubbing, a stone-cutter's mark, a witness's word — is an action and a DC 14 Persuasion, Religion, or Intimidation. Success strips one villain asset: a disguise layer, a ward, a wave of help, the hirelings' nerve. At three truths landed, the presence itself joins the party's side — give it one described action every round.",
          "{villain} answers in kind, fighting the evidence first: braziers stand lit, and proof in hand is a target. A proof destroyed unheard is gone for good; a proof already spoken cannot be unsaid. Remember {epithet} was earned somehow — let them be frighteningly good at this.",
          "The corner the villain will not cross is the presence's ground. PCs who have kept the rules, or who carry the name, may retreat into it — the cold parts for them, the villain cannot follow, and anything hurled in fails. One safe square, and everyone in the room knows which it is.",
          "Mercy stays on the table to the last: below half HP, with three truths standing, the villain can be offered confession instead of death — DC 15 Persuasion with the proofs in evidence, DC 20 without. Accepted, the finale resolves as a laying-to-rest for the living and the dead at once. Refused, the presence stops waiting.",
        ],
        combat: {
          tactics: "{villain} readies actions against whoever speaks next, sends minions after the proofs rather than the bearers, and keeps their own body between the party and the corner they will not enter.",
          terrain: "the heart-room dressed for erasure — lit braziers hungry for paper, the presence's inviolate corner, and every proof in the room a thing that can be carried, burned, or shouted",
        },
      },
    ],
  },

  complications: [
    "The hour strikes early, mid-scene and unannounced: doors migrate, one corridor shortens, and whatever the party was doing acquires an audience of moving walls.",
    "A mirror somewhere has slipped its cloth. Until it is found and covered, every reflective surface in the site counts as a door for the presence — and reflections run a half-beat behind.",
    "A deputation arrives from {place}: a priest with the wrong rite, six torches, and every intention of settling matters by burning something. The site reacts to them the way a wound reacts to salt.",
    "A rule has changed overnight. The salt lines are dead letters now; something else protects instead. The first breach is free — the presence demonstrates rather than punishes — and the demonstration is worse than any punishment.",
    "Something belonging to a PC — pocketed days ago, or lost years before this adventure began — sits perfectly arranged in the kept room, labeled with their name in fresh ink.",
    "The weather shuts the way out: fog to the treeline, tide over the causeway, the road washed dark. Nothing supernatural, probably. Nobody leaves before dawn, and the house knew before the sky did.",
    "The cold spot that kept its distance is closer now. It follows at exactly nine feet — measure it; it never varies — behind whoever last handled the letters.",
    "{villain}'s hand shows: a proof left unguarded is gone, altered, or replaced by a fair copy in which one changed word changes everything.",
  ],

  sensory: [
    "A cold with edges — one step in, deep winter; one step back, only night air.",
    "Candleflames leaning together toward the same closed door, like grass in a wind nobody feels.",
    "Lilies and camphor on the air of rooms where nothing has bloomed or been washed in decades.",
    "A clock ticking two rooms away, in a house where every clock shows the same stopped hour.",
    "Bare patches on the floorboards, freshly clean, exactly where furniture stood the night everything stopped.",
    "Three knocks from inside a wall, at headboard height, evenly spaced, unhurried.",
    "A child's counting from somewhere above, faint and content, always breaking off one number before ready-or-not.",
    "Under every other sound, water moving slowly through rooms that hold no water.",
    "Your breath fogging in one doorway of a warm corridor — that doorway only.",
    "The rustle of dust sheets settling, room by room, a moment after your light leaves each one.",
  ],

  cutAdvice: [
    "Cut Holding the Lamplit Room first — fold its best costs (the dead candle, the taken name) into the séance's failure ladder.",
    "Merge the two straight fights: what stands where the faces hang makes its move during the Hour of Rearrangement, freezing whenever a migrating wall exposes it to light.",
    "If the finale must start NOW, The Hour Before becomes three sentences and one Wisdom save at the heart-room door — failure only means the fury acts first.",
  ],
};
