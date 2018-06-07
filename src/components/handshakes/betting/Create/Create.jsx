import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '@/services/history';
// service, constant
import createForm from '@/components/core/form/createForm';
import { required } from '@/components/core/form/validation';
import { Field } from "redux-form";
import { initHandshake } from '@/reducers/handshake/action';
import { loadMatches } from '@/reducers/betting/action';
import { HANDSHAKE_ID, API_URL, APP } from '@/constants';
import  { BetHandshakeHandler, SIDE, MESSAGE} from '@/components/handshakes/betting/Feed/BetHandshakeHandler.js';
import { URL } from '@/config';
import local from '@/services/localStore';

// components
import Button from '@/components/core/controls/Button';
import Input from '@/components/core/forms/Input/Input';
import DatePicker from '@/components/handshakes/betting/Create/DatePicker';
import { InputField } from '../form/customField';
import {MasterWallet} from '@/models/MasterWallet';
import Dropdown from '@/components/core/controls/Dropdown';
import Toggle from '@/components/handshakes/betting/Feed/Toggle';
import {showAlert} from '@/reducers/app/action';

import { BettingHandshake } from '@/services/neuron';
// self
import './Create.scss';

const wallet = MasterWallet.getWalletDefault('ETH');
const chainId = wallet.chainId;
console.log('Chain Id:', chainId);

const bettinghandshake = new BettingHandshake(chainId);
const nameFormBettingCreate = 'bettingCreate';
const BettingCreateForm = createForm({
  propsReduxForm: {
    form: nameFormBettingCreate,
  },
});

const regex = /\[.*?\]/g;
const regexReplace = /\[|\]/g;
const regexReplacePlaceholder = /\[.*?\]/;




class ErrorBox extends React.PureComponent {
  render() {
    return (
      <div className="text-danger">
        {this.props.children}
      </div>
    );
  }
}

const TAG = 'BETTING_CREATE';
class BettingCreate extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    toAddress: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    industryId: PropTypes.number.isRequired,
    onClickSend: PropTypes.func,
    initHandshake: PropTypes.func.isRequired,
  }

  static defaultProps = {
    item: {
      "backgroundColor": "#332F94",
      "desc": "[{\"key\": \"event_bet\",\"suffix\": \"ETH\",\"label\": \"Amount\", \"placeholder\": \"0.00\", \"type\": \"number\", \"className\": \"amount\"}] [{\"key\": \"event_odds\", \"label\": \"Odds\", \"placeholder\": \"2.0\",\"prefix\": \"1 -\", \"className\": \"atOdds\", \"type\": \"number\"}]",
      "id": 18,
      "message": null,
      "name": "Bet",
      "order_id": 5,
      "public": 1
    },
    toAddress: "sa@autonomous.nyc",
    isPublic: true,
    industryId: 18,
  }

  constructor(props) {
    super(props);
    this.state = {
      values: {},
      address: null,
      privateKey: null,
      matches: [],

      selectedMatch:null,
      selectedOutcome: null,
      buttonClass: 'btnRed',
    };
    this.onSubmit = ::this.onSubmit;
    this.renderInput = ::this.renderInput;
    this.renderDate = ::this.renderDate;
    this.renderForm = ::this.renderForm;
    this.renderNumber = ::this.renderNumber;
    this.onToggleChange = ::this.onToggleChange;
  }
  componentDidMount(){
    console.log('Betting Create Props:', this.props, history);
    this.setState({
      address: wallet.address,
      privateKey: wallet.privateKey,
    })
    this.props.loadMatches({PATH_URL: API_URL.CRYPTOSIGN.LOAD_MATCHES});

  }
  componentWillReceiveProps(nextProps){
    //console.log('Receive Props: ', nextProps);
    const {matches} = nextProps;
    console.log(`${TAG} Matches:`, matches);

    this.setState({
        matches
    })
}
getStringDate(date){
  var formattedDate = moment(date).format('MMM DD: HH.mm');
  return formattedDate;

}
get foundMatch(){
  const {selectedMatch, matches} = this.state;
  if(selectedMatch){
      return matches.find(function(element) {
          return element.id  === selectedMatch.id;
        });
  }
  return null;

}

