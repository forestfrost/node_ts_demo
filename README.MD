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
- 服务器 session 用户确权
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
- ts-node 用来将编译后的文件直接执行
- tsconfig-paths 用来识别 tsconfig.json 配置的别名
- 最后配合 nodemon 进行文件修改监听重启
  最后的执行指令为: nodemon --exec ts-node -r tsconfig-paths/register --files <入口文件>

  ### Sequelize ORM

- 模型默认添加时间戳,需要主动关闭;另外默认情况下,定义的模型的名称与表名不一致, 需要主动强制表名与模型名称一致

  ```js
  const sequelize = new Sequelize("mydb", "root", "123456", {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  });
  ```

- Dao 层

  - 通过模型定义 dao 层对象

  ```js
  sequelize.define("name", {
    name: {
      type: DataTypes.STRING, // 列的类型
      defaultValue: "", //默认值
      primaryKey: true, //是否为主键
      allowNull: false, //是否允许插入的值为空
    },
  });
  ```

  - 新建
    - build 方法新建一个模型的实例对象,之后使用实例方法 save 与数据库通信 , 实现对象的持久化
    - 直接调用 sequelize 的 create 方法,即创建了实例对象,又直接实现持久化
    - 可以定义 create 方法中的属性,控制写到数据库的字段 ,
    ```js
    const user = await User.create(
      {
        username: "alice123",
        isAdmin: true,
      },
      { fields: ["username"] }
    );
    //这样实际上仅将username字段写入,而isAdmin是默认值(没有默认值就是NULL)
    ```
    - 注意:当需要输出实例到控制台时,最好调用实例的 toJSON 方法或直接 JSON.stringify(实例对象)再输出;
  - 更新
    - 当可以拿到对象实例时,可以直接调用实例方法 save 即可实现数据的更新
    - 局部更新 ,同样调用 save 方法 传参数{fields:["列名 1","列名 2"]}
    - 当拿不到对象实例时, 模型提供了 update 方法
    ```js
    // 将所有没有姓氏的人更改为 "Doe"
    await User.update(
      { lastName: "Doe" },
      {
        where: {
          lastName: null,
        },
      }
    );
    ```
  - 删除
    - 当可以拿到对象实例时,可以调用实例方法 destroy 实现数据的删除
    - 拿不到实例对象时, 模型提供了 destroy 方法
    ```js
    // 删除所有名为 "Jane" 的人
    await User.destroy({
      where: {
        firstName: "Jane",
      },
    });
    ```
  - 重载(其实就是从数据库里读一次数据覆盖到当前的实例)

    - 调用实例方法 reload (本质是一次查询,查询结果覆盖到调用对象)

  - 查询
    - 核心: findAll() 模型方法
    - 查询特定属性
    ```js
    // 别名
    Model.findAll({
      attributes: ["name", ["age", "age_t"]],
    });
    //聚合
    Model.findAll({
      attributes: ["name", [sequelize.fn("COUNT", sequelize.col("hat")), "n_hats"]],
    });
    //包含
    Model.findAll({
      attributes: {
        include: [[sequelize.fn("COUNT", sequelize.col("hats")), "n_hats"]],
      },
    });
    //排除属性
    Model.findAll({
      attributes: { exclude: ["baz"] },
    });
    ```
    - where 子句 主要使用 sequelize 提供的 Op 运算符号
    ```js
    //简要例子:
    Post.findAll({
      where: {
        authorId: {
          [Op.eq]: 2,
        },
      },
    });
    // SELECT * FROM post WHERE authorId = 2;
    ```
    -
