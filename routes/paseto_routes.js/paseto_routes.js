import { Router } from "express";
import { use } from "bcrypt/promises";
export function TokenRoute(
  verifyMiddleware,
  pasetoRepos,
  userRepos,
  adminRepos
) {
  const route = Router();
  route.use(verifyMiddleware);
  route.get("createToken", async function (req, res) {
    
  });
}
/*
   this.id=id;
        this.userPaseto=userPaseto;
        this.token=token;
*/
