export interface ConsultationTextModel{
    id?:string;
    idPatient?: string;
    clinicname?: string;
    date?: string;
    patientType?: string; //can be Admitted or In-Patient
    type?:string; //can be text, prescription, clearance
    text?: string;
}