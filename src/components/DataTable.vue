<template>
  <v-container>
    <v-card outlined class="mb-10">
      <v-card-title>
        <v-flex>
          <v-layout>
            <v-flex>
              <div class="title">
                {{ title }}
              </div>
            </v-flex>
            <v-flex text-right>
              <slot name="headerButton" />
            </v-flex>
          </v-layout>
          <!--          <v-layout>-->
          <!--            <v-flex xs5>-->
          <!--              <v-text-field-->
          <!--                v-model="search"-->
          <!--                append-icon="mdi-magnify"-->
          <!--                label="Search"-->
          <!--                single-line-->
          <!--                hide-details-->
          <!--              ></v-text-field>-->
          <!--            </v-flex>-->
          <!--          </v-layout>-->
        </v-flex>
      </v-card-title>
      <slot></slot>
    </v-card>
    <v-dialog v-model="dialogDelete" width="300">
      <v-card>
        <v-card-title>Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            outlined
            color="error"
            class="text-none subtitle-2"
            @click="dialogDelete = false"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="text-none subtitle-2"
            text
            @click="deleteItemConfirm"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    addButtonText: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      dialogDelete: false,
      search: "",
    };
  },
  computed: {
    appendHeaders() {
      return [...this.headers];
    },
  },
  methods: {
    rowClicked(item) {
      this.$emit("row-clicked", item);
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = { ...this.items[this.editedIndex] };
      this.$emit("edit", this.editedItem);
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.itemToDelete = {
        ...this.items[this.editedIndex],
      };
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.$emit("delete", this.itemToDelete);
    },
  },
};
</script>

<style></style>
