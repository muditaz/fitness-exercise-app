export const apiCall = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return(result);
    } catch(err) {
        return(err);
    }
};