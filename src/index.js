import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Web3 from 'web3';

// components
import Website from '@/components/App/Basic';
import LogManage from '@/services/logmanage';
// import registerServiceWorker from '@/services/worker';
import * as OfflinePlugin from 'offline-plugin/runtime';

if (process.env.isStaging) {
  console.debug = function (message) {
    LogManage.bettingSaveLog(message);
  };
}

window.gasPrice = 64;

function getGasPrice() {
  // axios
  //   .get(`https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${
  //     process.env.apikeyEtherscan
  //   }`)
  //   .then((res) => {
  //     const gasPrice = Number(res.data.result).toString();
  //     console.log('gasPrice', gasPrice);
  //     window.gasPrice = Web3.utils.fromWei(gasPrice, 'gwei');
  //     console.log('gasPrice gwei', window.gasPrice);
  //   });

  axios
    .get(`https://ethgasstation.info/json/ethgasAPI.json`)
    .then((res) => {
      // const gasPrice = Number(res.data.average).toString();
      // console.log('gasPrice', gasPrice);
      window.gasPrice = (Number(res.data.average) / 10).toString();
      // console.log('gasPrice gwei', window.gasPrice);
    });
}

getGasPrice();
setInterval(getGasPrice, 1000 * 60);

if (process.env.caches) {
  OfflinePlugin.install({
    onUpdateReady() {
      OfflinePlugin.applyUpdate();
    },
    onUpdated() {
      window.location.reload();
    },
  });
} else {
  if (window.caches) {
    window.caches
      .keys()
      .then(keyList =>
        Promise.all(keyList.map(key => window.caches.delete(key))));
  }
  if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((sw) => {
        if (/\/sw.js$/.test(sw.active.scriptURL)) {
          sw.unregister();
        }
      });
    });
  }
}

ReactDOM.render(<Website />, document.getElementById('app'));
const root = document.getElementById('root');
if (root) root.addEventListener('contextmenu', e => e.preventDefault());
