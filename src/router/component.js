const DemoComponentPageLayout = () => import("@/demo/views/demo-component-layout");
const DemoComponentInstallation = () => import("@/demo/views/components/demo-component-installation");
const DemoComponentLayout = () => import("@/demo/views/components/demo-component-layout");
const DemoComponentButton = () => import("@/demo/views/components/demo-component-button");

export default [
  {
    path: "component",
    redirect: "/component/installation",
    component: DemoComponentPageLayout,
    children: [
      {
        path: "installation",
        name: "component-installation",
        component: DemoComponentInstallation
      },
      {
        path: "layout",
        name: "component-layout",
        component: DemoComponentLayout
      },
      {
        path: "button",
        name: "component-button",
        component: DemoComponentButton
      }
    ]
  }
]
