export const ContactMail = (strapi) => ({ nexus }) => {

    const sendContactMailDataType = nexus.inputObjectType({
        name: 'sendContactMailDataType',
        definition(t) {
          t.nonNull.string('name')
          t.nonNull.string('email')
          t.nonNull.string('subject')
          t.nonNull.string('message')
        }
    })

    const sendContactMail = nexus.extendType({
        type: 'Mutation',
        definition(t) {
            // "sendmail" query definition
            t.field('sendContactMail', {
                type: 'String',

                // Args definition
                args: {
                    locale: nexus.nonNull('I18NLocaleCode'), data: sendContactMailDataType
                },

                // Resolver definition
                resolve(parent, args, context) {
                    const { locale, data } = args;
                    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                    if (!emailRegex.test(data.email)) {
                        return context.badRequest('\"email\" must be a valid email');
                    }
                    return strapi.service('api::contact-template.contact-mail').sendmail(locale, data);
                }
            });
        }
    });


    return {
        types: [sendContactMail],
        resolversConfig: {
            'Mutation.sendContactMail': {
                auth: {
                    scope: ['api::contact-template.contact-mail.sendmail']
                }
            },
        }

    };
};