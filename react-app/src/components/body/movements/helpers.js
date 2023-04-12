export const GetDateString = (date) => {
    const dayString = date.split('T')[0];
    const [year, day, month] = dayString.split('-');
    return `${month}/${day}/${year}`;
};
