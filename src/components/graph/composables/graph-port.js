import portDirection from "./port-direction";
import { watch, ref } from "vue";

class GraphPort {
  constructor({
    name,
    inc,
    out,
    disabled,
    linkLimit
  }) {
    this.node = null;
    this.name = name;
    this.disabled = disabled;
    this.linkLimit = linkLimit;

    this.direction = ref(portDirection.Duplex);
    this.updateDirection(inc.value, out.value);

    this.initWatchers({ inc, out });
  }

  initWatchers({ inc, out }) {
    watch([inc, out], () => {
      this.updateDirection(inc.value, out.value);
    });
  }

  updateDirection(inc, out) {
    if (inc) {
      this.direction.value = portDirection.Incoming;
    } else if (out) {
      this.direction.value = portDirection.Outgoing;
    } else {
      this.direction.value = portDirection.Duplex;
    }
  }

  onAdd(node) {
    this.node = node;
  }

  onRemove() {
    this.node = null;
  }

  getAnchorCenterLayerPosition() {
    return { x: 10, y: 10 };
  }
}

export default GraphPort;
