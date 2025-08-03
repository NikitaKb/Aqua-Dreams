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
    const { $head } = useNuxtApp();
    
    if (meta.title) {
      $head.title = meta.title;
    }
    
    if (meta.description) {
      $head.meta.push({
        name: 'description',
        content: meta.description
      });
    }
    
    if (meta.keywords) {
      $head.meta.push({
        name: 'keywords',
        content: meta.keywords
      });
    }
    
    if (meta.ogTitle) {
      $head.meta.push({
        property: 'og:title',
        content: meta.ogTitle
      });
    }
    
    if (meta.ogDescription) {
      $head.meta.push({
        property: 'og:description',
        content: meta.ogDescription
      });
    }
    
    if (meta.ogImage) {
      $head.meta.push({
        property: 'og:image',
        content: meta.ogImage
      });
    }
    
    if (meta.canonical) {
      $head.link.push({
        rel: 'canonical',
        href: meta.canonical
      });
    }
  };

  return {
    setPageMeta
  };
}; 