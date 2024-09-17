import express, { Router } from 'express'
import { Response, Request } from 'express';
import { envs } from './config/envs';
import { MongoDatabase } from './data/init';
import { AppRoutes } from './presentation/route';
import { emailJob } from './domain/jobs/email.job';

console.log(envs.PORT)
const app = express();
app.use(express.json());
app.use(AppRoutes.routes);
(async () =>
    await MongoDatabase.connect({
         mongoUrl: envs.MONGO_URL,
         dbname: envs.MONGO_DB
     }))
();

app.listen(3000, () =>{
    console.log("Server running on PORT 3000")
    emailJob();
})

