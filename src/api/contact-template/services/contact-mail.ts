/**
 * contact-mail service
 */

import { factories } from "@strapi/strapi";
import utils from '@strapi/utils';
import _ from "lodash";

const { ApplicationError } = utils.errors;


export default factories.createCoreService('api::contact-template.contact-template', ({ strapi }) => ({
  sendmail: async (locale, data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      const templates = await strapi.entityService.findMany('api::contact-template.contact-template', {
        fields: ['confirmation_email', 'contact_email', 'notification_email'],
        filters: {
          'locale': locale
        }
      });

      // Contact email
      strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: templates.notification_email,
          replyTo: data.email
        },
        templates.contact_email,
        {
          data: _.pick(data, ['name', 'email', 'subject', 'message']),
        }
      ).then(() => {
        strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
              to: data.email,
            },
            templates.confirmation_email,
            {
              data: _.pick(data, ['name', 'email', 'subject', 'message']),
            }
        ).catch(() => {});;
      }).catch(() => {});
      return;
    } catch (error) {
        throw new ApplicationError('Something went wrong while sending an email with contact-mail service', { error });  
    }
  },
}));
