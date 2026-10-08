# helloworld — 我的第一个 AI 开发的网站

练习一作业：Node.js HelloWorld 网站，显示问候语 + 实时服务器时间。

## 项目结构

```
helloworld/
├── server.js       # Node.js + Express 服务器（首页 + 时间接口）
├── package.json    # 项目依赖清单
├── vercel.json     # Vercel 部署配置
└── README.md       # 说明文档
```

## 本地运行

```bash
npm install
npm start
```

浏览器打开 http://localhost:3000 即可看到页面。

## 部署到 Vercel

1. 仓库推送到 GitHub；
2. Vercel → Add New → Project → Import 该仓库；
3. Framework 选 **Other**，保持默认配置，点击 Deploy；
4. 部署完成后获得公网网址（helloworld-xxx.vercel.app）。

## 功能说明

- `/` 首页：显示 "Hello World！"、作者名字和服务器时间
- `/api/time` 接口：返回 JSON 格式的服务器当前时间，页面每秒自动刷新
