/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-hero
 * Base block: carousel
 * Source: https://www.vargroup.com/
 * Description: Full-screen hero carousel with slides containing background image/video,
 *   H1 heading, paragraph text, and CTA link.
 * UE Model: carousel-hero-item (container block)
 *   - media_image (reference): Background image
 *   - media_imageAlt (collapsed): Alt text for image
 *   - content_text (richtext): Heading + paragraph + CTA
 * Generated: 2026-05-22
 */
export default function parse(element, { document }) {
  // Select all slide items from the splide carousel
  const slides = element.querySelectorAll('li.splide__slide');

  const cells = [];

  slides.forEach((slide) => {
    // --- Column 1: Background media (image or video) ---
    const mediaCell = document.createDocumentFragment();

    // Field hint for media_image
    mediaCell.appendChild(document.createComment(' field:media_image '));

    // Try background image first
    const bgImage = slide.querySelector('figure.BackgroundImage_BackgroundImage___Q46_ img, figure picture img');
    // Try background video as fallback
    const bgVideo = slide.querySelector('div.BackgroundVideo_BackgroundVideo__8IdSr video source, video source');

    if (bgImage) {
      const img = document.createElement('img');
      const src = bgImage.getAttribute('src') || '';
      img.setAttribute('src', src);
      const alt = bgImage.getAttribute('alt') || '';
      if (alt) img.setAttribute('alt', alt);
      mediaCell.appendChild(img);
    } else if (bgVideo) {
      const videoSrc = bgVideo.getAttribute('src') || '';
      const link = document.createElement('a');
      link.setAttribute('href', videoSrc);
      link.textContent = videoSrc;
      mediaCell.appendChild(link);
    }

    // --- Column 2: Content (heading + description + CTA) ---
    const contentCell = document.createDocumentFragment();

    // Field hint for content_text
    contentCell.appendChild(document.createComment(' field:content_text '));

    const article = slide.querySelector('article.container, article');

    if (article) {
      // Extract heading
      const heading = article.querySelector('h1, h2, h3');
      if (heading) {
        const h = document.createElement('h1');
        h.textContent = heading.textContent.trim();
        contentCell.appendChild(h);
      }

      // Extract description paragraph
      const description = article.querySelector('p');
      if (description) {
        const p = document.createElement('p');
        p.innerHTML = description.innerHTML;
        contentCell.appendChild(p);
      }

      // Extract CTA link
      const ctaLink = article.querySelector('footer a, a.TextLink_TextLink__It7K_');
      if (ctaLink) {
        const a = document.createElement('a');
        a.setAttribute('href', ctaLink.getAttribute('href') || '');
        // Get text from span inside the link, or the link text itself
        const linkText = ctaLink.querySelector('span');
        a.textContent = linkText ? linkText.textContent.trim() : ctaLink.textContent.trim();
        const p2 = document.createElement('p');
        p2.appendChild(a);
        contentCell.appendChild(p2);
      }
    }

    // Each slide is a row with 2 columns: [media, content]
    cells.push([mediaCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
