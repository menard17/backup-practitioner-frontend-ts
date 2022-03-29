<template>
  <v-container>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary" dark> Dropdown </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Choice 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Choice 1</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn @click="signOut">Sign Out </v-btn>

    <v-btn color="secondary">Click me!</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
