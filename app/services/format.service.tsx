import dayjs from 'dayjs';

export function toMidDate(date: Date) {
	return dayjs(date || new Date()).format('MMM Do YYYY');
}
