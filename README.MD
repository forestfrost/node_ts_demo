## NODE

- 事件驱动,非阻塞 IO,适合 IO 频率高的场景
- 用途: web 服务器,命令行工具

### 核心模块

- fs 操作文件的 api
- http htto 服务构建
- path 路径操作

* path.basename
  - 获取一个路径的文件名,包括后缀
* path.dirname
  - 获取一个路径中的目录部分
* path.extname
  - 获取一个路径中的扩展名部分
* path.parse
  - 把一个路径转为对象
    {
    root:根路径
    dir:目录
    base:文件名,有后缀
    ext:后缀
    name:单文件名
    }
* path.join
  - 进行路径拼接时,可以自动转换为正确的路径,推荐使用

- os 系统信息获取

### 常用命令

npm i 包名 : 只下载包
npm i 包名 --save (-S) 下载包,并放入 dependencies 中
npm i 包名 --save--dev (-D) 下载包,并放入 dependencies_dev 中

### Express 基础框架

- 获取 get 请求参数 req.query (对象);
- 获取 post 请求参数 req.body (对象) 需要使用 body-parser 中间件 为 req 对象 挂载上 body 对象
- 静态资源托管 app.use(express.static("public")) 注意 字符串为从根目录出发的路径 开头没有 "/"
  app.use('/xxx/',express.static("public")) 可以通过 /xxx/来访问托管的静态文件
  可以多次使用 这个 api 托管多个目录下的文件

- 文件操作中的相对路径可以省略 ./ ,但是模块标识的引入不能省略 "./"
- 写 cookie 通过写响应头部 set-cookie 即可
- 请求可以设置单独的中间层 ,并且中间层可以设置多层
- 服务器session 用户确权
- nodemon 监听文件变化, 自动重启服务器

### 配合 TS 开发(主要的坑在别名)

ts 在 tsc 编译后 生成的文件不会将别名解析为正确的路径,所以需要 tsconfig-paths 来帮助我们解析;但是 tsconfig-paths 又有点小问题,它在读取别名时仍读取的是 tsconfig.json 中的别名,即 src 目录,所以需要
对 tsconfig.json 中的别名配置增加编译后的目录

例: 构建目录为 dist ,开发目录为 src

```js
"rootDir": "./src",
"baseUrl": "./"
"paths": {
    "@": ["src", "dist"],
    "@/*": ["src/*", "dist/*"]
},
"outDir": "./dist"
```

- 需要 安装 ts-node tsconfig-paths

* ts-node 用来将编译后的文件直接执行
* tsconfig-paths 用来识别 tsconfig.json 配置的别名
* 最后配合 nodemon 进行文件修改监听重启
  最后的执行指令为: nodemon --exec ts-node -r tsconfig-paths/register --files <入口文件>
