import { Router, Request, Response } from "express";
import { MonkeyPoxController } from "./controller";

export class monkeyRoutes{
    static get routes() : Router{
        const router = Router();
        const monkeyPoxController = new MonkeyPoxController();
        router.get("/", monkeyPoxController.getMonkeyPoxCases);
        router.post("/", monkeyPoxController.createCase);
        router.put("/:id", monkeyPoxController.updateCases);
        router.delete("/:id", monkeyPoxController.deleteCase);
        router.get("/days", monkeyPoxController.getLast7DaysCases);
        return router;
    }
}