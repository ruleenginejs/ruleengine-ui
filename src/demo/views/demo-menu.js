function route(id) {
  return { name: "component-content", params: { id } };
}

export default {
  gettingStarted: [
    {
      title: "Installation",
      route: route("installation")
    }
  ],
  components: [
    {
      title: "Basic",
      items: [
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
        },
        {
          title: "Icon",
          route: route("icon")
        },
        {
          title: "Scrollbar",
          route: route("scrollbar")
        }
      ]
    },
    {
      title: "Form",
      items: [
        {
          title: "Input",
          route: route("input")
        }
      ]
    }
  ]
};
