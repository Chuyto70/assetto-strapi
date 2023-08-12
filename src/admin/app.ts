
import Logo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: Logo,
    },
   // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['fr', 'es'],
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: Logo,
    },
    // Override or extend the theme
    theme: {
      light: {
        colors: {
          primary100: '#e6c2bf',
          primary200: '#c8897b',
          primary500: '#aa3000',
          buttonPrimary500: '#aa3000',
          primary600: '#9f2700',
          buttonPrimary600: '#9f2700',
          primary700: '#901e00',
          secondary100: '#bfe3e6',
          secondary200: '#93d2d7',
          secondary500: '#2fa6a8',
          secondary600: '#2b989a',
          secondary700: '#278788',
        }
      },
      dark: {
        colors: {
          primary100: '#e6c2bf',
          primary200: '#c8897b',
          primary500: '#aa3000',
          buttonPrimary500: '#aa3000',
          primary600: '#9f2700',
          buttonPrimary600: '#9f2700',
          primary700: '#901e00',
          secondary100: '#bfe3e6',
          secondary200: '#93d2d7',
          secondary500: '#2fa6a8',
          secondary600: '#2b989a',
          secondary700: '#278788',
        }
      }
    },
   // Disable video tutorials
    tutorials: false,
   // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap() {},
};
