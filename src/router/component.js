const DemoComponentLayout = () => import("@/demo/views/demo-component-layout");
const DemoComponentInstallation = () => import("@/demo/views/components/demo-component-installation");

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
