
import { useContext, useEffect, } from "react";
import * as React from 'react';
import { Searchbar } from '../Searchbar/Searchbar.tsx'
import { HoroscopoContext } from "../../context/HoroscopoContextProvider.tsx";
import './Navbar.css'

// en este caso el navbar se utiliza para que maneje la logica de la buqueda
export const Navbar = () => {
    const { setCategorySelected, categorySelected, valueViewBy, setValueViewBy, setValueOrderBy, setSearchHoroscopo } = useContext(HoroscopoContext) 
    || {setCategorySelected: () => {} , categorySelected:"", valueViewBy:"", setValueViewBy: () => {}, setValueOrderBy: () => {}, setSearchHoroscopo: () => {}} ;


    const handleSearch = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 8) {
            setSearchHoroscopo("") 
        }
        const searchText = event.currentTarget.value;
        setSearchHoroscopo(searchText)
    };

    const cleanSerch = () => {
        setSearchHoroscopo("")
        const inputElement = document.getElementById("inputSearch") as HTMLInputElement;
        inputElement!.value = "";
    }

    const ChangeView = () => {
        const newViewBy = valueViewBy === "lista" ? "grilla" : "lista";
        setValueViewBy(newViewBy)
        
        const inputElement = document.getElementById("selectView") as HTMLInputElement;
        inputElement!.value = newViewBy; 
    }


    const handleCheckbox = (e:React.KeyboardEvent<HTMLInputElement>) => {
        setValueOrderBy(e.currentTarget.value)
    };

    const handleCategory = (e:React.KeyboardEvent<HTMLInputElement>   ) => {
        setCategorySelected(e.currentTarget.value)      
    };

    useEffect(() => { 
        cleanSerch()
    }, [categorySelected])


    return (
        <Searchbar handleCheckbox={handleCheckbox} handleCategory={handleCategory} ChangeView={ChangeView} cleanSerch={cleanSerch} handleSearch={handleSearch} />
    )
};