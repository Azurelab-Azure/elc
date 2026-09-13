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




beta/
├── catalog.json                    # 数据总索引（核心）
├── README.md                       # 投稿说明
│
├── circuits/                       # 电路仿真 HTML
│   ├── three-phase/                # 三相电
│   │   ├── motor-start.html
│   │   ├── star-delta.html
│   │   ├── frequency-converter.html
│   │   ├── phase-sequence.html
│   │   └── reactive-power.html
│   ├── plc/                        # PLC
│   │   ├── conveyor-control.html
│   │   ├── traffic-light.html
│   │   ├── elevator-control.html
│   │   ├── water-level.html
│   │   └── sort-line.html
│   ├── basic/                      # 基础电路
│   │   ├── ohm-law.html
│   │   ├── rc-circuit.html
│   │   ├── rl-circuit.html
│   │   ├── rlc-series.html
│   │   └── diode-rectifier.html
│   └── advanced/                   # 高级电路
│       ├── pwm-control.html
│       ├── pid-controller.html
│       ├── svpwm.html
│       └── power-electronics.html
│
├── docs/                           # 文档 Markdown
│   ├── tutorials/                  # 教程
│   │   ├── three-phase-basics.md
│   │   ├── plc-programming.md
│   │   ├── motor-control.md
│   │   ├── inverter-principle.md
│   │   └── relay-logic.md
│   ├── references/                 # 参考
│   │   ├── component-datasheets/   # 元件手册
│   │   ├── standards/              # 标准
│   │   └── textbooks/              # 教材
│   ├── faq/                        # 常见问题
│   │   ├── how-to-submit.md
│   │   ├── how-to-use-simulator.md
│   │   ├── how-to-export-exe.md
│   │   └── troubleshooting.md
│   └── changelog.md                # 更新日志
│
├── images/                         # 图片资源
│   ├── schematics/                 # 原理图
│   ├── waveforms/                  # 波形图
│   ├── thumbnails/                 # 缩略图
│   └── models/                     # 3D 模型截图
│
├── animations/                     # Lottie 动画
│   ├── current-flow.json
│   ├── motor-rotation.json
│   ├── switch-toggle.json
│   └── indicator-light.json
│
└── simulations/                    # 仿真配置
    ├── three-phase-rules.json
    ├── plc-rules.json
    └── animation-rules.json

    


字段	类型	说明
id	string	唯一标识，用于筛选
name	string	显示名称
description	string	分类描述
icon	string	SVG path 图标数据
color	string	主题色（blue / purple / green / orange / red / indigo）
path	string	点击后跳转路由
itemCount	number	该分类下项目数量
circuits（电路）

字段	类型	说明
category	string	所属分类 id
fileName	string	HTML 文件名（不含扩展名）
title	string	显示标题
description	string	简短描述
complexity	string	难度：初级 / 中级 / 高级
author	string	作者
date	string	发布日期（YYYY-MM-DD）
simulationRules	string	关联的规则 id（可为空）
thumbnail	string	缩略图路径
documents（文档）

字段	类型	说明
category	string	子目录（tutorials / references / faq）
fileName	string	Markdown 文件名（不含扩展名）
title	string	显示标题
description	string	简短描述
type	string	类型：教程 / 参考 / FAQ
author	string	作者
date	string	发布日期
readTime	string	预计阅读时间
animations（动画）

字段	类型	说明
fileName	string	Lottie JSON 文件名
title	string	显示标题
description	string	描述
duration	number	时长（秒）
loop	boolean	是否循环
images（图片）

字段	类型	说明
category	string	子目录（schematics / waveforms / thumbnails）
fileName	string	图片文件名
title	string	显示标题
description	string	描述
