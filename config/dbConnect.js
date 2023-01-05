const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/jshostel';
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err.message));
