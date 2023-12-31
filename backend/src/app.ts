import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./main/middleware/globalErrorHandler";
import routes from "./main/routes";
import cors from "cors";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/api/v1", routes);

//Testing
// app.get("/error", (next: NextFunction) => {
//   throw new ApiError(
//     httpStatus.CONFLICT,
//     "Academic semester is already exist !"
//   );
// });
// global error handler

app.use(globalErrorHandler);

// handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Not Found",
      },
    ],
  });
  next();
});

export default app;
