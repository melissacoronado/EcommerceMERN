# EcommerceMERN
Proyecto Final Curso Backend CoderHouse

Desafia 30
>> Consigna:
Arrancar dos instancias del servidor en el que venimos trabajando utilizando PM2 modo fork (sin -i max).
Las dos instancias estarán: una en el puerto 8081 modo fork (parámetro línea de comandos en FORK: cluster interno deshabilitado) y la otra en 8082 modo cluster (parámetro línea de comandos en CLUSTER: cluster interno habilitado). Ambas estarán en modo watch.
Configurar un servidor Nginx para que las rutas entrantes /info y /randoms por el puerto 80 de Nginx se deriven a esas dos instancias, recibiendo la del modo cluster cuatro veces más de tráfico que la instancia en modo fork.
Verificar en la ruta de info, el puerto y el pid de atención y el correcto funcionamiento del balanceador de carga implementado en Nginx. Comprobar que la ruta randoms funcione adecuadamente.


Desafio 29
>> Consigna: 
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
*++ Agregar en la vista info, el número de procesadores presentes en el servidor.
* Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
* Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
* Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
* Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
* Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

NOTA:
Es probable que en el caso de tener activo el child process fork (realizado en el entregable anterior) aparezcan más procesos de node activos que la cantidad esperada. Desactivar el código del fork y su endpoint '/randoms' y verificar que ahora la cantidad de procesos de node corresponda.



Desafio 28
>> Consigna:
* En base al último proyecto entregado, permitir ingresar por línea de comandos el puerto local de escucha del servidor, luego el FACEBOOK_CLIENT_ID y el FACEBOOK_CLIENT_SECRET.
* Si no se ingresan estos valores, se tomarán valores default presentes en el programa.
El servidor imprimirá en consola el código de salida del proceso de node.js
* Asimismo, se dispondrá de una nueva ruta get '/info', que devolverá una vista con los siguientes datos:
- Argumentos de entrada                             - Path de ejecución
- Nombre de la plataforma (sistema operativo)       - Process id
- Versión de node.js                                - Carpeta corriente
- Uso de memoria
* Se creará una ruta '/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por query params, por ej. ..../randoms?cant=20000. Si dicho parámetro no se ingresa, calcular 100000000 números.
    - El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500000000 de randoms.


