import { setWasmPaths, version_wasm } from "@tensorflow/tfjs-backend-wasm";

import {
  SupportedModels,
  createSegmenter,
  MediaPipeSelfieSegmentationMediaPipeModelConfig,
  BodySegmenter,
  drawBokehEffect,
} from "@tensorflow-models/body-segmentation";

export class BlurProcessor {
  private readonly _name: string = "BlurProcessor";
  private static _model: BodySegmenter | null = null;

  constructor() {
    setWasmPaths(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${version_wasm}/dist/`
    );
  }

  async loadModel() {
    try {
      const model = SupportedModels.MediaPipeSelfieSegmentation;
      const segmenterConfig: MediaPipeSelfieSegmentationMediaPipeModelConfig = {
        runtime: "mediapipe", // or 'tfjs'
        solutionPath:
          "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
        modelType: "general",
      };
      BlurProcessor._model = await createSegmenter(model, segmenterConfig);
    } catch (error) {
      console.error("Unable to load selfie segmenter model.", error);
    }
  }

  async processFrame(
    inputFrameBuffer: any,
    outputFrameBuffer: HTMLCanvasElement
  ): Promise<void> {
    const gl = outputFrameBuffer;

    if (BlurProcessor._model) {
      const segmentation = await BlurProcessor._model?.segmentPeople(
        inputFrameBuffer
      );

      const foregroundThreshold = 1;
      const backgroundBlurAmount = 20;
      const edgeBlurAmount = 20;
      const flipHorizontal = false;

      await drawBokehEffect(
        gl,
        inputFrameBuffer,
        segmentation,
        foregroundThreshold,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal
      );
    }
  }
}
