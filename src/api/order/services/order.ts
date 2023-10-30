/**
 * order service
 */

import { factories } from '@strapi/strapi';
import utils from '@strapi/utils';
import Stripe from 'stripe';

const { ApplicationError } = utils.errors;

export default factories.createCoreService('api::order.order', ({ strapi }) => ({
    //Creating the cleaning custom service
    //This will remove unused order and release ressources
    clean: async () => {
        const setting = await strapi.entityService.findOne('api::setting.setting', 1, {
            fields: ['stripe_secret_key'],
        });
        try {
            const stripe = new Stripe(setting.stripe_secret_key, { apiVersion: '2022-11-15' });
            const todayMinus2Days = new Date();
            todayMinus2Days.setHours(todayMinus2Days.getHours() - 48);
            const entries = await strapi.entityService.findMany('api::order.order', {
                fields: ['payment_intent_id', 'status', 'products'],
                filters: {
                    $or: [
                        {
                        status: 'pending'
                        },
                        {
                        status: 'checkout'
                        }
                    ],
                    updatedAt: {
                        $lt: todayMinus2Days.toISOString()
                    }
                }
            });
            entries.forEach(async entrie => {
                if (entrie.status === 'pending' && entrie.payment_intent_id) {
                    //cancel order with stripe
                    //change status to canceled then restock the product
                    try {
                        const res = await stripe.paymentIntents.cancel(entrie.payment_intent_id, { cancellation_reason: 'abandoned' });
                        if (res.status === 'canceled') {
                            await strapi.entityService.update('api::order.order', entrie.id, {
                                data: {
                                    status: 'canceled',
                                }
                            });
                            entrie.products.forEach(async product => {
                                await strapi.service('api::product.product-size').update(product.sizeId, {
                                    quantity: product.qty
                                });
                            });
                        }
                    } catch (error) {
                        if (error.type === 'StripeInvalidRequestError') {
                            const status = error.raw.payment_intent?.status;
                            await strapi.entityService.update('api::order.order', entrie.id, {
                                data: {
                                    status,
                                }
                            });
                            if (status === 'canceled') {
                                entrie.products.forEach(async product => {
                                    await strapi.service('api::product.product-size').update(product.sizeId, {
                                        quantity: product.qty
                                    });
                                });
                            }
                        }
                    }
                } else if (entrie.status === 'checkout' && entrie.payment_intent_id) {
                    // cancel order with stripe
                    // delete the order entry
                    await stripe.paymentIntents.cancel(entrie.payment_intent_id, { cancellation_reason: 'abandoned' });
                    await strapi.entityService.delete('api::order.order', entrie.id);
                }
            });
        } catch (error) {
            throw new ApplicationError('Something went wrong while cleaning orders service', { error: error });
        }
    },
}));
