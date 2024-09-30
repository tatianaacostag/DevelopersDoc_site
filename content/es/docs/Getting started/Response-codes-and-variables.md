---
title: "Códigos de Respuesta y Variables"
linkTitle: "Códigos de Respuesta y Variables"
date: 2021-04-06T15:33:35-05:00
description:
  En esta sección, encontrarás data relevante usada durante el proceso de integración, como las tablas de variables, lenguajes y monedas permitidas en la plataforma de PayU. 
weight: 50
---
<script src="/js/searchcodes.js"></script>

<input type="text" id="searchBox" placeholder=" Busca por nombres, códigos o descripción..." onkeyup="findTables()" >
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="btn-green">Borrar</button>

## Códigos de Respuesta de las Transacciones {#response-codes-for-transactions}  

| Código de Respuesta | Descripción |
|-|-|
| `ERROR` | Error general. |
| `APPROVED` | La transacción fue aprobada. |
| `ANTIFRAUD_REJECTED` | La transacción fue rechazada por el sistema antifraude. |
| `BANK_FRAUD_REJECTED` | La transacción fue rechazada debido a sospecha de fraude en la institución financiera. |
| `PAYMENT_NETWORK_REJECTED` | La red financiera rechazó la transacción. |
| `ENTITY_DECLINED` | La transacción fue declinada por el banco o por la red financiera debido a un error. |
| `INTERNAL_PAYMENT_PROVIDER_ERROR` | Ocurrió un error en el sistema intentando procesar el pago. |
| `INACTIVE_PAYMENT_PROVIDER` | El proveedor de pagos no se encontraba activo. |
| `DIGITAL_CERTIFICATE_NOT_FOUND` | La red financiera reportó un error en la autenticación. |
| `INVALID_EXPIRATION_DATE_OR_SECURITY_CODE` | El código de seguridad o la fecha de expiración fue inválido. |
| `INVALID_RESPONSE_PARTIAL_APPROVAL` | Tipo de respuesta no válida. La entidad aprobó parcialmente la transacción y debe ser cancelada automáticamente por el sistema. |
| `INSUFFICIENT_FUNDS` | La cuenta no tenía fondos suficientes. |
| `CREDIT_CARD_NOT_AUTHORIZED _FOR_INTERNET_TRANSACTIONS` | La tarjeta de crédito no estaba autorizada para transacciones por Internet. |
| `INVALID_TRANSACTION` | La red financiera reportó que la transacción fue inválida. |
| `INVALID_CARD` | La tarjeta es inválida. |
| `EXPIRED_CARD` | La tarjeta ya expiró. |
| `RESTRICTED_CARD` | La tarjeta presenta una restricción. |
| `CONTACT_THE_ENTITY` | Se debe contactar al banco. |
| `REPEAT_TRANSACTION` | Se debe repetir la transacción. |
| `ENTITY_MESSAGING_ERROR` | La red financiera reportó un error de comunicaciones con el banco. |
| `BANK_UNREACHABLE` | El banco no se encontraba disponible. |
| `EXCEEDED_AMOUNT` | La transacción excede un monto establecido por el banco. |
| `NOT_ACCEPTED_TRANSACTION` | La transacción no fue aceptada por el banco por algún motivo. |
| `ERROR_CONVERTING_TRANSACTION_AMOUNTS` | Ocurrió un error convirtiendo los montos a la moneda de pago. |
| `EXPIRED_TRANSACTION` | La transacción expiró.|
| `PENDING_TRANSACTION_REVIEW` | La transacción fue detenida y debe ser revisada, esto puede ocurrir por filtros de seguridad. |
| `PENDING_TRANSACTION_CONFIRMATION`| La transacción está pendiente de ser confirmada. |
| `PENDING_TRANSACTION_TRANSMISSION` | La transacción está pendiente para ser trasmitida a la red financiera. Normalmente esto aplica para transacciones con métodos de pago en efectivo. |
| `PAYMENT_NETWORK_BAD_RESPONSE` | El mensaje retornado por la red financiera es inconsistente. |
| `PAYMENT_NETWORK_NO_CONNECTION` | No se pudo realizar la conexión con la red financiera. |
| `PAYMENT_NETWORK_NO_RESPONSE` | La red financiera no respondió. |
| `FIX_NOT_REQUIRED` | Clínica de transacciones: Código de manejo interno. |
| `AUTOMATICALLY_FIXED_AND_SUCCESS_REVERSAL` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |
| `AUTOMATICALLY_FIXED_AND_UNSUCCESS_REVERSAL` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |
| `AUTOMATIC_FIXED_NOT_SUPPORTED` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |
| `NOT_FIXED_FOR_ERROR_STATE` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |
| `ERROR_FIXING_AND_REVERSING` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |
| `ERROR_FIXING_INCOMPLETE_DATA` | Clínica de transacciones: Código de manejo interno. Sólo aplica para la API de reportes. |

