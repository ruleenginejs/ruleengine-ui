import component from "./component";

const DemoLayout = () => import("@/views/demo/demo-layout");
const DemoHome = () => import("@/views/demo/demo-home");

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
