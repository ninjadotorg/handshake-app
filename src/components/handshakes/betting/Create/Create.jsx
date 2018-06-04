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
import  { BetHandshakeHandler, SIDE} from '@/components/handshakes/betting/Feed/BetHandshakeHandler.js';
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
      "desc": "[{\"key\": \"event_bet\",\"suffix\": \"ETH\",\"label\": \"Amount\", \"placeholder\": \"10\", \"type\": \"number\", \"className\": \"betField\"}] [{\"key\": \"event_odds\", \"label\": \"Odds\", \"placeholder\": \"10\",\"prefix\": \"1 -\", \"className\": \"oddField\"}]",
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
    };
    this.onSubmit = ::this.onSubmit;
    this.renderInput = ::this.renderInput;
    this.renderDate = ::this.renderDate;
    this.renderForm = ::this.renderForm;
    this.renderNumber = ::this.renderNumber;
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
    console.log('Receive Props: ', nextProps);
    const {matches} = nextProps;
    console.log(`${TAG} Matches:`, matches);

    this.setState({
        matches
    })
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
  return matches.map((item) => ({ id: item.id, value: `${item.awayTeamName} - ${item.homeTeamName}` }));
}
get matchResults(){
  const {selectedMatch, matches} = this.state;
  if(selectedMatch){
      const foundMatch = this.foundMatch;
      if (foundMatch){
          const {outcomes} = foundMatch;
          if(outcomes){
              return outcomes.map((item) => ({ id: item.id, value: item.name, hid: item.id}));
          }
      }
  }


  return [];
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
    const balance = await BetHandshakeHandler.getBalance();
    console.log('Event Bet:', dict.event_bet);

    const fromAddress = address;

    if(selectedMatch && selectedOutcome && dict.event_bet > 0 && dict.event_bet <= balance){
      this.initHandshake(extraParams, fromAddress);

    }
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

  renderInput(item, index,style = {}) {
    const {key, placeholder, type} = item;
    const className = 'form-control-custom input';
    return (
      <Field
        style={style}
        component={InputField}
        type="text"
        placeholder={placeholder}
        className={className}
        name={key}
        validate={[required]}
        ErrorBox={ErrorBox}
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
        type="number"
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

  // renderItem(field, index) {
  //   const item = JSON.parse(field.replace(regexReplace, ''));
  //   const {key, placeholder, type, label, className,suffix,prefix} = item;
  //   let itemRender = this.renderInput(item, index);
  //   switch (type) {
  //     case 'date':
  //       itemRender = this.renderDate(item, index);
  //       break;
  //     case 'number':
  //       itemRender = this.renderNumber(item,{width:'100%', paddingRight:40} );
  //       break;
  //     default:
  //       itemRender = this.renderInput(item, index);
  //   }

  //   // return (
  //   //       <Col className="col-6">
  //   //         <Row><label>{label || placeholder}</label></Row>
  //   //         <Row><Col>{itemRender}</Col></Row>
  //   //       </Col>

  //   //     );
  //   return (
  //     <Col className="col-6">
  //         <Row><label>{label || placeholder}</label></Row>
  //         <Row>
  //           <Col  style={{position:'relative'}}>{prefix&&<label style={{backgroundColor:'green'}}>{prefix}</label>}{itemRender}{suffix&&<label style={{position:'absolute',right:0}}>{suffix}</label>}</Col>
  //         </Row>
  //     </Col>
  //       );
  // }
  renderLabelForItem=(text,{marginLeft,marginRight})=>{
    return text&&<label className="itemLabel" style={{display:'flex',color:'white',fontSize:16,marginLeft:marginLeft,marginRight:marginRight,alignItems:'center'}}>{text}</label>;
  }
   renderItem(field, index) {
    const item = JSON.parse(field.replace(regexReplace, ''));
    const {key, placeholder, type, label, className,suffix,prefix} = item;
    let itemRender = null;//this.renderInput(item, index);
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
      <div style={{display:'flex',flex:1,flexDirection:'column',marginTop:2,marginBottom:2}}>
          <label style={{fontSize:13, color:'white'}}>{label || placeholder}</label>
          <div style={{display:'flex',flex:1,flexDirection:'row',border:'1px solid #697076',padding:10}}>
            {this.renderLabelForItem(prefix,{marginRight:10})}
            <div style={{display:'flex',flex:1,flexDirection:'column',alignItems:'flex-start'}}>
              {itemRender}
            </div>
            {this.renderLabelForItem(suffix,{marginLeft:10})}
          </div>

      </div>
        );
  }

  renderForm() {
    const inputList = this.inputList;
    const {selectedMatch} = this.state;
    return (
      <BettingCreateForm className="wrapperBetting" onSubmit={this.onSubmit}>
        <div className="dropDown">
          <Dropdown
            placeholder="Select a match"
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
            placeholder="Select a prediction"
            source={this.matchResults}
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
          <div className="formInput" style={{backgroundColor:'#3A444D',padding:10}}>
            <div style={{display:'flex',flexDirection:'column',flex:1,marginBottom:10}}>
              {inputList.map((field, index) => this.renderItem(field, index))}
            </div>
            <Toggle ref={(component) => {this.toggleRef = component}} onChange={this.onToggleChange} />
        </div>


        <Button type="submit" block>Sign & Send</Button>
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
        message: <div className="text-center">Create a bet successfully</div>,
        timeOut: 3000,
        type: 'danger',
        callBack: () => {
        }
      });
    }


  }
  initHandshakeFailed = (error) => {
    console.log('initHandshakeFailed', error);
  }


  //Blockchain
  /*
  async initBet(escrow, odd, eventDate){

    const address = "0x54CD16578564b9952d645E92b9fa254f1feffee9";
    const privateKey = "9bf73320e0bcfd7cdb1c0e99f334d689ef2b6921794f23a5bffd2a6bb9c7a3d4";
    const acceptors = [];
    const goal = escrow*odd;
    const currentDate = new Date();
    const deadline = (eventDate.getTime() / 1000 - currentDate.getTime() / 1000);
    const offchain = 'abc1';
    const data = await neuron.bettingHandshake.initBet(address, privateKey, acceptors, goal, escrow, deadline, offchain);
    console.log('Init Betting:', data);

  }*/
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
