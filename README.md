# Haoyi Zhao 学术主页

Haoyi Zhao 的中英双语学术主页，采用白色期刊衬线设计。页面将研究生阶段的时间序列方向与本科阶段的低层视觉背景分开呈现。

## 页面入口

- `/`：英文主页
- `/zh`：中文主页
- 页面顶部的 `EN / 中文` 用于切换中英文版本
- `/versions`：五个设计版本的对比入口
- 五个版本分别位于 `/editorial`、`/lab-grid`、`/archive`、`/orbit` 和 `/swiss-index`

启动后访问 `http://localhost:3000` 查看英文主页，访问 `http://localhost:3000/zh` 查看中文主页。版本对比页为 `http://localhost:3000/versions`。

## 内容维护

- 双语内容与共享资料：`app/profile-data.ts`
- 页面结构与论文图片引用：`app/site-components.tsx`
- 页面标题、描述与社交分享元数据：`app/layout.tsx`
- 动漫头像：`public/images/haoyi-avatar-anime.png`
- 论文图片目录：`public/images/papers/`
- EvTSR 论文框架图：`public/images/papers/evtsr-framework.png`
- 当前社交分享图：`public/og.png`

`app/profile-data.ts` 将资料分成共享事实与双语文案：

- `profile` 保存姓名、缩写、邮箱、OpenReview 和 DBLP 等不随语言变化的个人信息。
- `publications` 保存论文标题、作者、会议或期刊、年份及链接等共享元数据。论文标题、作者和会议/期刊名统一保留英文。
- `contentByLocale.en` 与 `contentByLocale.zh` 分别保存英文和中文文案，包括个人简介、研究方向、动态、论文说明、实习经历、教育经历与荣誉奖励。

更新事实信息时只修改对应的共享数据；更新文字内容时同步维护 `en` 和 `zh`。新增论文时，在 `PublicationId` 中加入固定 ID，在 `publications` 中补充共享元数据，并在两种语言的 `publicationCopy` 中使用同一 ID 添加摘要与备注。

## 本地运行

需要 Node.js 22.13.0 或更高版本。

```bash
npm install
npm run dev
```

## 测试

```bash
npm test
```

项目当前以本地使用和内容确认优先，尚未部署到线上。
