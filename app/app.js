import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import meetup from './routes/api';

// Initialize express app
const app = express();

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cross origin resource sharing middleware
app.use(cors());

// Meet up  middleware
app.use('/api/v1/', meetup);

// Home page route
app.get('/', (req, res) => {
  res.json(
    {
      status: 200,
      data: [{
        message: 'Welcome to Questioner Home Route',
      }],
    },
  );
});

// Handle non exist route with with proper message
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: {
      message: 'Wrong request. Route does not exist',
    },
  });
});

// Define application port number
const port = process.env.PORT || 3000;

// Start server
app.listen(port);

// expose app to be use in another file
export default app;
