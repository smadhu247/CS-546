const bandsRoutes = require('./bands');
const albumRoutes = require('./albums');

const constructorMethod = (app) => {
  app.use('/bands', bandsRoutes);
  app.use('/albums', albumRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
