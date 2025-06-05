import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { controller } from './controller/controller';
import dotenv from 'dotenv';
import connectToDatabase from './dbconnect';

dotenv.config();

const app = createServer();
const port =  4004;



function createServer() : Express{
  const app: Express = express();
  // app.use(express.json());
  // app.use(cookieParser());
  connectToDatabase().then(()=>{
    app.use(express.json());
    app.use(cookieParser());
    const corsOptions = {
        origin: true,
        credentials:true,
        exposedHeaders: ['auth']
    }
    app.use(cors(corsOptions));
    controller(app);
  })
  // 컨트롤러 추가
  return app;
}

const server = http.createServer(app).listen(port, process.env.SERVER_HOST, () => {
  console.log(`[server]: Server is running at <${process.env.SERVER_HOST}>:${port}`);
});