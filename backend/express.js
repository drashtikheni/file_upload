const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeMongoose } = require("./mongoose");
const errorHandler = require("./middleware/error.middleware");
const { authRouter } = require("./routers/auth.router");

const initializeExpress = (http) => {
  const PORT = process.env.PORT || 3001;
  http.listen(PORT, async () => {
    console.log(`⚡️ Express app is running on port: ${PORT}`);

    await initializeMongoose();
  });
};

const handleRequests = (app) => {
  app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");

    next();
  });

  app.use(bodyParser.json());
  app.use(cors());

  app.use(errorHandler);

  app.use("/auth", authRouter);
};

exports.initializeExpress = initializeExpress;
exports.handleRequests = handleRequests;
