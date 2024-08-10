module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.5.1",    // 设置编译器版本
      settings: {
        optimizer: {
          enabled: true,    // 启用优化器
          runs: 200         // 优化器运行次数
        },
      },
    },
  },
};
