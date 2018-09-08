export interface ConsultationTextModel{
    id?:string;
    idPatient?: string;
    clinicname?: string;
    date?: string;

    type?:string; //can be text, prescription, clearance
    text?: string;
}