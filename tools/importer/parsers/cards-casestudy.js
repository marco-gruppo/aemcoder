/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-casestudy
 * Base block: cards
 * Source: https://www.vargroup.com/
 * Selector: section.ContentNewCase_ContentNewCaseContainer__ly98L
 * Generated: 2026-05-22
 *
 * Container block: each card = 1 row with columns [image, text]
 * UE Model fields per card: image (reference), text (richtext)
 */
export default function parse(element, { document }) {
  // Select all card containers (smaller and bigger variants)
  const cards = element.querySelectorAll(
    '.ContentNewCase_smallerContent__smEhy, .ContentNewCase_biggerContent__3ipTz'
  );

  const cells = [];

  cards.forEach((card) => {
    // Extract image - linked image within the card
    const imgEl = card.querySelector('img');

    // Extract title - p with title class variants
    const title = card.querySelector(
      '.ContentNewCase_imageSmallerTitle__AAq_K, .ContentNewCase_imageBiggerTitle__QsWSu'
    );

    // Extract description link - a wrapping a p with text class variants
    const descLink = card.querySelector(
      'a:has(.ContentNewCase_imageSmallerText__TeMGQ), a:has(.ContentNewCase_imageBiggerText__GUB2k)'
    );

    // Extract category - p with category class variants
    const category = card.querySelector(
      '.ContentNewCase_imageSmallerCategory__9Vh0s, .ContentNewCase_imageBiggerCategory__laInz'
    );

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (imgEl) {
      imageCell.appendChild(imgEl);
    }

    // Build text cell with field hint - richtext containing title, description link, category
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent;
      textCell.appendChild(h3);
    }
    if (descLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = descLink.href || descLink.getAttribute('href');
      a.textContent = descLink.textContent.trim();
      p.appendChild(a);
      textCell.appendChild(p);
    }
    if (category) {
      const catP = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = category.textContent;
      catP.appendChild(em);
      textCell.appendChild(catP);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-casestudy', cells });
  element.replaceWith(block);
}
