import PrivateKeyProvider from 'truffle-privatekey-provider'
import Web3js from 'web3'
import NetworkAPI from './NetworkAPI'

/*
  Note:
    reserved web3 for metamask
*/
const hexEncode = function (str) {
  var hex, i
  var result = ''
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16)
    result += ('000' + hex).slice(-4)
  }
  return '0x' + result
}

function validatingPrivateKey (s) {
  if (s.startWith('0x')) return s
  return '0x' + s
}

function getCurrentGasPrice () {
  return fetch('https://www.etherchain.org/api/gasPriceOracle')
    .then(res => {
      return res.json()
    })
    .then(function (gasPrice) {
      return web3.toWei(gasPrice.standard, 'gwei')
    })
}

class HedgeFundAPI extends NetworkAPI {
  constructor (version, useMetamask) {
    var contractInfo = require(`./hedgefund_${version}.js`)
    super(contractInfo.network)
    this.version = version
    this.ABI = contractInfo.abi
    this.contractAddress = contractInfo.address
    this.contractOwner = contractInfo.owner
    this.useMetamask = useMetamask
  }

  _call (method, ...params) {
    // always using infura
    var web3js = new Web3js(new Web3js.providers.HttpProvider(this.network))
    let contract = new web3js.eth.Contract(this.ABI, this.contractAddress)
    var result = contract.methods[method](...params).call()
    return result
  }

  async _createTx (privateKey, value = 0, method, ...params) {
    if (this.useMetamask) {
      var web3js = new Web3js(web3.currentProvider)
      var account = (await web3js.eth.getAccounts())[0]
      if (!account) {
        throw new Error('Not login metamask!')
      }
    } else if (typeof web3 !== 'undefined') {
      let privateProvider = new PrivateKeyProvider(privateKey, this.network)
      var web3js = new Web3(privateProvider)
      var account = web3js.eth.accounts.privateKeyToAccount(
        validatingPrivateKey(privateKey)
      ).address

      if (!account) {
        throw new Error('Can not get public address from private key')
      }
    }
    let contract = new web3js.eth.Contract(this.ABI, this.contractAddress)
    console.log(
      'gasPrice: ',
      await getCurrentGasPrice(),
      await web3js.eth.getTransactionCount(account)
    )

    let sendF = contract.methods[method](...params).send.bind(this, {
      from: account,
      value: value,
      gasPrice: await getCurrentGasPrice(),
      nonce: await web3js.eth.getTransactionCount(account)
    })

    let estimateGasF = contract.methods
      [method](...params)
      .estimateGas.bind(this, {
        from: account,
        value: value,
        nonce: await web3js.eth.getTransactionCount(account),
        gasPrice: await getCurrentGasPrice()
      })

    return {
      run: sendF,
      estimateGas: estimateGasF
    }
  }

  initProject (
    privateKey = null,
    target,
    max,
    deadline,
    lifeTime,
    commission,
    pid
  ) {
    return this._createTx(
      privateKey,
      0,
      'initProject',
      target,
      max,
      deadline,
      lifeTime,
      commission,
      hexEncode(pid)
    )
  }

  // POST
  stopProject (privateKey = null, pid) {
    return this._createTx(privateKey, 0, 'stopProject', hexEncode(pid))
  }

  fundProject (privateKey = null, amount, pid) {
    return this._createTx(privateKey, amount, 'fundProject', hexEncode(pid))
  }

  withdrawFund (privateKey = null, pid) {
    return this._createTx(privateKey, 0, 'withdrawFund', hexEncode(pid))
  }

  release (privateKey = null, pid, exchange, amount, stage) {
    return this._createTx(
      privateKey,
      0,
      'release',
      hexEncode(pid),
      exchange,
      amount,
      stage
    )
  }

  retract (privateKey = null, pid, retractAmount) {
    return this._createTx(
      privateKey,
      0,
      'retract',
      hexEncode(pid),
      retractAmount
    )
  }

  voteStop (privateKey = null, pid, stop) {
    return this._createTx(privateKey, 0, 'voteStop', hexEncode(pid), stop)
  }

  validateState (privateKey = null, pid) {
    return this._createTx(privateKey, 0, 'validateState', hexEncode(pid))
  }

  shouldValidateState (privateKey = null, pid) {
    return this._call(privateKey, 'shouldValidateState', hexEncode(pid))
  }

  // GET
  getProjectSize () {
    return this._call('getProjectSize')
  }

  getProjectInfo (pid) {
    return this._call('getProjectInfo', hexEncode(pid))
  }

  getFundAmount (pid) {
    return this._call('getFundAmount', hexEncode(pid))
  }

  getWithdrawAmount (pid) {
    return this._call('getWithdrawAmount', hexEncode(pid))
  }
}

export default HedgeFundAPI
