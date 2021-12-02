<script>
import { h, toRefs, computed, withDirectives } from "vue";
import draggable from "@/directives/draggable";
import useDraggable from "./use-draggable";

export default {
  name: "v-draggable",
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: Boolean,
      default: false
    },
    ctrl: {
      type: Boolean,
      default: false
    },
    noctrl: {
      type: Boolean,
      default: false
    },
    stopEvent: {
      type: Boolean,
      default: false
    },
    clickTolerance: {
      type: Number,
      default: 3
    }
  },
  emits: [
    "click",
    "moved",
    "drag-start",
    "drag",
    "drag-end"
  ],
  setup(props, { emit, attrs, slots }) {
    const {
      fixed,
      disabled,
      clickTolerance,
      hint,
      ctrl,
      noctrl,
      stopEvent
    } = toRefs(props);

    const {
      moving,
      positionStyle,
      containerRef,
      draggableCallbacks
    } = useDraggable({
      clickTolerance,
      emit
    });

    const cssClasses = computed(() => ({
      "v-draggable": true,
      "v-draggable--disabled": disabled.value,
      "v-draggable--moving": !hint.value && moving.value,
      "v-draggable--fixed": !hint.value && moving.value && fixed.value
    }));

    const hintClasses = computed(() => ({
      "v-draggable": true,
      "v-draggable--hint": true,
      "v-draggable--disabled": disabled.value,
      "v-draggable--moving": moving.value,
      "v-draggable--fixed": moving.value && fixed.value
    }));

    const containerStyle = computed(() => {
      if (!hint.value && moving.value) {
        return positionStyle.value;
      }
      return null;
    });

    return () => {
      if (disabled.value) {
        return h("div", {
          class: [attrs.class, cssClasses.value],
          style: [attrs.style]
        }, slots.default?.());
      }

      const container = h("div", {
        class: [attrs.class, cssClasses.value],
        style: [attrs.style, containerStyle.value],
        ref: (el) => containerRef.value = el
      }, slots.default?.());

      const nodes = [];

      nodes.push(withDirectives(container, [
        [draggable, draggableCallbacks,
          null,
          {
            noctrl: noctrl.value,
            ctrl: ctrl.value,
            stop: stopEvent.value
          },
        ]
      ]));

      if (moving.value && hint.value) {
        const hint = h("div", {
          class: [attrs.class, hintClasses.value],
          style: [attrs.style, positionStyle.value]
        }, slots.default?.());

        nodes.push(hint);
      }

      return nodes;
    };
  }
};
</script>

<style>
@import "draggable";
</style>
