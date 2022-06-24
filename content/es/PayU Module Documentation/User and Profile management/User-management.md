---
title: "Gestión de usuarios"
linkTitle: "Gestión de usuarios"
date: 2021-08-27T08:43:01-05:00
type: docs
Description: > 
   Aprende cómo crear, buscar, actualizar y desactivar los usuarios que tienen acceso al Módulo PayU de acuerdo con su perfil.
weight: 10
---

Antes de continuar, vamos a recapitular unos términos claves: 

* Un _**usuario**_ es una persona que tiene un perfil para administrar o consultar la información de una cuenta. 
* Un _**perfil**_ es un conjunto de permisos para acceder a una cuenta. 
* A usuario puede tener uno o más perfiles, esto significa que un usuarios puede acceder a múltiples _**cuentas**_ y múltiples _**comercios**_.

Para más información, lee los [conceptos detrás del Módulo PayU]({{< ref"PayU Module Documentation#payu-module-concepts" >}}).

## Permisos requeridos {#permission-required}
Para tener acceso a este módulo, necesitas un perfil con los siguientes permisos activos:

* _Consultar usuarios_<br>Este permiso te permite buscar un usuario en particular.	
* _Crear, editar y eliminar usuarios_

Consulta [Perfiles y Permisos]({{< ref"Profile-and-permissions-management.md" >}}) para más información.

## Gestión de usuarios {#user-management}
Para gestionar usuarios, ingresa a tu cuenta PayU y haz clic en el menú _**Configuración**_ en la parte superior de la pantalla y luego, selecciona _**Gestión de usuarios**_.

![PrintScreen](/assets/UserManagement/UserManagement_01_es.png)

Se abre el módulo de _**Gestión de usuarios**_, aquí puedes ver la lista de usuarios disponibles junto con su estado, las cuentas a las que pueden acceder y su perfil.

![PrintScreen](/assets/UserManagement/UserManagement_02_es.png)

{{% alert title="Nota" color="info"%}}
Los usuarios marcados con una estrella verde (<img src="/assets/UserManagement/UserManagement_03.png" width="2%"/>) son usuario predeterminados, los cuales no pueden ser borrados (desactivados).
{{% /alert %}}

### Agregar usuarios {#add-users}
Puedes crear un usuario utilizando su correo electrónico o utilizando un nombre de usuario. Sigue estos pasos para crear un nuevo usuario.

1. En el módulo _**Gestión de usuarios**_, haz clic en _**Agregar usuario**_.

![PrintScreen](/assets/UserManagement/UserManagement_04_es.png)

2. Aparece la ventana de _**Agregar usuario**_. Aquí puedes ingresar la información de la persona a la que se permitirá recolectar pagos en línea y verificar la información de los pagos, de acuerdo con los permisos que le otorgues.

![PrintScreen](/assets/UserManagement/UserManagement_05_es.png)

3. Ingresa la siguiente información:

* **Correo electrónico**: dirección de correo electrónico del nuevo usuario. PayU envía la información para iniciar sesión a esta dirección, asegúrate de que sea válida y que el usuario tenga acceso a él.<br>O si lo prefieres, puedes crear un usuario sin utilizar dirección de correo electrónico. Esto es útil cuando el usuario que quieres crear está atado a un rol y no a una persona específica. Para hacer esto, haz clic en _**¿No tiene correo electrónico?**_ e ingresa la siguiente información:
   - _Usuario_: nombre de usuario utilizado para iniciar sesión. Este nombre de usuario no puede tener números o caracteres especiales.
   - _Correo electrónico (Admin)_: ingresa la dirección de correo electrónico del usuario administrador al cual, PayU envía la información para generar o recuperar la contraseña de este usuario.
* **Nombre completo**: nombre del usuario que deseas crear.
* **Estado**: define si el usuario que vas a crear está _Activo_ o _Inactivo_.

4. Configura las preferencias de usuario. puedes configurar las siguientes:

* **Formato fecha**: cambia el formato en que quieres mostrar las fechas en tu módulo PayU,

<img src="/assets/UserPreferences/UserPreferences_05_es.png" alt="PrintScreen" width="40%"/><br>

Puedes utilizar cualquiera de los siguientes formatos:

| Formato     | Ejemplo<br>_24 de Agosto de 2021_ |
|-------------|-----------------------------------|
| dd/mm/aaaa  | 24/08/2021                        |
| mm/dd/aaaa  | 08/24/2021                        |
| aaaa/mm/dd  | 2021/08/24                        |
| aaaa/mmm/dd | 2021/Ago/24                       |
| dd-mm-aaaa  | 24-08-2021                        |
| mm-dd-aaaa  | 08-24-2021                        |
| aaaa-mm-dd  | 2021-08-24                        |
| aaaa-mmm-dd | 2021-Ago-24                       |

