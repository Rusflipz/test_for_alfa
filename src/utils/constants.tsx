export const config = {
  baseUrl: 'https://random-data-api.com/api/v2/users?size=',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};