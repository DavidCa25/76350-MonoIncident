import { Router } from "express";
import { monkeyRoutes } from "./monkeyPoxCase/route";


export class AppRoutes{
    static get routes(){
        const router =  Router();
        router.use("/api/monkeyCases", monkeyRoutes.routes);
        return router;
    }
}