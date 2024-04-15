

import { useParams, Link } from 'react-router-dom'
import * as React from 'react';
import { useEffect, useContext } from 'react';
import { Error } from '../Error/Error.tsx';
import { HoroscopoContext } from "../../context/HoroscopoContextProvider.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './DetailsHoroscopo.css'

// Si hubiera pasado los datos por parametros lo destructuraria asi :
//  export const DetailsHoroscopo = ({ id, name, prediction, , end_date, init_date, img, }) => {
export const DetailsHoroscopo = () => {
    // const horoscopoContext = useContext(HoroscopoContext);
    const { errorApi1, getDataById, thisHoroscopo } = useContext(HoroscopoContext) || { errorApi1: null, getDataById: () => {}, thisHoroscopo: {} };
        const { id } = useParams() 


        // por si modificamos el url, se ejecuta el api por id
    useEffect(() => { 
        (id !== undefined ) ?  getDataById(id) : "";
    }, [id, errorApi1])


    return (
        <>
            {errorApi1 !== null ?
                <>
                    <Error id={2} title={`Error  ${errorApi1}`} subtitle="Este item no existe" />
                </>
                :
                <>
                    <div className='card p-0 d-flex flex-row flex-wrap m-2 border-3 border-dark shadow-lg mb-5 bg-body  rounded justify-content-between text-black' >
                        <div className="card-body d-flex flex-row flex-wrap justify-content-center align-items-center" style={{ backgroundImage: `url(${import.meta.env.VITE_URL}/${thisHoroscopo?.image})`, backgroundSize: 'contain', backgroundPosition: 'center', width: "126%", height: "auto" }}>
                            <div className="col-md-8 d-flex align-items -center ">
                                <div className="card-body  d-flex flex-row flex-wrap justify-content-center align-items-center effecttext">
                                    <h2 className="card-title m-2">{thisHoroscopo?.name} </h2>
                                    <p className="card-text fs-4">{thisHoroscopo?.prediction}</p>
                                    <span className='fs-5'>{thisHoroscopo?.init_date} &nbsp; ~ &nbsp; {thisHoroscopo?.end_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center m-4'>
                        <Link className='btn-success text-black w-25 border bg-info  d-flex align-items-center justify-content-center m-4' to="/">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span style={{ marginLeft: "5%", fontSize: "24px" }}>Volver</span>
                        </Link>
                    </div>
                </>}
        </>
    );
};
