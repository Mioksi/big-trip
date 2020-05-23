import {FormatDate, MAX_HOURS} from '../consts';
import moment from "moment";

export const formatFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const formatTime = (date) => moment(date).format(FormatDate.MOMENT_TIME);
export const formatDate = (date) => moment(date).format(FormatDate.MOMENT_DATE);
export const formatMonth = (date) => moment(date).format(FormatDate.MOMENT_MONTH);
export const formatDay = (date) => moment(date).format(FormatDate.MOMENT_DAY);
export const getIsoDate = (date) => moment(date).format(FormatDate.MOMENT_ISO);

export const castTimeFormat = (value) => value < MAX_HOURS ? `0${value}` : String(value);

const getDefaultSortedEvent = (first, second) => first.startTime - second.startTime;

export const getDefaultSortedEvents = (events) => events.slice().sort(getDefaultSortedEvent);

export const getOffersByType = (offers, type) => {
  const index = offers.findIndex((offer) => offer.type === type);

  return offers[index].offers;
};
