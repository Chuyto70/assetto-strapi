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
        where: { id: sizeId },
        populate: {
          quantity: true
        }
      });
      if (data.hasOwnProperty('quantity')) {
        const dataQty = data['quantity'];
        const isPositive = dataQty >= 0;
        if ((size.quantity - (-dataQty)) < 0) throw new ApplicationError('You cannot go under 0 for the quantity');
        data['quantity'] = isPositive ? size.quantity + dataQty : size.quantity - (-dataQty);
      }
      
      return await strapi.query('products.sizes').update({
        where: { id: sizeId },
        data: data
      });
    } catch (error) {
      throw new ApplicationError('Something went wrong while updating product-size service', { error: error });
    }
  },
}));