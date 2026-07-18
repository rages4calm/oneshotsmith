import type { ThemePack } from "./schema";

// Wilderness: the route IS the dungeon. Waystations for rooms, weather for
// a wandering monster, and a landmark at the far end that everything —
// terrain, wildlife, plot — has been quietly pointing at the whole way.

export const WILDERNESS: ThemePack = {
  theme: "Wilderness",
  moduleLetter: "X",

  titlePatterns: [
    "The {adj} {noun}",
    "Across the {adj} {noun}",
    "The {noun} Beyond {place}",
    "Under {adj} Skies",
    "The {adj} Country",
  ],
  titleAdjectives: ["Trackless", "Howling", "Hungry", "Drowning", "Ashen", "Bitter", "Foundering", "Stormworn", "Roofless", "Unfenced", "Wintering", "Wolf-Gray"],
  titleNouns: ["Crossing", "Pass", "Fells", "Waste", "Reach", "Fen", "Divide", "Marches", "Miles", "Heights", "Watch", "Shore"],
  taglines: [
    "The map says three days. The country disagrees.",
    "Out here the weather is not scenery. It is the other party at the table.",
    "The signal fires went dark in order, farthest first.",
    "The land remembers being without the road.",
    "Five days of food, four days of trail, and a sky that has not decided yet.",
    "Nothing out there hates you. Nothing out there is on your side, either.",
    "Getting to {site} is the adventure. Getting back is the story.",
    "The birds left in high summer. They knew something.",
  ],

  sites: [
    {
      names: ["The Wrecklight Road", "The Salt Miles Out of {place}", "The Walk to the Broken Lamp"],
      description:
        "Two hard days of cliff path and tide-cut causeway between {place} and the lighthouse on the last headland — a coast with a wrecker's history and a churchyard full of sailors to prove it. The sea takes the low road at every high tide, so the route is really a timetable: cross the strands when the water allows, or wait shivering until it does. The light has been dark for three weeks. The ships keep coming anyway, because no one has managed to walk out and tell them not to.",
      roomLabels: ["The harbor stairs", "First strand crossing", "Wreckers' chapel", "The gull cliffs", "Tide-clock cairn", "The drowned village", "Smugglers' step", "Second strand at low water", "The seal rookery", "Storm cellar shelter", "The keeper's garden", "Chain walk under the headland", "The lamp stair", "The wreck on the rocks"],
      terrain: ["gusts off the sea that shove anyone airborne or off-balance", "spray-slick rock shelving toward a forty-foot drop", "tide pools deep enough to swallow a dropped weapon", "wreck timbers that shift underfoot like a live deck"],
    },
    {
      names: ["The Saint's Stair", "The White Pass Above {place}", "The Pilgrim Road to the Bell"],
      description:
        "The pilgrim road climbs out of {place} through three thousand feet of switchbacks, shrine to shrine, into country where summer is a rumor. The monastery on the saddle rings its bell at dawn and dusk, and the villages below set their days by it — which is how everyone knows the snow came two months early, and that the bell has gone on ringing anyway, at the wrong hours, in a pattern the oldest pilgrims say means 'do not come up.' The abbot's last letter down asked for lamp oil, rope, and 'no one curious.'",
      roomLabels: ["The first shrine", "Switchback miles", "The last farm", "Rope-and-chain traverse", "Pilgrim shelter", "The scree slope", "Frozen tarn", "The avalanche field", "Cornice ridge", "The snow-buried shrine", "The gatehouse in the drift", "The bell court", "Monks' terraces", "The high saddle"],
      terrain: ["chest-deep drifts that swallow a charge", "wind-polished ice on every surface that slopes", "a cornice lip overhanging nothing at all", "thin air that doubles the cost of every dash"],
    },
    {
      names: ["The Mirebank Line", "The Fen Road From {place}", "The Causeway to the Old Watch"],
      description:
        "The old military causeway runs dead straight across nine miles of fen — or it did. Now it is a line of broken stumps and duckboard patches with black water on both sides and no firm ground that hasn't earned the name twice. The watchtower at the far end has been sinking for a century; last month it began ringing the alarm, which is strange, because the garrison withdrew sixty years ago and took the bell with them. Fowlers from {place} still work the near margins, and not one of them will look at the tower while they do.",
      roomLabels: ["The last dry field", "First duckboard mile", "The eel weirs", "Fowlers' blind", "The broken stone mile", "Bittern reeds", "The floating island", "Old camp on the hummock", "The drowned orchard", "Wisp-light shallows", "The leaning milestone", "Heron rookery", "The tower foot", "The bell room above the water"],
      terrain: ["mud that holds a boot like a closed hand", "reed walls head-high, cutting sight to ten feet", "tussocks that bear one person's weight at a time", "black water hiding depth changes of six feet"],
    },
    {
      names: ["The Char", "The Burn Above {place}", "The Ash Road to the Fire's Heart"],
      description:
        "A week ago this was forty square miles of old forest; now it is standing black columns and ash to the ankle, still warm in the hollows, its smell in the laundry lines of {place} seven miles downwind. Foresters who worked these slopes their whole lives get lost inside an hour — every landmark burned, every trail erased. And the fire behaved wrong: it started at the far ridge and ran downhill against the wind, and the burn maps the wardens drew all agree on one thing. A spiral, tightening toward a center nobody has visited.",
      roomLabels: ["The green edge", "The first standing black", "Ash flats", "The survivor grove", "Smoking snag line", "The cooked stream", "Firebreak that failed", "The glass ridge", "Bone hollow", "The unburned circle", "Root-fire warrens", "The spiral's inner mile", "The center's threshold", "What lit it"],
      terrain: ["snags that fall when anything shoves anything", "ash that erases tracks and rises in blinding clouds", "ground pockets still hot enough to cook through boot leather", "no cover but char that crumbles at a touch"],
    },
  ],

  hooks: [
    {
      readAloud:
        "The waywarden's map wall has a line of pins running from {place} out toward {site}, and three of the pins wear small black hoods. 'Signal stations. Each one lights at dusk to say all's well.' She touches the hooded pins in order — farthest first, nearest last — and lets you notice for yourselves which direction the dark is traveling.",
      summary:
        "{patron}, waywarden of {place}, hires the party to walk the line to {site}, relight the stations, and learn what is putting them out. Pay: 40 gp each, doubled if every keeper is accounted for, plus requisition rights at the waystations.",
    },
    {
      readAloud:
        "The relay bird came in at dawn with frost on its feathers and a message tube sealed at {site}. The strip inside is written in the keeper's tidy hand and stops mid-word: 'Send help before the' — then a tear, and a rust-brown stain nobody in the office will name. The bird has not stopped watching the window it came in by.",
      summary:
        "A message from {site} arrived cut short. {patron}, who holds the relay contract, wants the rest of the sentence badly enough to fund a crossing: 25 gp each now, 75 more on return with the keeper — or with the keeper's fate.",
    },
    {
      readAloud:
        "The mule found its own way back to {place} — hungry, rope-burned, still saddled. What silences the {tavern} is the load: not the surveyor's gear it left with, but a stranger's pack, a coil of climbing rope cut clean, and one boot with the laces triple-knotted the way soldiers do before a hard crossing. Nobody in town triple-knots. Nobody in town recognizes the boot's maker-mark either.",
      summary:
        "A surveyor bound for {site} is nine days overdue and her mule came home carrying a dead stranger's gear. Her brother {patron} is emptying the family strongbox to send capable people after her — and quietly asks them to learn who else was out there with her.",
    },
    {
      readAloud:
        "{patron}'s study smells of new maps and old money, and the contract on the desk is generous to the point of suspicion: wages ahead of the rate, equipment provided, a bonus for speed. The only clause with teeth is the last one — everything recovered at {site} passes to the sponsor, unexamined and unopened. {patron} watches you read it, and has been watching the whole time.",
      summary:
        "{patron} is funding a private expedition to {site} and needs professionals for the crossing. The pay is real and prompt. The manifest of provided equipment includes a locked crate listed only as '{item}, in trust' — and the party is not given the key.",
    },
    {
      readAloud:
        "The third attack in a week, and this one in daylight, in a garden, thirty yards from the {place} common. The hunter who dropped the beast rolls it over for you: ribs like barrel hoops, pads worn raw from distance, old scars gone white — an animal that lived hard and far from people until something made that impossible. Every carcass this week has come from the same direction. {site} sits at the far end of it.",
      summary:
        "Predators that should never approach a town are pouring out of the country around {site}, starving and terrified. The village reeve {patron} pays for the obvious question to be answered at its source: what are they running from?",
    },
    {
      readAloud:
        "The crate is packed, corded, and waxed against weather, and the priest keeps one hand on it the whole time she talks. 'The road is closed. The passes, the fords — closed, they tell me, as if the word settles the matter.' She looks at each of you in turn. 'The people at {site} did not stop needing this when the weather stopped permitting it.'",
      summary:
        "{patron} needs medicine and winter stores delivered to {site}, closed roads notwithstanding. The full load is far more than the party can carry fast; what to take, what to leave, and what to promise is the first hard choice of the crossing.",
    },
  ],
  hookAlternates: [
    "The bounty on {villain} was posted in spring. The fine print — claimant must present proof from {site} itself — explains why it has gone unclaimed.",
    "A trapper dies in the {tavern} holding the newest party member by the sleeve, and everyone in the room hears the promise they make her about {site}.",
    "The mapmakers' guild pays 300 gp for a corrected survey of the route to {site}. The last three surveyors were paid in advance, which tells you what the guild knows.",
  ],

  villains: [
    {
      epithets: ["the Skinner", "Lord of the Long Snare", "the Season That Never Closes"],
      motivation: "Sees the wild as a warehouse with poor security, and the disaster that closed the route as the market opportunity of a lifetime — no wardens, no witnesses, no season.",
      plan: "Strip the country around {site} of everything with a pelt, a horn, or a price, using the closed route as a fence around a private harvest — and making quietly certain the route stays closed until the wagons are full.",
      secret: "Among the trophies is the one animal this country could not spare. The panicked game, the bold predators, the whole unraveling the party has walked through — all of it is a symptom of a single kill already salted and crated in the wagon.",
      mannerism: "Appraises everyone they meet out loud — coat, boots, teeth — in coin, to the copper, and is never wrong about the number.",
      bossTags: ["leader", "humanoid"],
    },
    {
      epithets: ["the Unpathing", "Warden of No Roads", "the Green Recompense"],
      motivation: "Spent a lifetime holding travelers and wild country in balance, and has concluded — after one final unforgivable insult from the towns — that the balance requires there be no travelers.",
      plan: "Erase the route to {site} one waystation at a time, with whatever the season offers — snow, water, fire — until the maps are lies, the fords are gone, and the country closes over the road like skin over a wound.",
      secret: "The disaster obeyed them exactly once. It has not obeyed them since. The thing they woke to close the road has intentions of its own now, and each escalation is partly an aging warden trying to look in charge of a landslide already moving.",
      mannerism: "Uses no names or titles — everyone is 'the walking kind' — and stops mid-sentence whenever a bird calls, until it finishes.",
      bossTags: ["caster"],
    },
    {
      epithets: ["the Landlord", "Keeper of the High Toll", "Old Rent"],
      motivation: "Has collected tribute at the crossing since anyone's grandmother can remember — a sheep here, a cask there — and regards the arrangement not as extortion but as rent: honestly owed, and lately unpaid.",
      plan: "Work down the route collecting arrears — a roof for a missed payment, a bridge for a rude answer — until somebody restores the old arrangement or there is nothing left standing to owe rent.",
      secret: "The tribute was never greed. It has been paying for something all along — a service done up in the high dark beyond {site}, generation after generation — and that service has now gone undone exactly as long as the payments have. Killing the collector without learning what the collection bought will be the region's most expensive victory in a century.",
      mannerism: "Weighs whatever it holds in one palm before speaking — people included — and quotes prices three generations out of date.",
      bossTags: ["giant", "brute"],
    },
    {
      epithets: ["the Firstflight", "the Weathermaker", "Heir of All This"],
      motivation: "Has claimed the country around {site} — newly fledged, and drunk on the difference between big and biggest — and is performing dominion: the storm, the ruin, the fear, the way a new king performs a coronation, mostly for the audience.",
      plan: "Stage disasters of increasing signature until everything that flies, walks, or prays in this country does so with its name attached — then present the wreckage as a realm when its elders come to inspect the claim.",
      secret: "It is overdrawn. The displays cost more than the territory yields, the hoard is a boast built on gravel and three real coins, and an elder is genuinely coming. Its terror of that inspection is the one lever bigger than its vanity — a party that finds the lever can end this without a spear thrown.",
      mannerism: "Repeats compliments it has received verbatim, with attribution, years after the fact — and demands witnesses describe what they just saw, correcting their adjectives.",
      bossTags: ["boss", "dragon"],
    },
    {
      epithets: ["the Benefactor", "the Open Hand", "Patron of the Last Mile"],
      motivation: "Knows that something at {site} bears the sponsor's name — an order given in writing, a cargo that should not exist, a grave dug in a hurry — and it cannot be allowed to come back with anyone the sponsor does not own.",
      plan: "Fund every attempt on {site}, staff each with hirelings and one quiet retainer, and keep the expeditions failing profitably — supplies shorted, guides bought, routes chosen for scenery over speed — until a private crew can reach the evidence first.",
      secret: "The disaster that closed the route was the sponsor's job gone catastrophically past its instructions, and the rescue expeditions are the cover-up. Nobody audits a benefactor, and nobody suspects the person paying for the search of being the reason there is something to find.",
      mannerism: "Gives unprompted, excellent gifts — boots, maps, better rope — and finds small ways, later, to mention them.",
      bossTags: ["boss", "humanoid"],
    },
  ],

  twists: [
    "The weather has an author. Something at {site} is making it — not as a weapon but as a reflex, the way a wound swells. Every storm the party cursed on the way in was the country closing itself around an injury, and the injury is what they are walking toward.",
    "The guide has walked this route before — with the expedition nobody talks about, the one that caused all of this. Every 'shortcut' since {place} has steered the party around the evidence. The thing they aren't saying is that they know exactly what waits at {site}, because they helped leave it there.",
    "The waystation keepers didn't flee. Each one packed carefully, banked the fire, and walked toward {site} — in order, farthest first, as something called them up the line one at a time. The party isn't walking into danger. It is walking up a queue.",
    "The animals aren't running from {site}. They are running from what has followed the party since {place} — a day behind, downwind, letting them break trail and blunt the weather. The wild read it right from the first mile; the party has been reading the country backwards.",
    "{patron}'s errand is genuine, but it was assembled backwards: something at {site} asked for the party — or for one of them — by name, and every practical reason for the journey was arranged afterward, by hands that may not know whose want they were serving.",
    "The route isn't closed by accident. It closes on schedule, one season in a generation, and the waystations exist to turn travelers back politely without ever saying why. This is a closed season. The vanished keepers are the ones who stayed past the date their own signs warn about.",
    "{villain} isn't at {site} — they are behind the party, closing the route as it is walked: bridges cut, fords spoiled, caches emptied in their wake. The destination was never a lair. It is the far end of a trap that needs its door shut, and the door is the way home.",
    "The landmark at {site} was never what the maps call it. Light, cloister, tower — each was a warden's post standing watch over something older, and the disaster that cut it off is simply what the end of a very long shift looks like. {villain} didn't break the watch. {villain} is what it was watching.",
  ],

  cluePool: [
    "Game trails, deer runs, even the ant columns: everything that moves out here is moving on the same bearing, and it is not toward water.",
    "A waystation logbook, meticulous for thirty years, ends mid-inventory: 'candles, eight. Rope, one hundred feet. Someone on the roof.'",
    "The snow line sits two thousand feet too low for the month, and the trees beneath it still hold their leaves — the cold arrived before autumn did.",
    "A trail cairn rebuilt wrong: the stones spell 'safe camp' to anyone who reads sign, but the moss on every stone faces inward. Rebuilt by someone who learned the code from a book.",
    "Kills along the route, clean and uneaten. Whatever hunts here isn't hungry.",
    "The toll cairn at the crossing holds months of uncollected payment — coins, a ram's skull, a good axe, all weathered. The collector has never once been late before.",
    "Boot prints walking out from the direction of {site} become barefoot prints by the third cairn. The boots are at the cairn — set neatly side by side, laces tied, facing back the way they came.",
    "{villain}'s people mark their caches with shepherd's knots, and the party keeps finding them — always full, always fresh. Someone is running a supply line INTO country everything else is fleeing.",
    "Two of the expedition's ration sacks weigh light — repacked and retied with a knot nobody in the party uses. Worked out over the whole route, the difference is exactly one person's food.",
    "Smoke on the horizon at dusk: one thin line, always the same distance ahead, no matter how far the party walked that day.",
    "A trailside shrine with its offerings untouched — but the carved saint has been turned in its niche to face {site}.",
    "The guide's map is excellent. Too excellent: it marks water, shelter, and grazing only someone who wintered out here would know. The guide says they have walked this route twice.",
  ],

  monsterTags: ["wilds"],
  bossTags: ["boss", "brute"],

  scenes: {
    arrival: [
      {
        type: "arrival",
        title: "The Last Fence",
        readAloud:
          "The road out of {place} ends at a gate no one bothered to hinge, because past it the fields stop pretending. Beyond, brown country rises toward weather — a cairn, a worn thread of trail, then distance stacked on distance all the way out to where {site} waits. Behind you a farm dog barks twice and gives up. It is the last sound anything makes on your behalf.",
        summary:
          "Setting out. Establish pace, marching order, and the supply ledger — the decisions made at this gate are the ones the whole crossing will audit.",
        details: [
          "Open the ledger in the open: have the party state days of food, water plan, and pace. Fast burns supplies and bodies; steady spends days, and the weather spends them back. Write the numbers where everyone can see them — they are the campaign's hit points.",
          "The gate shrine holds a bowl of river pebbles: travelers take one going out and return it coming home. DC 12 History knows the custom — and notices the bowl used to be fuller.",
          "First weather read: DC 13 Survival gets tomorrow right (tell them truthfully); on a failure, tell them confidently and wrong. Packing and pace choices follow from what they believe.",
          "If the party hired a guide, this is where the guide silently re-ties two of their knots and says nothing about it. Passive Perception 14 notices. Competence is the first characterization; the reticence is the second.",
        ],
      },
      {
        type: "arrival",
        title: "The First Waystation",
        readAloud:
          "The waystation at the first ford was built to say you're all right now: thick walls, a bell on a post, firewood split by somebody who cared. The door stands open on a room in perfect order — floor swept, kettle full, the fire laid but never lit. On the table the station log lies open with a pen beside it, and the last entry is dated eleven days ago and isn't finished.",
        summary:
          "The route's support system is intact and empty. The party learns the crossing's customs — and that whoever kept them stopped keeping them mid-sentence.",
        details: [
          "The final log entry inventories supplies and weather, then stops mid-word. Plant a Secrets & Clues entry as the previous page — the log is the route's memory and will pay out twice more if they keep reading stations.",
          "Everything works: well, hearth, stores for three days. Custom says take what you need and sign for it. Whether the party logs honestly matters later — other travelers read this book, and so does anyone tracking who passed.",
          "The signal bell's clapper is wrapped in wool — DC 12 Investigation confirms it was silenced deliberately, by someone who knew sound carries for miles out here. The question worth saying aloud: what were they afraid would hear it?",
          "From the roof, the next station's fire platform is visible six miles on, and cold. Decide as a group: press on and camp rough, or lose half a day and sleep behind walls. Neither answer is wrong. Both have prices. Say so.",
        ],
      },
      {
        type: "arrival",
        title: "The Long Look",
        readAloud:
          "An hour past the trailhead the ground lifts, and the country introduces itself all at once: the route to {site} laid out below like rope dropped across a table — fords, rises, one thin thread of trail — under a sky doing six different things in four directions. The wind arrives with weight, like something leaning. Down the whole visible length of the way, nothing moves but weather and one line of birds going the other direction.",
        summary:
          "The overview. The party sees the entire crossing at once — scale, weather systems, route options — and picks their line through it.",
        details: [
          "Lay the route out plainly in two or three stages, with where water and shelter should be. Let them plan aloud on real geography; the map handout earns its keep here.",
          "DC 13 Survival reads the sky honestly: name the day the weather will break — and make it the day the storm challenge lands. Foreshadow, don't ambush.",
          "DC 12 Perception on the birds: not migration. Wrong season, wrong direction, no formation. Everything with wings is simply leaving.",
          "Route choice with teeth: the low way (faster, wetter, floods first) or the high way (slower, exposed, sees trouble coming). Take their answer seriously and set the middle scenes on the line they chose.",
        ],
      },
    ],

    middle: [
      {
        type: "combat",
        title: "The Territory",
        readAloud:
          "The trail ahead runs through a stand of scrub where every trunk at shoulder height is scarred — long parallel gouges, old and new, some still weeping sap. The ground says the rest to anyone listening: heavy prints circling the stand, never crossing a line you could almost draw with your eye, and a hollow of crushed grass just off the trail, body-warm. Nothing shows itself. That is its own message.",
        summary:
          "The route crosses an occupied territory whose owner advertises honestly. Read the sign and pass unfought, or blunder the border and meet the author. The wild's entire grammar, taught in one scene.",
        details: [
          "The warnings are legible: DC 12 Survival reads the scars and prints as a marked boundary with a gap — a downwind detour that adds an hour and crosses no line. Name the cost out loud so avoiding the fight is a chosen trade, not a freebie.",
          "Reward the read: the detour passes the owner's old kill site, where a previous traveler's pack still lies — a healing potion and a waterproofed sketch correcting one hazard on the route ahead. Respecting the land pays better than testing it.",
          "Pushing straight through starts the fight on the owner's terms — it has young (or a cache) behind it and will not pursue past its own boundary. Mark that line in your head; clever parties will bait to it and break off there.",
          "If the guide is present, they visibly wait to see whether the party notices the sign before saying anything. What they say after — 'you'll do,' or nothing — is characterization either way.",
        ],
        combat: {
          tactics: "Opens with a charge meant to flatten the leader and a noise meant to end the argument early. It fights to expel, not to kill, and breaks off dead at its boundary line — pursuing it past that line restarts the fight with none of its restraint.",
          terrain: "scrub thick enough to swallow shapes at ten feet, one clear trail lane, and a boundary line only readers of the sign know exists",
        },
      },
      {
        type: "skill",
        title: "The Ford That Was",
        readAloud:
          "The map's ford is under three feet of brown water moving with real intent — upstream rain, spending itself here. The guide-rope posts still stand, but the line between them dips into the current and hums like a plucked string. On the far bank, exactly where the trail resumes, somebody's abandoned handcart stands loaded and lashed down, patient as a lesson.",
        summary:
          "The river is up and the crossing the map promised is gone. Cross now with rope-work and nerve, or spend hours hunting a better ford — the weather clock makes waiting the trap answer.",
        details: [
          "State the meta-choice first: cross here (run the challenge), scout upstream (DC 13 Survival and two hours finds a wider, shallower braid — run the challenge at easy tiers), or camp and wait. If they wait, the river does drop — and the storm scene arrives a day early. The clock is real; tell them it is real.",
          "The handcart holds trade goods and one tarp-wrapped bundle lashed with a shepherd's knot — seed a Secrets & Clues entry or the first physical sign of {villain}'s supply line.",
          "Anyone swept away washes onto the shingle bar a quarter mile down: alive, minus one carried item of the DM's choice, and on the wrong side of the light. Gear the river takes is gone. This is the scene where the supply ledger grows teeth.",
        ],
        skill: {
          description: "Get bodies, packs, and morale across a river that outranks all three.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "anchor the rope line and hold it while lighter members cross" },
            { skill: "Survival", tier: "easy", use: "read the current's seams for the shallow line and the false footing" },
            { skill: "Acrobatics", tier: "medium", use: "cross the humming rope with a pack worth more than you" },
            { skill: "Perception", tier: "medium", use: "watch upstream and call the drift-log before it arrives" },
          ],
          success: "Everyone across, wet to the ribs but whole, and the handcart's cache is theirs. The river now stands behind them — note aloud what that means for turning back.",
          failure: "Each failure: a pack goes under, the anchor tears loose (the next check is hard tier), or a body is swept to the shingle bar — bruised, separated, and racing the dusk back to the group.",
        },
      },
      {
        type: "social",
        title: "The Last Roof",
        readAloud:
          "Smoke — actual, domestic, tended smoke — rises from the last inhabited waystation on the route, and the smell of it changes the whole party's pace. The keeper meets you at the door with a lamp and a ledger, and behind her the common room is warm, dry, and entirely empty. 'Beds, stew, and the stable,' she says, 'and the price is what it always is.' She does not say what the price is. She watches to see if you know.",
        summary:
          "The last warm roof before {site}. The keeper trades shelter for the route's true currency — news, carried honestly — and she knows one thing about the way ahead she will not volunteer. The party's conduct here compounds for the rest of the crossing.",
        details: [
          "The price is news: conditions behind, who they've met, what they've buried. She pays in kind — the route ahead, water, one hazard the map doesn't show — and a night under her roof is the best rest on the route. Grant Inspiration to anyone who traded their news honestly.",
          "What she won't volunteer: she has seen {villain}'s people pass twice, and took their news-toll both times. DC 14 Insight notices her pen stop whenever talk drifts toward {site}. Asked directly and kindly, she trades the truth for a promise: 'you didn't hear it under my roof.'",
          "If the party travels with the guide, keeper and guide know each other, and something old is owed between them. Play one wordless beat of it and let neither explain. Asked, both say 'route business,' in the same tone.",
          "Anyone who stiffs her, lies in their news, or lifts from the stores gets no confrontation — she simply writes it down. Everything left alive on this route reads that ledger eventually. Price the theft accordingly.",
        ],
      },
      {
        type: "skill",
        title: "The Sky Comes Down",
        readAloud:
          "It begins as a line on the horizon, ruler-straight and wrong for any cloud you know, and then the temperature drops like something dropped. The country starts putting itself away — birds down, wind up, the light going a color that means nothing good in anyone's weather-lore. The land offers what it offers: a rock overhang off the route, a brush hollow on it, or the open trail. The line is closer every time anyone checks.",
        summary:
          "The storm the sky has promised all trip arrives on the DM's schedule. A shelter-or-push challenge where the weather is the antagonist and every choice spends something: time, gear, warmth, or distance.",
        details: [
          "Offer three shelters, none perfect: the overhang (solid, but costs distance), the hollow (on-route, but wet — DC 12 Constitution at dawn or gain a level of exhaustion), or pushing through (keeps the distance, runs the challenge at hard tiers). Put the price tags on the table; the drama is the choosing.",
          "The storm has moods, not hit points. Run three named phases — the Front, the Long Middle, the Spiteful Tail — and describe each differently. Failed checks may be retried in the next phase at the same cost: a siege, not a save-or-die.",
          "Halfway through, something else crowds into the same shelter — wild, wet, shaking, and uninterested in any quarrel while THAT is happening outside. A truce nobody negotiates. It is gone before the party wakes, and takes nothing.",
        ],
        skill: {
          description: "Spend the storm's hours without letting the storm spend the party.",
          checks: [
            { skill: "Survival", tier: "medium", use: "pick and rig the shelter before the front arrives" },
            { skill: "Athletics", tier: "medium", use: "hold the windbreak through the worst of the gusts" },
            { skill: "Medicine", tier: "easy", use: "rotate the wet and the cold before frost does its arithmetic on fingers" },
            { skill: "Nature", tier: "hard", use: "read the storm's structure and call the quiet half hour hiding inside it" },
          ],
          success: "Cold, loud, survivable: the party emerges with gear intact onto a route washed clean of every track but one set — fresh, pressed deep, made DURING the storm by something that does not shelter.",
          failure: "Each failure: a piece of gear torn away downwind, a level of exhaustion (cleared by hot food and a real fire), or a pack animal bolts with its load. The storm always ends. The ledger doesn't.",
        },
      },
      {
        type: "combat",
        title: "The Ring of Light",
        readAloud:
          "The fire makes its small room in the enormous dark, and for a while the crossing is almost kind: heat, food, the day's miles loosening out of your legs. Then, at the edge where the light gives up, something walks a slow half-circle — unhurried, weight on soft feet, pausing exactly where the eyes of whoever is on watch stop being able to prove anything. A stone clicks. The night has come to take the camp's measure.",
        summary:
          "The night camp, and the wild's inspection of it. What probes the firelight is testing — the watch, the food line, the picket knots — and what it finds decides whether this is a tense night or a fight. Preparation IS the encounter.",
        details: [
          "Audit the camp aloud when they pitch it: fire size, food hung or bagged, pickets, watch order. Every sloppy answer is a door, and the visitor finds every door. A squared-away camp gets tested and left; the fight only happens if the audit fails or someone panics.",
          "The probes escalate in order: circling, then a snatched item from the camp's edge (something someone left out — make it something missed), then a rush at the pack animals or the food line. Between each, a long silence engineered to convince everyone it is over.",
          "Shooting blind into the dark is a vote for the fight and hits nothing on the first volley — say 'the dark swallows it' and let them reconsider. Building the fire up (spending tomorrow's fuel) or a real deterrent (DC 13 Survival: smoke, scent, noise on the perimeter) ends the probing peacefully.",
          "If the party lost food at the river or in the storm, this is the scene where that matters: a hungry camp smells different, and the visitor knows it. When it lands, say so — sloppiness out here compounds.",
        ],
        combat: {
          tactics: "It comes out of the dark at the exact moment the watch changes, targets the food line and the smallest sentry — a taking, not a battle — and is gone within two rounds with whatever it holds. Cornered, it stops being polite.",
          terrain: "one dome of firelight, then grades of dark; past ten feet every attack is a guess and every shape is a vote",
        },
      },
      {
        type: "exploration",
        title: "The Cairn Line",
        readAloud:
          "The cairns begin at the treeline — waist-high stacks a bowshot apart, older than any road authority, patched by ten generations of passing hands. Each one carries sign for the next: a flat stone tilted for 'water,' two set crossways for 'shelter,' the rare black stone that means 'no.' The line walks its message out ahead of you to the horizon. Four cairns on, even from here, something about the stacks is different.",
        summary:
          "The route's oldest information system, and someone has been editing it. Reading the line honestly means learning to distrust it — and repairing it is how the party leaves this country better than they found it.",
        details: [
          "The near cairns are honest — water is where they say. DC 13 Survival at the fourth: rebuilt recently by book-learning, not trail-craft (moss inward, weathered faces turned wrong). The edits steer travelers off the true way — toward the territory, a drop, or {villain}'s watched approach, DM's choice.",
          "Following the false line anyway is allowed — never stop players, bill them. It costs half a day and one hazard, and ends where the last misled party's sign peters out: salvage, and a Secrets & Clues entry.",
          "Repairing the line: an hour and DC 12 Survival per bad cairn, three in all, for no mechanical reward on this trip — but every keeper, drover, and ranger they meet afterward already knows they did it. Word moves along this route faster than the people do.",
          "One cairn near {site} carries the black 'no' stone, and it is original — old, unedited, the true wardens' warning. Whatever the vandal's edits lie about, the black stone does not. Let the party see the difference between the forgery and the ancients.",
        ],
      },
      {
        type: "setpiece",
        title: "The Old Span",
        readAloud:
          "The gorge arrives as a seam of cold air rising, then an edge: a hundred feet of drop to white water, crossed by the old span — cable, plank, and habit — breathing in the wind. A red scarf is caught on a snapped board mid-span, snapping straight out in the gusts. On the far anchorage, figures are working at the cables with tools, and they have already seen you.",
        summary:
          "The set-piece: {villain}'s crew is dropping the route's one gorge crossing, and the party arrives with the job half done. A fight across a moving bridge in living wind — objectives at both anchorages and a clock made of hardware.",
        details: [
          "The clock: the crew needs 5 rounds to finish the far anchorage; each round they spend interrupted adds one. If the span drops with people on it, DC 15 Dexterity to catch cable — catchers slam into the gorge wall, battered but climbing. A fall hits the pool below: 6d6 bludgeoning, then DC 13 Athletics to make the bank before the current votes.",
          "Wind acts on initiative 20: call a gust direction each round — ranged attacks into it at disadvantage, and anyone mid-span makes DC 12 Acrobatics or loses their move holding on. The wind is fair. It hates both sides.",
          "The span is 120 feet, one plank wide, with gaps at marked intervals (difficult terrain), and it amplifies movement: running on it triggers the gust save even in a lull. Crawling is safe, slow, and visible to everyone — let the choice cost pride.",
          "Why the crew is here beats who they are: one carries written orders (a Secrets & Clues payoff or the sponsor's mark), and the last survivor rigs a personal line and rappels rather than surrender. The escape itself is information — they have rigging skills and somewhere to be.",
        ],
        combat: {
          tactics: "The crew splits its duties: two keep sawing no matter what, the rest hold the far anchorage with ranged fire and let the span do the crowd control. If the party gains the far side, they abandon the cut and scatter along the rim — the bridge mattered to their employer, not to them.",
          terrain: "a one-plank span breathing over a hundred-foot drop, wind calling a direction every round, and the two anchorages as the only solid ground in the scene",
        },
      },
      {
        type: "exploration",
        title: "The Emptied Cache",
        readAloud:
          "The ranger cache sits exactly where the cairn promised, stone-lined and bear-proof, its lid still sealed with spring wax. Except the wax has been cut in a neat square and pressed back down. Inside, the theft is organized not to show at a glance: everything a body needs is gone — food, oil, medicine — and everything that merely helps is stacked tidily on top: rope, nails, a tin whistle. Whoever emptied it wanted the next party to open it hopeful.",
        summary:
          "The route's safety net has been cut, deliberately and selectively. The supply ledger takes its worst hit of the trip — and the theft itself is a document, if the party reads it.",
        details: [
          "Do the arithmetic at the table: days of food against days of route, out loud, and let the number land. Options with prices: hunt (half a day, DC 13 Survival, feeds two days), forage as they walk (DC 12 Nature, feeds one, slows the pace), turn back (a real option — offer it neutrally), or tighten belts (the final leg costs everyone a level of exhaustion).",
          "Read the theft: DC 13 Investigation — one person, two trips, heavy load first, and the medicine taken last, like an afterthought or an order. DC 13 Survival outside: tracks heavy going toward {site}, light coming back. Someone up ahead is provisioning for a long stay.",
          "The tin whistle is not trash. It is a waystation keeper's, pitch-marked to its station — DC 12 History, or any keeper met earlier, names which one. Its presence in robbed goods means a keeper is involved, or a keeper's body was.",
          "If the party dealt squarely at the Last Roof, a drover she tipped off intercepts them near here with two days of food and a one-line note: 'You paid fair. — R.' Conduct on this route compounds, and now they know it.",
        ],
      },
    ],

    revelation: [
      {
        type: "exploration",
        title: "The Overlook",
        readAloud:
          "The last ridge hands you {site} all at once — closer than the map promised, small under the sky, at the end of a country you can finally see whole. And seen whole, the land confesses: the weather's track, the game trails, the ruin and the routes around it all bend to a pattern, and the pattern has a center, and you are looking at it. Below, faint but real, something at {site} is moving. Smoke, or a light, or a wing — the distance keeps that secret one more hour.",
        summary:
          "The truth room with no walls. From the overlook the whole crossing recontextualizes: deliver the twist as geography, let the party plan the endgame on real terrain, and give them one clean rest before it.",
        details: [
          "Deliver the twist here (see The Twist) as things seen from height, anchored to three hardships the party personally walked through. A revelation earned by miles beats one announced by monologue.",
          "DC 13 Perception — or a spyglass, or the guide — resolves the movement below: name {villain}'s presence in concrete terms. A count of figures, the state of the landmark, one detail that makes it personal.",
          "This is the last defensible camp, and the only guaranteed safe rest since the Last Roof. The approach below has exactly two lines: fast and seen, or slow and hidden. Put the choice on the table with honest prices and let them own the plan.",
          "If the guide is present, this is where they stop walking. Whatever they have been not-saying, the view has made it undeniable — it comes out here, quietly. Then the party decides whether the guide walks down the hill with them.",
        ],
      },
      {
        type: "social",
        title: "The Marker Fire",
        readAloud:
          "{villain}'s fire burns at the last boundary marker, built generous, with food at it and room. 'You walked the whole way,' they call out, 'so you've seen the state of things. That saves the explaining.' Whatever else is true of them, out here, at night, a fire is a fire.",
        summary:
          "The villain offers terms at the threshold — and after this crossing, the terms are worth hearing, because they are priced in exactly the currencies the party has spent. What is agreed, refused, or noticed here configures the climax.",
        details: [
          "The bid is bespoke: whatever the crossing taught the party to lack — food, warmth, a dry road home, the answer they came for — offered at the price of walking away. Every word of the offer is true; the frame is the lie. DC 15 Insight finds the frame: what {villain} actually needs is time. One more day.",
          "Honest trade is available regardless: news for news, keeper-style, and {villain} observes the route's customs to the letter. Noticing that they know the customs at all — the toll, the log, the news-price — is itself a clue about how long they have used this country.",
          "If anyone the party trusts was leaned on along the way (the keeper's sighting, the guide's history), {villain} mentions it — accurately, mildly — spending the party's trust like ammunition. Truth used as a weapon. Let it land before anyone rebuts it.",
          "Fighting here is allowed and premature: {villain} chose this marker weeks ago. If steel comes out, start the climax immediately but grant the villain their prepared ground — placed minions, terrain advantage, first blood of position. Say the cost fairly before the first swing: 'you can. It starts now, on their ground.'",
        ],
      },
      {
        type: "skill",
        title: "The Last League",
        readAloud:
          "The last league is the crossing in miniature, every lesson at once: the ground worsening, the light failing, the weather arriving with intent. {site} is visible the whole way now — never nearer, then suddenly very near. Behind you the route home is already disappearing, snow filling tracks, water rising, ash blowing level. The country is closing the door at your back, and it is not being subtle about it.",
        summary:
          "A timed gauntlet to the landmark's threshold as the country makes its final argument. Everything the route taught gets one last exam — arrive spent or arrive sharp, but arrive changed.",
        details: [
          "Run as a group challenge: three successes before three failures, each character contributing a different check. Let players cite earlier scenes — 'we held the rope at the ford, we know rope' — to justify their approach; the crossing was the training, and the DM should visibly honor it.",
          "Each failure charges from the route's own menu: a level of exhaustion, an item of gear left where it fell, or arriving with {villain} warned — party's choice, each price once.",
          "Any earned goodwill from the middle — the guide's trust, the keeper's note, repaired cairns, a territory left unprovoked — converts one failure to a success automatically. The land keeps books too.",
          "However it ends, close at the threshold with one beat of stillness — the noise stops, the way it does at thresholds. Let them knock, or not.",
        ],
        skill: {
          description: "Cross the last league while the country spends its remaining arguments.",
          checks: [
            { skill: "Athletics", tier: "medium", use: "force the worsening ground — drift, flood, deadfall — by main strength" },
            { skill: "Survival", tier: "medium", use: "pick the line the weather is defending least" },
            { skill: "Perception", tier: "easy", use: "keep {site} fixed through whiteout, murk, or smoke, and call the hazards early" },
            { skill: "Nature", tier: "hard", use: "read the country's closing pattern and pre-empt its next argument" },
          ],
          success: "The party reaches the threshold of {site} intact and ahead of expectation, with one clear look at the ground before the end begins — describe the climax terrain from above as their earned advantage.",
          failure: "They arrive regardless — the country was herding, not barring — but spent: down the listed costs, with the weather sealing the route home behind them. The only way out is through the ending.",
        },
      },
    ],

    climax: [
      {
        type: "climax",
        title: "The Taken Ground",
        readAloud:
          "Up close, the heart of {site} is bigger than distance allowed it to be — weather-scoured, patient, older than every story told about it in {place}. What lives here now has made its changes, and they are the kind you feel before you can list them: an entrance widened by something that does not use doors, a light where none should burn, an order to the ground that no wind made. And on the taken ground, {villain} waits — because there was never a version of this where the country didn't tell them you were coming.",
        summary:
          "The destination fight: {villain} on ground they have owned for weeks, inside the landmark the whole crossing pointed at. The wild takes no sides — but it keeps behaving like the wild, and whoever remembers that owns the field.",
        details: [
          "The landmark is terrain and treasure both: three zones — the approach ground, the structure, the height at its heart. Holding the height sees everything, but reaching it means the exposed climb both sides can watch. Give {villain} a reason to leave one zone unguarded, and let the party smell whether it is a gap or a mouth.",
          "The wild fights nobody and inconveniences everybody: on initiative 20, one country event per round — a gust, groundwater, wildlife breaking cover — applied with perfect neutrality. The party rehearsed these all week. The minions didn't.",
          "The clock: {villain} is here to FINISH something — the last wagon, the claim, the collection, per their plan. After round 5, unfinished business becomes finished and the endgame hardens. Say what the clock is in round 1; dread beats surprise every time.",
          "Victories that aren't damage: the Marker Fire terms can be reopened once, sincerely, by either side at half HP — and the landmark's original purpose (the black stone's warning) can be restored with two character-rounds of work, turning the ground itself against its occupier. The crossing taught them to read the land. The finale grades it.",
        ],
        combat: {
          tactics: "{villain} fights on interior lines, spends minions on the party's ranged threats first, and retreats upward zone by zone — the plan needs the heart of the site held, and they will trade everything else for it, including dignity.",
          terrain: "the landmark's three zones stacked toward the height: open killing ground outside, tight quarters inside, and the wild's initiative-20 interruptions playing no favorites",
        },
      },
      {
        type: "climax",
        title: "The Weather's Vote",
        readAloud:
          "The end arrives the way the crossing always promised: sky first. The storm that has flanked you for days breaks over {site} as the fight begins — not backdrop but participant, taking the world apart a plank at a time. In the flash-lit intervals the field rewrites itself: {villain} moving, footing vanishing, shelter turning to hazard and back. The country is voting, and it votes at random.",
        summary:
          "The climax with the theme's true antagonist on the field. The fight and the storm share initiative, and the side that keeps respecting the weather — the way the whole route taught — is the side still standing when it clears.",
        details: [
          "The storm acts on initiative 20 in escalating phases: rounds 1-2 wind (ranged disadvantage, small creatures knocked prone), rounds 3-4 blinding (heavy obscurement past 20 feet — the fight goes close and personal), round 5 on, violence (each round one zone of the field becomes untenable, always called one round ahead). The storm never targets. It only is. Both sides get the warnings; one side spent a week learning to hear them.",
          "{villain}'s plan needs this storm — cover, display, or collection — and they fight believing the weather is theirs. It is nobody's. The moment their prepared position becomes the untenable zone is the hinge of the fight: build to it, then swing it.",
          "Three defensible pockets stand on the field; holding one halves the storm's effects, and they can be taken, held, and lost. The fight is secretly about these — show it with placement, not narration.",
          "When the violence peaks, the storm clears — sudden country stillness, changed light, everything dripping — with the fight possibly unfinished. Whoever remains fights the last rounds in enormous silence, while the wild comes quietly back to the edges to watch. Finish it under that audience.",
        ],
        combat: {
          tactics: "{villain} anchors to their prepared pocket and lets the storm herd the party into reach, striking when the blinding phase forces closeness. When the pocket fails, they stake everything on one push during the violence, storm at their back, still certain to the end that the weather is theirs.",
          terrain: "an open field under a live storm: initiative-20 weather phases, three shelter pockets worth holding, and untenable zones called one round ahead",
        },
      },
      {
        type: "climax",
        title: "When the Country Lets Go",
        readAloud:
          "The sound arrives before the cause: a hush, then a note too low to be noise, felt in the teeth — and the country lets go. Upslope, upstream, upwind of {site}, the disaster the whole crossing promised is finally, actually happening, and it is coming through here. {villain} stands between you and the way out, and the look on their face says the schedule just changed for everyone.",
        summary:
          "A running climax inside the country's final event — flood crest, fire run, slide — where the fight and the escape are the same activity. Nobody wins by standing still; the DM's job is to keep the ground honest and moving.",
        details: [
          "Structure it as a chase with teeth: four or five grounds between here and safer footing, each surviving two rounds before the event takes it — announced plainly ('this ledge is gone at the end of the next round'). Fighting is legal anywhere. Lingering is fatal everywhere. The initiative order includes the country, and the country always goes.",
          "{villain} carries the one thing their plan cannot abandon — the take, the proof, the tribute — and it slows them exactly one ground's worth. The party's mirror: what of theirs gets dropped to stay ahead? Make both burdens visible on the field.",
          "Each ground quotes an earlier scene — a crossing, a camp, a cairn — reprised at speed and in danger. Any player who invokes the earlier lesson takes advantage on the reprise. The route wrote this exam's every question.",
          "End at the far edge: the event spends itself, the country goes quiet, and {villain}'s work lies scattered across the grounds behind. Survivors on either side are suddenly just people in the enormous aftermath — if the villain lives, the last surrender, bargain, or grief happens here. The wild has finished arbitrating.",
        ],
        combat: {
          tactics: "{villain} fights withdrawing — strike, fall back a ground, make the party choose between pressing and surviving — and spends minions as rearguard without a flicker. Their burden is their flaw: threaten the thing they carry and they stop retreating.",
          terrain: "a chain of collapsing grounds — ledge, ford, hollow, rise — each with a two-round life, the disaster always one ground behind and the safe edge always one ahead",
        },
      },
    ],
  },

  complications: [
    "The sky changes its mind: the day's weather arrives out of season and out of temper, and the leg's travel plan is void by noon.",
    "A ration count comes up wrong — spoilage, a torn sack, or arithmetic done cold and tired. One fewer day of food than everyone believed. Recount it publicly.",
    "The river rises overnight: yesterday's ford is today's wall, and the crossing the party counted on for the return is gone. Note who is stranded on which side of what.",
    "A pack animal goes lame — or a boot sole delaminates, same result: someone's pace becomes everyone's pace. Redistribute the load at the table, item by item.",
    "Other travelers, worse off: refugees from the route ahead, hungry and frostbitten, carrying one child too many and one story the party needs. Helping costs supplies. Not helping costs other things.",
    "{villain}'s people have been through: a waystation stripped, a cairn edited, or a ford staked with sharpened surprises. The route itself is now partly authored by the enemy.",
    "Night comes early and wrong — cloud, smoke, or eclipse-dark at midafternoon. Camp now on bad ground, or push into dark on good trail: choose, and pay the chosen bill.",
    "Something has adopted the party: a wild animal pacing them at the edge of sight, a day, two days, three. It wants nothing. It is either an omen or a witness, and the guide, if asked, says 'both' and will not elaborate.",
  ],

  sensory: [
    "Distance in stacked blues, each ridge a paler copy of the last, the farthest indistinguishable from sky.",
    "Wind you can watch arrive: a mile of grass laid flat in a moving stripe, ten seconds before the shove.",
    "One boot print fossilized in dried mud, mossed over with age, toes pointed the same way you are going.",
    "Rain three valleys over — a gray broom standing between earth and cloud, sweeping somebody else's afternoon.",
    "The smell of coming snow: cold iron and clean nothing, hours ahead of the first flake.",
    "A hawk riding the ridge lift for a full hour without one wingbeat, keeping the country's accounts.",
    "Initials and a date scratched at resting-height on a boulder, the year older than any living memory.",
    "Air that costs more the higher you carry it — thinner, colder, cleanly scented with stone.",
    "Silence with texture: wind in grass, wind in stone, wind in what is left of trees — three different silences, all enormous.",
    "At night, more stars than sky to hold them, and not one made light to any horizon. The dark out here is the original dark.",
  ],

  cutAdvice: [
    "Cut the Cairn Line first: fold its one load-bearing beat — the black warning stone — into the Overlook, where the guide or a DC 13 Survival check delivers it in a sentence.",
    "If the middle is bleeding time, merge the weather into the set-piece: the Sky Comes Down becomes the opening rounds of the Old Span, enemies and storm in one scene, and nobody will call it thin.",
    "If the finale must start NOW, the Last League becomes one group Survival check at medium DC narrated at a jog — but keep the beat of stillness at the threshold. The quiet is the cheapest scene you have, and it always lands.",
  ],
};
