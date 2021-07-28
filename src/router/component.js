const DemoComponentLayout = () => import("@/demo/views/demo-component-layout");
const DemoComponentPage = () => import("@/demo/views/demo-component-page");

export default [
  {
    path: "component",
    redirect: "/component/installation",
    name: "component",
    component: DemoComponentLayout,
    children: [
      {
        path: ":id",
        name: "component-content",
        props: true,
        component: DemoComponentPage
      }
    ]
  }
]
