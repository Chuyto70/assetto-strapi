
import AuthLogo from './extensions/auth-logo.png';
import MenuLogo from './extensions/menu-logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
   // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['fr', 'es'],
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      light: {
        colors: {
          neutral0: '#F9F9F9',
          neutral100: '#F4F4F4',
          neutral150: '#ECECEC',
          neutral200: '#DDDDDD',
          neutral300: '#B9B9B9',
          neutral400: '#9A9A9A',
          neutral500: '#717171',
          neutral600: '#5D5D5D',
          neutral700: '#3F3F3F',
          neutral800: '#1E1E1E',
          neutral900: '#101010',
          neutral1000: '#101010',
          buttonNeutral0: "#F9F9F9",

          primary100: '#FFC9B7',
          primary200: '#FFA689',
          primary500: '#FF4205',
          buttonPrimary500: '#FF4205',
          primary600: '#FF3D00',
          buttonPrimary600: '#FF3D00',
          primary700: '#F13400',

          secondary100: '#E0BBE0',
          secondary200: '#CC8ECC',
          secondary500: '#981B9B',
          secondary600: '#8B1895',
          secondary700: '#79138D',
        }
      },
      dark: {
        colors: {
          neutral0: '#101010',
          neutral100: '#1E1E1E',
          neutral150: '#3F3F3F',
          neutral200: '#5D5D5D',
          neutral300: '#717171',
          neutral400: '#9A9A9A',
          neutral500: '#B9B9B9',
          neutral600: '#DDDDDD',
          neutral700: '#ECECEC',
          neutral800: '#F4F4F4',
          neutral900: '#F9F9F9',
          neutral1000: '#F9F9F9',
          buttonNeutral0: "#F9F9F9",

          primary100: '#FFC9B7',
          primary200: '#FFA689',
          primary500: '#FF4205',
          buttonPrimary500: '#FF4205',
          primary600: '#FF3D00',
          buttonPrimary600: '#FF3D00',
          primary700: '#F13400',

          secondary100: '#E0BBE0',
          secondary200: '#CC8ECC',
          secondary500: '#981B9B',
          secondary600: '#8B1895',
          secondary700: '#79138D',
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
