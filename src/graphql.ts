import { ContactMail } from "./api/contact-template/graphql";
import { GameRequest } from "./api/game-request/graphql";

const extensions = [GameRequest, ContactMail];

const graphql = (strapi) => {
    const extensionService = strapi.plugin('graphql').service('extension');

    for (const extension of extensions) {
        extensionService.use(extension(strapi));
    };
}

export default graphql;