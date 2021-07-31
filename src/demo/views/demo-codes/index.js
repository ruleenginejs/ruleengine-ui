const requireComponent = require.context(
  "@/demo/views/demo-codes",
  true,
  /component-[a-z0-9-]*.(js)$/
);

const codes = [];

requireComponent.keys().forEach(fileName => {
  codes.push.apply(codes, requireComponent(fileName).default);
});

export default codes;
