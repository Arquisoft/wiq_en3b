import app from './app';

const port = 8000;

app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});
