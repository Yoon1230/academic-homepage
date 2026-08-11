import assert from "node:assert/strict";
import test from "node:test";

const publicationTitles = [
  "Event-Based Dynamic Turbulence Mitigation",
  "Event-Guided Scene Text Image Super-Resolution",
];

const sharedExternalLinks = [
  "mailto:2022217449@mail.hfut.edu.cn",
  "https://openreview.net/profile?id=%7EHaoyi_Zhao3",
  "https://dblp.org/pid/244/7578",
  "https://ieeexplore.ieee.org/document/11316432",
  "https://doi.org/10.1109/LSP.2025.3648967",
  "https://openreview.net/forum?id=YOrxqpVsJ5",
  "https://openreview.net/pdf?id=YOrxqpVsJ5",
  "https://doi.org/10.1609/aaai.v40i10.37801",
  "https://github.com/codes81/EVTSR",
];

const comparisonPages = [
  ["/editorial", "academic-classic"],
  ["/lab-grid", "academic-blue"],
  ["/archive", "academic-serif"],
  ["/orbit", "academic-teal"],
  ["/swiss-index", "academic-modern"],
  ["/prism", "academic-prism"],
];

const htmlCache = new Map();

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function renderHtml(pathname) {
  if (!htmlCache.has(pathname)) {
    htmlCache.set(
      pathname,
      (async () => {
        const response = await render(pathname);
        assert.equal(response.status, 200);
        assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
        return response.text();
      })(),
    );
  }

  return htmlCache.get(pathname);
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];
}

function getTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function getMetaContent(html, attribute, value) {
  const tag = getTags(html, "meta").find(
    (candidate) => getAttribute(candidate, attribute)?.toLowerCase() === value.toLowerCase(),
  );

  assert.ok(tag, `missing metadata ${attribute}=${value}`);
  const content = getAttribute(tag, "content");
  assert.ok(content, `missing content for metadata ${attribute}=${value}`);
  return content;
}

function getLinkTag(html, predicate, message) {
  const tag = getTags(html, "link").find(predicate);
  assert.ok(tag, message);
  return tag;
}

function assertAbsoluteUrl(value, expectedPathname) {
  const url = new URL(value);
  assert.match(url.protocol, /^https?:$/);
  assert.equal(url.pathname, expectedPathname);
}

function assertAbsoluteSocialImages(html) {
  for (const [attribute, value] of [
    ["property", "og:image"],
    ["name", "twitter:image"],
  ]) {
    const content = getMetaContent(html, attribute, value);
    assertAbsoluteUrl(content, "/og.png");
  }
}

function assertLocalizedMetadata(html, { canonicalPath, locale }) {
  const canonicalTag = getLinkTag(
    html,
    (candidate) => getAttribute(candidate, "rel")?.toLowerCase() === "canonical",
    "missing canonical link",
  );
  assertAbsoluteUrl(getAttribute(canonicalTag, "href"), canonicalPath);

  for (const [hrefLang, expectedPathname] of [
    ["en", "/"],
    ["zh-CN", "/zh"],
    ["x-default", "/"],
  ]) {
    const alternateTag = getLinkTag(
      html,
      (candidate) =>
        getAttribute(candidate, "rel")?.toLowerCase() === "alternate" &&
        getAttribute(candidate, "hreflang")?.toLowerCase() === hrefLang.toLowerCase(),
      `missing hreflang=${hrefLang} alternate`,
    );
    assertAbsoluteUrl(getAttribute(alternateTag, "href"), expectedPathname);
  }

  assert.equal(getMetaContent(html, "property", "og:locale"), locale);
  assertAbsoluteSocialImages(html);
}

