require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const addnewbook = require('./route/newbook')
const authRoute = require('./route/auth');
const blogpostRoute = require('./route/blog');
const paymentRoute = require('./route/payment');
const serminarRoute = require('./route/serminar');
const certificate = require('./route/certificate');
const Testimonial = require('./route/testimonial');
const videoUpload = require('./route/upload_Video');
const subscription = require('./route/subscription');
// const uploadbookRoutes = require('./route/uploadBooks');

const myMiddleware = (req, res, next) => {
  next();
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(myMiddleware);

app.use(express.static(path.join(__dirname, 'build')));

// Serve files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(helmet());

const allowedOrigins = [
  'http://localhost:3000', // Allow requests from localhost:3000
  // Add other allowed origins here
];

app.use(cors({
  origin: allowedOrigins,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use('/api/auth/', authRoute);
app.use('/api/cert', certificate);
app.use('/api/video', videoUpload);
app.use('/api/testimo', Testimonial);
app.use('/api/blog', blogpostRoute);
app.use('/api/paystack', paymentRoute);
app.use('/api/confrence', serminarRoute);
//app.use('/api/books', uploadbookRoutes);
app.use('/api/allbook', addnewbook);
app.use('/api/sub/', subscription);



// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const numWorkers = 4;
const workers = [];
let currentWorker = 0;

// Use the same app instance for all workers
for (let i = 0; i < numWorkers; i++) {
  workers.push(app);
}

app.use((req, res, next) => {
  workers[currentWorker].handle(req, res, next);
  currentWorker = (currentWorker + 1) % numWorkers;
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
