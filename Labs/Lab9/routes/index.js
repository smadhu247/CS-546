const primeRoutes = require('./primes');

const constructorMethod = (app) => {
  app.use('/', primeRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
