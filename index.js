const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://readify-app-frontend.vercel.app'],
  credentials: true
}));

//routes
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats')



app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/',(req, res)=>{
    res.send('Book store server running!')
    console.log('Book store server running!')
})
}

main().then(() => console.log("MongoDB connected successfully!")).catch(err => console.log(err));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})