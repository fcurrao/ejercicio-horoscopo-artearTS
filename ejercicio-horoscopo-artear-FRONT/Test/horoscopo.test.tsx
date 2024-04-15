import { describe, it, expect } from 'vitest';
import * as React from 'react'; 
import { HoroscopoListContainer } from '../src/Components/HoroscopoListContainer/HoroscopoListContainer.tsx';
import { HoroscopoList } from '../src/Components/HoroscopoList/HoroscopoList.tsx';
import { Navbar } from '../src/Components/Navbar/Navbar.tsx';
import { Horoscopo } from '../src/Interfaces/Horoscopo.tsx';


// TESTS
describe('HoroscopoListContainer', () => {
   // TEST 1
   it('compruebo que existe correctamente', () => {
      expect(<HoroscopoListContainer />).not.toBe(null);
      expect(<HoroscopoListContainer />).not.toBe(undefined);
   });
   // TEST 2
   it('deberia ser componente react', () => {
      const componente = <HoroscopoListContainer />;
      expect(React.isValidElement(componente)).toBe(true);
  });
});

describe('HoroscopoList', () => {
   // TEST 3  
   it('compruebo que existe correctamente', () => {
      expect(<HoroscopoList dataHoroscopo={[]}  />).not.toBe(null);
      expect(<HoroscopoList dataHoroscopo={[]}  />).not.toBe(undefined);
   });
   // TEST 4
   it('deberia ser componente react', () => {
      const componente = <HoroscopoList dataHoroscopo={[]} />;
      expect(React.isValidElement(componente)).toBe(true);
  });
});

describe('Navbar', () => {
   // TEST 5
   it('compruebo el componente', () => {
      expect(<Navbar />).not.toBe(null);
      expect(<Navbar />).not.toBe(undefined);
   });
});

// TEST 6
describe('Testeando la funcion moveTodayToFirst de HoroscopoListContainer', () => {
   it('deberia ser una función', () => {
      expect(typeof moveTodayToFirst).toBe('function');
   });

   // TEST 7
   it('deberia retornar un array', () => {
      expect(Array.isArray(moveTodayToFirst(db))).toBe(true);
   });

   // TEST 8
   it('deberia no retornar undefined la funcion si se le envia array vacio', () => {
      expect(Array.isArray(moveTodayToFirst([]))).not.toBe('undefined');
   });

   // TEST 9
   it('se espera que la fecha entre algun signo del horoscopo, debería manejar correctamente los casos límite entre fechas', () => {
      const result = moveTodayToFirst(db);
      const today = new Date();
      const initDateParts = result[0].init_date.split('-').map(part => parseInt(part, 10));
      const endDateParts = result[0].end_date.split('-').map(part => parseInt(part, 10));
      const initDate = new Date(today.getFullYear(), initDateParts[1] - 1, initDateParts[0]);
      const endDate = new Date(today.getFullYear(), endDateParts[1] - 1, endDateParts[0]);
      // se espera que la fecha entre algun signo del horoscopo
      expect(today >= initDate && today <= endDate).toBe(true);
   });

   //TEST 10
   it('deberia de reconocer el actual zoodiaco (si se testea despues del 19-4  va a dar error)', () => {
      const result = moveTodayToFirst(db);
      expect(result[0].name).toBe("Aries");
   });
});

// TEST 11
describe('Probando la function getDataHoroscopoByApi', () => {
   it('deberia traer datos si la validacion es correcta', async () => {
      const data = await getDataHoroscopoByApi("qazwsx");
      expect(typeof data).toBe('object');
   });

   // TEST 12
   it('deberia lanzar una excepcion en caso de error de autorizacion', async () => {
      await expect(getDataHoroscopoByApi("error")).rejects.toThrow();
   });
});

