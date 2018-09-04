import React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  API_URL,
  CRYPTO_CURRENCY,
  EXCHANGE_ACTION,
  FIAT_CURRENCY,
  MIN_AMOUNT,
  NB_BLOCKS,
  URL
} from "@/constants";
import createForm from "@/components/core/form/createForm";
import { change, Field } from "redux-form";
import "./Deposit.scss";
import { fieldInput } from "@/components/core/form/customField";
import iconPaypal from "@/assets/images/icon/icons8-paypal.svg";
import { formatMoneyByLocale } from "@/services/offer-util";
import {
  isNormalInteger,
  minValue,
  number,
  required
} from "@/components/core/form/validation";
import { bindActionCreators } from "redux";
import {
  createCreditATM,
  depositCoinATM,
  getCreditATM,
  trackingDepositCoinATM
} from "@/reducers/exchange/action";
import { getErrorMessageFromCode } from "@/components/handshakes/exchange/utils";
import { hideLoading, showAlert, showLoading } from "@/reducers/app/action";
import { MasterWallet } from "@/services/Wallets/MasterWallet";

import "./CommonStyle.scss";
import "./Withdraw.scss";

const nameFormEscrowWithdraw = "escrowWithdraw";
const FormEscrowWithdraw = createForm({
  propsReduxForm: {
    form: nameFormEscrowWithdraw
  }
});

class EscrowWithdraw extends React.Component {
  render() {
    const { messages } = this.props.intl;
    const { intl, hideNavigationBar } = this.props;
    const { listOfferPrice } = this.props;

    return (
      <div className="escrow-withdraw">
        <div>
          <button className="btn btn-lg bg-transparent d-inline-block btn-close">
            &times;
          </button>
        </div>
        <div className="wrapper font-weight-normal">
          <FormEscrowWithdraw>
            <h4 className="font-weight-bold">Withdraw money</h4>
            <div className="d-table w-100">
              <div className="d-table-cell escrow-label">Your balance:</div>
              <div className="d-table-cell text-right">
                <span className="blue-text font-weight-bold">$</span> 22,567,291
              </div>
            </div>

            <div className="mt-4">
              <div className="escrow-label">Your Paypal username</div>
              <div>
                <Field
                  name="paypal-username"
                  className="form-control w-100"
                  type="text"
                  component={fieldInput}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="escrow-label">Amount</div>
              <div>
                <Field
                  name="amount"
                  className="form-control w-100"
                  type="text"
                  component={fieldInput}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-block btn-escrow-primary"
              >
                <img src={iconPaypal} className="mr-2" width={20} />
                <span>Withdraw to your PayPal</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <small className="escrow-label">
                It will take within a day for us <br /> to transfer money into
                your account.
              </small>
            </div>
          </FormEscrowWithdraw>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  depositInfo: state.exchange.depositInfo
});

const mapDispatch = dispatch => ({
  rfChange: bindActionCreators(change, dispatch)
});

export default injectIntl(connect(mapState, mapDispatch)(EscrowWithdraw));
