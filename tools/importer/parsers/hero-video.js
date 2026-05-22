/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video
 * Base block: hero
 * Source: https://www.vargroup.com/
 * Selector: section.LauncherLarge_LauncherLarge__Al6bc
 * Generated: 2026-05-22
 *
 * UE Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Structure: Row 1 = background video/image, Row 2 = heading + CTA (richtext)
 */
export default function parse(element, { document }) {
  // Row 1: Background video — extract video source URL as a link element
  // Validated selectors: div.BackgroundVideo_BackgroundVideo__8IdSr video source[src]
  const videoSource = element.querySelector('div.BackgroundVideo_BackgroundVideo__8IdSr video source, video source');
  const videoUrl = videoSource ? videoSource.getAttribute('src') : '';

  // Create an anchor element for the video URL (AEM treats media as links)
  let mediaElement = null;
  if (videoUrl) {
    mediaElement = document.createElement('a');
    mediaElement.href = videoUrl;
    mediaElement.textContent = videoUrl;
  }

  // Row 2: Text content — heading + CTA link (richtext field)
  // Validated selectors: article.launcherContainer h2, article footer a
  const heading = element.querySelector('article.launcherContainer h2, article h2, h2');
  const ctaLink = element.querySelector('article.launcherContainer footer a, article footer a, footer a');

  // Build the richtext content cell with heading and CTA
  const textContent = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    textContent.push(h2);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = ctaLink.getAttribute('href');
    // Use the span text inside the link, fallback to link textContent
    const spanText = ctaLink.querySelector('span');
    link.textContent = spanText ? spanText.textContent.trim() : ctaLink.textContent.trim();
    p.appendChild(link);
    textContent.push(p);
  }

  // Build cells array matching hero block structure:
  // Row 1: image/video (field: image)
  // Row 2: text content (field: text)
  const cells = [];

  // Row 1: Background media with field hint
  const imageCell = document.createDocumentFragment();
  imageCell.appendChild(document.createComment(' field:image '));
  if (mediaElement) {
    imageCell.appendChild(mediaElement);
  }
  cells.push([imageCell]);

  // Row 2: Richtext content (heading + CTA) with field hint
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  textContent.forEach((el) => textCell.appendChild(el));
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
