import axios from 'axios';
import satoshi from 'satoshi-bitcoin';
import { rule } from 'postcss';
import { Wallet } from '@/models/Wallet.js';

const moment = require('moment');
const bitcore = require('bitcore-lib');
const BigNumber = require('bignumber.js');

export class Bitcoin extends Wallet {
    static Network = { Mainnet: 'https://insight.bitpay.com/api' }

    constructor() {
      super();
      this.coinType = 0;
      this.name = 'BTC';
      this.title = 'Bitcoin';
      this.className = 'Bitcoin';
    }

    getShortAddress() {
      return this.address.replace(this.address.substr(5, 24), '...');
    }

    setDefaultNetwork() {
      bitcore.Networks.defaultNetwork = bitcore.Networks.livenet;
    }

    createAddressPrivatekey() {
      this.setDefaultNetwork();

      const Mnemonic = require('bitcore-mnemonic');

      let code = null;

      if (this.mnemonic == '') {
        code = new Mnemonic();
        this.mnemonic = code.phrase;
      } else { code = new Mnemonic(this.mnemonic); }

      const xpriv = code.toHDPrivateKey();

      const hdPrivateKey = new bitcore.HDPrivateKey(xpriv);
      const derived = hdPrivateKey.derive('m/44\'/{0}\'/0\'/0/0'.format(this.coinType));
      this.address = derived.privateKey.toAddress().toString();
      this.privateKey = derived.privateKey.toString();
      // this.xprivateKey = derived.xprivkey;
    }

    async getBalance() {

      this.setDefaultNetwork();

      const url = `${this.network}/addr/${this.address}/balance`;
      const response = await axios.get(url);

      if (response.status == 200) {
        return await satoshi.toBitcoin(response.data);
      }
      return false;
    }


    async transfer(toAddress, amountToSend) {

      try {

        if (!bitcore.Address.isValid(toAddress)){
          return {"status": 0, "message": "Recipient address is invalid"};
        }

        console.log(`transfered from address:${this.address}`);

        // Check balance:
        let balance = await this.getBalance();

        console.log('bitcore.Networks.defaultNetwork', bitcore.Networks.defaultNetwork);
        console.log('server', this.network);


        console.log('Your wallet balance is currently {0} ETH'.format(balance));

        if (!balance || balance == 0 || balance <= amountToSend) {
          return {"status": 0, "message": "Insufficient funds"};
        }

        // each BTC can be split into 100,000,000 units. Each unit of bitcoin, or 0.00000001 bitcoin, is called a satoshi
        const amountBig = new BigNumber(amountToSend.toString());
        const satoShiRate = new BigNumber('100000000');
        amountToSend = amountBig.times(satoShiRate).toString();

        const data = {};
        const fee = await this.getFee(4);

        console.log('fee:', +fee);

        if (fee) {
          data.fee = fee;

          const utxos = await this.utxosForAmount(Number(amountToSend) + Number(fee));

          console.log('utxos', utxos);

          if (utxos) {
            data.utxos = utxos;
            const fromAddress = this.address;
            const privateKey = this.privateKey;
            const transaction = new bitcore.Transaction()
              .from(data.utxos)
              .change(fromAddress)
              .fee(data.fee)
              .to(toAddress, Number(amountToSend))
              .sign(privateKey);

            console.log('transaction', transaction);
            const rawTx = transaction.serialize();
            const txHash = await this.sendRawTx(rawTx);

            console.log(txHash);

            return {"status": 1, "message": "Please allow for 30 seconds before transaction appears blockchain"};
          }
          else{
            return {"status": 0, "message": "Insufficient funds"};
          }


        }
      } catch (error) {
        return {"status": 0, "message": error};
      }

    }

    async retrieveUtxos() {
      const url = `${this.network}/addr/${this.address}/utxo`;

      const response = await axios.get(url);

      if (response.status == 200) {
        const utxos = response.data;
        utxos.sort((a, b) => b.satoshis - a.satoshis);
        return utxos;
      }
      return false;
    }

    async utxosForAmount(amount) {
      const utxos = await this.retrieveUtxos();
      if (utxos && utxos.length > 0) {
        const result = this.findUtxos(utxos, 0, amount, []);
        if (!result) { return 'Insufficent Balance'; }
        return result;
      }
      return false;
    }

    findUtxos(utxos, pos, amount, result) {
      if (pos >= utxos.length) { return null; }

      const utxo = utxos[pos];
      result.push(utxo);

      // in case of enough money
      if (utxo.satoshis >= amount) {
        return result;
      }
      amount -= utxo.satoshis;
      return this.findUtxos(utxos, pos + 1, amount, result);
    }

    async getFee(blocks) {
      const url = `${this.network}/utils/estimatefee?nbBlocks=${blocks}`;
      const response = await axios.get(url);

      if (response.status == 200) {
        const txFee = bitcore.Unit.fromBTC(response.data[blocks]).toSatoshis();
        return txFee;
      }
      return false;
    }

    async sendRawTx(rawTx) {
      const uri = `${this.network}/tx/send`;
      console.log('uri', uri);
      const txHash = await axios.post(uri, {
        rawtx: rawTx,
      });
      if (txHash.status == 200) {
        return txHash.data;
      }
      return false;
    }

    async getTransactionHistory() {
      // txs/?address=muU86kcQGfJUydQ9uZmfJwcDRb1H5PQuzr
      const url = `${this.network}/txs/?address=${this.address}`;
      const response = await axios.get(url);
      let result = [];
      if (response.status == 200) {

        if(response.data && response.data.txs){
          //console.log(response.data.txs);
          for(let tran of response.data.txs){
            let vin = tran.vin, vout = tran.vout,
            is_sent = false, value = 0,
            transaction_date = new Date(tran.blocktime*1000);

            //check transactions are send
            for(let tin of vin){
              if(tin.addr.toLowerCase() == this.address.toLowerCase()){
                is_sent = true;

                for(let tout of vout){
                  let tout_addresses = tout.scriptPubKey.addresses.join(" ").toLowerCase();
                  if(tout_addresses.indexOf(this.address.toLowerCase()) < 0){
                    value += Number(tout.value);
                  }
                }

                break;
              }
            }

            //check transactions are receive
            if(!is_sent){
              for(let tout of vout){
                let tout_addresses = tout.scriptPubKey.addresses.join(" ").toLowerCase();
                if(tout_addresses.indexOf(this.address.toLowerCase()) >= 0){
                  value += tout.value;
                  break;
                }
              }
            }

            result.push({
              value: value,
              transaction_date: transaction_date,
              transaction_relative_time:  moment(transaction_date).fromNow(),
              is_sent: is_sent});
          }

          return result;
        }
        else{
          return false;
        }
      }

      return false;
    }
}

export default { Bitcoin };
