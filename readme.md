### 项目定位
如项目名字所言，这是一个前端框架的练手项目。该项目是一个常用开发工具的集合工具箱，我们将采用基于git的合作开发模式，共同开发更多工具，逐步充实该工具箱的功能。该项目旨在帮助大家快速熟悉React生态，初步掌握React前端开发的思路与方法。

### 前置技术与知识
Git的基本使用
npm包管理器的基本概念
HTML/CSS/JavaScript基础概念
React基本概念

### 可选技术
React 函数式组件与hook

### 部署与启动
``` Shell
git clone https://jihulab.com/the-blueprint-project/devtoy.git
cd devtoy
npm install
npm run dev
```

### 项目结构
`/src`为主要源代码存放处。其中`main.jsx`为入口点，`app.jsx`生成了页面框架，`router.js`定义了路由规则，`/src/pages/tools/generators`中各文件则分别对工具进行了实现。

当创建一个新的工具页面时，请在`/src/pages/tools/generators`文件夹下新建该工具的jsx文件（可参考已有工具），并在`routers.js`文件中添加该工具的路由数据。

### 项目技术栈
基于 React 框架，采用 Vite 构建项目。UI库采用chakra-ui. 路由转发采用wouter.
React: https://zh-hans.reactjs.org/
Vite: https://cn.vitejs.dev/
chakra-ui: https://chakra-ui.com/
wouter: https://github.com/molefrog/wouter

### 常见问题
开发前请更换npm源为国内源，或自行采取其他解决方案。

注：网络上多数教程所设置的淘宝源（https://registry.npm.taobao.org）已在2022.6.30.停止解析，请更换为新淘宝源（http://registry.npmmirror.com/）

修改npm源教程： https://blog.csdn.net/Sheyami/article/details/121417445
官方换源通告： https://zhuanlan.zhihu.com/p/465424728

若未更换源，可能会无法找到 @chakra-ui 库。