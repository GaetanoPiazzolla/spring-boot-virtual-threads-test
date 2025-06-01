import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const getTrend = new Trend('Get_Books');
const getErrorRate = new Rate('Get_Books_error');

const postTrend = new Trend('Add_Book');
const postErrorRate = new Rate('Add_Book_error');

const orderTrend = new Trend('Add_Order');
const orderErrorRate = new Rate('Add_Order_error');

export let options = {
  stages: [
      { duration: "5s", target: `${__ENV.USERS}` },
      { duration: "50s", target: `${__ENV.USERS}` },
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080/';
  const url = baseUrl;

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const addBookBody = JSON.stringify({
      author: `Author Name ${__ITER}`,
      isbn: `${__VU}`,
      title: `always the same title`,
      year: 1900
  });

  const requests = {
      'Get Books': {
        method: 'GET',
        url: url +'books',
        params: params,
      },
      'Add Book': {
        method: 'POST',
        url: url+'books',
        params: params,
        body: addBookBody,
      },
      'Add Order': {
        method: 'POST',
        url: url + 'orders?bookIsbn=11111111&firstName=Gaetano',
        params: params,
        body: null
      }
    };

  const responses = http.batch(requests);
  const getResp = responses['Get Books'];
  const postResp = responses['Add Book'];
  const addOrderResp = responses['Add Order'];

  check(getResp, {
    'status is 200': (r) => r.status === 200,
  }) || getErrorRate.add(1);

  getTrend.add(getResp.timings.duration);

  check(postResp, {
    'status is 200': (r) => r.status === 200,
  }) || postErrorRate.add(1);

  postTrend.add(postResp.timings.duration);

  check(addOrderResp, {
    'status is 200': (r) => r.status === 200,
  }) || orderErrorRate.add(1);

  orderTrend.add(addOrderResp.timings.duration);
}

export function teardown() {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080/';
  const cleanupResp = http.get(baseUrl + 'database/clean');
  check(cleanupResp, {
    'cleanup status is 204': (r) => r.status === 204,
  });
}