import ErrorCustome from "../utilities/error.js"
const routes_admin={"/service":["*"],"/admin":["*"],
    '/appointments/:year/:month/:day':["get"],
    '/appointments/:year/:month':["get"],
    "/services/delete-service":["delete"],
    "/services":["post"],
    "/services/update-service":["put"],
    "/workdays":["*"],
};
const route_user={
    '/appointments/user/:userId':["get"],
    "/review":["post"],
    "/user":["*"]

}
const both={'/appointments':["post"],
    "/review":["get"],
    '/appointments/cancel':["delete"],
    "/review":["get"],
    "/services":["get"],
    "/appointments/available-times/:year/:month/:day":["get"],
}

export default function CheckPermission(req, res, next) {
    console.log(req.originalUrl)
    if((routes_admin[req.originalUrl]!=null&&
        (routes_admin[req.originalUrl].indexOf("*")!=-1||routes_admin[req.originalUrl].indexOf(req.method.toLowerCase()))
        &&req.typeUser=="user")||
    ((route_user[req.originalUrl]!=null&&(route_user[req.originalUrl].indexOf("*")!=-1||route_user[req.originalUrl].indexOf(req.method.toLowerCase()))
      &&req.typeUser=="admin"))){
        let err={}
        err.res=new ErrorCustome("you do noth have permission","Check Permission",500);
        next(err);
        return;
    }
    console.log("hyyyyfrrrr")
    next();
}
