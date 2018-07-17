import React from 'react';
import PropTypes from 'prop-types';

import {injectIntl} from 'react-intl';
import {Field, change, clearFields} from "redux-form";
import {fieldDropdown, fieldInput} from '@/components/core/form/customField'
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import Button from '@/components/core/controls/Button';
import { API_URL } from "@/constants";
import {getCryptoPrice} from '@/reducers/exchange/action';
import Modal from '@/components/core/controls/Modal';
import {MasterWallet} from "@/services/Wallets/MasterWallet";

import { showLoading, hideLoading, showAlert } from '@/reducers/app/action';
import { StringHelper } from '@/services/helper';
import createForm from '@/components/core/form/createForm'
import CryptoPrice from "@/models/CryptoPrice";
import './ReceiveCoin.scss';
import Dropdown from '@/components/core/controls/Dropdown';
import { BigNumber } from "bignumber.js";

const QRCode = require('qrcode.react');

window.Clipboard = (function (window, document, navigator) {
  let textArea,
    copy; function isOS() { return navigator.userAgent.match(/ipad|iphone/i); } function createTextArea(text) { textArea = document.createElement('textArea'); textArea.value = text; document.body.appendChild(textArea); } function selectText() {
    let range,
      selection; if (isOS()) { range = document.createRange(); range.selectNodeContents(textArea); selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); textArea.setSelectionRange(0, 999999); } else { textArea.select(); }
  } function copyToClipboard() { document.execCommand('copy'); document.body.removeChild(textArea); } copy = function (text) { createTextArea(text); selectText(); copyToClipboard(); }; return { copy };
}(window, document, navigator));

const amountValid = value => (value && isNaN(value) ? 'Invalid amount' : undefined);
const nameFormReceiveWallet = 'receiveWallet';
const ReceiveWalletForm = createForm({ propsReduxForm: { form: nameFormReceiveWallet, enableReinitialize: true, clearSubmitErrors: true}});

const nameFormShowAddressWallet = 'showAddressWallet';
const ShowAddressWalletForm = createForm({ propsReduxForm: { form: nameFormShowAddressWallet}});

