/* ==========================================================
   ARTICLES LIST
   ----------------------------------------------------------
   This is the file you'll edit most often.

   Everything on the site that lists articles reads from here:
   the homepage cards, the topic counts, the search page and
   the "Keep exploring" suggestions under each article.

   TO ADD A NEW ARTICLE:
   1. Create the article page (copy article-template.html).
   2. Copy one of the blocks below, from its opening { to its
      closing }, including the comma after it.
   3. Paste it at the top of the list and change the details.

   RULES THAT KEEP THINGS WORKING:
   • Keep the quotation marks "like this" around text.
   • Keep a comma after each block, and after each line inside it.
   • If your text contains a double quote, use ’ or “ ” instead.
   • "category" must be one of the slugs in SITE_CATEGORIES.
   • "date" must be written as YYYY-MM-DD, e.g. "2026-11-01".
   ========================================================== */


/* ---------- The six topics ---------- */
const SITE_CATEGORIES = [
  {
    slug: "medicine",
    name: "Medicine & Pharmacology",
    description: "How drugs, bodies and evidence meet."
  },
  {
    slug: "discoveries",
    name: "Discoveries & Research",
    description: "The stories, accidents and arguments behind what we know."
  },
  {
    slug: "psychology",
    name: "Psychology & Behaviour",
    description: "Why minds work the way they do, and sometimes don’t."
  },
  {
    slug: "philosophy",
    name: "Philosophy & Critical Thinking",
    description: "Tools for thinking clearly about hard questions."
  },
  {
    slug: "society",
    name: "History, Economics & Society",
    description: "How people, incentives and institutions shape one another."
  },
  {
    slug: "growth",
    name: "Learning & Personal Growth",
    description: "Evidence-informed ways to learn, work and grow."
  },
  {
    slug: "myths",
    name: "Who Said So?",
    description: "Things our elders swore by, put to the test. Some are pure myth; some have real logic behind them."
  }
];


