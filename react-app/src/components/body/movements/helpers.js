export const getDateString = (date) => {
    const dayString = date.split('T')[0];
    const [year, day, month] = dayString.split('-');
    return `${month}/${day}/${year}`;
};

export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const isValueInteger = (value) => {
    return value % 1 === 0;
};
