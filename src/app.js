import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import Viagogo from './service/Viagogo';
import router from './router';
import expressReactViews from 'express-react-views';

const app = express();
const reactEngine = expressReactViews.createEngine();

Viagogo.initialize({
  clientId: 'TaRJnBcw1ZvYOXENCtj5',
  clientSecret: 'ixGDUqRA5coOHf3FQysjd704BPptwbk6zZreELW2aCYSmIT8XJ9ngvN1MuKV',
});

app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Viagogo.authenticate());
app.use(router);
app.get('/test', (req, res) => {
  res.send('hello world');
});

module.exports = (ext) => {
  app.set('view engine', ext);
  app.engine(ext, reactEngine);
  return app;
};

