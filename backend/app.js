require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const authRouter=require('./routes/auth')

const app = express();

//access
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true, // Allow cookies to be sent with the request
}));
app.options('*',cors());
app.set('view engine', 'handlebars');

//notification testing 
let notifications = [];

app.post('/send-notification', (req, res) => {
  const { message } = req.body;
  console.log('Sending notification:', message);

  notifications.push(message);

  res.sendStatus(200);
});

app.get('/get-notifications', async (req, res) => {
  try {
    // Use long polling approach: respond when there are new notifications
    const waitForNotifications = () => {
      if (notifications.length > 0) {
        const newNotifications = notifications.slice();
        notifications = []; // Clear the notifications array
        res.json({ notifications: newNotifications });
      } else {
        setTimeout(waitForNotifications, 1000); // Check again after 1 second
      }
    };

    waitForNotifications();
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiBase="/api"
app.use(apiBase,authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));