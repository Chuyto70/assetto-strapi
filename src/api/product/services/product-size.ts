/**
 * product-size service
 */

import { factories } from '@strapi/strapi';
import utils from '@strapi/utils';

const { ApplicationError } = utils.errors;

// Create the default service
export default factories.createCoreService('api::product.product', ({ strapi }) => ({
    //Creating the update custom service
  update: async (sizeId, data = {}) => {
    try {
      const size = await strapi.query('products.sizes').findOne({
        where: { id: sizeId }
      });
      if (data.hasOwnProperty('quantity')) {
        const dataQty = data['quantity'];
        if (size.quantity === -1) throw new ApplicationError('You cannot update an infinite quantity (update from the backend directly)');
        if ((size.quantity + dataQty) < 0) throw new ApplicationError('You cannot go under 0 for the quantity');
        data['quantity'] = size.quantity + dataQty;
      }
      
      return await strapi.query('products.sizes').update({
        where: { id: sizeId },
        data: data,
        select: Object.keys(data)
      });
    } catch (error) {
      throw new ApplicationError('Something went wrong while updating product-size service', { error: error });
    }
  },
}));