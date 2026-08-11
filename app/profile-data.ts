export type Locale = "en" | "zh";

export type PublicationId = "evturm" | "evtsr";

export type Publication = {
  id: PublicationId;
  year: string;
  title: string;
  authors: string[];
  venue: string;
  type: "Journal" | "Conference";
  tag: string;
  url: string;
  pdfUrl?: string;
  codeUrl?: string;
  doiUrl?: string;
  visual: "evturm" | "evtsr";
  frameworkImage?: string;
};

type LocalizedContent = {
  role: string;
  field: string;
  affiliation: string;
  location: string;
  bio: string[];
  researchInterests: string[];
  undergraduateDirection: string;
  news: Array<{ date: string; text: string }>;
  publicationCopy: Record<PublicationId, { summary: string; note: string }>;
  internships: Array<{
    years: string;
    role: string;
    organization: string;
    description: string;
  }>;
  education: Array<{
    years: string;
    degree: string;
    school: string;
    detail: string;
  }>;
  honors: Array<{ year: string; title: string; detail: string }>;
};

export const profile = {
  name: "Haoyi Zhao",
  chineseName: "赵豪宜",
  initials: "HZ",
  email: "zhaohaoiyi2004@gmail.com",
  openReview: "https://openreview.net/profile?id=%7EHaoyi_Zhao3",
  dblp: "https://dblp.org/pid/244/7578",
};

const sharedPublications = {
  evturm: {
    summary:
      "EvTurM uses event-derived motion cues to strengthen RGB structure and calibrate event and frame features for temporally consistent restoration under dynamic atmospheric turbulence.",
    note: "First author",
  },
  evtsr: {
    summary:
      "EvTSR combines event-guided high-frequency enhancement, text-guided low-frequency refinement, and cross-modal fusion to recover legible scene text in low-light and high-speed conditions.",
    note: "Poster",
  },
} satisfies Record<PublicationId, { summary: string; note: string }>;

export const contentByLocale = {
  en: {
    role: "Incoming Master's Student",
    field: "Computer Technology",
    affiliation:
      "Institute of Advanced Technology, University of Science and Technology of China",
    location: "Hefei, China",
    bio: [
      "I am an incoming master's student in Computer Technology at the Institute of Advanced Technology, University of Science and Technology of China, starting in September 2026. My graduate research direction is time series.",
      "I studied at Hefei University of Technology from 2022 to 2026 and graduated in June 2026. During my undergraduate study, I worked on low-level vision and event-based image restoration.",
    ],
    researchInterests: ["Time Series", "Event-based Vision", "Image Restoration"],
    undergraduateDirection: "Low-level vision",
    news: [
      {
        date: "Aug 2026",
        text: "I will begin my master's study in Computer Technology at the Institute of Advanced Technology, USTC, in September 2026.",
      },
      {
        date: "Jun 2026",
        text: "I graduated from Hefei University of Technology in June 2026.",
      },
      {
        date: "Mar 2026",
        text: "Our paper Event-Guided Scene Text Image Super-Resolution appeared at AAAI 2026.",
      },
      {
        date: "Dec 2025",
        text: "Our paper Event-Based Dynamic Turbulence Mitigation was published online in IEEE Signal Processing Letters.",
      },
    ],
    publicationCopy: sharedPublications,
    internships: [],
    education: [
      {
        years: "Starting Sep 2026",
        degree: "Master's Student in Computer Technology",
        school:
          "Institute of Advanced Technology, University of Science and Technology of China",
        detail: "Incoming student",
      },
      {
        years: "2022–2026",
        degree: "BSc in Computer Science and Technology",
        school: "Hefei University of Technology",
        detail: "Graduated in June 2026",
      },
    ],
    honors: [
      {
        year: "Undergraduate",
        title: "National Scholarship",
        detail:
          "National Scholarship, First-class University Scholarship, Outstanding Communist Youth League Member, Outstanding Student",
      },
    ],
  },
  zh: {
    role: "即将入读硕士研究生",
    field: "计算机技术",
    affiliation: "中国科学技术大学先进技术研究院",
    location: "中国，合肥",
    bio: [
      "我将于 2026 年 9 月进入中国科学技术大学先进技术研究院攻读计算机技术硕士，研究方向为时间序列。",
      "2022 至 2026 年，我在合肥工业大学完成本科阶段学习，并于 2026 年 6 月毕业。本科期间主要从事低层视觉与事件相机图像复原研究。",
    ],
    researchInterests: ["时间序列", "事件视觉", "图像复原"],
    undergraduateDirection: "低层视觉",
    news: [
      { date: "2026 年 8 月", text: "将于 2026 年 9 月进入中国科学技术大学先进技术研究院攻读计算机技术。" },
      { date: "2026 年 6 月", text: "从合肥工业大学本科毕业。" },
      { date: "2026 年 3 月", text: "论文 Event-Guided Scene Text Image Super-Resolution 发表于 AAAI 2026。" },
      { date: "2025 年 12 月", text: "论文 Event-Based Dynamic Turbulence Mitigation 在线发表于 IEEE Signal Processing Letters。" },
    ],
    publicationCopy: {
      evturm: {
        summary: "EvTurM 利用事件流中的运动线索增强 RGB 结构，并通过双向特征校准实现动态大气湍流场景下的时序一致复原。",
        note: "第一作者",
      },
      evtsr: {
        summary: "EvTSR 结合事件引导的高频增强、文本引导的低频细化与跨模态融合，提升低照度和高速场景下的文本图像可辨识性。",
        note: "Poster",
      },
    },
    internships: [],
    education: [
      {
        years: "2026 年 9 月起",
        degree: "计算机技术硕士研究生",
        school: "中国科学技术大学先进技术研究院",
        detail: "即将入学",
      },
      {
        years: "2022–2026",
        degree: "计算机科学与技术本科",
        school: "合肥工业大学",
        detail: "2026 年 6 月毕业",
      },
    ],
    honors: [
      {
        year: "本科期间",
        title: "国家奖学金",
        detail: "国家奖学金、校一等奖学金、优秀共青团员、优秀学生等。",
      },
    ],
  },
} satisfies Record<Locale, LocalizedContent>;

