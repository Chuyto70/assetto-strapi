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

    const knex = strapi.db.connection;
    const transaction = await knex.transaction();

    try {
      const updateQuery = transaction('components_products_sizes').where('id', sizeId);
      
      if (data.hasOwnProperty('quantity')) {
        const { quantity } = await transaction('components_products_sizes').select('quantity').where({ id: sizeId }).first();
        const dataQty = data['quantity'];
        updateQuery.andWhere('quantity', '>', -1);
        if ((quantity + dataQty) < 0) throw new ApplicationError('You cannot go under 0 for the quantity');
        if (dataQty < 0) updateQuery.andWhere('quantity', '>=', dataQty);
        data['quantity'] = quantity + dataQty;
      }

      await updateQuery.update(data);
      await transaction.commit();
      return await strapi.query('products.sizes').findOne({
        where: { id: sizeId },
        select: Object.keys(data)
      });
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError('Something went wrong while updating product-size service', { error });
    }
  },
}));