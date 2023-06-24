/**
 * product-size router
 */

const routes = [
  {
    method: 'PUT',
    path: '/products/:productId/sizes/:sizeId',
    handler: 'product-size.updateSize',
    config: {
      policies: [],
    },
  },
];

export default { routes };