export const publications: Publication[] = [
  {
    id: "evturm",
    year: "2026",
    title: "Event-Based Dynamic Turbulence Mitigation",
    authors: ["Haoyi Zhao", "Zeyu Xiao", "Zihan Qi", "Yang Zhao", "Wei Jia"],
    venue: "IEEE Signal Processing Letters, vol. 33, pp. 564–568",
    type: "Journal",
    tag: "IEEE SPL 2026",
    url: "https://ieeexplore.ieee.org/document/11316432",
    pdfUrl: "/papers/Event-Based_Dynamic_Turbulence_Mitigation.pdf",
    codeUrl: "https://github.com/yoon670/EvTurM",
    doiUrl: "https://doi.org/10.1109/LSP.2025.3648967",
    frameworkImage: "/images/papers/evturm-cover.png",
    visual: "evturm",
  },
  {
    id: "evtsr",
    year: "2026",
    title: "Event-Guided Scene Text Image Super-Resolution",
    authors: ["Zihan Qi", "Zeyu Xiao", "Haoyi Zhao", "Yang Zhao", "Feng Xue", "Wei Jia"],
    venue: "The Fortieth AAAI Conference on Artificial Intelligence, pp. 8502–8510",
    type: "Conference",
    tag: "AAAI 2026",
    url: "https://openreview.net/forum?id=YOrxqpVsJ5",
    pdfUrl: "https://openreview.net/pdf?id=YOrxqpVsJ5",
    codeUrl: "https://github.com/codes81/EVTSR",
    doiUrl: "https://doi.org/10.1609/aaai.v40i10.37801",
    frameworkImage: "/images/papers/evtsr-framework.png",
    visual: "evtsr",
  },
];

export const versions = [
  {
    slug: "editorial",
    number: "01",
    name: "Classic Compact",
    chinese: "经典风格",
    description: "A compact journal-inspired layout for a clear academic homepage.",
    tone: "classic",
  },
  {
    slug: "lab-grid",
    number: "02",
    name: "Scholar Blue",
    chinese: "实验室科技",
    description: "A blue research-lab card layout with a denser information rhythm.",
    tone: "blue",
  },
  {
    slug: "archive",
    number: "03",
    name: "Journal Serif",
    chinese: "期刊衬线",
    description: "A long-form serif layout that gives publications priority.",
    tone: "serif",
  },
  {
    slug: "orbit",
    number: "04",
    name: "Research Teal",
    chinese: "研究星图",
    description: "A thematic layout built around research topics and timelines.",
    tone: "teal",
  },
  {
    slug: "swiss-index",
    number: "05",
    name: "Modern Academic",
    chinese: "瑞士式索引",
    description: "A restrained grid with large typographic indexing.",
    tone: "modern",
  },
  {
    slug: "prism",
    number: "06",
    name: "PRISM",
    chinese: "PRISM",
    description: "A clean serif–sans pairing with a concise profile-first structure.",
    tone: "prism",
  },
] as const;

export type VersionSlug = (typeof versions)[number]["slug"];
