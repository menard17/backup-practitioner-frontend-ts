<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs, value }">
      <v-btn
        :color="
          selectedFilterItem && selectedFilterItem !== 'None' ? 'primary' : null
        "
        v-bind="attrs"
        v-on="on"
        :outlined="!selectedFilterItem || selectedFilterItem === 'None'"
        small
        class="text-none mr-2"
        elevation="0"
      >
        {{
          selectedFilterItem && selectedFilterItem !== "None"
            ? selectedFilterItem.title
            : defaultFilterTitle
        }}
        <v-icon small>
          {{ value ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <div v-for="item in filterMenuOptions" :key="item.title">
        <v-divider v-if="item.divider" />
        <v-list-item v-else dense @click="filterItems(item)">
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-icon
            v-if="selectedFilterItem && selectedFilterItem.title === item.title"
          >
            <v-icon small>mdi-check</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "FilterButtonMenu",
  props: {
    filterMenuOptions: {
      type: Object,
      default: () => null,
    },
    selectedFilterItem: {
      type: Object,
      default: () => null,
    },
    defaultFilterTitle: {
      type: String,
      default: () => "unknown",
    },
  },
  methods: {
    filterItems(item) {
      this.$emit("filter-items", item);
    },
  },
};
</script>

<style scoped></style>
