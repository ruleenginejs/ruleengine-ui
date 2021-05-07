export default function useKeyboard({
  resetSearch,
  focusForward,
  focusBackward,
  onSelectFocused
}) {
  const onKeyEsc = () => {
    resetSearch();
  };

  const onKeyDown = () => {
    focusForward();
  };

  const onKeyUp = () => {
    focusBackward();
  };

  const onKeyEnter = () => {
    onSelectFocused();
  };

  return {
    onKeyEsc,
    onKeyDown,
    onKeyUp,
    onKeyEnter
  }
}
