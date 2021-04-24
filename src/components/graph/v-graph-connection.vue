<script>
import { inject, toRefs } from "vue";
import useConnection from "./composables/use-connection";

export default {
  name: "v-graph-connection",
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    from: {
      type: Object,
      default: null
    },
    to: {
      type: Object,
      default: null
    },
    invalidate: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    borderWidth: {
      type: Number,
      default: 3
    },
    className: {
      type: String,
      default: "v-graph-connection"
    },
    selectedClass: {
      type: String,
      default: "v-graph-connection--selected"
    },
    colorClass: {
      type: String,
      default: "v-graph-connection--color"
    },
    curveFactor: {
      type: Number,
      default: 0.25
    }
  },
  emits: ["update:invalidate", "update:selected"],
  setup(props, { emit }) {
    const {
      id,
      from,
      to,
      invalidate,
      selected,
      color,
      borderWidth,
      className,
      selectedClass,
      colorClass,
      curveFactor
    } = toRefs(props);

    const canvas = inject("canvas");
    const svg = inject("svg");

    const connection = useConnection(canvas, {
      svg,
      id,
      from,
      to,
      invalidate,
      selected,
      emit,
      color,
      borderWidth,
      className,
      selectedClass,
      colorClass,
      curveFactor
    });
    const getConnection = () => connection;

    return {
      getConnection
    };
  },
  render() {
    return null;
  }
};
</script>

<style>
@import "graph-connection";
</style>
