import moment from 'moment';

export function dateFormat(date, format = 'DD-MM-YYYY') {
    return date && moment(date).format(format);
}
