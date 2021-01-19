import { markRaw, onUnmounted } from "vue";
import GraphConnection from "./graph-connection";

export default function useConnection(canvas, options) {
  const connection = markRaw(new GraphConnection(options));

  onUnmounted(() => {
    canvas?.removeConnection(connection);
  });

  canvas?.addConnection(connection);
  return connection;
}
