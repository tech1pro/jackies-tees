import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageMeta({ title, description, robots }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    const baked = typeof __JT_SITE_ORIGIN__ !== 'undefined' ? __JT_SITE_ORIGIN__ : '';
    const base = (baked || import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const path = pathname === '/' ? '' : pathname;
    const canonicalUrl = `${base}${path}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const ogPairs = [
      ['og:title', title],
      ['og:description', description],
      ['og:type', 'website'],
      ['og:url', canonicalUrl],
    ];
    for (const [property, content] of ogPairs) {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    }

    if (robots) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', robots);
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, pathname, robots]);

  return null;
}
