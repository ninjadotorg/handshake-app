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
  overCCLimit: 'Your limit is {currency}{limit}. You have already used {currency}{amount} ',

  required: 'Required',
  ccExpireTemplate: 'MM/YY',
  securityCode: '325',
  shakeNow: 'Shake',
  offerHandShakeContent: '{offerType} {amount} {currency} for {total} {currency_symbol} in {payment_method}?',
  offerHandShakeContentMe: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  offerHandShakeContentMeDone: '{offerType} {amount} {currency} for {total} {currency_symbol} ({payment_method})',
  instantOfferHandShakeContent: 'You{just}{offerType} {amount} {currency} for {total} {currency_symbol} on your card - fee {fee}%',
  offerDistanceContent: '{distanceKm} km ({distanceMiles} miles) away',
  transactonOfferInfo: 'Successful ({success}) / Failed ({failed})',
  createOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  handshakeOfferConfirm: 'You are about to {type} {amount} {currency} for {total} {currency_symbol}',
  rejectOfferConfirm: 'Do you want to Reject this handshake? You will not be able to make transactions for 4 hours.',
  completeOfferConfirm: 'Do you want to Complete this handshake?',
  withdrawOfferConfirm: 'Do you want to Withdraw this handshake?',
  cancelOfferConfirm: 'Do you want to Cancel this handshake?',
  closeOfferConfirm: 'Do you want to Close this handshake?',
  acceptOfferConfirm: 'Do you want to Accept this handshake?',
  createOfferSuccessMessage: 'Create offer success',
  shakeOfferSuccessMessage: 'Shake offer success',
  closeOfferSuccessMessage: 'Close offer success',
  completeShakedfferSuccessMessage: 'Complete shaked offer success',
  cancelShakedfferSuccessMessage: 'Cancel shaked offer success',
  withdrawShakedfferSuccessMessage: 'Withdraw shaked offer success',
  buyUsingCreditCardSuccessMessge: 'Buy using Card success',
  notEnoughCoinInWallet: 'You only have {amount}({currency}) in default wallet {currency}. Fee ~ {fee}({currency}). Please add more',

  createOfferStoreConfirm: 'Do you want to create offer Buy {amountBuy} {currency} - Sell {amountSell} {currency}?',
  notEnoughCoinInWalletStores: 'You only have {amount}({currency}) in default wallet {currency}. Fee ~ {fee}({currency}). Please add more',
  addOfferItemSuccessMassage: 'Add offer item success',
  deleteOfferItemSuccessMassage: 'Delete offer item success',
  shakeOfferItemSuccessMassage: 'Shake offer item success',
  acceptOfferItemSuccessMassage: 'Accept offer item success',
  cancelOfferItemSuccessMassage: 'Cancel offer item success',
  rejectOfferItemSuccessMassage: 'Reject offer item success',
  completeOfferItemSuccessMassage: 'Complete offer item success',
  offerStoresAlreadyCreated: 'You have already create offer',
  offerStoreHandShakeContent: '{offerTypeBuy} {amountBuy} {currency} at {fiatAmountBuy} {fiatAmountCurrency}. {offerTypeSell} {amountSell} {currency} at {fiatAmountSell} {fiatAmountCurrency}',

  // FAQ
  FAQ_TITLE: 'Вопросы и ответы',
  FAQ_HEADER_YELLOW: '',
  FAQ_HEADER: 'Децентрализованные предсказание обмен',
  FAQ_DATA: [
    {
      question: 'что такое PEX ниндзя?',
      answer: 'Ниндзя представляет собой обмен анонимный peer-to-peer децентрализованных предсказание, запущенное поверх Эфириума blockchain.',
    },
    {
      question: 'что особенного PEX? Почему следует поставить на один?',
      answer: 'Она позволяет сторонам ставить непосредственно против друг друга без прохождения через Центральный орган или букмекер. Это делает его 100% анонимный, никаких признаков вверх загружаемые файлы не требуется. Управление ставок и урегулирования выигрыши осуществляется коллективно blockchain сети, защищая пользователей от любой единой точки отказа. Можно также создать свои собственные рынки предсказаний. ',
    },
    {
      question: 'нужна ли мне эфира? Он поддерживает другие cryptocurrencies?',
      answer: 'Да. Ниндзя принимает только ETH для теперь, но очень скоро для других валют будет добавлена поддержка.',
    },
    {
      question: 'как начать с ниндзя?',
      isList: true,
      answer: [
        {
          title: 'Получите эфира:',
          content: 'Вы можете либо купить ETH непосредственно в PEX с вашей кредитной карты или из популярных монет обменов как Coinbase или Binance.',
        },
        {
          title: 'Пополните кошелек PEX:',
          content: 'Перенесите ETH в бумажник PEX. PEX кошелек полностью децентрализованной, закрытый ключ проводится на вашем телефоне, только вы можете передавать и получать ETH.',
        },
        {
          title: 'Сделайте ставку:',
          content: 'Выбор рынка, вы хотите ставку (т.е. Бразилия - Испания), результаты (т.е. победы Бразилии) и сайта (т.е. поддержки или ставку против результатов)\n' +
          'Введите ставку, вы хотите ставку (т.е. 1 ETH) и шансы (т.е. 1 / 2.25)\n' +
          'BEX соответствия будут затем найти другой порядок, что ставки против коэффициенты, заданные.',
        },
        {
          title: 'Ждать для отчета:',
          content: 'Если вы выиграете, ваши выигрыши будут автоматически переведены из смарт-контракт сделки на ваш счет.',
        },
      ],
    },
    {
      question: 'можно ли установить мой собственный предпочтительным шансы? Как?',
      answer: 'Да! При создании собственных ставку, вы войдете, событие, которое вы заинтересованы в и результаты, которые вы хотите сделать ставку на. Просто введите вашу ставку и шансы, что вы хотите. Затем обработчик PEX автоматически найдет и матч вы с кем-либо, имеет интерес в то же событие, и кто принимает ваши шансы.',
    },
    {
      question: 'как вы полиции непривлекательный/незаконный ставки?',
      answer: 'В настоящее время мы строим систему сдержек и противовесов для флага за неподобающее поведение в додзё.',
    },
    {
      question: 'как система знать результат ставки между людьми? ВОЗ выступает в качестве арбитра и проверяет один результат против другой на заключение контракта?',
      answer: 'Ниндзя скоро будет полностью децентрализованное решение для проверки результатов и стимулированием правду говорю (DAO Репортеры!). В то же время как мы будем запускать как раз вовремя для чемпионата мира по футболу, наша команда будет использовать общественный источник (livescore.com) и действовать в качестве репортера.',
    },
    {
      question: 'где проходит монеты?',
      answer: 'Никто держит средства. Все средства хранятся безопасной в эскроу, пока не будет достигнуто решение.',
    }, {
      question: 'Почему следует поставить на blockchain вместо использования традиционных методов?',
      answer: 'Децентрализованные предсказание обмен обеспечит вам свободу создавать собственные шансы и ставки непосредственно с кем-либо, предлагаем вам ниндзя 100% анонимность и гарантированные выплаты. ',
    }, {
      question: 'как насчет конфиденциальности и анонимности?',
      answer: 'Ниндзя требует никаких Скачиваний и не подписать взлеты. Это означает, что никакие пароли, без номера телефонов и без писем. 100% анонимность.',
    }, {
      question: 'нужно ли мне платить?',
      answer: 'Существует два основных типа сборов: создатель сборы (для ниндзя, который создает ставку) и сетевой платы (в процентах от создателя плату, которая идет на поддержание платформы).',
    }, {
      question: 'что нужно делать, когда завершается результат?',
      answer: 'Ничего. Если вы выиграете, ваши выигрыши будут автоматически переведены на ваш счет. Если вы потеряете, он будет кто-то чужой учетной записью.',
    }, {
      question: 'где можно найти ставки на матч?',
      answer: 'На домашней странице вы сможете просматривать текущие ставки и рынки. Если вы не можете найти любой понравившийся вам, создайте свой собственный!',
    }, {
      question: 'Помимо спорта можно ставить на что-нибудь еще? Как это работает?',
      answer: 'Очень скоро ниндзя будет применяться ко всем под солнцем. Единственное ограничение будет ваше творчество. Вы можете легко создать любой рынок на любых будущих событий, будь то спорт, политика, Наука, рынки, климат... вы назовите его',
    }, {
      question: 'то, что должно произойти для подтверждения мобильного приложения?',
      answer: 'Мы будет интеграция рукопожатие (и ваши любимые функции, такие как обещания, долговые расписки, загрузить контракт и т.д.) в ниндзя мобильный веб-сайт.',
    },
  ],

  // MobileOrTablet components
  MOT_TITLE: 'Анонимный обмен ничего',
  MOT_CONTENT_0: 'Ниндзя сеть доступна только через мобильный',
  MOT_CONTENT_1: 'Откройте',
  MOT_CONTENT_2: 'в вашем мобильном браузере, чтобы получить анонимный вход.',
  MOT_CONTENT_3: 'Не нужно загружать. Не Зарегистрируйся требуется.',
  MOT_LIST_CONTENT: [
    {
      mainContent: 'Читать',
      placeHolderLink: 'документ',
      link: 'https://medium.com/@ninjadotorg/shakeninja-bex-1c938f18b3e8',
      isBlankTarget: true,
    },
    {
      mainContent: 'Мы ответим на ваши',
      placeHolderLink: 'вопросы и ответы',
      link: '/faq',
    },
    {
      mainContent: 'Присоединяйтесь к dojo на',
      placeHolderLink: 'Телеграмма',
      link: 'https://t.me/ninja_org',
      isBlankTarget: true,
    },
  ],

  // landing page --> /coin-exchange
  COIN_EXCHANGE_LP_FAQ_TITLE: 'Есть вопросы?',
  COIN_EXCHANGE_LP_FAQ: [
    {
      question: 'Какая идентификация нужна для продавцов или покупателей?',
      answer: 'Нам не нужна проверка идентификации. Если вы подтвердите свой номер телефона, у вас будет шанс получить 1 бесплатный ETH, чтобы совершить транзакцию на Shake Ninja.',
    },
    {
      question: 'Принимаются ли кредитные карты?',
      answer: 'Да. Мы принимаем Visa, Mastercard, Amex и Discover.',
    },
    {
      question: 'Какие валюты принимаются для обмена?',
      answer: 'Мы принимаем все валюты.',
    },
    {
      question: 'Есть ли система отслеживания истории торговли?',
      answer: 'Да. Мы прослеживаем успешные и неудачные транзакции с четким отчетом для каждого продавца и покупателя.',
    },
    {
      question: 'Имеет ли какая либо страна ограничения по использованию платформы?',
      answer: 'Мы доступны для всех стран.',
    },
    {
      question: 'Есть ли децентрализованный обмен?',
      answer: 'Да, поэтому транзакция на 100% безопасна и надежна.',
    },
    {
      question: 'Могу ли я использовать Paypal?',
      answer: 'Мы не доступны в Paypal на данный момент.',
    },
    {
      question: 'Будут ли средства храниться в Эскроу?',
      answer: 'Да, либо на Эскроу или на смарт-контракте Эфириум Блокче́йн.',
    },
    {
      question: 'Как будет выполняться Смарт-договор, когда задействованы физические деньги и вероятны ли запоздания во время транзакций?',
      answer: 'Получив физическую наличность, продавец нажимает кнопку «принять», монета будет автоматически переведена покупателю. Процесс занимает от 10 до 20 минут.',
    },
  ],
  COIN_EXCHANGE_LP_TRADE_EASY_TRADE_SAFE: {
    title: 'Легкая и безопасная торговля',
    info: [
      {
        title: '1. Разместите вашу сделку',
        description: 'Выберите криптовалюту, которую вы хотите купить / продать по желаемой цене',
      },
      {
        title: '2. Выберите магазин',
        description: 'Найдите и выберите наиболее подходящий магазин в вашем регионе',
      },
      {
        title: '3. Выполните обмен',
        description: 'Отправьтесь в магазин и обменяйте наличные деньги на криптовалюту или криптовалюту на наличные деньги',
      },
      {
        title: '4. Подтвердите платеж',
        description: 'Процесс обезопасен на 100% за счет смарт-контракта',
      },
    ],
  },
  COIN_EXCHANGE_LP_START_TRADING_NOW: 'Начать торговать прямо сейчас',
  COIN_EXCHANGE_LP_PLACEHOLDER_INPUT: 'Ваша электронная почта',
  COIN_EXCHANGE_LP_TITLE_SUBMIT_BT: 'Присоединиться к списку рассылки',
  COIN_EXCHANGE_LP_SECOND_BOX_TITLE: 'Мы первые, кто предложил полностью децентрализованную платформу для покупки и продажи Bitcoin и Ethereum.',
  COIN_EXCHANGE_LP_SECOND_BOX_DESCRIPTION_1: 'Несколько способов оплаты: кредитная карта и наличные деньги',
  COIN_EXCHANGE_LP_SECOND_BOX_DESCRIPTION_2: 'Обеспеченная сделка по blockchain технологии',
  COIN_EXCHANGE_LP_SECOND_BOX_DESCRIPTION_3: '-Быстрое и удобное использование.',
  COIN_EXCHANGE_LP_THIRD_BOX_1: {
    title: 'Несколько способов оплаты',
    description: 'Мы обеспечиваем торговлю наличных денег на криптовалюту и кредитной карты на криптовалюту. Найдите своих ближайших трейдеров, не оставляя истории транзакций для каких-либо действий на нашей платформе.',
  },
  COIN_EXCHANGE_LP_THIRD_BOX_2: {
    title: 'Быстро и на ходу',
    description: 'Благодаря торговле на основе местоположения, мы позволяем вам совершать платежи за несколько минут с повышенным удобством.',
  },
  COIN_EXCHANGE_LP_THIRD_BOX_3: {
    title: '100% безопасно и надежно для обеих сторон',
    description: 'В отличие от любой другой платформы, мы не владеем ключами пользователей и предоставляем полный контроль ключами покупателям и продавцам.',
  },

  /*
  *
  * White Paper
  *
  * ******************************************************************************************* */
  WHITE_PAPER_H1: 'Анонимная децентрализованная биржа прогнозов на Ethereum',
  WHITE_PAPER_SUBTITLE_1: 'Привет! Мы представляем команду проекта Ниндзя (Ninja): Рок, Бакунава, Хакаваи и Грутсленг. Мы создаем электронную биржу на блокчейне, на которой можно делать ставки. Ниже информация, почему мы это делаем и как это работает.',
  WHITE_PAPER_SUBTITLE_2: 'Присоединяйтесь к чату at',
  WHITE_PAPER_INTRO: 'Введение',
  WHITE_PAPER_INTRO_1: 'Онлайн ставки практически всегда делаются при помощи букмекеров, которые выступают как доверенное третье лицо. Обычно пользователи страдают от проблем, связанных с «централизованными доверенными лицами», а именно:',
  WHITE_PAPER_INTRO_2: [
    'Букмекеры делают ставки, которые всегда им на руку (они всегда выигрывают)',
    'Букмекеры наслаждаются немалой маржой в 5-30% от каждой ставки',
    'Ставки могут меняться, что отражается и на уверенности в выигрыше',
    'Полная анонимность невозможна',
    'Мошенничества не избежать, и к этому уже привыкли',
    'Еще один момент: а что, если букмекер исчезнет?',
    'Ставки считаются азартной игрой – несоразмерный риск во многом из-за отсутствия прозрачности в действиях централизованной стороны',
  ],
  WHITE_PAPER_INTRO_3: 'Эти проблемы увеличиваются в 10 раз, когда речь идет о ставках оффлайн, поэтому неудивительно, что пользователи все чаще выбирают меньшее из зол.',
  WHITE_PAPER_INTRO_4_HIGH_LIGHT: 'Решение: электронная система прогнозов, которая заменит вынужденное доверие криптографическим доказательством, позволяющим двум любым анонимным сторонам из любой точки планеты делать ставки непосредственно друг против друга без какой-либо третьей стороны. ',
  WHITE_PAPER_INTRO_5: 'Анонимная децентрализованная электронная биржа прогнозов (PEX) позволяет сторонам делать ставки друг против друга без необходимости обращения в какой-либо централизованный орган или к букмекеру. Управление ставками и выплата выигрышей происходит в сети блокчейн, защищающей пользователей от каких-либо неприятностей. PEX обладает уникальными качествами, которые позволяют делать то, что ранее было невозможно сделать с традиционными системами ставок.',
  WHITE_PAPER_INTRO_6: 'Мы надеемся, что PEX изменит сегодняшнее восприятие ставок, иногда излишне характеризуемых как азартная игра, в основном из-за того, что централизованные стороны ищут неэтичные и порой беспощадные способы наживы.',
  WHITE_PAPER_INTRO_7_HIGH_LIGHT: 'PEX делает вызов темной индустрии азартных игр при помощи открытой, прозрачной биржи прогнозов.',
  WHITE_PAPER_INTRO_8: 'На этой бирже люди смогут делать ставки на спорт, политику, науку, рынки, климат и вообще все, что находится под солнцем.',
  WHITE_PAPER_PEX: 'Что такое PEX?',
  WHITE_PAPER_PEX_1: 'PEX – это децентрализованная биржа прогнозов, работающая на блокчейне Ethereum, на которой легко можно:',
  WHITE_PAPER_PEX_2: [
    'Разместить ставку За (Ask) или ставку Против (Bid) на исход',
    'Быть мейкером или тейкером',
    'Быть создателем своего собственного рынка прогнозов',
    'Забирать выигрыши сразу же (гарантируется смарт контрактом)',
  ],
  WHITE_PAPER_PEX_3: 'Place a bet.',
  WHITE_PAPER_OUTCOME: 'Исход как торгуемый актив. Коэффициенты как цены',
  WHITE_PAPER_OUTCOME_1: 'На фондовой бирже торгуемым активом является акция, и трейдеры делают ставки на пакеты акций (например, продать 100 акций Apple по $200 за каждую).',
  WHITE_PAPER_OUTCOME_2: 'На криптовалютной бирже торгуемым активом является монета, и трейдеры делают ставки на стоимость монет (например, купить 2 биткоина по $7000 за каждую монету).',
  WHITE_PAPER_OUTCOME_3: 'Также и на децентрализованной бирже прогнозов PEX торгуемым активом является исход события, и трейдеры делают ставки на коэффициенты исхода. Можно ставить на исход За или Против. Например, исход матча Бразилия – Испания может быть таким «Бразилия выиграет». Джон может поставить на этот исход с коэффициентом 2.0. Мери может поставить на этот исход с коэффициентом в 2.25. Питер может поставить против этого исхода «Бразилия проиграет», или «ничья») с коэффициентом 1.9.',
  WHITE_PAPER_OUTCOME_4: 'A different type of exchange.',
  WHITE_PAPER_COMPARE: 'PEX vs. Традиционные ставки',
  WHITE_PAPER_COMPARE_1: 'Важно отметить, что PEX не принимает ставки и не хранит поставленные деньги, вместо этого платформа подбирает пользователей, которые поддерживают исход или против него. Деньги хранятся на депонированном счете смарт контракта.',
  WHITE_PAPER_COMPARE_2: 'Смарт контракт невозможно остановить. Он исполнится так, как его запрограммировали – направит деньги победителю со своего депонированного баланса без каких-либо задержек, обманов или вмешательства третьих лиц. Как только обе стороны совершили ставку, изменить контракт нельзя. Оплата гарантирована и поступает сразу же.',
  WHITE_PAPER_COMPARE_3: 'Весь процесс происходит без идентификации личности, все на 100% анонимно.',
  WHITE_PAPER_COMPARE_4: 'Все происходит без централизованного органа или букмекера. Процесс осуществляется коллективно всеми нодами блокчейна.',
  WHITE_PAPER_COMPARE_5: 'This is why you should bet on the blockchain.',
  WHITE_PAPER_PEX_WORK: 'Как работает PEX?',
  WHITE_PAPER_PEX_WORK_SUB_TITLE: 'PEX отличается от того, что вы знаете. Также она более автономна, чем то, что вы знаете. Важно, что эта платформа сделана для того, чтобы легко было создавать рынки ставок и размещать ставочные ордера.',
  WHITE_PAPER_STEP_1: 'Шаг 1: приобретите эфириум',
  WHITE_PAPER_STEP_1_1: 'Если у вас нет ETH, вы можете приобрести его непосредственно на PEX при помощи своей кредитной карты. Также вы можете купить ETH на популярных криптобиржах, например, на Coinbase или Binance.',
  WHITE_PAPER_STEP_1_2: 'Вскоре PEX будет поддерживать и другие криптовалюты.',
  WHITE_PAPER_STEP_1_3: 'Easily buy ETH in-app.',
  WHITE_PAPER_STEP_2: 'Шаг 2: Пополните ваш кошелек  PEX Wallet',
  WHITE_PAPER_STEP_2_1: 'Переведите ETH, который вы купили, в PEX Wallet, чтобы вы могли начать размещать ордера при помощи ваших эфиров. Кошелек PEX Wallet полностью децентрализован. Закрытый ключ хранится на вашем телефоне и только вы имеете доступ к нему. Только вы можете переводить и получать эфиры.',
  WHITE_PAPER_STEP_2_2: 'The neatly organized PEX wallet.',
  WHITE_PAPER_STEP_3: 'Шаг 3: Разместите ставку',
  WHITE_PAPER_STEP_3_1: 'Сначала выберите рынок, который вас интересует (например, Бразилия – Испания), исход (например, «Бразилия победит») и сторону, которую вы принимаете (например, за этот исход или против него).',
  WHITE_PAPER_STEP_3_2: 'Далее введите сумму, которую хотите поставить (например, 1 ETH) и коэффициент (например, 1/2.25). Поставленная сумма перейдет на депонированный счет смарт контракта. Система подбора PEX далее подберет оппонента, который поставит против параметров, которые вы установили.',
  WHITE_PAPER_STEP_3_3: 'Вот и все.',
  WHITE_PAPER_STEP_3_4: 'Our ETH is on Argentina for this one.',
  WHITE_PAPER_STEP_4: 'Шаг 4: Ждите отчета',
  WHITE_PAPER_STEP_4_1: 'Как только событие закончится, в окне отчетов (устанавливаемый создателем рынка) появится отчет. В целом отчет должен появиться в ближайшие минуты. Если вы победите, ваш выигрыш будет автоматически отправлен с депонированного счета на ваш счет.',
  WHITE_PAPER_STEP_4_2: 'May the odds be ever in your favour.',
  WHITE_PAPER_CREATE: 'Создавайте собственные рынки прогнозов',
  WHITE_PAPER_CREATE_1: 'В то время, как большинство пользователей делают ставки на уже существующих рынках, PEX позволяет создавать собственные в отношении абсолютно любого события в будущем, будь то спорт, политика, наука, буквально, любой аспект современной жизни. Как создатель рынка, вы можете установить рыночную комиссию, время закрытия, составителя отчета по исходу и дедлайн отчета.',
  WHITE_PAPER_ARCHITECTURE: 'Архитектура PEX',
  WHITE_PAPER_ARCHITECTURE_1: 'К ключевым компонентам архитектуры PEX относятся следующие:',
  WHITE_PAPER_ARCHITECTURE_2_HL: 'Рынок прогнозов',
  WHITE_PAPER_ARCHITECTURE_2: 'PEX позволяет каждому создавать рынок прогнозов на абсолютно любое событие в будущем. Это может быть что угодно – спорт, политика, наука, образ жизни и даже погода и пр. Единственным ограничением является ваше воображение. Каждый рынок является частью смарт контракта. В нем своя собственная книга ордеров, мейкеров и тейкеров.',
  WHITE_PAPER_ARCHITECTURE_3_HL: 'Книга ордеров',
  WHITE_PAPER_ARCHITECTURE_3: 'У каждого рынка прогнозов есть собственная книга ордеров. Книга ордеров PEX управляет всеми ордерами За (ask) и всеми Против (bid). В стакане отображается один ордер, в котором собраны все ордера с одинаковой ставкой.',
  WHITE_PAPER_ARCHITECTURE_3_1: 'The order book.',
  WHITE_PAPER_ARCHITECTURE_4_HL: 'Система подбора',
  WHITE_PAPER_ARCHITECTURE_4_1: 'На PEX используется способ FIFO. Ордера исполняются в приоритете цена-время. Это означает, что стачала будет сопоставлена цена, а если будет два ордера с одинаковой ценой, то они будут исполняться с учетом времени выставления.',
  WHITE_PAPER_ARCHITECTURE_4_2: 'В некоторых случаях количество может быть неравным, тогда ордер будет исполнен частично. Для оставшейся части ордера будет подобрана следующая лучшая цена, и так до тех пор, пока ордер не будет полностью исполнен.',
  WHITE_PAPER_ARCHITECTURE_4_3: 'Your perfect match.',
  WHITE_PAPER_ARCHITECTURE_4_4: [
    'Пользователь размещает Исход За в открытой книге ордеров (Open Order Book)',
    'Другой пользователь ставит Исход Против в открытой книге ордеров',
    'Система подбора ищет подходящую пару и сопоставляет оба ордера из открытой книги ордеров в Парной книге ордеров (Matched Order Book)',
  ],
  WHITE_PAPER_ARCHITECTURE_5_HL: 'Обработка запросов',
  WHITE_PAPER_ARCHITECTURE_5: 'На PEX есть Конечная обработка запросов для управления ордерами, счетами и публичными данными рынка.',
  WHITE_PAPER_ARCHITECTURE_6_HL: 'Web Socket',
  WHITE_PAPER_ARCHITECTURE_6: 'PEX Web Socket предоставляет возможность обновления данных для ордеров и торгов в режиме реального времени',
  WHITE_PAPER_PRIVACY: 'Секретность и Анонимность',
  WHITE_PAPER_PRIVACY_SUB: 'Секретность, обеспеченная для пользователей, является продуманным проектным решением.',
  WHITE_PAPER_PRIVACY_1_HL: 'Не надо скачивать',
  WHITE_PAPER_PRIVACY_1: 'PEX – это не мобильное приложение. Ее легко можно открыть при помощи мобильного интернета. На некоторых мобильных приложениях иногда дизайн действительно хороший, но они находятся на централизованных платформах, таких как Android Play Store или Apple App store. По нашему мнению, наиболее привлекательный дизайн не должен компрометировать приватность.',
  WHITE_PAPER_PRIVACY_2_HL: 'Никаких подписок',
  WHITE_PAPER_PRIVACY_2_1: 'Необходимость в пароле, Email или номере телефона отсутствует.',
  WHITE_PAPER_PRIVACY_2_2: 'PEX не собирает вашу персональную информацию. Вы можете использовать PEX абсолютно анонимно. Когда вы впервые открываете PEX, будет создан открытый и закрытый ключ, который будет храниться у вас на телефоне. Открытый ключ выступает вашим анонимным именем пользователя, закрытый ключ используется для пароля. У PEX нет доступа к вашему закрытому ключу, только вы можете его использовать.',
  WHITE_PAPER_PRIVACY_2_3: 'Стоит отметить, что в установках профиля есть опция введения email адреса. Целью не является добавление в какой-либо список, но для удобства, особенно, если дело будет касаться платежей. Это не обязательно.',
  WHITE_PAPER_PRIVACY_2_4: 'Обратите внимание, что также в установках профиля есть опция копирования вашего закрытого ключа. Мы сильно рекомендуем ее ипользовать.',
  WHITE_PAPER_PRIVACY_3_HL: 'Анонимные прогнозы',
  WHITE_PAPER_PRIVACY_3: 'PEX работает на Ethereum, который является публичным блокчейном, однако приватность поддерживается тем, что открытые ключи остаются анонимными. Когда люди видят, что кто-то сделал прогноз на что-то, практически невозможно узнать, кто это.',
  WHITE_PAPER_PRIVACY_4_HL: 'Анонимный подбор ордеров',
  WHITE_PAPER_PRIVACY_4: 'Подобно фондовым и криптовалютным биржам, книга ордеров, размеры, коэффициенты и время – открытая информация, однако книга ордеров не отображает мейкеров и тейкеров. В книге записываются ставки, которые анонимные стороны делают друг против друга, которые основываются на их разных прогнозах одного и того же события. Как только событие закончилось и стал доступен отчет, деньги с депонированного счета автоматически отправляются победителю.',
  WHITE_PAPER_FEE: 'Комиссии',
  WHITE_PAPER_FEE_1: 'Существует 2 главных типа комиссий: комиссия с выигрыша и комиссия системы.',
  WHITE_PAPER_FEE_2: 'Комиссия с выигрыша устанавливается создателем рынка. Только от создателя рынка зависит, устанавливать свою комиссию или нет. Поскольку PEX позволяет любому создавать рынок, мы ожидаем, что комиссии будут конкурировать. Этот сценарий является наилучшим для пользователей.',
  WHITE_PAPER_FEE_3: 'Комиссия системы составляет 20% от комиссии с выигрыша создателя рынка. Оплата идет на обслуживание и инфраструктуру системы. В начале работы эти работы будут проводиться командой Ниндзя. Но мы ожидаем, что со временем команда будет децентрализована и создадим механизм, который даст эту возможность всему сообществу.',
  WHITE_PAPER_FEE_4: 'Мы рассматриваем вариант реферальной комиссии для создания рынка.  Реферальный пул может составлять 10-20% от комиссии с выигрыша, что позволить привлечь намного больше пользователей к рынку.',
  WHITE_PAPER_SETTLEMENT: 'Расчеты',
  WHITE_PAPER_SETTLEMENT_1: 'Чем глубже мы погружаемся в создание PEX, тем больше нам кажется, что изначально мы должны найти компромисс между скоростью и децентрализацией и всегда думать о безопасности. Что касается расчетов, для которых требуются быстрые отчеты по событиям сразу же после их завершения (например, спортивные события), сейчас мы выбираем скорость.',
  WHITE_PAPER_SETTLEMENT_2: 'В первом релизе Команда Ниндзя будет учитывать роль отчетов и отчеты по исходу всех событий. Мы исследуем и создаем децентрализованный механизм, который позволит сообществу делать отчеты по исходу событий.',
  WHITE_PAPER_SUMMARY: 'Краткое заключение',
  WHITE_PAPER_SUMMARY_1: 'PEX является абсолютно децентрализованной версией электронных прогнозов, которая позволяет сторонам делать ставки непосредственно друг против друга без вмешательства централизованного органа или букмекера.',
  WHITE_PAPER_SUMMARY_2: 'PEX – это открытый источник, дизайн платформы публичен, никто не владеет и не контролирует PEX, и каждый может принять участие.',
  WHITE_PAPER_SUMMARY_3: 'PEX – это открытый код, который можно найти на',
  WHITE_PAPER_SUMMARY_4: 'Создавайте PEX вместе с нами. Присоединяйтесь к чату ',
  WHITE_PAPER_END: 'Платформа работает',
  WHITE_PAPER_END_1: 'Благодарим вас за то, что прочитали. Ниндзя будет запущена в тестовом режиме 5 июня! Нам очень хочется услышать ваши мысли.',
};
