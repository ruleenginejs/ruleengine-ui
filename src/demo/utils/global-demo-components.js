import kebabCase from "lodash/kebabCase";

const requireComponent = require.context(
  "@/demo/views/components",
  true,
  /demo-component-[a-z0-9-]*.(vue|js)$/
);

export default {
  install: (app) => {
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName =
        kebabCase(
          fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        );

      app.component(
        componentName,
        componentConfig.default || componentConfig
      );
    });
  }
}
