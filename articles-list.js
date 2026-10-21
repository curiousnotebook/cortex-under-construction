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
  }
];


/* ---------- The articles ---------- */
const SITE_ARTICLES = [
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
