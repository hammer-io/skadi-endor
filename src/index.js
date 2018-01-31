import express from 'express';
import * as heartbeats from './routes/heatbeat.routes';
import * as index from './routes/index.routes';

const app = express();

app.use('/', express.static('docs'));
app.use('/api', [index.router]);
app.use('/api/v1', [heartbeats.router]);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
    documentation_url: `http://${req.get('host')}`
  });
});

app.listen(4000, () => console.log('skadi-endor listening on port 4000'));
