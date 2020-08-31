import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
//nullable
mongoose.connect(process.env.DB_URL!, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
  console.log('db connected');
});

db.on('error', (error) => {
  console.log(`db connect failed ${error}`);
});
