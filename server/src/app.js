const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

axios.defaults.baseURL = 'https://testnet.bitmex.com';
$axios = axios.create();

const PORT = process.env.PORT || 8081;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/api/v1/instrument/active/', (req, res) => {
  $axios({ method: 'get', url: res.req.url })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response)
        res.status(error.response.status).send(JSON.stringify(error.response.data.error));
      else res.status(404).send(error.response);
    });
});
app.get('/api/v1/trade/bucketed/', (req, res) => {
  $axios({
    method: 'get',
    url: res.req.url,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response)
        res.status(error.response.status).send(JSON.stringify(error.response.data.error));
      else res.status(404).send(error.response);
    });
});
app.get('/api/v1/order/', (req, res) => {
  $axios({
    method: 'get',
    url: res.req.url,
    headers: {
      contentType: res.req.headers['api-expires'],
      'api-expires': res.req.headers['api-expires'],
      'api-key': res.req.headers['api-key'],
      'api-signature': res.req.headers['api-signature'],
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response)
        res.status(error.response.status).send(JSON.stringify(error.response.data.error));
      else res.status(404).send(error.response);
    });
});
app.post('/api/v1/order/', (req, res) => {
  $axios({
    method: 'post',
    url: res.req.url,
    data: res.req.body,
    headers: {
      contentType: res.req.headers['content-type'],
      'api-expires': res.req.headers['api-expires'],
      'api-key': res.req.headers['api-key'],
      'api-signature': res.req.headers['api-signature'],
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response)
        res.status(error.response.status).send(JSON.stringify(error.response.data.error));
      else res.status(404).send(error.response);
    });
});
app.get('*', (req, res) => {
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log('Server has been started.');
});
