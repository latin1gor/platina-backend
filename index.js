import cors from "cors";
import express from "express";
import sequelize from "./db.js";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware.js";
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/api", router);
app.use(fileUpload({}));
app.use(ErrorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server successfully started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
