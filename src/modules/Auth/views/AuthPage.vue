<template>
  <v-container>
    <v-layout fill-height justify-center align-center wrap>
      <v-card width="500">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          centered
        >
          <v-tab>Sign-in</v-tab>
          <v-tab>Sign-up</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <e-login-form />
          </v-tab-item>
          <v-tab-item>
            <e-register-form />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-layout>
    <v-snackbar
      v-model="showResetPasswordToast"
      :timeout="toastDurationInMillis"
    >
      We've sent you an email to reset your password.
    </v-snackbar>
  </v-container>
</template>

<script>
import ELoginForm from "../components/ELoginForm.vue";
import ERegisterForm from "../components/ERegisterForm.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    ELoginForm,
    ERegisterForm,
  },
  watch: {
    showEmailSentToast(newState) {
      if (newState) {
        this.showResetPasswordToast = newState;
      }
    },
    showResetPasswordToast(newState) {
      if (!newState) {
        this.setShowEmailSentToast(newState);
      }
    },
  },
  computed: {
    ...mapGetters("$_auth", {
      showEmailSentToast: "showEmailSentToast",
    }),
  },
  data() {
    return {
      tab: 0,
      showResetPasswordToast: false,
      toastDurationInMillis: 3000,
    };
  },
  methods: {
    ...mapMutations("$_auth", {
      setShowEmailSentToast: "setShowEmailSentToast",
    }),
  },
};
</script>

<style></style>
