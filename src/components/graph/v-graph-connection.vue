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
    }
  },
  emits: ["update:invalidate"],
  setup(props, { emit }) {
    const { from, to, invalidate } = toRefs(props);
    const canvas = inject("canvas");
    const svg = inject("svg");

    const connection = useConnection(canvas, {
      svg,
      from,
      to,
      invalidate,
      emit
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
