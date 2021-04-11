import express from 'express';
import compression from 'compression';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import root from './routes/root';
import data from './routes/data';

const liveReloadServer = livereload.createServer();
liveReloadServer.watch('public');

const app = express();

app.use(connectLivereload());
app.use(compression());
app.use(express.static('public'));

app.use('/', root);
app.use(data);

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.info(`Running on ${port}...`);
});
