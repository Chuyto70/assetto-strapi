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
        return await strapi.query('products.sizes').update({
          where: { id: sizeId },
          data: data
        });
      } catch (error) {
        throw new ApplicationError('Something went wrong while updating product-size service', { error: error });
      }
    },
}));