## Códigos de Respuesta de la Página de Respuesta {#response-codes-sent-to-the-response-page}

<div class="variables"></div>

| lap Transaction State | transaction State | pol Transaction State | lapResponseCode | pol Response Code | Descripción |
|-|-|-|-|-|-|
| APPROVED | 4 (Aprobada) | 4 (Aprobada) | APPROVED | 1 | Transacción aprobada |
| DECLINED | 6 (Declinada) | 6 (Rechazada) | PAYMENT_NETWORK_REJECTED | 4 | Transacción rechazada por entidad financiera |
|  |  |  | ENTITY_DECLINED | 5 | Transacción rechazada por el banco |
|  |  |  | INSUFFICIENT_FUNDS | 6 | Fondos insuficientes |
|  |  |  | INVALID_CARD | 7 | Tarjeta inválida |
|  |  |  | CONTACT_THE_ENTITY | 8 | Por favor, contactar a la entidad financiera |
|  |  |  | BANK_ACCOUNT_ACTIVATION _ERROR | 8 | Débito automático no permitido |
|  |  |  | BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT | 8 | Débito automático no permitido |
|  |  |  | INVALID_AGENCY_BANK_ACCOUNT | 8 | Débito automático no permitido |
|  |  |  | INVALID_BANK_ACCOUNT | 8 | Débito automático no permitido |
|  |  |  | INVALID_BANK | 8 | Débito automático no permitido |
|  |  |  | EXPIRED_CARD | 9 | Tarjeta vencida |
|  |  |  | RESTRICTED_CARD | 10 | Tarjeta restringida |
|  |  |  | INVALID_EXPIRATION_DATE_OR _SECURITY_CODE | 12 | La fecha de expiración o el código de seguridad son inválidos |
|  |  |  | REPEAT_TRANSACTION | 13 | Reintentar pago |
|  |  |  | INVALID_TRANSACTION | 14 | Transacción inválida |
|  |  |  | EXCEEDED_AMOUNT | 17 | El valor excede el máximo permitido por la entidad |
|  |  |  | ABANDONED_TRANSACTION | 19 | Transacción abandonada por el pagador |
|  |  |  | CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS | 22 | La tarjeta no está autorizada para comprar por internet |
|  |  |  | ANTIFRAUD_REJECTED | 23 | Transacción rechazada por el módulo antifraude |
|  |  |  | BANK_FRAUD_REJECTED | 23 | Transacción rechazada debido a sospecha de fraude en la entidad financiera |
|  |  |  | DIGITAL_CERTIFICATE_ NOT_FOUND | 9995 | Certificado digital no encontrado |
|  |  |  | BANK_UNREACHABLE | 9996 | Error tratando de comunicarse con el banco |
|  |  |  | ENTITY_MESSAGING _ERROR | 9997 | Error comunicándose con la entidad financiera |
|  |  |  | NOT_ACCEPTED_ TRANSACTION | 9998 | Transacción no permitida al tarjetahabiente |
|  |  |  | INTERNAL_PAYMENT _PROVIDER_ERROR | 9999 | Error interno |
|  |  |  | INACTIVE_PAYMENT_ PROVIDER | 9999 | Error interno |
| ERROR | 104 (Error) | 6 (Rechazada) | ERROR | 9999 | Error interno |
|  |  |  | ERROR_CONVERTING_TRANSACTION _AMOUNTS | 9999 | Error interno |
|  |  |  | BANK_ACCOUNT_ACTIVATION_ERROR | 9999 | Error interno |
|  |  |  | FIX_NOT_REQUIRED | 9999 | Error interno |
|  |  |  | AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL | 9999 | Error interno |
|  |  |  | AUTOMATICALLY_FIXED _AND_UNSUCCESS _REVERSAL | 9999 | Error interno |
|  |  |  | AUTOMATIC_FIXED_ NOT_SUPPORTED | 9999 | Error interno |
|  |  |  | NOT_FIXED_FOR_ ERROR_STATE | 9999 | Error interno |
|  |  |  | ERROR_FIXING_AND _REVERSING | 9999 | Error interno |
|  |  |  | ERROR_FIXING_ INCOMPLETE_DATA | 9999 | Error interno |
|  |  |  | PAYMENT_NETWORK_ BAD_RESPONSE | 9999 | Error interno |
|  |  |  | PAYMENT_NETWORK_ NO_CONNECTION | 9996 | No fue posible establecer comunicación con la entidad financiera |
|  |  |  | PAYMENT_NETWORK_ NO_RESPONSE | 9996 | No se recibió respuesta de la entidad financiera |
| EXPIRED | 5 (Expirada) | 5 (Expirada) | EXPIRED_TRANSACTION | 20 | Transacción expirada |
| PENDING | 7 (Pendiente) | 7 (Pendiente) | PENDING_TRANSACTION_ REVIEW | 15 | Transacción pendiente de aprobación (en validación manual) |
|  |  | 14 (Pendiente) | PENDING_TRANSACTION_ CONFIRMATION | 25 | Recibo de pago generado. En espera de pago |
|  |  | 7 (Pendiente) | PENDING_TRANSACTION_ TRANSMISSION | 9998 | Transacción no permitida |
|  |  | 14 (Pendiente) | PENDING_PAYMENT_IN_ENTITY | 25 | Recibo de pago generado. En espera de pago |
|  |  | 15 (Pendiente) | PENDING_PAYMENT_IN_BANK | 26 | Recibo de pago generado. En espera de pago |
|  |  | 10 (Pendiente) | PENDING_SENT_TO_FINANCIAL _ENTITY | 29 |   |
|  |  | 12 (Pendiente) | PENDING_AWAITING_PSE _CONFIRMATION | 9994 | En espera de confirmación de PSE |
|  |  | 18 (Pendiente) | PENDING_NOTIFYING_ENTITY | 25 | Recibo de pago generado. En espera de pago |

