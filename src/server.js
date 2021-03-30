import express from "express";
import compression from "compression";
import root from "./routes/root";
import data from './routes/data'
const app = express();

app.use(compression());
app.use(express.static("public"));

app.use("/", root);
app.use(data)

const port = process.env.PORT || 3030;
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}...`);
});