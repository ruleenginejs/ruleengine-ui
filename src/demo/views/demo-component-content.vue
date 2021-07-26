<script>
import { resolveDynamicComponent, h, computed, toRefs } from "vue";
import DemoComponentNotFound from "./demo-component-not-found";

export default {
  name: "demo-component-content",
  props: {
    id: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { id } = toRefs(props);
    const componentName = computed(() => {
      return `demo-component-${id.value}`;
    });

    return () => {
      let demoComponent = resolveDynamicComponent(componentName.value);
      if (typeof demoComponent === "string") {
        return h(DemoComponentNotFound);
      }
      return h(demoComponent);
    };
  }
};
</script>
