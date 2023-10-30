/**
 * game-request service
 */

import { factories } from '@strapi/strapi';
import { errors } from '@strapi/utils';

const { ApplicationError } = errors;

export default factories.createCoreService('api::game-request.game-request', ({ strapi }) => ({
    async upsert(data) {
        try {
            const existing = await strapi.entityService.findMany('api::game-request.game-request', {
                filters: {
                    email: data.email
                }
            });
            if (existing.length > 0) {
                const resData = await strapi.entityService.update('api::game-request.game-request', existing[0].id, { data });
                return resData;
            }
            const resData = await strapi.entityService.create('api::game-request.game-request', { data });
            return resData;
        } catch (error) {
            console.log(error);
            throw new ApplicationError('Something went wrong while updating game-request service', { error });
        }
    },
}));
