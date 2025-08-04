import { useHead } from '#imports';

export const useSeo = () => {
  const setPageMeta = (meta: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
  }) => {
    useHead({
      title: meta.title,
      meta: [
        meta.description ? { name: 'description', content: meta.description } : undefined,
        meta.keywords ? { name: 'keywords', content: meta.keywords } : undefined,
        meta.ogTitle ? { property: 'og:title', content: meta.ogTitle } : undefined,
        meta.ogDescription ? { property: 'og:description', content: meta.ogDescription } : undefined,
        meta.ogImage ? { property: 'og:image', content: meta.ogImage } : undefined,
      ].filter(Boolean),
      link: meta.canonical
        ? [{ rel: 'canonical', href: meta.canonical }]
        : [],
    });
  };

  return {
    setPageMeta
  };
}; 