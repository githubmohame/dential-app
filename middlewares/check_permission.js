import ErrorCustome from "../utilities/error.js"
const routes_admin=["/service"];
const route_user=[]
export default function CheckPermission(req, res, next) {
    if(!req.typeUser||(routes_admin.indexOf(req.baseUrl)!=-1&&req.typeUser=="user")||((route_user.indexOf(req.baseUrl)!=-1&&req.typeUser=="admin"))){
        let err={}
        err.res=new ErrorCustome("you do noth have permission","Check Permission",500);
        next(err);
        return;
    }
    console.log("hyyyyfrrrr")
    next();
}
