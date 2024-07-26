---
title: "Autenticação 3DS Realizada pela PayU"
linkTitle: "Autenticação 3DS Realizada pela PayU"
date: 2024-07-01T11:32:55-05:00
description: >
  A autenticação 3DS realizada pela PayU elimina a necessidade de você gerenciar o processo de integração 3DS. A PayU cuida de tudo, desde a comunicação com o banco emissor até o gerenciamento do fluxo de autenticação.  
weight: 21
tags: ["subtopic"]
---

## Como Usar a Autenticação 3DS da PayU
Para usar a autenticação 3DS, os lojistas precisam estar registrados para este serviço com a PayU. Uma vez registrado, você pode incluir um novo parâmetro chamado `req3DSAuthentication` em suas solicitações de pagamento por meio da API de Pagamentos da PayU.

{{% alert title="Observação" color="info"%}}
A autenticação 3DS para PayU Latam está disponível apenas para **Argentina**, **Brasil**, **Colômbia** e **Peru**.
{{% /alert %}}

### Parâmetro `req3DSAuthentication`
Este parâmetro permite controlar se a autenticação 3DS é necessária para cada transação. Ele aceita dois valores:
* `"true"`: Impõe a autenticação 3DS para a transação.
* `"false"`: Desativa a autenticação 3DS para a transação.

**Se `req3DSAuthentication` não estiver incluído,** a PayU decidirá se deve realizar a autenticação 3DS com base em sua própria avaliação de risco.

**Exemplo de uma Solicitação:**
No exemplo de solicitação abaixo, o `req3DSAuthentication` está definido como `true`:

```JSON
{
    "language": "es",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "X",
        "apiKey": "X"
    },
    "transaction": {
        "order": {
            "accountId": "1",
            "referenceCode": "payment_test_00000001",
            "description": "payment test",
            "language": "es",
            "notifyUrl": "http://www.tes.com/confirmation",
            "additionalValues": {
                "TX_VALUE": {
                    "value": 20000,
                    "currency": "COP"
                }
            },
            "buyer": {
                "merchantBuyerId": "1",
                "fullName": "Test",
                "emailAddress": "buyer_test@test.com",
                "contactPhone": "(11)756312633",
                "dniNumber": "X",
                "cnpj": "X",
                "shippingAddress": {
                    "street1": "calle 100",
                    "street2": "5555487",
                    "city": "Sao paulo",
                    "state": "SP",
                    "country": "CO",
                    "postalCode": "01019-030",
                    "phone": "(11)756312633"
                }
            }
        },
        "payer": {
            "merchantPayerId": "1",
            "fullName": "First name and second payer name",
            "emailAddress": "payer_test@test.com",
            "contactPhone": "7563126",
            "dniNumber": "5415668464654",
            "billingAddress": {
                "street1": "Av. Isabel La Católica 103-La Victoria",
                "street2": "125544",
                "city": "Lima",
                "state": "Lima y Callao",
                "country": "PE",
                "postalCode": "000000",
                "phone": "7563126"
            }
        },
        "creditCard": {
            "number": "X",
            "securityCode": "X",
            "expirationDate": "X",
            "name": "APPROVED"
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1
        },
        "req3DSAuthentication": "true",
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "VISA",
        "ipAddress": "127.0.0.1",
        "integrationMethod": "STANDARD_HTML_v4_0",
        "source": "WEB"
    },
    "test": false
}
```

## Resposta da Transação e Fluxo de Autenticação
Ao enviar uma solicitação de pagamento, você receberá uma resposta com o estado `"PENDING"` para a transação. Essa resposta também incluirá um campo em `extraParameters` chamado `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** Essa URL deve ser usada para redirecionar o pagador para concluir o processo de autenticação 3DS. O processo de autenticação pode envolver desafios como inserir uma senha única (OTP) recebida em seu telefone.

**Exemplo de uma resposta**
No exemplo de resposta abaixo, o lojista redireciona o pagador para `https://merch-prod.payu.com`:

```JSON
{
    "code": "SUCCESS",
    "error": null,
    "transactionResponse": {
        "orderId": 1427471957,
        "transactionId": "53dc40a4-ef00-4637-9578-941421f6fd7e",
        "state": "PENDING",
        "paymentNetworkResponseCode": null,
        "paymentNetworkResponseErrorMessage": null,
        "trazabilityCode": null,
        "authorizationCode": null,
        "pendingReason": "AWAITING_THREEDS_CALLBACK",
        "responseCode": "PENDING_THREEDS_CALLBACK",
        "errorCode": null,
        "responseMessage": null,
        "transactionDate": null,
        "transactionTime": null,
        "operationDate": 1712909903010,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com/threeds/?authenticationId=6c38fbd4-e643-49e6-be75-1okhfe02a71"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": null,
            "responseNetworkMessage": null,
            "travelAgencyAuthorizationCode": null,
            "cardType": "CREDIT",
            "transactionType": "AUTHORIZATION_AND_CAPTURE"
        }
    }
}
```

## Após a Autenticação
Depois que o pagador conclui a autenticação 3DS (se necessário), a PayU receberá uma notificação. A transação será então:

* **Concluída:** Se a autenticação for bem-sucedida.
* **Recusada:** Se a autenticação falhar.

## Redirecionamento Após a Autenticação
Após o redirecionamento do pagador da `THREEDS_AUTH_REDIRECT_URL`, ele será direcionado para:

* **Página de status da transação do Checkout PayU:** Por padrão, esse é o comportamento se o lojista não tiver especificado uma URL de retorno personalizada.
* **URL de retorno personalizada do lojista:** Se fornecida, o pagador será redirecionado para a página designada do lojista após a autenticação.

