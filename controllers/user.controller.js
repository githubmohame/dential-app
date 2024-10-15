class UserController{
   constructor(next,userRepos,user){
      this.next = next;
      this.userRepos = userRepos;
      this.user = user;
   }
    createUser(email,password,name ,phone){

     try{
       new this.userRepos(this.user,this.next).addUser(email,password,name ,phone);
     }
     catch(e){
     }
    }
}
export default UserController;