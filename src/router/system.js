const DemoNotFound = () => import("@/views/demo/demo-not-found");

export default [
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: DemoNotFound
  }
]