##  Códigos de Respuesta de la Página de Confirmación {#response-codes-sent-to-the-confirmation-page}

<div class="variables"></div>

| state_pol | response_message_pol | response_code_pol | Descripción |
|-|-|-|-|
| 4 (Aprobada) | APPROVED | 1 | Transacción aprobada |
| 6 (Declinada) | PAYMENT_NETWORK_REJECTED | 4 | Transacción rechazada por entidad financiera |
|  | ENTITY_DECLINED | 5 | Transacción rechazada por el banco |
|  | INSUFFICIENT_FUNDS | 6 | Fondos insuficientes |
|  | INVALID_CARD | 7 | Tarjeta inválida |
|  | CONTACT_THE_ENTITY | 8 | Contactar a la entidad financiera |
|  | BANK_ACCOUNT_ACTIVATION_ERROR | 8 | Débito automático no permitido |
|  | BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT | 8 | Débito automático no permitido |
|  | INVALID_AGENCY_BANK_ACCOUNT | 8 | Débito automático no permitido |
|  | INVALID_BANK_ACCOUNT | 8 | Débito automático no permitido |
|  | INVALID_BANK | 8 | Débito automático no permitido |
|  | EXPIRED_CARD | 9 | Tarjeta vencida |
|  | RESTRICTED_CARD | 10 | Tarjeta restringida |
|  | INVALID_EXPIRATION_DATE_OR _SECURITY_CODE | 12 | La fecha de expiración o el código de seguridad son inválidos |
|  | REPEAT_TRANSACTION | 13 | Reintentar pago |
|  | INVALID_TRANSACTION | 14 | Transacción inválida |
|  | EXCEEDED_AMOUNT | 17 | 	El valor excede el máximo permitido por la entidad |
|  | ABANDONED_TRANSACTION | 19 | Transacción abandonada por el pagador |
|  | CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS | 22 | Tarjeta no autorizada para comprar por internet |
|  | ANTIFRAUD_REJECTED | 23 | Transacción rechazada por sospecha de fraude |
|  | BANK_FRAUD_REJECTED | 23 | Transacción rechazada debido a sospecha de fraude en la entidad financiera |
|  | DIGITAL_CERTIFICATE_NOT_FOUND | 9995 | Certificado digital no encontrado |
|  | BANK_UNREACHABLE | 9996 | Error tratando de comunicarse con el banco |
|  | PAYMENT_NETWORK_NO_CONNECTION | 9996 | No fue posible establecer comunicación con la entidad financiera |
|  | PAYMENT_NETWORK_NO_RESPONSE | 9996 | No se recibió respuesta de la entidad financiera |
|  | ENTITY_MESSAGING_ERROR | 9997 | Error comunicándose con la entidad financiera |
|  | NOT_ACCEPTED_TRANSACTION | 9998 | Transacción no permitida |
|  | INTERNAL_PAYMENT_PROVIDER_ERROR | 9999 | Error interno |
|  | INACTIVE_PAYMENT_PROVIDER | 9999 | Error interno |
|  | ERROR | 9999 | Error interno |
|  | ERROR_CONVERTING_TRANSACTION _AMOUNTS | 9999 | Error interno |
|  | BANK_ACCOUNT_ACTIVATION_ERROR | 9999 | Error interno |
|  | FIX_NOT_REQUIRED | 9999 | Error interno |
|  | AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL | 9999 | Error interno |
|  | AUTOMATICALLY_FIXED_AND_UNSUCCESS _REVERSAL | 9999 | Error interno |
|  | AUTOMATIC_FIXED_NOT_SUPPORTED | 9999 | Error interno |
|  | NOT_FIXED_FOR_ERROR_STATE | 9999 | Error interno |
|  | ERROR_FIXING_AND_REVERSING | 9999 | Error interno |
|  | ERROR_FIXING_INCOMPLETE_DATA | 9999 | Error interno |
|  | PAYMENT_NETWORK_BAD_RESPONSE | 9999 | Error interno |
| 5 (Expirada) | EXPIRED_TRANSACTION | 20 | Transacción expirada |

