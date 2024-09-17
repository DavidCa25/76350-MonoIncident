import { Response, Request } from "express"
import { monkeyPoxModel } from "../../data/models/monkeyPox.models";


export class MonkeyPoxController{
    public getMonkeyPoxCases = async(req:Request, res: Response) =>{
        try {
            const cases = await monkeyPoxModel.find();
            return res.json(cases);
        }catch(error){
            console.log(error)
        }
    }

    public createCase = async(req:Request, res:Response) => {
        try {
            const {
                nombrePaciente,
                genre,
                age,
                lat,
                long,
                fechaCreacion
            } = req.body;
            const newCase = await monkeyPoxModel.create({
                nombrePaciente,
                genre,
                age,
                lat,
                long,
                fechaCreacion
            })
            return res.json(newCase)
        }catch(error){
            console.log(error)
        }
    }
    public updateCases = async (req:Request, res: Response)=>{
        const { id } = req.params;
        const { 
            nombrePaciente,
            genre,
            age,
            lat,
            long } = req.body
            
        try{
            const caseUpdate = await monkeyPoxModel.findByIdAndUpdate(id, {
                nombrePaciente,
                genre,
                age,
                lat,
                long,
            })
            return res.json(caseUpdate);
        }catch(error){
            console.log(error)
        }
    }

    public deleteCase = async (req: Request, res: Response) =>{
        const {id} = req.params;
        try{
            await monkeyPoxModel.findByIdAndDelete(id);
            res.json({message: "Registro borrado"})
        }catch(error){
            console.log(error)
        }
    }
    public getLast7DaysCases = async (req: Request, res: Response) => {
        try {
            const today = new Date();
            const last7Days = new Date(today);
            last7Days.setDate(today.getDate() - 7);
            const recentCases = await monkeyPoxModel.find({
                fechaCreacion: { $gte: last7Days, $lte: today }
            });

            return res.json(recentCases);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al obtener los casos' });
        }
    }
}