describe('Testeando la función ordenSetting de HoroscopoListContainer', () => {
   //TEST 13
   it('deberia ordenar los horoscopos por fecha correctamente', () => {
      const dataHoroscopo = [
         { name: 'Aries', init_date: '21-03', end_date: '19-04' },
         { name: 'Tauro', init_date: '20-04', end_date: '21-05' },
         { name: 'Géminis', init_date: '22-05', end_date: '21-06' },
      ];
      const expectedData = [
         { name: 'Aries', init_date: '21-03', end_date: '19-04' },
         { name: 'Tauro', init_date: '20-04', end_date: '21-05' },
         { name: 'Géminis', init_date: '22-05', end_date: '21-06' },
      ];
      ordenSetting('fecha', dataHoroscopo);
      expect(dataHoroscopo).toEqual(expectedData);
   });

   //TEST 14
   it('deberia ordenar los horoscopos alfabeticamente correctamente', () => {
      const dataHoroscopo = [
         { name: 'Tauro', init_date: '20-04', end_date: '21-05' },
         { name: 'Aries', init_date: '21-03', end_date: '19-04' },
         { name: 'Géminis', init_date: '22-05', end_date: '21-06' },
      ];
      const expectedData = [
         { name: 'Aries', init_date: '21-03', end_date: '19-04' },
         { name: 'Géminis', init_date: '22-05', end_date: '21-06' },
         { name: 'Tauro', init_date: '20-04', end_date: '21-05' },
      ];
      const sortedData = ordenSetting('alfabetico', dataHoroscopo);
      expect(sortedData).toEqual(expectedData);
   });
});


// Elementos para hacer posible el TEST


//constantes de elementos para testeear

const db = [
   {
      "id": 0,
      "name": "Tauro",
      "init_date": "20-04",
      "end_date": "21-05",
      "prediction": "La introspección no es algo difícil para Tauro. El cierre de la semana les permitirá lograr una proyección de toda su introspección y equilibrio. Los cambios y decisiones de la semana anterior no fueron en vano y, superar ese desafío, no hará más que fortalecerlos.",
      "image": "tauro.jpg"
   },
   {
      "id": 1,
      "name": "Aries",
      "init_date": "21-03",
      "end_date": "19-04",
      "prediction": "Aunque las energías bajan, resulta importante aferrarse a todo aquello que hace brillar los ojos de los arianos. El cansancio se hace evidente en la rutina pero el día miércoles un alto voltaje de energía positiva, especialmente proveniente de signos como Tauro o Escorpio, inclinarán la balanza.",
      "image": "aries.jpg"
   },
   {
      "id": 4,
      "name": "Acuario",
      "init_date": "21-01",
      "end_date": "19-02",
      "prediction": "Si bien le cuesta abandonar sus hábitos, debería iniciar algo nuevo. Apueste por una transformación en su vida y así disfrutará de una vitalidad plena.",
      "image": "acuario.jpg"
   },
   {
      "id": 8,
      "name": "Libra",
      "init_date": "23-09",
      "end_date": "22-10",
      "prediction": "La dispersión intentará correrlos de foco. No es la mejor semana para proyectar hacia afuera, pensar en causar buenas impresiones o preocuparse por el que dirán. Géminis no podrá controlar sus emociones y lo ideal es no permitir que estas empañen el proceso introspectivo, tan necesario para el cierre del año.",
      "image": "libra.jpg"
   },
   {
      "id": 18,
      "name": "Piscis",
      "init_date": "20-02",
      "end_date": "20-03",
      "prediction": "Hoy tendrá la oportunidad para dar forma a esos nuevos proyectos y dejar en firme las pautas a las que se tendrá que ajustar su entorno de ahora en más.",
      "image": "piscis.jpg"
   },
   {
      "id": 15,
      "name": "Géminis",
      "init_date": "22-05",
      "end_date": "21-06",
      "prediction": "Siempre que intente exponer sus pensamientos internos, trate de adoptar una conducta diplomática si es que no quiere que el mundo se oponga contra usted.",
      "image": "geminis.jpg"
   },
   {
      "id": 16,
      "name": "Cáncer",
      "init_date": "22-06",
      "end_date": "23-07",
      "prediction": "En determinadas situaciones, debería criticar un poco menos y ser más comprensivo con su entorno cercano. No todos pueden manejarse con la misma rapidez mental.",
      "image": "cancer.jpg"
   },
   {
      "id": 12,
      "name": "Leo",
      "init_date": "24-07",
      "end_date": "23-08",
      "prediction": "Durante esta jornada, tendrá la posibilidad de conectarse con su entorno de un modo simple y profundo. No desperdicie la oportunidad que le deparará esta jornada.",
      "image": "leo.jpg"
   },
   {
      "id": 19,
      "name": "Virgo",
      "init_date": "24-08",
      "end_date": "22-09",
      "prediction": "Sepa que una mirada del pasado lo ayudará a solucionar esos inconvenientes del presente. No le tema a los recuerdos que ya ha vivido, son solo pasajeros.",
      "image": "virgo.jpg"
   },
   {
      "id": 21,
      "name": "Escorpio",
      "init_date": "23-10",
      "end_date": "22-11",
      "prediction": "Intente sostener el equilibrio entre lo que desea y lo que otros le demandan. Sepa que todas las partes deben ser escuchadas para que reine la armonía.",
      "image": "escorpio.jpg"
   },
   {
      "id": 22,
      "name": "Sagitario",
      "init_date": "23-11",
      "end_date": "22-12",
      "prediction": "Aprenda que no siempre los obstáculos son situaciones negativas. Procure descubrir las nuevas opciones que se esconden detrás de las dificultades que uno vivió.",
      "image": "sagitario.jpg"
   },
   {
      "id": 30,
      "name": "Capricornio",
      "init_date": "23-12",
      "end_date": "20-01",
      "prediction": "Hoy se sentirá lleno de confianza con usted mismo y podrá concretar todos los planes que tiene en mente. Aunque no lo crea, deberá guiarse por sus instintos.",
      "image": "capricornio.jpg"
   }
]
const URL = 'http://localhost:3001';
const DATA = 'zodiac_signs';

