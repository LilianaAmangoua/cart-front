import axios from "axios";

const myDB = axios.create({
    baseURL: "http://localhost:8080",
});


const responseInterceptor = (error: any) => {
    const status = error.response?.status;
    switch (status) {
        case 400:
            console.log("ERROR 400");
            break;
        case 401:
            console.log("ERROR 401");
            return Promise.reject(error?.response ?? error);
        case 403:
            console.log("ERROR 403");
            break;
        case 404:
            console.log("ERROR 404");
            break;
        case 500:
            console.log("ERROR 500");
            break;
        default:
            break;
    }
    return Promise.reject(error);
};

myDB.interceptors.response.use(
    response => response,
    responseInterceptor
)


export const get = async <T = any>(url: string, config?: {}): Promise<T | null> => {
    try {
        const response = await myDB.get(url, config);
        return response.data;
    } catch (error) {
        console.error("Cannot get from database: ", error);
        return null;
    }
};

export const post = async <T = any>(url: string, data: object, config?: {}): Promise<T | null> => {
    try {
        const response = await myDB.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error("Cannot post to database : ", error);
        return null;
    }
};

export const put = async <T = any>(url: string, data: object, config?: {}): Promise<T | null> => {
    try {
        const response = await myDB.put(url, data, config);
        return response.data;
    } catch (error) {
        console.error("Cannot update to database : ", error);
        return null;
    }
}

export const deleteFromDB = async <T = any>(url: string, config?: {}): Promise<void> => {
    try {
        const response = await myDB.delete(url, config);
        return response.data;
    } catch (error) {
        console.error("Cannot delete this movie from favorites : ", error);
    }
}


