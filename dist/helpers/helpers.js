class Helpers {
    static addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }
    static formatDateToString(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate()}`;
    }
}
//# sourceMappingURL=helpers.js.map