function assertLanguageSwitcher(html, activeLocale) {
  const switcher = html.match(
    /<div\b[^>]*class=["'][^"']*language-switcher[^"']*["'][^>]*>[\s\S]*?<\/div>/i,
  )?.[0];
  assert.ok(switcher, "missing server-rendered language switcher");

  const anchors = getTags(switcher, "a");
  const englishLink = anchors.find(
    (tag) => getAttribute(tag, "hreflang")?.toLowerCase() === "en",
  );
  const chineseLink = anchors.find(
    (tag) => getAttribute(tag, "hreflang")?.toLowerCase() === "zh-cn",
  );

  assert.ok(englishLink, "missing real English language link");
  assert.ok(chineseLink, "missing real Chinese language link");
  assert.equal(getAttribute(englishLink, "href"), "/#top");
  assert.equal(getAttribute(chineseLink, "href"), "/zh#top");
  assert.equal(getAttribute(englishLink, "lang"), "en");
  assert.equal(getAttribute(chineseLink, "lang"), "zh-CN");
  assert.equal(
    getAttribute(activeLocale === "en" ? englishLink : chineseLink, "aria-current"),
    "page",
  );
  assert.equal(
    getAttribute(activeLocale === "en" ? chineseLink : englishLink, "aria-current"),
    undefined,
  );
}

function assertAnchorTargets(html) {
  const navigation = html.match(
    /<nav\b[^>]*class=["'][^"']*section-navigation[^"']*["'][^>]*>[\s\S]*?<\/nav>/i,
  )?.[0];
  assert.ok(navigation, "missing section navigation");

  const hashes = getTags(navigation, "a").map((tag) => getAttribute(tag, "href"));
  assert.deepEqual(hashes, [
    "#top",
    "#about",
    "#news",
    "#publications",
    "#internships",
    "#education",
    "#honors",
  ]);

  for (const hash of hashes) {
    assert.match(html, new RegExp(`\\bid=["']${hash.slice(1)}["']`, "i"));
  }
}

function assertPageLanguage(html, locale, dataLocale) {
  const pageTag = getTags(html, "div").find((tag) =>
    getAttribute(tag, "class")?.split(/\s+/).includes("academic-page"),
  );
  assert.ok(pageTag, "missing academic page root");
  assert.equal(getAttribute(pageTag, "lang"), locale);
  assert.equal(getAttribute(pageTag, "data-locale"), dataLocale);
}

function assertPublicationContent(html) {
  const publicationEntries = html.match(
    /<article\b[^>]*class=["'][^"']*publication-entry[^"']*["'][^>]*>[\s\S]*?<\/article>/gi,
  ) ?? [];
  assert.equal(publicationEntries.length, 2);

  for (const title of publicationTitles) {
    assert.match(html, new RegExp(title));
  }

  for (const href of sharedExternalLinks) {
    assert.match(html, new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
  }

  assert.match(html, /\/images\/papers\/evtsr-framework\.png/);
  assert.match(html, /Framework figure pending author PDF|框架图待补充作者版 PDF/);
  assert.doesNotMatch(html, /\/images\/papers\/evturm-framework\.png/);
}

function assertRealEnglishProfile(html) {
  assert.match(html, /Haoyi Zhao/);
  assert.match(
    html,
    /Institute of Advanced Technology, University of Science and Technology of China/,
  );
  assert.match(html, /Starting Sep 2026/);
  assert.match(html, /\/images\/haoyi-avatar-anime\.png/);
  assertPublicationContent(html);
  assert.doesNotMatch(html, /Template|sample profile/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assertAbsoluteSocialImages(html);
}

function assertNoIndex(html) {
  const robots = getMetaContent(html, "name", "robots");
  assert.match(robots, /(?:^|,\s*)noindex(?:,|$)/i);
  assert.match(robots, /(?:^|,\s*)follow(?:,|$)/i);
}

test("server-renders the English Journal Serif homepage at /", async () => {
  const html = await renderHtml("/");

  assert.match(html, /<title>Haoyi Zhao \| Academic Homepage<\/title>/i);
  assert.match(html, /class=["'][^"']*academic-page academic-serif[^"']*["']/i);
  assert.match(html, /Incoming Master(?:&#x27;|')s Student/);
  assert.match(html, /About Me/);
  assert.match(html, /Time Series/);
  assert.match(html, /Low-level vision/);
  assert.match(html, /graduated in June 2026/);
  assert.match(html, /Internship Experience/);
  assert.match(html, /No internship experience yet\./);
  assert.match(html, /National Scholarship/);
  assert.match(
    html,
    /First-class University Scholarship · Outstanding Student · Outstanding Communist Youth League Member/,
  );
  assert.doesNotMatch(html, /Research Experience|Selected Projects/);
  assert.doesNotMatch(html, /class=["'][^"']*research-interests/);
  assert.match(html, /Last updated 11 August 2026/);
  assertPageLanguage(html, "en", "en");
  assertLanguageSwitcher(html, "en");
  assertAnchorTargets(html);
  assertLocalizedMetadata(html, {
    canonicalPath: "/",
    locale: "en_US",
  });
  assertRealEnglishProfile(html);
  assert.doesNotMatch(html, /Design preview/i);
});

test("server-renders the complete Chinese Journal Serif homepage at /zh", async () => {
  const html = await renderHtml("/zh");

  assert.match(html, /<title>赵豪宜｜学术主页<\/title>/);
  assert.match(html, /我将于 2026 年 9 月进入中国科学技术大学先进技术研究院/);
  assert.match(html, /代表性论文/);
  assert.match(html, /时间序列/);
  assert.match(html, /低层视觉/);
  assert.match(html, /2026 年 6 月毕业/);
  assert.match(html, /实习经历/);
  assert.match(html, /暂无实习经历。/);
  assert.match(html, /教育经历/);
  assert.match(html, /国家奖学金/);
  assert.match(html, /校一等奖学金 · 三好学生 · 优秀共青团员/);
  assert.doesNotMatch(html, /科研经历|项目经历/);
  assert.doesNotMatch(html, /class=["'][^"']*research-interests/);
  assert.match(html, /最后更新：2026年8月11日/);
  assertPageLanguage(html, "zh-CN", "zh");
  assertLanguageSwitcher(html, "zh");
  assertAnchorTargets(html);
  assertLocalizedMetadata(html, {
    canonicalPath: "/zh",
    locale: "zh_CN",
  });
  assertPublicationContent(html);
  assert.doesNotMatch(html, /Design preview/i);
  assert.doesNotMatch(html, /\uFFFD|锟斤拷|璧佃豹瀹|涓婚〉|鏈熷垔|Ã|Â|â€|鈥/);
});

test("English and Chinese homepages expose the same papers and external destinations", async () => {
  const [englishHtml, chineseHtml] = await Promise.all([renderHtml("/"), renderHtml("/zh")]);

  for (const title of publicationTitles) {
    assert.match(englishHtml, new RegExp(title));
    assert.match(chineseHtml, new RegExp(title));
  }

  for (const href of sharedExternalLinks) {
    const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(englishHtml, new RegExp(`href=["']${escapedHref}["']`));
    assert.match(chineseHtml, new RegExp(`href=["']${escapedHref}["']`));
  }

  assert.equal(
    (englishHtml.match(/<article class=["']publication-entry["']/gi) ?? []).length,
    2,
  );
  assert.equal(
    (chineseHtml.match(/<article class=["']publication-entry["']/gi) ?? []).length,
    2,
  );
});

test("server-renders the five-version overview at /versions and keeps it out of search", async () => {
  const html = await renderHtml("/versions");

  assert.match(html, /Design Archive/i);
  for (const name of [
    "Classic Compact",
    "Scholar Blue",
    "Journal Serif",
    "Research Teal",
    "Modern Academic",
  ]) {
    assert.match(html, new RegExp(name));
  }
  assert.equal(
    (html.match(/<article class=["'][^"']*academic-version-card[^"']*["']/gi) ?? [])
      .length,
    5,
  );
  assertNoIndex(html);
  assertAbsoluteSocialImages(html);
});

for (const [pathname, variantClass] of comparisonPages) {
  test(`server-renders real profile data at ${pathname} and marks the preview noindex`, async () => {
    const html = await renderHtml(pathname);

    assert.match(
      html,
      new RegExp(`class=["'][^"']*academic-page ${variantClass}[^"']*["']`, "i"),
    );
    assertRealEnglishProfile(html);
    assertNoIndex(html);
  });
}
