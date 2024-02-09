export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};