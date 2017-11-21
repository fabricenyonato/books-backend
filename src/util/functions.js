function error(error, promiseReject) {
    promiseReject(error);
    throw error;
}


module.exports = {
    error
};
