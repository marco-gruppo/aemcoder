/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Var Group site-wide cleanup.
 * Removes non-authorable content from the DOM before/after block parsing.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner - blocks parsing (found at line 2: <div id="CybotCookiebotDialog">)
    WebImporter.DOMUtils.remove(element, ['#CybotCookiebotDialog']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Site header with navigation (found at line 733: <header class="Header_Header___gYgB ...">)
    WebImporter.DOMUtils.remove(element, ['header.Header_Header___gYgB']);

    // Site footer (found at line 1515: <footer id="main-footer" class="Footer_Footer__aU2VN ...">)
    WebImporter.DOMUtils.remove(element, ['footer#main-footer']);

    // Spacer divs between sections - non-authorable layout elements
    // (found at lines 1154, 1179, 1328, 1396, 1492, 1512: <div class="Spacer_Spacer*__* ...">)
    WebImporter.DOMUtils.remove(element, ['div[class*="Spacer_Spacer"]']);

    // Cookiebot iframes (found at lines 1640-1642)
    WebImporter.DOMUtils.remove(element, ['iframe']);
  }
}
