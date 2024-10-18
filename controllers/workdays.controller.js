class WorkDaysController{
    constructor(workDaysRepos,workDays,next){
        this.workDaysRepos = workDaysRepos;
        this.next = next;
        this.workDays=workDays;
    }
    async addWorkDays(adminId,startHour, startMinute,endHour,endMinute,day){
        this.workDaysRepos(this.next,this.workDays).addWorkDay(adminId,startHour,
            startMinute,
            endHour ,
            endMinute,
            day);
    }
   async getWorkDays(workDaysId){
        this.workDaysRepos(this.next,this.workDays).getWorkDay(workDaysId,);
    }
    async deleteWorkDays(workDaysId){
        this.workDaysRepos(this.next,this.workDays).deleteWorkDay(workDaysId)
    }
}
// workDaysRepos(next,workDays).getWorkDay(req.header["id"],);