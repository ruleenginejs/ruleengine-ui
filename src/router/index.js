import { createRouter, createWebHashHistory } from "vue-router";
import home from "./home";
import system from "./system";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...home,
    ...system
  ]
})

export default router;
