export default ({ env }) => ({
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: false,
            depthLimit: 25,
            amountLimit: 100,
            defaultLimit: 50, //pageSize default
            apolloServer: {
                tracing: false,
            },
        },
    },
    'encryptable-field': {
        enabled: true,
    },
    "video-field":{
        enabled: true,
    },
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
            },
            settings: {
                defaultFrom: env('SENDGRID_DEFAULT_FROM'),
                defaultReplyTo: env('SENDGRID_DEFAULT_REPLY'),
            },
        },
    }
});