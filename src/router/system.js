const DemoNotFound = () => import("@/demo/views/demo-not-found");

export default [
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: DemoNotFound
  }
]
