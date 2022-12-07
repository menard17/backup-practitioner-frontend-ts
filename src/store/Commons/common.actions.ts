import { Context } from "../types";

export const setLayout = (context: Context, layout: string) => {
  context.commit("setLayout", layout);
};
