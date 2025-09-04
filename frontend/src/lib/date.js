import dayjs from 'dayjs';

export const fmt = (d) => dayjs(d).format('DD MMM YYYY, hh:mm A');
export const toInputLocal = (d) =>
  d ? dayjs(d).format('YYYY-MM-DDTHH:mm') : dayjs().format('YYYY-MM-DDTHH:mm');