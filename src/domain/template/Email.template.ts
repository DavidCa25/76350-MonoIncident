import { envs } from "../../config/envs";

    export function generateIncidentEmailTemplate(nombrePaciente: string, age: number, genre:string, lat: number,long: number): string {
        const mapImageUrl = generateMapboxStaticImageURL(lat, long)
        return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Detalles del Caso de Viruela del Mono</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #EE82EE;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                    border-bottom: 5px solid #0056b3;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .content {
                    padding: 25px;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #444;
                }
                .content p {
                    margin: 12px 0;
                }
                .content img {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-top: 20px;
                }
                .cta-button {
                    display: inline-block;
                    padding: 12px 20px;
                    margin-top: 20px;
                    background-color: #EE82EE;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 16px;
                    text-align: center;
                    transition: background-color 0.3s ease;
                }
                .cta-button:hover {
                    background-color: #0056b3;
                }
                .footer {
                    background-color: #f0f0f0;
                    color: #888;
                    padding: 15px;
                    text-align: center;
                    font-size: 12px;
                    border-top: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Detalles del Caso de Viruela del Mono</h1>
                </div>
                <div class="content">
                    <p><strong>Nombre del Paciente:</strong> ${nombrePaciente}</p>
                    <p><strong>Género del Paciente:</strong> ${genre}</p>
                    <p><strong>Edad del Paciente:</strong> ${age} años</p>
                    <p><strong>Ubicación:</strong> Latitud ${lat}, Longitud ${long}</p>
                    <img src="${mapImageUrl}" alt="Mapa de la ubicación del paciente" />
                    
                    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${long}" class="cta-button" target="_blank">
                        Ver en Google Maps
                    </a>
                </div>
                <div class="footer">
                    <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

export const generateMapboxStaticImageURL = (lat:number, lng: number):string =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 13;
    const width = 800;
    const height = 500;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}