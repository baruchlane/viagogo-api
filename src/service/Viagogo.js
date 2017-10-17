import request from 'got';
import base64 from 'base-64';

class Viagogo {
  initialize(options) {
    if (!options.clientId) {
      throw new TypeError('Requires a clientID option');
    }

    if (!options.clientSecret) {
      throw new TypeError('Requires a clientSecret option');
    }

    this.tokenURL = options.tokenURL || 'https://account.viagogo.com/oauth2/token';
    this.searchURL = options.searchURL || 'https://api.viagogo.net/v2/search';
    this.categoryURL = options.categoryURL || 'https://api.viagogo.net/v2/categories';
    this.eventsURL = options.eventsURL || 'https://api.viagogo.net/v2/events';
    this.scope = options.scope || '';
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
  }

  authenticate() {
    return (req, res, next) => {
      if (this.token) {
        return next();
      }
      this.getAuthToken().then(response => {
        const { access_token: accessToken } = JSON.parse(response.body);
        if (accessToken) {
          this.token = accessToken;
          this.defaultOptions = {
            headers: {
              Authorization: 'Bearer ' + this.token,
              'User-Agent': 'blane\'s app'
            },
            method: 'GET',
            json: true
          };
          return next();
        }
        return res.status(403).send('Unable to authenticate user credentials. Check your user credentials');
      }).catch(e => {
        console.log(e);
        return res.status(403).send('Unable to authenticate user credentials. Check your user credentials');
      });
    };
  }

  getAuthToken() {
    console.log('getting auth token');
    const options = {
      headers: {
        Authorization: 'Basic ' + this.encodeHeader(),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: `grant_type=client_credentials&scope=${this.scope}`
    };
    return request(this.tokenURL, options);
  }

  encodeHeader() {
    return base64.encode(`${encodeURIComponent(this.clientId)}:${encodeURIComponent(this.clientSecret)}`);
  }

  search(query) {
    const url = `${this.searchURL}?query=${query}&type=category&embed=category`;

    return request(url, this.defaultOptions);
  }

  events(categoryId) {
    const url = `${this.categoryURL}/${categoryId}/events`;

    return request(url, this.defaultOptions);
  }

  listings(eventId) {
    const url = `${this.eventsURL}/${eventId}/listings`;

    return request(url, this.defaultOptions);
  }
}

module.exports = new Viagogo();

