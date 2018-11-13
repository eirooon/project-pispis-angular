export interface Menstrual {
	id?:string;
	menarche?:number;
	avgduration?:number;
	interval?:string;
	dysmenorrhea?:string;
	cycleduration?:number;
	avgnapkins?:number;
	lastperiodfrom?: Date;
	lastperiodto?: Date;
	prevperiodfrom?: Date;
	prevperiodto?: Date;
	agemenopause?: number;
	patientId?:string;
}