class ReceiveCoin extends React.Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      wallets: [],
      walletDefault: false,
      walletSelected: false,
      rates: [],
      active: this.props.active,
      inputSendAmountValue: 0,
      inputSendMoneyValue: 0,
      isCurrency: false,      
      switchValue: 0,
    }
  }

  showAlert(msg, type = 'success', timeOut = 3000, icon = '') {
    this.props.showAlert({
      message: <div className="textCenter">{icon}{msg}</div>,
      timeOut,
      type,
      callBack: () => {},
    });
  }
  showToast(mst) {
    this.showAlert(mst, 'primary', 2000);
  }
  showError(mst) {
    this.showAlert(mst, 'danger', 3000);
  }
  showSuccess(mst) {
    this.showAlert(mst, 'success', 4000, <img className="iconSuccessChecked" src={iconSuccessChecked} />);
  }
  showLoading(status) {
    this.props.showLoading({ message: '' });
  }
  hideLoading() {
    this.props.hideLoading();
  }

  componentDidMount() {    
    this.getWalletDefault();
    if(!this.state.walletSelected.isToken){
      this.getRate("BTC");
      this.getRate("ETH");
      this.getRate("BCH");
    }
  }

  getRate = (currency) => {
    var data = {amount: 1, currency: currency};
    let rates = this.state.rates;
    this.props.getCryptoPrice({
      PATH_URL: API_URL.EXCHANGE.GET_CRYPTO_PRICE,
      qs: data,
      successFn: (res) => {
        const cryptoPrice = CryptoPrice.cryptoPrice(res.data);
        const price = new BigNumber(cryptoPrice.price).toNumber();

        rates.push({[currency]: price});
        this.setState({rates: rates});             
      },
      errorFn: (err) => {
        console.error("Error", err);
      },
    });
  }

  componentDidUpdate(){
    if (this.props.active && this.props.active != this.state.active){      
      this.setState({active: this.props.active, inputSendAmountValue: 0, inputSendMoneyValue: 0, switchValue: 0, isCurrency: false});
      this.resetForm();
      this.getWalletDefault();      
    }
    else if (this.props.active != this.state.active){
      this.setState({active: this.props.active});
    }

    
  }

  componentWillReceiveProps() {
  
  }

  resetForm(){
    this.props.clearFields(nameFormReceiveWallet, false, false, "amountCoin");
  }

  showLoading = () => {
    this.props.showLoading({message: '',});
  }

  hideLoading = () => {
    this.props.hideLoading();
  }

  onFinish = () => {
    const { onFinish } = this.props;

    if (onFinish) {
      let result = {"fromWallet": this.state.walletSelected, "amount": this.state.inputSendAmountValue}
      onFinish(result);
    } else {

    }
  }

  getWalletDefault = () =>{

    const { coinName, listWallet, wallet } = this.props;

    let wallets = listWallet;
    let walletDefault = null;
    if (!wallets){
      wallets = MasterWallet.getMasterWallet();
    }

    if (coinName){
        walletDefault = MasterWallet.getWalletDefault(coinName);
    }
    if (!walletDefault){
      if (wallets.length > 0){
        walletDefault = wallets[0];
      }
    }
    // set name + value for list:
    let listWalletCoin = [];
    if (wallets.length > 0){
      wallets.forEach((wallet) => {
        // if(!wallet.isCollectibles){
          
          wallet.text = wallet.getShortAddress() + " (" + wallet.name + "-" + wallet.getNetworkName() + ")";
          if (process.env.isLive){
            wallet.text = wallet.getShortAddress() + " (" + wallet.className + " " + wallet.name + ")";
          }
          wallet.id = wallet.address + wallet.getNetworkName() + wallet.name;
          listWalletCoin.push(wallet);
        // }
      });
    }

    // set name for walletDefault:
    if (wallet){
      walletDefault = wallet;
    }
    
    if (walletDefault){
      walletDefault.text = walletDefault.getShortAddress() + " (" + walletDefault.name + "-" + walletDefault.getNetworkName() + ")";
      if (process.env.isLive){
        walletDefault.text = walletDefault.getShortAddress() + " (" + walletDefault.className + " " + walletDefault.name + ")";
      }
      walletDefault.id = walletDefault.address + walletDefault.getNetworkName() + walletDefault.name;      

    }
    MasterWallet.log(walletDefault, "walletSelected");
    this.setState({wallets: listWalletCoin, walletDefault: walletDefault, walletSelected: walletDefault});

  }

  

  getMessage(str){
    const { messages } = this.props.intl;
    let result = "";
    try{
      result = eval(str);
    }
    catch(e){
      console.error(e);
    }

    return result;
  }

  onCloseReceive = () => {
    this.resetForm();
  }

  updateAddressAmountValue = (evt) => {
    this.canculator(evt.target.value); 
  }

  switchValue = (showDivAmount) => {
    if (showDivAmount){
      let isCurrency = !this.state.isCurrency;
      this.setState({isCurrency: isCurrency}, () =>{
        this.canculator(this.state.inputSendAmountValue);
      });
      
    }
    
  }

  canculator(value){
    console.log("value", value);
    let isCurrency = this.state.isCurrency;
    if (isCurrency){
      let money = value, rate = 0, amount = 0;
      let rates = this.state.rates.filter(rate => rate.hasOwnProperty(this.state.walletSelected.name));

      if (rates.length > 0){
        rate = rates[0][this.state.walletSelected.name];
        if(!isNaN(money)){
          amount = money/rate;
          this.setState({
            inputSendAmountValue: money,            
            switchValue: amount
          });

          // this.props.rfChange(nameFormReceiveWallet, 'amountCoin', amount);          
        }
      }
    }
    else{
      let amount = value, rate = 0, money = 0;
      let rates = this.state.rates.filter(rate => rate.hasOwnProperty(this.state.walletSelected.name));

      if (rates.length > 0){
        rate = rates[0][this.state.walletSelected.name];
        if(!isNaN(amount)){
          money = amount * rate;
          this.setState({
            inputSendAmountValue: amount,            
            switchValue: money
          });      
        }
        // this.props.rfChange(nameFormReceiveWallet, 'amountCoin', amount);        
      }  
    }    
  }

  onItemSelectedWallet = (item) =>{
    let wallet = MasterWallet.convertObject(item);
    this.setState({walletSelected: wallet});
  }

  render() {
    const { messages } = this.props.intl;    
    let showDivAmount = (( this.state.walletSelected && ( !this.state.walletSelected.isToken && this.state.rates.filter(rate => rate.hasOwnProperty(this.state.walletSelected.name).length > 0) ) ) ) ? true : false;

    return (
      <div className="receive-coins">
          {/* <div className="bodyTitle"><span>{messages.wallet.action.receive.message} { this.state.walletSelected ? this.state.walletSelected.name : ''} </span></div> */}
          <div className={['bodyBackup bodyShareAddress']}>

          <ShowAddressWalletForm className="receivewallet-wrapper">
              { this.state.walletSelected ?
                              
                <Field
                  name="showWalletSelected"
                  component={fieldDropdown}
                  placeholder={messages.wallet.action.receive.placeholder.choose_wallet}
                  defaultText={this.state.walletSelected.text}
                  list={this.state.wallets}
                    onChange={(item) => {
                      this.setState({ walletSelected: item});
                    }
                  }
                  />
              
              :""}
              </ShowAddressWalletForm>
            
            <div className="box-qr-code">
              <QRCode onClick={() => { Clipboard.copy(this.state.walletSelected.address); this.showToast(messages.wallet.action.receive.success.share);}} size={200} value={this.state.walletSelected ? this.state.walletSelected.address : ''} />
            </div>
            <div onClick={() => { Clipboard.copy(this.state.walletSelected.address); this.showToast(messages.wallet.action.receive.success.share);}} className="addressDivPopup">{ this.state.walletSelected ? this.state.walletSelected.address : ''}</div>                      

            <ReceiveWalletForm className="receivewallet-wrapper">
              <div className="div-amount">
                <div onClick={() => {this.switchValue(showDivAmount)}} className="prepend">
                  {this.state.isCurrency ? messages.wallet.action.receive.label.usd : (this.state.walletSelected ? StringHelper.format("{0}", this.state.walletSelected.name) : '')}
                  {/* ⋮  */}
                </div>
                <Field
                  key="2"
                  name="amountCoin"
                  placeholder={"0.0"}
                  type="text"
                  className="form-control"
                  component={fieldInput}
                  value={this.state.inputSendAmountValue}
                  onChange={evt => this.updateAddressAmountValue(evt)}
                  validate={[amountValid]}
                  autoComplete="off"
                />
              { !showDivAmount ? "" :
                <div className="switch-value">
                    ≈ {this.state.switchValue}&nbsp;<b>{!this.state.isCurrency ? messages.wallet.action.receive.label.usd : (this.state.walletSelected ? StringHelper.format("{0}", this.state.walletSelected.name) : '') } </b>
                </div>
              }  
              </div>
              
            </ReceiveWalletForm>

            {/* <div className="link-request-custom-amount" onClick={() => { this.modalCustomAmountRef.open(); this.setState({ inputSendAmountValue: '' }); }}>{messages.wallet.action.receive.button.request_amount}</div> */}

            {/* <Button className="button" cssType="primary" onClick={() => { Clipboard.copy(this.state.walletSelected.address); this.showToast(messages.wallet.action.receive.success.share); this.onFinish() }} >
              {messages.wallet.action.receive.button.share}
            </Button> */}
          </div>

          {/* Modal for Custom amount : */}
          {/* <Modal title={messages.wallet.action.receive.header2} onRef={modal => this.modalCustomAmountRef = modal} onClose={() => this.onCloseReceive()} >
            <div className={['bodyBackup bodyShareAddress']}>

              <QRCode size={250} value={(this.state.walletSelected ? this.state.walletSelected.address : '') + (this.state.inputSendAmountValue != '' ? `,${this.state.inputSendAmountValue}` : '')} />
              <div className="addressDivPopup">{ this.state.walletSelected ? this.state.walletSelected.address : ''}</div>
            </div>
            <ReceiveWalletForm className="receivewallet-wrapper">
              <div className="div-amount">
                <div onClick={() => {this.switchValue(showDivAmount)}} className="prepend">
                  {this.state.isCurrency ? messages.wallet.action.receive.label.usd : (this.state.walletSelected ? StringHelper.format("{0}", this.state.walletSelected.name) : '') } 
                </div>
                <Field
                  key="2"
                  name="amountCoin"
                  placeholder={"0.0"}
                  type="text"
                  className="form-control"
                  component={fieldInput}
                  value={this.state.inputSendAmountValue}
                  onChange={evt => this.updateAddressAmountValue(evt)}
                  validate={[amountValid]}
                  autoComplete="off"
                />
              { !showDivAmount ? "" :
                <div className="switch-value">
                    ≈ {this.state.switchValue}&nbsp;<b>{!this.state.isCurrency ? messages.wallet.action.receive.label.usd : (this.state.walletSelected ? StringHelper.format("{0}", this.state.walletSelected.name) : '') } </b>
                </div>
              }  
              </div>
              
            </ReceiveWalletForm>
            <Button className="button" cssType="primary" onClick={() => { this.modalCustomAmountRef.close(); this.onFinish() }} >
              {messages.wallet.action.receive.button.done}
            </Button>
          </Modal> */}
      </div>
    )
  }
}

ReceiveCoin.propTypes = {
  wallet: PropTypes.any,
  active: PropTypes.bool,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  rfChange: bindActionCreators(change, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
  showLoading: bindActionCreators(showLoading, dispatch),
  hideLoading: bindActionCreators(hideLoading, dispatch),
  getCryptoPrice: bindActionCreators(getCryptoPrice, dispatch),
  clearFields: bindActionCreators(clearFields, dispatch),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ReceiveCoin));
