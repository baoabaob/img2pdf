# 这玩意是啥？
如项目名字所言，该项目是一个各类实用工具的集合“工具箱”。我们将采用基于git的合作开发模式，共同开发更多工具，逐步充实该工具箱的功能。该项目旨在帮助大家了解前端网页开发，快速熟悉React生态，初步掌握基于React的前端开发的思路与方法。

# 在这个项目中，我可以做什么？
一言以蔽之：
你将学习如何开发一个网页，并创造一个每个人都能用的网页端小工具。

具体而言，你将：
- 学习代码管理与协作工具：Git
- 学习基础的网页开发知识，包括HTML/CSS/JavaScript
- 学习React框架的基本使用
- 最终以React组件的形式，完成一个网页端工具，并且让每一个人都能访问使用

工具的功能完全取决于你，例如，你或许可以考虑实现：
- 亲戚关系计算器
- 电子木鱼
- ASCII字符画生成器
- 二维码解析/生成器
- 扫雷
- 进制转换器
- ……

# 没接触过？没关系！
这里有详尽精准的学习路线；

这里有图文并茂的保姆级教程；

这里有积极答疑、全程护航的社群；

**唯一前置要求：使用百度/Google/ChatGPT的意识**

（请跳转至文末的概念速通）

# 参考学习路线
## 1.安装并配置好相关环境
要点：Git的安装、Node.js环境的安装

Git教程：https://www.liaoxuefeng.com/wiki/896043488029600

可视化学习Git: https://learngitbranching.js.org/?locale=zh_CN

推荐书籍：《Pro Git》

## 2.Clone该项目，创建你的新分支
要点：对Git概念的理解（分支、仓库、暂存区、commit、pull/push等）、Git本地/远程仓库的使用

克隆仓库并进入仓库目录：
``` Bash
git clone https://jihulab.com/the-blueprint-project/devtoy.git
cd devtoy
```

创建并切换到你的分支：
``` Bash
git checkout -b your-branch-name
```

## 3.修改代码，并在本地调试运行
要点：React/Vite等Node包的安装、HTML/CSS/JavaScript基础知识、React基础知识、Vite的使用

在实现你自己的工具前，推荐先学习HTML/CSS/JavaScript基础和React基础。

菜鸟教程快速入门：
- https://www.runoob.com/html/html-tutorial.html
- https://www.runoob.com/css/css-tutorial.html
- https://www.runoob.com/js/js-tutorial.html

React官方网站：https://react.dev/

React中文教程：https://react.docschina.org/learn

修改代码请参考后文的项目结构。

在调试运行前，必须安装npm依赖包：
``` Bash
npm install
```

随后，你可以在本地运行项目：
``` Bash
npm run dev
```

## 4.将代码推送到远程仓库，并发出merge request
要点：Git本地/远程仓库的使用

首先将代码修改提交至本地仓库，别忘了一定提交到你自己的分支：
``` Bash
git checkout your-branch-name
git add .
git commit -m "Your commit message"
```

随后将你的分支推送到公共远程仓库：
``` Bash
git push origin your-branch-name
```

