import Image from "next/image";
import {
  contentByLocale,
  profile,
  publications,
  versions,
  type Locale,
  type Publication,
  type VersionSlug,
} from "./profile-data";
import { VisitorCounter } from "./visitor-counter";

function Link({ href, ...props }: React.ComponentProps<"a">) {
  return <a href={href} {...props} />;
}

const uiByLocale = {
  en: {
    navLabel: "Academic homepage sections",
    languageLabel: "Choose language",
    navigation: [
      ["Homepage", "#top"],
      ["About", "#about"],
      ["News", "#news"],
      ["Publications", "#publications"],
      ["Education", "#education"],
      ["Honors", "#honors"],
    ],
    about: "About",
    news: "News",
    publications: "Selected Publications",
    publicationGroup: "Published Work",
    internships: "Internship Experience",
    internshipEmpty: "No internship experience yet.",
    education: "Education",
    honors: "Honors and Awards",
    interestsLabel: "Research interests",
    graduateFocus: "Graduate focus",
    undergraduateFocus: "Undergraduate background",
    portraitAlt: "Portrait of Haoyi Zhao",
    frameworkPending: "Framework figure pending",
    dateSeparator: ":",
    institutionShort: "USTC · Institute of Advanced Technology",
    updated: "Last updated 11 August 2026",
    viewSelected: "View selected homepage →",
  },
  zh: {
    navLabel: "学术主页栏目",
    languageLabel: "选择语言",
    navigation: [
      ["首页", "#top"],
      ["关于", "#about"],
      ["动态", "#news"],
      ["论文", "#publications"],
      ["教育", "#education"],
      ["荣誉", "#honors"],
    ],
    about: "关于",
    news: "动态",
    publications: "代表性论文",
    publicationGroup: "已发表成果",
    internships: "实习经历",
    internshipEmpty: "暂无实习经历。",
    education: "教育经历",
    honors: "荣誉与奖项",
    interestsLabel: "研究方向",
    graduateFocus: "研究生方向",
    undergraduateFocus: "本科方向",
    portraitAlt: "赵浩宜的个人头像",
    frameworkPending: "框架图待补充",
    dateSeparator: "：",
    institutionShort: "中国科大 · 先进技术研究院",
    updated: "最后更新于 2026 年 8 月 11 日",
    viewSelected: "查看正式主页 →",
  },
} as const;

const versionNames: Record<VersionSlug, string> = {
  editorial: "Classic Compact",
  "lab-grid": "Scholar Blue",
  archive: "Journal Serif",
  orbit: "Research Teal",
  "swiss-index": "Modern Academic",
  prism: "PRISM",
};

function VersionSwitcher({ current }: { current?: VersionSlug }) {
  return (
    <nav className="version-switcher" aria-label="Switch homepage version">
      <Link className="switcher-home" href="/versions">← archive</Link>
      <span className="switcher-rule" aria-hidden="true" />
      {versions.map((version) => (
        <Link
          key={version.slug}
          href={`/${version.slug}`}
          aria-current={current === version.slug ? "page" : undefined}
          title={versionNames[version.slug]}
        >
          {version.number}
        </Link>
      ))}
    </nav>
  );
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const ui = uiByLocale[locale];
  return (
    <div className="language-switcher" role="group" aria-label={ui.languageLabel}>
      <Link href="/#top" hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
      <span aria-hidden="true">/</span>
      <Link href="/zh#top" hrefLang="zh-CN" lang="zh-CN" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
    </div>
  );
}

