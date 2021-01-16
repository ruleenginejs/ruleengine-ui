import GraphCanvas from "./graph-canvas"
import { markRaw } from "vue";

export default function useCanvas(emit, options) {
  return markRaw(new GraphCanvas(emit, options));
}
