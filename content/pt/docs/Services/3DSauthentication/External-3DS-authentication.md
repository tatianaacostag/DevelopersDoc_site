---
title: "Autenticação 3DS externa"
linkTitle: "Autenticação 3DS externa"
date: 2024-07-01T11:32:55-05:00
description: >
  Aproveite seu serviço 3DS existente para aprimorar a segurança de pagamento com a integração passthrough da PayU.
weight: 22
tags: ["subtopic"]
---

## Aproveitando a autenticação 3DS externa
Se você possui seu próprio serviço de autenticação 3DS, pode integrá-lo perfeitamente com a PayU. Essa abordagem também é conhecida como **passthrough** e permite que você gerencie o processo de autenticação diretamente com o Merchant Plug-in (MPI) ou servidor 3DS escolhido.

{{% alert title="Observações" color="info"%}}
* A autenticação 3DS para PayU Latam está disponível apenas para **Argentina**, **Brasil**, **Colômbia** e **Peru**.
* Atualmente, o passthrough para autenticadores 3DS externos está disponível para integrações de API com a plataforma PayU Latam. Entre em contato com o seu representante de vendas para obter detalhes.
* **Redes atualmente suportadas:** Visa e Mastercard
{{% /alert %}}

## Como funciona

* **Utilize seu serviço 3DS existente:** A PayU se integra perfeitamente ao seu provedor preferido para um fluxo de trabalho tranquilo.
* **Gerencie a autenticação:** Você gerencia a comunicação entre sua plataforma e o serviço 3DS.
* **Envie a resposta para a PayU:** Inclua a resposta de autenticação do seu serviço 3DS em sua solicitação de pagamento à PayU.

### Considerações importantes

* **Serviços independentes:** Seu serviço 3DS opera independentemente do serviço de autorização da PayU.
* **Dados combinados necessários:** Para o processamento bem-sucedido do pagamento, sua solicitação de autorização PayU deve incluir a resposta de autenticação do seu serviço 3DS.

## Documentação específica do país

Para obter instruções detalhadas sobre como incluir parâmetros de resposta de autenticação em sua solicitação, consulte a documentação do seu país de processamento:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#considerations" >}}'><img src="/assets/Argentina.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="20%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#considerations" >}}'><img src="/assets/Peru.png" width="20%"/></a>
  </div>
</div>
<br>
