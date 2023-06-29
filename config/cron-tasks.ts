export default {
    /**
     * Simple example.
     * Every day at 3am.
     */
    orderCheck: {
    task: async ({ strapi }) => {
        try {
          await strapi.service('api::order.order').clean();
        } catch (error) {
          console.log(`task error : ${error}`);
        }
      },
      options: {
        rule: "0 3 * * *",
      },
    },
  };