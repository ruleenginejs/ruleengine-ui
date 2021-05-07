export default function useKeyboard({
  visible,
  resetSearch,
  updateSearch,
  focusForward,
  focusBackward,
  onSelectFocused
}) {
  const onKeyEsc = () => {
    if (visible.value) {
      resetSearch();
    }
  };

  const onKeyDown = () => {
    if (visible.value) {
      focusForward();
    } else {
      updateSearch();
    }
  };

  const onKeyUp = () => {
    if (visible.value) {
      focusBackward();
    }
  };

  const onKeyEnter = () => {
    if (visible.value) {
      onSelectFocused();
    }
  };

  return {
    onKeyEsc,
    onKeyDown,
    onKeyUp,
    onKeyEnter
  }
}
