<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
        />
        <span class="caption grey--text text--darken-1">
          This is the email you will use to login to your UMed account
        </span>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
          required
        />
        <span class="caption grey--text text--darken-1"
          >Please enter a password for your account</span
        >
      </v-form>
      <v-divider class="my-5" />
      <h2>{{ err }}</h2>
      <v-btn
        color="red darken-2"
        dark
        class="text-none mr-2"
        @click="loginWithSocial('google')"
      >
        <v-icon left>mdi-google</v-icon>Google
      </v-btn>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="reset" width="500">
        <template v-slot:activator="{ on }">
          <v-btn
            :on="on"
            text
            class="text-none font-weight-regular"
            @click="reset = true"
            >Forgot my password</v-btn
          >
        </template>

        <e-password-reset-form @close-dialog="closeDialog" />
      </v-dialog>

      <v-spacer />
      <v-btn
        depressed
        color="primary"
        class="text-none"
        @click.prevent="validate()"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { auth } from "@/plugins/firebase";
import EPasswordResetForm from "./EPasswordResetForm.vue";

export default {
  components: {
    EPasswordResetForm,
  },
  data() {
    return {
      valid: true,
      reset: false,
      err: "",
      fullname: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      // route: '/profile/user-information',
      // loading: false
    };
  },
  methods: {
    ...mapActions({
      socialLogin: "$_auth/socialLogin",
    }),
    closeDialog() {
      this.reset = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.userLogin();
      }
    },
    loginWithSocial(platform) {
      this.socialLogin(platform).then(() => {
        this.$router.push("/");
      });
    },
    userLogin() {
      this.$store
        .dispatch("$_auth/userLogin", {
          email: this.email,
          password: this.password,
        })
        .then(async () => {
          await auth.onAuthStateChanged((user) => {
            if (user) {
              this.$router.push({ path: "/" });
            }
          });
        })
        .catch((err) => {
          console.error(err);
          this.err = "Could not login";
        });
    },
  },
};
</script>

<style></style>
