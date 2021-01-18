import { ref, watch, onMounted, markRaw } from "vue";
import { SVG } from "@svgdotjs/svg.js"

class GraphSvg {
  constructor({
    translateX,
    translateY,
    width,
    height,
    scale
  }) {
    this.container = ref(null);
    this.draw = ref(null);
    this.rootGroup = ref(null);
    this.translateX = translateX;
    this.translateY = translateY;
    this.width = width;
    this.height = height;
    this.scale = scale;

    onMounted(() => {
      if (this.container.value) {
        this.initSvg(this.container.value);
      }
    });

    this.initWatchers({
      translateX,
      translateY,
      width,
      height,
      scale
    });
  }

  initWatchers({
    translateX,
    translateY,
    width,
    height,
    scale
  }) {
    watch([
      translateX,
      translateY,
      width,
      height,
      scale
    ], () => {
      this.update();
    })
  }

  initSvg(container) {
    const draw = markRaw(SVG().addTo(container));
    const rootGroup = markRaw(draw.group());
    this.draw.value = draw;
    this.rootGroup.value = rootGroup;
    this.update();
  }

  update() {
    const draw = this.draw.value;
    if (!draw) return;

    const x = this.translateX.value;
    const y = this.translateY.value;
    const w = this.width.value / this.scale.value;
    const h = this.height.value / this.scale.value;

    draw
      .size(w, h)
      .viewbox(-x, -y, w, h)
      .transform({
        translateX: -x,
        translateY: -y,
      });
  }
}

export default GraphSvg;
