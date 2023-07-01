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
      
      updateQuantity: if (data.hasOwnProperty('quantity')) {
        const { quantity } = await transaction('components_products_sizes').select('quantity').where({ id: sizeId }).first();
        const dataQty = data['quantity'];
        updateQuery.andWhere('quantity', '>', -1);
        if ((quantity + dataQty) < 0) {
          data['quantity'] = 0;
          break updateQuantity;
        }
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

  //Creating the updateMany custom service
  updateMany: async (sizeIds, datas = [{}]) => {

    const knex = strapi.db.connection;
    const transaction = await knex.transaction();

    try {
      let returning = [];
      for (let i = 0; i < sizeIds.length; i++){
        const updateQuery = transaction('components_products_sizes').where('id', sizeIds[i]);

        if (datas[i].hasOwnProperty('quantity')) {
          const { quantity } = await transaction('components_products_sizes').select('quantity').where({ id: sizeIds[i] }).first();
          const dataQty = datas[i]['quantity'];
          updateQuery.andWhere('quantity', '>', -1);
          if ((quantity + dataQty) < 0) continue;
          if (dataQty < 0) updateQuery.andWhere('quantity', '>=', dataQty);
          datas[i]['quantity'] = quantity + dataQty;
        }
  
        const res = await updateQuery.update(datas[i]).returning(Object.keys(datas[i]));
        returning = [...returning, ...res];
      }
      await transaction.commit();
      return returning;
    } catch (error) {
      await transaction.rollback();
      throw new ApplicationError('Something went wrong while updating product-size service', { error: error });
    }
  },
}));