import * as express from 'express';
import { Application } from 'express';
import * as cors from 'cors';
import * as bcrypt from 'bcryptjs';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import userRouter from './routes/users';

import { getRepository } from "typeorm";
import { Users } from "./entity/User";

createConnection().then(async (connection) => {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: true, }));
  app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 })); 

  app.use('/', userRouter);

  // const userRepo = getRepository(Users);
  // const hashedPassword = await bcrypt.hash('admin_password', 10);
  // const user = userRepo.create({
  //   full_name : "Admin",
  //   email: "admin@example.in",
  //   user_name : "admin user",
  //   user_type : "admin",
  //   password : `${hashedPassword}`
  // });
  // await userRepo.save(user).catch((err) => {
  //   console.log("Users : ",user)
  //   console.log("Error: ", err);
  // });

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
