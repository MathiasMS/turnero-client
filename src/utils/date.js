import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

export const convert = (currentDate) => {
    return moment(currentDate).startOf("day").add(6, "hours").format();
}

export const createCalendar = (fromDate, toDate, fraction) => {
    let currentDate = moment(fromDate);
    let endDate = moment(toDate)

    const calendar = [];

    while (currentDate <= endDate) {
        const hours = getHours(currentDate, fraction);

        calendar.push(formatDay(currentDate, hours));
        currentDate = currentDate.add(1, "days");
    }

    return calendar;
};


export const formatDay = (currentDate, hours) => {
    const day = currentDate.startOf("day").add(6, "hours").format();
    const formattedDay = currentDate.startOf("day").add(6, "hours").format("LL")

    return {
        day,
        formattedDay,
        hours
    };
};

export const getHours = (currentDate, fraction = 20) => {
    let currentHour = moment(currentDate).startOf("day").add(6, "hours");
    let lastHour = moment(currentDate).startOf("day").add(19, "hours");

    const hours = [];

    while (currentHour <= lastHour) {
        hours.push(currentHour.format("LT"));
        currentHour = currentHour.add(fraction, "minutes");
    }

    return hours;
};

// createCalendar(fromDate, toDate)

// const todayPlus = date(today).add(fraction, "minutes");
// console.log(todayPlus.format("LLL"));
