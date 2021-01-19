import portDirection from "./port-direction";

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

    if (inc.value) {
      this.direction = portDirection.Incoming;
    } else if (out.value) {
      this.direction = portDirection.Outgoing;
    } else {
      this.direction = portDirection.Duplex;
    }
  }

  onAdd(node) {
    this.node = node;
  }

  onRemove() {
    this.node = null;
  }
}

export default GraphPort;
