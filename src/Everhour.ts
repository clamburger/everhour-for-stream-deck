let apiKey: string | null = null;

function request(endpoint: string, method: string, data?: Record<string, any>) {
  if (!apiKey) {
    return Promise.reject('Everhour API token has not been set');
  }

  const url = new URL(`https://api.everhour.com/${endpoint}`);

  const headers = new Headers();
  headers.set('X-Api-Key', apiKey);

  const options: RequestInit = {
    method,
    headers,
  };

  if (data !== undefined) {
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(data);
      headers.set('Content-Type', 'application/json');
    } else if (method === 'GET') {
      url.search = new URLSearchParams(data).toString();
    }
  }

  return fetch(url.toString(), options);
}

const api = {
  getApiToken: () => apiKey,
  setApiToken: (apiToken: string) => {
    apiKey = apiToken;
  },
  timers: {
    get: () => request('timers/current', 'GET'),
    start: (task: string) => request('timers', 'POST', { task, userDate: getUserDate() }),
    stop: () => request('timers/current', 'DELETE'),
  },
};

function getUserDate() {
  const date = new Date();
  const pad = (num: number) => (num < 10 ? '0' : '') + num;
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

export default api;
