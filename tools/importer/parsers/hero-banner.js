/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner
 * Base block: hero
 * Source: https://www.vargroup.com/
 * Selector: .LauncherLargeCardCta_textContainer__WFl1l
 * Generated: 2026-05-22
 *
 * Structure (from UE model _hero.json):
 *   Row 1: image (with imageAlt collapsed as alt attribute)
 *   Row 2: text (richtext - heading content)
 */
export default function parse(element, { document }) {
  // Extract background image from the figure/picture element
  const bgImage = element.querySelector('figure.BackgroundImage_BackgroundImage___Q46_ img, figure img, picture img');

  // Extract text content from the article heading
  const heading = element.querySelector('article h2, article h1, article h3, h2, h1');

  // Build cells array matching hero model: Row 1 = image, Row 2 = text
  const cells = [];

  // Row 1: Image field (imageAlt is collapsed into the img alt attribute)
  if (bgImage) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(bgImage);
    cells.push([imgFrag]);
  } else {
    // Empty row required by xwalk model
    cells.push(['']);
  }

  // Row 2: Text field (richtext)
  const textFrag = document.createDocumentFragment();
  if (heading) {
    textFrag.appendChild(document.createComment(' field:text '));
    textFrag.appendChild(heading);
    cells.push([textFrag]);
  } else {
    cells.push(['']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
