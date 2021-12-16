---
title: "Reembolsos"
linkTitle: "Reembolsos"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Informação do módulo de Reembolsos no Módulo Administrativo.
weight: 25
---

{{% alert title="Observação" color="warning"%}}
Este tópico foi descontinuado e não está sendo oferecido a novos comerciantes.
{{% /alert %}}

## O que é um reembolso?
Acontece reembolso quando o estabelecimento decide voluntariamente reintegrar o dinheiro ao titular de cartão de crédito, por motivos como:  
* O cliente não gostou do produto e devolve;
* O estabelecimento não tem estoque e não pode entregar o produto ou serviço a seu cliente.
 
## Como fazer o reembolso de uma transação?
Para fazer a petição do reembolso de uma transação você deve fazer as seguintes ações. Lembre-se que a transação deve estar em estado “Aprovada” e não deve ter pendente um processo de disputa.

1. **Consultar a transação que você deseja reembolsar**:<br>
Para consultar uma transação você deve ir a seu tu módulo administrativo ao menu “Relatórios” clicando na opção “Transações” e buscar a transação específica da qual deseja pedir o reembolso do dinheiro correspondente ao valor da transação.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/http://developers.payulatam.com/images/soluciones-adicionales-pt/reembolsos/reportes.png)
 
2. **Fazer petição de reembolso**:<br>
Una vez tengas identificada la transacción, debes seleccionarla para ver el detalle de la misma y si estás seguro de realizar la solicitud de reembolso debes dar clic al botón _**Reembolsar**_ que se encuentra en la sección _**Detalle de la transacción**_.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_clic.jpg)
 
3. **Ingresar información de la solicitud de reembolso**:<br>
Una vez indiques que deseas realizar una solicitud de reembolso de una transacción, se te solicitará una información adicional para poder radicarla, la información requerida es la siguiente: Código de reversión, Tipo de transacción (Reembolso o Reversión parcial), Monto de reversión<sup>\*</sup> y Comentario.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_dialog.jpg)
 
{{% alert title="Tener en cuenta" color="info"%}}
<sup>\*</sup> _Reversiones parciales_: Si el valor de la reversión parcial solicitada supera el valor total actual de la transacción padre no se te permitirá radicar una solicitud de reembolso parcial asociada a dicha transacción. Debes tener en cuenta que el valor actual de la transacción padre pudo haber sido afectado por otras solicitudes de reversiones parciales.

Las Reversiones parciales sólo aplican para Brasil, Perú y Argentina.
{{% /alert %}}

4. **Confirmar solicitud de reembolso**: 
Antes de registrar tu solicitud de reembolso se te mostrará la información de la transacción que seleccionaste junto con la información ingresada y se te solicitará que confirmes la radicación de tu solicitud a través de la opción _**Enviar**_. En caso contrario puedes desistir de la operación a través de la acción _**Cancelar**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_confirmar.jpg)
 
## ¿Cuáles son las posibles resultados una vez registres tu solicitud de reembolso?
Una vez confirmaste la radicación de tu solicitud de reembolso el sistema dependiendo del caso puede emitir alguna de las siguientes respuestas:

### Solicitud de Reembolso aprobada
Si tu solicitud de reembolso cumple con las condiciones requeridas verás el siguiente mensaje de confirmación.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_aprobado.png)

### Solicitud de Reembolso pendiente de aprobación por parte del área encargada
En este caso la solicitud de reembolso debe ser revisada y aprobada por el área encargada de la gestión de este tipo de solicitudes, por lo cual esta queda en estado pendiente y debes esperar que sea atendida o gestionada. Puedes consultar el estado de tu solicitud de reembolso desde tu Secure a través del módulo de _**Reportes**_ y a través de la opción _**Reembolsos**_.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/pendiente_aprobacion.png)

{{% alert title="Tener en cuenta" color="info"%}}
* Si el tipo de transacción es _**Reversión Parcial**_ estas solicitudes quedarán en todos los casos en estado Pendiente.
* Las Reversiones parciales sólo aplican para Brasil, Perú y Argentina.
* El tiempo de respuesta estimado para la gestión de la solicitud de reembolso por parte del área encargada es de dos (2) días hábiles para todos los países (Argentina, Brasil, Chile, Colombia, México, Perú, Panamá).
* Los tiempos de reintegro del dinero a los compradores varían de acuerdo a cada país.
{{% /alert %}}

### Solicitud de Reembolso Declinada
Una solicitud de reembolso puede quedar declinada por algunos de los siguientes motivos:

* **Ya existe una solicitud de reembolso**:<br>
Si la transacción ya tiene asociada una solicitud de reembolso que se encuentre en estado pendiente, el sistema te indicará que tu solicitud fue declinada por tal motivo.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_existente.png)

* **No tienes saldo disponible en tu cuenta**:<br>
Si no tienes dentro del saldo disponible de tu cuenta mínimo el valor correspondiente al valor de la transacción o al valor de la solicitud de reembolso (En caso de reversiones parciales*) no se te permitirá registrar una solicitud de reembolso asociada a transacciones de dicha cuenta y por ende tu solicitud será declinada.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/saldo_insuficiente.png)

* **La transacción tiene pendiente una solicitud de disputa**:<br>
Si la transacción tiene pendiente una Disputa, el sistema te indicará que tu solicitud fue declinada y no registrará tu solicitud de reembolso, en este caso puedes consultar su estado a través del módulo de disputas.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/disputa_pendiente.png)
 
## ¿Dónde puedes consultar el estado de tu solicitud de reembolso?
Para conocer el estado de tus solicitudes de reembolso puedes acceder desde tu Secure al módulo de _**Reportes**_ y a través de la opción _**Reembolsos**_ consultar el estado de todas tus solicitudes de reembolso. Si deseas conocer el estado de una solicitud o solicitudes determinadas puedes aplicar los criterios o filtros de búsqueda para que realices búsquedas específicas.  

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_consulta.png)