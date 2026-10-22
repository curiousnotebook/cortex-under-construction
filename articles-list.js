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
