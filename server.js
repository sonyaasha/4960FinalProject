const { _ENDPONT, _ACCESS_TOKEN, _VERSION } = require('./src/shared/constants.js')

const express = require('express');
const app = express();  
const cors = require('cors')
const compress = require('compression')
const port = process.env.LISTENER_PORT || 8080; 
const debug = require('debug')('app:server')
var httpProxy = require('http-proxy')
const LONG_TIMEOUT = 1000 * 60 * 30;
var apiProxy = httpProxy.createProxyServer({
  proxyTimeout: LONG_TIMEOUT
})

 

const isProd = process.env ==='production'? true: false; 
const _endpoint = _ENDPONT? _ENDPONT: "cunning-raccoon-oaq9b8-dev-ed.trailblaze.my.salesforce.com";
const _version = _VERSION? `${_VERSION}/`: ""
var serverSalesForce = !isProd? `https://${_endpoint}/services/data/${_version}`:'' ; // fix

app.use(compress())
app.use(cors()) // for Cross-Origin Request Blocked with React and Express

app.use('/', express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

app.get('/api/data', (req, res) => { 
  // Handle your API logic here 
  res.json({ message: 'Hello from Express!' });
}); 

 // Set up the proxy.
 app.all("/*", function(req, res) {   // redirect to salesforce 
  debug('redirecting to salesforce ->', serverSalesForce); 
  apiProxy.web(req.setTimeout(LONG_TIMEOUT), res, {
    target: serverSalesForce,
    changeOrigin: true,
    proxyTimeout: LONG_TIMEOUT 
  });
});


app.listen(port, () => { 
  console.log(`Server is running on port ${port}`); 
});