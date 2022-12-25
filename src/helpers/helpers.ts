class Helpers {
    static addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }

    static formatDateToString(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth()+1 < 10 ? '0' : ''}${date.getMonth()+1}-${date.getDate()}`;
    }
}