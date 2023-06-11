import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import fr from 'vuetify/lib/locale/fr';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
    dark: false,
  },
  lang: {
    locales: { fr },
    current: 'fr',
  },
  icons: {
    defaultSet: 'fa',
  },
});
