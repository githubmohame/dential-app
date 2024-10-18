import { Router } from "express";

function WorkDaysFunc(workDays,workDaysRepos,WorkDaysController){
    const route=Router();
    route.get("",async (req,res,next)=>{
        WorkDaysController(workDaysRepos,next,workDays).getWorkDay(req.header["id"],);
    });
    route.post("/",async (req,res,next)=>{
        WorkDaysController(workDaysRepos,next,workDays).addWorkDay(adminId,req.body.startHour,
            req.body.startMinute,
            req.body.endHour ,
            req.body.endMinute,
            req.body.day);
    });
    route.delete("/",async (req,res,next)=>{
        WorkDaysController(workDaysRepos,next,workDays).deleteWorkDay(req.headers.workDaysId);
    });
    route.update("/",async(req,res,next)=>{
        WorkDaysController(workDaysRepos,next,workDays).updateWorkDay(req.headersworkDaysId,map);
    });
}