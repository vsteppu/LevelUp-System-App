import express from 'express'
import cors from 'cors'
import config from 'config';

const app = express()
const port = config.get('app.port');

app.use(cors()) // permite cereri de pe alte porturi
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Welcome to ${config.get('appName')}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
