# Proyecto_IngenieriaSoftwareII

## Backend

Por defecto en la direccion de la base de datos tiene 192.168.1.69, para que funcione tienen que poner mi direccion
linea 8, database.py
##Como correr el proyecto en local##
1. Tener pip instalado
2. Instalar flask `sudo apt install python3-flask`
3. Instalar los requerimientos con `pip install -r requirements.txt`
4. Crear el archivo api/db/.env con la linea SQLALCHEMY_DATABASE_URI=mysql+pymysql://user:pass@emomeza.com/is2, remplazando las credenciales donde sea necesario.
5. Correr el proyecto con `flask run`

## Frontend


REQUERIMIENTOS:
Ing Soft IITema: Bug Tracker

El bugtracker seria publico (para los clientes) y seria para multiples
productos de la PYME.

- Parecido a los Issue de Github.
- Tiene una vista solo para devs para asignar el dev encargado, poner tags 
  y cerrar los issues / redigirirlos
- Tiene una busqueda con tags para poder buscar los bugs, como dev y cliente. 
- Una "bandeja de entrada" para los devs con los issues de los proyectos
  que tienen asigandos.
- Estadisticas?
- Pagina no abierta, requiere login de los clientes / devs.
- 
