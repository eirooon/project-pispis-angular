export interface VitalsModel{
    id?:string;
    idPatient?: string;
    date?: string;
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
}