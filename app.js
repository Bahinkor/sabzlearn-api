const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./modules/auth/auth.router");
const userRouter = require("./modules/user/user.router");
const categoryRouter = require("./modules/category/category.router");
const courseRouter = require("./modules/course/course.router");
const sessionRouter = require("./modules/session/session.router");
const commentRouter = require("./modules/comment/comment.router");
const userCourseRouter = require("./modules/userCourse/userCourse.router");
const replayRouter = require("./modules/replay/replay.router");
const contactRouter = require("./modules/contact/contact.router");
const newsLetterRouter = require("./modules/newsLetter/NewsLetter.router");

const app = express();

app.use("/courses/covers", express.static(path.join(__dirname, "/public", "courses", "covers")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/courses", courseRouter);
app.use("/v1/session", sessionRouter);
app.use("/v1/comment", commentRouter);
app.use("/v1/user-course", userCourseRouter);
app.use("/v1/replay", replayRouter);
app.use("/v1/contact", contactRouter);
app.use("/v1/newsletter", newsLetterRouter);

app.use((req, res) => {
    return res.status(404).json({
        message: "Route Not Found"
    });
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        statusCode: err.status || "Uncertain",
        message: err.message || "internal server error"
    });
});

module.exports = app;