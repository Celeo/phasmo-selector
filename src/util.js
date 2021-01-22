import {
  SELECTED,
  IGNORED,
  NOT_SELECTED,
  MOUSE_LEFT,
  MOUSE_RIGHT,
} from "./data";

export const toggleSelection = (selected, evidence, button) => {
  const current = selected[evidence];
  if (current === NOT_SELECTED) {
    return button === MOUSE_LEFT ? SELECTED : IGNORED;
  }
  if (button === MOUSE_LEFT && current === SELECTED) {
    return NOT_SELECTED;
  } else if (button === MOUSE_LEFT && current === IGNORED) {
    return SELECTED;
  } else if (button === MOUSE_RIGHT && current === IGNORED) {
    return NOT_SELECTED;
  } else if (button === MOUSE_RIGHT && current === SELECTED) {
    return IGNORED;
  }
  console.log("ERROR should not reach");
  return NOT_SELECTED;
};

export const ghostMatches = (ghost, evidence) => {
  for (let [key, value] of Object.entries(ghost.evidence)) {
    if (
      (value && evidence[key] === IGNORED) ||
      (!value && evidence[key] == SELECTED)
    ) {
      return false;
    }
  }
  return true;
};
