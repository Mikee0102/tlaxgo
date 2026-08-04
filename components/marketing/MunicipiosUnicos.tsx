'use client';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MunicipioDetalle {
  id: number;
  municipio: string;
  lugarUnico: string;
  feriaFecha: string;
  mejorEpoca: string;
  descripcion: string;
}

const los60Municipios: MunicipioDetalle[] = [
  { id: 1, municipio: 'Amaxac de Guerrero', lugarUnico: 'Capilla de la Villita y mascaritas de carnaval', feriaFecha: 'Último domingo de mayo', mejorEpoca: 'Mayo', descripcion: 'Cuna de tradicionales artesanos de la madera y danzantes de carnaval.' },
  { id: 2, municipio: 'Apetatitlán de Antonio Carvajal', lugarUnico: 'Ex-Fábrica de San Manuel y riberas del río Zahuapan', feriaFecha: '29 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Zona con hermosos paisajes de ribera e importante historia textil.' },
  { id: 3, municipio: 'Atlangatepec', lugarUnico: 'Laguna de Atlangatepec (Paseos en lancha y pesca)', feriaFecha: '24 de junio', mejorEpoca: 'Verano', descripcion: 'Cuerpo de agua ideal para el ecoturismo, paseos y degustación de mariscos locales.' },
  { id: 4, municipio: 'Atltzayanca', lugarUnico: 'Haciendas pulqueras y cañones naturales', feriaFecha: '25 de julio', mejorEpoca: 'Julio', descripcion: 'Famoso por su arraigada producción pulquera y paisajes montañosos.' },
  { id: 5, municipio: 'Apizaco', lugarUnico: 'Maquinaria de la Locomotora y Basílica de la Misericordia', feriaFecha: 'Del 1 al 15 de marzo', mejorEpoca: 'Marzo', descripcion: 'Ciudad rielera por excelencia, centro comercial e industrial del estado.' },
  { id: 6, municipio: 'Calpulalpan', lugarUnico: 'Zona Arqueológica de Tecoaque y Templo de San Antonio', feriaFecha: 'Del 5 al 13 de junio', mejorEpoca: 'Junio', descripcion: 'Importante paso histórico del Camino Real de Tierra Adentro y vestigios arqueológicos.' },
  { id: 7, municipio: 'El Carmen Tequexquitla', lugarUnico: 'Ex-Hacienda de Soltepec y llanos salineros', feriaFecha: '16 de julio', mejorEpoca: 'Julio', descripcion: 'Paisajes semiáridos e historia ligada a las antiguas rutas comerciales del oriente.' },
  { id: 8, municipio: 'Cuapiaxtla', lugarUnico: 'Parroquia de San Antonio y haciendas circundantes', feriaFecha: '13 de junio', mejorEpoca: 'Junio', descripcion: 'Zona de planicies y tradición agrícola al oriente del territorio estatal.' },
  { id: 9, municipio: 'Cuaxomulco', lugarUnico: 'Cerro del Tecajete y miradores naturales', feriaFecha: '24 de junio', mejorEpoca: 'Todo el año', descripcion: 'Destino predilecto para el senderismo con vistas panorámicas hacia los volcanes.' },
  { id: 10, municipio: 'Chiautempan', lugarUnico: 'Mercado de Artesanías de Lana y sarapes tradicionales', feriaFecha: 'Del 24 de julio al 2 de agosto', mejorEpoca: 'Julio - Agosto', descripcion: 'Famoso internacionalmente por sus textiles de lana, cobijas y pan de fiesta.' },
  { id: 11, municipio: 'Muñoz de Domingo Arenas', lugarUnico: 'Ex-Hacienda de San Ildefonso', feriaFecha: '23 de enero', mejorEpoca: 'Enero', descripcion: 'Riqueza arquitectónica en cascos de haciendas e historia agrícola regional.' },
  { id: 12, municipio: 'Españita', lugarUnico: 'Bosques y templos coloniales rurales', feriaFecha: '24 de junio', mejorEpoca: 'Junio', descripcion: 'Rodeado de áreas naturales y campos de cultivo tradicionales de temporal.' },
  { id: 13, municipio: 'Huamantla', lugarUnico: 'Museo Nacional del Títere y La Noche que Nadie Duerme', feriaFecha: 'Del 31 de julio al 31 de agosto', mejorEpoca: 'Agosto', descripcion: 'Pueblo Mágico mundialmente reconocido por sus alfombras de aserrín y la Huamantlada.' },
  { id: 14, municipio: 'Hueyotlipan', lugarUnico: 'Acueducto colonial y ruinas históricas', feriaFecha: '19 de marzo', mejorEpoca: 'Marzo', descripcion: 'Destaca por su patrimonio virreinal y vestigios arquitectónicos antiguos.' },
  { id: 15, municipio: 'Ixtacuixtla de Mariano Matamoros', lugarUnico: 'Templo de San Felipe y haciendas pulqueras', feriaFecha: '5 de febrero', mejorEpoca: 'Febrero', descripcion: 'Fuerte tradición pulquera e historia ligada al movimiento independentista.' },
  { id: 16, municipio: 'Ixtenco', lugarUnico: 'Museo Comunitario del Maíz y Cuadros de Semillas', feriaFecha: 'Del 12 al 25 de junio', mejorEpoca: 'Junio', descripcion: 'Último bastión cultural otomí con gran variedad de maíces nativos de colores.' },
  { id: 17, municipio: 'Mazatecochco de José María Morelos', lugarUnico: 'Talleres de pan tradicional y bordados', feriaFecha: '28 de octubre', mejorEpoca: 'Octubre', descripcion: 'Comunidad caracterizada por su labor panadera artesanal y comercio.' },
  { id: 18, municipio: 'Contla de Juan Cuamatzi', lugarUnico: 'Centro Artesanal del Sarape y Confección Textil', feriaFecha: 'Del 20 al 28 de mayo', mejorEpoca: 'Mayo', descripcion: 'Reconocido corazón de tejedores y artesanos textiles de valor mundial.' },
  { id: 19, municipio: 'Tepetitla de Lardizábal', lugarUnico: 'Parroquia de San Mateo y zonas ribereñas', feriaFecha: '21 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Zona de rica actividad agrícola e histórica al poniente del estado.' },
  { id: 20, municipio: 'Sanctórum de Lázaro Cárdenas', lugarUnico: 'Santuarios boscosos y zonas de cultivo de aguamiel', feriaFecha: 'Última semana de junio', mejorEpoca: 'Junio - Julio', descripcion: 'Paisajes agrícolas de altura y cercanía con la ruta de luciérnagas.' },
  { id: 21, municipio: 'Nanacamilpa de Mariano Arista', lugarUnico: 'Santuario de las Luciérnagas (Bosques de Ciénega)', feriaFecha: 'Marzo', mejorEpoca: 'Junio a Agosto', descripcion: 'Puntos boscosos que se transforman en un espectáculo natural único en verano.' },
  { id: 22, municipio: 'Acuamanala de Miguel Hidalgo', lugarUnico: 'Templo de San Andrés y tradiciones comunitarias', feriaFecha: '30 de noviembre', mejorEpoca: 'Noviembre', descripcion: 'Destaca por su arraigada cultura textil y festividades patronales de barrio.' },
  { id: 23, municipio: 'Natívitas', lugarUnico: 'Zona Arqueológica de Cacaxtla y Xochitécatl', feriaFecha: '15 de mayo', mejorEpoca: 'Primavera', descripcion: 'Impresionantes basamentos piramidales con murales originales de culturas prehispánicas.' },
  { id: 24, municipio: 'Panotla', lugarUnico: 'Puente de Piedra colonial y riberas', feriaFecha: '4 de octubre', mejorEpoca: 'Octubre', descripcion: 'Punto estratégico histórico cercano a la capital con bellas postales fluviales.' },
  { id: 25, municipio: 'San Pablo del Monte', lugarUnico: 'Barrio de artesanos de talavera e iglesias virreinales', feriaFecha: '29 de junio', mejorEpoca: 'Junio', descripcion: 'Famoso por sus talleres certificados de talavera y su cercanía con la Malinche.' },
  { id: 26, municipio: 'Santa Cruz Tlaxcala', lugarUnico: 'Templo Franciscano de la Santa Cruz y riberas', feriaFecha: '3 de mayo', mejorEpoca: 'Mayo', descripcion: 'Herencia franciscana y hermosos paisajes arbolados a lo largo del río.' },
  { id: 27, municipio: 'Tenancingo', lugarUnico: 'Parroquia de San Miguel y talleres de camotinga', feriaFecha: '29 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Tradición comercial y gastronómica en la región sur del estado.' },
  { id: 28, municipio: 'Teolocholco', lugarUnico: 'Faldas de la Malinche y talleres de pan de fiesta', feriaFecha: '24 de agosto', mejorEpoca: 'Agosto', descripcion: 'Cuna de panaderos tradicionales y rutas de ecoturismo de montaña.' },
  { id: 29, municipio: 'Tepeyanco', lugarUnico: 'Ex-Convento de San Francisco y Capilla del Pocito', feriaFecha: '10 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Joyas arquitectónicas del siglo XVI con altares e historia franciscana.' },
  { id: 30, municipio: 'Terrenate', lugarUnico: 'Ex-Hacienda de La Soledad y bosques de montaña', feriaFecha: '15 de agosto', mejorEpoca: 'Agosto', descripcion: 'Enormes cascos de haciendas pulqueras rodeados de frondosos bosques.' },
  { id: 31, municipio: 'Tetla de la Solidaridad', lugarUnico: 'Ex-Hacienda de Tepalcayuca y zona industrial', feriaFecha: '25 de julio', mejorEpoca: 'Julio', descripcion: 'Fusión de historia hacendaria, modernidad industrial y tradición ganadera.' },
  { id: 32, municipio: 'Tetlatlahuca', lugarUnico: 'Templo de Santa Ana y capillas históricas', feriaFecha: '26 de julio', mejorEpoca: 'Julio', descripcion: 'Tranquilo municipio de profundas raíces agrícolas y festividades religiosas.' },
  { id: 33, municipio: 'Tlaxcala', lugarUnico: 'El Barco de Fe (Templo de San José) y Murales de Palacio', feriaFecha: 'Del 24 de octubre al 19 de noviembre', mejorEpoca: 'Octubre - Noviembre', descripcion: 'Capital del estado que resguarda joyas virreinales únicas y la Feria de Ferias.' },
  { id: 34, municipio: 'Tlaxco', lugarUnico: 'Pinturas rupestres de La Gloria y quesos artesanales', feriaFecha: 'Del 26 de agosto al 4 de septiembre', mejorEpoca: 'Todo el año', descripcion: 'Pueblo Mágico montañoso con callejones pintorescos, madera tallada y pulque.' },
  { id: 35, municipio: 'Tocatlán', lugarUnico: 'Parroquia de la Santísima Trinidad', feriaFecha: 'Domingo de Santísima Trinidad (Mayo/Junio)', mejorEpoca: 'Mayo - Junio', descripcion: 'Comunidad tradicional dedicada a la agricultura y el comercio local.' },
  { id: 36, municipio: 'Totolac', lugarUnico: 'Puente de las Delicias y Cuna de la Nación Tlaxcalteca', feriaFecha: 'Día de la Ascensión (Movible)', mejorEpoca: 'Primavera', descripcion: 'Sitio histórico clave con arquitectura tradicional y producción de pan.' },
  { id: 37, municipio: 'Zitlaltepec de Trinidad Sánchez Santos', lugarUnico: 'Ascenso a la Malinche por la cara oriente y bosques', feriaFecha: '1 de noviembre', mejorEpoca: 'Noviembre', descripcion: 'Impresionantes vistas hacia el pico de la montaña y el altiplano.' },
  { id: 38, municipio: 'Tzompantepec', lugarUnico: 'Capillas históricas y miradores del valle', feriaFecha: '8 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Ubicado en una zona alta con vistas panorámicas hacia Apizaco y la región centro.' },
  { id: 39, municipio: 'Xaloztoc', lugarUnico: 'Ex-Haciendas y tradiciones de carnaval', feriaFecha: '25 de julio', mejorEpoca: 'Julio', descripcion: 'Zona agrícola con cuadrillas de huehues y ferias patronales muy vistosas.' },
  { id: 40, municipio: 'Xaltocan', lugarUnico: 'Templo de San Francisco y paisajes de llanura', feriaFecha: '4 de octubre', mejorEpoca: 'Octubre', descripcion: 'Tranquilo municipio con herencia prehispánica y arquitectura religiosa colonial.' },
  { id: 41, municipio: 'Papalotla de Xicohténcatl', lugarUnico: 'Parroquia de San Toribio y comparsas de huehues', feriaFecha: '16 de abril', mejorEpoca: 'Abril (Carnaval)', descripcion: 'Famoso por el colorido y elegancia de sus camadas de carnaval de plumas.' },
  { id: 42, municipio: 'Xicohtzinco', lugarUnico: 'Templo de San Bernardino de Siena', feriaFecha: '20 de mayo', mejorEpoca: 'Mayo', descripcion: 'Importante patrimonio arquitectónico franciscano en la zona sur metropolitana.' },
  { id: 43, municipio: 'Yauhquemehcan', lugarUnico: 'Zona arqueológica de Ocotelulco y tradiciones', feriaFecha: '8 de diciembre', mejorEpoca: 'Diciembre', descripcion: 'Cuna de importantes señoríos prehispánicos y ferias comerciales decembrinas.' },
  { id: 44, municipio: 'Zacatelco', lugarUnico: 'Parque Juárez y Cuna del tradicional Cacao (Bebida)', feriaFecha: '21 de enero', mejorEpoca: 'Enero', descripcion: 'Importante centro comercial del sur, famoso por su emblemática bebida de agua de cacao.' },
  { id: 45, municipio: 'Benito Juárez', lugarUnico: 'Zonas agrícolas de altura y tranquilidad rural', feriaFecha: '21 de marzo', mejorEpoca: 'Marzo', descripcion: 'Municipio caracterizado por su hospitalidad, campos abiertos y aire limpio.' },
  { id: 46, municipio: 'Emiliano Zapata', lugarUnico: 'Plaza de Toros Cristo Rey y campos del altiplano', feriaFecha: 'Noviembre (Feria en honor a Cristo Rey)', mejorEpoca: 'Noviembre', descripcion: 'Municipio con gran tradición agrícola, festividades de cierre de año y eventos taurinos.' },
  { id: 47, municipio: 'Lázaro Cárdenas', lugarUnico: 'Paisajes forestales de altura y lienzo charro San Isidro', feriaFecha: 'Febrero (Feria de la Virgen de Ocotlán)', mejorEpoca: 'Febrero', descripcion: 'Ubicado en las zonas boscosas altas del oriente, destaca por su tradicional corrida de feria a principios de año.' },
  { id: 48, municipio: 'La Magdalena Tlaltelulco', lugarUnico: 'Iglesia de Santa María Magdalena y bordados', feriaFecha: '22 de julio', mejorEpoca: 'Julio', descripcion: 'Tradición textil de alta escuela, danzas típicas y gastronomía local.' },
  { id: 49, municipio: 'San Damián Texoloc', lugarUnico: 'Ex-Convento y vestigios arqueológicos locales', feriaFecha: '27 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Rica historia comunitaria y festividades tradicionales llenas de color.' },
  { id: 50, municipio: 'San Francisco Tetlanohcan', lugarUnico: 'Rutas de acceso ecoturístico a la Malinche', feriaFecha: '4 de octubre', mejorEpoca: 'Octubre', descripcion: 'Punto de partida ideal para campamentos y caminatas hacia la montaña.' },
  { id: 51, municipio: 'San Jerónimo Zacualpan', lugarUnico: 'Ribera del río Atoyac y arquitectura tradicional', feriaFecha: '30 de septiembre', mejorEpoca: 'Septiembre', descripcion: 'Tranquila demarcación con gran arraigo en las labores agrícolas.' },
  { id: 52, municipio: 'San José Teacalco', lugarUnico: 'Bosques de la Malinche y refugios de montaña', feriaFecha: '19 de marzo', mejorEpoca: 'Marzo', descripcion: 'Paisajes boscosos ideales para el turismo de naturaleza y cabañas.' },
  { id: 53, municipio: 'San Juan Huactzinco', lugarUnico: 'Panaderías tradicionales de fiesta', feriaFecha: '24 de junio', mejorEpoca: 'Junio', descripcion: 'Pueblo de maestros panaderos reconocidos por elaborar el tradicional pan de feria.' },
  { id: 54, municipio: 'San Lorenzo Axocomanitla', lugarUnico: 'Capilla de San Lorenzo y talleres textiles', feriaFecha: '10 de agosto', mejorEpoca: 'Agosto', descripcion: 'Comunidad trabajadora de la rama textil y festividades patronales de barrio.' },
  { id: 55, municipio: 'San Lucas Tecopilco', lugarUnico: 'Templo de San Lucas y arquitectura colonial menor', feriaFecha: '18 de octubre', mejorEpoca: 'Octubre', descripcion: 'Sitio histórico apacible con tradiciones arraigadas de origen prehispánico.' },
  { id: 56, municipio: 'Santa Ana Nopalucan', lugarUnico: 'Artesanías de vara de sauce y cestería', feriaFecha: '26 de julio', mejorEpoca: 'Julio', descripcion: 'Famosos artesanos dedicados a la elaboración de muebles y figuras tejidas con vara.' },
  { id: 57, municipio: 'Santa Apolonia Teacalco', lugarUnico: 'Templo de Santa Apolonia y zonas de cultivo', feriaFecha: '9 de febrero', mejorEpoca: 'Febrero', descripcion: 'Tranquilidad rural y celebraciones comunitarias llenas de fervor religioso.' },
  { id: 58, municipio: 'Santa Catarina Ayometla', lugarUnico: 'Parroquia de Santa Catarina y talleres locales', feriaFecha: '25 de noviembre', mejorEpoca: 'Noviembre', descripcion: 'Comunidad dinámica con historia textil y comercial en el sur del estado.' },
  { id: 59, municipio: 'Santa Cruz Quilehtla', lugarUnico: 'Templo de la Santa Cruz y festividades', feriaFecha: '3 de mayo', mejorEpoca: 'Mayo', descripcion: 'Tradiciones religiosas muy vivas y cercanía con las principales vías del sur.' },
  { id: 60, municipio: 'Santa Isabel Xiloxoxtla', lugarUnico: 'Capilla de Santa Isabel y bordados tradicionales', feriaFecha: '8 de julio', mejorEpoca: 'Julio', descripcion: 'Pequeño municipio con gran riqueza cultural en textiles, bordados y gastronomía.' }
];