// funciones 
async function getDataHoroscopoByApi(authorizacion) {
   try {
      const response = await fetch(`${URL}/${DATA}`, {
         headers: {
            'Authorization': authorizacion
         }
      });
      return await response.json();
   } catch (error) {
      console.error(`Error trayendo la data en la ruta ${URL}/${DATA}`, error);
      return Promise.reject(error);
   }
}

const moveTodayToFirst = (data) => {
   const today = new Date();
   const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
   // formateo las init_date y end_date, luego busco la fecha de hoy  que este entre estas dos fechas
   //  returna true, poniendo en 0 o numero positivo elindex (index encontrado)
   const todayHoroscopoIndex = data.findIndex(horoscopo => {
      // separo secciones del formato actual y luego formateo a tipo Date
      const init_dateSection = horoscopo.init_date.split('-').map(part => parseInt(part, 10));
      const end_dateSection = horoscopo.end_date.split('-').map(part => parseInt(part, 10));
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

const ordenSetting = (valueOrderBy, dataHoroscopo) => {
   if (valueOrderBy === 'today') {
      moveTodayToFirst(dataHoroscopo)
   }
   // aca aplico el reverse para daar vuelta la fecha de DD-MM a MM-DD 
   if (valueOrderBy === 'fecha') {
      const sortByDate = (a: Horoscopo, b:Horoscopo) => {
         const dateA: Date = new Date(`${a.init_date.split('-').reverse().join('-')}`);
         const dateB: Date = new Date(`${b.init_date.split('-').reverse().join('-')}`);
         return dateA.getTime() - dateB.getTime();
      };
      return dataHoroscopo.slice().sort(sortByDate);
      // aca ordena por orden alfabetico comparado con la propiedad name
   } if (valueOrderBy === 'alfabetico') {
      const sortByNombre = (a, b) => {
         const moteA = a.name.toUpperCase();
         const moteB = b.name.toUpperCase();
         if (moteA < moteB) {
            return -1;
         }
         if (moteA > moteB) {
            return 1;
         }
         return 0;
      };
      const result = dataHoroscopo.slice().sort(sortByNombre);
      return result
   }
}

