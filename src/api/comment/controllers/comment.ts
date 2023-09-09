/**
 * comment controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }) => ({
    async find(ctx) {
      // obtaining authenticated user data
      const user = ctx.state.user;

      // getting only comments that belongs to the authenticated user
      const data = await strapi.entityService.findMany("api::comment.comment", {
        filters: {
          user: {
            id: user.id,
          },
        },
        populate: {
          image: true,
        }, // to get all data including the images url
      });

      // example of how to access an image:
      // http://localhost:1337/uploads/thumbnail_download_a8d4cfda16.jpeg
      return { data };
    },
  })
);
