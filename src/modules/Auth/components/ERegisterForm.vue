<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex class="mr-1">
            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="nameRules"
              required
            />
          </v-flex>
          <v-flex class="ml-1">
            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="nameRules"
              required
            />
          </v-flex>
        </v-layout>
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
        />
        <span class="caption grey--text text--darken-1"
          >Please enter a valid email for your account</span
        >
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
      <h2>{{ err }}</h2>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn depressed class="text-none" color="primary" @click="validate()"
        >Register</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import bus from "@/eventbus";
import { auth } from "@/plugins/firebase";

export default {
  data() {
    return {
      err: "",
      valid: true,
      firstName: "",
      lastName: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 30 || "Name must be less than 30 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@+umed.jp/.test(v) || "E-mail must be valid umed.jp email",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    showSnackbar() {
      bus.$emit("show-snackbar", "Registration Success");
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.userRegister();
      }
    },
    userRegister() {
      this.$store
        .dispatch("$_auth/userRegister", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then(async () => {
          await auth.onAuthStateChanged((user) => {
            if (user) {
              user.sendEmailVerification();
              this.$router.push({ path: "/" });
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.err = err.message;
          alert(err.message);
        });
    },
  },
};
</script>

<style></style>
