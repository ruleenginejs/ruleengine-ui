import componentAutocomplete from "./component-autocomplete";
import componentButton from "./component-button";
import componentCheckbox from "./component-checkbox";
import componentContent from "./component-content";
import componentFieldset from "./component-fieldset";
import componentIcon from "./component-icon";
import componentInput from "./component-input";
import componentInstallation from "./component-installation";
import componentLabel from "./component-label";
import componentLayout from "./component-layout";
import componentList from "./component-list";
import componentScrollbar from "./component-scrollbar";
import componentSelectbox from "./component-selectbox";
import componentSidebar from "./component-sidebar";
import componentSpace from "./component-space";
import componentSplitview from "./component-splitview";
import componentTabs from "./component-tabs";
import componentTreeview from "./component-treeview";

export default [
  ...componentInstallation,
  ...componentLayout,
  ...componentButton,
  ...componentSpace,
  ...componentScrollbar,
  ...componentIcon,
  ...componentInput,
  ...componentContent,
  ...componentList,
  ...componentSidebar,
  ...componentTreeview,
  ...componentCheckbox,
  ...componentSelectbox,
  ...componentFieldset,
  ...componentLabel,
  ...componentAutocomplete,
  ...componentSplitview,
  ...componentTabs
]
