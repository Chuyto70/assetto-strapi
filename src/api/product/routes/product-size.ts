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
];

export default { routes };