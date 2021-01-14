import GraphCanvas from "./graph-canvas"
import { markRaw } from "vue";

export default function useCanvas(emit) {
  return markRaw(new GraphCanvas(emit));
}
