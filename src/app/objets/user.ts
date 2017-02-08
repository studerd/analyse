export class User {
	id:number;
	login:string;
	email:string;
	prenom:string;
	nom:string;
	avatar:string;
	sessionvalid:Date;
	accesstype:string;

	constructor(){
	}
	public Set(data){
		this.id = data.id;
		this.login = data.login;
		this.email = data.email;
		this.prenom = data.prenom;
		this.nom = data.nom;
		this.avatar = (data.avatar == null)? "default.jpg": data.avatar;
		this.sessionvalid = new Date(data.sessionvalid*1000);
		this.accesstype = data.accesstype;
		this.GetTime(data.sessionvalid);
	}
	public Get(){
		return {id:this.id,login:this.login,email:this.email,prenom:this.prenom,nom:this.nom,avatar: this.avatar,sessionvalid:this.sessionvalid,accesstype:this.accesstype};
	}

	protected GetTime(date){
		let temp = new Date(date*1000);
		let now = new Date();

	}
}