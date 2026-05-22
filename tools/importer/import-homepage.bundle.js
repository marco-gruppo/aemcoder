/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll("li.splide__slide");
    const cells = [];
    slides.forEach((slide) => {
      const mediaCell = document.createDocumentFragment();
      mediaCell.appendChild(document.createComment(" field:media_image "));
      const bgImage = slide.querySelector("figure.BackgroundImage_BackgroundImage___Q46_ img, figure picture img");
      const bgVideo = slide.querySelector("div.BackgroundVideo_BackgroundVideo__8IdSr video source, video source");
      if (bgImage) {
        const img = document.createElement("img");
        const src = bgImage.getAttribute("src") || "";
        img.setAttribute("src", src);
        const alt = bgImage.getAttribute("alt") || "";
        if (alt) img.setAttribute("alt", alt);
        mediaCell.appendChild(img);
      } else if (bgVideo) {
        const videoSrc = bgVideo.getAttribute("src") || "";
        const link = document.createElement("a");
        link.setAttribute("href", videoSrc);
        link.textContent = videoSrc;
        mediaCell.appendChild(link);
      }
      const contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(" field:content_text "));
      const article = slide.querySelector("article.container, article");
      if (article) {
        const heading = article.querySelector("h1, h2, h3");
        if (heading) {
          const h = document.createElement("h1");
          h.textContent = heading.textContent.trim();
          contentCell.appendChild(h);
        }
        const description = article.querySelector("p");
        if (description) {
          const p = document.createElement("p");
          p.innerHTML = description.innerHTML;
          contentCell.appendChild(p);
        }
        const ctaLink = article.querySelector("footer a, a.TextLink_TextLink__It7K_");
        if (ctaLink) {
          const a = document.createElement("a");
          a.setAttribute("href", ctaLink.getAttribute("href") || "");
          const linkText = ctaLink.querySelector("span");
          a.textContent = linkText ? linkText.textContent.trim() : ctaLink.textContent.trim();
          const p2 = document.createElement("p");
          p2.appendChild(a);
          contentCell.appendChild(p2);
        }
      }
      cells.push([mediaCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse2(element, { document }) {
    const bgImage = element.querySelector("figure.BackgroundImage_BackgroundImage___Q46_ img, figure img, picture img");
    const heading = element.querySelector("article h2, article h1, article h3, h2, h1");
    const cells = [];
    if (bgImage) {
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(" field:image "));
      imgFrag.appendChild(bgImage);
      cells.push([imgFrag]);
    } else {
      cells.push([""]);
    }
    const textFrag = document.createDocumentFragment();
    if (heading) {
      textFrag.appendChild(document.createComment(" field:text "));
      textFrag.appendChild(heading);
      cells.push([textFrag]);
    } else {
      cells.push([""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-service.js
  function parse3(element, { document }) {
    const articles = element.querySelectorAll("article.LauncherCardCta_LauncherCardCta__NVq5U");
    const cells = [];
    articles.forEach((article) => {
      const link = article.querySelector("a.LauncherCardCta_IconLink__g6TSV");
      if (!link) return;
      const titleEl = article.querySelector('.LauncherCardCta_title__WVdyH, div[class*="title"]');
      if (!titleEl || !titleEl.textContent.trim()) return;
      const imageCell = "";
      const textFrag = document.createDocumentFragment();
      const fieldHint = document.createComment(" field:text ");
      textFrag.appendChild(fieldHint);
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = titleEl.textContent.trim();
      textFrag.appendChild(anchor);
      cells.push([imageCell, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-service", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-casestudy.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll(
      ".ContentNewCase_smallerContent__smEhy, .ContentNewCase_biggerContent__3ipTz"
    );
    const cells = [];
    cards.forEach((card) => {
      const imgEl = card.querySelector("img");
      const title = card.querySelector(
        ".ContentNewCase_imageSmallerTitle__AAq_K, .ContentNewCase_imageBiggerTitle__QsWSu"
      );
      const descLink = card.querySelector(
        "a:has(.ContentNewCase_imageSmallerText__TeMGQ), a:has(.ContentNewCase_imageBiggerText__GUB2k)"
      );
      const category = card.querySelector(
        ".ContentNewCase_imageSmallerCategory__9Vh0s, .ContentNewCase_imageBiggerCategory__laInz"
      );
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (imgEl) {
        imageCell.appendChild(imgEl);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent;
        textCell.appendChild(h3);
      }
      if (descLink) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = descLink.href || descLink.getAttribute("href");
        a.textContent = descLink.textContent.trim();
        p.appendChild(a);
        textCell.appendChild(p);
      }
      if (category) {
        const catP = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = category.textContent;
        catP.appendChild(em);
        textCell.appendChild(catP);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-casestudy", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-split.js
  function parse5(element, { document }) {
    var _a, _b;
    const rightBox = element.querySelector('.LauncherDouble_rightBox__C8DKg, [class*="rightBox"]');
    const bgImage = rightBox ? rightBox.querySelector("figure.BackgroundImage_BackgroundImage___Q46_ img, figure img, picture img") : null;
    const cardTitle = rightBox ? rightBox.querySelector('.title-2, article .title-2, article div[class*="title"]') : null;
    const cardDescription = rightBox ? rightBox.querySelector("p.body-2, article p, article .body-2") : null;
    const cardLink = rightBox ? rightBox.querySelector('footer a, article footer a, a[class*="iconCta"]') : null;
    const leftBox = element.querySelector('.LauncherDouble_leftBox__ASeg6, [class*="leftBox"]');
    const heading = leftBox ? leftBox.querySelector('.HeadingTitle_LauncherDoubleTitle__S6Wo_, [class*="LauncherDoubleTitle"], [class*="HeadingTitle"]') : null;
    const subtitle = leftBox ? leftBox.querySelector('.LauncherDouble_subtitle__rYoH_ p span, .LauncherDouble_subtitle__rYoH_ p, [class*="subtitle"] p span, [class*="subtitle"] p') : null;
    const ctaLink = leftBox ? leftBox.querySelector('footer a.TextLink_TextLink__It7K_, footer a[class*="TextLink"], footer a') : null;
    const col1Frag = document.createDocumentFragment();
    if (bgImage) {
      col1Frag.appendChild(bgImage);
    }
    if (cardTitle) {
      const h3 = document.createElement("h3");
      h3.textContent = cardTitle.textContent.trim();
      col1Frag.appendChild(h3);
    }
    if (cardDescription) {
      const p = document.createElement("p");
      p.textContent = cardDescription.textContent.trim();
      col1Frag.appendChild(p);
    }
    if (cardLink) {
      const link = document.createElement("a");
      link.href = cardLink.href || cardLink.getAttribute("href") || "";
      link.textContent = cardLink.textContent.trim() || ((_a = cardLink.querySelector("span")) == null ? void 0 : _a.textContent.trim()) || "Learn more";
      col1Frag.appendChild(link);
    }
    const col2Frag = document.createDocumentFragment();
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      col2Frag.appendChild(h2);
    }
    if (subtitle) {
      const p = document.createElement("p");
      p.textContent = subtitle.textContent.trim();
      col2Frag.appendChild(p);
    }
    if (ctaLink) {
      const link = document.createElement("a");
      link.href = ctaLink.href || ctaLink.getAttribute("href") || "";
      const ctaText = ((_b = ctaLink.querySelector("span.cta-1, span")) == null ? void 0 : _b.textContent.trim()) || ctaLink.textContent.trim() || "Learn more";
      link.textContent = ctaText;
      col2Frag.appendChild(link);
    }
    const cells = [
      [col1Frag, col2Frag]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-split", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-video.js
  function parse6(element, { document }) {
    const videoSource = element.querySelector("div.BackgroundVideo_BackgroundVideo__8IdSr video source, video source");
    const videoUrl = videoSource ? videoSource.getAttribute("src") : "";
    let mediaElement = null;
    if (videoUrl) {
      mediaElement = document.createElement("a");
      mediaElement.href = videoUrl;
      mediaElement.textContent = videoUrl;
    }
    const heading = element.querySelector("article.launcherContainer h2, article h2, h2");
    const ctaLink = element.querySelector("article.launcherContainer footer a, article footer a, footer a");
    const textContent = [];
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      textContent.push(h2);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const link = document.createElement("a");
      link.href = ctaLink.getAttribute("href");
      const spanText = ctaLink.querySelector("span");
      link.textContent = spanText ? spanText.textContent.trim() : ctaLink.textContent.trim();
      p.appendChild(link);
      textContent.push(p);
    }
    const cells = [];
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(" field:image "));
    if (mediaElement) {
      imageCell.appendChild(mediaElement);
    }
    cells.push([imageCell]);
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    textContent.forEach((el) => textCell.appendChild(el));
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/vargroup-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#CybotCookiebotDialog"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header.Header_Header___gYgB"]);
      WebImporter.DOMUtils.remove(element, ["footer#main-footer"]);
      WebImporter.DOMUtils.remove(element, ['div[class*="Spacer_Spacer"]']);
      WebImporter.DOMUtils.remove(element, ["iframe"]);
    }
  }

  // tools/importer/transformers/vargroup-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function resolveSection(element, selectorValue) {
    if (Array.isArray(selectorValue)) {
      for (const sel of selectorValue) {
        const el = element.querySelector(sel);
        if (el) return el;
      }
      const firstSel = selectorValue[0];
      const nthMatch = firstSel.match(/^(.+):nth-of-type\((\d+)\)$/);
      if (nthMatch) {
        const baseSelector = nthMatch[1];
        const index = parseInt(nthMatch[2], 10) - 1;
        const allMatches = element.querySelectorAll(baseSelector);
        if (allMatches.length > index) return allMatches[index];
      }
      const lastSel = selectorValue.find((s) => s.includes(":last-of-type"));
      if (lastSel) {
        const baseSelector = lastSel.replace(/:last-of-type$/, "");
        const allMatches = element.querySelectorAll(baseSelector);
        if (allMatches.length > 0) return allMatches[allMatches.length - 1];
      }
      return null;
    }
    return element.querySelector(selectorValue);
  }
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = resolveSection(element, section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "hero-banner": parse2,
    "cards-service": parse3,
    "cards-casestudy": parse4,
    "columns-split": parse5,
    "hero-video": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Var Group corporate homepage with hero, services overview, and company information",
    urls: ["https://www.vargroup.com/"],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["section.HeaderHomepage_HeaderHomepage__BSyAP"]
      },
      {
        name: "hero-banner",
        instances: [".LauncherLargeCardCta_textContainer__WFl1l"]
      },
      {
        name: "cards-service",
        instances: [".LauncherCardList_LauncherCardList__RAAB_"]
      },
      {
        name: "cards-casestudy",
        instances: ["section.ContentNewCase_ContentNewCaseContainer__ly98L"]
      },
      {
        name: "columns-split",
        instances: ["section.LauncherDouble_LauncherDouble__OteTD"]
      },
      {
        name: "hero-video",
        instances: ["section.LauncherLarge_LauncherLarge__Al6bc"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: "section.HeaderHomepage_HeaderHomepage__BSyAP",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Company Introduction",
        selector: "section.LauncherTextMedium_LauncherTextMedium__ZisFK",
        style: null,
        blocks: [],
        defaultContent: [
          "section.LauncherTextMedium_LauncherTextMedium__ZisFK h1",
          "section.LauncherTextMedium_LauncherTextMedium__ZisFK .LauncherTextMedium_text__G_Jvt",
          "section.LauncherTextMedium_LauncherTextMedium__ZisFK footer a"
        ]
      },
      {
        id: "section-3",
        name: "Services Banner and Card Grid",
        selector: "section.LauncherLargeCardCta_LauncherLargeCardCta__uSZUa",
        style: null,
        blocks: ["hero-banner", "cards-service"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Case History Introduction",
        selector: "section.LauncherTextSmall_LauncherTextSmall__VhmE1",
        style: null,
        blocks: [],
        defaultContent: [
          "section.LauncherTextSmall_LauncherTextSmall__VhmE1 h4",
          "section.LauncherTextSmall_LauncherTextSmall__VhmE1 footer a"
        ]
      },
      {
        id: "section-5",
        name: "Case Studies Grid",
        selector: "section.ContentNewCase_ContentNewCaseContainer__ly98L",
        style: null,
        blocks: ["cards-casestudy"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Careers Split Layout",
        selector: ["section.LauncherDouble_LauncherDouble__OteTD:nth-of-type(1)", "section.LauncherDouble_LauncherDouble__OteTD:first-of-type"],
        style: null,
        blocks: ["columns-split"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Sustainability Split Layout",
        selector: ["section.LauncherDouble_LauncherDouble__OteTD:nth-of-type(2)", "section.LauncherDouble_LauncherDouble__OteTD:last-of-type"],
        style: null,
        blocks: ["columns-split"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Values Video Background",
        selector: "section.LauncherLarge_LauncherLarge__Al6bc",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
