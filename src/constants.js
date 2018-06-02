export const APP = {
  HEADER_DEFAULT: 'Handshake',
  // store
  AUTH_TOKEN: 'auth_token',
  AUTH_PROFILE: 'auth_profile',
  WALLET_MASTER: 'wallet_master',
  WALLET_CACHE: 'wallet_cache',
  WALLET_DEFAULT: 'wallet_default',
  WALLET_LIST: 'wallet_list',
  IP_INFO: 'ip_info',
};

export const HANDSHAKE_ID = {
  PROMISE: 1,
  EXCHANGE: 2,
  BETTING: 3,
  SEED: 4,
};

export const HANDSHAKE_ID_DEFAULT = 2;

export const HANDSHAKE_NAME = {
  [HANDSHAKE_ID.PROMISE]: 'Promise',
  [HANDSHAKE_ID.EXCHANGE]: 'Exchange',
  [HANDSHAKE_ID.BETTING]: 'Betting',
  [HANDSHAKE_ID.SEED]: 'Seed',
};

export const PRICE_DECIMAL = 2;
export const AMOUNT_DECIMAL = 6;

export const CRYPTO_CURRENCY = [
  { value: 'ETH', text: 'ETH' },
  { value: 'BTC', text: 'BTC' },
];
export const FIREBASE_PATH = {
  USERS: '/users',
};
export const CRYPTO_CURRENCY_DEFAULT = 'ETH';

export const EXCHANGE_ACTION = {
  BUY: 'buy',
  SELL: 'sell',
};

export const EXCHANGE_ACTION_NAME = {
  [EXCHANGE_ACTION.BUY]: 'Buy',
  [EXCHANGE_ACTION.SELL]: 'Sell',
};

export const EXCHANGE_ACTION_LIST = [
  { value: EXCHANGE_ACTION.BUY, text: EXCHANGE_ACTION_NAME[EXCHANGE_ACTION.BUY] },
  { value: EXCHANGE_ACTION.SELL, text: EXCHANGE_ACTION_NAME[EXCHANGE_ACTION.SELL] },
];

export const EXCHANGE_ACTION_DEFAULT = EXCHANGE_ACTION.BUY;

export const FIAT_CURRENCY = 'USD';
export const FIAT_CURRENCY_SYMBOL = '$';

export const SELL_PRICE_TYPE = [
  { value: 'fix', text: 'Fix now' },
  { value: 'flexible', text: 'Update on shake' },
];

export const SELL_PRICE_TYPE_DEFAULT = 'fix';

// path
export const API_URL = {
  CRYPTOSIGN: {
    BASE: 'https://stag-handshake.autonomous.ai/api/cryptosign',
    INIT_HANDSHAKE: 'cryptosign/handshake/init',
    SHAKE: 'cryptosign/handshake/shake',
    LOAD_MATCHES: 'cryptosign/match',
  },
  DISCOVER: {
    BASE: 'handshake/discover',
  },
  EXCHANGE: {
    BASE: 'https://stag-handshake.autonomous.ai/api/exchange',
    GET_CRYPTO_PRICE: 'info/instant-buy/price', // {path: '/info/instant-buy/price', method: 'get'},
    CREATE_CC_ORDER: 'instant-buys', // {path: '/instant-buys', method: 'post'},
    GET_USER_CC_LIMIT: 'user/profile/cc-limit', // {path: '/user/profile/cc-limit', method: 'get'},
    GET_CC_LIMITS: 'info/cc-limits', // {path: '/info/cc-limits', method: 'get'},
    GET_USER_PROFILE: 'user/profile', // {path: '/user/profile', method: 'get'},
    GET_OFFER_PRICE: 'info/crypto-quote', // {path: '/info/instant-buy/price', method: 'get'},
    GET_LIST_OFFER_PRICE: 'info/crypto-quotes', // {path: '/info/instant-buy/price', method: 'get'},
    GET_USER_TRANSACTION: 'user/transactions', // {path: '/user/transactions', method: 'get'},
    OFFERS: 'offers',
    SHAKE: 'shake',
    WITHDRAW: 'withdraw',
    IP_DOMAIN: 'https://ipfind.co/me',
    IP_KEY: 'a59f33e5-0879-411a-908b-792359a0d6cc',
  },
  SEED: {
    BASE: 'seed',
  },
  ME: {
    BASE: 'handshake/me',
  },
  HANDSHAKE: {
    BASE: 'handshake', // id handshake
    CREATE: 'handshake/create',
    UPDATE: 'handshake/update',
    DELETE: 'handshake/delete',
  },
};

