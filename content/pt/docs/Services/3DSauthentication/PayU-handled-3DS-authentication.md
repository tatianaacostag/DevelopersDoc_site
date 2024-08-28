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
    "language": "en",
    "command": "SUBMIT_TRANSACTION",
    "merchant": {
        "apiLogin": "pRRXKOl8ikMmt9u",
        "apiKey": "4Vj8eK4rloUd272L48hsrarnUA"
    },
    "transaction": {
        "order": {
            "language": "en",
            "signature": "8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485",
            "accountId": "512321",
            "description": "PayULatamAPI|Test|CO|COL",
            "referenceCode": "REFERENCIA_PRUEBA_12345",
            "notifyUrl": "https://merchant-mywebhook.com",
            "buyer": {
                "merchantBuyerId": "Merchant_Buyer_ID_123",
                "fullName": "John Doe",
                "emailAddress": "john.doe@email.com",
                "contactPhone": "3155555555",
                "dniType": "CC",
                "dniNumber": "123456789",
                "shippingAddress": {
                    "country": "CO",
                    "state": "DC",
                    "city": "Bogotá",
                    "postalCode": "110111",
                    "street1": "Calle 100",
                    "street2": "Cra 9",
                    "phone": "6011234567"
                }
            },
            "shippingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            },
            "additionalValues": {
                "TX_VALUE": {
                    "value": "100",
                    "currency": "COP"
                },
                "TX_TAX": {
                    "value": "0",
                    "currency": "COP"
                },
                "TX_TAX_RETURN_BASE": {
                    "value": "0",
                    "currency": "COP"
                }
            }
        },
        "payer": {
            "merchantPayerId": "Merchant_Payer_ID_123",
            "fullName": "John Doe",
            "emailAddress": "john.doe@email.com",
            "contactPhone": "3155555555",
            "dniType": "CC",
            "dniNumber": "123456789",
            "billingAddress": {
                "country": "CO",
                "state": "DC",
                "city": "Bogotá",
                "postalCode": "110111",
                "street1": "Calle 100",
                "street2": "Cra 9",
                "phone": "6011234567"
            }
        },
        "creditCard": {
            "name": "APPROVED",
            "number": "5570898637920584",
            "expirationDate": "2025/12",
            "securityCode": "777",
            "processWithoutCvv2": false
        },
        "extraParameters": {
            "INSTALLMENTS_NUMBER": 1,
            "RESPONSE_URL": "https://merchant.shoppingresult.com"
        },
        "type": "AUTHORIZATION_AND_CAPTURE",
        "paymentMethod": "MASTERCARD",
        "paymentCountry": "CO",
        "ipAddress": "45.6.10.241",
        "userAgent": "Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0",
        "cookie": "sefejihsxeai037qhkwa3jex9",
        "deviceSessionId": "cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537",
        "integrationMethod": "POST_API_v4_0",
        "req3DSAuthentication": "true",
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
        "orderId": 3344440141,
        "transactionId": "968d3f37-25aa-4fc2-86bf-0a2eee091713",
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
        "operationDate": 1723749925205,
        "referenceQuestionnaire": null,
        "extraParameters": {
            "BANK_REFERENCED_CODE": "CREDIT",
            "THREEDS_AUTH_REDIRECT_URL": "https://secure.payu.com/front/threeds/?authenticationId=a27e4aa7-1a24-48d1-a9a6-03f463e048e4"
        },
        "additionalInfo": {
            "paymentNetwork": "CREDIBANCO_V2",
            "rejectionType": "NONE",
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

