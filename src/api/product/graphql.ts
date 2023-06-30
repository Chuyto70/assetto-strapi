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

            // "updateMany" query definition
            t.field('updateManyProductSize', {
                // Response type
                type: nexus.list(nexus.nonNull('ComponentProductsSizes')),

                // Args definition
                args: { ids: nexus.list(nexus.nonNull('ID')), datas: nexus.list(nexus.nonNull('ComponentProductsSizesInput')) },

                // Resolver definition
                resolve(parent, args, context) {
                    const { ids, datas } = args;
                    return strapi.service('api::product.product-size').updateMany(ids, datas);
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
            },
            'Mutation.updateManyProductSize': {
                auth: {
                    scope: ['api::product.product-size.updateMany']
                }
            }
        }
    };
};