// css
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { zhHans } from "vuetify/locale";
import c from "vuetify/util/colors";

const 主题暖橙 = {
  dark: false,
  colors: {
    background: c.orange.lighten5,
    // surface: "#FFFFFF",
    // "surface-bright": "#FFFFFF",
    // "surface-light": "#EEEEEE",
    // "surface-variant": "#424242",
    // "on-surface-variant": "#EEEEEE",
    primary: c.orange.base,
    "primary-darken-1": c.orange.darken2,
    secondary: c.orange.lighten3,
    // "secondary-darken-1": "#018786",
    // error: "#B00020",
    // info: "#2196F3",
    // success: "#4CAF50",
    // warning: "#FB8C00",
  },
  variables: {
    // "border-color": "#000000",
    // "theme-kbd": "#212529",
    // "theme-on-kbd": "#FFFFFF",
    // "theme-code": "#F5F5F5",
    // "theme-on-code": "#000000",
  },
};

export default createVuetify({
  locale: {
    locale: "zhHans",
    fallback: "en",
    messages: { zhHans },
  },
  theme: {
    //defaultTheme: "light",
    defaultTheme: "主题暖橙",
    themes: {
      主题暖橙,
    },
  },
});
