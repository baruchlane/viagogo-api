import express from 'express';
import Viagogo from './service/Viagogo';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/search', (req, res) => {
  const { artist } = req.body;
  Viagogo.search(artist).then(response => {
    const { _embedded: { items }} = response.body;
    res.render('artists', { items });
  }).catch(e => {
    res.send(e);
  })
});

router.get('/artist/:id', (req, res) => {
  Viagogo.events(req.params.id).then(response => {
    const { _embedded: { items }} = response.body;
    res.render('events', { items });
  }).catch(e => res.send(e));
});

router.get('/event/:id', (req, res) => {
  Viagogo.listings(req.params.id).then(response => {
    res.render('listings', response.body);
  }).catch(e => res.send(e));
});

module.exports = router;
