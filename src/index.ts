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
          // "updateProductSize" query definition
          t.field('updateProductSize', {
            // Response type
            type: nexus.nonNull('ComponentProductsSizes'),

            // Args definition
            args: { id: nexus.nonNull('ID'), data: nexus.nonNull('ComponentProductsSizesInput') },

            // Resolver definition
            resolve(parent, args, context) {
              const { id, data } = args;
              
              return strapi.service('api::api-name.content-type-name').updateProductSize(id, data);
            }
          });
        }
      });

      return { types: [updateProductSize] };
    });
    
        // extensionService.use(({ strapi }) => ({
        //   typeDefs: `
        //     type Mutation {
        //       updateProductSize(id: ID!, data: ComponentProductsSizesInput!): ComponentProductsSizes
        //     }
        //   `,
        //   resolvers: {
        //     Mutation: {
        //       updateProductSize: {
        //         resolve: async (parent, args, context) => {
        //           const { toEntityResponse } = strapi.service(
        //             "plugin::graphql.format"
        //           ).returnTypes;
    
        //           const data = await strapi.services["api::article.article"].find({
        //             filters: { slug: args.slug },
        //           });
    
        //           const response = toEntityResponse(data.results[0]);
    
        //           console.log("##################", response, "##################");
    
        //           return response;
        //         },
        //       }
        //     }
        //   },
        // }));
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
