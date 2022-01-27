import axios from "axios";

const PORT = process.env.PORT || 5000;

let myUrl = {
  users: `http://localhost:${PORT}/users`,
  accounts: `http://localhost:${PORT}/accounts`
};

if (process.env.NODE_ENV === "production") {
  myUrl = {
    users: "users",
    accounts: "accounts"
  };
}

export const usersApi = axios.create({
  baseURL: myUrl.users,
});

export const accountsApi = axios.create({
  baseURL: myUrl.accounts,
});