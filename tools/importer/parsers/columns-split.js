/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-split
 * Base block: columns
 * Source: https://www.vargroup.com/
 * Selector: section.LauncherDouble_LauncherDouble__OteTD
 * Generated: 2026-05-22
 *
 * Structure: 2-column split layout
 *   Column 1: Background image + card overlay (title, description, link)
 *   Column 2: Blue background with heading, subtitle text, CTA link
 *
 * The Columns block uses a multi-column table where each cell represents
 * one column of content. Each column can contain text, images, and links.
 */
export default function parse(element, { document }) {
  // === Column 1: Right box with background image and card overlay ===
  const rightBox = element.querySelector('.LauncherDouble_rightBox__C8DKg, [class*="rightBox"]');

  // Background image
  const bgImage = rightBox
    ? rightBox.querySelector('figure.BackgroundImage_BackgroundImage___Q46_ img, figure img, picture img')
    : null;

  // Card overlay content
  const cardTitle = rightBox
    ? rightBox.querySelector('.title-2, article .title-2, article div[class*="title"]')
    : null;

  const cardDescription = rightBox
    ? rightBox.querySelector('p.body-2, article p, article .body-2')
    : null;

  const cardLink = rightBox
    ? rightBox.querySelector('footer a, article footer a, a[class*="iconCta"]')
    : null;

  // === Column 2: Left box with heading, subtitle, and CTA ===
  const leftBox = element.querySelector('.LauncherDouble_leftBox__ASeg6, [class*="leftBox"]');

  const heading = leftBox
    ? leftBox.querySelector('.HeadingTitle_LauncherDoubleTitle__S6Wo_, [class*="LauncherDoubleTitle"], [class*="HeadingTitle"]')
    : null;

  const subtitle = leftBox
    ? leftBox.querySelector('.LauncherDouble_subtitle__rYoH_ p span, .LauncherDouble_subtitle__rYoH_ p, [class*="subtitle"] p span, [class*="subtitle"] p')
    : null;

  const ctaLink = leftBox
    ? leftBox.querySelector('footer a.TextLink_TextLink__It7K_, footer a[class*="TextLink"], footer a')
    : null;

  // === Build Column 1 content ===
  const col1Frag = document.createDocumentFragment();

  if (bgImage) {
    col1Frag.appendChild(bgImage);
  }

  if (cardTitle) {
    // Convert the div to a heading for semantic structure
    const h3 = document.createElement('h3');
    h3.textContent = cardTitle.textContent.trim();
    col1Frag.appendChild(h3);
  }

  if (cardDescription) {
    const p = document.createElement('p');
    p.textContent = cardDescription.textContent.trim();
    col1Frag.appendChild(p);
  }

  if (cardLink) {
    // Create a proper link element with text fallback
    const link = document.createElement('a');
    link.href = cardLink.href || cardLink.getAttribute('href') || '';
    link.textContent = cardLink.textContent.trim() || cardLink.querySelector('span')?.textContent.trim() || 'Learn more';
    col1Frag.appendChild(link);
  }

  // === Build Column 2 content ===
  const col2Frag = document.createDocumentFragment();

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    col2Frag.appendChild(h2);
  }

  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle.textContent.trim();
    col2Frag.appendChild(p);
  }

  if (ctaLink) {
    const link = document.createElement('a');
    link.href = ctaLink.href || ctaLink.getAttribute('href') || '';
    const ctaText = ctaLink.querySelector('span.cta-1, span')?.textContent.trim()
      || ctaLink.textContent.trim()
      || 'Learn more';
    link.textContent = ctaText;
    col2Frag.appendChild(link);
  }

  // === Build cells: single row with 2 columns ===
  const cells = [
    [col1Frag, col2Frag],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-split', cells });
  element.replaceWith(block);
}
