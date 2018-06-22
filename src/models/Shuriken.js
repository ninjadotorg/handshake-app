import axios from 'axios';
import { Wallet } from '@/models/Wallet.js';
import configs from '@/configs';
import { StringHelper } from '@/services/helper';
import { Ethereum } from '@/models/Ethereum.js';

const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const bip39 = require('bip39');
const BN = Web3.utils.BN;
// const compiled = require('@/contracts/Shuriken.json');

var erc20Abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"}];

export class Shuriken extends Ethereum {

    constructor() {
      super();      
      this.name = 'SHURI';
      this.title = 'Shuriken';
      this.className = 'Shuriken';
    }
    async getBalance(){
      const web3 = this.getWeb3();      
      let instance = new web3.eth.Contract(
        erc20Abi, //compiled.abi,
        configs.network[this.chainId].shurikenTokenAddress,
      );
      
      let balance = await instance.methods.balanceOf(this.address).call();                
      return Web3.utils.fromWei(balance.toString());

    }
    
}

export default { Ethereum };