* **Zona horaria**: cambia la zona horaria del país en el que deseas visualizar la información de las transacciones.

<img src="/assets/UserPreferences/UserPreferences_06_es.png" alt="PrintScreen" width="40%"/><br>

* **Formato moneda**: cambia el formato en el que deseas visualizar los valores monetarios en tu Módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_07_es.png" alt="PrintScreen" width="40%"/><br>

* **Idioma**: cambia el idioma de tu Módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_08_es.png" alt="PrintScreen" width="40%"/><br>

5. Al final de la pantalla, se  cargan todos los perfiles (predeterminados y personalizados) junto con las cuentas del comercio actual. Configura el acceso a cada cuenta configurando un perfil, si no quieres que tenga acceso a una cuenta, no selecciones ningún perfil.

![PrintScreen](/assets/UserManagement/UserManagement_07_es.png)

{{% alert title="Nota" color="info"%}}
Si quieres asignarle un perfil personalizado, debes crearlo primero.
{{% /alert %}}

6. Una vez termines, haz clic en _**Agregar usuario**_.

![PrintScreen](/assets/UserManagement/UserManagement_08_es.png)

7. En este punto, ¡has agregado el nuevo usuario! Enviamos un correo electrónico a la dirección del usuario para que pueda acceder al Módulo PayU.<br>El nuevo usuario debe activar la cuenta utilizando el botón _**Activa tu usuario**_ en el cuerpo del correo.

![PrintScreen](/assets/UserManagement/UserManagement_09_es.png)

{{% alert title="Nota" color="info"%}}
Si el usuario se creó sin usar el correo electrónico, las instrucciones para activar la cuenta se envían al correo electrónico de administrador que definiste.
{{% /alert %}}

8. El nuevo usuario debe asignar una nueva contraseña para acceder a la cuenta.

<img src="/assets/UserManagement/UserManagement_10_es.png" alt="PrintScreen" width="40%"/><br>

9. Una vez que el usuario establece la nueva contraseña, puede acceder a las cuentas seleccionadas usando sus credenciales.

### Buscar usuarios {#search-users}
Cuando necesites encontrar un usuario específico, puedes utilizar las opciones de filtro para encontrar uno o más usuarios que cumplan con determinadas condiciones.

En el módulo _**Gestión de usuarios**_, haz clic en el campo _**Buscar usuarios**_ para ver los filtros disponibles.

![PrintScreen](/assets/UserManagement/UserManagement_11_es.png) 

Una vez hayas seleccionado los filtros, haz clic en _**Buscar**_. Todos los usuarios que cumplen las condiciones seleccionadas se muestran en la tabla.

![PrintScreen](/assets/UserManagement/UserManagement_12_es.png) 

Si quieres eliminar un filtro, haz clic en el ícono **x** junto a él.

### Editar usuarios {#edit-users}
A través del módulo de _**Gestión de usuarios**_, puedes actualizar algunas propiedades de un usuarios. para actualizar un usuario, búscalo y haz clic en él.

Aparece la ventana de _**Editar usuarios**_.

![PrintScreen](/assets/UserManagement/UserManagement_13_es.png) 

Puedes actualizar la siguiente información:

* Nombre completo de un usuario
* Solicitar la recuperación de la contraseña.
* Actualizar el estado del usuario (activo o inactivo)
* Cambiar o eliminar el perfil asignado a una cuenta determinada.

{{% alert title="Nota" color="info"%}}
La información de las preferencias del usuario no se puede actualizar mediante esta opción, esta información es actualizada por cada usuario por su cuenta.
{{% /alert %}}

Una vez termines, haz clic en _**Guardar configuración**_ para aplicar los cambios.

#### Editar múltiples usuarios {#edit-multiple-users}
Para editar varios usuarios, búscalos y utiliza la casilla de verificación de la izquierda. Luego, haz clic en _**Editar usuarios (n)**_.

![PrintScreen](/assets/UserManagement/UserManagement_14_es.png) 

Aparece la ventana de _**Editar usuarios (n)**_, donde puedes actualizar la siguiente información:

* Solicitar la recuperación de contraseña para todos los usuarios.
* Actualizar su estado de usuario (activo o inactivo)
* Asignar un perfil a una cuenta determinada.

![PrintScreen](/assets/UserManagement/UserManagement_15_es.png) 

Ten en cuenta que al utilizar esta opción, todos los usuarios tendrán la misma configuración que definas aquí.

Una vez termines, haz clic en _**Guardar configuración**_ para aplicar los cambios.