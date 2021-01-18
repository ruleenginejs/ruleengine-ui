import { markRaw } from "vue";
import GraphPort from "./graph-port";

export default function usePort(options) {
  return markRaw(new GraphPort(options))
}
