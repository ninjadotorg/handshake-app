import qs from 'querystring';
import { isEmpty } from '@/utils/is';

export const queryStringSelector = (state) => {
  return state.router.location.search;
};

export const eventSelector = (state) => {
  const queryString = queryStringSelector(state);
  const urlParams = qs.parse(queryString.slice(1));
  const { match } = urlParams;
  const { events } = state.guru;
  if (!events || !events.length) return [];
  if (isEmpty(urlParams) || isEmpty(events)) {
    return state.guru.events;
  }
  return events.filter(event => (event.id === parseInt(match, 10)));
};

export const isSharePage = (state) => {
  const queryString = queryStringSelector(state);
  const urlParams = qs.parse(queryString.slice(1));
  return urlParams.match || false;
};

export const userEventsSelector = (state) => {
  return state.guru.userEvents;
};
export const userReputationSelector = (state) => {
  return state.guru.reputation;
};

export const authCoinbaseSelector = (state) => {
  return state.guru.authCoinBase;
};
export const isLoading = (state) => {
  if (!state.guru) return false;
  return state.guru.isFetching;
};
