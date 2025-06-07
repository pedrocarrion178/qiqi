# 奇门遁甲在线排盘系统

![奇门遁甲在线排盘系统](screenshots/index_html_2025-06-07_14-07-39_4967.webp)

一个功能完善的奇门遁甲在线排盘网页应用，支持用户输入出生时间，自动生成奇门盘，并提供详细解读。

## 功能特点

- **用户输入**：支持输入出生年月日时辰
- **阴阳遁选择**：支持选择阴遁或阳遁
- **奇门盘生成**：自动生成包含天盘、地盘、八门、九星、八神的奇门盘
- **九宫格展示**：以九宫格形式直观展示排盘结果
- **整体解读**：提供生活化语言的整体运势解读
- **宫位详解**：支持点击查看每个宫位的详细解读
- **响应式设计**：兼容PC和移动设备

## 技术栈

- **前端**：HTML5 + CSS3 + JavaScript
- **排盘算法**：纯JavaScript实现
- **UI设计**：响应式设计，支持各种设备

## 快速开始

### 在线体验

访问 [奇门遁甲在线排盘系统](https://your-domain.com) 立即体验。

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/your-username/qimen-project.git
cd qimen-project
```

2. 使用浏览器打开
```bash
# 如果你有Python
python -m http.server 8000

# 如果你有Node.js
npx serve
```

3. 在浏览器中访问 `http://localhost:8000` 或 `http://localhost:3000`

## 使用指南

1. **输入基本信息**：在左侧输入区域填写出生年月日时辰
2. **选择遁类**：选择阴遁或阳遁（如不确定，可选择阳遁）
3. **生成奇门盘**：点击"生成奇门盘"按钮
4. **查看排盘结果**：在右侧查看生成的奇门盘
5. **查看整体解读**：在下方查看整体运势解读
6. **查看宫位详解**：点击任意宫位查看详细解读

详细使用说明请参考 [用户指南](user_guide.md)。

## 项目结构

```
qimen_project/
├── index.html              # 主页面
├── css/
│   ├── style.css           # 主样式文件
│   └── responsive.css      # 响应式样式文件
├── js/
│   ├── utils.js            # 工具函数库
│   ├── qimen-core.js       # 奇门遁甲核心算法
│   ├── interpretation.js   # 解读内容生成
│   ├── validation.js       # 表单验证和错误处理
│   └── main.js             # 主程序
└── docs/
    ├── ui_design.md        # UI设计文档
    ├── qimen_basics.md     # 奇门遁甲基本原理
    ├── qimen_algorithm_design.md # 算法设计文档
    └── interpretation_design.md  # 解读内容设计文档
```

## 部署指南

如需将本项目部署到服务器或托管平台，请参考 [部署指南](deployment_guide.md)。

## 后续开发计划

我们计划在未来版本中添加以下功能：

- 多种排盘方法（三元、飞盘、转盘等）
- 用户账户系统，保存历史排盘记录
- 排盘结果导出（PDF、图片）
- 更详细的解读内容
- 专业术语解释系统

详细开发计划请参考 [后续开发建议](future_development.md)。

## 项目总结

关于项目的开发过程、技术实现和成果总结，请参考 [项目总结](project_summary.md)。

## 贡献指南

欢迎对本项目进行贡献！如果您有任何改进建议或功能需求，请：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参见 [LICENSE](LICENSE) 文件。

## 联系方式

- 项目维护者：您的姓名
- 电子邮件：your.email@example.com
- 项目链接：[GitHub](https://github.com/your-username/qimen-project)

## 致谢

- 感谢所有为奇门遁甲研究做出贡献的学者和专家
- 感谢开源社区提供的各种工具和资源
- 感谢所有使用和支持本项目的用户

