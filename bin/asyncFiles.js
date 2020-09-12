#!/usr/bin/env node
const yargs = require("yargs");
const AsyncFiles = require("../lib/index").default;

const args = yargs
  .usage("Usage: $0 <命令> [选项]")
  .alias("version", "v")
  .command("afs", "同步文件")
  .option("source", {
    alias: "s",
    type: "string",
    describe: "源文件路径",
  })
  .option("target", {
    alias: "t",
    type: "string",
    describe: "待同步文件路径",
  })
  .option("watch", {
    alias: "w",
    type: "boolean",
    default: false,
    describe: "是否开启监听",
  })
  .option("ignoreInitial", {
    alias: "i",
    type: "boolean",
    default: false,
    describe: "是否忽略初始化拷贝",
  })
  .help("h")
  .alias("h", "help")
  .demandOption(["source", "target"], "请输入source和target路径！")
  .fail(function (msg, err, yargs) {
    console.error(msg);
    yargs.help();
    process.exit(1);
  })
  .parse(process.argv.slice(2));

  // 创建实例
new AsyncFiles(args);
