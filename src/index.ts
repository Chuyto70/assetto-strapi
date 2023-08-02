import graphql from "./graphql";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    graphql(strapi);

    // THIS IS A FIX FOR CONFIG/PLUGIN.TS NOT CHANGING MAIL PROVIDER
    strapi.config.set('plugin.email', {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      settings: {
        defaultFrom: process.env.SENDGRID_DEFAULT_FROM,
        defaultReplyTo: process.env.SENDGRID_DEFAULT_REPLY,
      }
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
