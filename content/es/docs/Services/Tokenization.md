---
title: "Tokenización"
linkTitle: "Tokenización"
date: 2021-03-26T09:34:59-05:00
description: >
  La Tokenización te permite guardar de forma segura la información de las tarjetas de crédito de tus clientes a través de la creación de un token. Este token te permite realizar pagos regulares o implementar la funcionalidad de _Pago a un clic_, siguiendo los estándares de seguridad de PCI DSS (Payment Card Industry Data Security Standard) para manejar la información de las tarjetas de crédito.
weight: 30
---

Para utilizar la funcionalidad de Tokenización, necesitas habilitarlo en tu cuenta de PayU. Para esto, contacta a tu representante de ventas:

<div style="display: flex;">
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Argentina.png" width="25px"/> <a href="comercios.ar@payu.com">comercios.ar@payu.com</a></li>
      <li><img src="/assets/Brasil.png" width="25px"/> <a href="comercios.br@payu.com">comercios.br@payu.com</a></li>
      <li><img src="/assets/Chile.png" width="25px"/> <a href="comercios.cl@payu.com">comercios.cl@payu.com</a></li>
      <li><img src="/assets/Colombia.png" width="25px"/> <a href="comercios.co@payu.com">comercios.co@payu.com</a></li>
    </ul>
  </div>
  <div style="float: left;width: 50%;">
    <ul>
      <li><img src="/assets/Mexico.png" width="25px"/> <a href="comercios.mx@payu.com">comercios.mx@payu.com</a></li>
      <li><img src="/assets/Panama.png" width="25px"/> <a href="comercios.pa@payu.com">comercios.pa@payu.com</a></li>
      <li><img src="/assets/Peru.png" width="25px"/> <a href="comercios.pe@payu.com">comercios.pe@payu.com</a></li>
    </ul>
  </div>
</div>

## ¿Cómo funciona la Tokenización? {#how-does-tokenization-work}
Tokenización incluye dos procesos separados:

### Generar token {#generate-token}
El primer proceso te permite guardar la información de una tarjeta de crédito. Esta información es transformada en un token para que lo puedas utilizar luego.

<img src="/assets/Tokenization/tokenizacion1-es.png" width="50%"/>

### Realizar cobros {#make-charges}
Luego de que tengas la información de una tarjeta de crédito almacenada en un token, puedes utilizarla para realizar pagos periódicos de acuerdo con tus necesidades y tu cliente no tiene que entregarte la información de su tarjeta de crédito cada vez que requieres un pago.

<img src="/assets/Tokenization/tokenizacion2-es.png" width="50%"/><br>

Además, la funcionalidad de tokenización le permite almacenar, remover o cobrar varias tarjetas de crédito enviando un archivo codificado en Base64.

## ¿Qué sigue? {#whats-next}
La integración con esta funcionalidad puede realizarse con cualquiera de nuestros tipos de integración:

* [Para integración API, consulta este artículo]({{< ref "Tokenization-API.md" >}})
* [Para integración SDK, consulta este artículo]({{< ref "TokenizationSDK.md" >}})