## Códigos de los Métodos de Pago {#codes-of-the-payment-methods}
Los siguientes códigos aplican para `payment_method_type` (Página de confirmación), `payment_method_id` (Página de confirmación) y `polPaymentMethodType` (Página de respuesta).

| Código | lapPaymentMethodType<br>(Página de respuesta) | Descripción                   |
|:------:|-----------------------------------------------|-------------------------------|
|    2   | CREDIT_CARD                                   | Tarjetas de Crédito           |
|    4   | PSE                                           | Transferencias bancarias PSE  |
|    5   | ACH                                           | Débitos ACH                   |
|    6   | DEBIT_CARD                                    | Tarjetas débito               |
|    7   | CASH                                          | Efectivo                      |
|    8   | REFERENCED                                    | Referencia de pago            |
|   10   | BANK_REFERENCED                               | Pago en bancos                |
|   14   | SPEI                                          | Transferencias bancarias SPEI |

## Comandos Aceptados por la API de Pagos {#commands-accepted-by-the-payments-api}

| Comando               | Descripción                                       |
|-----------------------|---------------------------------------------------|
| `PING`                | Utilizado para realizar ping al servicio.                             |
| `SUBMIT_TRANSACTION`  | Utilizado para enviar transacciones de cualquier tipo.                |
| `GET_PAYMENT_METHODS` | Utilizado para consultar los métodos de pago disponibles para el comercio. |
| `GET_BANKS_LIST`      | Utilizado para obtener el listado de bancos para las transacciones con PSE. |

## Comandos Aceptados por la API de Consultas {#commands-accepted-by-the-query-api}

| Comando                          | Descripción                                          |
|----------------------------------|------------------------------------------------------|
| `PING`                           | Utilizado para realizar ping al servicio.            |
| `ORDER_DETAIL`                   | Utilizado para consultar una orden utilizado su identificador. |
| `ORDER_DETAIL_BY_REFERENCE_CODE` | Utilizado para consultar una orden utilizado su código de referencia. |
| `TRANSACTION_RESPONSE_DETAIL`    | Utilizado para consultar la respuesta de una transacción.   |

## Divisas Aceptadas {#accepted-currencies}

| Moneda   | Nombre          |
|----------|----------------------|
| `ARS`    | Peso argentino       |
| `BRL`    | Real brasileño       |
| `CLP`    | Peso chileno         |
| `COP`    | Peso colombiano      |
| `CRC`    | Colón costarricense  |
| `GTQ`    | Quetzal guatemalteco |
| `HNL`    | Lempira hondureño    |
| `MXN`    | Peso mexicano        |
| `PEN`    | Nuevo Sol peruano    |
| `SVC`    | Colón salvadoreño    |
| `USD`    | Dólar estadounidense  |

