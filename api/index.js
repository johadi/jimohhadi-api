import api from './api';
export default (app) => {
  app.use('/api', api);
  app.use('/api/*', (req, res) => {
    return res.status(404).json('This API route doesn\'t exist');
  });
}
