const peopleRoutes = require('./userApi');

const constructorMethod = (app) => {

  app.use('/', peopleRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;