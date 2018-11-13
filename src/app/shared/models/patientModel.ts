export interface Patient {
	id?:string;
	idDoc?:string;
	firstname?:string;
	middlename?:string;
	lastname?:string;
	gender?:string;
	birthdate?:string;
	address?:string;
	occupation?:string;
	landline?:number;
	mobile?:number;
	email?:string;
	height?:string;
	weight?:string;
	bmi?:string;
	type?:string;
	emgy_firstname?:string;
	emgy_middlename?:string;
	emgy_lastname?:string;
	emgy_contact?:number;
	emgy_email?:string;
	dateAdded?: Date;
}