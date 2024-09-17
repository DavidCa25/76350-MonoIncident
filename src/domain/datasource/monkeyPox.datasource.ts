import { monkeyPoxModel } from "../../data/models/monkeyPox.models"
import { monkeyPoxIncident, monkeyPoxDocument } from "../entities/monkeyPox.entity"

export class MonkeyPoxDataSource{
    public updateIncident = async(id: String, monkeyPox:Partial<monkeyPoxDocument>)=>{
        await monkeyPoxModel.findByIdAndUpdate(id,{
            nombrePaciente: monkeyPox.nombrePaciente,
            age: monkeyPox.age,
            genre: monkeyPox.genre,
            lat: monkeyPox.lat,
            long: monkeyPox.long,
            isSent: monkeyPox.isSent,
            fechaCreacion: monkeyPox.fechaCreacion,
        })
    }
}