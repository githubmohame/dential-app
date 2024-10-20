import ErrorCustome from "../utilities/error";

export async function BasicAuthMiddleware(
  req,
  res,
  next,
  userRepos,
  adminRepos
) {
  if (req.headers["email"] && req.headers["password"]) {
    let user1 = await userRepos.getUserByEmail(req.headers["email"]);
    req.usertype = "user";
    let user2 = null;
    if (!user1) {
      user2 = await adminRepos.getAdminByEmail(req.headers["email"]);
      req.usertype = "admin";
    }
    if (!(user1 || user2)) {
      let err1 = new Error();
      err1.res = ErrorCustome(
        "the email or password is incorrect",
        "function BasicAuthMiddleware 1",
        500
      );
      next(err1);
    }
    next();
    return;
  }
  let err1 = new Error();
  err1.res = ErrorCustome(
    "the header should have email and password",
    "function BasicAuthMiddleware 2",
    500
  );
  next(err1);
}
