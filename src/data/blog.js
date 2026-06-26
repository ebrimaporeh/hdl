// Seed blog content for HDL. In mock mode this is loaded into the mock DB so
// admins can add and edit posts; a real backend would serve the same shape.
// `body` is an array of blocks rendered by the blog detail page:
//   { type: 'paragraph', text }            — a paragraph
//   { type: 'heading', text }              — a section heading
//   { type: 'list', items: [] }            — a bulleted list
export const blogPosts = [
  {
    id: 'understanding-blood-sugar',
    slug: 'understanding-your-blood-sugar-results',
    title: 'Understanding Your Blood Sugar Results',
    excerpt:
      'Fasting glucose, random glucose and HbA1c each tell a different part of the story. Here is what your numbers actually mean.',
    category: 'Health Tips',
    author: 'HDL Clinical Team',
    image: '1532187863486-abf9dbad1b69',
    readTime: '5 min read',
    publishedAt: '2026-05-12',
    body: [
      {
        type: 'paragraph',
        text: 'Blood sugar testing is one of the most common reasons people visit the lab — but the results can be confusing. A single number rarely tells the whole story, which is why your report may include several different measurements.',
      },
      { type: 'heading', text: 'Fasting vs. random glucose' },
      {
        type: 'paragraph',
        text: 'A fasting blood glucose test is taken after 8–12 hours without food, giving a clean baseline of how your body manages sugar at rest. A random glucose test can be taken at any time and is useful for spotting very high levels quickly.',
      },
      { type: 'heading', text: 'Why HbA1c matters' },
      {
        type: 'paragraph',
        text: 'HbA1c reflects your average blood sugar over the past two to three months, so it is less affected by what you ate this morning. It is the standard measure for diagnosing and monitoring diabetes.',
      },
      {
        type: 'list',
        items: [
          'Fast for 8–12 hours before a fasting glucose test (water is fine).',
          'Bring a list of any medication you take regularly.',
          'Discuss results with your doctor — one reading is a snapshot, not a diagnosis.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your results fall outside the reference range, do not panic. Talk to your doctor, who can interpret them alongside your symptoms and history.',
      },
    ],
  },
  {
    id: 'why-fasting-matters',
    slug: 'why-fasting-matters-before-a-blood-test',
    title: 'Why Fasting Matters Before a Blood Test',
    excerpt:
      'Some tests need an empty stomach to be accurate. Here is which ones, why, and how to prepare without the stress.',
    category: 'Lab Guide',
    author: 'HDL Clinical Team',
    image: '1579165466949-3180a3d056d5',
    readTime: '4 min read',
    publishedAt: '2026-04-28',
    body: [
      {
        type: 'paragraph',
        text: 'For certain blood tests, eating beforehand can change your results — sometimes enough to affect how your doctor reads them. That is why we ask you to fast before tests like the lipid profile and fasting glucose.',
      },
      { type: 'heading', text: 'What “fasting” really means' },
      {
        type: 'paragraph',
        text: 'Fasting usually means no food or drink other than water for 8–12 hours. Plain water is not only allowed, it is encouraged — staying hydrated makes your sample easier to collect.',
      },
      {
        type: 'list',
        items: [
          'Avoid food, juice, coffee and tea during the fasting window.',
          'Keep drinking water as normal.',
          'Take prescribed medication unless your doctor says otherwise.',
          'Book a morning appointment so you fast overnight while you sleep.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Not every test needs fasting. A full blood count, for example, can be done at any time. If you are unsure, ask us when you book — we will tell you exactly how to prepare.',
      },
    ],
  },
  {
    id: 'sickle-cell-screening',
    slug: 'sickle-cell-screening-what-couples-should-know',
    title: 'Sickle Cell Screening: What Couples Should Know',
    excerpt:
      'Knowing your haemoglobin genotype before starting a family is one of the most powerful preventive steps you can take.',
    category: 'Awareness',
    author: 'HDL Clinical Team',
    image: '1576086213369-97a306d36557',
    readTime: '6 min read',
    publishedAt: '2026-04-09',
    body: [
      {
        type: 'paragraph',
        text: 'Sickle cell disease is inherited, which means it is passed from parents to children through their genes. A simple blood test can tell you your haemoglobin genotype — and that knowledge can shape important decisions.',
      },
      { type: 'heading', text: 'What the genotypes mean' },
      {
        type: 'list',
        items: [
          'AA — normal haemoglobin, no sickle cell gene.',
          'AS — sickle cell trait; healthy carrier.',
          'SS — sickle cell disease.',
          'AC / SC — other haemoglobin variants that can also affect health.',
        ],
      },
      { type: 'heading', text: 'Why test before starting a family' },
      {
        type: 'paragraph',
        text: 'If both partners carry the sickle cell gene (for example, both AS), there is a one-in-four chance with each pregnancy of a child with sickle cell disease. Knowing this early lets couples plan and seek counselling.',
      },
      {
        type: 'paragraph',
        text: 'The test is quick, requires no fasting, and results are usually ready the same day. It is one of the most valuable screenings we offer.',
      },
    ],
  },
  {
    id: 'cervical-screening-guide',
    slug: 'a-simple-guide-to-cervical-screening',
    title: 'A Simple Guide to Cervical Screening (Pap Smear)',
    excerpt:
      'Cervical screening detects changes early, long before they could become serious. Here is what to expect and how to prepare.',
    category: 'Women’s Health',
    author: 'HDL Clinical Team',
    image: '1614308457932-e16d85c5d053',
    readTime: '5 min read',
    publishedAt: '2026-03-22',
    body: [
      {
        type: 'paragraph',
        text: 'A Pap smear is a quick screening test that checks the cells of the cervix for early changes. Caught early, these changes are highly treatable — which is why regular screening saves lives.',
      },
      { type: 'heading', text: 'How to prepare' },
      {
        type: 'list',
        items: [
          'Book the test when you are not menstruating, ideally mid-cycle.',
          'Avoid intercourse, douching or vaginal creams for 48 hours beforehand.',
          'Wear comfortable clothing and try to relax — the test takes only a few minutes.',
        ],
      },
      { type: 'heading', text: 'Understanding your report' },
      {
        type: 'paragraph',
        text: 'Results are reported using the international Bethesda system and reviewed by a clinical cytologist. Most results are normal; if any changes are found, your doctor will guide you on the next steps, which are often simple follow-up checks.',
      },
    ],
  },
]
