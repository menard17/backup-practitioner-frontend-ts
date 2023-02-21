<template>
  <div>
    <v-overlay :value="isCreatingPractitionerWithPractitionerRole">
      <div class="practitioner-role-loader">
        <div>Setting Practitioner Role...</div>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </div>
    </v-overlay>
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
      class="m-0 p-0"
      :mini-variant.sync="mini"
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
    <v-main class="fill-width">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/plugins/firebase";
import { mapActions, mapGetters, mapState } from "vuex";
import { practitionerRoutes, staffRoutes } from "@/routes";

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
    ...mapGetters("$_account", {
      isCreatingPractitionerWithPractitionerRole:
        "isCreatingPractitionerWithPractitionerRole",
    }),
    items() {
      if (this.firebaseRole == "Staff") {
        return staffRoutes;
      } else if (this.firebaseRole == "Practitioner") {
        return practitionerRoutes;
      }

      return [];
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
    this.getListId();
  },

  methods: {
    ...mapActions("$_account", {
      getCurrentUserRole: "getCurrentUserRole",
    }),
    ...mapActions("$_auth", {
      setToken: "setToken",
    }),
    ...mapActions({
      getListId: "$_queues/getListId",
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

<style scoped>
.practitioner-role-loader {
  text-align: center;
}
</style>
