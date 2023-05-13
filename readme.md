# 这玩意是啥？
如项目名字所言，这是一个前端框架的练手项目。该项目是一个常用开发工具的集合工具箱，我们将采用基于git的合作开发模式，共同开发更多工具，逐步充实该工具箱的功能。该项目旨在帮助大家快速熟悉React生态，初步掌握React前端开发的思路与方法。

# 在这个项目中，我可以做什么？
一言以蔽之：
你将学习如何开发一个网页，并创造一个网页端小工具（工具的功能完全取决于你）

具体而言，你将：
- 学习代码同步与协作工具：Git
- 学习基础的网页开发知识，包括HTML/CSS/JavaScript
- 学习React框架的基本使用
- 最终完成一个网页端工具，并且让每一个人都能访问使用

# 没接触过？没关系！
*唯一前置要求：使用百度/Google/ChatGPT的意识*

（请跳转至文末的概念速通）

# 参考开发步骤
## 1.下载并配置好相关的环境
相关软件与环境包括：Git、Node.js

## 2.Clone该项目，并安装依赖
``` Bash
git clone https://jihulab.com/the-blueprint-project/devtoy.git
cd devtoy
npm install
```

## 3.创建你的新分支，修改代码，并在本地调试运行
``` Bash
npm run dev
```

## 4.将代码推送到远程仓库，并发出pull request

之后我们会审核你的代码，只要编译没有问题，那么我们就会将其合并到主分支。我们配置的CI/CD会自动将其部署至服务器上，你可以在[这里](http://10.112.81.155)看到你最终的成果！

# 项目技术概况
## 项目技术栈
基于 [React](https://zh-hans.reactjs.org/) 框架，采用 [Vite](https://cn.vitejs.dev/) 构建项目。
UI组件库采用[Chakra-ui](https://chakra-ui.com/)，路由转发采用[Wouter](https://chakra-ui.com/)。

## 项目结构
`/src`为主要源代码存放处。其中`main.jsx`为入口点，`app.jsx`生成了页面框架，`router.js`定义了路由规则，`/src/pages/tools/generators`中各文件则分别对工具进行了实现。

当创建一个新的工具页面时，请在`/src/pages/tools/generators`文件夹下新建该工具的jsx文件（可参考已有工具），并在`routers.js`文件中添加该工具的路由数据。

# 常见问题
开发前请更换npm源为国内源，或自行采取其他解决方案。

注：网络上多数教程所设置的淘宝源（https://registry.npm.taobao.org）已在2022.6.30.停止解析，请更换为新淘宝源（http://registry.npmmirror.com/）

修改npm源教程： https://blog.csdn.net/Sheyami/article/details/121417445
官方换源通告： https://zhuanlan.zhihu.com/p/465424728

若未更换源，可能会无法找到 @chakra-ui 库。

# 一些概念速通
## 什么是Git？它和Github、Gitlab、Jihulab等又是啥关系？
在一个大项目中，往往不同的人写着不同模块的代码。程序要运行，得把所有代码拼起来。若是用QQ/微信等传代码，既不专业，又很繁琐。很明显，我们需要一种工具，将每个人手中的代码同步起来，这个工具就是Git。Git是一个分布式版本控制系统，它可以记录每个人的代码修改，并将这些修改同步到每个人的电脑上。

单独的Git只是一个本地工具，它只能管理你自己设备上的代码版本。如果你需要和他人电脑上的代码进行同步、合并，需要一个公共的代码库。Github、Gitlab、Jihulab等都提供了这样的代码库，这些代码库放在云端服务器，我们可以将自己的代码推送到这些代码库中，也可以从这些代码库中拉取他人的代码，从而实现不同设备间的代码同步。

## 什么是前端？HTML/CSS/JavaScript都是啥？
前端是指网站或应用程序的用户界面部分，也就是用户直接看到和与之互动的部分。我们常说的前端开发，其实可以简单理解为搭建网页。而HTML（超文本标记语言）、CSS（层叠样式表）和JavaScript是构建网页前端的三大核心技术。

HTML：你可以把HTML看作网页的“骨架”。它负责在网页上展示文本、图片、链接等元素。简单来说，HTML告诉浏览器“哪里有一个标题”、“哪里有一段文本”或者“哪里有一张图片”。

CSS：CSS则负责控制网页的样式和布局，它让我们能够调整字体、颜色、背景等视觉效果，可以将CSS看作是网页的“外观”。

JavaScript：JavaScript为网页增加了交互性，可以让网页响应用户的操作，例如点击按钮、滑动页面等。简单来说，JavaScript让网页能够“做事”。

HTML是“骨架”，CSS是“皮肤”，JavaScript是“肌肉”。HTML描述了网页的基本框架结构，CSS为网页增添了丰富的外观，JavaScript则让网页能够“动起来”。这三门语言共同描绘出了一个网页。

## 什么是Node.js？它和npm又是啥关系？
众所周知，Java代码必须有JDK环境才能运行，Python代码必须有Python环境才能运行。JavaScript代码平时运行在浏览器中，但当它需要在浏览器外运行时，也需要一个运行环境，这个环境即是Node.js。

Node.js是一个基于Chrome V8引擎的JavaScript运行环境，它使得JavaScript可以脱离浏览器运行在其他环境中。

在Java和Python中有着很多的库，Node.js中也有很多的库，这些库都可以通过npm安装。Npm是Node.js的包管理工具，类似于Python的pip。

## 什么是React？
React是一个用于构建用户界面的JavaScript库，它主要用于构建前端应用程序。React由Facebook开发并维护，通过引入组件化的思想，让代码更加模块化和可重用。

在React中，我们可以将页面分为许多独立的组件，每个组件都负责处理自己的界面和逻辑。组件可以嵌套在其他组件内部，形成一个层次化的结构。这种组件化的开发模式提高了代码的可读性、可维护性和可扩展性，可以极大提高复杂网页的开发效率。

从直观角度来讲，我们在使用React写代码时，多数时候只需要使用JavaScript，而不需要使用HTML和CSS。这是因为React提供了一种名为JSX的语法，它可以让我们在JavaScript中编写HTML和CSS代码，从而让我们能够在JavaScript中构建用户界面。

## 什么是Vite？
Vite是一个前端构建工具，简单来说，它可以将我们编写React组件的JavaScript代码，转换为传统的HTML、CSS和JavaScript代码，从而让浏览器能够直接解析我们的网页。
