/**
 * product-size controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async update(ctx) {
    // Getting the size id from the url params
    const { sizeId } = ctx.params;
    if (!sizeId) return ctx.badRequest('Missing \"sizeId\" in the request params');
    // Getting the data to update from the request body
    const { data } = ctx.request.body;
    if (!data) return ctx.badRequest('Missing \"data\" payload in the request body');
    // Calling the custom service
    const update = await strapi.service('api::product.product-size').update(sizeId, data);
    // Sending the response
    ctx.send(update);
  }
}));
