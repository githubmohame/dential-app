class WorkDaysRepo{
    constructor(next,workDays,){
        this.next=next;
        this.workDays=workDays;
    }
   async addWorkDay(adminId,startHour,startMinute,endHour ,endMinute,day){
        let workDays=new this.workDays({start:{hour:startHour,minute:startMinute},
            end:{hour:endHour,minute:endMinute},day:day});
            let err= workDays.validateSync();
            if(err!=null){
             let message=getErrorSchema(err);
             let err1=new Error( );
             err1.res=new ErrorCustome(message,"admin",400)
             this.next(err1);
             return;
            }
            workDays.save();
        return {error:0,"res":"the time add"}
    }
    async getWorkDay(adminId,){
        let records=await this.workDays.find({admin:adminId});
        return records;
    }
    async deleteWorkDay(workDaysId){
        let records=await this.workDays.delete({admin:adminId});
        return records;
    }
    async updateWorkDay(workDaysId,map){
        let records=await this.workDays.update({admin:adminId},map);
        return records;
    }
}