/**
 * product-size router
 */

const routes = [
  {
    method: 'PUT',
    path: '/product-size/:sizeId',
    handler: 'product-size.update',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/product-sizes/',
    handler: 'product-size.updateMany',
    config: {
      policies: [],
    },
  },
];

export default { routes };