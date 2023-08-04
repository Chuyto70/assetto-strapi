/**
 * contact-mail router
 */

const routes = [
    {
        method: 'POST',
        path: '/contact-mail/:locale',
        handler: 'contact-mail.sendmail',
        config: {
            policies: [],
        }
    }
];
  
export default { routes };
  