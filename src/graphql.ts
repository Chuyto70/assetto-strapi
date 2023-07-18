import { upsertGameRequest } from "./api/game-request/graphql";

const extensions = [upsertGameRequest];

const graphql = (strapi) => {
    const extensionService = strapi.plugin('graphql').service('extension');

    for (const extension of extensions) {
        extensionService.use(extension(strapi));
    };
}

export default graphql;