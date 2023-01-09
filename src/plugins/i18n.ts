import Vue from "vue";
import VueI18n, { LocaleMessages, DateTimeFormats } from "vue-i18n";

Vue.use(VueI18n);

const dateTimeFormats: DateTimeFormats = {
  "ja-JP": {
    short: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      timeZone: "Asia/Tokyo",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "long",
      timeZone: "Asia/Tokyo",
    },
  },
  "en-US": {
    short: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "long",
    },
  },
};

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    "../locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "ja",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
  dateTimeFormats: dateTimeFormats,
});
