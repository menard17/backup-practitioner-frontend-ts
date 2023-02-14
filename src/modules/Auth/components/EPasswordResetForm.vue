<template>
  <v-card>
    <v-card-title class="p-8">
      <div class="headline d-flex align-center">
        <span class="pr-4"> Password Reset </span>
        <v-progress-circular
          v-if="isSendingPasswordResetLink"
          class="d-block m-auto"
          :size="32"
          indeterminate
        />
      </div>
      <v-spacer />
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="!isSendingPasswordResetLink"
    >
      <v-card-text>
        <span class="grey--text"
          >Enter your email address that you used to register. We'll send you an
          email with a link to reset your password.</span
        >

        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" depressed @click="validate()"> Send </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v: string): true | "E-mail is required" => !!v || "E-mail is required",
        (v: string): true | "E-mail must be valid" =>
          /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapGetters("$_auth", {
      isSendingPasswordResetLink: "isSendingPasswordResetLink",
    }),
  },
  methods: {
    ...mapActions({
      forgotPassword: "$_auth/forgotPassword",
    }),
    ...mapMutations({
      setIsSendingPasswordResetLink: "$_auth/setIsSendingPasswordResetLink",
    }),
    async validate() {
      if ((this.$refs.form as any).validate()) {
        await this.forgotPassword(this.email);
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
});
</script>

<style scoped>
.loading-container {
  display: block;
  display: flex;
  justify-content: center;
}
</style>
