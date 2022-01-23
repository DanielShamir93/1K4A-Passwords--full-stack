import axios from "axios";

const PORT = process.env.PORT || 5000;
let myUrl = `http://localhost:${PORT}/user`; //development

if (process.env.NODE_ENV === "production") {
  myUrl = "user";
}

export default axios.create({
  baseURL: myUrl,
});
