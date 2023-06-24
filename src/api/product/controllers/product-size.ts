/**
 * product-size controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async updateSize(ctx) {
    // Getting the product id and size id from the url params
    const { productId, sizeId } = ctx.params;
    // Getting the data to update from the request body
    const data = ctx.request.body;
    // Calling the custom service
    const updatedSize = await strapi.service('api::product.product-size').updateSize(productId, sizeId, data);
    // Sending the response
    ctx.send(updatedSize);
  }
}));
