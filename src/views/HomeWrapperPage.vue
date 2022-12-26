<template>
  <div>
    <v-app-bar color="primary" dark>
      <div>
        <v-layout align-center>
          <v-switch
            hide-details
            append-icon="mdi-weather-night"
            v-model="$vuetify.theme.dark"
            color="grey darken-2"
          ></v-switch>
        </v-layout>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-if="drawer"
      app
      absolute
      permanent
      :mini-variant.sync="mini"
      class="pa-0 text-left"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            UMed Practitioner App
          </v-list-item-title>
          <v-list-item-subtitle> v0.1.0 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="item.to" v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider />
        <v-row>
          <v-col align="end">
            <v-btn class="ma-1" icon @click.stop="mini = !mini">
              <v-icon>
                {{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon
              >
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-main class="text-left">
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "HomeWrapperPage",
  data() {
    return {
      drawer: false,
      mini: false,
    };
  },
  computed: {
    ...mapState("$_account", {
      firebaseRole: "firebaseRole",
    }),
    items() {
      if (!this.firebaseRole) {
        return [];
      } else if (this.firebaseRole == "Staff") {
        return [
          {
            title: "My Account",
            icon: "mdi-account",
            to: "/",
          },
          {
            title: "Appointments",
            icon: "mdi-calendar-multiple",
            to: "/appointments",
          },
          {
            title: "Patients",
            icon: "mdi-account-multiple",
            to: "/patients",
          },
          {
            title: "Practitioners",
            icon: "mdi-doctor",
            to: "/practitioners",
          },
          {
            title: "Payments",
            icon: "mdi-cash-multiple",
            to: "/payments",
          },
          {
            title: "Bulk Payments",
            icon: "mdi-cash-multiple",
            to: "/bulk-payments",
          },
          {
            title: "Porters",
            icon: "mdi-truck",
            to: "/porters",
          },
          {
            title: "Orders",
            icon: "mdi-truck",
            to: "/orders",
          },
        ];
      } else if (this.firebaseRole == "Practitioner") {
        return [
          {
            title: "My Account",
            icon: "mdi-account",
            to: "/",
          },
          {
            title: "My Appointments",
            icon: "mdi-calendar-multiple",
            to: "/appointments",
          },
          {
            title: "Patients",
            icon: "mdi-account-multiple",
            to: "/patients",
          },
        ];
      } else {
        return [];
      }
    },
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.drawer = true;
        const idToken = await user.getIdTokenResult(true);
        this.setToken(idToken.token);
      } else {
        this.drawer = false;
      }
    });
    this.getCurrentUserRole();
  },

  methods: {
    ...mapActions("$_account", {
      getCurrentUserRole: "getCurrentUserRole",
    }),
    ...mapActions("$_auth", {
      setToken: "setToken",
    }),
    signOut() {
      this.$store
        .dispatch("$_auth/signOut")
        .then(async () => {
          this.$router.push({ path: "/sign-in" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
</script>

<style></style>