export const HANDSHAKE_STATUS = {
  INITED: 0,
  SHAKED: 1,
  ACCEPTED: 2,
  REJECTED: 3,
  DONE: 4,
  CANCELLED: 5,
  PENDING: -1,
  TRANSACTION_FAILED: -2,
  NEW: -3,
  BLOCKCHAIN_PENDING: -4,
};

export const HANDSHAKE_STATUS_NAME = {
  [HANDSHAKE_STATUS.INITED]: 'Inited',
  [HANDSHAKE_STATUS.SHAKED]: 'Shaked',
  [HANDSHAKE_STATUS.ACCEPTED]: 'Accepted',
  [HANDSHAKE_STATUS.DONE]: 'Done',
  [HANDSHAKE_STATUS.CANCELLED]: 'Cancelled',
  [HANDSHAKE_STATUS.PENDING]: 'Pending',
  [HANDSHAKE_STATUS.TRANSACTION_FAILED]: 'Transaction Failed',
  [HANDSHAKE_STATUS.NEW]: 'New',
  [HANDSHAKE_STATUS.BLOCKCHAIN_PENDING]: 'Blockchain Pending',
};

export const HANDSHAKE_EXCHANGE_STATUS = {
  CREATED: 0,
  ACTIVE: 1,
  CLOSED: 2,
  SHAKING: 3,
  SHAKE: 4,
  COMPLETED: 5,
  WITHDRAW: 6,
  REJECTED: 7,
};

export const HANDSHAKE_EXCHANGE_STATUS_NAME = {
  [HANDSHAKE_EXCHANGE_STATUS.CREATED]: 'created',
  [HANDSHAKE_EXCHANGE_STATUS.ACTIVE]: 'active',
  [HANDSHAKE_EXCHANGE_STATUS.CLOSED]: 'closed',
  [HANDSHAKE_EXCHANGE_STATUS.SHAKING]: 'shaking',
  [HANDSHAKE_EXCHANGE_STATUS.SHAKE]: 'shake',
  // [HANDSHAKE_EXCHANGE_STATUS.COMPLETING]: 'completing',
  [HANDSHAKE_EXCHANGE_STATUS.COMPLETED]: 'completed',
  [HANDSHAKE_EXCHANGE_STATUS.WITHDRAW]: 'withdraw',
  [HANDSHAKE_EXCHANGE_STATUS.REJECTED]: 'rejected',
};

export const HANDSHAKE_EXCHANGE_CC_STATUS = {
  PROCESSING: 0,
  SUCCESS: 1,
  CANCELLED: 2
}

export const HANDSHAKE_EXCHANGE_CC_STATUS_NAME = {
  [HANDSHAKE_EXCHANGE_CC_STATUS.PROCESSING]: 'processing',
  [HANDSHAKE_EXCHANGE_CC_STATUS.SUCCESS]: 'success',
  [HANDSHAKE_EXCHANGE_CC_STATUS.CANCELLED]: 'cancelled'
}

export const HANDSHAKE_USER  = {
  NORMAL: 0,
  OWNER: 1,
  SHAKED: 2,
};

export const HANSHAKE_USER_NAME = {
  [HANDSHAKE_USER.NORMAL]: 'NORMAL',
  [HANDSHAKE_USER.OWNER]: 'OWNER',
  [HANDSHAKE_USER.SHAKED]: 'SHAKED',
}

export const DEFAULT_FEE = {
  ETH: 0,
  BTC: 0,
}

export const EXCHANGE_FEED_TYPE = {
  EXCHANGE: 'exchange',
  INSTANT: 'instant',
}

export const EXCHANGE_METHOD_PAYMENT = {
  [EXCHANGE_FEED_TYPE.EXCHANGE]: 'cash',
  [EXCHANGE_FEED_TYPE.INSTANT]: 'credit card',
}
