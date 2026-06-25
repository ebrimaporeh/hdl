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
