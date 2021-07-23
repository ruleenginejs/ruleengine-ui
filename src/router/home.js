const DemoLayout = () => import("@/views/demo/demo-layout");
const DemoHome = () => import("@/views/demo/demo-home");

export default [
  {
    path: "/",
    component: DemoLayout,
    children: [
      {
        path: "",
        name: "home",
        component: DemoHome
      }
    ]
  }
]
