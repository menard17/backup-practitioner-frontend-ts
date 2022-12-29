import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";

import {
  SupportedModels,
  createSegmenter,
  MediaPipeSelfieSegmentationMediaPipeModelConfig,
  BodySegmenter,
  toBinaryMask,
} from "@tensorflow-models/body-segmentation";
import { Color } from "@tensorflow-models/body-segmentation/dist/body_pix/impl/types";

export interface BackGroundProcessorOptions {
  imageBackground: HTMLImageElement;
}

export class BackgroundProcessors {
  private readonly _name: string = "BackgroundProcessor";
  private _backgroundImage!: HTMLImageElement;
  private _foregroundColor: Color = { r: 0, g: 0, b: 0, a: 255 };
  private _backgroundColor: Color = { r: 0, g: 0, b: 0, a: 0 };

  private static _model: BodySegmenter | null = null;

  constructor(options: BackGroundProcessorOptions) {
    tfjsWasm.setWasmPaths(
      `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`
    );
    this.backgroundImage = options.imageBackground;
  }

  get backgroundImage(): HTMLImageElement {
    return this._backgroundImage;
  }

  set backgroundImage(image: HTMLImageElement) {
    if (!image || !image.complete || !image.naturalHeight) {
      throw new Error(
        "Invalid image. Make sure that the image is an HTMLImageElement and has been successfully loaded"
      );
    }
    this._backgroundImage = image;
  }

  async loadModel() {
    try {
      const model = SupportedModels.MediaPipeSelfieSegmentation;
      const segmenterConfig: MediaPipeSelfieSegmentationMediaPipeModelConfig = {
        runtime: "mediapipe",
        solutionPath:
          "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
        modelType: "general",
      };
      BackgroundProcessors._model = await createSegmenter(
        model,
        segmenterConfig
      );

      console.log("Loaded selfie segmenter");
    } catch (error) {
      console.error("Unable to load selfie segmenter model.", error);
    }
  }

  async processFrame(
    inputFrameBuffer: any,
    outputFrameBuffer: HTMLCanvasElement
  ): Promise<void> {
    const ctx = outputFrameBuffer.getContext("2d") as CanvasRenderingContext2D;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = inputFrameBuffer.width;
    tempCanvas.height = inputFrameBuffer.height;
    const tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
    if (BackgroundProcessors._model) {
      const segmentation = await BackgroundProcessors._model?.segmentPeople(
        inputFrameBuffer
      );

      const mask = await toBinaryMask(
        segmentation,
        this._foregroundColor,
        this._backgroundColor,
        true,
        1
      );

      tempCtx.putImageData(mask, 0, 0);
      ctx.save();
      ctx.clearRect(0, 0, inputFrameBuffer.width, inputFrameBuffer.height);

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(
        tempCanvas,
        0,
        0,
        inputFrameBuffer.width,
        inputFrameBuffer.height
      );

      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(inputFrameBuffer, 0, 0);

      ctx.filter = "none";
      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(this.backgroundImage, 0, 0);
    }
  }
}
