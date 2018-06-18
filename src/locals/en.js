export default {
  HELLO: 'hello {name}',
  buy: 'Buy',
  sell: 'Sell',
  amount: 'amount',
  askUsingCreditCard: 'for {total} {fiatCurrency} using card?',
  change: 'Change',
  ccNumber: 'Number',
  ccExpire: 'Expiry',
  ccCVC: 'CVC',
  overCCLimit: 'You have reached your credit card limit! You have already used {currency}{amount} in the dojo today. ',

  required: 'Required',
  ccExpireTemplate: 'MM/YY',
  securityCode: '325',
  shakeNow: 'Shake',
  offerHandShakeContent: '{offerType} {amount} {currency} for {total} {currency_symbol} in {payment_method}?',
  offerHandShakeContentMe: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  offerHandShakeExchangeContentMe: '{offerType} {something} for {amount} {currency}',
  offerHandShakeContentMeDone: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  offerHandShakeExchangeContentMeDone: '{offerType} {something} for {amount} {currency}',
  instantOfferHandShakeContent: 'You{just}{offerType} {amount} {currency} for {total} {currency_symbol} on your card - fee {fee}%',
  offerDistanceContent: '{distance} away',
  transactonOfferInfo: 'Successful ({success}) / Failed ({failed})',
  createOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  handshakeOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  rejectOfferConfirm: 'Do you want to Reject this handshake? You will not be able to make transactions for 4 hours.',
  completeOfferConfirm: 'Finish shaking?',
  withdrawOfferConfirm: 'Are you sure you want to withdraw?',
  cancelOfferConfirm: 'Cancel this order?',
  closeOfferConfirm: 'Finish your order?',
  acceptOfferConfirm: 'Accept the order?',
  createOfferSuccessMessage: 'Success! You have created an offer on Ninja.',
  shakeOfferSuccessMessage: 'Success! A ninja has shaked on your order.',
  closeOfferSuccessMessage: 'Success! Your order is now closed.',
  completeShakedfferSuccessMessage: 'You have successfully shaked on Ninja',
  cancelShakedfferSuccessMessage: 'You have cancelled your order ',
  withdrawShakedfferSuccessMessage: 'Your offer has been withdrawn.',
  buyUsingCreditCardSuccessMessge: 'Your order using your credit card has gone through.',
  notEnoughCoinInWallet: 'You don\'t have enough coin right now. Please top up your wallet.',

  createOfferStoreConfirm: 'Do you want to create offer Buy {amountBuy} {currency} - Sell {amountSell} {currency}?',
  notEnoughCoinInWalletStores: 'You don\'t have enough coin right now. Please top up your wallet.',
  addOfferItemSuccessMassage: 'Success! Your order is now listed on Ninja',
  deleteOfferItemSuccessMassage: 'You have successfully deleted your order.',
  shakeOfferItemSuccessMassage: 'You have successfully shaked on Ninja',
  acceptOfferItemSuccessMassage: 'Good news! Your order has been accepted.',
  cancelOfferItemSuccessMassage: 'Your order has been cancelled!',
  rejectOfferItemSuccessMassage: 'You rejected a fellow ninja\'s order.',
  completeOfferItemSuccessMassage: 'Good news! Your order has been completed.',
  offerStoresAlreadyCreated: 'Oops! You already created an order on Ninja.',
  offerStoreHandShakeContent: '{offerTypeBuy} {amountBuy} {currency} at {fiatAmountBuy} {fiatAmountCurrency}. {offerTypeSell} {amountSell} {currency} at {fiatAmountSell} {fiatAmountCurrency}',
  requireDefaultWalletOnMainNet: 'You must set your wallet on Mainnet',
  movingCoinToEscrow: 'Moving your coin to escrow. This may take a few minutes.',
  movingCoinFromEscrow: 'Moving your coin from escrow. This may take a few minutes.',
  'ex.create.label.amountBuy': 'Inventory for purchase',
  'ex.create.label.amountSell': 'Inventory for sale',
  'ex.create.label.marketPrice': 'Market price',
  'ex.create.label.premiumBuy': 'Your buying price',
  'ex.create.label.premiumSell': 'Your selling price',
  'ex.create.label.nameStation': 'Station name',
  'ex.create.label.phone': 'Phone',
  'ex.create.label.address': 'Address',
  'ex.create.label.exchangeRate': 'Exchange rate',
  'ex.create.label.stationInfo': 'Station information',
  'ex.discover.label.priceBuy': 'BUY',
  'ex.discover.label.priceSell': 'SELL',
  'ex.discover.label.reviews': '({reviewCount} reviews)',
  'ex.discover.banner.text': 'Got coins? Turn them into a money-making machine.',
  'ex.discover.banner.btnText': 'BECOME A LOCAL EXCHANGE',
  'ex.discover.shakeDetail.label.amount': 'Amount',
  'ex.discover.shakeDetail.label.total': 'Total',
  'ex.me.label.with': 'With',
  'ex.me.label.from': 'From',
  'ex.me.label.about': 'About',
  'ex.btn.confirm': 'Confirm',
  'ex.btn.notNow': 'Not now',
  'btn.initiate': 'Initiate',
  'btn.shake': 'Shake',
  'btn.reject': 'Reject',
  'btn.complete': 'Complete',
  'btn.withdraw': 'Withdraw',
  'btn.cancel': 'Cancel',
  'btn.close': 'Close',
  'btn.accept': 'Accept',

  // FAQ
  FAQ_TITLE: 'FAQ',
  FAQ_HEADER_YELLOW: 'Decentralized',
  FAQ_HEADER: 'Prediction Exchange',
  FAQ_DATA: [
    {
      question: 'What is Ninja PEX?',
      answer: 'Ninja is an anonymous peer-to-peer decentralized prediction exchange running on top of the Ethereum blockchain.',
    },
    {
      question: 'What’s special about PEX? Why should i bet on one?',
      answer: 'It allows parties to directly bet against each other without going through a central authority or bookmaker. This makes it 100% anonymous, no signs up no downloads required. The management of bets and the settlement of winnings are carried out collectively by the blockchain network, protecting users from any single point of failure. You can also create your own prediction markets.',
    },
    {
      question: 'Do I need Ether? Does it support other cryptocurrencies?',
      answer: 'It allows parties to directly bet against each other without going through a central authority or bookmaker. This makes it 100% anonymous, no signs up no downloads required. The management of bets and the settlement of winnings are carried out collectively by the blockchain network, protecting users from any single point of failure. You can also create your own prediction markets.',
    },
    {
      question: 'How do I start with Ninja?',
      isList: true,
      answer: [
        {
          title: 'Get Ether:',
          content: ' You can either buy ETH directly in PEX with your credit cards or from popular coin exchanges like Coinbase or Binance.',
        },
        {
          title: 'Top up your PEX Wallet:',
          content: 'You can either buy ETH directly in PEX with your credit cards or from popular coin exchanges like Coinbase or Binance.',
        },
        {
          title: 'Place a bet:',
          content: 'Pick the market you want to bet (i.e. Brazil - Spain), the outcomes (i.e. Brazil wins) and the site (i.e. support or bet against the outcome)\n' +
          'Enter the stake you want to bet (i.e. 1 ETH) and the odds (i.e. 1/ 2.25)\n' +
          'The PEX Matching Engine will then find another order that bets against the odds you set.',
        },
        {
          title: 'Wait for the report:',
          content: 'if you win, your winnings will be automatically transferred from the escrow smart contract to your account.',
        },
      ],
    },
    {
      question: 'What’s special about PEX? Why should i bet on one?',
      answer: 'Yes! When creating your own bet, you’ll enter the event you’re interested in and the outcome you want to bet on. Then, simply enter your stake and the odds you want. Then the PEX Engine will automatically find and match you with anyone that has an interest in the same event, and who accepts your odds.',
    },
    {
      question: 'How do you police unsavory/illegal bets?',
      answer: 'We are currently building a system of checks and balances to flag up inappropriate behaviour in the dojo.',
    },
    {
      question: 'How does the system know the result of bets between people? Who acts as arbitrator and verifies one outcome vs. another at conclusion of contract?',
      answer: 'Ninja will soon have a completely decentralized solution for verifying the outcome and incentivizing truth telling (a DAO of reporters!). In the meantime, as we will launch just in time for the FIFA world cup, our team will use a public source (livescore.com) and act as the reporter.',
    },
    {
      question: 'Where is the coin held?',
      answer: 'No one holds the funds. All the funds are kept safe in escrow until a resolution is reached.',
    },
    {
      question: 'Why should I bet on blockchain instead of using traditional methods?',
      answer: 'A decentralized prediction exchange will provide you the freedom to create your own odds and bet directly with anyone, offer you 100% ninja anonymity and guaranteed payouts.',
    },
    {
      question: 'How about privacy and anonymity?',
      answer: 'Ninja requires no downloads, and no sign ups. That means no passwords, no phone numbers and no emails. 100% anonymity.',
    },
    {
      question: 'Do I need to pay any fees?',
      answer: 'There are two main types of fees: creator fees (for the ninja that creates the bet) and the network fee (a percentage of the creator fee, that goes towards maintaining the platform).',
    },
    {
      question: 'What do I need to do when the outcome is finalized?',
      answer: 'Nothing. If you win, your winnings will be automatically transferred to your account. If you lose, it will be someone else’s account.',
    },
    {
      question: 'Where can I find a match to bet on?',
      answer: 'On the homepage, you’ll be able to browse ongoing bets and markets. If you can’t find any you like, create your own!',
    },
    {
      question: 'Other than sports, can I bet on anything else? How does it work?',
      answer: 'Very soon, Ninja will apply to everything under the sun. The only limitation will be your creativity. You can easily create any market on any future event, be it sports, politics, science, markets, climate… you name it.',
    },
    {
      question: 'What’s gonna happen to the Handshake mobile app?',
      answer: 'We will be integrating Handshake (and your favourite features like promises, IOUs, contract upload, etc.) into the Ninja mobile website.',
    },
  ],

  // MobileOrTablet components
  MOT_TITLE: 'The anonymous exchange of anything',
  MOT_CONTENT_0: 'The Ninja network is only accessible via mobile.',
  MOT_CONTENT_1: 'Open',
  MOT_CONTENT_2: 'on your mobile browser to gain anonymous entry.',
  MOT_CONTENT_3: 'No download needed. No sign up required.',
  MOT_LIST_CONTENT: [
    {
      mainContent: 'Read the',
      placeHolderLink: 'whitepaper',
      link: 'https://medium.com/@ninjadotorg/shakeninja-bex-1c938f18b3e8',
      isBlankTarget: true,
    },
    {
      mainContent: 'We answered your',
      placeHolderLink: 'FAQ',
      link: '/faq',
    },
    {
      mainContent: 'Join the dojo on',
      placeHolderLink: 'Telegram',
      link: 'https://t.me/ninja_org',
      isBlankTarget: true,
    },
  ],
};
