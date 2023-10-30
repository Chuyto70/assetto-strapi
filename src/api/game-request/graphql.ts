export const GameRequest = (strapi) => ({ nexus }) => {
    const upsert = nexus.extendType({
        type: 'Mutation',
        definition(t) {
            // "update" query definition
            t.field('upsertGameRequest', {
                // Response type
                type: 'GameRequestEntity',

                // Args definition
                args: { data: nexus.nonNull('GameRequestInput') },

                // Resolver definition
                resolve(parent, args, context) {
                    const { data } = args;
                    return strapi.service('api::game-request.game-request').upsert(data);
                }
            });
        }
    });

    return {
        types: [upsert],
        resolversConfig: {
            'Mutation.upsertGameRequest': {
                auth: {
                    scope: ['api::game-request.game-request.upsert']
                }
            }
        }
    };
};