## Estados de la Orden {#order-status}

| Estado        | Descripción                                                     |
|---------------|-----------------------------------------------------------------|
| `NEW`         | La orden fue creada en el sistema.                              |
| `IN_PROGRESS` | La orden está siendo procesada.                                 |
| `AUTHORIZED`  | El último estado de la orden es una autorización aprobada.      |
| `CAPTURED`    | El último estado de la orden es una captura aprobada.           |
| `CANCELLED`   | El último estado de la orden es una cancelación aprobada.       |
| `DECLINED`    | El último estado de la orden fue declinada.                     |
| `REFUNDED`    | El último estado de la orden es un reembolso aprobado.          |
| `CHARGEBACK`  | El último estado de la orden es un Contracargo. Es decir, corresponde a una [Dispute]({{< ref "Disputes.md" >}}) perdida.      |

## Estados de la Transacción {#transaction-states}

| Estado      | Descripción                                                                |
|-------------|----------------------------------------------------------------------------|
| `APPROVED`  | Transacción aprobada.                                                      |
| `DECLINED`  | Transacción rechazada.                                                     |
| `ERROR`     | Error procesando la transacción.                                           |
| `EXPIRED`   | Transacción expirada.                                                      |
| `PENDING`   | Transacción pendiente o en validación                                      |
| `SUBMITTED` | Transacción enviada a la entidad financiera y por algún motivo no terminó su procesamiento.<br>Sólo aplica para la API de reportes.|

## Tipos de Transacción {#transaction-types} 

| Tipo                        | Descripción                                                |
|-----------------------------|------------------------------------------------------------|
| `AUTHORIZATION`             | Transacción de autorización.                               |
| `AUTHORIZATION_AND_CAPTURE` | Transacción de cobro, Autorización y captura en un paso.   |
| `CAPTURE`                   | Transacción de captura.                                    |
| `VOID`                      | Transacción de cancelación de una autorización.            |
| `REFUND`                    | Transacción de reembolso o cancelación de una captura.     |

## Paises de Pago {#processing-countries}

| Código del país  | País   |
|-------|---------------|
| `AR`  | Argentina     |
| `BR`  | Brasil        |
| `CL`  | Chile         |
| `CO`  | Colombia      |
| `CR`  | Costa Rica    |
| `GT`  | Guatemala     |
| `HN`  | Honduras      |
| `MX`  | México        |
| `PA`  | Panamá        |
| `PE`  | Perú          |
| `SV`  | El Salvador   |

## Idiomas Soportados {#supported-languages}

| Código ISO 639 | Idioma     |
|----------------|------------|
| `en`           | Inglés     |
| `es`           | Español    |
| `pt`           | Portugués  |

## Tipos de Documento {#document-types}

| ISO  | Descripción                                | País                   |
|------|--------------------------------------------|------------------------|
| CC   | Cédula de ciudadanía.                      | Colombia               |
| CE   | Cédula de extranjería.                     | Colombia, Perú         |
| CEL  | En caso de identificarse a través de la línea del móvil.    | Colombia        |
| CEP  | Comprobante Electrónico de Pago.                      | México                |
| CI   | Cédula de Identidad.                                  | Argentina, Chile      |
| CNPJ | Registro Nacional de Personas Jurídicas.              | Brasil                |
| CPF  | Registro de Personas físicas.                         | Brasil                |
| CUIL | Código Único de Identificación Laboral.               | Argentina             |
| CUIT | Código Único de Identificación Tributaria.            | Argentina             |
| CURP | Clave Única de Registro de Población.                 | México                |
| DE   | Documento de identificación extranjero.               | Perú                  |
| DL   | Licencia de Conducción.                               |                       |
| DNI  | Documento Nacional de Identidad.                      | Argentina, Perú, Chile |
| DNIE | Documento Nacional de Identidad - Electrónico.        | Argentina, Perú, Chile |
| EIN  | Número de identificación del empleador.               | Perú                   |
| ID   | Identificación.                         |                         |
| IDC  | Identificador único de cliente, para el caso de ID’s únicos de clientes / usuarios de servicios públicos. |  |
| IFE  | Instituto Federal Electoral.            | México                  |
| LC   | Libreta Cívica.                         | Argentina               |
| LE   | Libreta de Enrolamiento.                | Argentina               |
| NIF  | Número de Identificación Financiera.    |                         |
| NIT  | Número de Identificación Tributaria.    | Colombia                |
| PP   | Pasaporte.                              |                         |
| RC   | Registro civil de nacimiento.           | Colombia                |
| RDE  | Tipo de documento RDE.                  |                         |
| RE   | Tipo de documento RE.                   |                         |
| RFC  | Registro Federal de Contribuyentes.     | México                  |
| RIF  | Registro de Información Fiscal.         |                         |
| RM   | Registro Mercantil.                     |                         |
| RMC  | Registro Mercantil Consular.            |                         |
| RNC  | Registro Nacional de Contribuyentes.    |                         |
| RUC  | Registro Único de Contribuyentes.       | Perú                    |
| RUN  | Rol Único Nacional.                     | Chile                   |
| RUT  | Rol Único Tributario.                   | Chile                   |
| SC   | Salvoconducto.                          |                         |
| SIEM | Sistema de Información Empresarial Mexicano.    | México          |
| SSN  | Número de Seguridad Social.             |                         |
| TI   | Tarjeta de Identidad.                   | Colombia                |

