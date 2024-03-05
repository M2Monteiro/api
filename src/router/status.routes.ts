import { Router, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const statusRouter = Router();

statusRouter.get("/status", (request: Request, response: Response) =>
  response.status(200).json({ status: "online" })
);


// statusRouter.post("/login", async (req, res) => {
//   // Aqui você iria buscar o usuário no banco de dados
//   const user = { id: 1, username: "admin", password: "password" };

//   if (!user || !(await statusRouter.compare(req.body.password, user.password))) {
//     return res.status(401).send("Usuário ou senha inválidos");
//   }

//   const accessToken = jwt.sign(user, process.env.JWT_SECRET as string);
//   res.json({ accessToken });
// });

// statusRouter.get("/protected", authenticateToken, (req, res) => {
//   res.send("Acesso permitido");
// });


export default statusRouter;
