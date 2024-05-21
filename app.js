///these are the imports
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const adminRouter = require("./routers/admin.router");
const imageRouter = require("./routers/image.router");
const incidentRouter = require("./routers/incident.router");
const attach_filesRouter = require("./routers/attach_files.router");
const cors = require("cors");
const noticeRouter = require("./routers/notice.router");
const policeRouter = require("./routers/police.router");

//this is to parse json itesm
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//allow cross axis origin
app.use(cors()); //

//these are the routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/image", imageRouter);
app.use("/incident", incidentRouter);
app.use("/attach_files", attach_filesRouter);
app.use("/notice", noticeRouter);
app.use("/police", policeRouter);

//this is the exports
module.exports = app;
