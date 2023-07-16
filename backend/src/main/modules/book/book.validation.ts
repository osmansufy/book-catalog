import { NextFunction, Request, Response } from "express";
import admin from "../../../lib/firebase/firebase";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    const decodeToken = await admin.auth().verifyIdToken(token!);
    req.body.user = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Unauthorized",
      errorMessages: [
        {
          path: req.originalUrl,
          message: "Unauthorized",
        },
      ],
    });
  }
};

export const bookValidation = {
  verifyUser,
};