/* ---------- The articles ---------- */
const SITE_ARTICLES = [
         {
  id: "economics-of-free",
  title: "The Economics of Free Things: Is Anything Really Free?",
  description: "Free apps, free trials, free UPI payments and free data. Who really pays for free things, why zero is a special price, and when giving things away free works better than charging a little.",
  category: "society",
  readingTime: 11,
  date: "2026-12-11",
  file: "article-economics-of-free.html",
  featured: false,
  keywords: ["free lunch", "zero price effect", "attention economy", "advertising", "free trials", "subscriptions", "dark patterns", "UPI", "MDR", "Jio", "freebies", "bed nets", "behavioural economics"],
  related: ["pill-appearance", "goodhart", "india-one-clock"]
},
         {
  id: "simpsons-paradox",
  title: "Simpson’s Paradox: When Every Group Improves but the Total Gets Worse",
  description: "Every group can improve while the total gets worse. Real cases from Berkeley admissions, kidney-stone surgery, a smoking survey, Covid-19 death rates and hospital league tables, and how to tell which number to trust.",
  category: "philosophy",
  readingTime: 11,
  date: "2026-12-09",
  file: "article-simpsons-paradox.html",
  featured: false,
  keywords: ["Simpson's paradox", "Berkeley admissions", "kidney stones", "confounding", "weighted average", "hospital league tables", "case mix", "Whickham", "Covid-19 case fatality", "Judea Pearl", "statistics", "critical thinking"],
  related: ["base-rates", "survivorship-bias", "praise-punishment-illusion"]
},
         {
  id: "trauma-bonds",
  title: "Why We Get Attached to People Who Hurt Us",
  description: "Why do people stay bonded to a partner, parent or boss who hurts them? What research on infant attachment, unpredictable kindness, craving and investment shows, and why leaving is a process, not a moment.",
  category: "psychology",
  readingTime: 13,
  date: "2026-12-07",
  file: "article-attached-to-people-who-hurt-us.html",
  featured: false,
  keywords: ["trauma bonding", "traumatic bonding", "abusive relationships", "attachment", "intermittent reinforcement", "Stockholm syndrome", "investment model", "domestic violence", "Dutton and Painter", "Bowlby", "leaving", "NFHS-5"],
  related: ["born-unfinished", "praise-punishment-illusion", "intelligent-false-beliefs"]
},
      {
  id: "happy-accidents",
  title: "Happy Accidents? The Real Stories Behind Everyday Inventions",
  description: "Sticky notes, super glue, Teflon and the microwave began with something going wrong. The real stories, and why famous tales about potato chips, chocolate chip cookies and penicillin are exaggerated.",
  category: "discoveries",
  readingTime: 6,
  date: "2026-12-05",
  file: "article-happy-accidents.html",
  featured: false,
  keywords: ["accidental inventions", "Post-it Notes", "super glue", "Teflon", "microwave oven", "Slinky", "saccharin", "potato chips", "chocolate chip cookie", "penicillin", "serendipity"],
  related: ["clair-patterson-lead", "h-pylori", "survivorship-bias"]
},
      {
  id: "pill-appearance",
  title: "More Than the Molecule: What a Pill’s Colour, Price and Score Line Really Do",
  description: "How a pill’s colour, price and look shape what people expect and whether they keep taking it, and why some tablets can be split while others, because of their coating, must never be.",
  category: "medicine",
  readingTime: 7,
  date: "2026-12-03",
  file: "article-pill-appearance.html",
  featured: false,
  keywords: ["pill colour", "placebo", "branding", "price", "generic medicines", "adherence", "tablet splitting", "score line", "enteric coating", "modified release", "crushing tablets"],
  related: ["placebo", "grapefruit-problem", "dose-for-men"]
},
      {
  id: "knuckle-cracking",
  title: "Does Cracking Your Knuckles Cause Arthritis? The Doctor Who Tested It on One Hand",
  description: "A doctor cracked the knuckles of only one hand for decades to test the old warning, and won an Ig Nobel Prize. What his experiment and larger studies show, and what the crack really is.",
  category: "myths",
  readingTime: 5,
  date: "2026-12-01",
  file: "article-knuckle-cracking.html",
  featured: false,
  keywords: ["knuckle cracking", "arthritis", "osteoarthritis", "Donald Unger", "Ig Nobel Prize", "synovial fluid", "cavitation", "joint cracking", "grip strength", "myths"],
  related: ["household-superstitions", "daily-bath", "survivorship-bias"]
},
      {
  id: "shower-ideas",
  title: "Why Ideas Come in the Shower: The Science of Stepping Away",
  description: "Why answers often arrive after we stop trying. What research on incubation, mind wandering, walking and sleep shows about stepping away from a problem, and what has not held up.",
  category: "growth",
  readingTime: 7,
  date: "2026-11-29",
  file: "article-shower-ideas.html",
  featured: false,
  keywords: ["incubation", "creativity", "insight", "shower thoughts", "mind wandering", "fixation", "Graham Wallas", "Poincaré", "sleep and insight", "walking", "problem solving"],
  related: ["learning", "motivation-unreliable", "replication-crisis"]
},
      {
  id: "india-one-clock",
  title: "India’s One Clock: Two Hours of Sunlight, One Time Zone",
  description: "India spans about two hours of sunlight but runs on one clock. How Indian Standard Time came about, what it costs the Northeast, and why Assam’s tea gardens kept their own “garden time”.",
  category: "society",
  readingTime: 7,
  date: "2026-11-27",
  file: "article-india-one-clock.html",
  featured: false,
  keywords: ["Indian Standard Time", "time zone", "IST", "chaibagan time", "bagan time", "Assam", "Northeast India", "sunset", "sleep", "energy"],
  related: ["perfect-routine", "religion-and-geography", "medicine-timing"]
},
      {
  id: "burden-of-proof",
  title: "The Burden of Proof: Who Has to Prove What?",
  description: "“Prove it isn’t true” sounds like a fair challenge. It usually isn’t. How courts, science and safety rules decide who must prove what, and why that choice matters so much.",
  category: "philosophy",
  readingTime: 8,
  date: "2026-11-25",
  file: "article-burden-of-proof.html",
  featured: false,
  keywords: ["burden of proof", "Russell's teapot", "Hitchens's razor", "presumption of innocence", "extraordinary claims", "absence of evidence", "precautionary principle", "critical thinking"],
  related: ["occams-razor", "base-rates", "clair-patterson-lead"]
},
      {
  id: "praise-punishment-illusion",
  title: "Why Praise Seems to Fail and Punishment Seems to Work",
  description: "After praise, performance often drops; after a scolding, it often improves. The cause is usually not the praise or the scolding, but a statistical pattern called regression to the mean.",
  category: "psychology",
  readingTime: 6,
  date: "2026-11-23",
  file: "article-praise-punishment-illusion.html",
  featured: false,
  keywords: ["regression to the mean", "praise", "punishment", "Kahneman", "flight instructors", "parenting", "teaching", "management", "evil eye", "spanking", "statistics"],
  related: ["placebo", "base-rates", "survivorship-bias"]
},
      {
  id: "doorway-effect",
  title: "The Doorway Effect: Why You Forget What You Came In For",
  description: "You walk into a room and forget why you came. Research suggests doorways can act like chapter breaks for memory, though the effect is smaller and more fragile than the headlines claim.",
  category: "psychology",
  readingTime: 6,
  date: "2026-11-21",
  file: "article-doorway-effect.html",
  featured: false,
  keywords: ["doorway effect", "forgetting", "memory", "event segmentation", "event boundaries", "prospective memory", "context-dependent memory", "Radvansky", "working memory", "absent-mindedness"],
  related: ["memory", "learning", "replication-crisis"]
},
      {
  id: "inside-the-earth",
  title: "How We Know What’s Inside the Earth Without Ever Going There",
  description: "The deepest hole ever drilled barely scratches the crust. So how do we know Earth has a liquid outer core and a solid inner one? The answer came from earthquakes, and from Inge Lehmann.",
  category: "discoveries",
  readingTime: 7,
  date: "2026-11-19",
  file: "article-inside-the-earth.html",
  featured: false,
  keywords: ["Inge Lehmann", "inner core", "Earth's core", "seismology", "earthquakes", "seismic waves", "shadow zone", "Moho", "Kola borehole", "geophysics"],
  related: ["clair-patterson-lead", "occams-razor", "h-pylori"]
},
      {
  id: "grapefruit-problem",
  title: "The Grapefruit Problem: How a Breakfast Fruit Changes Your Medicine",
  description: "In 1989, grapefruit juice used to disguise alcohol in a drug study turned out to make the drug far stronger. How one fruit can change dozens of medicines, and which citrus to watch.",
  category: "medicine",
  readingTime: 7,
  date: "2026-11-19",
  file: "article-grapefruit-problem.html",
  featured: false,
  keywords: ["grapefruit", "drug interactions", "CYP3A4", "furanocoumarins", "pomelo", "chakotra", "statins", "simvastatin", "felodipine", "David Bailey"],
  related: ["medicine-timing", "dose-for-men", "clair-patterson-lead"]
},
      {
  id: "household-superstitions",
  title: "Don’t Sweep After Sunset: The Logic Behind Household Superstitions",
  description: "No sweeping after dark, no cutting nails at night, no hair washing on certain days, and beware the black cat. Where these rules came from, which have a practical core, and why we keep them.",
  category: "myths",
  readingTime: 7,
  date: "2026-11-17",
  file: "article-household-superstitions.html",
  featured: false,
  keywords: ["superstitions", "sweeping after sunset", "Lakshmi", "cutting nails at night", "hair washing days", "black cat", "bad luck", "Skinner pigeons", "Indian beliefs", "rituals"],
  related: ["period-myths", "daily-bath", "intelligent-false-beliefs"]
},
      {
  id: "clair-patterson-lead",
  title: "The Man Who Dated the Earth and Found the Poison in Our Air",
  description: "Clair Patterson set out to measure the age of the Earth. The lead contaminating his lab led him to a poison the whole world was breathing, and a long fight to end leaded petrol.",
  category: "discoveries",
  readingTime: 7,
  date: "2026-11-15",
  file: "article-clair-patterson-lead.html",
  featured: false,
  keywords: ["Clair Patterson", "age of the Earth", "leaded petrol", "tetraethyl lead", "lead poisoning", "clean room", "ice cores", "Robert Kehoe", "Needleman", "environmental health"],
  related: ["h-pylori", "dose-for-men", "replication-crisis"]
},
      {
  id: "dose-for-men",
  title: "Why the Dose on the Box Was Set for Men",
  description: "For decades, medicines were tested mainly on men and male animals. A sleeping pill’s halved dose for women shows what that cost, and how research is slowly changing.",
  category: "medicine",
  readingTime: 7,
  date: "2026-11-13",
  file: "article-dose-for-men.html",
  featured: false,
  keywords: ["sex differences", "women in clinical trials", "zolpidem", "Ambien", "drug dosing", "side effects", "pharmacokinetics", "aspirin", "gender bias", "adverse drug reactions"],
  related: ["medicine-timing", "placebo", "replication-crisis"]
},
      {
  id: "perfect-routine",
  title: "The Myth of the Perfect Routine: Why Flexible Beats Flawless",
  description: "The ideal daily routine is a popular fantasy. Research on body clocks, broken streaks, perfectionism and flexible habits suggests a better approach.",
  category: "growth",
  readingTime: 7,
  date: "2026-11-11",
  file: "article-perfect-routine.html",
  featured: false,
  keywords: ["routine", "morning routine", "perfectionism", "habits", "streaks", "chronotype", "social jetlag", "planning fallacy", "consistency", "productivity"],
  related: ["motivation-unreliable", "spotlight-effect", "survivorship-bias"]
},
   {
  id: "spotlight-effect",
  title: "The Spotlight Effect: Everyone Is Not Watching You",
  description: "We overestimate how much others notice our appearance, mistakes and behaviour. The research on the spotlight effect, the illusion of transparency and the imaginary audience.",
  category: "psychology",
  readingTime: 6,
  date: "2026-11-09",
  file: "article-spotlight-effect.html",
  featured: false,
  keywords: ["spotlight effect", "illusion of transparency", "imaginary audience", "self-consciousness", "social anxiety", "Barry Manilow", "egocentrism", "embarrassment"],
  related: ["intelligent-false-beliefs", "memory", "motivation-unreliable"]
},
   {
  id: "occams-razor",
  title: "Occam’s Razor: Is the Simplest Explanation Always Best?",
  description: "Occam’s razor is a useful guide, not a law. A look at where the idea came from, why statisticians can justify it, and when a simple explanation misleads.",
  category: "philosophy",
  readingTime: 7,
  date: "2026-11-07",
  file: "article-occams-razor.html",
  featured: false,
  keywords: ["occam's razor", "ockham's razor", "parsimony", "Bayesian inference", "AIC", "model selection", "Hickam's dictum", "simplicity"],
  related: ["base-rates", "survivorship-bias", "replication-crisis"]
},
   {
  id: "period-myths",
  title: "Period Myths: What Our Elders Swore By, and What Holds Up",
  description: "Some period myths are harmless nonsense. Some have caused real restriction and shame. A few turn out to be partly true, which is what makes them hard to shake.",
  category: "myths",
  readingTime: 7,
  date: "2026-11-05",
  file: "article-period-myths.html",
  featured: false,
  keywords: ["periods", "menstruation", "menstrual myths", "synchronised cycles", "tampons", "virginity", "exercise", "swimming", "PMS", "PMDD", "taboo"],
  related: ["daily-bath", "memory", "base-rates"]
},
   {
  id: "replication-crisis",
  title: "The Replication Crisis: When Scientific Findings Don’t Hold Up",
  description: "Many published findings fail when other teams repeat them. A look at the evidence from psychology, cancer biology and social science, and why it matters.",
  category: "discoveries",
  readingTime: 7,
  date: "2026-11-03",
  file: "article-replication-crisis.html",
  featured: false,
  keywords: ["replication crisis", "reproducibility", "open science collaboration", "cancer biology", "p-hacking", "publication bias", "Ioannidis", "meta-science"],
  related: ["base-rates", "goodhart", "survivorship-bias"]
},
   {
  id: "medicine-timing",
  title: "Does the Time You Take a Medicine Matter?",
  description: "For some drugs, the hour of the day changes how well they work and how much harm they cause. For others, the question turns out to be much less important than the headlines suggest.",
  category: "medicine",
  readingTime: 7,
  date: "2026-11-01",
  file: "article-does-timing-of-medicine-matter.html",
  featured: false,
  keywords: ["chronopharmacology", "chronotherapy", "blood pressure", "bedtime dosing", "statins", "chemotherapy", "circadian rhythm", "Hygia"],
  related: ["placebo", "base-rates", "goodhart"]
},
   {
  id: "motivation-unreliable",
  title: "Why Motivation Is an Unreliable Strategy",
  description: "Waiting to feel motivated is a poor plan. Research on the intention-behaviour gap, implementation intentions, rewards and habits suggests what works better.",
  category: "growth",
  readingTime: 8,
  date: "2026-10-30",
  file: "article-why-motivation-is-unreliable.html",
  featured: false,
  keywords: ["motivation", "intention-behaviour gap", "implementation intentions", "habits", "rewards", "self-control", "behaviour change", "productivity"],
  related: ["learning", "goodhart", "survivorship-bias"]
},
     {
    id: "religion-and-geography",
    title: "Where Gods Live: How Geography Shaped Religion",
    description: "Religions did not appear at random. The land, rivers, climate and neighbours around a people helped shape what they believed, and the pattern still follows the map.",
    category: "society",
    readingTime: 5,
    date: "2026-10-28",
    file: "article-religion-and-geography.html",
    featured: false,
    keywords: ["religion", "geography", "agriculture", "big gods", "Göbekli Tepe", "silk road", "buddhism", "islam", "christianity", "hinduism", "culture"],
    related: ["born-unfinished", "goodhart", "h-pylori"]
  },
   {
  id: "survivorship-bias",
  title: "Survivorship Bias: The Success Stories You Never Hear About",
  description: "We learn from the winners we can see. The people who tried the same thing and quietly disappeared are missing from the lesson.",
  category: "philosophy",
  readingTime: 8,
  date: "2026-10-25",
  file: "article-survivorship-bias.html",
  featured: false,
  keywords: ["survivorship bias", "survivor bias", "Abraham Wald", "bombers", "mutual funds", "dropouts", "success stories", "base rates"],
  related: ["base-rates", "goodhart", "memory"]
},
   {
  id: "intelligent-false-beliefs",
  title: "Why Intelligent People Believe Things That Aren’t True",
  description: "Intelligence does not reliably protect us from false beliefs. Research suggests clever reasoning can defend a conclusion we already wanted, and that analytic habits matter more than raw IQ.",
  category: "psychology",
  readingTime: 9,
  date: "2026-10-23",
  file: "article-why-smart-people-believe-false-things.html",
  featured: false,
  keywords: ["bias blind spot", "myside bias", "motivated reasoning", "motivated numeracy", "cognitive reflection", "fake news", "intelligence", "critical thinking"],
  related: ["memory", "base-rates", "learning"]
},
     {
    id: "daily-bath",
    title: "Do We Really Need to Bathe Every Day?",
    description: "Our elders insisted on a daily bath. The science says they were right, but mostly about certain parts of the body and certain kinds of weather.",
    category: "myths",
    readingTime: 5,
    date: "2026-10-21",
    file: "article-daily-bath.html",
    featured: false,
    keywords: ["bath", "bathing", "shower", "hygiene", "body odour", "sweat", "soap", "skin barrier", "eczema", "ringworm", "handwashing", "myths"],
    related: []
  },
     {
    id: "born-unfinished",
    title: "Born Unfinished: Why Human Babies Can’t Hold Up Their Heads",
    description: "A foal stands within hours of birth; a human baby needs months to hold up its head. The answer runs through our hips, our brains and our mothers’ energy budgets.",
    category: "society",
    readingTime: 10,
    date: "2026-10-19",
    file: "article-born-unfinished.html",
    featured: false,
    keywords: ["evolution", "bipedalism", "pelvis", "childbirth", "obstetric dilemma", "newborn", "brain development", "pregnancy", "gestation", "altricial", "anthropology"],
    related: ["h-pylori", "learning", "memory"]
  },
  {
    id: "placebo",                          // a short unique name, no spaces
    title: "The Placebo Puzzle: What Sugar Pills Can (and Can’t) Do",
    description: "Placebos are often described as mind over matter. The real story is stranger, more limited and more interesting.",
    category: "medicine",                   // one of the topic slugs above
    readingTime: 6,                         // minutes
    date: "2026-10-18",                     // YYYY-MM-DD
    file: "article-placebo.html",           // the article's file name
    featured: false,                         // true = show on homepage
    keywords: ["placebo", "nocebo", "clinical trials", "pain", "expectation", "asthma", "naloxone", "pharmacology"],
    related: ["base-rates", "memory", "goodhart"]   // ids of related articles
  },
  {
    id: "h-pylori",
    title: "The Bacterium in the Stomach: How Ulcers Stopped Being About Stress",
    description: "How two researchers linked stomach ulcers to a bacterium, and why the popular version of the story is only half right.",
    category: "discoveries",
    readingTime: 5,
    date: "2026-10-15",
    file: "article-stomach-bacterium.html",
    featured: false,
    keywords: ["helicobacter pylori", "h. pylori", "ulcer", "stomach", "nobel prize", "scientific consensus", "antibiotics", "history of medicine"],
    related: ["base-rates", "placebo", "goodhart"]
  },
  {
    id: "memory",
    title: "Your Memory Is a Storyteller, Not a Video Camera",
    description: "Remembering is less like replaying a recording and more like rebuilding a scene from fragments, every single time.",
    category: "psychology",
    readingTime: 5,
    date: "2026-10-12",
    file: "article-memory-storyteller.html",
    featured: false,
    keywords: ["memory", "false memories", "eyewitness", "loftus", "reconsolidation", "brain", "recall"],
    related: ["learning", "placebo", "base-rates"]
  },
  {
    id: "base-rates",
    title: "Why a Positive Test Might Still Mean You’re Probably Fine",
    description: "A plain-English lesson in base rates, the most useful idea in probability that few of us are taught well.",
    category: "philosophy",
    readingTime: 6,
    date: "2026-10-09",
    file: "article-base-rates.html",
    featured: false,
    keywords: ["bayes", "probability", "base rate", "screening", "diagnostic tests", "false positive", "statistics", "reasoning"],
    related: ["placebo", "h-pylori", "memory"]
  },
  {
    id: "goodhart",
    title: "When a Measure Becomes a Target",
    description: "From colonial rat bounties to heart-rhythm drugs: why chasing a good number can produce a bad outcome.",
    category: "society",
    readingTime: 5,
    date: "2026-10-06",
    file: "article-goodhart.html",
    featured: false,
    keywords: ["goodhart", "incentives", "economics", "targets", "surrogate endpoints", "cast trial", "history", "metrics"],
    related: ["learning", "placebo", "h-pylori"]
  },
  {
    id: "learning",
    title: "Forgetting Is Not the Enemy: The Science of Learning That Lasts",
    description: "Rereading feels productive and testing yourself feels frustrating. The research suggests those feelings have it backwards.",
    category: "growth",
    readingTime: 5,
    date: "2026-10-03",
    file: "article-learning-that-lasts.html",
    featured: false,
    keywords: ["study", "learning", "memory", "spaced repetition", "retrieval practice", "forgetting curve", "productivity", "exams", "flashcards"],
    related: ["memory", "goodhart", "base-rates"]
  }
];
