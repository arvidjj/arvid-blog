import axios from "axios";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json", // Corrected syntax here
  },
  timeout: 1000, // Moved timeout outside the headers object
});

export default instance;
