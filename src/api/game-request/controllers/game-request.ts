/**
 * game-request controller
 */

import { factories } from '@strapi/strapi';
import { sanitize } from '@strapi/utils';

const { contentAPI } = sanitize;

type GameRequestAttributes = {
    id: number;
    email: string;
    game: string;
    createdAt: Date;
    updatedAt: Date;
};

export default factories.createCoreController('api::game-request.game-request', ({ strapi }) => ({
    async upsert(ctx) {
        const { data } = ctx.request.body;
        if (!data) return ctx.badRequest('Missing \"data\" payload in the request body');
        const contentType = strapi.contentType('api::game-request.game-request');
        const sanitizedInput = await contentAPI.input(data, contentType, ctx.state.auth);
        const response = await strapi.service('api::game-request.game-request').upsert(sanitizedInput);
        const sanitizedResults = await contentAPI.output(response, contentType, ctx.state.auth) as GameRequestAttributes;
        return {
            data: {
                id: sanitizedResults.id,
                attributes: {
                    email: sanitizedResults.email,
                    game: sanitizedResults.game,
                    createdAt: sanitizedResults.createdAt,
                    updatedAt: sanitizedResults.updatedAt
                }
            }
        };
    },
}));
