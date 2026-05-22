/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Var Group section breaks.
 * Inserts <hr> elements between sections based on template section selectors.
 * Runs only in afterTransform. Uses payload.template.sections.
 * All selectors validated against migration-work/cleaned.html.
 *
 * Sections (8 total):
 *   1. Hero Carousel: section.HeaderHomepage_HeaderHomepage__BSyAP
 *   2. Company Introduction: section.LauncherTextMedium_LauncherTextMedium__ZisFK
 *   3. Services Banner + Card Grid: section.LauncherLargeCardCta_LauncherLargeCardCta__uSZUa
 *   4. Case History Introduction: section.LauncherTextSmall_LauncherTextSmall__VhmE1
 *   5. Case Studies Grid: section.ContentNewCase_ContentNewCaseContainer__ly98L (first instance)
 *   6. Careers Split Layout: section.LauncherDouble_LauncherDouble__OteTD (1st instance)
 *   7. Sustainability Split Layout: section.LauncherDouble_LauncherDouble__OteTD (2nd instance)
 *   8. Values Video Background: section.LauncherLarge_LauncherLarge__Al6bc
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

/**
 * Resolves a section selector to a DOM element.
 * Handles array selectors (tries each until one matches) and nth-of-type
 * pseudo-selectors by falling back to querySelectorAll with index matching.
 */
function resolveSection(element, selectorValue) {
  if (Array.isArray(selectorValue)) {
    // For array selectors, try each option; use querySelectorAll for nth-of-type
    for (const sel of selectorValue) {
      // Try direct querySelector first
      const el = element.querySelector(sel);
      if (el) return el;
    }
    // If nth-of-type selectors failed, extract the base class and use index
    // e.g. "section.LauncherDouble_LauncherDouble__OteTD:nth-of-type(2)"
    const firstSel = selectorValue[0];
    const nthMatch = firstSel.match(/^(.+):nth-of-type\((\d+)\)$/);
    if (nthMatch) {
      const baseSelector = nthMatch[1];
      const index = parseInt(nthMatch[2], 10) - 1;
      const allMatches = element.querySelectorAll(baseSelector);
      if (allMatches.length > index) return allMatches[index];
    }
    // Try last-of-type as well -- means last element with that base selector
    const lastSel = selectorValue.find(s => s.includes(':last-of-type'));
    if (lastSel) {
      const baseSelector = lastSel.replace(/:last-of-type$/, '');
      const allMatches = element.querySelectorAll(baseSelector);
      if (allMatches.length > 0) return allMatches[allMatches.length - 1];
    }
    return null;
  }
  return element.querySelector(selectorValue);
}

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = resolveSection(element, section.selector);

      if (!sectionEl) continue;

      // Insert Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Insert <hr> before every section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
