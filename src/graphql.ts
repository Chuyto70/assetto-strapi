const extensions = [];

const graphql = (strapi) => {
    const extensionService = strapi.plugin('graphql').service('extension');

    for (const extension of extensions) {
        extensionService.use(extension(strapi));
    };
}

export default graphql;