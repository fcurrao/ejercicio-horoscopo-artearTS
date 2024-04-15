## Challenge Landing Horóscopo



### Objetivo
Se desea tener una página principal dónde leer las predicciones para los distintos signos del horóscopo. El equipo de backend desarrolló la API correspondiente para ser consumida desde el front-end

User Story: Como usuario se quiere poder leer los datos del horóscopo.


### Instrucciones
El aplicativo esta guionado por los wireframes correspondientes, dentro del proyecto.

Una vez dentro del aplicativo tendras en el navbar las opciones para verlo como Lista o Grilla, ademas de eso se puede ordenar por Default ( donde se ubica primero el elemento del signo del horoscopo que corresponde con la fecha del dia de hoy), alfabeticamente o por fecha.

Tambien se puede filtrar por signo desde la barra de busqueda.

Se simulo un pequeño delay (visual) de un loading.

Una vez elegido las caracteristicas requeridas se puede visualizar los horoscopos resultantes, donde al hacer click en alguno de ellos se abre el detalle del mismo.

Cuenta con un selector de categorias donde se podra filtrar la categoria a gusto.

Ademas cuenta con un controlador de Errores, donde cuando la ruta o la busqueda no de resultado alguna se informa con una pagina(componente) que asi lo informa.

Si se toca el icono de Grilla se ordena por lista y cambia el icono a Lista y si se toca ese icono se ordena por Grilla.

Tambien el icono de la lupita de Search , borra la busqueda.

- Las variables de entorno son: (.env)
VITE_URL = 'http://localhost:3001'
VITE_DATA = 'zodiac_signs'



---
### Librerias utilizadas
react-router-dom

typescript

-D vitest 

Boostrap (framework CSS )

 
### Rutas
Navbar

Home/HorcopoContainer/HoroscopoList/DetailsHoroscopo

Footer


### Tests
Se utilizo vitest  para la realizacion de los test.

Para realizar el test usar el script **npm run test**

Se testeo mediante Unit Testing probando no solo componente sino funciones y partes del codigo

 
### Patrones de diseño utilizados
- Render Props

- Componentes diferentes.

- Custom Hooks 

- Context.


### Descripcion


- Se creo una aplicacion en React JS utilizando Vite y con TypeScript.

- Se utilizó Hooks, como useEffect, useState, useContext, useNavigate, y custom Hooks

- Seguridad de datos: Se realizo un archivo de variables de entorno para manejar las credenciales de autorización.

- Un robusto manejo de errores: útil manejar estos casos para proporcionar retroalimentación adecuada al usuario o para registrar los errores para su posterior solución.

- Buena modularidad y separación de responsabilidades a nivel de componentes, contiene adherencia a los principios SOLID.
  Cada componente tiene unica e inconfundible responsabilidades. Asi es mas facil mantener y probar los componentes y funciones.

- Optimizacion del codigo

- Optimización de Carga de Imágenes
  
- Se utilizó Boostrap (framework CSS ) para agilizar el estilo

- Se utilizó diferentes formas de realizar distintas cosas , ejemplo estilos, funciones y rutas. Realizado aproposito para demostrar variantes

- Se utilizó rutas en Link traido de la libreria react-router-dom

- Se utilizó useParams  traido de la libreria react-router-dom

- Se realizó test desarrollados en vitest para comprobar la utilidades de funciones y otros.

- Se realizó el responsive

- Se pusheó a este repositorio privado para su revisión.


### Imagenes de Uso
**Home del aplicativo (vista en grilla)**
[![Home](https://imgbb.host/images/MIm6z.png "Home")](https://imgbb.host/images/MIm6z.png "Home")


**Home del aplicativo (filtrado por busqueda, orden y en lista)**
[![Busqueda](https://imgbb.host/images/MIVZ7.png "Busqueda")](https://imgbb.host/images/MIVZ7.png "Busqueda")


**Detalle de un elemento en particular**
[![Detail](https://imgbb.host/images/MItUB.png "Detalle")](https://imgbb.host/images/MItUB.png "Detalle")


**Error**
[![Error](https://imgbb.host/images/MI8Vu.png "Error")](https://imgbb.host/images/MI8Vu.png "Error")


---
### Instalacion
### Parte back
- Servidor: Instalar las dependencias del proyecto y ejecutar el script **npm start**. Luego se pueden obtener los datos.

- Para obtener los datos se utiliza http://localhost:3001/zodiac_signs

- La API posee una validación de las peticiones mediante el envío del header ***"Authorization"*** cuyo valor debe ser ***"qazwsx"***.

- Las variables de entorno son: (.env)
VITE_URL = 'http://localhost:3001'
VITE_DATA = 'zodiac_signs'

### Parte Front
- Instalar las dependencias del proyecto y luego ejecutar el script** npm run dev**.



---
###Colaboradores
Agradezco la colaboracion de [Julieta Palta](https://github.com/julipalta)

##Creado por [fcurrao](https://github.com/fcurrao/ "fcurrao")

