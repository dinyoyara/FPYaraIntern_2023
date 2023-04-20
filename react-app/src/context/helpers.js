export const handleAxiosError = (error, setErrors) => {
    const errorMessages = error.response.data.message;
    setErrors(errorMessages);
};
