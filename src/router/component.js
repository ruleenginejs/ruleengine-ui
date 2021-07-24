const DemoComponentLayout = () => import("@/views/demo/demo-component-layout");
const DemoComponentInstallation = () => import("@/views/demo/components/demo-component-installation");

export default [
  {
    path: "component",
    redirect: "/component/installation",
    component: DemoComponentLayout,
    children: [
      {
        path: "installation",
        name: "installation",
        component: DemoComponentInstallation
      }
    ]
  }
]
