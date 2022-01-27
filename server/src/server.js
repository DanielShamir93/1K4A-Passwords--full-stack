require("./db/mongoose");
const usersRouter = require("./routes/users/users.router");
const accountsRouter = require("./routes/accounts/accounts.router");
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, '../..', 'client/build');

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routers
app.use("/users", usersRouter);
app.use("/accounts", accountsRouter);

app.all('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});