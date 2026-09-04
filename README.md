# Three Scope Map：地球进入中国 3D 地图示例

这是一个基于 Vue 3、TypeScript、Vite、Three.js 和 GSAP 的最小可运行示例。页面打开后先显示真实 Three.js 地球，点击中国区域后经过云层下钻动画进入中国 3D 地图，并支持继续下钻到省、市、区县。

本项目基于 [`three-scope-map`](https://github.com/songsummer920-dazzle/three-scope-map-skill) 技能内置的 `assets/templates/smart-mine-vue` 模板完成，没有用截图、SVG 平面图或重新编写的简化渲染器替代模板实现。

> 许可证与归属：`SPDX-License-Identifier: GPL-3.0-or-later`。原始项目作者全平台 ID：宋夏天Dazzle；公众号：送你整个夏天。发布或二次分发时请保留源码中的许可证、原始仓库地址和归属注释。

## 项目概况

| 项目 | 说明 |
| --- | --- |
| 默认入口 | Three.js 地球首屏 |
| 目标地图 | 中国国家级 3D 地图 |
| 下钻链路 | 中国 → 省 → 市 → 区县；区县为终点 |
| 主色 | `#2AF7FF` 蓝色科技风格 |
| 中国地图视角 | 约 70° 俯角 |
| 中国地图比例 | 在模板原始比例基础上放大约 20% |
| 本地 GeoJSON | 中国 35 个 Feature；浙江 11 个 Feature；世界 258 个 Feature |
| 下级数据 | 通过地图数据适配器按行政区划代码加载并缓存 |
| 适配方式 | 地图组件填满父容器，不写死 1920 × 1080 |

主要效果包括：

- 地球：星空、真实昼夜/法线/高光纹理、中国球面高程与侧墙、台湾侧墙、网格交点、扫描光、国际飞线、常态涟漪、大气边缘光、云层下钻，以及球面南海虚线。
- 中国 3D 地图：挤出厚度、侧边渐变、地形纹理、外部与内部边界、标签、悬停抬升、飞线、追光、HUD 底座环、相机视角保存/恢复和南海线框。
- 分级下钻：国家、省、市均可继续下钻，支持返回上级；切换层级时同步更新 GeoJSON、标签、边界、飞线、纹理范围与相机状态。
- 性能衔接：地球显示期间预热目标地图静态帧，交接完成后才启动中国地图的持续动画循环。

## 目录结构

```text
three-scope-map/
├─ src/
│  ├─ assets/
│  │  ├─ maps/                  # 中国、浙江、世界 GeoJSON 与地球渲染缓存
│  │  └─ textures/map/          # 地球、中国地形及过渡纹理
│  ├─ components/map/
│  │  ├─ EarthView.vue          # Three.js 地球入口
│  │  ├─ EarthChinaMap.vue      # 地球与中国地图的阶段协调器
│  │  ├─ ChinaMap.vue           # 中国地图入口包装组件
│  │  ├─ ZhejiangThreeMap.vue   # 多层级 Three.js 地图主体
│  │  ├─ mapDataAdapter.ts      # GeoJSON 缓存、预取和网络回退
│  │  ├─ mapTerrainMaterial.ts  # 地形材质与纹理加载
│  │  └─ mapTheme.ts            # 地球与地图共用主题源
│  ├─ App.vue                   # 默认挂载 EarthChinaMap
│  ├─ main.ts
│  └─ style.css
├─ package.json
├─ package-lock.json            # npm 锁文件
├─ pnpm-lock.yaml               # pnpm 锁文件
├─ vite.config.ts
└─ tsconfig.json
```

## 环境要求

- Node.js：`^20.19.0` 或 `>=22.12.0`
- npm：随符合要求的 Node.js 一起安装即可
- 浏览器：需支持 WebGL，建议使用当前稳定版 Chrome 或 Edge
- 下钻到未内置的省、市、区县时需要网络连接，以加载对应 GeoJSON

先检查 Node.js 版本：

```bash
node -v
npm -v
```

如果 Node.js 仍是 16 或更低版本，Vite 7 无法启动，应先升级 Node.js。

## 安装并使用 three-scope-map 技能

### 方法一：在 Codex 中让技能安装器完成安装

向 Codex 提交下面的提示词：

```text
请从 GitHub 安装这个 Codex skill：
https://github.com/songsummer920-dazzle/three-scope-map-skill
安装为 three-scope-map，并在安装后读取 SKILL.md。
```

安装完成后，在新的 Codex 任务或下一轮对话中使用 `$three-scope-map`。Codex 默认将个人技能安装在用户目录下的 `.codex/skills/three-scope-map`。

### 方法二：手动安装

PowerShell：

```powershell
git clone https://github.com/songsummer920-dazzle/three-scope-map-skill "$env:USERPROFILE\.codex\skills\three-scope-map"
```

macOS / Linux：

```bash
git clone https://github.com/songsummer920-dazzle/three-scope-map-skill ~/.codex/skills/three-scope-map
```

如果目标目录已存在，说明技能已经安装，不要再次克隆覆盖。可用下面的命令更新：

```powershell
git -C "$env:USERPROFILE\.codex\skills\three-scope-map" pull
```

## 从提示词生成本项目

### 1. 首次生成提示词

创建一个空目录，在该目录中打开 Codex，然后提交以下提示词。关键点是要求 Codex复制技能自带的完整模板，而不是从零生成相似页面。

```text
$three-scope-map

请你自动完成全部操作，我不懂开发。

要求：
1. 先读取 three-scope-map skill，并检查当前工作目录。
2. 如果当前目录不是前端项目，直接复制 skill 内置 assets/templates/smart-mine-vue 完整最小项目，不要重新生成相似实现。
3. 安装锁文件指定的依赖，并挂载 EarthChinaMap.vue 作为默认视图。
4. EarthView.vue、EarthChinaMap.vue、ChinaMap.vue、mapTheme.ts、GeoJSON 和纹理资源必须作为一个整体复制，不得从零重写或删减。
5. 页面打开后必须先显示真实 Three.js 地球，再点击中国进入现有中国 3D 地图。
6. 地球保留星空、真实纹理、中国立体高程与侧边厚度、网格交点、扫描光、国际飞线、常态涟漪、大气边缘光和云层下钻。
7. 中国 3D 地图保留挤出厚度、侧边渐变、地形纹理、外/内部边界、标签、hover 抬升、飞线、追光、HUD 底座环、视角保存/恢复和南海线框。
8. 使用共享主色 #E8FF4F；以后如果只给一句新颜色，仅修改 MAP_THEME_PRIMARY，并让地球与所有 3D 地图层级同步换色。
9. 除区县级外，每个地图层级都要支持下钻，默认链路为中国 -> 省 -> 市 -> 区县。
10. 地图组件填满父容器，不要把 .map-host 写死成 1920px x 1080px；如果需要 16:9，由外层容器控制。
11. 不要加入完整大屏、业务面板、图表、指标数据、个人路径、临时文件或预览地址。
12. 运行 scripts/verify_template_integrity.py，必须通过模板完整性检查。
13. 运行 scripts/check_three_map_project.py <项目目录> --strict，并修复所有非环境限制类 blocker。
14. 运行 npm run build，并通过 Vite dev server 做真实浏览器检查。
15. 浏览器验收覆盖：地球首屏、中国立体表面、台湾侧墙、球面南海虚线、网格扫描、国际飞线、地球到中国地图的 3D 衔接、各级下钻和返回上级。
16. 不要用截图、SVG、CSS 或 2D 平面 GeoJSON 替代 Three.js 地图；WebGL 真不可用时说明具体原因。
17. 完成后启动项目并告诉我本地访问地址；能自动判断的内容不要反复询问。
```

### 2. 调整为蓝色科技风格

生成完成后只需追加一句：

```text
主色想改成蓝色的科技风格
```

按照技能约束，这类一句话换色只应修改 `src/components/map/mapTheme.ts` 中的：

```ts
export const MAP_THEME_PRIMARY = '#2AF7FF';
```

也可以使用技能脚本：

```bash
python <技能目录>/scripts/apply_map_theme.py "#2AF7FF" <项目目录> --no-backup
```

不要对组件、着色器或 CSS 做全局颜色替换。地球和所有地图层级会从这个共享主色派生各自的描边、辉光、侧墙、标签、涟漪、飞线与 HUD 色彩。

### 3. 调整中国地图视角和尺寸

本示例后续使用的调整提示词是：

```text
第二级的中国地图页面，地图的视角太平了，看不清完整的地图，而且展示效果也没有地球效果好。

国家级相机俯角提高到 70°，地图整体放大约 20%。
```

最终国家级相机预设位于 `ZhejiangThreeMap.vue` 的 `cameraViewConfig.byScope.country`，地图比例从模板原始约 `0.70` 调整到 `0.84`，即放大约 20%。省、市、区县仍使用各自层级的响应式相机逻辑，不应被国家级参数一并覆盖。

### 4. 调整地名标签

最后使用的提示词是：

```text
地图上地名显示框有的太小了显示不全，而且文字还看不清。
```

本示例的处理结果：

- 根据地名字符数、当前相机距离和字体大小动态计算每个标签宽度。
- 长名称不再使用省略号，避免自治区、特别行政区等名称被截断。
- 提高字号下限、字重和不透明度。
- 加强黑色底部阴影与蓝色科技辉光，提高复杂地图背景上的可读性。
- 选中态与普通态共用同一套自适应宽度逻辑。

## 安装依赖

项目同时保留了 npm 与 pnpm 锁文件。请选择一种包管理器，并在同一工作区中始终使用同一种方式；不要交替更新两个锁文件。

推荐使用 npm，严格按 `package-lock.json` 安装：

```bash
npm ci
```

如果团队统一使用 pnpm：

```bash
pnpm install --frozen-lockfile
```

## 启动项目

### 本机和局域网访问

`package.json` 中的 `dev` 脚本已经监听 `0.0.0.0`：

```bash
npm run dev
```

默认端口通常为 `5173`。终端会显示：

```text
Local:   http://localhost:5173/
Network: http://<本机局域网 IP>:5173/
```

同一局域网内的其他设备可以打开 `Network` 地址。如果访问不到，请检查：

1. 两台设备是否连接同一个局域网。
2. Windows 防火墙是否允许 Node.js 或对应端口的入站访问。
3. 端口是否被其他程序占用。

指定端口启动：

```bash
npm run dev -- --port 5173
```

仅允许本机访问时：

```bash
npm run dev -- --host 127.0.0.1
```

停止服务：在运行开发服务器的终端中按 `Ctrl + C`。

### 生产构建与本地预览

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。该目录已经加入 `.gitignore`，应由 CI/CD 或部署环境重新构建，不需要提交到 Git。

## 操作方法

1. 打开页面后等待地球入场动画完成。
2. 移动鼠标到中国球面区域，可看到高亮反馈。
3. 点击中国，镜头通过云层下钻进入中国 3D 地图。
4. 点击省级区域进入省级地图，再依次点击市、区县。
5. 点击“返回上级”回到前一个层级。
6. 使用“保存统一 / 保存本层”记录当前视角。
7. 使用“恢复本层 / 恢复全部”恢复保存的相机视角。
8. 鼠标拖动可旋转视角，滚轮可缩放；地图会保持在父容器内响应式铺满。

## 主题修改

以后只需修改一个值：

```ts
// src/components/map/mapTheme.ts
export const MAP_THEME_PRIMARY = '#2AF7FF';
```

也可以向 Codex 直接提交一句颜色需求，例如：

```text
$three-scope-map 把主色改成 #8B5CFF，只修改 MAP_THEME_PRIMARY，并同步地球与所有 3D 地图层级。
```

## 验证项目

以下命令中的 `<技能目录>` 指已安装的 `three-scope-map` 技能目录，`<项目目录>` 指本项目根目录。

验证技能模板文件和二进制纹理未漂移：

```bash
python <技能目录>/scripts/verify_template_integrity.py
```

严格检查项目结构和效果约束：

```bash
python <技能目录>/scripts/check_three_map_project.py <项目目录> --strict
```

执行类型检查与生产构建：

```bash
npm run build
```

构建通过不等于视觉验收通过。还应通过 Vite 地址在真实浏览器中检查：

- 首屏确实是可交互 Three.js 地球，而不是图片或 2D 替代品。
- 中国球面高程、台湾侧墙、球面南海虚线、网格扫描和国际飞线可见。
- 地球进入中国地图的云层下钻和 3D 衔接正常。
- 中国地图立体表面、侧墙、边界、标签、飞线、追光和 HUD 环正常。
- 国家 → 省 → 市 → 区县下钻和返回上级正常。
- 长地名标签完整、清晰，无省略和裁切。
- 浏览器控制台没有项目运行时错误。

## 数据与网络说明

- `china.json`、`zhejiang.json`、`world.json` 和 `world.earth-render.json` 随项目发布，可离线显示地球、中国和内置的浙江数据。
- 其他省、市、区县数据由 `mapDataAdapter.ts` 根据行政区划代码请求 GeoJSON，并在当前页面会话中缓存。
- 如果需要完全离线部署，应提前下载所需层级 GeoJSON，并将其加入本地数据映射；不要用低层级数据简单拉伸冒充其他层级。
- 地球首屏使用精简后的 `world.earth-render.json`，原始 `world.json` 保留为源数据，避免多兆字节原始世界数据阻塞首屏。

## Git 提交说明

`.gitignore` 已排除依赖、构建产物、日志、缓存、编辑器配置、环境变量、测试报告和临时文件。以下内容必须保留并提交：

- `src/components/map/` 下的全部地图组件与辅助文件。
- `src/assets/maps/` 下的 GeoJSON 与地球渲染缓存。
- `src/assets/textures/map/` 下的所有真实纹理。
- `package.json`、`package-lock.json`、`pnpm-lock.yaml`、`vite.config.ts` 和 `tsconfig.json`。
- `README.md` 以及源码中的许可证、原始仓库地址和作者归属注释。

提交前可执行：

```bash
git status --short
git check-ignore -v node_modules dist
```

不要提交本机绝对路径、临时预览地址、截图、业务大屏面板、测试账号或密钥。

## 常见问题

### 启动时报 Vite 需要更高版本的 Node.js

本项目使用 Vite 7，需要 Node.js `^20.19.0` 或 `>=22.12.0`。升级 Node.js 后删除旧 `node_modules`，再执行 `npm ci`。

### 页面空白或没有地图

不要直接双击 `index.html` 或使用 `file://` 打开。必须运行 `npm run dev`，通过终端输出的 HTTP 地址访问。随后检查浏览器控制台、WebGL 支持、纹理路径和地图容器尺寸。

### 点击省市后无法继续下钻

确认浏览器可以访问 GeoJSON 数据源；首次打开未内置的行政区会发起网络请求。网络受限时应先把所需 GeoJSON 下载到本地并接入 `mapDataAdapter.ts`。

### 修改颜色后只有一部分效果变色

应只修改 `MAP_THEME_PRIMARY`，并确认 `EarthView.vue` 与地图主体都从 `mapTheme.ts` 导入共享主题。不要在单个组件中硬编码第二套主题色。

### 长地名又被截断

检查 `updateCityLabelPresentation()` 是否仍按字符数设置 `--map-label-item-width`，以及 `.city-label span` 是否保持 `overflow: visible` 和 `text-overflow: clip`。

## 原始来源

- three-scope-map skill：<https://github.com/songsummer920-dazzle/three-scope-map-skill>
- 作者全平台 ID：宋夏天Dazzle
- 公众号：送你整个夏天

