//https://eth-rinkeby.alchemyapi.io/v2/cJml0UFKe9LTV3IDECql5MYYM406XADJ

//use to create smart contract test
require('@nomiclabs/hardhat-waffle'); 

module.exports={
  solidity: '0.8.0',
  networks: {
    rinkeby:{
      url:"https://eth-rinkeby.alchemyapi.io/v2/cJml0UFKe9LTV3IDECql5MYYM406XADJ",
      accounts:['5c4fda01dbdc1815545385016a402e187dc6a29d0e79322e2baaadf45c79f2c8']
    }
  }
}
