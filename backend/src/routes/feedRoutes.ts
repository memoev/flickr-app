import { Router } from "express";
import { getFeed } from "../controllers/FeedController";

const router = Router();

// GET /feed
router.get("/public-feed", getFeed);

export default router;
