const mongoose = require("mongoose");

const connections = mongoose
  .createConnection("mongodb://localhost:27017/SurakshaSaathi")
  .on("open", () => {
    console.log("Mongodb connected");
  })
  .on("error", () => {
    console.log("Mongodb connection error");
  });

module.exports = connections;
