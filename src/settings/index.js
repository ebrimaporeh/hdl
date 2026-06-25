export const APP_SETTINGS = {
  branding: {
    name: 'Healthscreen Diagnostic Lab',
    shortName: 'HDL',
    legalName: 'Healthscreen Diagnostic Lab (HDL)',
    tagline: 'Your Partner in Medical Screening, Accurate Diagnosis, and Disease Prevention.',
    address: 'Kotu Manjai Highway, Opposite Kotu High School Junction, KMC, Gambia',
    phones: ['+220 3067228', '+220 701 8325'],
    email: 'healthscreendiagnostics@gmail.com',
  },

  api: {
    enabled: false,
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    mockDelay: [300, 700],
  },

  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },

  reportTypes: {
    categories: ['Chemistry', 'Hematology', 'Immunology', 'Toxicology', 'Cytology'],
  },

  services: {
    featured: ['chemistry_panel', 'hematology_cbc', 'hb_genotype', 'doa_screening', 'igra_tb', 'pap_smear'],
  },

  permissions: {
    // Scaffolded for future role granularity. v1 ships a single 'staff' role
    // with full admin-portal access — not enforced per-permission yet.
    staff: ['customers:manage', 'orders:manage', 'results:enter', 'reports:manage'],
  },
}
