/* eslint-disable */
/* global WebImporter */

import carouselHeroParser from './parsers/carousel-hero.js';
import heroBannerParser from './parsers/hero-banner.js';
import cardsServiceParser from './parsers/cards-service.js';
import cardsCasestudyParser from './parsers/cards-casestudy.js';
import columnsSplitParser from './parsers/columns-split.js';
import heroVideoParser from './parsers/hero-video.js';

import vargroupCleanupTransformer from './transformers/vargroup-cleanup.js';
import vargroupSectionsTransformer from './transformers/vargroup-sections.js';

const parsers = {
  'carousel-hero': carouselHeroParser,
  'hero-banner': heroBannerParser,
  'cards-service': cardsServiceParser,
  'cards-casestudy': cardsCasestudyParser,
  'columns-split': columnsSplitParser,
  'hero-video': heroVideoParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Var Group corporate homepage with hero, services overview, and company information',
  urls: ['https://www.vargroup.com/'],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['section.HeaderHomepage_HeaderHomepage__BSyAP'],
    },
    {
      name: 'hero-banner',
      instances: ['.LauncherLargeCardCta_textContainer__WFl1l'],
    },
    {
      name: 'cards-service',
      instances: ['.LauncherCardList_LauncherCardList__RAAB_'],
    },
    {
      name: 'cards-casestudy',
      instances: ['section.ContentNewCase_ContentNewCaseContainer__ly98L'],
    },
    {
      name: 'columns-split',
      instances: ['section.LauncherDouble_LauncherDouble__OteTD'],
    },
    {
      name: 'hero-video',
      instances: ['section.LauncherLarge_LauncherLarge__Al6bc'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: 'section.HeaderHomepage_HeaderHomepage__BSyAP',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Company Introduction',
      selector: 'section.LauncherTextMedium_LauncherTextMedium__ZisFK',
      style: null,
      blocks: [],
      defaultContent: [
        'section.LauncherTextMedium_LauncherTextMedium__ZisFK h1',
        'section.LauncherTextMedium_LauncherTextMedium__ZisFK .LauncherTextMedium_text__G_Jvt',
        'section.LauncherTextMedium_LauncherTextMedium__ZisFK footer a',
      ],
    },
    {
      id: 'section-3',
      name: 'Services Banner and Card Grid',
      selector: 'section.LauncherLargeCardCta_LauncherLargeCardCta__uSZUa',
      style: null,
      blocks: ['hero-banner', 'cards-service'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Case History Introduction',
      selector: 'section.LauncherTextSmall_LauncherTextSmall__VhmE1',
      style: null,
      blocks: [],
      defaultContent: [
        'section.LauncherTextSmall_LauncherTextSmall__VhmE1 h4',
        'section.LauncherTextSmall_LauncherTextSmall__VhmE1 footer a',
      ],
    },
    {
      id: 'section-5',
      name: 'Case Studies Grid',
      selector: 'section.ContentNewCase_ContentNewCaseContainer__ly98L',
      style: null,
      blocks: ['cards-casestudy'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Careers Split Layout',
      selector: ['section.LauncherDouble_LauncherDouble__OteTD:nth-of-type(1)', 'section.LauncherDouble_LauncherDouble__OteTD:first-of-type'],
      style: null,
      blocks: ['columns-split'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Sustainability Split Layout',
      selector: ['section.LauncherDouble_LauncherDouble__OteTD:nth-of-type(2)', 'section.LauncherDouble_LauncherDouble__OteTD:last-of-type'],
      style: null,
      blocks: ['columns-split'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'Values Video Background',
      selector: 'section.LauncherLarge_LauncherLarge__Al6bc',
      style: null,
      blocks: ['hero-video'],
      defaultContent: [],
    },
  ],
};

const transformers = [
  vargroupCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [vargroupSectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
