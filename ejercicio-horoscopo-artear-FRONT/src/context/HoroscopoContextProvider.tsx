import { createContext, useState } from "react";
import { Horoscopo } from "../Interfaces/Horoscopo.tsx";
import * as React from 'react';

 



export const HoroscopoContext = createContext<HoroscopoContextType | null>(null);
// export const HoroscopoContext = createContext({});


interface HoroscopoContextType {
  valueViewBy: string ;
  setValueViewBy: React.Dispatch<React.SetStateAction<string >>;
  valueOrderBy: string | null;
  setValueOrderBy: React.Dispatch<React.SetStateAction<string | null>>;
  searchHoroscopo : string;
  setSearchHoroscopo: React.Dispatch<React.SetStateAction<string>>;
  dataHoroscopo : Horoscopo[];
  setDataHoroscopo: React.Dispatch<React.SetStateAction<Horoscopo[]>>;
  thisHoroscopo: Horoscopo | null;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dataBySearch: Horoscopo[];
  setDataBySearch: React.Dispatch<React.SetStateAction<Horoscopo[]>>; 
  categorySelected : string;
  setCategorySelected: React.Dispatch<React.SetStateAction<string>>;
  errorApi: number | null; 
  errorApi1: number | null; 
  getDataById: (id: String) => Promise<void>;
  getDataHoroscopoByApi: () => Promise<Horoscopo[]>;
 
}

export const HoroscopoContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [valueViewBy, setValueViewBy] = useState<string >("grilla");
  const [valueOrderBy, setValueOrderBy] = useState<string | null>("today");
  const [searchHoroscopo, setSearchHoroscopo] = useState<string>("");
  const [dataHoroscopo, setDataHoroscopo] = useState<Horoscopo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataBySearch, setDataBySearch] = useState<Horoscopo[]>([]);
  const [thisHoroscopo, setThisHoroscopo] = useState<Horoscopo | null>(null);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [errorApi, setErrorApi] = useState<number | null>(null);
  const [errorApi1, setErrorApi1] = useState<number | null>(null);



  // traigo la data del API
  async function getDataHoroscopoByApi() {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA}`, {
        headers: {
          'Authorization': 'qazwsx'
        }
      });
      // manejo de errores de respuesta 
      if (!response.ok) { 
        setErrorApi(response.status)
        if (response.status === 401) {
          console.error(`Error ${response.status} \n Error de Unauthorized en la ruta ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando su credenciales `);
          throw new Error(`HTTP error! Status: ${response.status}`);
        } if (response.status > 399 && response.status < 500 && response.status !== 401) {
          console.error(`Error ${response.status} \n Error en la ruta ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando sus datos `);
          throw new Error(`HTTP error! Status: ${response.status}`);
        } if (response.status >= 500) {
          console.error(`Error ${response.status} desde Cliente ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando la informacion`);
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
      // atrapo el error en el fetch
    } catch (error) {
      errorApi == null ? setErrorApi(0) : "";
      throw error;
    }
  }




  // traigo por id conseguido por useParams de la api : el objeto indicado y lo cargo en setThisHoroscopo
  async function getDataById(id:String) {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA}/${id}`, {
        headers: {
          'Authorization': 'qazwsx'
        }
      });
      // manejo de errores de respuesta
      if (!response.ok) {
        if (response.status === 401) {
          console.error(`Error ${response.status} \n Error de Unauthorized en la ruta ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando su credenciales `);
          setErrorApi1(response.status)
          throw new Error(`HTTP error! Status: ${response.status}`);
        } if (response.status > 399 && response.status < 500 && response.status !== 401) {
          console.error(`Error ${response.status} \n Error en la ruta ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando sus datos `);
          const status = response.status
          setErrorApi1(status)
          throw new Error(`HTTP error! Status: ${response.status}`);
        } if (response.status >= 500) {
          console.error(`Error ${response.status} desde Cliente ${import.meta.env.VITE_URL}/${import.meta.env.VITE_DATA} \n Por favor intente corroborando la informacion`);
          setErrorApi1(response.status)
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else
          throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setThisHoroscopo(await response.json())
      }
      // atrapo el error en el fetch
    } catch (error) {
      throw error;
    }
  }


  // Provengo a mi app desde el objeto objectValues que contiene todos los estados que voy a utilizar en varios componentes del aplicativo 
  return <HoroscopoContext.Provider value={{
    valueViewBy, 
    setValueViewBy,
    valueOrderBy,
    setValueOrderBy,
    setSearchHoroscopo,
    searchHoroscopo,
    setDataHoroscopo,
    thisHoroscopo,
    dataHoroscopo,
    isLoading,
    setIsLoading,
    setDataBySearch,
    categorySelected,
    setCategorySelected,
    dataBySearch,
    errorApi,
    errorApi1,
    getDataById,
    getDataHoroscopoByApi
  }} >{children}</HoroscopoContext.Provider>;

};