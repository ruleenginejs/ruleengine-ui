import { markRaw, onUnmounted } from "vue";
import GraphPort from "./graph-port";

export default function usePort(node, options) {
  const port = markRaw(new GraphPort(options));

  onUnmounted(() => {
    node?.removePort(port);
  });

  node?.addPort(port);
  return port;
}