get matchNames() {
  const {matches} = this.state;
  //return matches.map((item) => ({ id: item.id, value: `${item.homeTeamName} - ${item.awayTeamName} (${this.getStringDate(item.date)})` }));
  return matches.map((item) => ({ id: item.id, value: `${item.name} (${this.getStringDate(item.date)})`, marketFee: item.market_fee }));

}
get matchOutcomes(){
  const {selectedMatch, matches} = this.state;
  if(selectedMatch){
      const foundMatch = this.foundMatch;
      if (foundMatch){
          const {outcomes} = foundMatch;
          if(outcomes){
              //return outcomes.map((item) => ({ id: item.id, value: item.name, hid: item.hid}));
              return outcomes.map((item) => ({ id: item.id, value: `${item.name} (Odds:${parseFloat(item.market_odds).toFixed(2)})`, hid: item.hid, marketOdds: item.market_odds}));

          }
      }
  }


  return [];
}
get defaultMatch() {
  const matchNames = this.matchNames;
  const { matchId } = this.props;
  if (matchNames && matchNames.length > 0) {
      const itemDefault = matchNames.find(item => item.id === matchId);
      return itemDefault || matchNames[0];
      // if (itemDefault) {
      //     return itemDefault;
      // } else {
      //     return matchNames[0];
      // }
  }
  return null;
}

