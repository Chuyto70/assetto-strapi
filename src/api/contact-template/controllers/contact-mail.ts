/**
 * A set of functions called "actions" for `contact-mail`
 */

import { factories } from '@strapi/strapi'
import _ from 'lodash';

export default factories.createCoreController('api::contact-template.contact-template', ({ strapi }) => ({
  async sendmail(ctx) {
    // Getting the size id from the url params
    const { locale } = ctx.params;
    if (!locale) return ctx.badRequest('Missing \"locale\" in the request params');
    // Getting the data to update from the request body
    const { data } = ctx.request.body;
    if (!data) return ctx.badRequest('Missing \"data\" payload in the request body');
    
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(data.email)) {
      return ctx.badRequest('\"email\" must be a valid email');
    }

    if (_.isEmpty(data.message) || _.isEmpty(data.subject) || _.isEmpty(data.name) || !_.isString(data.message) || !_.isString(data.subject) || !_.isString(data.name))
      return ctx.badRequest('some field of data are invalid');

    // Calling the custom service
    const sendmail = await strapi.service('api::contact-template.contact-mail').sendmail(locale, data);
    // Sending the response
    ctx.send(sendmail);
  },
}));
