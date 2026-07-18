import type { ThemePack } from "./schema";

export const RESCUE: ThemePack = {
  theme: "Rescue",
  moduleLetter: "R",

  titlePatterns: [
    "The {adj} {noun}",
    "{noun} at {place}",
    "Before the {adj} Dawn",
    "The {noun} of {place}",
    "Out of the {adj} {noun}",
  ],
  titleAdjectives: ["Ninth", "Stolen", "Burning", "Long", "Cold", "Broken", "Last", "Iron", "Hollow", "Red", "Silent", "Borrowed"],
  titleNouns: ["Hour", "Ransom", "Cage", "March", "Road", "Vigil", "Chain", "Lantern", "Toll", "Reckoning", "Crossing", "Debt"],
  taglines: [
    "They are alive. Every hour you spend proving it, they are less so.",
    "The ransom note gave three days. The handwriting was shaking.",
    "Nobody watches a road like the people who own what travels it.",
    "Count the guards twice. Count your friends three times.",
    "A rescue is a heist where the treasure has opinions.",
    "The trail was easy to follow. That is the part that should worry you.",
    "By dawn, the caravan moves and the trail goes cold forever.",
    "Some debts are collected in coin. {villain} collects in people.",
  ],

  sites: [
    {
      names: ["The Tollhouse at Wolf's Bridge", "The Old Tollgate", "The Bridgecamp on the {place} Road"],
      description:
        "A fortified tollhouse on the only bridge for twenty miles, seized by {villain}'s company and turned into a holding pen. The captives are kept in the flood-cellar below the waterline; the toll still gets collected upstairs, which is how the whole county knows and does nothing. Traffic creaks past all day, eyes forward, and the river carries sound both ways.",
      roomLabels: ["Bridge approach", "Toll window", "Common room", "Kennel yard", "Guard loft", "Smoke shed", "Flood-cellar stair", "The wet cells", "Quartermaster's store", "Collapsed span", "Boat tie-up", "Watch platform", "Cook's corner", "The captain's room"],
      terrain: ["the narrow bridge span forcing single file", "waist-high toll barriers as ready cover", "the flood-cellar's ankle-deep water announcing every step", "stacked cargo pallets forming shifting lanes"],
    },
    {
      names: ["Camp Ashpike", "The Quarry Palisade", "The Cut above {place}"],
      description:
        "An abandoned quarry above {place}, ringed with a fresh palisade of sharpened birch — built in a hurry, and built to keep people in, not out. Tents stand in disciplined rows around the crane winch, and the captives sleep in the cut itself, forty feet down, where the only ladder is drawn up each night like a drawbridge. Fires burn on a schedule. Someone here has run camps before.",
      roomLabels: ["South gate", "Watch fire ring", "The winch platform", "Officer's tent", "Provision pit", "The cut floor", "Sluice channel", "Powder store", "Dog line", "Broken crane", "The counting table", "North breach", "Spoil heap", "The ladder head"],
      terrain: ["the forty-foot quarry wall splitting the fight into two levels", "tent lines and guy-ropes that tangle a careless charge", "the crane winch — cover, high ground, and escape route in one", "spoil heaps of loose scree that roar underfoot"],
    },
    {
      names: ["The Drowned Priory of {place}", "The Fen Chapterhouse", "Saint Maren's-in-the-Reeds"],
      description:
        "A half-sunk priory in the fens where {villain}'s people wait out the search parties, reachable only by punt along channels that rearrange with the tide. The captives are in the bell tower — the one dry place — which means every rescue plan ends with a climb everyone below can watch. Herons stalk the causeways. The bell rope was cut a long time ago, but the bell is still up there, and so is a lookout.",
      roomLabels: ["Punt landing", "Reed maze", "Sunken cloister", "Refectory shallows", "The dry stair", "Bell tower watch", "The captive floor", "Roof walk", "Priory kitchen", "Drowned chapel", "Eel weir", "The prior's cell", "Duckboard walk", "Signal brazier"],
      terrain: ["knee-deep water everywhere but the duckboards", "reed banks giving concealment but not cover", "the tower's spiral stair, one combatant wide", "punts — fast, silent, and tippy"],
    },
    {
      names: ["The Ninth Milestone", "The Caravan Ground at {place}", "The Long Halt"],
      description:
        "A caravan staging ground at the ninth milestone out of {place}: wagons in a defensive ring, oxen already in harness, and a departure planned for first light that will scatter the captives across three borders by week's end. Tonight the ground is a small, ugly town — teamsters, guards, buyers with paperwork — and the captives are somewhere among forty wagons. Tomorrow it is dust.",
      roomLabels: ["The ring gate", "Master's wagon", "The auction awning", "Ox lines", "Water cart", "The barred wagon", "Farrier's fire", "Guard mess", "Paper table", "Scout's rise", "The dry ditch", "Wheelwright's rack", "Tally post", "Night paddock"],
      terrain: ["the wagon ring — cover everywhere and sightlines nowhere", "panicked draft animals as a living hazard", "the auction awning's lamplight pooling in a dark field", "the dry ditch circling the camp like a moat"],
    },
  ],

  hooks: [
    {
      readAloud:
        "The girl who brings the message has run so far she cannot stand while she delivers it. 'They took the whole wagon,' she manages, hands on knees. 'My mother. The miller's sons. Six more. The men laughed about the bridge toll while they tied them.' She straightens, and her voice goes flat and old. 'Everyone in {place} is very sorry. Nobody in {place} is coming.'",
      summary:
        "Raiders working for {villain} took eight captives off the {place} road. The girl, {patron}'s granddaughter, ran twelve miles to find someone who would actually go. The town will pay what it can scrape; the girl offers the truth: the trail is still warm tonight and gone by dawn.",
    },
    {
      readAloud:
        "The ransom note is beautifully written — a scribe's hand, formal salutations, itemized terms. That is what makes your skin crawl: this is not the first such letter its author has composed. Sixty gold per captive, plus 'handling.' At the bottom, almost warm: 'Payment expected by the dark of the moon. Condition of goods thereafter not guaranteed.'",
      summary:
        "{patron} received the note two days ago and has raised barely a third of the price. The dark of the moon is three nights away. They want the party to deliver the shortfall and negotiate — or, quietly, to make negotiation unnecessary. The professional tone of the letter is itself a clue: {villain} runs this as a business, and businesses have books, schedules, and weak points.",
    },
    {
      readAloud:
        "The soldier drinks like a man performing the act of drinking, and the tavern gives him a wide, careful berth. 'Discharged,' he says, before you ask. 'For refusing an order. The order was to stop looking.' He unrolls a map with holes worn at the folds. 'My sergeant is in that camp. I know the watch rotations, the gate, the dog line. What I don't have is four more people and one working plan.'",
      summary:
        "{patron}, lately of the garrison at {place}, has scouted {site} alone for a month and can hand the party the entire layout — an enormous head start. What they cannot do is go in alone, and their superiors have written the captives off as politically inconvenient. The intelligence is real but five days stale, and one detail of it is now wrong.",
    },
    {
      readAloud:
        "The chapel bell of {place} rings twice at midnight — the old signal, older than anyone who still knows what it means. In the crypt beneath, by a single candle, the priest shows you what was left on the altar at dusk: a child's shoe, a lock of gray hair tied with wire, and a tally stick cut with nine notches. 'Their way of telling us the count,' the priest says. 'It was eight notches yesterday.'",
      summary:
        "{villain}'s raiders are taking people from {place} one at a time, methodically, and cataloguing them like inventory. The ninth was taken while the town slept. {patron} keeps the old signal alive and asks the party to follow tonight's trail while it is hours old — and to learn why the count is being advertised.",
    },
    {
      readAloud:
        "You find the wagon first: on its side in the ford, one wheel still turning in the current. Then the cargo, dumped and rain-ruined — every crate but one pried open and left. What you do not find is people, though the mud tells the story in one long sentence: boot prints, bare prints, rope-drag, dog prints, all walking east together. On the wagon's board, chalked fresh: a crude fish, and an arrow.",
      summary:
        "The party comes upon the ambush site hours after the fact. The chalked fish is a survivor's mark — one captive is leaving signs for anyone who follows. Tracking the column (DC 12 Survival, dropping a step each half-day of delay) leads to {site}. No patron, no fee: just the arrow, pointing east.",
    },
    {
      readAloud:
        "The letter reaches you under a false seal, in a cipher a friend taught you years ago. 'I am not writing to be rescued,' it begins. 'I am writing because from inside I can see what they intend, and it is larger than ransom. Wagons. Ledgers. A buyer with a crest I will not put in writing even here. Come before the dark of the moon, and come quietly — one of us inside is theirs.'",
      summary:
        "One of the captives at {site} — an old ally of the party — has smuggled out a warning: the abductions feed something bigger than coin, and one captive is an informer for {villain}. The friend's letters (two more arrive if the party dawdles) are the adventure's live intelligence, and their final request is firm: the ledgers matter as much as the people.",
    },
  ],
  hookAlternates: [
    "A rival of {villain} offers the party the camp's watch schedule, free — liberated captives can't be sold twice, and ruin is cheaper than war.",
    "One of the captives owes a party member money, a favor, or the truth about something — and dead debtors pay nothing.",
    "{patron} posts an honest bounty: 40 gp a head returned alive, doubled for children, posted in three towns. The math is grim; the sentiment is real.",
  ],

  villains: [
    {
      epithets: ["the Tallykeeper", "Master of the Long March", "the Fair-Dealer"],
      motivation: "Treats the taking of people as honest logistics — cargo, margins, spoilage — and is genuinely offended by the suggestion that anything personal is happening.",
      plan: "Consolidate every captive taken this season at {site}, complete the paperwork, and move the whole inventory to a single wealthy buyer before the dark of the moon.",
      secret: "The 'buyer' has never once paid in coin: the payment is protection, and the protection is from something {villain} saw once and will do anything to never see again.",
      mannerism: "Keeps a running tally aloud in any negotiation — costs, concessions, minutes — and closes every exchange with a courteous, chilling 'noted in the book.'",
      bossTags: ["leader", "humanoid"],
    },
    {
      epithets: ["the Shepherd of the Cut", "Warden of Second Chances", "the Kind Fence"],
      motivation: "Believes, with missionary sincerity, that the captives are being saved — from poverty, from war, from choices — and that gratitude will come later, wholesale.",
      plan: "Break the captives' hope of rescue with staged failures and planted lies, so that when the wagons roll from {site}, no one runs and no one has to be hurt.",
      secret: "Was themselves taken as a child by this same operation, rose through it, and cannot afford to believe the operation is evil — because of what that would make their whole life.",
      mannerism: "Speaks to captives in the plural first person — 'we're tired, we're going to eat now' — and hands out small kindnesses with terrifying bookkeeping precision.",
      bossTags: ["leader", "caster"],
    },
    {
      epithets: ["the Rope-Lord of {place}", "the Debt's Own Hand", "Collector of the Ninth"],
      motivation: "Collects people the way bailiffs collect furniture: every captive secures somebody's debt, and the whole operation is, on paper, infuriatingly legal.",
      plan: "Hold the captives at {site} until each family's debt is paid, sold, or defaulted — and steer every payment plan so that default is the only reachable outcome.",
      secret: "The master ledger contains three names taken with no debt at all — abductions to order, for a client — and any court that saw those three entries would hang the whole company.",
      mannerism: "Produces paperwork for everything, instantly, and strokes the ribbon-seals flat with one thumb while explaining, regretfully, that hands are tied.",
      bossTags: ["leader", "boss"],
    },
    {
      epithets: ["the Grey Drover", "the Night's Quartermaster", "the Patient Column"],
      motivation: "Feeds a distant war that pays for labor by the head and asks no questions about consent — a war {villain} deserted from, and buys their continued absence with bodies.",
      plan: "March the captives from {site} in stages along back roads, splitting the column at every fork so that no single rescue can ever recover more than half.",
      secret: "Keeps one captive from every column — always the one who reminds them of someone — in comfort, unsold, in a cottage nobody else knows about. There are now eleven.",
      mannerism: "Never sits with their back to the captives; studies them with the flat, apologetic look of a butcher who was raised by the herd.",
      bossTags: ["boss", "brute"],
    },
    {
      epithets: ["the Choir-Mistress of Chains", "the Bell That Calls", "Voice of the Hollow Hymn"],
      motivation: "Serves something that does not want the captives' bodies at all — it wants their absences: the shape of grief they leave behind in {place}, harvested nightly.",
      plan: "Keep the captives alive, comfortable, and utterly hidden at {site}, while the town's mourning ripens — then return them, one per season, to plow the grief anew.",
      secret: "The captives are the safest people in the county; it is the searchers who vanish. Every rescue party before this one is still at {site}, and they no longer wish to leave.",
      mannerism: "Hums under every conversation, and pauses the hum — mid-note, head tilted — whenever anyone speaks a captive's name aloud.",
      bossTags: ["caster", "boss"],
    },
  ],

  twists: [
    "One captive is {villain}'s informer — recruited with a promise, not a threat — and the extraction's every stumble traces back to their quiet signals. They will confess only if shown the promise was a lie.",
    "The ransom was never the point: the abductions were commissioned to empty {place} of exactly these people, on exactly these dates. The client's crest is on file in {villain}'s ledger, and it belongs to someone the town trusts.",
    "The captives were moved last night. The camp ahead is fully manned, fully alert, and holding nobody — a rehearsed decoy that has swallowed three rescue parties already. The real column is eleven miles down the other road, and the mud remembers it.",
    "Half the guards are conscripted debtors working off their own families' ransoms — captives with spears, guarding captives. Offered proof the books will burn, they will not merely stand aside; they will turn.",
    "The one who hired the party is the one who sold the captives, buying back the evidence before a rival exposes the deal. The rescue is real; the motive is laundering. The captives know the truth, which is why the 'rescue' comes with a body count planned.",
    "{villain} does not intend to sell the captives — they are hostages against an army that is coming whether they live or die. The dark of the moon is not a deadline for payment; it is when the army arrives, and the rescue is suddenly the evacuation of {site}.",
    "The chalk marks guiding the party were left by a captive, at spearpoint, exactly where {villain} dictated. The trail is true, the timings are true, and the arrival is scheduled. The only unscripted element left is what the party does after the doors close behind them.",
    "One of the captives cannot be allowed out: they took the ransom road on purpose, carrying something contagious, cursed, or hunted, hoping to be locked away from the people they love. The rescue's hardest fight is the argument.",
  ],

  cluePool: [
    "Tally sticks at the ambush site, cut in {villain}'s pattern: the count includes two more than anyone in {place} reported missing.",
    "A dropped waybill with real customs stamps — the column travels under legitimate papers, which means a clerk somewhere is paid to look away.",
    "The dogs' water trough at the roadside camp: filled twice daily. Someone provisions this route on a schedule, and schedules can be read.",
    "A guard's letter home, half-finished: 'they promise the debt clears at winter. tell the boys I am doing honest escort work. do not come look.'",
    "The chalked fish appears again — smaller, hurried — on the third milestone. The survivor marking the trail is still able to reach the road.",
    "Cold campfires in a ring around {site}, one per night, each a half-mile out: someone else has been circling the camp for a week without going in.",
    "A child's shoe on the path, placed dead center and weighted with a stone — deliberate as a signature. Left, not lost.",
    "The toll ledger at the bridge shows the same freight company passing every ninth day, always at dusk, always waved through unsearched.",
    "{patron}'s map of {site} is right about everything except the dog line, which moved three nights ago — the camp expects to be scouted.",
    "A ransom letter to a family in another county, same scribe's hand, dated last spring: this has happened before, and that time nobody came back.",
    "One guard wears a soldier's boots from the garrison at {place} — deserter, plant, or salvage, and each possibility is somebody's scandal.",
    "The night wind off {site} carries singing — captives' voices, deliberately loud. They are counting for someone. They believe someone is out there listening.",
  ],

  monsterTags: ["anywhere", "wilds"],
  bossTags: ["boss", "leader"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "The Trail While It's Warm",
        readAloud:
          "The raiders made no effort to hide their leaving — why would they, in country they own? Wheel ruts, boot prints, the scuffed drag of bare feet between them. Then, at the stream crossing, the story changes: the tracks split three ways, and someone has swept the middle path with a pine bough, carefully, recently. Sap still bleeds where the branch was cut.",
        summary:
          "The pursuit opens the session at speed. Reading the split trail correctly is the first test; the swept path is the honest one, and the raiders know exactly how hunters think.",
        details: [
          "DC 12 Survival: the two obvious trails were made by half-loads doubling back — the swept path carries the true column toward {site}. A raw failure costs two hours, not the adventure.",
          "At the crossing, the first chalk fish (see Secrets & Clues): a captive is marking the way for followers. Let whoever spots it name the hope out loud.",
          "A single raider rearguard watches the crossing from a blind 200 feet on. Spotted (passive Perception 14+), he runs — to warn the camp — turning the next scene into a chase or an interception the party chooses how to spring.",
          "Establish the clock here in plain terms: the column reaches {site} tonight; wagons leave at the dark of the moon. Every long rest spends one of those nights.",
        ],
      },
      {
        type: "arrival",
        title: "The Overlook",
        readAloud:
          "From the ridge, {site} lays itself out below you like a diagram of the problem: the fires, the watch posts, the dog line, the one gate. Somewhere in that ordered little kingdom are the people you came for. A guard crosses the yard, unhurried, and the sound of his whistling reaches you four heartbeats late. It is all very close, and all very far.",
        summary:
          "First sight of the objective. This scene is for planning: hand the players real intelligence, let them argue routes, and price each approach honestly.",
        details: [
          "Freely visible: three watch positions, the gate rotation (paired guards, ten-minute gaps at the change), the dog line upwind, and the captives' location — pointed to by where the food bucket goes at dusk.",
          "One truth only scouting reveals: the count is wrong — there are more guards than fires, or fewer. DC 13 Investigation from a closer vantage says which, and why (reinforcements arrived, or a column already left).",
          "Three honest doors in: the gate (bold — a wagon, a uniform, a lie), the {monster} path the locals avoid (dangerous, unwatched), or the night wall (slow, weather-dependent). Price each; promise none.",
          "If the rearguard from the road escaped earlier, the camp below is visibly readier: doubled gate watch, dogs staked wider. Say so — consequences should be seen, not suffered blind.",
        ],
      },
      {
        type: "arrival",
        title: "The Man Who Walked Out",
        readAloud:
          "He is sitting against the milestone as if the milestone were holding him up, which it is. One boot gone, wrists still wearing the rope's signature, eyes fixed on the road behind him. When he registers that you are not them, he starts talking and cannot stop: names, the camp, the schedule, the dogs. Then he grabs the nearest wrist and says the only sentence that matters: 'They know someone is coming. They are moving the strong ones tonight.'",
        summary:
          "An escaped captive collapses into the party's path, carrying priceless, panicked intelligence — and a complication: he escaped because escape was made easy, and he was followed.",
        details: [
          "His intelligence, sortable with patience: true (layout, names, the captives' spirit-keeper, tonight's split), muddled (the guard count — he says forty; it is twenty-five), and one planted lie he believes ('the cellar floods at the sluice — no one is kept there.' They are.).",
          "DC 12 Medicine while treating him: the rope-marks are days old but the boots that 'chased' him never closed — he was let out. DC 13 Insight: he half-knows, and the shame is eating him.",
          "Two trackers shadow him at a distance, under orders to follow, not catch — {villain} wants to know who comes. Spot them (opposed Stealth) and the party can turn the tail into their own trap.",
          "What he wants is simple and terrible: to come back in with you. Whether the party arms him, hides him, or sends him to {place} with the map is a real decision — honor it either way.",
        ],
      },
    ],

    middle: [
      {
        type: "combat",
        title: "The Outer Watch",
        readAloud:
          "The watch post is a lean-to, a fire banked low, and two figures who have done this every night for a month — which is the problem with sentry work: the hundredth quiet night sounds exactly like the night that isn't. One is carving something small. The other watches the dark the way you watch a room you believe is empty.",
        summary:
          "The camp's outer picket must be passed, silenced, or turned. How this scene ends decides how the next one begins: quiet buys the party the interior; noise buys the alarm.",
        details: [
          "The fight is winnable loudly in two rounds — but the horn hanging at the post is the real enemy. A sentry reaches it on his second turn unless prevented; one blast and the camp's interior scenes start alert.",
          "Taken alive, either sentry trades freely: one is a conscripted debtor (see Secrets & Clues) who will name the safe password for the inner gate in exchange for his family's page of the ledger.",
          "The carving in the sentry's hands is a child's toy horse — for one of the captives. Let the party find it. Let it complicate them.",
          "If the party bypasses the post entirely (Stealth, the {monster} path, a wagon ruse), award the time honestly: they arrive at the next scene with the camp still asleep.",
        ],
        combat: {
          tactics: "One sentry engages and retreats toward the horn; the other throws the fire's kettle at the nearest light source and fights blind-friendly. Neither pursues past the picket line — their orders are to hold and blow, not to win.",
          terrain: "a lean-to and banked fire in open ground: light where you don't want it, dark where they do",
        },
      },
      {
        type: "skill",
        title: "Past the Dog Line",
        readAloud:
          "You smell the dog line before you see it: wet rope, old bones, the musk of animals kept keen on short rations. Six stakes, six chains, six shapes lying in the grass with their ears already up. The wind is doing you no favors tonight, and somewhere behind the dogs, a handler's lantern swings its slow, bored arc.",
        summary:
          "The camp's true perimeter is the dogs. Getting the party — and later, the captives — past them is a challenge that rewards preparation and punishes swagger.",
        details: [
          "Run as a group challenge: three successes before three failures. Each PC contributes one check; smart preparation (rations sacrificed to the dogs, wind read correctly, the handler's rotation timed) converts one failure to a success.",
          "Each failure is escalation, not catastrophe: one dog wakes and grumbles (handler strolls over); two, the line starts baying (interior scenes go alert); three, the handler blows the horn and this becomes the Outer Watch fight with dogs in it.",
          "A druid, ranger, or anyone with an animal-handling story should get a spotlight here — let one good idea neutralize the line entirely and make that player the night's quiet hero.",
          "Mark the route used: the extraction will need this same passage in reverse, with people who are slower, weaker, and more afraid than the party.",
        ],
        skill: {
          description: "Cross the staked dog line without waking the pack or drawing the handler.",
          checks: [
            { skill: "Animal Handling", tier: "medium", use: "read which dogs are sleepers and which are the criers" },
            { skill: "Stealth", tier: "medium", use: "move through on the rhythm of the handler's circuit" },
            { skill: "Survival", tier: "easy", use: "find the wind's seam and keep every scent downwind" },
            { skill: "Sleight of Hand", tier: "hard", use: "lay drugged rations without a chain so much as clinking" },
          ],
          success: "The line stays quiet, and the party knows the safe seam through it — an asset they will spend again on the way out.",
          failure: "The camp learns something is in the dark. Guards double, lanterns multiply, and the captives are moved one room deeper.",
        },
      },
      {
        type: "social",
        title: "The Quartermaster's Price",
        readAloud:
          "The quartermaster's tent smells of ink, tallow, and good wine nobody else in this camp is drinking. She does not reach for a weapon when you come in — she reaches for a ledger, licks her thumb, and finds a fresh page. 'Rescue, ransom, or robbery?' she asks, pen waiting. 'I price all three. Sit. You are the first interesting thing to walk in here since the war.'",
        summary:
          "A pragmatist inside the machine offers a deal. She can unlock doors no crowbar can — for a price the party may not want to pay in front of each other.",
        details: [
          "She can deliver, verifiably: the cell keys' location, the interior watch schedule, and one hour of 'miscounted' guards on the night of the party's choosing. She wants: the master ledger destroyed (her name is in it), safe passage out, and one-third of any recovered ransom coin.",
          "DC 13 Insight: she is not lying about anything — she is omitting that the ledger's destruction also erases every debtor-conscript's proof of purchase, freeing them or damning them depending on who wins tonight.",
          "If the party refuses, she does not raise the alarm — bad for business. She sells the same package to nobody, waits, and reappears during the finale at the worst neutral moment, ledger under her arm.",
          "Played straight, she is the adventure's best recurring NPC: a person who has decided systems outlive sides, negotiating with people who intend to burn the system down by morning.",
        ],
      },
      {
        type: "exploration",
        title: "Where They Keep Them",
        readAloud:
          "You find the captives by the quiet. The rest of the camp mutters, snores, clinks — but this room holds the specific silence of people listening for their lives. Then a child's whisper, fierce and hopeful: 'I TOLD you the fish would work.' Eyes appear at the grate, more and more of them, and every one of them is now a clock.",
        summary:
          "First contact with the captives. This scene is the adventure's heart: names, states, and the discovery that a rescue is not one problem but nine of them, each with legs and opinions.",
        details: [
          "Take a breath and give them names — pull from the town's missing list. Establish the three that change the plan: the one who cannot walk (the miller's eldest, ankle broken and splinted wrong), the one who will not go (an old woman who says, flatly, 'they take {place}'s people BACK when the ransom fails — I have seen it — the ones who run are the ones who die'), and the one who watches too calmly (the informer, if that twist is in play).",
          "The chalk-fish artist is here: a ferryman's daughter, twelve, who has counted every guard and drawn the camp on the floor in char. Her map is accurate. Her price is going LAST, 'because the little ones panic.'",
          "Logistics land here, concretely: the door (barred outside, guard with the key at the fire), the count (match it to the town's list — if the numbers disagree, someone is already gone), and the noise (nine people cannot cross a camp silently without a plan, a distraction, or both).",
          "Do not rush this scene. The whole adventure is the promise the party makes in this room; make them say it out loud.",
        ],
      },
      {
        type: "combat",
        title: "The Miscount",
        readAloud:
          "It goes wrong in the smallest way: a relief guard arriving four minutes early, still yawning, tin cup in hand. He sees exactly what is happening. The cup hangs in the air between his hand and the ground for what feels like a full watch of the night — and then it lands, and rings like a bell, and the night is over.",
        summary:
          "A patrol stumbles onto the party at the worst moment. A short, sharp fight against the clock — not the whole camp, only what can reach the noise in ninety seconds.",
        details: [
          "This is the alarm-in-progress fight: the yawning guard plus whoever the noise pulls in. Reinforcements arrive in two waves (round 2, round 4) — after that, the camp assumes the noise was dogs or drink, unless the fight is still audible.",
          "The scene's true objective is silence by round four: every combatant down, quiet, or convincingly explained. Grant advantage on the final Stealth reset if the party achieves it with rounds to spare.",
          "One reinforcement is a debtor-conscript (Secrets & Clues): he arrives, reads the scene, and visibly does not blow his horn. What he wants is thirty seconds of talk and his family's ledger page. Give the party the chance to notice the horn NOT sounding.",
          "If the party is captured here rather than killed, lean into it: {villain} prices them, jails them with the captives, and the adventure continues inside — arguably improved.",
        ],
        combat: {
          tactics: "The first guard fights to be loud, not to win — every action screams for help. The waves that follow fight in pairs, shields up, herding the party away from the captives' door until an officer arrives with the actual plan.",
          terrain: "tent shadows and firelight: dim light everywhere, guy-ropes underfoot (DC 10 Acrobatics when moving through tent lines at speed)",
        },
      },
      {
        type: "setpiece",
        title: "The Ledger Fire",
        readAloud:
          "The strongbox tent is exactly where three separate sources said it would be, and it is already burning. Through the smoke, silhouettes: someone got here first, and they are feeding pages to the flame with the unhurried thoroughness of a person burning their own name. Coin lies scattered and ignored across the ground. Whoever this is, they did not come for money.",
        summary:
          "The camp's records — ransom terms, the buyer's letters, the three commissioned names — are being destroyed in front of the party. A fight in a burning tent over paper worth more than the strongbox.",
        details: [
          "The burner works for the twist's hidden principal (the client, the informer's handler, or {villain} themself, pre-betraying the buyer). Each round, one bundle burns: round 1 routine ransoms, round 2 the buyer's letters, round 3 the three commissioned names, round 4 the debtor pages. Where the fight stops decides what truths survive.",
          "The tent itself escalates: round 3 the canvas catches (ongoing 1d6 fire at tent edges), round 5 the ridgepole drops (DC 13 DEX inside). The fire is also the camp's alarm — everything after this scene happens alert.",
          "Snatched pages are the adventure's hard currency: proof for a court, leverage over the quartermaster, freedom or ruin for the conscripts, and — if the commissioned names survive — the twist in writing.",
          "The scattered coin is a character test with a price tag: filling pockets costs actions while pages burn. Do not comment. Just count.",
        ],
        combat: {
          tactics: "The burner fights only to keep the brazier fed — parrying, retreating around the strongbox, shoving furniture. Their escort holds the tent mouth. If the pages finish burning, every one of them disengages and simply leaves, job done.",
          terrain: "a burning records tent: smoke (lightly obscured, thickening), a central brazier, and paper everywhere the fight wants to be",
        },
      },
      {
        type: "exploration",
        title: "The Column That Already Left",
        readAloud:
          "The math will not come right no matter how you count the tents. Then, behind the ox lines, you find the answer written in the mud: fresh ruts, many feet, one set of wheels heavier than all the others — a barred wagon. The column left at dusk. The trail is four hours old, and it is raining upcountry, and mud does not keep secrets long in the rain.",
        summary:
          "Some of the captives are already gone. The party must split the problem: who stays for the camp, who rides for the column — or whether everything gambles on one choice.",
        details: [
          "The split is real: the column carries a third of the captives (name them — names make the choice cost). It moves slow (oxen, night, mud) and CAN be caught before the border ford by a party that leaves within the hour.",
          "Catching it buys a cleaner fight: six escorts, road-weary, no palisade, no dog line — the adventure's most winnable battle, three hours' ride away, in exchange for surprise back at camp.",
          "DC 13 Survival on the ruts: the column took the low road, which floods. A local, a map, or the ferryman's daughter knows the cutoff that beats them to the ford entirely.",
          "If the party ignores the column, close the thread honestly in the epilogue — recovered later by ransom, by militia, or not — depending on what the party did with the ledgers and the buyer.",
        ],
      },
      {
        type: "combat",
        title: "The Handler's Answer",
        readAloud:
          "The horn you have been dreading finally sounds — but wrong: two rising notes, a hunting call, not an alarm. From the dark beyond the fires comes the answer you understand immediately in your spine: chains hitting the ground, one after another, and then nothing at all where the sound of running paws should be. The handler has stopped guarding the camp. He has started hunting it.",
        summary:
          "The dog handler looses the line and comes hunting the intruders personally. A running fight in the dark against pursuers that track by scent and fight as a pack.",
        details: [
          "This is the consequence-scene for a loud infiltration (or a failed dog-line crossing); on a clean run, it triggers during the extraction instead — at the worst moment, by design.",
          "The pack fights as terrain-in-motion: fast, low, targeting whoever runs and whoever glows. The handler hangs back at whistle range, redirecting them — drop or turn HIM and the pack's coordination collapses to instinct.",
          "The dogs are victims with teeth: starved keen, not evil. Animal Handling (DC 13, action, meat helps) peels one dog out of the fight permanently. A druid or ranger can flip as many as they can feed.",
          "Escaping instead of winning is legitimate: cross water, cross the ox lines (the herd's smell drowns the trail), or reach torchlight where the handler will not follow. Reward map-thinking over hit points.",
        ],
        combat: {
          tactics: "The pack circles wide and strikes from two directions at the stragglers; the handler stays at the edge of light, whistling redirections, and retreats the moment he is targeted — he knows exactly what he is worth to the camp alive.",
          terrain: "open dark between watch fires: pools of light nobody sane enters, and running ground that belongs to four legs, not two",
        },
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "The Master Ledger",
        readAloud:
          "The book is bound in honest calfskin and kept better than scripture: dates, weights, names, prices, all in a hand you have seen once already tonight. You turn the pages by lantern light, and the operation opens up in front of you like a lanced wound. Then you reach the column that is different — three names with no debt beside them, no price, only a small drawn crest and the words 'as commissioned.'",
        summary:
          "The adventure's truth in writing: the ledger reveals the twist, prices the villain's fear, and names names. What the party does with this book decides the county's next decade.",
        details: [
          "Read the twist reveal here, in the book's own voice: the commissioned names, the buyer's crest, the decoy schedule — whichever truth this seed carries, the ledger is where it stops being deniable.",
          "The ledger is leverage on everyone at once: it frees or damns the conscripts, ruins the quartermaster or pays her, convicts the client, and — DC 13 Insight on the final pages — shows {villain}'s hand shaking exactly once, on the entry dated three nights ago.",
          "That shaking entry is {villain}'s weakness spelled out: what the payment is really for, or what arrives at the dark of the moon (per the seed's secret). Present it as the finale's briefing.",
          "The book is bulky, famous inside the camp, and its absence will be noticed in hours: carrying proof and moving quietly become opposed goals for everything that remains.",
        ],
      },
      {
        type: "social",
        title: "Terms at Lanternlight",
        readAloud:
          "{villain} receives you — there is no other word for it — at a folding table set with two lanterns and, absurdly, tea. 'You have been inside my camp for some hours,' they say, pouring. 'Competence deserves courtesy. So: courtesy. Tell me what you want, and I will tell you the price, and no one need be marched anywhere tonight. I am, whatever you have heard, a reasonable person doing arithmetic.'",
        summary:
          "The villain offers terms before the finale — sincerely, by their own lights. The parley prices the captives, exposes the villain's fear, and configures the final scene.",
        details: [
          "The offer is real and specific: the captives, free, tonight — in exchange for the ledger unburned, the buyer unmentioned, and the party's oath to be three counties away by the dark of the moon. {villain} will keep this bargain to the letter.",
          "DC 15 Insight (or the ledger's shaking entry, which grants it free): the deadline is not commerce — {villain} is AFRAID of what the dark of the moon brings, and the captives are somehow the payment, the shield, or the apology for it.",
          "Every extracted truth is a finale advantage: the buyer's name strips the escort {villain} was promised; the fear named aloud rattles them (first round of the finale, they act last); the informer exposed removes the ambush from the extraction.",
          "If the party takes the deal, honor it — and let the epilogue deliver what {villain} was afraid of, on schedule, to a camp the party chose to leave standing. Some victories invoice later.",
        ],
      },
      {
        type: "skill",
        title: "The Long Walk Out",
        readAloud:
          "Nine people move behind you in a chain of held hands and held breath. The camp is a constellation of fires you now know by name, and the gap you mapped between them has never looked narrower. Somewhere to the left, a dog grumbles in its sleep. The ferryman's daughter squeezes the hand of the child behind her, and takes her place at the rear of the line, as agreed.",
        summary:
          "The extraction itself: moving the captives through everything the party learned, as a group challenge where every earlier choice pays out or bills the difference.",
        details: [
          "Run as a group challenge, four successes before three failures, the captives' checks included — but every asset banked earlier converts a failure: the dog-line seam, the miscounted hour, the turned conscripts, the quartermaster's keys, the daughter's map.",
          "Each failure costs in fiction, escalating: a child's cry hushed a heartbeat late (guards stir), the broken-ankle stretcher wedging in the sluice gap (one PC's round to free), and finally a true alarm — which turns the remaining distance into the finale with the captives in tow.",
          "The one who would not leave balks at the wire, as promised. Thirty seconds of roleplay — the right true sentence, no roll — brings her. Dragging her works too, and she will say so, loudly, at the worst moment unless someone holds her hand the whole way.",
          "End the scene at the treeline headcount. Make them count out loud. If the count is right, let the table breathe. If the column left earlier and they chose the camp, the count is short, and the epilogue owes those names.",
        ],
        skill: {
          description: "Move every captive from the pen to the treeline without waking the camp.",
          checks: [
            { skill: "Stealth", tier: "medium", use: "shepherd the line through the fires' worst seam" },
            { skill: "Athletics", tier: "medium", use: "carry the stretcher over the sluice without a splash" },
            { skill: "Perception", tier: "easy", use: "read the next patrol's lantern before it turns" },
            { skill: "Persuasion", tier: "medium", use: "keep nine terrified people believing in the plan, in whispers" },
          ],
          success: "Everyone reaches the trees. The camp sleeps on. The only fight left is the one the party chooses to have.",
          failure: "The alarm rises with the party mid-field — the finale begins as a fighting retreat, captives in the open, and every earlier kindness to guard or dog or conscript now weighs in the scales.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "The Gate Must Hold",
        readAloud:
          "The last of the captives is through the breach when the camp finally, fully wakes: horns, torches, the ordered roar of a machine {villain} built for exactly this. Between the runners and the pursuit there is one gap in the palisade, one overturned wagon, and you. Behind you, someone is counting children at a run. Every ten heartbeats you buy is another milestone they cannot take back.",
        summary:
          "A holding action at the breach while the captives run: waves to blunt, a wagon-wall to keep, and {villain} arriving in person to reopen the arithmetic.",
        details: [
          "Structure: three waves, rounds apart, then {villain} with their escort. The party does not need to win — they need to HOLD until the runners' signal (a whistle from the ridge, four rounds minimum, six if the stretcher slows them).",
          "The breach is the battlefield's whole grammar: the wagon (cover, climbable, tippable — DC 13 Athletics to drop it on a wave), the gap's width (two abreast, no flanking while it stands), and the fired palisade if someone gets ambitious with a torch (closes the gap for good at round's end — including to the party).",
          "Turned conscripts and freed captives who insisted on staying fight here — give each one one visible moment. If the informer went unexposed, their moment is the gate's bar lifting from inside.",
          "When the whistle sounds, the scene's question inverts: the holding is done, and the party must LEAVE a winnable fight. {villain} will offer them the chance to stay, courteously. The exit, fighting and moving, is the finale's last test.",
        ],
        combat: {
          tactics: "The waves probe wide first, testing whether the party can hold both the gap and the wagon top. {villain} arrives unhurried, spends the escort like coin to fix the party in place, and aims their own actions at the slowest runner in sight — the arithmetic of making pursuit worth it.",
          terrain: "a breach in the palisade: overturned wagon as cover and high ground, a two-wide gap, torchlight in the party's eyes and full dark at their backs",
        },
      },
      {
        type: "climax",
        title: "The Ford at First Light",
        readAloud:
          "The column is exactly where the mud promised: mid-ford, oxen belly-deep, the barred wagon rocking with the current and the weight of everyone you have not yet saved. The escort sees you on the bank at the same moment you see them. For one long breath, nobody moves — and then the drover's whip comes down, and the wagon lurches for the far country, and the water is suddenly full of everything that matters.",
        summary:
          "Interception at the border ford: a fight in moving water around a wagon that must not tip, against an escort whose easiest victory is simply getting the cargo to the other bank.",
        details: [
          "The clock is the crossing: the wagon reaches the far bank in five rounds unless the team is stopped (cut loose, calmed, or killed — the captives will feel each choice), the drover is taken, or a wheel is wedged (DC 13 Athletics in the current).",
          "The river fights everyone: waist-deep (difficult terrain), a swimmer's current (DC 12 Athletics on a hit that drops anyone), and the deep channel just downstream of the wagon — where anything that tips goes, bars and all. If the wagon starts to go over, the fight becomes a rescue mid-rescue.",
          "The escort's captain has the wagon key and no loyalty deeper than the ledger: offered the shaking-entry page or its price in coin, he will throw the key and wade for the far bank, done with all of it. His men follow him, not the cause.",
          "Across the ford, on the far rise, whatever the dark of the moon was bringing is already watching (per the seed's secret — buyer, army, or worse). It does not intervene. It takes notes. End the fight under its gaze and let the epilogue carry the weight.",
        ],
        combat: {
          tactics: "Half the escort fights a delaying screen in the shallows; the rest goad the team onward. The drover uses the wagon as a moving wall and the whip on anything that touches the harness. If the wagon clears the far bank, the screen breaks off instantly — the job, as far as they are concerned, is done.",
          terrain: "a border ford at dawn: waist-deep current, slick stones, a lurching barred wagon, and one deep channel that forgives nothing",
        },
      },
      {
        type: "climax",
        title: "The Count Made Whole",
        readAloud:
          "{villain} stands at the tally post with the book open, as calm as a clerk at closing, while the camp burns down its own night around them. 'Here is where we resolve accounts,' they call, and their people fall in around the post like a signature being witnessed. 'You have taken things of mine. I hold things of yours. Come balance the book, and we will see at last what everything in it was worth.'",
        summary:
          "The confrontation at the heart of the camp: {villain} makes their stand with hostages, ledger, and every remaining loyalty, and the fight is braided into what the party learned and whom they turned.",
        details: [
          "{villain} holds one last hostage at the post — whoever the count came up short by, chosen for maximum weight. The hostage is leverage, not a shield: {villain} genuinely intends to trade fairly, which is exactly what makes the standoff dangerous to rush.",
          "Every earned asset converts here, mechanically: the buyer named strips the escort's pay (half quit on round one), the ledger held turns the conscripts mid-fight, the informer exposed empties the ambush tents, the fear spoken aloud costs {villain} their first-round action. Stack them — an earned rout is this scene working as designed.",
          "At half strength, {villain} stops fighting to win and starts fighting to reach the signal brazier — lighting it calls the dark-of-the-moon arrival EARLY, their final spite or final payment. Two rounds of burn before the answer comes over the hill is the fight's last clock.",
          "Endings that count: {villain} taken alive with the book intact (the county's courts feast for a year), dead at the post (the operation scatters, the client walks), or — if the party learned enough — talked down: shown proof the dark of the moon takes THEM regardless, {villain} will trade everything for the party's protection. The best ending puts them in the wagon's bars, alive, testifying, and terrified of the moon.",
        ],
        combat: {
          tactics: "{villain} anchors the tally post, spends followers in precise, itemized fashion, and keeps announcing the exchange rate — each threat, each concession, noted aloud. They target rescuers of the hostage first and the ledger's carrier second, and they never, ever damage the book.",
          terrain: "the camp's central yard: the tally post, the auction awning's ropes and shadow, scattered strongbox coin underfoot, and the signal brazier waiting at the edge of the firelight",
        },
      },
    ],
  },

  complications: [
    "A militia troop from {place} arrives — brave, loud, and two days early — and begins the frontal assault everyone agreed not to make.",
    "The weather breaks: hard rain kills scent and torchlight alike, gifting cover to the quiet plan and drowning the loud one mid-sentence.",
    "One captive falls sick, badly, mid-extraction — moving them risks their life; leaving them is not a thing this party says out loud.",
    "The buyer's advance rider arrives early to inspect the inventory, and his escort makes the camp's count wrong in the direction nobody wanted.",
    "Two guards desert tonight, taking the gate password with them — the camp changes every watchword at midnight and doubles the gate.",
    "The ferryman's daughter is caught leaving a chalk fish and locked apart from the others; the captives will not go without her, and say so.",
    "A ransom payment actually arrives — one family scraped it together — and the handover ceremony puts half the camp's officers in one tent for an hour.",
    "The dogs slip the line on their own in the small hours, hunting a scent nobody laid. Whatever they find in the dark ditch, their baying finds it first.",
  ],

  sensory: [
    "Woodsmoke and wet rope, and under both, the smell of too many people kept too close.",
    "The tally post's charcoal marks, gone soft at the edges where a thumb has counted them over and over.",
    "A dog's chain dragging one link at a time as it circles, lies down, thinks better of it.",
    "Singing from the pens at dusk — deliberately loud, deliberately cheerful, counting verses like a lighthouse counts flashes.",
    "Lantern light through tent canvas: every silhouette a fact, every fact a guess.",
    "The oxen's breath steaming in the cold an hour before anyone human is awake.",
    "Mud that keeps every secret for exactly one day, then trades them to the rain.",
    "A child's game hopscotched in the dirt of the pen floor, its stones still in place mid-turn.",
    "The particular silence after a horn stops — the whole camp listening to itself listen.",
    "Frost on the barred wagon's iron, printed with the half-moons of gripping fingers.",
  ],

  cutAdvice: [
    "Cut the Ledger Fire first — its surviving pages appear in the Master Ledger scene instead, singed and incomplete.",
    "Collapse the Outer Watch into the Dog Line: one combined perimeter challenge where the sentries ARE the third failure.",
    "If the finale must start NOW, the extraction goes loud at the treeline: run The Gate Must Hold with whatever assets the party banked, and let the count at the milestone be the epilogue.",
  ],
};
