<template>
  <c-form />
  <c-action-bar />
  <c-tabs />
  <c-sidebar />
  <c-treeview />
  <c-split-view />
  <c-props-panel />
  <c-graph />
</template>

<script>
import CForm from "./c-form";
import CActionBar from "./c-action-bar";
import CTabs from "./c-tabs";
import CSidebar from "./c-sidebar";
import CTreeview from "./c-treeview";
import CSplitView from "./c-split-view";
import CGraph from "./c-graph";
import CPropsPanel from "./c-props-panel";

export default {
  name: "all-components",
  components: {
    CForm,
    CActionBar,
    CTabs,
    CSidebar,
    CTreeview,
    CSplitView,
    CGraph,
    CPropsPanel
  }
};
</script>
