const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/jshostel';
const MONGODB_URI="mongodb+srv://jshostel101:jshostel101@cluster0.ycwzi.mongodb.net/?retryWrites=true"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err.message));
