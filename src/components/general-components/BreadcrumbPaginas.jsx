import React from 'react'
import { Breadcrumb } from 'react-bootstrap';
import '../../styles/componentes-generales/breadcrumbPaginas.css';

export default function BreadcrumbPaginas({nombre}) {
    var datos = [];
    const paginacion=[
        {   id: 1,
            paginas: ['Inicio', 'Gestion de Usuarios'],
            referencias:['/menuprincipal'] 
        },
        {   id: 2,
            paginas: ['Inicio', 'Gestion de Reservas'],
            referencias: ['/menuprincipal', '/menuprincipal']
        },
        {   id: 3,
            paginas: ['Inicio', 'Gestion de Reservas', 'Selección habitación'],
            referencias: ['/menuprincipal', '/reservas']
        },
        {   id: 4,
            paginas: ['Inicio', 'Gestion de Reservas', 'Selección habitación', 'Datos Personales'],
            referencias: ['/menuprincipal', '/reservas', '/consultaHabitaciones']
        },
        {
            id: 5,
            paginas: ['Inicio', 'Gestion de Reservas', 'Información de reserva'],
            referencias: ['/menuprincipal', '/reservas']
        }
    ]

    const validacionDatos = () => {
        if(nombre==='usuarios'){
            const usuarios={
                pag1: paginacion[0]['paginas'][0],
                pag2: paginacion[0]['paginas'][1],
                ref1: paginacion[0]['referencias'][0]
            }
            console.log('usuarios', usuarios);
            return usuarios;
        }else if (nombre==='reservas'){
            const reservas={
                pag1: paginacion[1]['paginas'][0],
                pag2: paginacion[1]['paginas'][1],
                ref1: paginacion[1]['referencias'][0]
            }
            console.log(reservas);
            return reservas;
        }else if (nombre==='seleccion habitacion'){
            const seleccion_habitacion={
                pag1: paginacion[2]['paginas'][0],
                pag2: paginacion[2]['paginas'][1],
                pag3: paginacion[2]['paginas'][2],
                ref1: paginacion[2]['referencias'][0],
                ref2: paginacion[2]['referencias'][1]
            }
            console.log(seleccion_habitacion);
            return seleccion_habitacion;
        }else if (nombre==='datos personales'){
            const datos_personales={
                pag1: paginacion[3]['paginas'][0],
                pag2: paginacion[3]['paginas'][1],
                pag3: paginacion[3]['paginas'][2],
                pag4: paginacion[3]['paginas'][3],
                ref1: paginacion[3]['referencias'][0],
                ref2: paginacion[3]['referencias'][1],
                ref3: paginacion[3]['referencias'][2]
            }
            console.log(datos_personales);
            return datos_personales;
        }else if (nombre==='informacion reserva'){
            const informacion_reserva={
                pag1: paginacion[4]['paginas'][0],
                pag2: paginacion[4]['paginas'][1],
                pag3: paginacion[4]['paginas'][2],
                ref1: paginacion[4]['referencias'][0],
                ref2: paginacion[4]['referencias'][1]
            }
            console.log(informacion_reserva);
            return informacion_reserva;
        }
    }
    datos = validacionDatos();

    const renderizados = () => {
        if(Object.keys(datos).length===3){
            return(
                <div>
                    <Breadcrumb className='breadcrumb'>
                        <Breadcrumb.Item href={datos.ref1}>{datos.pag1}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{datos.pag2}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            )
        }else if(Object.keys(datos).length===5){
            return(
                <div>
                    <Breadcrumb className='breadcrumb'>
                        <Breadcrumb.Item href={datos.ref1}>{datos.pag1}</Breadcrumb.Item>
                        <Breadcrumb.Item href={datos.ref2}>{datos.pag2}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{datos.pag3}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            )
        }else if(Object.keys(datos).length===7){
            return(
                <div>
                    <Breadcrumb className='breadcrumb'>
                        <Breadcrumb.Item href={datos.ref1}>{datos.pag1}</Breadcrumb.Item>
                        <Breadcrumb.Item href={datos.ref2}>{datos.pag2}</Breadcrumb.Item>
                        <Breadcrumb.Item href={datos.ref3}>{datos.pag3}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{datos.pag4}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            )
        }
    }

  return (
    <div>
        {renderizados()}
    </div>
  )
}
