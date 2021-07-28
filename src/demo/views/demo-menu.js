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
          title: "Content",
          route: route("content")
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
        },
        {
          title: "Checkbox",
          route: route("checkbox")
        },
        {
          title: "Select",
          route: route("selectbox")
        },
        {
          title: "Autocomplete",
          route: route("autocomplete")
        },
        {
          title: "Fieldset",
          route: route("fieldset")
        },
        {
          title: "Label",
          route: route("label")
        }
      ]
    },
    {
      title: "Data",
      items: [
        {
          title: "List",
          route: route("list")
        },
        {
          title: "Treeview",
          route: route("treeview")
        }
      ]
    },
    {
      title: "Navigation",
      items: [
        {
          title: "Sidebar",
          route: route("sidebar")
        },
        {
          title: "Tabs",
          route: route("tabs")
        },
        {
          title: "ActionBar",
          route: route("action-bar")
        },
        {
          title: "Dropdown",
          route: route("dropdown")
        },
      ]
    },
    {
      title: "Graph",
      items: [
        {
          title: "Node Graph",
          route: route("node-graph")
        }
      ]
    },
    {
      title: "Others",
      items: [
        {
          title: "SplitView",
          route: route("splitview")
        },
        {
          title: "Suggest",
          route: route("suggest")
        }
      ]
    }
  ]
};
