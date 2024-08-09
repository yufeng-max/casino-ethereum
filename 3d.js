const Web3 = require('web3');

// 使用 Infura 的 URL 作为提供者
const infuraUrl = 'https://mainnet.infura.io/v3/1b52bf5e805b4031b4659a32fd16d82e';
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

async function findFirstContractCreationBlock() {
  // 从区块 0 开始遍历
  let blockNumber = 0;

  while (true) {
    const block = await web3.eth.getBlock(blockNumber, true);
    
    // 如果块不存在，结束遍历
    if (!block) {
      console.log('No more blocks.');
      break;
    }

    // 遍历块中的所有交易
    for (const tx of block.transactions) {
      if (tx.to === null) { // 合约创建交易
        console.log('First contract creation transaction found in block number:', blockNumber);
        console.log('Transaction Hash:', tx.hash);
        return blockNumber; // 返回找到的块编号
      }
    }
    
    // 增加块编号并继续
    blockNumber++;
  }
}

findFirstContractCreationBlock().catch(console.error);
