import { useContext } from "react";
import { Horoscopo } from "../Interfaces/Horoscopo.tsx";
import { HoroscopoContext } from "../context/HoroscopoContextProvider.tsx";

// un hook con todas la logica de como se ordena la informacion (las funciones que va a usar el HoroscopoListContainer)
export const useHoroscopoData = () => {
    const { valueOrderBy, dataHoroscopo, setDataHoroscopo, setDataBySearch } = useContext(HoroscopoContext) 
    || {valueOrderBy:"today", dataHoroscopo:[], setDataHoroscopo: () => {}, setDataBySearch: () => {}} ;

    // funcion que se le pasa el valor de la busqueda en la searchbar y  lo filtro para encontrar los que tienen incluido en su nombre el valor de la busqueda 
    // (ej: "ta" => Tauro y Sagitario)
    // lo seteo en dataBySearch (resultados de los datos despues de filtrarlos)
    const searchbarHoroscopo = (searchHoroscopo: string) => {
        const filteredHoroscopos = dataHoroscopo?.filter((horoscopo:Horoscopo) =>
            horoscopo.name.toLowerCase().includes(searchHoroscopo.toLowerCase())
        );
        setDataBySearch(filteredHoroscopos)
    };


    // funcion que formatea  la fecha de hoy y tambien de init_date y end_date 
    // si la fecha de hoy esta dentro de los rangos la coloco primera
    const moveTodayToFirst = (data: Horoscopo[]) => {
        const today = new Date();
        const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // formateo las init_date y end_date, luego busco la fecha de hoy  que este entre estas dos fechas
        //  returna true, poniendo en 0 o numero positivo elindex (index encontrado)
        const todayHoroscopoIndex = data.findIndex((horoscopo:Horoscopo) => {
            // separo secciones del formato actual y luego formateo a tipo Date
            const init_dateSection = horoscopo.init_date.split('-').map((part:string) => parseInt(part, 10));
            const end_dateSection = horoscopo.end_date.split('-').map((part:string) => parseInt(part, 10));
            const initDate = new Date(today.getFullYear(), init_dateSection[1] - 1, init_dateSection[0]);
            const endDate = new Date(today.getFullYear(), end_dateSection[1] - 1, end_dateSection[0]);
            return formattedToday >= initDate && formattedToday <= endDate;
        });
        // Si se encontro la ubicacion de hoy (siempre cumple 1 y unica vez) se saca del dataHoroscopo y se ubica primero
        if (todayHoroscopoIndex !== -1) {
            const todayHoroscopo = data.splice(todayHoroscopoIndex, 1);
            data.unshift(todayHoroscopo[0]);
        }
        return data;
    };

    // funcion que ordena por fecha, alfabeticamente o por dia de hoy.
    const ordenSetting = () => {
        switch (valueOrderBy) {
            case 'today':
                setDataHoroscopo(moveTodayToFirst(dataHoroscopo))
                break;
            case 'fecha':
                const sortByDate = (a: Horoscopo, b:Horoscopo) => {
                    const dateA : Date = new Date(`${a.init_date.split('-').reverse().join('-')}`);
                    const dateB: Date = new Date(`${b.init_date.split('-').reverse().join('-')}`);
                    return dateA.getTime() - dateB.getTime();
                };
                const horoscopoOrderByDate = dataHoroscopo.slice().sort(sortByDate);
                setDataHoroscopo(horoscopoOrderByDate) 
                break;
            case 'alfabetico':
                const sortByNombre = (a: Horoscopo, b: Horoscopo) => {
                    const moteA = a.name.toUpperCase();
                    const moteB = b.name.toUpperCase();
                    return moteA < moteB ? -1 : moteA > moteB ? 1 : 0;
                };
                const horoscopoOrderByName = dataHoroscopo.slice().sort(sortByNombre);
                setDataHoroscopo(horoscopoOrderByName)
                break;
            default:
                break;
        }
    }


    return {
        searchbarHoroscopo,
        moveTodayToFirst,
        ordenSetting,
    };
};



