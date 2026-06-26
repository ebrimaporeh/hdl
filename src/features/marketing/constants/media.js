// Curated, verified laboratory & diagnostic imagery (Unsplash CDN).
// Each base ID was checked to resolve (HTTP 200) and visually confirmed to
// depict a relevant lab/medical scene. URLs are built on demand with the
// `img()` helper so we request only the size each context needs.

const UNSPLASH = 'https://images.unsplash.com/photo-'

/**
 * Build an optimized Unsplash URL.
 * @param {string} id   Unsplash photo id (without the `photo-` prefix)
 * @param {object} opts { w, h, q } — width, optional height (enables crop), quality
 */
export function img(id, { w = 1200, h, q = 70 } = {}) {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) })
  if (h) params.set('h', String(h))
  return `${UNSPLASH}${id}?${params.toString()}`
}

// Named scenes — referenced across the marketing pages.
export const MEDIA = {
  labRoom: { id: '1579154204601-01588f351e67', alt: 'Modern diagnostic laboratory with analytical equipment' },
  pinkPipette: { id: '1532187863486-abf9dbad1b69', alt: 'Technician pipetting a sample into a vial rack' },
  microscope: { id: '1614308457932-e16d85c5d053', alt: 'Laboratory microscope on a workbench' },
  technician: { id: '1583911860205-72f8ac8ddcbe', alt: 'Laboratory scientist analysing samples at a bench' },
  glovedPipette: { id: '1579165466949-3180a3d056d5', alt: 'Gloved hand using a micropipette' },
  cells: { id: '1576086213369-97a306d36557', alt: 'Fluorescent microscopy of stained cells' },
  goggles: { id: '1581093588401-fbb62a02f120', alt: 'Scientist wearing protective safety goggles' },
  sampleCollection: { id: '1612277795421-9bc7706a4a34', alt: 'Healthcare worker collecting a patient sample' },
  staff: { id: '1622253692010-333f2da6031d', alt: 'Friendly healthcare professional' },
}

// Service category → hero image used on the service cards.
export const CATEGORY_IMAGES = {
  Chemistry: MEDIA.pinkPipette,
  Hematology: MEDIA.sampleCollection,
  Immunology: MEDIA.goggles,
  Toxicology: MEDIA.glovedPipette,
  Cytology: MEDIA.cells,
}

// Resolve the best image for a service: its own `image` id if set, otherwise
// the category default, otherwise a generic lab scene. Returns { id, alt }.
export function serviceImage(testType) {
  if (testType?.image) return { id: testType.image, alt: testType.name ?? 'Laboratory test' }
  return CATEGORY_IMAGES[testType?.category] ?? MEDIA.labRoom
}
