import {FormatDate} from '../consts';
import moment from "moment";

export const formatTime = (date) => moment(date).format(FormatDate.MOMENT_TIME);
export const formatDate = (date) => moment(date).format(FormatDate.MOMENT_DATE);
export const getIsoDate = (date) => moment(date).format(FormatDate.MOMENT_ISO);

const getDefaultSortedEvent = (first, second) => first.startTime - second.startTime;

export const getDefaultSortedEvents = (events) => events.sort(getDefaultSortedEvent);

export const getOffersByType = (offers, type) => {
  const index = offers.findIndex((offer) => offer.type === type);

  return offers[index].offers;
};
