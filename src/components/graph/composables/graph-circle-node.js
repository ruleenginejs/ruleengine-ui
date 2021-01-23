import GraphNode from "./graph-node";

class GraphCircleNode extends GraphNode {
  constructor(options) {
    super(options);
  }

  makeTarget() {
    return this.getPorts()[0]?.makeTarget() ?? super.makeTarget();
  }
}

export default GraphCircleNode;
