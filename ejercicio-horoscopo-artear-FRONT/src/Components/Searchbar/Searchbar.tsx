import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react';
import { faMagnifyingGlass, faTableCellsLarge, faList, } from '@fortawesome/free-solid-svg-icons'
import { useContext } from "react";
import { HoroscopoContext } from "../../context/HoroscopoContextProvider.tsx";
import './Searchbar.css'

// en este caso el componente searchbar es quien muestra las opciones de la busqueda
export const Searchbar = ({ handleCheckbox, handleCategory, ChangeView, cleanSerch, handleSearch }:{ handleCheckbox:Function, handleCategory:Function, ChangeView:Function, cleanSerch: (e: React.MouseEvent) => void, handleSearch:Function, }) => { 
    const { valueViewBy, setValueViewBy, valueOrderBy } = useContext(HoroscopoContext) || { valueViewBy: '', setValueViewBy: () => {}, valueOrderBy: '' };

     

    return (
    <div className="bg-info d-flex flex-row flex-wrap justify-content-evenly">
        {window.innerWidth < 499 ? <>
            <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                <h6  style={{ width: '12em', fontSize: "1.1em"  }} >Ver como</h6>
                <select value={valueViewBy} className="form-select 6" onChange={(e) => setValueViewBy(e.target.value)}>
                    <option value="grilla" >Grilla</option>
                    <option value="lista">Lista</option>
                </select>
                {(valueViewBy === "grilla") ? <div data-value="grilla" className="btnbtn" onClick={(e) => ChangeView(e)}><FontAwesomeIcon className="m-2 fa-2x" icon={faTableCellsLarge} /></div> : (valueViewBy === "lista") ? <div className="btnbtn" data-value="lista" onClick={(e) => ChangeView(e)}><FontAwesomeIcon className="m-4  fa-2x" icon={faList} /></div> : ""}
            </div>
        </> : <>
            <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center">
                <h6  className="m-1" style={{ width: '12em' , fontSize: "1.1em" }} >Ver como</h6>
                <select id="selectView" className="form-select fs-6 m-1" onChange={(e) => setValueViewBy(e.target.value)}>
                    <option value="grilla" >Grilla</option>
                    <option value="lista">Lista</option>
                </select>
                {(valueViewBy === "grilla") ? <div data-value="grilla" className="btnbtn" onClick={(e) => ChangeView(e)}><FontAwesomeIcon className="m-2 fa-2x " icon={faTableCellsLarge} /></div> : (valueViewBy === "lista") ? <div className="btnbtn" data-value="lista" onClick={(e) => ChangeView(e)}><FontAwesomeIcon className="m-4 fa-2x" icon={faList} /></div> : ""}
            </div>
        </>}

        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center ">
            <h6 style={{ width: 'auto', margin: '1em', fontSize: "1.1em" }}>Orden</h6>
            <input
                type="checkbox"
                value="today"
                className="form-check m-2"
                style={{ width: '1.5em', height: '1.5em' }}
                checked={valueOrderBy === 'today'}
                onChange={(e) => handleCheckbox(e)}
            />
            <h6 className="form-check-label m-1">Defaul</h6>
            <input
                type="checkbox"
                value="alfabetico"
                className="form-check m-2"
                style={{ width: '1.5em', height: '1.5em' }}
                checked={valueOrderBy === 'alfabetico'}
                onChange={(e) => handleCheckbox(e)}
            />
            <h6 className="form-check-label m-1">Alfabetico</h6>
            <input
                type="checkbox"
                value="fecha"
                className="form-check m-2"
                style={{ width: '1.5em', height: '1.5em' }}
                checked={valueOrderBy === 'fecha'}
                onChange={(e) => handleCheckbox(e)}
            />
            <h6 className="form-check-label m-1">Fecha</h6>
        </div>


        <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center">
            <h6 className="m-1" style={{ width: '12em', fontSize: "1.1em"  }} > Categorias</h6>
            <select id="selectView" className="form-select fs-6 m-1" onChange={(e) => handleCategory(e)}>
                <option value="" >Todos</option>
                <option value="Tierra" >Tierra</option>
                <option value="Agua">Agua</option>
                <option value="Fuego">Fuego</option>
                <option value="Aire">Aire</option>
            </select>
        </div>


        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center btnbtn">
            <FontAwesomeIcon onClick={cleanSerch} className="m-4 fa-2x" icon={faMagnifyingGlass} />
            <input id="inputSearch"     className="form-input form-select fs-6 m-1 noticon w-auto " onInput={(e) => handleSearch(e)} placeholder='Buscar por signo..'>
            </input>
        </div>
    </div>
    )
}; 