// Service slugs
export type ServiceSlug =
  | 'media-coverage'
  | 'social-and-story'
  | 'brand-and-comms'
  | 'web-and-digital'
  | 'training-and-capacity'
  | 'creator-studio';

// Collage element types re-exported from the CollageElement component
// so there's one source of truth for which illustrations exist.
export type { CollageElementType } from '../components/ui/CollageElement';

// Service slug to icon mapping
const serviceIconMap: Record<ServiceSlug, string> = {
  'media-coverage': 'cinema-camera',
  'social-and-story': 'smartphone-vertical',
  'brand-and-comms': 'pantone-fan',
  'web-and-digital': 'monitor-timeline',
  'training-and-capacity': 'megaphone',
  'creator-studio': 'studio-mic',
};

export function getServiceIconType(slug: ServiceSlug): string {
  return serviceIconMap[slug] || 'cinema-camera';
}
