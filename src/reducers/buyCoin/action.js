import { createAPI } from '@/reducers/action';

export const BUY_COIN_ACTIONS = {
  BUY_CRYPTO_ORDER: 'BUY_CRYPTO_ORDER',
  BUY_CRYPTO_GET_COIN_INFO: 'BUY_CRYPTO_GET_COIN_INFO',
  BUY_CRYPTO_GET_BANK_INFO: 'BUY_CRYPTO_GET_BANK_INFO',
};

export const buyCryptoGetBankInfo = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_GET_BANK_INFO);
export const buyCryptoGetCoinInfo = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_GET_COIN_INFO);
export const buyCryptoOrder = createAPI(BUY_COIN_ACTIONS.BUY_CRYPTO_ORDER);

