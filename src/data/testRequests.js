import { TEST_REQUEST_STATUS } from '@/constants'

// One TestRequest = one selected test for one Order. `values` holds the
// result-entry payload, keyed by the test type's field keys.
export const testRequests = [
  // Order 1 — Fatou Jallow — completed, both reported
  {
    id: 'tr_1',
    orderId: 'ord_1',
    customerId: 'cus_1',
    testTypeId: 'chemistry_panel',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      fasting_glucose: '5.1', random_glucose: '6.8', hba1c: '5.2',
      cholesterol: '4.8', triglyceride: '1.4', hdl: '1.6', ldl: '2.9',
      urea: '4.2', uric_acid: '260', creatinine: '70',
      alt: '22', ast: '21', bilirubin: '12.1', alp: '65',
    },
    updatedAt: '2026-06-10T15:00:00.000Z',
  },
  {
    id: 'tr_2',
    orderId: 'ord_1',
    customerId: 'cus_1',
    testTypeId: 'hematology_cbc',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      wbc: '6.8', lym_pct: '32', mid_pct: '6', gran_pct: '62',
      lym_num: '2.1', mid_num: '0.5', gran_num: '4.2',
      rbc: '4.6', hgb: '13.2', hct: '40', mcv: '88', mch: '29', mchc: '34',
      rdwsd: '42', rdwcu: '12.8', plt: '230', mpv: '8.6', pdw: '13', pct: '0.2', plcr: '28',
    },
    updatedAt: '2026-06-10T15:10:00.000Z',
  },

  // Order 2 — Lamin Ceesay — completed, reported
  {
    id: 'tr_3',
    orderId: 'ord_2',
    customerId: 'cus_2',
    testTypeId: 'doa_screening',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      opi: 'Negative', mdma: 'Negative', thc: 'Negative', coc: 'Negative', amp: 'Negative',
      met: 'Negative', mtd: 'Negative', tca: 'Negative', bar: 'Negative', benzo: 'Negative',
    },
    updatedAt: '2026-06-12T16:00:00.000Z',
  },

  // Order 3 — Awa Sanneh — in progress (started, not finished)
  {
    id: 'tr_4',
    orderId: 'ord_3',
    customerId: 'cus_3',
    testTypeId: 'hb_genotype',
    status: TEST_REQUEST_STATUS.IN_PROGRESS,
    values: {
      aa: 'Positive', as: 'Negative', ac: 'Negative', ss: 'Negative', sc: 'Negative', cc: 'Negative',
      result: '', tested_by: '', approved_by: '',
    },
    updatedAt: '2026-06-20T10:00:00.000Z',
  },

  // Order 4 — Ebrima Darboe — pending, not started
  {
    id: 'tr_5',
    orderId: 'ord_4',
    customerId: 'cus_4',
    testTypeId: 'igra_tb',
    status: TEST_REQUEST_STATUS.PENDING,
    values: {},
    updatedAt: '2026-06-24T14:00:00.000Z',
  },

  // Order 5 — Isatou Camara — completed, report still in draft
  {
    id: 'tr_6',
    orderId: 'ord_5',
    customerId: 'cus_5',
    testTypeId: 'pap_smear',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      specimen_adequacy: 'Satisfactory for evaluation',
      organisms: 'None identified',
      reactive_changes: 'None',
      squamous_abnormalities: 'None',
      glandular_abnormalities: 'None',
      other_info: '—',
      screening_opinion: 'Negative for intraepithelial lesion or malignancy (NILM).',
      screened_by: 'Malamin Barrow: FIBMS, DIP Immunology — Clinical Cytologist/Biomedical Scientist, HCPC(UK) REG# BS33943',
    },
    updatedAt: '2026-06-18T11:00:00.000Z',
  },

  // Order 6 — Modou Jallow — completed, reported, with one out-of-range flag
  {
    id: 'tr_7',
    orderId: 'ord_6',
    customerId: 'cus_6',
    testTypeId: 'chemistry_panel',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      fasting_glucose: '5.6', random_glucose: '12.4', hba1c: '5.9',
      cholesterol: '4.9', triglyceride: '1.8', hdl: '1.3', ldl: '3.1',
      urea: '5.0', uric_acid: '380', creatinine: '82',
      alt: '35', ast: '30', bilirubin: '15.0', alp: '70',
    },
    updatedAt: '2026-06-21T17:00:00.000Z',
  },

  // Order 7 — Fatou Jallow — second visit, completed, reported
  {
    id: 'tr_8',
    orderId: 'ord_7',
    customerId: 'cus_1',
    testTypeId: 'doa_screening',
    status: TEST_REQUEST_STATUS.COMPLETED,
    values: {
      opi: 'Negative', mdma: 'Negative', thc: 'Negative', coc: 'Negative', amp: 'Negative',
      met: 'Negative', mtd: 'Negative', tca: 'Negative', bar: 'Negative', benzo: 'Negative',
    },
    updatedAt: '2026-06-23T12:00:00.000Z',
  },

  // Order 8 — Mariama Bah — fresh walk-in, 3 tests all pending
  {
    id: 'tr_9',
    orderId: 'ord_8',
    customerId: 'cus_7',
    testTypeId: 'chemistry_panel',
    status: TEST_REQUEST_STATUS.PENDING,
    values: {},
    updatedAt: '2026-06-25T08:00:00.000Z',
  },
  {
    id: 'tr_10',
    orderId: 'ord_8',
    customerId: 'cus_7',
    testTypeId: 'hematology_cbc',
    status: TEST_REQUEST_STATUS.PENDING,
    values: {},
    updatedAt: '2026-06-25T08:00:00.000Z',
  },
  {
    id: 'tr_11',
    orderId: 'ord_8',
    customerId: 'cus_7',
    testTypeId: 'hb_genotype',
    status: TEST_REQUEST_STATUS.PENDING,
    values: {},
    updatedAt: '2026-06-25T08:00:00.000Z',
  },
]
