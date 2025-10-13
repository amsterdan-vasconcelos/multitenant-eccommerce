import * as React from "react";

type Ref =
  | React.RefObject<HTMLDivElement | null>
  | React.RefObject<HTMLDivElement>;

export function useDropdownPosition(ref: Ref) {
  function getDropdownPosition() {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWith = 240;

    const top = rect.bottom + window.scrollY;
    let left = rect.left + window.scrollX;

    if (left + dropdownWith > window.innerWidth) {
      left = rect.right + scrollX - dropdownWith;

      if (left < 0) {
        left = window.innerWidth - dropdownWith - 16;
      }
    }

    if (left < 0) {
      left = 16;
    }

    return { top, left };
  }

  return { getDropdownPosition };
}
