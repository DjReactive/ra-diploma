import { ComponentImporter } from './ComponentImporter'
const {
  Main, Catalog, Contacts, About, PageNotFound, ProductFull, Cart,
} = ComponentImporter;

export const RouterTree = [
  {
    dir: '/',
    element: <Main />
  },
  {
    dir: '/catalog',
    element: <Catalog />
  },
  {
    dir: '/cart',
    element: <Cart />
  },
  {
    dir: '/products/:id',
    element: <ProductFull />
  },
  {
    dir: '/contacts',
    element: <Contacts />
  },
  {
    dir: '/about',
    element: <About />
  },
  {
    dir: '*',
    element: <PageNotFound />
  },
];
