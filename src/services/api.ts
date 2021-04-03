

import axios, { AxiosInstance, AxiosError } from "axios";

const api = (
    contentType = "application/json"
): AxiosInstance => {
    const api = axios.create({
        baseURL: 'http://local.streaming-store/api',
        headers: {
            "Content-Type": contentType,
            Accept: "application/json",
            // Authorization: `Bearer ${state.auth.api_token}`,
        },
    });

    api.interceptors.request.use(
        (request) => {
            if (process?.env?.NODE_ENV === 'development')
                console.log(
                    `Sending ${request.method?.toUpperCase()} request to ${request.baseURL
                    }${request.url}?${serialize(request.params)}`
                );
            return Promise.resolve(request);
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            if (process?.env?.NODE_ENV === 'development') console.log("Response", response.data);

            return Promise.resolve(response);
        },
        (error) => {
            if (process?.env?.NODE_ENV === 'development')
                console.log("Error:", error.response.status, error.response.data);

            if (error.response.status === 401) {
                // dispatch({ type: "AUTH_LOGOUT" });
            }

            return Promise.reject(error);
        }
    );

    return api;
};

export function getErrorMessage(error: AxiosError): string {
    if (error.response?.data?.errors) {
        const [fields]: Array<Array<string>> = Object.values(
            error.response.data.errors
        );
        const [message] = fields;
        if (message) return message;
    }

    if (error.response?.data.error) {
        return error.response.data.error;
    }

    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    return error.message;
}

function serialize(obj: Record<string, string | number | boolean>): string {
    const str = [];
    for (const p in obj)
        if (obj?.[p]) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default api;
