export const BASE_URL = 'http://localhost:5000';

const prepareData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject({
        name: `Произошла ошибка ${
          res.status === 404
            ? `обратитесь в техническую поддержку нашего приложения`
            : `сервер не отвечает на запросы, попробуйте позднее. Код ошибки: ${res.status}`
        }.`,
      });
};

const request = ({ url, method = 'POST', body }) => {
  const config = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!!body && { body: JSON.stringify(body) }),
  };
  return fetch(`${BASE_URL}${url}`, config).then(prepareData);
};

export const payment = (CardNumber, ExpDate, Cvv, Amount) => {
  return request({ url: '/payment-info', body: { CardNumber, ExpDate, Cvv, Amount } });
};
