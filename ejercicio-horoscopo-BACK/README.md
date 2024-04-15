# Landing Horóscopo
## Objetivo:
Se desea tener una página principal dónde leer las predicciones para los distintos signos del horóscopo.
El equipo de backend desarrolló la API correspondiente para ser consumida desde el front-end
### User Story
Como usuario quiero poder leer los datos del horóscopo.
#### Criterios de aceptación
- El usuario debe poder ver el horóscopo de todos los signos
- El usuario debe poder filtrar por signo
- El usuario debe poder ordenarlos en orden alfabético y por fecha.
- El usuario debe poder elegir el formato de la vista, las opciones son: lista o grilla.
- El primer elemento de la lista o grilla es el horóscopo del día actual y debe mostrarse destacado.
## Guidelines
- La aplicación debe ser desarrollada en React JS
- Se proveen los wireframes de las distintas visualizaciones
- Detallar todo lo asumido para el desarrollo de está aplicación
- Se pueden usar librerías externas en caso de considerarlo necesario. Tener en cuenta que evaluamos conocimientos en las tecnologías
- El código debe ser pusheado en un repositorio propio privado, no debe compartirse en otro medio público. Al finalizar el ejercicio darnos acceso al repositorio
### Servidor
Instalar las dependencias del proyecto y ejecutar el script start.
Luego se pueden obtener los datos de la siguiente forma:
- obtener todos los datos: http://localhost:3001/zodiac_signs
- obtener un dato a partir de un par (key,value): http://localhost:3001/zodiac_signs?key=value

Para más información consultar https://github.com/typicode/json-server
### API
La API posee una validación de las peticiones mediante el envío del header "Authorization" cuyo valor debe ser "qazwsx"
## Bonus: una o más de las siguientes
- Unit Testing
- TDD 
- Patrones de diseño
