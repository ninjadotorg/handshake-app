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

  createOfferStoreConfirm: 'Do you want to set up an offer to {intentMsg}?',
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
  'ex.create.label.amountBuy': 'I want to buy',
  'ex.create.label.amountSell': 'I want to sell',
  'ex.create.label.marketPrice': 'Current market price',
  'ex.create.label.premiumBuy': 'Your buying price',
  'ex.create.label.premiumSell': 'Your selling price',
  'ex.create.label.nameStation': 'Station name',
  'ex.create.label.phone': 'Phone',
  'ex.create.label.address': 'Meet-up place',
  'ex.create.label.exchangeRate': 'Exchange rate',
  'ex.create.label.stationInfo': 'Station information',

  'ex.createLocal.label.iWantTo': 'I want to',
  'ex.createLocal.placeholder.anyItem': 'any item or service',
  'ex.createLocal.label.coin': 'Coin',
  'ex.createLocal.label.amount': 'Amount',
  'ex.createLocal.label.phone': 'Phone',
  'ex.createLocal.label.address': 'Meet-up place',

  'ex.discover.label.priceBuy': 'BUY',
  'ex.discover.label.priceSell': 'SELL',
  'ex.discover.label.reviews': '({reviewCount})',
  'ex.discover.banner.text': 'Got coins? Turn them into a money-making machine.',
  'ex.discover.banner.btnText': 'BECOME A LOCAL EXCHANGE',
  'ex.discover.shakeDetail.label.amount': 'Amount',
  'ex.discover.shakeDetail.label.total': 'Total',
  'ex.me.label.with': 'With',
  'ex.me.label.from': 'From',
  'ex.me.label.about': 'About',
  'ex.btn.confirm': 'Confirm',
  'ex.btn.OK': 'OK',
  'ex.btn.notNow': 'Not now',

  'ex.label.buy': 'Buy',
  'ex.label.sell': 'Sell',
  'ex.label.bought': 'Bought',
  'ex.label.sold': 'Sold',
  'ex.label.buying': 'Buying',
  'ex.label.selling': 'Selling',
  'ex.label.buyer': 'buyer',
  'ex.label.seller': 'seller',

  'ex.exchange.status.created': 'created',
  'ex.exchange.status.active': 'active',
  'ex.exchange.status.closing': 'closing',
  'ex.exchange.status.closed': 'closed',
  'ex.exchange.status.shaking': 'shaking',
  'ex.exchange.status.shake': 'shake',
  'ex.exchange.status.completing': 'completing',
  'ex.exchange.status.completed': 'completed',
  'ex.exchange.status.withdrawing': 'withdrawing',
  'ex.exchange.status.withdraw': 'withdraw',
  'ex.exchange.status.rejecting': 'rejecting',
  'ex.exchange.status.rejected': 'rejected',

  'ex.cc.status.processing': 'Processing',
  'ex.cc.status.success': 'Done',
  'ex.cc.status.cancelled': 'Failed',

  'ex.shop.status.created': 'Verifying...',
  'ex.shop.status.active': 'Active',
  'ex.shop.status.closing': 'Pending...',
  'ex.shop.status.closed': 'Closed',

  'ex.shop.shake.status.pre_shaking': 'Shake pending',
  'ex.shop.shake.status.pre_shake': 'Shook',
  'ex.shop.shake.status.shaking': 'Shake pending...',
  'ex.shop.shake.status.shake': 'Shook',
  'ex.shop.shake.status.rejecting': 'Rejecting',
  'ex.shop.shake.status.rejected': 'Rejected',
  'ex.shop.shake.status.completing': 'Completing...',
  'ex.shop.shake.status.completed': 'Done',
  'ex.shop.shake.status.cancelling': 'Cancelling',
  'ex.shop.shake.status.cancelled': 'Cancelled',

  'ex.error.systemError': 'Sorry Ninja. Something went wrong. Come back soon.',
  'ex.error.312': 'Oh no! You cancelled your offer. You will not be able to make orders for 4 hours. Sorry',
  'ex.error.313': 'You already have a listing! To change your rates, please cancel your current listing.',
  'ex.error.314': 'Looks like that listing has been deleted.',
  'ex.error.315': 'Sorry ninja, someone else got there first.',
  'ex.error.1': 'Oops! Something went wrong. Come back soon.',
  'ex.error.3': 'It looks like that token is invalid.',
  'ex.error.301': 'You are already a ninja.',
  'ex.error.302': 'Sorry, that ninja does not exist.',
  'ex.error.303': 'It looks like you have reached your credit card limit.',
  'ex.error.309': 'You already have a listing! To change your rates, please cancel your current listing.',
  'ex.error.default': 'Oops! Something went wrong.',

  'error.required': 'Required',
  'error.requiredOne': 'You need to fill in one of these!',
  'error.greaterThan': 'Must be greater than {min}',
  'error.lessThan': 'Must be less than {max}',

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
  FAQ_HEADER_YELLOW: '',
  FAQ_HEADER: 'Décentralisé de prédiction change ',
  FAQ_DATA: [
    {
      question: 'quel est le Ninja PEX ?',
      answer: 'Ninja est un échange anonyme-to-peer décentralisé prédiction en cours d’exécution sur le dessus de l’Ethereum blockchain.',
    },
    {
      question: 'ce qui est spécial au sujet de PEX ? Pourquoi devrais je parie sur un ?',
      answer: 'Il permet aux parties de parier directement contre l’autre sans passer par une autorité centrale ou le bookmaker. Cela rend 100 % anonyme, pas de signes place aucun téléchargement requis. La gestion de Paris et au règlement des gains sont effectués collectivement par le réseau blockchain, protection des utilisateurs contre n’importe quel point de défaillance unique. Vous pouvez également créer vos propres marchés de prédiction.',
    },
    {
      question: 'ai-je besoin d’éther ? Supporte-t-il les autres cryptocurrencies ?',
      answer: 'Oui. Ninja accepte uniquement les ETH pour l’instant, mais le support sera ajouté pour les autres monnaies très bientôt.',
    },
    {
      question: ' Comment puis-je commencer avec Ninja ?',
      isList: true,
      answer: [
        {
          title: 'Obtenez l’éther :',
          content: 'Vous pouvez soit acheter ETH directement en PEX avec vos cartes de crédit ou d’échanges de pièces populaires tels que Coinbase ou Binance.',
        },
        {
          title: 'Recharger votre porte-monnaie PEX :',
          content: 'Transférer l’ETH dans le portefeuille PEX. Portefeuille de PEX est complètement décentralisé, la clé privée est tenue sur votre téléphone, que vous pouvez transférer et recevoir ETH.',
        },
        {
          title: 'Placer un pari :',
          content: 'Choix du marché vous voulez parier (p. ex. Brésil - Espagne), les résultats (c.-à-d. les victoires Brésil) et le site (c\'est-à-dire le support ou le pari contre l’issue)\n' +
          'Entrer dans le jeu vous voulez à pari (c.-à-d. 1 ETH) et les cotes (c.-à-d. 1 / 2,25)\n' +
          'Le moteur de Matching BEX trouverez alors une autre ordonnance qui parie contre vents et marées que vous définir.',
        },
        {
          title: 'Attendre le rapport :',
          content: 'Si vous gagnez, vos gains seront automatiquement transférées du contrat escrow intelligente à votre compte.',
        },
      ],
    },
    {
      question: 'puis-je créer mes propres cotes de préférés ? Comment ?',
      answer: 'Oui ! Lorsque vous créez votre propre pari, vous allez entrer dans l’événement qui que vous intéresse et le résultat que vous souhaitez parier sur. Ensuite, il suffit d’entrer votre mise et la cote souhaitée. Puis le moteur PEX ',
    },
    {
      question: 'Comment vous la police Paris douteux ou illégaux ?',
      answer: 'Nous construisons actuellement un système de freins et contrepoids à signaler les comportements inappropriés dans le dojo.',
    },
    {
      question: 'Comment est le système sait le résultat de Paris entre les gens ? Qui agit en tant qu’arbitre et vérifie un résultat par rapport à un autre à la conclusion du contrat ?',
      answer: 'Ninja aura bientôt une solution complètement décentralisée pour vérifier le résultat et motivant la vérité en disant (un DAO de reporters !). En attendant, que nous allons lancer juste à temps pour la Coupe du monde, notre équipe utilise ',
    },
    {
      question: 'où se déroule la pièce ?',
      answer: 'Personne ne détient les fonds. Tous les fonds sont conservés sécuritaire en dépôt jusqu\'à ce qu’une résolution soit atteinte.',
    },
    {
      question: 'Pourquoi devrais je parie sur blockchain au lieu d’utiliser les méthodes traditionnelles ?',
      answer: 'Un échange décentralisé de prédiction fournira vous la liberté de créer vos propres cotes et parier directement avec n’importe qui, vous offrons anonymat 100 % ninja et garantie des paiements.',
    },
    {
      question: 'qu’en est-il de la vie privée et anonymat ?',
      answer: 'Ninja nécessite aucun téléchargement et aucun signe d’ups. Cela veut dire aucun mot de passe, aucun numéro de téléphone et pas de courriels. anonymat 100 %.',
    },
    {
      question: ' dois-je payer tous les frais ?',
      answer: 'Il existe deux principaux types de frais : frais de créateur (pour le ninja qui crée le PARI) et les frais de réseau (un pourcentage de la taxe de créateur, qui se dirige vers le maintien de la plate-forme).',
    },
    {
      question: 'que dois-je faire quand le résultat est finalisé ?',
      answer: 'Rien. Si vous gagnez, vos gains seront automatiquement transférés sur votre compte. Si vous perdez, ce sera quelqu\'un d’autre compte.',
    },
    {
      question: 'où puis-je trouver une correspondance pour parier sur ?',
      answer: 'Sur la page d’accueil, vous serez en mesure de parcourir les marchés et les Paris en cours. Si vous ne trouvez pas que vous aimez, créez vos propres !',
    },
    {
      question: 'autres que sportives, je peux parier sur autre chose ? Comment ça marche ?',
      answer: 'Très bientôt, Ninja s’appliqueront à tout sous le soleil. La seule limite sera votre créativité. Vous pouvez facilement créer n’importe quel marché à n’importe quel événement futur, qu’elle soit sportive, politique, science, marchés, climat... vous l’appelez. ',
    },
    {
      question: 'ce qui va se passer à l’application mobile de la poignée de main ?',
      answer: 'Nous intégrerons Handshake (et vos fonctions préférées comme promesses, reconnaissances de dette, upload de contrat, etc.) dans le site Web mobile de Ninja. ',
    },
  ],

  // MobileOrTablet components
  MOT_TITLE: 'L’échange anonyme de quoi que ce soit',
  MOT_CONTENT_0: 'Le réseau de Ninja n’est accessible que via mobile',
  MOT_CONTENT_1: 'Ouvrez',
  MOT_CONTENT_2: 'dans votre navigateur mobile pour gagner l’entrée anonyme.',
  MOT_CONTENT_3: 'Aucun téléchargement nécessaire. Aucuns inscription ne nécessaire.',
  MOT_LIST_CONTENT: [
    {
      mainContent: 'Lisez le',
      placeHolderLink: 'livre blanc',
      link: 'https://medium.com/@ninjadotorg/shakeninja-bex-1c938f18b3e8',
      isBlankTarget: true,
    },
    {
      mainContent: 'Nous répondons à votre',
      placeHolderLink: 'FAQ',
      link: '/faq',
    },
    {
      mainContent: 'Rejoindre le dojo sur le',
      placeHolderLink: 'télégramme',
      link: 'https://t.me/ninja_org',
      isBlankTarget: true,
    },
  ],
};
