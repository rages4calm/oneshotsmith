import type { ThemePack } from "./schema";

// Mystery theme pack: a crime with a solvable shape. Every clue is true;
// the misdirection is honest facts arranged misleadingly. Evidence gathered
// during play has mechanical weight in the finale.

export const MYSTERY: ThemePack = {
  theme: "Mystery",
  moduleLetter: "N",

  titlePatterns: [
    "The Case of the {adj} {noun}",
    "The {adj} {noun}",
    "A {noun} in {place}",
    "What the {noun} Knew",
    "The {noun} of {place}",
  ],
  titleAdjectives: ["Crooked", "Silent", "Borrowed", "Vanished", "Counterfeit", "Bitter", "Twice-Told", "Missing", "Honest", "Bloodless", "Ninth", "Unquiet"],
  titleNouns: ["Verdict", "Witness", "Ledger", "Alibi", "Inquest", "Confession", "Widow", "Heir", "Signet", "Toast", "Testimony", "Coroner"],
  taglines: [
    "Everyone in {place} knows who did it. Everyone in {place} is wrong.",
    "Every clue is honest. The arrangement is the lie.",
    "Two glasses on the table. One set of lips.",
    "Nine years, nine farewells, one handwriting.",
    "The killer has already testified under zone of truth. Voluntarily. Twice.",
    "The town built the gallows before the verdict. Carpenters need notice.",
    "The poison worked exactly as promised. The victim was the mistake.",
    "Ask anyone in {place}. They will all tell you the truth, and it will not agree.",
  ],

  sites: [
    {
      names: ["The Guildhall of the Silver Weights", "Coster's Hall", "The Wardmoot Hall of {place}"],
      description:
        "The proudest room in {place}: a beamed feast hall hung with charters, where the town's money argues politely twice a season. Eighty people can dine here, which last time meant eighty witnesses and, by the servants' count, ninety-one alibis. The staff run the building like clockwork and notice everything; the members own the building and are used to being unnoticed. Between the wine cellar and the counting room, the hall keeps better records of the night than anyone yet realizes.",
      roomLabels: ["Feast hall", "High-table dais", "Cloakroom", "Butler's pantry", "Kitchen passage", "Wine cellar", "Plate vault", "Master's study", "Charter gallery", "Musicians' loft", "Counting room", "Courtyard and carriage gate", "Servants' mess", "Roof walk"],
      terrain: ["long feast tables forming lanes and ready barricades", "a musicians' loft overlooking the whole floor", "candelabra, banners, and tablecloths — everything tips, drapes, or burns", "one service door funneling all movement through the kitchen passage"],
    },
    {
      names: ["The Temple of the Attentive Ear", "The Shrine of the Honest Measure", "The Old Basilica at {place}"],
      description:
        "The temple holds {place}'s soul and, less advertised, its paperwork: births, deaths, deeds, and oaths, all witnessed under the god of honest measure. The nave is public, the undercroft is not, and the line between the two is patrolled by custom rather than locks — which is to say, by exactly the people a clever criminal would become. Lately the tithe-count runs generous, the undercroft stays sealed for reasons of sanctity, and the old sexton who used to grumble about both has stopped grumbling about anything.",
      roomLabels: ["Nave", "Offertory table", "Confessional row", "Sacristy", "Scriptorium", "Bell tower stair", "Reliquary", "Tithe-counting room", "Priests' dormitory", "Almshouse kitchen", "Founders' crypt", "Undercroft stacks", "The sealed press room", "Garden cloister"],
      terrain: ["ranks of pews and a rood screen breaking the nave into lanes", "the undercroft's low vaults — no room to swing, every sound doubled", "scaffolding and drop cloths along the fresco wall", "braziers and hanging censers on pull-chains"],
    },
    {
      names: ["The Ferry Ward", "Lampwick Row", "The Ninth Bridge of {place}"],
      description:
        "The working edge of {place}, where the river takes deliveries and occasionally people. The ward wakes before dawn and sees everything, but what it sees is priced: the lamplighters, the pawnbroker, the ferry crew, and the woman who rents rooms by the week all keep excellent memories and firm rates. The watch house and the coroner's cellar anchor one end, the nine-post pier the other, and the record hall annex in between holds every name that ever crossed, signed, or vanished here.",
      roomLabels: ["Watch house", "Coroner's cellar", "The record hall annex", "Ferry steps", "The pawnbroker's", "Boarding house stair", "The accused's rooms", "Lamplighters' shed", "Bridge tollbooth", "Fishmonger's cold room", "The bellfounder's yard", "Old chapel of the crossing", "The nine-post pier", "Gutter walk"],
      terrain: ["market crowds that screen movement and swallow shouts", "stacked crates, barrels, and drying nets", "a narrow pier over black, moving water", "rain-slicked cobbles, deep gutters, and one guttering lamp per corner"],
    },
    {
      names: ["Greyharrow Hall", "The Dower House at {place}", "Thornecombe Manor"],
      description:
        "A handsome pile above {place} with two circulatory systems: the family's, all long corridors and closed doors, and the servants', all hidden stairs and heard-everything pantries. The household runs on routine so exact that any deviation is testimony — who rang for what, which door was bolted when, whose candle burned late. The physic garden grows remedies and their opposites side by side, the wine cellar has one lock and four keys, and the servants will tell the truth if anyone thinks to ask them as if they were people.",
      roomLabels: ["Entrance hall", "Long dining room", "Conservatory", "Stillroom and kitchen", "Butler's pantry", "Servants' stair", "The late master's study", "Library", "Physic garden", "Wine cellar", "Guest wing corridor", "Family chapel", "Icehouse", "Gamekeeper's cottage"],
      terrain: ["a long dining table and high-backed chairs — cover in ranks", "the servants' stair moving people between floors unseen", "glass conservatory walls — light, sightlines, and expensive noise", "hedged garden paths that cut every line of sight to arm's length"],
    },
  ],

  hooks: [
    {
      readAloud:
        "The guildhall's tables are still dressed from last night's feast — eighty places, eighty witnesses, and one chair on the dais draped in black. {patron} meets you at the door with the seating chart already annotated in a tight, angry hand. 'He died at the toast, in front of everyone I do business with. I want the name before the funeral, and I want to be wrong about half my friends.'",
      summary:
        "{patron}, presiding officer of the guild, hires the party to solve a poisoning committed in front of eighty witnesses at {site}. Payment: 75 gp each, doubled if the name comes with proof the magistrates cannot wave away.",
    },
    {
      readAloud:
        "The watch house wall carries eight faded bills and one fresh one — each a name, each dated the ninth autumn after the last. The sergeant has stopped looking at them, but the woman waiting for you looks at nothing else. 'My brother makes nine,' she says. 'Everyone tells me he left on the ferry. Everyone told the last eight families that too.'",
      summary:
        "Every nine years someone leaves {place}, and no body, letter, or debt ever surfaces. {patron}, sister of the newest name, offers her savings and the family boat to whoever breaks the pattern before the season closes over it.",
    },
    {
      readAloud:
        "The deed is beautiful work: crisp seal, sober witnesses, the temple's own countersignature. The problem, {patron} explains, laying a second document beside it, is that the seller signed it two days after she was buried. 'One forgery is a crime. Two is a trade. I have found eleven.'",
      summary:
        "{patron}, an archivist auditing {place}'s registries, has traced a run of forged deeds and wills to hands inside {site} — and the sexton who asked about it last week fell down a dry well. Fee: 60 gp each for the ring, the press, and the killer, plus first pick of a grateful town's contracts.",
    },
    {
      readAloud:
        "The widower receives you in a house still smelling of funeral lilies, and pours from the decanter with a steadiness that looks practiced. 'My wife drank from my glass,' he says. 'She always did — she liked the first sip. Whoever killed her was paying for me, and I would like to know what I still owe.'",
      summary:
        "The poison found the wrong throat, and the intended target knows it. {patron} hires the party to find the buyer before the second attempt — quietly, because announcing the mistake invites its correction.",
    },
    {
      readAloud:
        "They will hang the cook on the last day of the assizes; you passed the new gallows lumber in the square on your way in. Halfway down the high street, the captain of the watch steps out of a doorway and asks for a private word. 'The confession is wrong,' she says, low. 'It has the wrong knife in it. I cannot say that in the hearing room — so I am paying you to be loud where I cannot.'",
      summary:
        "{patron}, captain of {place}'s watch, believes the confessed killer is innocent and the confession was bought or beaten. Three days remain. Fee: her signing bonus, her discretion about the party's methods, and a friend in the watch for life.",
    },
    {
      readAloud:
        "The letter reaches you at the {tavern} nine days after its writer stopped being alive — the hand steady, the instructions not. 'If this finds you, my accident was purchased. The proof is where I keep the household accounts, filed under a year in which nothing happened. Trust the one of my heirs who does not offer to help you.'",
      summary:
        "A careful voice from the grave retains the party: confirm the death was murder, recover the hidden proof at {site}, and watch the heirs. The estate's solicitor holds a sealed fee — 400 gp — payable on 'resolution,' a word the dead chose carefully.",
    },
  ],
  hookAlternates: [
    "A juror from the inquest returns their fee to the party with a note: 'It was not him. I could not say so in that room.'",
    "One of the party is named in the victim's will — alongside a bequest to 'whoever names my killer,' which explains the sudden local enthusiasm for framing someone fast.",
    "{villain} hires the party personally to investigate the crime — the surest way to learn exactly how much anyone knows, and to steer it.",
  ],

  villains: [
    {
      epithets: ["the Toastmaster", "Master of the Long Table", "the Smiling Chair"],
      motivation: "Built half of {place}'s prosperity with a partner who finally audited the other half, and decided the friendship had matured into a liability.",
      plan: "Poisoned the partner in the most public room in town — a crowd of eighty is a crowd of suspects — and is now steering the inquest toward a steward with convenient debts, funding the widow's grief, and chairing the search for himself.",
      secret: "The poison needed a first dose at breakfast to kill by the evening toast. The victim's morning caller signed the doorman's book under a false name — written in the unmistakable counting-house hand that appears on every guild ledger beside his own.",
      mannerism: "Raises whatever he is holding to punctuate a sentence, as if every remark were a toast; never drinks first.",
      bossTags: ["leader"],
    },
    {
      epithets: ["the Gentle Hand", "the Last Dose", "Physician of Record"],
      motivation: "Sells painless ends to impatient heirs and calls it mercy — has genuinely stopped hearing the difference between easing a death and causing one.",
      plan: "Dosed a wealthy patient's cup to mimic a wasting illness, then signed the death certificate personally as attending physician — killer and coroner in one signature — and now manages the grieving household's health with daily visits.",
      secret: "The wrong person drank. The cups were swapped at the table by chance, the intended target knows the taste of the near miss, and the contract requires a second attempt within days — means, motive, and a scheduled opportunity, if anyone thinks to stand in the room.",
      mannerism: "Greets people by taking the wrist, two fingers on the pulse, counting under the breath.",
      bossTags: ["caster"],
    },
    {
      epithets: ["the Ninth Scribe", "Keeper of the True Seal", "the Penman"],
      motivation: "Believes a forged deed that feeds the almshouse is holier than an honest one that feeds a lord, and has the undercroft ledgers to prove the math works.",
      plan: "Runs a forgery ring beneath {site} — deeds, wills, pilgrim credentials — sealed the one witness into the founders' crypt, then declared the lower levels closed for consecration and invented a relic discovery to explain the new money.",
      secret: "Every document the ring produces shares one tell: a ligature taught at a single scriptorium — the villain's own novitiate — and the roll of who trained there is a public record sitting in plain sight.",
      mannerism: "Answers questions with scripture chosen to be literally true; under zone of truth this works perfectly, which is why he keeps volunteering for it.",
      bossTags: ["caster", "leader"],
    },
    {
      epithets: ["the Debt-Counter", "Warden of the Old Toll", "the Ninth Neighbor"],
      motivation: "Keeps {place}'s founding bargain: every ninth year, one person to the water, or the luck that built the town runs out. Believes this completely, and grieves sincerely every time.",
      plan: "Chooses someone unmissed, provides a farewell letter in their hand, pays the ferry crew to remember a departure, and mourns loudest at the vigil — but this cycle's chosen has friends asking questions, so a quieter substitute is being prepared.",
      secret: "All nine farewell letters across eighty-one years sit filed in the record hall, and every one misspells the word 'forgive' the same way. Nobody has ever laid them side by side.",
      mannerism: "Speaks of the missing in the present tense, fondly, as neighbors who moved away.",
      bossTags: ["boss", "caster"],
    },
    {
      epithets: ["the Quiet Solicitor", "the Undertaker's Friend", "Master of Mishaps"],
      motivation: "Sells accidents to respectable buyers and takes professional pride in never once committing a murder — only arranging misfortunes with excellent timing.",
      plan: "Staged the current death as a fall, retained the coroner's clerk on a small pension, and is now managing a nervous client through the inquest — the cover-up is not after the crime, it IS the business.",
      secret: "Keeps escrow ledgers, because clients refuse to pay for genuine accidents: every job is documented precisely to prove it was murder. The book that damns them all is the one asset the business cannot burn.",
      mannerism: "Never says kill, die, or death — only 'outcomes' and 'arrangements' — and offers condolences with a straight face, sincerely.",
    },
  ],

  twists: [
    "The victim collected secrets: half the gentry of {place} appear in a private packet, and every suspect's guilty behavior is real guilt — just not murder. The packet is still out there, and whoever holds it when this ends owns the town.",
    "The killer missed. Cups were swapped, coats exchanged, rooms traded at the last minute — the intended target has known from the first hour and has been quietly using the party as a shield while wearing mourning. The next attempt is already paid for, which makes it the first crime the party can be early for.",
    "{patron} did not hire the party to find the truth — {patron} hired them to reach it FIRST. Somewhere in the evidence is one page {patron} needs gone; every other part of the job is sincere.",
    "Mid-case, someone confesses in convincing detail — to shield a person they believe is guilty. They are wrong about that too. But their invented details, checked against the real timeline, outline the exact gap the actual killer has been hiding in.",
    "Someone else was in the room when it happened, and has been bleeding the killer for silence ever since. The second incident is the killer settling that account — and the blackmailer's insurance, wherever it is hidden, is the best evidence in the case.",
    "The inquest registers going back three generations carry the same witness signature, unchanged. {villain} has been managing {place}'s convenient deaths for far longer than one lifetime, and the town's founding story — read carefully — says why nobody official ever counts past nine.",
    "The corpse's mouth was packed with hearth-ash before the family ever saw the body — the old rite 'so the soul travels light,' and the reason speak with dead yields only sideways riddles. The rite itself is the clue: it took early access, native knowledge, and hands the household would not question.",
    "The verdict already exists. The magistrates picked the convenient culprit on day one and the hanging is scheduled; the party is not solving a mystery so much as outrunning a decision. Every solid clue now has a second job: counterweight.",
  ],

  cluePool: [
    "The victim's last meal (DC 12 Medicine at the coroner's) includes candied ginger, served only at the high table — and the victim's place was set nowhere near it.",
    "The threatening letter's wax seal carries a chipped signet — a flaw that will match exactly one ring in {place}, once the party starts shaking hands.",
    "Mud dried on the study windowsill is river-clay from the ferry steps — an hour's walk from every alibi on offer.",
    "The lock was picked, then relocked from outside — a courtesy thieves do not extend. Whoever left meant to come back with a key and an explanation.",
    "Two glasses were poured that night; one was washed and shelved rim-up in a household whose staff shelve rim-down, to the last cup.",
    "The victim's dog slept through everything. The kennel keeper can list from memory the seven people that dog does not bark at.",
    "A pawnbroker's ticket dated the morning after, for an item three witnesses place in the victim's hands the evening before.",
    "The farewell note is in the victim's hand — but held against old letters (DC 13 Investigation), the loops are drawn, not written, and it misspells a name the victim never once misspelled.",
    "{villain}'s alibi is real and checkable — and that is the problem: four witnesses, one phrasing, word for word. Honest people vary.",
    "The poison blackens silver over hours: the victim's rings are dark, the supper cutlery is not. The dose was in the cup, and cups move.",
    "The corpse's mouth was packed with hearth-ash before the family saw the body — the old rite for quieting a soul, and the reason the dead answer sideways. Performing it required access no stranger had.",
    "The counting-book's last quarter is a fresh insert: new stitching (DC 13 Investigation), one batch of ink throughout, a season of entries written in a single sitting.",
  ],

  monsterTags: ["urban", "manor", "anywhere"],
  bossTags: ["boss", "leader", "caster"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "First on the Scene",
        readAloud:
          "The watch has the door, the crowd has the windows, and {place} has already reached its verdict — you can hear it near the back, growing teeth as it is retold. Past the constable's shoulder, supper still sits for two: one chair tipped, one candle burned to the ring, the room's only mirror turned to face the wall. Nobody has touched the body. Everybody has walked through the room.",
        summary:
          "The party reaches the crime scene while it is still warm and the town is still loud. Everything visible is true evidence; the first decision is what to protect and whom to offend.",
        details: [
          "Every read-aloud detail is real: the second place setting asks who dined, the candle stub fixes a two-hour burn against the hour supper was served, and the mirror was turned by the first finder — who will admit it if asked directly, an honest act that looks damning until then.",
          "The constable is competent and territorial: treat them as a colleague and share one finding to gain full scene access plus the first Secrets & Clues entry free; bigfoot them and every official door hereafter needs a DC 13 Persuasion that worsens with repetition.",
          "Ten minutes listening at the windows yields three crowd claims: two honestly wrong, one true. The true one names who ELSE was seen nearby last night — the first entry on the suspect list.",
          "Exit decision: secure the scene now (slow, thorough — evidence before people) or chase the warm names (fast — people before evidence, and the scene degrades honestly behind them).",
        ],
      },
      {
        type: "arrival",
        title: "Retained",
        readAloud:
          "The office smells of law — dust, ink, and the particular cold of rooms where money changes obligation. {patron} slides three things across the desk: a written retainer, a list of names with two already crossed out, and a purse that clinks like an apology. 'The magistrates have their culprit. I am paying you to be thorough where they were quick.'",
        summary:
          "The formal engagement. The party gets paper authority, a head start on the suspect list, and an honest clock — and chooses which of three leads to pull first.",
        details: [
          "The retainer is real: access to the scene, the coroner, and the records annex — on paper. Each institution honors it differently (the coroner gladly, the watch grudgingly, the annex only during posted hours), and the difference is playable.",
          "The crossed-out names are {patron}'s own guesses, eliminated honestly. Ask why, and {patron} walks through the two alibis personally verified — both true, and together a model of what checking looks like in this town.",
          "State the clock openly: the inquest closes in three days. If the party presents nothing, the standing verdict proceeds — name the person it lands on, so the cost of slow has a face.",
          "Three doors out: the scene (forensics), the names (interviews), the paper (records). Any order works; the leads braid. What the party picks first decides where they are standing when the case moves again.",
        ],
      },
      {
        type: "arrival",
        title: "Cold Trail, Warm Town",
        readAloud:
          "You are nine days late for the crime and right on time for the opinions. The {tavern}'s common room adjusts around your questions — a stool turned away, a game resumed too loudly, the landlord's rag moving in slow circles over wood already dry. Someone has chalked a name on the beam by the door, and someone else has rubbed it to a smear.",
        summary:
          "The party starts where the trail is coldest and the townsfolk warmest. The town misleads without lying; the first job is learning to hear the difference.",
        details: [
          "The smeared name reads clear with DC 12 Investigation: the suspect the town favors — sincerely believed, conveniently poor, and innocent. Note aloud who watches the party read it; one watcher is worth tailing.",
          "A bought round (5 sp) collects three rumors. Build each as one true detail wrapped in one wrong conclusion — the wrong conclusions are earnest, which is exactly how the town has stayed wrong for nine days.",
          "Whoever leaves the room within minutes of the party's first direct question is a lead: tail them now, or bank the face for later interviews. Both work; they surface different ends of the same thread.",
          "Establish the town's opinion as a visible meter: it moves with public actions all session, and at the climax it is worth one evidence point if it stands with the party.",
        ],
      },
    ],

    middle: [
      {
        type: "combat",
        title: "A Polite Warning",
        readAloud:
          "The lantern ahead goes out between one step and the next, and the alley rearranges itself — three silhouettes where there were barrels, one more on the stair, unhurried. No demands, no faces, cudgels held low. The message is the arithmetic.",
        summary:
          "Hired muscle sent to frighten the party off the case — a beating on a budget. Their restraint, their pay, and their timing are all evidence, and all three survive the fight.",
        details: [
          "They want notes, not lives: first targets are satchels, journals, and whichever pocket holds the evidence. Anyone who drops their papers and steps back is ignored thereafter — let the players discover the rule, then decide what it is worth.",
          "Their pay is new-minted coin from a single strike (DC 13 Investigation afterward) — traceable to whoever has been changing money in quantity, which is a records-annex thread.",
          "One taken alive gives up the middleman's meeting spot for a silver or five minutes of sincere threat: they were hired masked and paid masked, and they fear the author of this errand more than the party. Say that plainly; it characterizes {villain}.",
          "The timing is itself a clue: count who knew the party had been hired at all. The list is short, and every name on it just became interesting.",
        ],
        combat: {
          tactics: "Cudgels and numbers: they crowd, disarm, and drag down rather than kill, and they quit in good order — covering each other — the moment two of theirs are down or a whistle sounds from the dark. None of them knows a name worth dying for.",
          terrain: "a doused-lantern alley: barrels, a hand-cart, scaffolding overhead, one exit at each end",
        },
      },
      {
        type: "social",
        title: "House Calls",
        readAloud:
          "The tea arrives before the questions are allowed to. Every parlor in {place} runs the same defense — refreshment, weather, a small kindness to make suspicion feel rude. Across the cups, your host is already deciding which truth to lead with.",
        summary:
          "The suspect interviews. Each suspect hides one real secret that is not murder, and the secret is what makes them evade, bristle, and misdirect — guilty people, wrong crime.",
        details: [
          "Build each suspect on a four-line ledger: Motive (real), Means (plausible), Opportunity (checkable), Secret (what they will actually lie about). Sample secrets: an affair with the victim's spouse, debts owed TO the victim, skimming the victim's accounts, a false name with an old warrant under it.",
          "The lever: name a suspect's secret aloud and their guard collapses — Persuasion drops from DC 15 to DC 12 against them, and they trade one hard fact about somebody else to change the subject. Fear works differently: Intimidation succeeds once per suspect, ever; a second attempt produces the false-confession complication.",
          "DC 13 Insight during any denial reveals they are lying about SOMETHING — never what. Which statement was the lie is legwork, not dice; tell the players so, and mean it.",
          "Every interview earns one checkable fact if played well — a time, a sighting, a purchase. Facts that verify go on the timeline; facts that fail to verify are still true, just about the wrong crime, and noting WHICH kind each suspect gave is the real interview.",
          "If anyone casts zone of truth: every suspect consents readily and answers in practiced literalisms — the innocent protecting their secrets, the guilty because they rehearsed. The spell narrows phrasing, never the field; let the table feel that in-world before anyone explains it.",
        ],
      },
      {
        type: "skill",
        title: "The Scene Reads Back",
        provides: ["true-hour"],
        readAloud:
          "Daylight does the room no favors and every favor: dust shows its scuffs, the hearth shows its ashes, and the furniture has kept opinions about where everyone stood. Somewhere in this room the whole night is still written down. It is a matter of reading it in order.",
        summary:
          "Crime-scene forensics as a structured challenge. Success fixes the true hour and method; failure leaves the party carrying the town's confident, wrong version into every scene after.",
        details: [
          "Run as three successes before three failures, one check per character per pass; each success reveals one Secrets & Clues entry, in whatever order serves the chosen villain.",
          "The prize is the true time of death — it contradicts the hour the town believes, and every rehearsed alibi in the case is built on the wrong hour. Without it, the case's timeline will show two candidate gaps instead of one.",
          "Magic complicates: one surface was cleaned by cantrip, and Arcana finds the too-clean patch — which is itself evidence, since the suspect pool contains very few hands that can cast anything. Detect magic likewise finds where something enchanted rested, never what it was.",
          "If this scene was skipped or delayed, degrade it honestly: the family tidies, the watch treads, the insert in the ledger gets a day older. State what was lost. Never un-lose it.",
        ],
        skill: {
          description: "Read the crime scene before the town finishes rewriting it.",
          checks: [
            { skill: "Investigation", tier: "medium", use: "reconstruct entries, exits, and what the furniture saw" },
            { skill: "Medicine", tier: "medium", use: "fix the true hour and true method from the body" },
            { skill: "Perception", tier: "easy", use: "catch the small wrong things — the rim-up glass, the candle's burn, the turned mirror" },
            { skill: "Arcana", tier: "hard", use: "find the surface somebody magically cleaned and the shelf where something enchanted stood" },
          ],
          success: "Three clues and the true hour of death — the timeline will show a single gap, and the party knows the town's version is wrong before the town does.",
          failure: "One clue, plus the coroner's confident errors adopted as fact: the timeline will hold two suspects until the hour is corrected elsewhere — a candle's burn, the kennel keeper, or the tide table can each still fix it.",
        },
      },
      {
        type: "exploration",
        title: "The Paper Trail",
        readAloud:
          "The records annex defends {place} with patience: string-tied bundles to the ceiling, a ladder with one bad rung, and a clerk who answers exactly the question asked and nothing adjacent. The dust here has a filing system. The gaps in it are the news.",
        summary:
          "Deeds, wills, registers, ledgers — the money under the motive. The archive tells the truth to anyone who asks it precisely, and the villain has already been here under another name.",
        details: [
          "One hour and DC 13 Investigation surfaces the paper motive: a will altered within the season, a debt cleared with no payment recorded, or a property moved at a tenth of its value — pick to fit the villain. The document is real, dated, and citable at the climax.",
          "The clerk never volunteers and never lies: reward precise questions with precise answers. Helping re-shelve (no roll, one hour) earns the single hint the clerk chooses to give — WHICH register was signed out last month, and under what name.",
          "The sign-out name is false but the handwriting is real: DC 13 Investigation against any sample ties it to its writer. The party now owns an identity clue that waits patiently for a comparison they must collect elsewhere.",
          "Posted hours are enforced and the annex closes at dusk. A party that breaks in after dark learns someone else already has, tonight — the candle smoke drifting down the stacks is not theirs, and how they handle the next ten minutes decides whether the archive keeps its secrets or its fire.",
        ],
      },
      {
        type: "social",
        title: "The Sweatbox",
        readAloud:
          "The watch house cell smells of lamp oil and nerves. The prisoner sits the way the innocent sit in {place} — braced for the worst and past arguing with it — and looks up with the particular hope of someone whose story has not been believed in days. 'Ask me anything,' they say. 'Nobody yet has asked me anything. They only tell me.'",
        summary:
          "Interrogating the town's favorite suspect: likely innocent, definitely lying about something. Kindness opens them, pressure closes them, and their corrections to the official story are the treasure.",
        details: [
          "Their secret explains every guilty behavior — pick one: they were somewhere shameful, they were stealing something small, they were covering someone else's absence. It surfaces on DC 12 Insight plus one honest kindness (food, a message carried, a lamp left burning).",
          "Their gold is corrections. Shown any piece of the official story, they can say precisely what is wrong with it — 'That is not my knife. Mine has a marked handle; ask the grinder.' Every correction is checkable, and every one checks TRUE.",
          "Pressure backfires specifically: a second Intimidation produces cooperation-shaped lies, and by morning a full false confession to make the fear stop. The magistrates will take it gladly. This trap is the party's to spring on themselves; do not soften it.",
          "Cleared publicly later, they stand witness at the climax — worth one evidence point — and the town's opinion swings hard. Cleared quietly, they leave town by the next ferry, and who could blame them.",
        ],
      },
      {
        type: "skill",
        title: "Shadow Work",
        readAloud:
          "Your mark leaves by the side door with the walk of someone rehearsing normalcy — pace even, hood down, never once looking back, which is itself a kind of looking back. {place} after dark is all bottlenecks and lamplight islands. Between here and wherever they are going, the town will try to make you introduce yourselves.",
        summary:
          "A tail across town at night. The destination is the answer; being seen rewrites it. The mark's route is deliberately washed, which is its own small confession.",
        details: [
          "Structure: four checks, three successes needed. The washing moves — a doubled corner, a shop entered and left by the back, a long pause talking to nobody — telegraph each one round early so players choose their answer.",
          "Success delivers the meeting: a face, a handoff, a location worth returning to in force. Log who the mark met against the suspect ledger — opportunity math changes tonight, at the table, in front of everyone.",
          "Seen once, the mark aborts to an innocent errand honestly run — bread, a shrine, home — and the true meeting moves to a time the party no longer knows. Seen twice, the party is tailed home instead: the next ambush arrives with surprise.",
          "A courier on this route can be intercepted instead of followed. The note is coded but keepable — DC 15 Intelligence over an evening breaks it — but robbing the courier tells {villain} to burn the whole channel. Following is slower and worth more; say nothing and let them choose.",
        ],
        skill: {
          description: "Follow the thread through {place} at night without becoming the thing being followed.",
          checks: [
            { skill: "Stealth", tier: "medium", use: "hold the dark side of the street and the rhythm of other people's footsteps" },
            { skill: "Deception", tier: "medium", use: "become a quarreling couple, a drunk, a lost lamplighter when the mark doubles back" },
            { skill: "Perception", tier: "easy", use: "keep the hood in sight through market crowds and lamplight gaps" },
            { skill: "Athletics", tier: "medium", use: "make the rooftop cut when the streets bottleneck" },
          ],
          success: "The meeting observed and mapped — who, where, what changed hands — and a location the party can revisit in daylight with witnesses of their own.",
          failure: "The mark walks an innocent errand while the real meeting quietly moves; on a truly bad night the party is marked in return, and the next warning arrives with numbers and surprise.",
        },
      },
      {
        type: "combat",
        title: "The Runner",
        readAloud:
          "One question lands too close and the shutters go up behind their eyes — then the table goes over, and they are through the curtain and into the lanes with the certainty of someone who has rehearsed this exit. Behind you, the room chooses sides out loud. Ahead, the lanes bend toward the yards, where help can be bought by the hour.",
        summary:
          "A suspect bolts mid-question — toward hired protection. Speed decides the size of the fight, and the reason they ran is not the reason the party hopes.",
        details: [
          "The pursuit: two quick DC 12 checks (Athletics or Acrobatics) to hold contact through market and lane. Catch them early and they are alone and winded; lose both checks and the catch happens in the debt-yard, where their muscle is already paid and waiting.",
          "In the yard they hide behind crates and shout increasingly honest things over the fight — 'I did not kill anyone! I was at the ferry! Ask the toll-keeper about the ferry!' Every shouted claim is true and every one is checkable.",
          "Their real crime is small and adjacent — smuggling, a jumped bond, an alias. Traded gently, they yield the case's best sighting: what they saw through a window at the true hour, because their small crime put them exactly where honest witnesses could not be.",
          "Taken bloodily or killed, they still testify: their pockets hold a pawn ticket and a torn note — two Secrets & Clues entries — and the town's opinion drops a visible notch. State the cost; the town is watching how the party wins.",
        ],
        combat: {
          tactics: "The bought muscle screens the runner and fights for wages, not glory: they block lanes, shove, and swing to discourage, and they stop the instant the runner is taken or the pay looks underpriced against the opposition.",
          terrain: "a debt-yard maze: stacked crates, a loading crane and hook, mud that eats footing, one gate and one climbable wall",
        },
      },
      {
        type: "setpiece",
        title: "The Second Bell",
        readAloud:
          "The bell begins in the middle of the gathering, and everyone learns together what it means: somewhere close, within the hour, it has happened again. The crowd turns into weather — currents, eddies, a pressure toward the doors. Through it all, one figure moves against the flow, unhurried, in no doubt about the fastest way out.",
        summary:
          "The mid-point incident: a second crime during a public gathering, close enough to touch. It narrows the field twice over — by who is newly dead, and by who was provably in sight when the bell began.",
        details: [
          "The second victim held something over the killer. Their rooms, searched before dawn, contain the insurance — one Secrets & Clues entry and a document naming a meeting. The killer knows this too; expect company at those rooms tonight.",
          "Attendance is evidence: fix on paper who was PROVABLY in view when the bell started, and cross names off aloud with the players. If {villain} arranged to be conspicuous here, that fact has a shape too — killers who need to be seen are killers who hire hands.",
          "The figure against the flow forces the scene's choice: pursue now (the covering fight, below) or hold position to shield the remaining witnesses and mark the face. Both are right. They buy different things — a live thread versus the town's trust — and the party cannot have both tonight.",
          "If the party predicted the target and stood guard, the strike converts to attempted, the striker is takeable, and the case accelerates a full act. Reward the deduction completely. Do not protect the plot.",
        ],
        combat: {
          tactics: "The covering hands fight shallow — trips, thrown stalls, a lamp into straw — buying the striker's exit along a prepared route: a door left unbolted, a plank over the gutter. They scatter rather than die, and none of them knows a face, only a purse.",
          terrain: "a packed hall or square mid-panic: the crowd is cover, current, and casualty risk in every direction, and the braziers, banners, and benches all want to go over",
        },
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "The Hour That Is Not There",
        readAloud:
          "Chalk, string, and stubbornness: the night of the crime laid out across a wall — every name, every hour, every sworn where-I-was. Read left to right, the evening walks itself honestly along, witness by witness, to the edge of one quarter hour. And there it stops.",
        summary:
          "The timeline assembly. Every verified alibi is true; arranged in order they isolate the one span nobody owns — and the alibi rehearsed for the wrong hour points like a finger.",
        details: [
          "Run it as a table exercise: the DM answers who-where-when strictly from facts the party actually gathered. Verified facts in one chalk color, hearsay in another. The gap must emerge from their wall, not from an NPC — wait for it, however long it takes.",
          "The killer's alibi is perfect for the hour the town believes and empty for the true hour fixed in forensics. If the party never fixed the true hour, the wall shows two gaps and two names — still playable, but the confrontation runs at +2 DC while the wrong name stays live.",
          "The empty quarter hour has one witness nobody counted: someone whose own small crime — a poacher, a sneaking lover, the suspect who bolted if one did — put them where respectable people were not. The wall says exactly where such a person would have stood. Finding them is one scene's work.",
          "Exit decision: accuse now with what stands (fast, public, harder DCs) or spend one more scene hardening a likely clue into a SOLID one — knowing that {villain} can count quarter hours too, and spends that same scene moving.",
        ],
      },
      {
        type: "social",
        title: "What the Innocent Confess",
        readAloud:
          "Cleared people confess differently — faster, looking at their hands, relieved to be guilty of the smaller thing at last. One by one the suspects trade their secrets for their names back. What remains when the small shames are swept off the table is one name, and the whole room hears it arrive without anyone saying it.",
        summary:
          "The clearing of the innocent. Each surrendered secret buys a hard fact about the real killer — the suspects were shielding themselves, never the murderer — and the town's verdict begins to turn.",
        details: [
          "Each cleared suspect yields one fact only they could hold: an hour {villain} was not where claimed, a purchase witnessed, a debt carried to the victim on the villain's behalf. Three cleared suspects close the means-motive-opportunity triangle completely.",
          "Offer each a choice: cleared quietly (the fact, then they leave the story) or cleared publicly (they stand at the climax — each public witness is worth one evidence point, and each is one more person {villain} might reach first). Let the players advocate; protection is now a resource.",
          "If anyone confessed falsely along the way, they recant here when treated gently — and their invented details, held against the true timeline, show exactly which true facts the town's story was built to explain away. A lie can be a stencil.",
          "The town's opinion turns audibly: chalk names rubbed off the beam, a drink sent over, the landlord's rag finally at rest. Say it out loud. The party has earned the weather changing.",
        ],
      },
      {
        type: "skill",
        title: "The Proof Run",
        readAloud:
          "Smoke — thin, deliberate, paper-fed — rises from the one chimney that should be cold at this hour. Somewhere between here and there, the spine of the case is being fed to a grate a page at a time. The streets between have never seemed longer, or more full of opinions.",
        summary:
          "A race to secure the physical proof before the cover-up finishes eating it. Speed, then search, then judgment — because the villain has left a decoy for the hasty.",
        details: [
          "Three successes before three failures, cross-town and then in-building. Every failure burns pages: the proof degrades from SOLID (full weight at the climax) to partial (half weight) to ash with one legible corner (a clue, no longer evidence).",
          "The plant: a forged proof incriminating the town's favorite scapegoat sits where hurried hands find it first. The forger's-tell clue or a successful Insight spots the wrongness — and spotting it is itself SOLID evidence of the cover-up. Carrying the plant to the climax unspotted hands {villain} a devastating counter.",
          "The hand tending the grate is nobody: paid through a slot, cannot name the payer, can name the drop point and the schedule. Left in place and unbruised, the villain's last quiet channel now reports to the party. Dragged to the watch, it goes silent forever. Choose.",
          "If the party arrives with the town behind them (its opinion publicly won over), the building's neighbors delay the burner without being asked — convert one failure to a success and tell the players exactly why it happened.",
        ],
        skill: {
          description: "Cross {place} and beat the fire to the file.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "take the straight line — roofs, walls, and one alarming gap" },
            { skill: "Investigation", tier: "medium", use: "know where careful people hide paper: floorboard, book spine, flue, coat hem" },
            { skill: "Stealth", tier: "medium", use: "pass the watcher on the door without starting the clock early" },
            { skill: "Insight", tier: "easy", use: "distrust the convenient find lying in plain sight" },
          ],
          success: "The true proof secured at full weight, the decoy identified and turnable, and the drop schedule learned — the villain's quiet channel now runs through the party.",
          failure: "Ash and one legible corner — still a clue, no longer proof. {villain} knows how much survived, and the climax DCs rise by 2 unless the loss is offset with a public witness.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "The Parlor Verdict",
        readAloud:
          "The principals assemble because {villain} insists — better one theater than a week of whispers — and the seating happens by instinct: accusers by the window, doubters by the door, {epithet} at the decanter, pouring with a perfectly steady hand. The room settles. Outside, the town has pressed itself against the glass to listen.",
        summary:
          "The gathered-room accusation. Evidence does the heavy lifting: presented in order, it strips the villain's outs one by one — and when the mask finally comes off, the furniture learns to fly.",
        details: [
          "THE EVIDENCE RULE (all finales): breaking {villain} is a DC 18 Persuasion or Intimidation case. Each SOLID clue presented lowers the DC by 2; each publicly cleared suspect standing witness lowers it by 1. At DC 10 or below, no roll — the room turns as one.",
          "Each SOLID clue also strips one fight advantage before initiative: the blade in the boot (surprise), the two paid hands at the door (reinforcements), the coach in the mews (escape), the hostage-shaped guest (leverage), the room's lingering doubt (cover among bystanders). Announce each strip as it lands; the players should feel the knot tighten.",
          "{villain} counters each fact with one honest reframe — 'True. And alone it proves nothing.' — because every clue IS true. The winning move is arrangement: means, motive, and opportunity presented in ORDER beats any single fact, and the player who stands up and sequences it should feel the room move.",
          "When it breaks, it breaks toward whatever assets survived: fight, flight, or — stripped of everything — a chair, a confession, and the specific quiet of a room that has finished changing its mind. All three are victories. Say the last one out loud.",
        ],
        combat: {
          tactics: "{villain} opens on the evidence-bearer — destroy the proof, then the prover — using guests as screens and the long table as a barricade. Stripped advantages stay stripped; whatever survived the accusation is spent inside two rounds, and then the exit gets tried.",
          terrain: "a furnished parlor: one door, tall windows, a lit fireplace, a table made for overturning, and bystanders whose panic is a hazard with feet",
        },
      },
      {
        type: "climax",
        title: "The Exit Plan",
        readAloud:
          "The verdict is loose in the streets, and {villain} is ahead of it, moving through {place} on a route rehearsed for exactly this night — fog off the water, lamps at half-oil, a tide about to turn. Behind, the bell. Ahead, the gate, the bridge, the dark. The town stands in its doorways, deciding.",
        summary:
          "The villain runs on a prepared route with paid help at every joint. Evidence already made public has been closing doors ahead of them all evening — the case itself is the net.",
        details: [
          "THE EVIDENCE RULE: each SOLID clue the party made public strips one escape asset in advance — the bribed gatekeeper rediscovers his conscience, the coachman unhitches and walks, the boat crew melts into the fog, the crowd plugs the bridge, the safehouse stays dark. Walk the route with the players first and cross off what their work already closed.",
          "The chase runs three joints — gate, bridge, waterline, or this site's equivalents. At each, remaining hirelings stand while {epithet} spends what is left. Each joint falls to speed, force, or a piece of evidence shouted for the street to hear: the town's hands appear when the proof is loud enough.",
          "At the final asset — or the water's edge, if all were stripped — {villain} turns. This fight is personal and unscreened, and the mannerism finally fails mid-sentence. Taken alive, the confession comes easily: professionals respect arithmetic.",
          "If the party's evidence was thin, the route holds and {villain} is gone by water or gate — name the town's mood at dawn, and which door was the one that stayed open. Some verdicts take a sequel; say so without apology.",
        ],
        combat: {
          tactics: "Rearguard pairs trade space for time at each bottleneck — tangle, topple, delay, never die — while {villain} runs the route. Cornered at the last joint, the villain fights toward open water or open road, and surrenders the moment the arithmetic goes honest: survival now, lawyers later.",
          terrain: "night streets in fog: cart bottlenecks, lamplight islands, a bridge rail over black water, and one final narrow place where the route runs out",
        },
      },
      {
        type: "climax",
        title: "The Next Name",
        readAloud:
          "The next name on the killer's list is having an ordinary evening, which is a hard thing to watch: lamps lit, supper smells, a door locked twice by a careful servant. Out in the dark, the appointed hour comes on at an unremarkable pace. Somewhere between the garden gate and the last landing, the case ends tonight — one way or the other.",
        summary:
          "The party knows who is next and roughly when. The finale is a defense: ground chosen in advance, a strike arriving on schedule, and every piece of casework converted into a precaution that works.",
        details: [
          "THE EVIDENCE RULE: each SOLID clue becomes a precaution the players assign before the strike — knowing the poison readies the antidote (the first dose fails), knowing the route bolts the true door (the strike arrives where the party waits), knowing the hired hands names their price (half the muscle never shows), knowing the false face unmasks the inside servant, and each cleared suspect stands an extra post. Fewer clues, fewer walls; run it exactly as earned.",
          "The strike opens with a feint — noise at the front, proxies at the gate — while the real approach is one quiet figure on the servants' paths, wearing a face that belongs in the house. The party's preparation decides whether the feint works. Do not soften it in either direction.",
          "{villain} coming in person is itself the confession: nothing about tonight is deniable, and {epithet} knows it — which is why the plan includes silencing everyone who sees. That arithmetic is the villain's one real mistake. It puts them in the room.",
          "Afterward, the protected witness matters: alive, their testimony lands the verdict with the whole town's weight; dead despite everything, the statement they were canny enough to write still speaks, and the case survives its client. Both endings pay the players' work — only one pays it warmly.",
        ],
        combat: {
          tactics: "Proxies press the loud front and fold under real resistance; the quiet figure takes the servants' paths toward the one room that matters, silences witnesses of opportunity, and — discovered — takes the nearest throat hostage by reflex. {villain} fights coldest of all the finales here: tonight was supposed to be simple.",
          terrain: "a defended house at night: hall and stair bottlenecks, a dark garden, servants' passages the enemy knows better than the party, and one room everything is converging on",
        },
      },
    ],
  },

  complications: [
    "Another name leaves the story: a witness the party meant to see tomorrow is found dead tonight, and whatever they knew is now a search of their rooms — against company.",
    "Someone confesses — publicly, in detail, wrongly. The magistrates want the book closed; the confession falls apart under one honest check, if anyone in power can be made to run it.",
    "The town decides early: a crowd with rope and a name gathers at dusk. The party has until the torches reach the jail to produce a louder truth.",
    "Evidence surfaces in a party member's room, planted by someone who entered unremarked — which is itself the clue. Who walks that hallway without being seen?",
    "The inquest is moved up a day. {patron} needs something presentable by noon tomorrow, or the official story sets like plaster and every door the retainer opened starts closing.",
    "A broadsheet prints half the party's findings, accurately. By morning every suspect has adjusted, and the killer knows precisely what is still hidden.",
    "A key witness suddenly remembers differently after a quiet evening caller. Their first statement was written down; the difference between the two versions is a map of who is paying.",
    "The funeral is tomorrow, and the rites will bury the best evidence with the body. Exhumation takes a writ, and nobody in {place} signs those for strangers.",
  ],

  sensory: [
    "Sealing wax, cold tea, and old paper in every office you are shown into.",
    "Rain hatching the windows while a statement is read back in a clerk's monotone.",
    "Shutters closing one street ahead of your questions.",
    "A single test of the gallows drop from the square, and no one nearby looks up.",
    "Vinegar sharp over stone where something darker was scrubbed.",
    "The same three-note whistle moving corner to corner, keeping pace with you.",
    "A dog barking at one particular door, and only that one.",
    "Mourning cloth going up on a house that has not announced a death.",
    "The tavern hushing by degrees as you enter — not silence, arrangement.",
    "Candle stubs of five different lengths in a room everyone swears they left together.",
  ],

  cutAdvice: [
    "Cut Shadow Work first — its destination surfaces instead in the Paper Trail or from a cleared suspect's testimony.",
    "Fold both interview scenes into one gathering — a wake, a guild session — with every suspect in one room and the same levers intact.",
    "If the finale must start now, the Second Bell tolls offstage: three sentences, an attendance list, and the field narrows without a fight.",
  ],
};
