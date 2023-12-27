export const allProducts = [
  {
    id: 1,
    name: 'Corsa Classic White Navy',
    slug: 'corsa-classic-white-navy',
    hot: true,
    featured: true,
    price: 428000,
    description:
      'Menjadi sepatu “lifestyle” yang memberikan kesan klasik dengan menggunakan kombinasi material yang breathable dengan semi suede yang bikin adem dan outsole barunya dengan teknologi phylon rubber yang ringan, kenyal dan empuk namun tetap anti slip saat digunakan membuat sneakers ini sangat nyaman dan enak dipakai seharian.',
    thumbnail: '/products/classic-1.webp',
    gallery: [
      '/products/classic-1.webp',
      '/products/classic-2.webp',
      '/products/classic-3.webp',
      '/products/classic-4.webp',
      '/products/classic-5.webp',
    ],
  },
  {
    id: 2,
    name: 'Corsa Classic Black White',
    slug: 'corsa-classic-black-white',
    hot: false,
    featured: true,
    price: 398000,
    description:
      'Menjadi sepatu “lifestyle” yang memberikan kesan klasik dengan menggunakan kombinasi material yang breathable dengan semi suede yang bikin adem dan outsole barunya dengan teknologi phylon rubber yang ringan, kenyal dan empuk namun tetap anti slip saat digunakan membuat sneakers ini sangat nyaman dan enak dipakai seharian.',
    thumbnail: '/products/corsa-1.webp',
    gallery: [
      '/products/corsa-1.webp',
      '/products/corsa-2.webp',
      '/products/corsa-3.webp',
      '/products/corsa-4.webp',
      '/products/corsa-5.webp',
    ],
  },
  {
    id: 3,
    name: 'Corte Mid Full Black',
    slug: 'corte-mid-full-black',
    hot: true,
    featured: true,
    price: 297000,
    description:
      'Menjadi sepatu “lifestyle” yang memberikan kesan klasik dengan menggunakan kombinasi material yang breathable dengan semi suede yang bikin adem dan outsole barunya dengan teknologi phylon rubber yang ringan, kenyal dan empuk namun tetap anti slip saat digunakan membuat sneakers ini sangat nyaman dan enak dipakai seharian.',
    thumbnail: '/products/corte-1.webp',
    gallery: [
      '/products/corte-1.webp',
      '/products/corte-2.webp',
      '/products/corte-3.webp',
      '/products/corte-4.webp',
      '/products/corte-5.webp',
    ],
  },
  {
    id: 4,
    name: 'Corte Jog Full White GS',
    slug: 'corte-jog-full-white-gs',
    hot: false,
    featured: true,
    price: 375000,
    description:
      'Menjadi sepatu “lifestyle” yang memberikan kesan klasik dengan menggunakan kombinasi material yang breathable dengan semi suede yang bikin adem dan outsole barunya dengan teknologi phylon rubber yang ringan, kenyal dan empuk namun tetap anti slip saat digunakan membuat sneakers ini sangat nyaman dan enak dipakai seharian.',
    thumbnail: '/products/white-1.webp',
    gallery: [
      '/products/white-1.webp',
      '/products/white-2.webp',
      '/products/white-3.webp',
      '/products/white-4.webp',
      '/products/white-5.webp',
    ],
  },
]

export function featuredProducts() {
  return allProducts.filter((product) => product.featured)
}