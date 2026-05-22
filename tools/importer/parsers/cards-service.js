/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-service
 * Base block: cards
 * Description: Grid of service link cards with title and arrow link.
 * Source selector: .LauncherCardList_LauncherCardList__RAAB_
 * UE Model: card (fields: image, text)
 * Generated: 2026-05-22
 */
export default function parse(element, { document }) {
  // Get all card articles that have an actual link (skip empty placeholders)
  const articles = element.querySelectorAll('article.LauncherCardCta_LauncherCardCta__NVq5U');

  const cells = [];

  articles.forEach((article) => {
    const link = article.querySelector('a.LauncherCardCta_IconLink__g6TSV');
    // Skip placeholder cards that have no link
    if (!link) return;

    const titleEl = article.querySelector('.LauncherCardCta_title__WVdyH, div[class*="title"]');
    if (!titleEl || !titleEl.textContent.trim()) return;

    // Column 1: image (empty for service cards)
    const imageCell = '';

    // Column 2: text (richtext) - create a link element with the service title
    const textFrag = document.createDocumentFragment();
    const fieldHint = document.createComment(' field:text ');
    textFrag.appendChild(fieldHint);

    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = titleEl.textContent.trim();
    textFrag.appendChild(anchor);

    cells.push([imageCell, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-service', cells });
  element.replaceWith(block);
}
