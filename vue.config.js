const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: "ja",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true,
    },
  },
});
