const DemoComponentLayout = () => import("@/demo/views/demo-component-layout");
const DemoComponentContent = () => import("@/demo/views/demo-component-content");

export default [
  {
    path: "component",
    redirect: "/component/installation",
    component: DemoComponentLayout,
    children: [
      {
        path: ":id",
        name: "component-content",
        props: true,
        component: DemoComponentContent
      }
    ]
  }
]