function TopNavigation({ locale }: { locale: Locale }) {
  const ui = uiByLocale[locale];
  return (
    <header className="academic-topbar">
      <div className="academic-topbar-inner">
        <nav className="section-navigation" aria-label={ui.navLabel}>
          {ui.navigation.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        </nav>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}

function ProfileSidebar({ locale, preview }: { locale: Locale; preview?: string }) {
  const content = contentByLocale[locale];
  const ui = uiByLocale[locale];
  const contactItems = [
    { icon: "LAB", label: ui.institutionShort },
    { icon: "LOC", label: content.location },
    { icon: "@", label: profile.email, href: `mailto:${profile.email}` },
    { icon: "OR", label: "OpenReview", href: profile.openReview },
    { icon: "DB", label: "DBLP", href: profile.dblp },
  ];

  return (
    <aside className="profile-sidebar">
      <div className="profile-photo profile-portrait">
        <Image src="/images/haoyi-avatar.jpg" alt={ui.portraitAlt} fill priority sizes="(max-width: 650px) 102px, 138px" />
      </div>
      <h1>{profile.name} <span>({profile.chineseName})</span></h1>
      <p className="profile-role">{content.role}</p>
      <p className="profile-field">{content.field}</p>
      <ul className="profile-links">
        {contactItems.map((item) => (
          <li key={item.label}>
            <span aria-hidden="true">{item.icon}</span>
            {item.href ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.label}</a> : item.label}
          </li>
        ))}
      </ul>
      {preview && <div className="sidebar-note"><b>{preview}</b><Link href="/">{ui.viewSelected}</Link></div>}
    </aside>
  );
}

function SectionHeading({ icon, children }: { icon: string; children: React.ReactNode }) {
  return <h2 className="section-heading"><span aria-hidden="true">{icon}</span>{children}</h2>;
}

const bioHighlights: Record<Locale, string[]> = {
  en: ["September 2026", "University of Science and Technology of China", "2022 to 2026", "Hefei University of Technology", "time series", "low-level vision"],
  zh: ["2026 年 9 月", "中国科学技术大学先进技术研究院", "2022 至 2026 年", "合肥工业大学", "时间序列", "低层视觉"],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function EmphasizedBiography({ locale }: { locale: Locale }) {
  const phrases = bioHighlights[locale];
  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "g");
  return contentByLocale[locale].bio.map((paragraph) => (
    <p key={paragraph}>
      {paragraph.split(pattern).map((part, index) => phrases.includes(part) ? <strong className="key-phrase" key={`${part}-${index}`}>{part}</strong> : part)}
    </p>
  ));
}

function PublicationVisual({ publication, locale }: { publication: Publication; locale: Locale }) {
  const ui = uiByLocale[locale];
  return (
    <div className="publication-figure publication-figure-real framework-visual">
      {publication.frameworkImage ? <Image src={publication.frameworkImage} alt={`${publication.title} framework`} fill sizes="(max-width: 650px) 100vw, 300px" /> : <div className="framework-placeholder" role="img" aria-label={ui.frameworkPending}><span>{publication.tag}</span></div>}
      <span className="figure-tag">{publication.tag}</span>
    </div>
  );
}

function PublicationAuthors({ authors }: { authors: string[] }) {
  return <p className="publication-authors">{authors.map((author, index) => <span key={author}>{author === profile.name ? <strong>{author}</strong> : author}{index < authors.length - 1 ? ", " : ""}</span>)}</p>;
}

function PublicationEntry({ publication, locale }: { publication: Publication; locale: Locale }) {
  const localizedCopy = contentByLocale[locale].publicationCopy[publication.id];
  return (
    <article className="publication-entry">
      <PublicationVisual publication={publication} locale={locale} />
      <div className="publication-copy">
        <a className="publication-title" href={publication.url} target="_blank" rel="noreferrer">{publication.title}</a>
        <PublicationAuthors authors={publication.authors} />
        <p className="publication-venue">{publication.venue}, {publication.year}.</p>
        <ul><li>{localizedCopy.summary}</li></ul>
        <div className="paper-links">
          <a href={publication.url} target="_blank" rel="noreferrer">{publication.type === "Journal" ? "IEEE Xplore" : "OpenReview"}</a>
          {publication.pdfUrl && <a href={publication.pdfUrl} target="_blank" rel="noreferrer">PDF</a>}
          {publication.doiUrl && <a href={publication.doiUrl} target="_blank" rel="noreferrer">DOI</a>}
          {publication.codeUrl && <a href={publication.codeUrl} target="_blank" rel="noreferrer">Code</a>}
          <strong>{localizedCopy.note}</strong>
        </div>
      </div>
    </article>
  );
}

function Publications({ locale }: { locale: Locale }) {
  const ui = uiByLocale[locale];
  return (
    <section id="publications" className="academic-section publication-section">
      <SectionHeading icon="▸">{ui.publications}</SectionHeading>
      <div className="publication-group">
        <h3><span aria-hidden="true">◆</span>{ui.publicationGroup}</h3>
        {publications.map((publication) => <PublicationEntry publication={publication} locale={locale} key={publication.id} />)}
      </div>
    </section>
  );
}

function AcademicRecords({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale];
  const ui = uiByLocale[locale];
  return (
    <>
      <section id="internships" className="academic-section compact-section"><SectionHeading icon="–">{ui.internships}</SectionHeading><div className="empty-record" aria-live="polite"><span aria-hidden="true">·</span><strong>{ui.internshipEmpty}</strong></div></section>
      <section id="education" className="academic-section compact-section"><SectionHeading icon="○">{ui.education}</SectionHeading><div className="record-list education-list">{content.education.map((item) => <article key={item.degree}><time>{item.years}</time><div><b>{item.degree}</b><span>{item.school}</span><small>{item.detail}</small></div></article>)}</div></section>
      <section id="honors" className="academic-section compact-section"><SectionHeading icon="✦">{ui.honors}</SectionHeading><div className="record-list honor-list">{content.honors.map((honor) => <article key={honor.title}><time>{honor.year}</time><div><b>{honor.title}</b><span>{honor.detail}</span></div></article>)}</div></section>
    </>
  );
}

function AcademicHomepage({ variant, current, locale = "en", preview }: { variant: string; current?: VersionSlug; locale?: Locale; preview?: string }) {
  const content = contentByLocale[locale];
  const ui = uiByLocale[locale];
  return (
    <div className={`academic-page academic-${variant}`} id="top" lang={locale === "zh" ? "zh-CN" : "en"} data-locale={locale}>
      <TopNavigation locale={locale} />
      <div className="academic-shell">
        <ProfileSidebar locale={locale} preview={preview} />
        <main className="academic-main">
          <section id="about" className="academic-section about-section"><SectionHeading icon="◈">{ui.about}</SectionHeading><EmphasizedBiography locale={locale} /></section>
          <section id="news" className="academic-section news-section"><SectionHeading icon="●">{ui.news}</SectionHeading><ul>{content.news.map((item) => <li key={item.date}><time>{item.date}{ui.dateSeparator}</time> {item.text}</li>)}</ul></section>
          <Publications locale={locale} />
          <AcademicRecords locale={locale} />
          <footer className="academic-footer"><span>{ui.updated}</span><VisitorCounter locale={locale} /><span>© 2026 {profile.name}</span></footer>
        </main>
      </div>
      {preview && <VersionSwitcher current={current} />}
    </div>
  );
}

function MiniAcademicPreview({ tone }: { tone: string }) {
  return <div className={`mini-academic mini-${tone}`} aria-hidden="true"><div className="mini-topnav"><i /><i /><i /><i /><i /></div><div className="mini-page-body"><aside><b>{profile.initials}</b><i /><i /><i /><i /><i /></aside><main><div className="mini-section-title"><b /><i /></div><p /><p /><p /><div className="mini-section-title"><b /><i /></div><ul><li /><li /></ul><div className="mini-section-title"><b /><i /></div><article><span /><div><i /><i /><i /></div></article><article><span /><div><i /><i /><i /></div></article></main></div></div>;
}

export function Gallery() {
  return (
    <main className="academic-gallery">
      <header className="gallery-topline"><div><b>{profile.name} · Academic Homepage</b><span>Design archive</span></div><Link href="/">Open current homepage →</Link></header>
      <section className="compact-gallery-hero"><p>Selected direction</p><h1>Seven studies in<br />academic presence.</h1><div><p>A small archive of interface directions built around the same research profile, publications, education, and milestones.</p><p>The latest iteration is PRISM Nova: a brighter, more editorial reading experience with the work at the center.</p></div></section>
      <section className="academic-version-grid" aria-label="Academic homepage versions">{versions.map((version) => <article className={`academic-version-card version-${version.tone}`} key={version.slug}><Link href={`/${version.slug}`}><MiniAcademicPreview tone={version.tone} /><div className="version-card-copy"><span>{version.number}</span><div><h2>{version.name}</h2><b>{version.chinese}{version.slug === "prism-nova" ? " · selected" : ""}</b><p>{version.description}</p></div><i aria-hidden="true">→</i></div></Link></article>)}</section>
      <footer className="gallery-footer"><span>Design archive · local preview</span><Link href="/">Open selected homepage</Link></footer>
    </main>
  );
}

export function EditorialSite() { return <AcademicHomepage variant="classic" current="editorial" preview="Design preview 01" />; }
export function LabGridSite() { return <AcademicHomepage variant="blue" current="lab-grid" preview="Design preview 02" />; }
export function ArchiveSite({ final = false, locale = "en" }: { final?: boolean; locale?: Locale }) { return <AcademicHomepage variant="serif" current="archive" locale={locale} preview={final ? undefined : "Selected design preview 03"} />; }
export function OrbitSite() { return <AcademicHomepage variant="teal" current="orbit" preview="Design preview 04" />; }
export function SwissIndexSite() { return <AcademicHomepage variant="modern" current="swiss-index" preview="Design preview 05" />; }
export function PrismSite() { return <AcademicHomepage variant="prism" current="prism" preview="Design preview 06" />; }