type Estacion = 'todas' | 'primavera' | 'verano' | 'otono' | 'invierno';

const estaciones: Array<{ id: Estacion; label: string; emoji: string }> = [
  { id: 'todas', label: 'Todos', emoji: '🌎' },
  { id: 'primavera', label: 'Primavera', emoji: '🌸' },
  { id: 'verano', label: 'Verano', emoji: '☀️' },
  { id: 'otono', label: 'Otoño', emoji: '🍂' },
  { id: 'invierno', label: 'Invierno', emoji: '❄️' },
];

const obtenerEstacion = (texto: string): Estacion => {
  const valor = texto.toLowerCase();

  if (valor.includes('todo el año') || valor.includes('todo')) {
    return 'todas';
  }

  if (
    valor.includes('primavera') ||
    valor.includes('marzo') ||
    valor.includes('abril') ||
    valor.includes('mayo')
  ) {
    return 'primavera';
  }

  if (
    valor.includes('verano') ||
    valor.includes('junio') ||
    valor.includes('julio') ||
    valor.includes('agosto')
  ) {
    return 'verano';
  }

  if (
    valor.includes('otoño') ||
    valor.includes('septiembre') ||
    valor.includes('octubre') ||
    valor.includes('noviembre')
  ) {
    return 'otono';
  }

  if (
    valor.includes('invierno') ||
    valor.includes('diciembre') ||
    valor.includes('enero') ||
    valor.includes('febrero')
  ) {
    return 'invierno';
  }

  return 'todas';
};

