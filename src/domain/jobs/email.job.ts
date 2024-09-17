import cron from 'node-cron';
import { generateIncidentEmailTemplate } from '../template/Email.template';
import { MonkeyPoxDataSource } from '../datasource/monkeyPox.datasource';
import { monkeyPoxModel } from '../../data/models/monkeyPox.models';
import { EmailService } from '../service/Email.Service';

export const emailJob = () =>{
    const emailService = new EmailService();
    const incidentDataSource = new MonkeyPoxDataSource();
    cron.schedule('* * * * *', async ()=>{
        console.log("Cada 3 segundos")
        try{
            const monkeyIncidents = await monkeyPoxModel.find({isSent:false});
            if(!monkeyIncidents.length){
                console.log("No hay casos pendientes de enviar")
                return;
            }
            console.log(`Procesando ${monkeyIncidents.length} casos.`);
            await Promise.all(
                monkeyIncidents.map(async (monkeyIncident)=>{
                    const htmlBody = generateIncidentEmailTemplate(
                        monkeyIncident.nombrePaciente,
                        monkeyIncident.age,
                        monkeyIncident.genre,
                        monkeyIncident.lat,
                        monkeyIncident.long
                    )
                await emailService.sendEmail({
                    to: "jesusdavidcasillasrios@gmail.com",
                    subject: `Caso: ${monkeyIncident.nombrePaciente}`,
                    htmlBody: htmlBody
                });
                console.log(`Email enviado para el caso con ID: ${monkeyIncident._id}`)
                await incidentDataSource.updateIncident(monkeyIncident._id.toString(),{ ...monkeyIncident, isSent: true})
                console.log(`Caso actualizado para el ID: ${monkeyIncident._id}`);
            })
        );
        }catch(error){
            console.error("Error durante el trabajo de envio de correos");
        }
    })
}