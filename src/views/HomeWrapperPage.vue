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

export default Vue.extend({
  name: "HomeWrapperPage",
  data() {
    return {
      drawer: false,
      mini: false,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-calendar-multiple",
          to: "/",
        },
        {
          title: "Appointments",
          icon: "mdi-calendar-multiple",
          to: "/appointments",
        },
        {
          title: "Practitioners",
          icon: "mdi-calendar-multiple",
          to: "/practitioners",
        },
        {
          title: "Patients",
          icon: "mdi-calendar-multiple",
          to: "/patients",
        },
      ],
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        this.drawer = true;
      } else {
        this.drawer = false;
      }
    });
  },

  methods: {
    signOut() {
      this.$store
        .dispatch("$_auth/signOut")
        .then(async () => {
          this.$router.push({ path: "/sign-in" });
        })
        .catch((err) => {
          console.log(err);
          //this.err = "Could not login";
        });
    },
  },
});
</script>

<style></style>
