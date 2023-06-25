export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => {
      const updateProductSize = nexus.extendType({
        type: 'Mutation',
        definition(t) {
          // "update" query definition
          t.field('updateProductSize', {
            // Response type
            type: nexus.nonNull('ComponentProductsSizes'),

            // Args definition
            args: { id: nexus.nonNull('ID'), data: nexus.nonNull('ComponentProductsSizesInput') },

            // Resolver definition
            resolve(parent, args, context) {
              const { id, data } = args;
              return strapi.service('api::product.product-size').update(id, data);
            }
          });
        }
      });

      return {
        types: [updateProductSize],
        resolversConfig: {
          'Mutation.updateProductSize': {
            auth: {
              scope: ['api::product.product-size.update']
            }
          }
        }
      };
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
