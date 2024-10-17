class UserController{
   constructor(next,userRepos,user){
      this.next = next;
      this.userRepos = userRepos;
      this.user = user;
   }
   getUser(email){
      new this.userRepos(this.user,this.next).getUserByEmail(email);
   }
    createUser(email,password,name ,phone){

     try{
       new this.userRepos(this.user,this.next).addUser(email,password,name ,phone);
       res.send({"msg":"user add"})
     }
     catch(e){
   }
    }
    deleteUser(email){
      new this.userRepos(this.user,this.next).deleteUser(email);;
    }
    updateUser(email,req){
      new this.userRepos(this.user,this.next). updateUser(email,req.body);
    }

}
export default UserController;