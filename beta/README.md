# Beta 数据收集区

本目录用于收集社区贡献的电路、文档、图片等资源。

## 目录结构
beta/
├── circuits/ # 电路图 HTML 文件
│ ├── three-phase/ # 三相电
│ ├── plc/ # PLC
│ ├── basic/ # 基础电路
│ └── advanced/ # 高级电路
├── docs/ # 文档 Markdown
│ ├── tutorials/ # 教程
│ ├── references/ # 参考
│ └── faq/ # 常见问题
├── images/ # 图片
│ ├── schematics/ # 原理图
│ ├── waveforms/ # 波形图
│ └── thumbnails/ # 缩略图
├── animations/ # Lottie 动画 JSON
├── simulations/ # 仿真规则 JSON
├── catalog.json # 数据索引
└── README.md # 本文件

text

## 如何投稿

1. 将电路 HTML 文件放入 `circuits/{分类}/` 目录
2. 将文档 Markdown 放入 `docs/{分类}/` 目录
3. 将图片放入 `images/{类型}/` 目录
4. 更新 `catalog.json` 添加元数据（可选）

## 注意事项

- 不要修改 `src/` 目录下的代码
- 不要删除他人的文件
- 文件命名使用英文小写和连字符