export default function MunicipiosUnicos() {
  const [busqueda, setBusqueda] = useState('');
  const [estacionSeleccionada, setEstacionSeleccionada] = useState<Estacion>('todas');

  const filtrados = los60Municipios.filter((m) => {
    const coincideBusqueda =
      m.municipio.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.lugarUnico.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.mejorEpoca.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstacion =
      estacionSeleccionada === 'todas' || obtenerEstacion(m.mejorEpoca) === estacionSeleccionada;

    return coincideBusqueda && coincideEstacion;
  });

  return (
    <section id="municipios" className="w-full bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-sky-400 font-semibold tracking-widest text-xs uppercase block mb-3">
            Directorio Oficial
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Directorio de <span className="text-sky-400">Municipios</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            Explora los municipios por estación del año y encuentra los destinos ideales para tu viaje.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {estaciones.map((estacion) => {
              const activo = estacionSeleccionada === estacion.id;
              return (
                <button
                  key={estacion.id}
                  type="button"
                  onClick={() => setEstacionSeleccionada(estacion.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    activo
                      ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-sky-500/50 hover:text-white'
                  }`}
                >
                  {estacion.emoji} {estacion.label}
                </button>
              );
            })}
          </div>

          <input 
            type="text"
            placeholder="Busca por municipio, lugar único o feria (ej. Apizaco, Huamantla, Tlaxcala)..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-xl px-6 py-4 rounded-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition shadow-xl text-sm"
          />
        </div>

        <div className="mb-8 text-center">
          <p className="text-sm text-slate-400">
            Mostrando <span className="text-sky-400 font-semibold">{filtrados.length}</span>{' '}
            municipios{' '}
            {estacionSeleccionada === 'todas' ? 'en total' : `en ${estaciones.find((e) => e.id === estacionSeleccionada)?.label.toLowerCase()}`}
          </p>
        </div>

        {filtrados.length > 0 ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700/70">
              <div className="flex justify-center gap-4 md:gap-6 min-w-max px-2">
              {filtrados.map((item) => (
                <div 
                  key={item.id}
                  className="group w-70 sm:w-75 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800/90 backdrop-blur-md rounded-3xl p-5 border border-slate-800/80 flex flex-col justify-between hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_20px_45px_rgba(2,8,23,0.35)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-sky-400 uppercase tracking-[0.24em]">
                        Municipio #{item.id}
                      </span>
                      <span className="bg-slate-950/80 text-sky-300 border border-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
                        ⭐ {item.mejorEpoca}
                      </span>
                    </div>

                    <div className="h-24 flex items-start">
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                        {item.municipio}
                      </h3>
                    </div>

                    <div className="my-4 rounded-2xl border border-sky-900/40 bg-sky-950/30 p-3">
                      <p className="text-[11px] text-sky-200 font-medium leading-relaxed">
                        📍 <span className="text-sky-300">Lugar Único:</span> {item.lugarUnico}
                      </p>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">
                      {item.descripcion}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/80 pt-4 mt-2">
                    <div className="flex items-center justify-between text-[12px] text-slate-300 gap-2">
                      <span className="font-semibold text-slate-400">📅 Feria Patronal</span>
                      <span className="text-sky-300 font-bold text-right">{item.feriaFecha}</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.municipio}, Tlaxcala`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[12px] font-semibold text-sky-300 transition hover:bg-sky-500/20 hover:text-white"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Ver en mapa
                    </a>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-3xl max-w-md mx-auto">
            <p className="text-slate-400 text-sm">No se encontraron municipios con ese criterio de búsqueda o temporada.</p>
          </div>
        )}
      </div>
    </section>
  );
}