## Bancos para Payouts {#banks-for-payouts}
Envía el valor exacto mostrado en la columna `Código` en la variable `transfers[n].bankAccount.bankCode`. Consulta [Payouts]({{< ref "Payouts-API.md" >}}) para más información.

### Colombia

| Código    | Nombre del banco                                  |
|-----------|---------------------------------------------------|
| `001`     | BOGOTA                                            |
| `002`     | POPULAR                                           |
| `006`     | ITAU CORPBANCA                                    |
| `007`     | BANCOLOMBIA                                       |
| `009`     | CITIBANK COLOMBIA                                 |
| `012`     | GNB SUDAMERIS                                     |
| `014`     | ITAU                                              |
| `013`     | BBVA                                              |
| `019`     | SCOTIABANK                                        |
| `023`     | BANCO DE OCCIDENTE                                |
| `031`     | BANCOLDEX                                         |
| `032`     | BCSC                                              |
| `040`     | BANCO AGRARIO                                     | 
| `041`     | JPMORGAN                                          |
| `042`     | BNP PARIBAS                                       |
| `047`     | MUNDOMUJER                                        |
| `051`     | DAVIVIENDA                                        |
| `052`     | AV VILLAS                                         |
| `053`     | BANCO WWB                                         |
| `059`     | BANCAMIA                                          |
| `060`     | PICHINCHA                                         |
| `061`     | BANCOOMEVA                                        |
| `062`     | FALABELLA                                         |
| `063`     | FINANDINA                                         |
| `065`     | BCO SANTANDER DE NEGOCIOS                         |
| `066`     | COOPCENTRAL                                       |
| `067`     | COOMPARTIR                                        |
| `069`     | BANCO SERFINANZA                                  |
| `070`     | LULO BANK                                         |
| `071`     | BANCO JP MORGAN COLOMBIA                          |
| `083`     | COMPENSAR                                         |
| `084`     | APORTES EN LINEA (GESTION Y CONTACTO)             |
| `086`     | ASOPAGOS                                          |
| `087`     | FEDECAJAS                                         |
| `088`     | SIMPLE                                            |
| `089`     | ENLACE OPERATIVO                                  |
| `090`     | CORFICOLOMBIANA                                   |
| `121`     | JURISCOOP                                         |
| `283`     | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `289`     | COTRAFA                                           |
| `292`     | CONFIAR COOPERATIVA FINANCIERA                    |
| `370`     | COLTEFINANCIERA S.A. - COMPANIA DE FINANCIAMIENTO |
| `507`     | NEQUI                                             |
| `550`     | DECEVAL                                           |
| `558 `    | CREDIFINANCIERA S.A.                              |
| `683`     | DGCPTN                                            |
| `685`     | DGCPTN-REGALIAS                                   |
| `801`     | MOVII                                             |
| `1062`    | BANCO FALABELLA S.A.                              |
| `1063`    | BANCO FINANDINA S.A.                              |
| `1069`    | BANCO SERFINANZA S.A.                             |
| `1283`    | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `1291`    | COOFINEP                                          |
| `1292`    | CONFIAR COOPERATIVA FINANCIERA                    |
| `1303`    | GIROS Y FINANZAS                                  |
| `1637`    | IRIS                                              |
