export const ie = 'ActiveXObject' in window;
export const edge = 'msLaunchUri' in navigator && !('documentMode' in document);
export const webkit = userAgentContains('webkit');
export const opera = !!window.opera;
export const chrome = !edge && userAgentContains('chrome');
export const gecko = userAgentContains('gecko') && !webkit && !opera && !ie;
export const safari = !chrome && userAgentContains('safari');
export const win = navigator.platform.indexOf('Win') === 0;
export const mac = navigator.platform.indexOf('Mac') === 0;

function userAgentContains(str) {
  return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}
