import express from "express";
import { bookRouter } from "../modules/book/book.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/books",
    route: bookRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
