export default function useExpand() {
  const expandEnter = (el) => {
    el.style.height = el.scrollHeight + "px";
  };

  const expandAfterEnter = (el) => {
    el.style.height = "auto";
  };

  const expandBeforeLeave = (el) => {
    el.style.height = el.scrollHeight + "px";
  };

  return {
    expandEnter,
    expandAfterEnter,
    expandBeforeLeave
  };
}
