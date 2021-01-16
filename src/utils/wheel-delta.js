import { win, chrome, gecko, edge } from "./browser";

export const wheelPxFactor =
  (win && chrome) ? 2 * window.devicePixelRatio :
    gecko ? window.devicePixelRatio : 1;

export function getWheelDelta(e) {
  return (edge) ? e.wheelDeltaY / 2 :
    (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor :
      (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 :
        (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 :
          (e.deltaX || e.deltaZ) ? 0 :
            e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 :
              (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 :
                e.detail ? e.detail / -32765 * 60 :
                  0;
}
