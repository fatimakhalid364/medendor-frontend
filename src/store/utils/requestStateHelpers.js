export const createRequestState = () => ({
    status: "idle",
    error: null,
});

export const setRequestPending = (request) => {
    request.status = "pending";
    request.error = null;
};


export const setRequestSucceeded = (request) => {
    request.status = "succeeded";
};


export const setRequestFailed = (request, error) => {
    request.status = "failed";
    request.error = error;
};

export const clearRequestError = (request) => {
    request.error = null;
};