import { markRaw } from "vue";
import List from "./list";

export default function useList(options) {
  return markRaw(new List(options));
}
