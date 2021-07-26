function route(id) {
  return { name: "component-content", params: { id } };
}

export default {
  introduction: [
    {
      title: "Installation",
      route: route("installation")
    }
  ],
  components: [
    {
      title: "Layout",
      route: route("layout")
    },
    {
      title: "Button",
      route: route("button")
    },
    {
      title: "Space",
      route: route("space")
    }
  ]
};
