import component from "./component";

const DemoLayout = () => import("@/demo/views/demo-layout");
const DemoHome = () => import("@/demo/views//demo-home");

export default [
  {
    path: "/",
    component: DemoLayout,
    children: [
      {
        path: "",
        redirect: "/component/installation",
        name: "home",
        component: DemoHome
      },
      ...component
    ]
  }
]
