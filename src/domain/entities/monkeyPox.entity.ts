export interface monkeyPoxIncident{
    nombrePaciente: string;
    age: number;
    genre: string;
    lat: number;
    long: number;
    isSent: boolean;
    fechaCreacion: Date;
}

export interface monkeyPoxDocument extends Document, monkeyPoxIncident{
    
}