最后，在jihulab的网页界面，提交将你的分支合并到主分支的merge request：
[New merge request](https://jihulab.com/OctopusWen/dev-tools/-/merge_requests/new)

Source Branch选择你的分支，而Target Branch选择master分支。随后点击“Compare branches and continue”按钮，填写标题与描述，点击“Submit merge request”按钮即可。

之后我们会审核你的代码，只要编译没有问题，那么我们就会将其合并到master主分支。我们配置的CI/CD会自动将其部署至服务器上，你可以在[这里](http://10.112.81.155)看到你最终的成果！

# 项目技术概况
## 项目技术栈
基于 [React](https://zh-hans.reactjs.org/) 框架，采用 [Vite](https://cn.vitejs.dev/) 构建项目。
UI组件库采用[Chakra-ui](https://chakra-ui.com/)，路由转发采用[Wouter](https://chakra-ui.com/)。

## 项目结构
`/src`为主要JavaScript源代码存放处。其中`main.jsx`为入口点，`app.jsx`生成了页面框架，`router.js`定义了路由规则，`/src/pages/tools/generators`中各文件则分别对工具进行了实现。

当创建一个新的工具页面时，请在`/src/pages/tools/generators`文件夹下新建该工具的jsx文件（可参考已有工具），并在`routers.js`文件中添加该工具的路由数据。

`/public`中存放一些公用资源，例如项目Logo、图标、图片等。

`index.html`为项目的入口网页文件，我们React代码所做的一切事情，都会基于这个网页。当然，它一般都是空空的，因为我们的网页内容都是React动态生成的。

`package.json`中描述了项目支持的命令、项目的依赖包。我们的项目需要这些包才能正常运行，类似于C语言中#include导入的头文件。`npm install`等命令会自动修改该文件，多数时候不必关注。

`package-lock.json`、`pnpm-lock.yaml`文件为npm自动生成，描述了项目中软件包的依赖关系。多数时候不必关注。

`vite.config.js`为Vite的配置文件，描述了项目的一些构建规则。多数时候不必关注。

`.gitignore`描述了git在上传代码时需要忽略的文件，目前已配置好，无需修改，不必关注。例如，通常在执行`npm install`后，项目文件夹下会出现一个`node_modules`文件夹，存放着npm包。npm包属于公共资源，每个人都可以自行安装，没有必要上传到git仓库，我们需要告诉git忽略它，即在`.gitignore`中添加它。

`.gitlab-ci.yml`描述了项目自动部署的流程。该文件由我们维护，请勿修改。

# 一些概念速通
## 什么是Git？它和Github、Gitlab、Jihulab等又是啥关系？
在一个大项目中，往往不同的人写着不同模块的代码。程序要运行，得把所有代码拼起来。若是用QQ/微信等传代码，既不专业，又很繁琐。很明显，我们需要一种工具，将每个人手中的代码同步起来，这个工具就是Git。Git是一个分布式版本控制系统，它可以记录每个人的代码修改，并将这些修改同步到每个人的电脑上。

单独的Git是一个本地工具，它只能管理你自己设备上的代码版本。如果你需要和他人电脑上的代码进行同步、合并，需要一个公共的代码库。Github、Gitlab、Jihulab等都提供了这样的代码库，这些代码库放在云端服务器，我们可以将自己的代码推送到这些代码库中，也可以从这些代码库中拉取他人的代码，从而实现不同设备间的代码同步。

## 什么是前端？HTML/CSS/JavaScript都是啥？
前端是指网站或应用程序的用户界面部分，也就是用户直接看到、与之交互的部分。编写网页，即是前端开发的主要工作之一，通常也被称为Web开发。而 **HTML**（Hyper Text Markup Language 超文本标记语言）、**CSS**（Cascading Style Sheets 层叠样式表）和 **JavaScript** 分别是三门语言，它们共同编写出一个网页。浏览器通过解析这三种语言，生成我们看到的网页。

HTML：你可以把HTML看作网页的“骨架”。它负责描述网页的基础层次架构和元素构成，在网页上展示文本、图片、链接等元素。直观地说，HTML告诉浏览器“哪里有一个标题”、“哪里有一段文本”或着“哪里有一张图片”等。

CSS：CSS则负责控制网页的样式和布局，它让我们能够调整字体、颜色、背景等视觉效果。直观地说，CSS告诉浏览器“这段文字的字体有多大”、“这张图片有无圆角”或者“这几个元素间距多少”等。

JavaScript：JavaScript为网页增加了交互性，可以让网页响应用户的操作。例如点击一个按钮，某个数字发生变化，即是靠JavaScript修改了数字。直观地说，JavaScript告诉浏览器“点某个按钮时该干嘛”、“拖动某个元素时有什么反应”等。

HTML是“骨架”，CSS是“皮肤”，JavaScript是“肌肉”。HTML描述了网页的基本框架结构，CSS为网页增添了丰富的外观，JavaScript则让网页能够“动起来”。这三者共同构建出了一个网页。

通常来说，HTML和CSS不被认为是编程语言。它们分别是标记语言、样式表语言，因为它们并不涉及任何逻辑和动态数据，只是简单静态地描述一个网页的样子。而JavaScript有着变量、逻辑流等概念，属于高级编程语言。因此，JavaScript可以通过指令的运行，操纵静态的HTML和CSS，实现网页的交互。

## 什么是React？
在最原始的网页开发中，我们需要编写极大量的HTML、CSS、JavaScript代码。在网页空白处右键 - 查看网页源代码，会出现密密麻麻的HTML和JavaScript代码。我们可以直观地发现，直接写HTML和JavaScript代码会是非常折磨的事情。我们会编写大量重复低效的代码，且代码逻辑错杂，可读性很差，十分不利于维护和扩展。

于是乎，前端框架应运而生，最流行的包括React、Vue、Angular等。使用前端框架后，网页开发从三种语言的群魔乱舞，转变为了JavaScript的主要舞台。整个网页被视为大大小小的组件的集合，每一个组件都使用JavaScript写成。由此，我们可以使用高级编程语言的思想来实现网页。

React是一个用于构建用户界面的JavaScript库，它主要用于构建前端应用程序，通过引入组件化的思想，让代码更加模块化和可重用。在React中，我们可以将页面分为许多独立的组件，每个组件都负责处理自己的界面和逻辑。组件可以嵌套在其他组件内部，形成一个层次化的结构。这种组件化的开发模式提高了代码的可读性、可维护性和可扩展性，可以极大提高复杂网页的开发效率。

从直观角度来讲，我们在使用React写代码时，多数时候只需要使用JavaScript，而不需要使用HTML和CSS。准确来说，组件的数据与逻辑使用Js编写，而组件的HTML结构、CSS样式等，通过类似HTML/CSS的、特殊的语法，一并写在Js代码中。

## 什么是Node.js？它和JavaScript、npm又是啥关系？
众所周知，Java代码必须有JDK环境才能运行，Python代码必须有Python环境才能运行。

JavaScript代码为网页服务，平时运行在浏览器中；但当它需要在浏览器外运行时，也需要一个运行环境，这个环境即是Node.js。Node.js是一个基于Chrome V8引擎的JavaScript运行环境，它使得JavaScript可以脱离浏览器运行在其他环境中。React是一个JavaScript库，它负责着网页的构建，并非浏览器中的网页本身，因此它需要在Node.js环境中运行。

Python中有着很多的库，Node.js也有着库（Node.js中称之为“包”）。如何安装和管理这些包呢？和Python的pip类似，Node.js中也有着包管理器：npm（Node Package Manager）。npm可以让我们方便地安装、卸载、更新和管理Node.js包。React是一个Node.js包，因此我们需要使用Npm安装它。

## 什么是Vite？
Vite是一个前端构建工具，简单来说，它可以将我们编写React组件的JavaScript代码，转换为浏览器可以直接解析的HTML、CSS和JavaScript代码，从而能够渲染出网页。

它和create-react-app（React官方教程中即使用的该工具）属于同类工具。
