<template>
  <v-bottom-sheet v-model="isOpen" persistent scrollable>
    <v-sheet height="300px">
      <v-btn @click="isOpen = false" small>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card class="mt-2 elevation-0">
        <v-card-title>Effects</v-card-title>
        <v-divider></v-divider>
        <v-item-group style="height: 100%; overflow: auto">
          <v-container>
            <v-row>
              <v-col cols="12" sm="2">
                <v-item class="mb-2">
                  <v-card
                    @click="removeProcessor()"
                    class="d-flex align-center"
                    height="50"
                  >
                    <div class="text-center" style="width: 100%">
                      <v-icon color="black" size="50"> mdi-blur-off</v-icon>
                    </div>
                  </v-card>
                </v-item>
              </v-col>
              <v-col cols="12" sm="2">
                <v-item class="mb-2">
                  <v-card
                    @click="selectBlurProcessor()"
                    class="d-flex align-center"
                    height="50"
                  >
                    <div class="text-center" style="width: 100%">
                      <v-icon color="black" size="50"> mdi-blur</v-icon>
                    </div>
                  </v-card>
                </v-item>
              </v-col>
              <v-col
                v-for="images in backgroundImages"
                :key="images"
                cols="12"
                sm="2"
              >
                <v-item v-slot="{ active, toggle }" class="mb-2">
                  <v-card
                    class="d-flex align-center"
                    dark
                    height="50"
                    @click="selectImageProcessor(images, toggle)"
                  >
                    <v-img
                      :src="images"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-height="60"
                    >
                      <div v-if="active" class="text-center">
                        <v-icon color="black" size="50">
                          mdi-chevron-down-circle-outline
                        </v-icon>
                      </div>
                    </v-img>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { PropType } from "vue";
import Vue from "vue";
import { VideoProcessor, VideoTrack } from "twilio-video";
import { images } from "../backgroundImages";
import { BackgroundProcessors } from "../processors/BackgroundProcessors";
import { BlurProcessor } from "../processors/BlurProcessor";

export default Vue.extend({
  name: "SelectBottomSheet",
  data() {
    return {
      isOpen: false,
      backgroundImages: images as [],
      selectedBackgroundImage: null as null | BackgroundProcessors,
    };
  },
  props: {
    localTrack: {
      type: Object as PropType<VideoTrack>,
      required: false,
    },
  },
  methods: {
    openSheet() {
      this.isOpen = true;
    },
    getImage(image: any): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        image.onload = () => {
          resolve(image);
        };
        image.onerror = reject;
      });
    },
    addProcessor(processor: VideoProcessor) {
      if (!this.localTrack || this.localTrack.processor === processor) {
        return;
      }
      this.removeProcessor();
      this.localTrack.addProcessor(processor);
    },
    removeProcessor() {
      if (this.localTrack && this.localTrack.processor) {
        this.localTrack.removeProcessor(this.localTrack.processor);
      }
    },
    async selectImageProcessor(img: any, toggle: any) {
      const splitSlash = img.split("/");
      const splitDot = splitSlash[2].split(".");
      const path = `${splitDot[0]}.${splitDot[2]}`;
      let images = new Image();

      images.src = require("@/assets/" + path);
      this.selectedBackgroundImage = new BackgroundProcessors({
        imageBackground: await this.getImage(images),
      });
      await this.selectedBackgroundImage.loadModel();

      this.addProcessor(this.selectedBackgroundImage);
      toggle();
    },
    async selectBlurProcessor() {
      const blurProcessor = new BlurProcessor();
      await blurProcessor.loadModel();

      this.addProcessor(blurProcessor);
    },
  },
});
</script>
