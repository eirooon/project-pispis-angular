export interface ConsultationTextModel{
    id?:string;
    idPatient?: string;
    clinicname?: string;
    date?: string;
    patientType?: string; //can be Admitted or In-Patient
    type?:string; //can be text, prescription, clearance
    text?: string;

    //vitals
    weight?: string;
    height?:string;
    bloodPressure?: string;
    oxygenSaturation?: string;
    respiratoryRate?: string;
    heartRate?: string;
    bodyTemperature?: string;
    headCircumference?: string;
    capillaryBloodGlucose?: string;

    //

}