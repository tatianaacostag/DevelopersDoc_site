---
title: "Autenticação 3DS Externa"
linkTitle: "Autenticação 3DS Externa"
date: 2024-07-01T11:32:55-05:00
description: >
  Aproveite seu serviço 3DS existente para aprimorar a segurança de pagamento com a integração passthrough da PayU.
weight: 22
tags: ["subtopic"]
---

## Aproveitando a Autenticação 3DS Externa

Se você possui seu próprio serviço de autenticação 3DS, pode integrá-lo perfeitamente com a PayU. Essa abordagem também é conhecida como **passthrough** e permite que você gerencie o processo de autenticação diretamente com o Merchant Plug-in (MPI) ou servidor 3DS escolhido.

{{% alert title="Observações" color="info"%}}

* A autenticação 3DS para PayU Latam está disponível apenas para **Argentina**, **Brasil**, **Colômbia**, **México** e **Peru**.
* Esse recurso requer uma integração via API e não está disponível para integração com Webcheckout.
* **Redes atualmente suportadas:** Visa e Mastercard

{{% /alert %}}

## Como Funciona

* **Utilize seu serviço 3DS existente:** A PayU se integra perfeitamente ao seu provedor preferido para um fluxo de trabalho tranquilo.
* **Gerencie a autenticação:** Você gerencia a comunicação entre sua plataforma e o serviço 3DS.
* **Envie a resposta para a PayU:** Inclua a resposta de autenticação do seu serviço 3DS em sua solicitação de pagamento à PayU.

### Considerações Importantes

* **Serviços independentes:** Seu serviço 3DS opera independentemente do serviço de autorização da PayU.
* **Dados combinados necessários:** Para o processamento bem-sucedido do pagamento, sua solicitação de autorização PayU deve incluir a resposta de autenticação do seu serviço 3DS.

## Parâmetros da API para Autenticação 3DS

Quando você usa seu próprio serviço 3DS com o método de passthrough, inclua os seguintes campos da API na sua solicitação de pagamento para a PayU:

| Campo | Tipo | Tamanho | Descrição |
|-------|------|---------|-----------|
| `transaction > threeDomainSecure` | Objeto |  | Fornece as informações para a autenticação 3DS 2.0. |
| `transaction > threeDomainSecure > embedded` | Booleano |  | Defina como `true` para usar um MPI incorporado no processo de Autorização. O valor padrão é `false`. |
| `transaction > threeDomainSecure > eci` | Numérico | Máx: 2 | Representa o Indicador de Comércio Eletrônico (ECI).<br>O servidor de diretório retorna esse valor para indicar a tentativa de autenticação.<br>Este parâmetro se torna obrigatório quando você define `transaction.threeDomainSecure.embedded` como `false` e inclui `transaction.threeDomainSecure.xid`. |
| `transaction > threeDomainSecure > cavv` | Alfanumérico | Máx: 28 | Fornece o Valor de Verificação de Autenticação do Portador do Cartão (CAVV).<br>Esse código criptográfico, em Base64, autentica a transação.<br>Dependendo dos códigos ECI definidos pela rede processadora, esse valor pode ser opcional. |
| `transaction > threeDomainSecure > xid` | Alfanumérico | Máx: 28 | Identifica a transação com o ID que o MPI retorna em Base64.<br>Este parâmetro se torna obrigatório quando você define `transaction.threeDomainSecure.embedded` como `false` e inclui `transaction.threeDomainSecure.eci`. |
| `transaction > threeDomainSecure > directoryServerTransactionId` | Alfanumérico | Máx: 36 | Identifica a transação com o ID que o servidor de diretório gera durante a autenticação. |

## Exemplo de Requisição

O exemplo a seguir, em formato JSON, mostra como estruturar uma requisição de pagamento que inclui os dados de autenticação 3DS externa utilizando o método passthrough:

```json
{
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "type": "AUTHORIZATION_AND_CAPTURE or AUTHORIZATION",
        "paymentMethod": "VISA",
        "paymentCountry": "AR, BR, CO, MX or PE",
        "ipAddress": "170.198.69.98",
        "userAgent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:5.3) Gecko/20100101 Firefox/5.3.5",
        "cookie": "9btoljd0qgr6ymppx0iker0o72",
        "deviceSessionId": "867451dba1eda5984f2f67b36b93be3",
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5150030090050182",
            "expirationDate": "2028/01",
            "securityCode": "777"
        },
        "threeDomainSecure": {
            "embedded": false,
            "eci": "05",
            "cavv": "MTIzNDU2Nzg5MDA5ODc2XTQzMjE=",
            "xid": "Nmp3VFdWMlEwZ05pWXN3SGo4TDA=",
            "directoryServerTransactionId": "f25084f0-5b16-4c0a-ae5d-b24808a95e9b"
        },
        "payer": {
            ...
            "billingAddress": {...}
        },
        "order": {
            "accountId": "512322",
            ...
            "buyer": {
                ...
                "shippingAddress": {...}
            },
            "shippingAddress": {...},
            "additionalValues": {
                "TX_VALUE": {
                    "value": "10000",
                    "currency": "ARS, BRL, COP, MXN or PEN"
                },
                "TX_TAX": {...},
                "TX_TAX_RETURN_BASE": {...}
            }
        }
    },
    "test": false
}
```

## Documentação Específica do País

Para obter instruções detalhadas sobre como incluir parâmetros de resposta de autenticação em sua solicitação, consulte a documentação do seu país de processamento:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Argentina.md#parameters-for-request-and-response" >}}'><img src="/assets/Argentina.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#parameters-for-request-and-response" >}}'><img src="/assets/Brasil.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#parameters-for-request-and-response" >}}'><img src="/assets/Colombia.png" width="16%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
      <a href='{{< ref "Payments-API-Mexico.md#parameters-for-request-and-response" >}}'><img src="/assets/Mexico.png" width="16%"/></a>
    </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Peru.md#parameters-for-request-and-response" >}}'><img src="/assets/Peru.png" width="16%"/></a>
  </div>
</div>
<br>
