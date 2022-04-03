<template>
  <v-row class="px-4">
    <v-col :cols="item.cols || 6" v-for="item in items" :key="item.title">
      <title-subtitle :title="item.title" :subtitle="item.subtitle" />
    </v-col>
  </v-row>
</template>

<script>
import TitleSubtitle from "@/components/TitleSubtitle.vue";
export default {
  components: { TitleSubtitle },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
