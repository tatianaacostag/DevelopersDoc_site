---
title: "Gestión de perfiles y permisos"
linkTitle: "Gestión de perfiles y permisos"
date: 2021-08-27T16:07:39-05:00
type: docs
Description: >
   Aprende cómo crear, actualizar y eliminar el conjunto de permisos que puedes asignarle a tus usuarios.
weight: 20
---

Un _Perfil_ es un conjunto de permisos para acceder a una funcionalidad de una _cuenta_. Un _usuario_ es una persona que tiene un perfil para administrar o consultar la información de una cuenta.

Para más información sobre comercios, cuentas y más, lee los [conceptos detrás del Módulo PayU]({{< ref"PayU Module Documentation#payu-module-concepts" >}}).

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Consultar permisos y perfiles_
* _Crear, editar y eliminar perfiles y permisos_

## Permisos predeterminados {#default-profiles}
De manera predeterminada, PayU proporciona tres perfiles que permiten a tus usuarios acceder a las cuentas. Estos perfiles son:

* **Administrador**: este perfil tiene habilitados todos los permisos de la cuenta. Un usuario enrolado con este perfil puede crear, revisar, actualizar, y eliminar (o deshabilitar) la información relacionada con la cuenta. Además, este usuario puede ver y descargar todos los reportes, ver la información técnica, resolver disputas, administrar usuarios, realizar transferencias y administrar perfiles.
* **Consultar y editar**: este perfil es el equivalente a un perfil _manager_. Un usuario enrolado con este perfil puede crear, revisar, actualizar, y eliminar (o deshabilitar) la información relacionada con la cuenta. Además, este usuario puede ver y descargar todos los reportes, ver la información técnica, resolver disputas, y revisar los perfiles de usuarios creados.
* **Solo consultar**: este perfil puede acceder a la cuenta en modo solo lectura. Un usuario enrolado con este perfil puede crear, revisar la información relacionada con la cuenta, descargar algunos de los reportes y ver las transferencias de la cuenta. Además, este usuario **no puede** ver los detalles técnicos o tener acceso a los perfiles de los usuarios.

Estos perfiles no se pueden eliminar y su conjunto de permisos es fijo, si alguno de estos permisos no satisface tus necesidades, debes [crear uno]({{< ref "#create-profiles" >}}).

## Gestión de perfiles y permisos {#profile-and-permission-management}
Para gestionar perfiles y permisos, ingresa a tu cuenta PayU y haz clic en el menú _**Configuración**_ en la parte superior de la pantalla y luego, selecciona _**Perfiles y permisos**_.

![PrintScreen](/assets/Profiles/Profiles_01_es.png)

Se abre el módulo _**Gestión de servicios y permisos**_ aquí, puedes encontrar una tabla con todos los permisos para acceder al módulo PayU y los perfiles con acceso a los mismos.

![PrintScreen](/assets/Profiles/Profiles_02_es.png)
 
### Crear perfiles {#create-profiles}
Cuando ninguno de los [perfiles predeterminados]({{< ref"#default-profiles" >}}) satisface tus necesidades, puedes crear uno y asignar un conjunto de permisos personalizado. Sigue estos pasos para crear un perfil.

1. En el módulo _**Gestión de servicios y permisos**_, haz clic en _**Crear perfil personalizado**_.

![PrintScreen](/assets/Profiles/Profiles_03_es.png)

2. Se agrega una nueva columna a la tabla. Ingresa un nombre significativo para su perfil personalizado.

![PrintScreen](/assets/Profiles/Profiles_04_es.png)

3. Una vez que establezcas el nombre, puedes asignar tantos permisos como necesites haciendo clic en la casilla de verificación de cada fila.

![PrintScreen](/assets/Profiles/Profiles_05_es.png)

4. Cuando termines, haz clic en _**Guardar configuración**_. Si haces clic en _**Borrar cambios**_, el perfil no se guarda y la columna se elimina de la tabla.

### Editar perfiles {#edit-profiles}
Al editar un perfil, puedes cambiarle el nombre, o asignar o eliminar permisos.

* Para cambiar el nombre de un perfil, haz clic en el simbolo ▾ junto a su nombre. Luego, haz clic en _**Cambiar nombre**_.<br><br>![PrintScreen](/assets/Profiles/Profiles_06_es.png)<br>Esto habilita el campo de nombre del perfil para actualizarlo.

* Para asignar o eliminar un permiso, simplemente haz clic en la casilla de verificación del permiso.

Cuando termines, haz clic en _**Guardar configuración**_. Si haces clic en _**Borrar cambios**_, todos los cambios tanto para el cambio de nombre como para el cambio de permisos se descartan.

### Eliminar perfiles {#delete-profiles}
Para eliminar un perfil, haz clic en el simbolo ▾ junto a su nombre. Luego, haz clic en _**Eliminar**_.

![PrintScreen](/assets/Profiles/Profiles_07_es.png)

Si hay usuarios enrolados al perfil que estás a punto de eliminar, se te solicitará que establezcas un nuevo perfil para ellos. Selecciona el nuevo perfil del menú desplegable y haz clic en _**Eliminar y reasignar**_.

<img src="/assets/Profiles/Profiles_08_es.png" alt="PrintScreen" width="50%"/><br>

Tan pronto como elimines el perfil, su columna se elimina de la tabla y ningún usuario podrá tener este perfil.