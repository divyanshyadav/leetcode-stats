export function secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
}

export function getSeconds(time = '00:00:00') {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 60 * 60) + (minutes * 60) + seconds;
}

export function isToday(date) {
    const [day, month, year] = date.split('-');
    date = new Date(`${month}/${day}/${year}`);

    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);

    return date.getTime() === curDate.getTime();
}
