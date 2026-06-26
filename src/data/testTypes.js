import { RESULT_TYPES } from '@/constants'

// Canonical lab test catalog, extracted field-for-field from the lab's real
// paper templates in forms_and_document_templates/. This is the single
// source of truth that drives test selection, the result-entry form, and
// the printed report layout.
export const testTypes = [
  {
    id: 'chemistry_panel',
    code: 'CHEM',
    name: 'Clinical Chemistry Panel',
    shortName: 'Chemistry Panel',
    category: 'Chemistry',
    sampleType: 'Serum',
    method: null,
    description: 'Glucose, lipid profile, renal function and liver function panel.',
    image: '1532187863486-abf9dbad1b69',
    overview:
      'A comprehensive blood chemistry profile that measures glucose control, cholesterol and fats, kidney function and liver health from a single draw — giving you and your doctor a broad snapshot of your metabolic health.',
    turnaround: 'Same day',
    fasting: true,
    preparation: [
      'Fast for 8–12 hours before your sample is taken (water is fine).',
      'Take your usual medication unless your doctor advises otherwise.',
      'Avoid alcohol for 24 hours before the test.',
    ],
    procedure: [
      'A small blood sample is drawn from a vein in your arm.',
      'The serum is separated and run on calibrated chemistry analysers.',
      'Results are checked against reference ranges and reviewed by a scientist before release.',
    ],
    whoFor:
      'Adults monitoring diabetes, cholesterol, kidney or liver health, and anyone due for a routine health check.',
    clinicalInfo:
      'Helps detect and monitor diabetes, cardiovascular risk, kidney disease and liver disorders early — often before symptoms appear.',
    resultType: RESULT_TYPES.PANEL,
    groups: [
      {
        group: 'Glucose',
        fields: [
          { key: 'fasting_glucose', label: 'Fasting Blood Glucose', unit: 'mmol/L', range: '3.3 - 6.5' },
          { key: 'random_glucose', label: 'Random Blood Glucose', unit: 'mmol/L', range: '< 11.0' },
          { key: 'hba1c', label: 'HbA1c', unit: '%', range: '4.5 - 6.5' },
        ],
      },
      {
        group: 'Lipid Profile',
        fields: [
          { key: 'cholesterol', label: 'Cholesterol', unit: 'mmol/L', range: '< 5.2' },
          { key: 'triglyceride', label: 'Triglyceride', unit: 'mmol/L', range: '≤ 2.30' },
          { key: 'hdl', label: 'HDL', unit: 'mmol/L', range: '≥ 1.56' },
          { key: 'ldl', label: 'LDL', unit: 'mmol/L', range: '< 3.3' },
        ],
      },
      {
        group: 'Renal Function Test',
        fields: [
          { key: 'urea', label: 'Urea', unit: 'mmol/L', range: '< 8.3' },
          { key: 'uric_acid', label: 'Uric Acid', unit: 'umol/L', range: { male: '200 - 420', female: '140 - 340' } },
          { key: 'creatinine', label: 'Creatinine', unit: 'umol/L', range: '< 90' },
        ],
      },
      {
        group: 'Liver Function Test',
        fields: [
          { key: 'alt', label: 'Alanine (ALT)', unit: 'U/L', range: { male: '< 41', female: '< 32' } },
          { key: 'ast', label: 'Aspartate (AST)', unit: 'U/L', range: { male: '< 40', female: '< 33' } },
          { key: 'bilirubin', label: 'Bilirubin', unit: 'umol/L', range: '8.5 - 20.4' },
          { key: 'alp', label: 'Alkaline Phosphatase', unit: 'U/L', range: '50 - 100' },
        ],
      },
    ],
    footnote: '*Low HDL CHO (higher risk for developing CHD); *High HDL CHO (Lower risk of developing CHD)',
  },

  {
    id: 'hematology_cbc',
    code: 'CBC',
    name: 'Hematology (Full Blood Count)',
    shortName: 'Hematology / CBC',
    category: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    method: null,
    description: 'Complete blood count panel.',
    image: '1612277795421-9bc7706a4a34',
    overview:
      'A full blood count measures the cells that make up your blood — red cells, white cells and platelets — to screen for anaemia, infection, clotting problems and many other conditions.',
    turnaround: 'Same day (1–2 hours)',
    fasting: false,
    preparation: [
      'No fasting or special preparation is required.',
      'Let us know about any medication that affects blood counts.',
    ],
    procedure: [
      'A small blood sample is collected into an EDTA tube.',
      'The sample is analysed on an automated haematology analyser.',
      'Abnormal results are reviewed on a blood film by a scientist.',
    ],
    whoFor:
      'Anyone feeling unusually tired or unwell, patients with suspected infection or anaemia, and routine check-ups.',
    clinicalInfo: 'Screens for anaemia, infection, inflammation, and disorders of blood and bone marrow.',
    resultType: RESULT_TYPES.FLAT_PANEL,
    fields: [
      { key: 'wbc', label: 'WBC', unit: 'X10³/µL', range: '4.0 - 10.0' },
      { key: 'lym_pct', label: 'LYM %', unit: '%', range: '20.0 - 40.0' },
      { key: 'mid_pct', label: 'MID %', unit: '%', range: '1.0 - 15.0' },
      { key: 'gran_pct', label: 'GRAN %', unit: '%', range: '50.0 - 70.0' },
      { key: 'lym_num', label: 'LYM #', unit: 'X10³/µL', range: '0.6 - 4.1' },
      { key: 'mid_num', label: 'MID #', unit: 'X10³/µL', range: '0.1 - 1.8' },
      { key: 'gran_num', label: 'GRAN #', unit: 'X10³/µL', range: '2.0 - 7.8' },
      { key: 'rbc', label: 'RBC', unit: 'X10³/µL', range: '3.50 - 5.50' },
      { key: 'hgb', label: 'HGB', unit: 'g/dL', range: '11.0 - 16.0' },
      { key: 'hct', label: 'HCT', unit: '%', range: '36.0 - 48.0' },
      { key: 'mcv', label: 'MCV', unit: 'fL', range: '80.0 - 99.0' },
      { key: 'mch', label: 'MCH', unit: 'pg', range: '26.0 - 32.0' },
      { key: 'mchc', label: 'MCHC', unit: 'g/dL', range: '32.0 - 36.0' },
      { key: 'rdwsd', label: 'RDWSD', unit: 'fL', range: '37.0 - 54.0' },
      { key: 'rdwcu', label: 'RDWCU', unit: '%', range: '11.5 - 14.5' },
      { key: 'plt', label: 'PLT', unit: 'X10³/µL', range: '100 - 300' },
      { key: 'mpv', label: 'MPV', unit: 'fL', range: '7.4 - 10.4' },
      { key: 'pdw', label: 'PDW', unit: '%', range: '10.0 - 17.0' },
      { key: 'pct', label: 'PCT', unit: '%', range: '0.10 - 0.28' },
      { key: 'plcr', label: 'P-LCR', unit: '%', range: '13.0 - 43.0' },
    ],
  },

  {
    id: 'hb_genotype',
    code: 'HBGT',
    name: 'Hemoglobin Genotype',
    shortName: 'Hb Genotype',
    category: 'Hematology',
    sampleType: 'EDTA Venous Blood',
    method: 'HemoTypeSC competitive lateral flow immunoassay',
    description: 'Hemoglobin variant (genotype) testing.',
    image: '1576086213369-97a306d36557',
    overview:
      'Identifies your haemoglobin type to detect sickle cell trait or disease and other haemoglobin variants — important for your own health and for family planning.',
    turnaround: 'Same day',
    fasting: false,
    preparation: [
      'No fasting required.',
      'If possible, avoid testing within 3 months of a blood transfusion.',
    ],
    procedure: [
      'A blood sample is collected into an EDTA tube.',
      'Haemoglobin variants are identified using a validated rapid immunoassay.',
      'The genotype is confirmed and approved by a biomedical scientist.',
    ],
    whoFor:
      'Couples planning a family, parents screening children, and anyone who wants to know their sickle cell status.',
    clinicalInfo:
      'Detects sickle cell trait (AS), sickle cell disease (SS) and haemoglobin C variants — key for prevention and counselling.',
    resultType: RESULT_TYPES.QUALITATIVE_LIST,
    options: ['Negative', 'Positive'],
    fields: [
      { key: 'aa', label: 'AA' },
      { key: 'as', label: 'AS' },
      { key: 'ac', label: 'AC' },
      { key: 'ss', label: 'SS' },
      { key: 'sc', label: 'SC' },
      { key: 'cc', label: 'CC' },
    ],
    conclusionFields: [
      { key: 'result', label: 'Result', type: 'text' },
      { key: 'tested_by', label: 'Tested by', type: 'text' },
      { key: 'approved_by', label: 'Approved by', type: 'text' },
    ],
  },

  {
    id: 'doa_screening',
    code: 'DOA',
    name: 'Drugs of Abuse (DOA) Screening',
    shortName: 'DOA Screening',
    category: 'Toxicology',
    sampleType: 'Urine',
    method: 'Chromatographic Immunoassay',
    description: 'Qualitative screening for 10 common drugs of abuse.',
    image: '1579165466949-3180a3d056d5',
    overview:
      'A rapid urine screen for ten common drugs of abuse, suitable for clinical, workplace and pre-employment screening, with confidential results.',
    turnaround: 'Same day (about 30 minutes)',
    fasting: false,
    preparation: [
      'No fasting required.',
      'Avoid passing urine for 1–2 hours before your appointment so a sample can be collected.',
      'Bring a valid ID if the test is for employment or legal purposes.',
    ],
    procedure: [
      'A fresh urine sample is collected in a sealed container.',
      'The sample is screened using a chromatographic immunoassay panel.',
      'Results are reviewed and reported confidentially.',
    ],
    whoFor: 'Employers, clinics and individuals needing confidential drug screening.',
    clinicalInfo:
      'Screens for opiates, cannabis, cocaine, amphetamines, benzodiazepines and more in a single test.',
    resultType: RESULT_TYPES.QUALITATIVE_LIST,
    options: ['Negative', 'Positive'],
    fields: [
      { key: 'opi', label: 'OPI', helpText: 'Opiates/Morphine' },
      { key: 'mdma', label: 'MDMA', helpText: 'Methylenedioxymethamphetamine (Ecstasy)' },
      { key: 'thc', label: 'THC', helpText: '9-tetracannabinol (Marijuana)' },
      { key: 'coc', label: 'COC', helpText: 'Cocaine' },
      { key: 'amp', label: 'AMP', helpText: 'Amphetamine' },
      { key: 'met', label: 'MET', helpText: 'Met-amphetamine' },
      { key: 'mtd', label: 'MTD', helpText: 'Metadone' },
      { key: 'tca', label: 'TCA', helpText: 'Tricyclic Antidepressants' },
      { key: 'bar', label: 'BAR', helpText: 'Barbiturates' },
      { key: 'benzo', label: 'BENZO', helpText: 'Benzodiazepines' },
    ],
  },

  {
    id: 'igra_tb',
    code: 'IGRA',
    name: 'TB Interferon Gamma Release Assay (IGRA)',
    shortName: 'IGRA (TB)',
    category: 'Immunology',
    sampleType: 'Plasma',
    method: 'WANTAI TB Interferon Gamma Release Assay',
    description: 'Quantitative TB infection screening (Wantai IGRA).',
    image: '1581093588401-fbb62a02f120',
    overview:
      'A modern blood test for tuberculosis infection that, unlike the skin test, is not affected by prior BCG vaccination — giving a clear, objective result.',
    turnaround: '2–3 working days',
    fasting: false,
    preparation: [
      'No fasting or special preparation is required.',
      'Let us know if you have had a recent TB skin test.',
    ],
    procedure: [
      'Blood is drawn into specialised IGRA collection tubes.',
      'Samples are incubated and the interferon-gamma response is measured.',
      'Results are interpreted against validated cut-offs by a scientist.',
    ],
    whoFor:
      'People screening for latent or active TB, healthcare and at-risk workers, and contacts of TB patients.',
    clinicalInfo:
      'Detects the immune response to Mycobacterium tuberculosis — useful for latent TB screening where BCG history complicates skin testing.',
    resultType: RESULT_TYPES.FLAT_PANEL,
    fields: [
      { key: 'test_tb', label: 'Test (TB1/TB2)', unit: 'pg/mL', range: '≤ 14' },
      { key: 'mitogen', label: 'Mitogen/Positive', unit: 'pg/mL', range: '> 400' },
      { key: 'nil', label: 'Nil/Null', unit: 'pg/mL', range: '≤ 400' },
    ],
    conclusionFields: [
      { key: 'final_result', label: 'Final Result', type: 'select', options: ['Positive', 'Negative', 'Indeterminate'] },
    ],
    // Reproduced verbatim from the lab's template for reference only — staff
    // always select the Final Result manually, this table is not auto-applied.
    interpretationTable: {
      columns: ['N', 'P-N', 'T-N', 'Result', 'Interpretation'],
      rows: [
        ['≤400', 'any value', '≥14 and ≥ N/4', 'Positive', 'Infected with Mycobacterium tuberculosis (active, latent or inapparent infection)'],
        ['≤400', '≥20', '<14', 'Negative', 'Not infected with Mycobacterium tuberculosis'],
        ['≤400', '≥20', '≥14 but < N/4', 'Negative', 'Not infected with Mycobacterium tuberculosis'],
        ['≤400', '<20', '<14', 'Indeterminate', 'Cannot determine whether Mycobacterium tuberculosis infection'],
        ['≤400', '<20', '≥14 but < N/4', 'Indeterminate', 'Cannot determine whether Mycobacterium tuberculosis infection'],
        ['>400', 'any value', 'any value', 'Indeterminate', 'Cannot determine whether Mycobacterium tuberculosis infection (invalid — N exceeds 400 pg/mL)'],
      ],
      footnote: "The concentration of Testing Culture Tube (T)=T, the concentration of Background control tube (N)=N, and the concentration of Positive control tube (P) = P (Unit=pg/mL). The Background Control Tube ('N') assesses the level of circulating IFN-γ or presence of heterophile antibodies. A valid test must generate an 'N' value of ≤400pg/mL.",
    },
  },

  {
    id: 'pap_smear',
    code: 'PAP',
    name: 'PAP Smear (Cervical Cytology)',
    shortName: 'PAP Smear',
    category: 'Cytology',
    sampleType: 'Conventional PAP Smear',
    method: 'Modified Bethesda System of Cervical Cytology Reporting',
    description: 'Cervical cytology screening, reported per the Bethesda system.',
    image: '1614308457932-e16d85c5d053',
    overview:
      'A cervical screening test that examines cells from the cervix to detect early changes long before they could develop into cancer, reported using the international Bethesda system.',
    turnaround: '3–5 working days',
    fasting: false,
    preparation: [
      'Schedule the test when you are not menstruating, ideally mid-cycle.',
      'Avoid intercourse, douching or vaginal creams for 48 hours beforehand.',
    ],
    procedure: [
      'A small sample of cervical cells is gently collected by a clinician.',
      'The smear is fixed, stained and examined under the microscope.',
      'A clinical cytologist screens the slide and issues a Bethesda-system report.',
    ],
    whoFor: 'Women aged 21–65, and earlier if advised, for routine cervical cancer screening.',
    clinicalInfo:
      'Detects pre-cancerous and cancerous cervical changes early, plus infections and reactive changes.',
    resultType: RESULT_TYPES.NARRATIVE,
    fields: [
      { key: 'specimen_adequacy', label: 'Specimen Adequacy' },
      { key: 'organisms', label: 'Organisms' },
      { key: 'reactive_changes', label: 'Reactive Changes' },
      { key: 'squamous_abnormalities', label: 'Squamous Abnormalities' },
      { key: 'glandular_abnormalities', label: 'Glandular Abnormalities' },
      { key: 'other_info', label: 'Other Relevant Information / Educational' },
    ],
    conclusionFields: [
      { key: 'screening_opinion', label: 'Screening Opinion', type: 'textarea' },
      {
        key: 'screened_by',
        label: 'Screened by',
        type: 'text',
        defaultValue: 'Malamin Barrow: FIBMS, DIP Immunology — Clinical Cytologist/Biomedical Scientist, HCPC(UK) REG# BS33943',
      },
    ],
  },
]

export function getTestTypeById(id) {
  return testTypes.find((t) => t.id === id)
}

export function getTestTypesByCategory() {
  const byCategory = {}
  for (const t of testTypes) {
    byCategory[t.category] ??= []
    byCategory[t.category].push(t)
  }
  return byCategory
}
