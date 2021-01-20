<script>
import { inject, toRefs } from "vue";
import useConnection from "./composables/use-connection";

export default {
  name: "v-graph-connection",
  props: {
    from: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    invalidate: {
      type: Boolean,
      default: true
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
    }
  },
  emits: ["update:invalidate"],
  setup(props, { emit }) {
    const { from, to, invalidate, color, borderWidth, className } = toRefs(
      props
    );
    const canvas = inject("canvas");
    const svg = inject("svg");

    const connection = useConnection(canvas, {
      svg,
      from,
      to,
      invalidate,
      emit,
      color,
      borderWidth,
      className
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
