import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Horoscopo } from "../../Interfaces/Horoscopo.tsx";
import * as React from 'react';
import { Error } from "../Error/Error.tsx"
import { HoroscopoList } from "../HoroscopoList/HoroscopoList.tsx";
import { HoroscopoContext } from "../../context/HoroscopoContextProvider.tsx";
import { useHoroscopoData } from '../../Hooks/useHoroscopoData.tsx'
import reactLogo from '../../assets/react.svg'
import "./HoroscopoListContainer.css";

export const HoroscopoListContainer = () => {
    const { errorApi, valueOrderBy, categorySelected, getDataHoroscopoByApi, setSearchHoroscopo, searchHoroscopo, dataHoroscopo, setDataHoroscopo, isLoading, setIsLoading, dataBySearch, setDataBySearch, } = useContext(HoroscopoContext) 
    ||  {errorApi:null, valueOrderBy:"today", categorySelected:"", getDataHoroscopoByApi:() => [], setSearchHoroscopo: () => {}, searchHoroscopo:"", dataHoroscopo:[], setDataHoroscopo: () => [], isLoading:true, setIsLoading: () => {}, dataBySearch:[], setDataBySearch: () => []} 
    // traigo 3 funciones de mi custom hook = useHoroscopoData
    const { searchbarHoroscopo, moveTodayToFirst, ordenSetting } = useHoroscopoData();
    const navigateTo = useNavigate();

    async function initHoroscopo() {
        
        const data = await getDataHoroscopoByApi()
        if (errorApi === null) {
            const horoscopoInOrden = moveTodayToFirst(data);
            setDataHoroscopo(horoscopoInOrden);
            setDataBySearch(horoscopoInOrden);
        }
        // simula un tiempo de espera mayor de lo que tarda la api con un loading
        // una vez terminado el loading muestro la data traida por API del horoscopo filtrada o no por la busqueda en el SearchBar y ordenada tambien dentro del Navbar
        setTimeout(() => {
            setIsLoading(false)
        }, 1600);
     
    }

    // se inicia la pagina trayendo la pagina
    useEffect(() => {
        initHoroscopo();
        setSearchHoroscopo("") ;
        (categorySelected !== "") ? navigateTo(`/category/${categorySelected}`) : navigateTo("/");
    }, [categorySelected, errorApi]);


    // cuando cambian parametros de busqueda se ejecuta los filtros
    useEffect(() => {
        ordenSetting();
        searchbarHoroscopo(searchHoroscopo);
    }, [valueOrderBy, searchHoroscopo]);


    // primero manejo pantallas de errores  
    return (
        <div className="d-flex flex-wrap justify-content-center min-vh-100">

            {errorApi !== null ? (
                <Error id={1} code={errorApi} />
            ) : (
                <>
                    {isLoading ? (
                        <div style={{ margin: "20%" }} className="d-flex align-items-center justify-content-center w-100">
                            <img src={reactLogo} className="logo react spin" alt="React logo" /><h2>Cargando el Horóscopo...</h2>
                        </div>
                    ) : (<>
                        {(dataBySearch.length === 0 && errorApi == null) ? (
                            <Error id={1} title="No hay resultados" subtitle="Por favor intente corroborando su búsqueda" />
                        ) : (
                            (searchHoroscopo !== "") ? (
                                <HoroscopoList   dataHoroscopo={dataBySearch} />
                            ) : (
                                <HoroscopoList   dataHoroscopo={dataHoroscopo} />
                            )
                        )}
                    </>
                    )}
                </>
            )}
        </div>
    );
}
export default HoroscopoListContainer; 
