export const productSize = (strapi) => ({ nexus }) => {
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
};