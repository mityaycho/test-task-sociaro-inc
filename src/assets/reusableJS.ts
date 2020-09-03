export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const dateСonvertation = (value: any) => {
	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const date = new Date(+value * 1000);
	const hour = date.getHours();
	const minute = date.getMinutes();
	const day = DAYS[date.getDay()];
	const numberOfMonths = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();

	return { day, month, year, hour, minute, numberOfMonths };
};