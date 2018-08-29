import api from './api';
export default (app) => {
  app.get('/', (req, res) => {
    return res.status(200).json('Welcome to Jimoh Hadi Official Website API');
  });
  app.use('/api', api);
  app.use('/api/*', (req, res) => {
    return res.status(404).json('This API route doesn\'t exist');
  });
  app.use('**', (req, res) => {
    return res.status(404).json('This route doesn\'t exist');
  })
}