get defaultOutcome() {
  const matchOutcomes = this.matchOutcomes;
  //console.log('defaultOutcome matchOutcomes: ', matchOutcomes);
  const { outComeId } = this.props;
  if (matchOutcomes && matchOutcomes.length > 0) {
      const itemDefault = matchOutcomes.find(item => item.id === outComeId);
      return itemDefault || matchOutcomes[0];
  }
  return null;
  // return matchOutcomes && matchOutcomes.length > 0 ? matchOutcomes[0] : null;
}

  async onSubmit(dict) {
    const {address, privateKey, values, selectedMatch, selectedOutcome} = this.state;
    console.log("values", values);

    let content = this.content;
    const inputList = this.inputList;
    let extraParams = values;
    console.log('Before Content:', content);

    inputList.forEach(element => {
      const item = JSON.parse(element.replace(regexReplace, ''));
      console.log('Element:', item);
      const {key, placeholder, type} = item;
      const valueInputItem = key === 'event_date' ? this.datePickerRef.value : values[key];
      content = content.replace(
        regexReplacePlaceholder,
        valueInputItem ? valueInputItem : ''
      );
    });
    console.log('After Content:', content);
    //console.log("this", this.datePickerRef.value);

    //const {toAddress, isPublic, industryId} = this.props;

    //const fromAddress = "0x54CD16578564b9952d645E92b9fa254f1feffee9";
    let balance = await BetHandshakeHandler.getBalance();
    balance = parseFloat(balance);
    const estimatedGas = await bettinghandshake.getEstimateGas();
    console.log('Estimate Gas:', estimatedGas);
    const eventBet = parseFloat(dict.event_bet);
    const total = eventBet + parseFloat(estimatedGas);
    console.log("Total:", total);

    const fromAddress = address;
    console.log('Match, Outcome:', selectedMatch, selectedOutcome);

    if(selectedMatch && selectedOutcome){
      if(eventBet > 0){
        if(total <= balance){
          this.initHandshake(extraParams, fromAddress);
        }else {
          this.props.showAlert({
            message: <div className="text-center">{MESSAGE.NOT_ENOUGH_BALANCE}</div>,
            timeOut: 3000,
            type: 'danger',
            callBack: () => {
            }
          });
        }
      }
    }else {
      this.props.showAlert({
        message: <div className="text-center">{MESSAGE.CHOOSE_MATCH}</div>,
        timeOut: 3000,
        type: 'danger',
        callBack: () => {
        }
      });
    }


    // if(selectedMatch && selectedOutcome && eventBet > 0 && eventBet <= balance){
    //   this.initHandshake(extraParams, fromAddress);

    // }else {

    // }
  }

  get inputList() {
    const content = this.content;
    return content ? content.match(regex) : [];
  }

  get content() {
    const { desc } = this.props.item;
    return desc || '';
  }

  changeText(key, text) {
    const {values} = this.state;
    values[key] = text;
    this.setState({values});
  }

  onToggleChange(id) {
    this.setState({buttonClass: `${id === 2 ? 'btnBlue' : 'btnRed' }`});
  }

  renderInput(item, index,style = {}) {
    const {key, placeholder, type} = item;
    const className = 'amount';
    
    return (
      <Field
        //style={style}
        component={InputField}
        type="text"
        placeholder={placeholder}
        //className={className}
        className={cn('form-control-custom input', className || '')}
        name={key}
        validate={[required]}
        //ErrorBox={ErrorBox}
        onChange={(evt) => {
          this.changeText(key, evt.target.value)
        }}
      />
    );
  }

  renderDate(item) {
    const {key, placeholder, type} = item;

    return (
      <DatePicker
        onChange={(selectedDate) => {
          console.log('SelectedDate', selectedDate);
          console.log('Key:', key);
          const {values} = this.state;
          values[key] = selectedDate.format();
          this.setState({values}, ()=>console.log(values));

        }}
        inputProps={{
          readOnly: true,
          className: 'form-control-custom input',
          name: key,
        }}
        defaultValue={new Date()}
        dateFormat="D/M/YYYY"
        timeFormat="HH:mm"
        closeOnSelect
        ref={(component) => {this.datePickerRef = component;}}
      />
    );
  }

  renderNumber(item, style={}) {
    const {key, placeholder} = item;

    return (
      <Field
        className="form-control-custom input"
        name={key}
        style={style}
        component={InputField}
        type="text"
        //min="0.0001"
        //step="0.0002"
        placeholder={placeholder}
        validate={[required]}
        ErrorBox={ErrorBox}
        onChange={(evt) => {
          this.changeText(key, evt.target.value)
        }}
      />
    );
  }

  renderLabelForItem=(text,{marginLeft,marginRight})=>{
    return text&&<label className="itemLabel" style={{display:'flex',color:'white',fontSize:16,marginLeft:marginLeft,marginRight:marginRight,alignItems:'center'}}>{text}</label>;
  }
   renderItem(field, index) {
    const item = JSON.parse(field.replace(regexReplace, ''));
    const {key, placeholder, type, label, className,suffix,prefix} = item;
    let itemRender = null;//this.renderInput(item, index);
    const {selectedOutcome} = this.state;
    console.log('Selected Outcome:', selectedOutcome);
    const marketOdds = (selectedOutcome && selectedOutcome.marketOdds) ? selectedOutcome.marketOdds : 0; 
    console.log('Market Odds:', marketOdds);
    switch (type) {
      case 'date':
        itemRender = this.renderDate(item, index);
        break;
      case 'number':
        itemRender = this.renderNumber(item,{width:'100%',fontSize:16,color:'white'} );
        break;
      default:
        itemRender = this.renderInput(item, index,{width:'100%',fontSize:16,color:'white'} );
    }

    return (
      <div className="rowWrapper" key={index + 1} >
          <label style={{fontSize:13, color:'white'}}>{label || placeholder}</label>
            {itemRender}
            {
              suffix && <div className="cryptoCurrency">{suffix}</div>

            }

      </div>
        );
  }

  renderForm() {
    const inputList = this.inputList;
    const { selectedMatch, buttonClass } = this.state;
    const defaultMatchId = this.defaultMatch ? this.defaultMatch.id : null;
    const defaultOutcomeId = this.defaultOutcome ? this.defaultOutcome.id : null;

    return (
      <BettingCreateForm className="wrapperBetting" onSubmit={this.onSubmit}>
        <div className="dropDown">
          <Dropdown
            placeholder="Select an event"
            defaultId={defaultMatchId}
            afterSetDefault={(item)=>{
              const {values} = this.state;
              values["event_name"] = item.value;
              this.setState({selectedMatch: item, values})
            }}
            source={this.matchNames}
            onItemSelected={(item) =>
              {
                const {values} = this.state;
                values["event_name"] = item.value;
                this.setState({selectedMatch: item, values});

              }
              }
          />

          {selectedMatch && <Dropdown
            placeholder="Select an outcome"
            defaultId={defaultOutcomeId}
            source={this.matchOutcomes}
            afterSetDefault={(item)=> {
              const {values} = this.state;
              values["event_predict"] = item.value;
              this.setState({selectedOutcome: item, values})
              
            }}
            onItemSelected={(item) => {
              const {values} = this.state;
              values["event_predict"] = item.value;
              this.setState({selectedOutcome: item, values})
              }
            }
          />}
        </div>

        {/*<Grid className="formInput">
        <Row className="row-6">
          {inputList.map((field, index) => this.renderItem(field, index))}
          </Row>
        </Grid>
          */}
          <div className="formInput" style={{backgroundColor:'#3A444D'}}>
            <Toggle
              ref={(component) =>
              {this.toggleRef = component}}
              onChange={this.onToggleChange}
            />
            <div style={{display:'flex',flexDirection:'column',flex:1,marginBottom:10}}>
              {inputList.map((field, index) => this.renderItem(field, index))}
            </div>
        </div>


        <Button type="submit" block className={buttonClass}>Shake and Send</Button>
      </BettingCreateForm>
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }





  //Service
  initHandshake(fields, fromAddress){
    const {selectedOutcome} = this.state;
    const side = this.toggleRef.value;
    const params = {
      //to_address: toAddress ? toAddress.trim() : '',
      //public: isPublic,
      //description: content,
      // description: JSON.stringify(extraParams),
      //industries_type: industryId,
      type: HANDSHAKE_ID.BETTING,
      //type: 3,
      //extra_data: JSON.stringify(fields),
      outcome_id: selectedOutcome.id,
      //outcome_id: selectedOutcome.hid,
      //outcome_id: 10,
      odds: parseFloat(fields['event_odds']),
      amount: parseFloat(fields['event_bet']),
      extra_data: JSON.stringify(fields),
      currency: 'ETH',
      side: parseInt(side),
      from_address: fromAddress,
      chain_id: chainId,
    };
    console.log("Params:", params);
    const hid = selectedOutcome.hid;

    this.props.initHandshake({PATH_URL: API_URL.CRYPTOSIGN.INIT_HANDSHAKE, METHOD:'POST', data: params,
    successFn: this.initHandshakeSuccess,
    errorFn: this.handleGetCryptoPriceFailed
  });

  }
   initHandshakeSuccess = async (successData)=>{
    console.log('initHandshakeSuccess', successData);

    const {status, data} = successData
    const {values, selectedOutcome} = this.state;
    // const stake = values['event_bet'];
    // const event_odds = values['event_odds'];
    // const payout = stake * event_odds;
    //const hid = selectedOutcome.id;
    const hid = selectedOutcome.hid;
    if(status && data){
      BetHandshakeHandler.controlShake(data, hid);
      this.props.showAlert({
        message: <div className="text-center">{MESSAGE.CREATE_BET_SUCCESSFUL}</div>,
        timeOut: 3000,
        type: 'success',
        callBack: () => {
          this.props.history.push(URL.HANDSHAKE_ME);
        }
      });
    }


  }
  initHandshakeFailed = (error) => {
    console.log('initHandshakeFailed', error);
  }

}
const mapState = state => ({
  matches: state.betting.matches,
});
const mapDispatch = ({
  initHandshake,
  loadMatches,
  showAlert

});

export default connect(mapState, mapDispatch)(BettingCreate);
