import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const requestTrend = new Trend('Request_Duration');
const errorRate = new Rate('Request_Error');

export let options = {
  stages: [
      { duration: "10s", target: `${__ENV.USERS}` },
      { duration: "5s", target: `${__ENV.USERS}` },
      { duration: "40s", target: `${__ENV.USERS}` },
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  const url = __ENV.BASE_URL || 'http://localhost:8080/';
  const workloadUrl = __ENV.WORKLOAD_OPTIMIZED == 'true' ? 'mixed/complex-operation/optimized/1' : 'mixed/complex-operation/1'

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
      },
      'Complex Operation': {
        method: 'GET',
        url: url + workloadUrl,
        params: params,
        body: null
      }
    };

  const responses = http.batch(requests);

  for (const [name, response] of Object.entries(responses)) {
    check(response, {
      'status is 200': (r) => r.status === 200,
    }) || errorRate.add(1);
    requestTrend.add(response.timings.duration);
  }
}

export function teardown() {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:8080/';
  const cleanupResp = http.get(baseUrl + 'database/clean');
  check(cleanupResp, {
    'cleanup status is 204': (r) => r.status === 204,
  });
}

export function handleSummary(data) {
  const formatMetric = (value, decimals = 2) => {
    return value !== undefined && value !== null ? value.toFixed(decimals) : 'N/A';
  };

  return {
    'stdout': `

${textSummary(data, { indent: ' ', enableColors: true })}

Test Results:
    Total Iterations: ${formatMetric(data.metrics.iterations?.values?.count, 0)}
    Throughput: ${formatMetric(data.metrics.http_reqs?.values?.rate)} req/s
    Average Response Time: ${formatMetric(data.metrics.http_req_duration?.values?.avg)}ms
    P95 Response Time: ${formatMetric(data.metrics.http_req_duration?.values?.['p(95)'])}ms
    Error Rate: ${formatMetric(data.metrics.http_req_failed?.values?.rate * 100)}%
    ------------
    `
  };
}