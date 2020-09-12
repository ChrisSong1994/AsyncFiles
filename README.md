# AsyncFiles

同步更新两个路径下的文件或者文件夹内容

### 安装

```bash
# 全局安装
npm i -g @chrissong/asyncfiles

# 项目依赖
npm i @chrissong/asyncfiles
```

### 使用

支持命令行和 AsyncFiles 实例调用两种方式

#### 命令行

```
Usage: asyncFiles.js <命令> [选项]

命令：
  asyncFiles.js afs  同步文件

选项：
  -v, --version        显示版本号                                         [布尔]
  -s, --source         源文件路径                                [字符串] [必需]
  -t, --target         待同步文件路径                            [字符串] [必需]
  -w, --watch          是否开启监听                       [布尔] [默认值: false]
  -i, --ignoreInitial  是否忽略初始化拷贝                 [布尔] [默认值: false]
  -h, --help           显示帮助信息                                       [布尔]

```

### AsyncFiles 实例

```js
// 创建AsyncFiles实例
const asyncFiles = new AsyncFiles({ source, target, watch, ignoreInitial });

// 关闭监听，当属性watch为true有效
asyncFiles.close();
```

**Options**

- **_source:_** `String` 源文件路径
- **_target:_** `String` 待同步文件路径
- **_watch:_** `Boolean` 是否开启监听
- **_ignoreInitial:_** `Boolean` 是否忽略初始化拷贝
