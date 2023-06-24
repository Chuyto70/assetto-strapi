/**
 * product-size service
 */

import { factories } from '@strapi/strapi';

// Create the default service
export default factories.createCoreService('api::product.product', ({ strapi }) => ({
    //Creating an entirely new custom service
    async updateSize(productId, sizeId, params) {
      // Finding the product by id
        const product = await strapi.entityService.findOne('api::product.product', productId, this.getFetchParams({ populate: ['sizes'] }));
        const sizeIdNumber = Number(sizeId);
        console.log(sizeIdNumber);
        console.log(product);
      // Checking if the product has the size to update
      if (product.sizes && product.sizes.some(size => size.id === sizeIdNumber)) {
        // Updating the size component by id
        //! Model components_products_sizes not found
        return await strapi.entityService.update('components_products_sizes', sizeId, {
          data: params
        });
      } else {
        // Throwing an error if the size is not found
        throw new Error('Size not found');
      }
    }
}));