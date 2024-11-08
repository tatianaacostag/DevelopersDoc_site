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

* A autenticação 3DS para PayU Latam está disponível apenas para **Argentina**, **Brasil**, **Colômbia** e **Peru**.
* **Redes atualmente suportadas:** Visa e Mastercard.

{{% /alert %}}

### Parâmetro `req3DSAuthentication`

Este parâmetro permite controlar se a autenticação 3DS é necessária para cada transação. Ele aceita dois valores:

* `"true"`: Impõe a autenticação 3DS para a transação.
* `"false"`: Desativa a autenticação 3DS para a transação.

**Se `req3DSAuthentication` não estiver incluído,** a PayU decidirá se deve realizar a autenticação 3DS com base em sua própria avaliação de risco.

#### Exemplo de uma Solicitação

No exemplo de solicitação abaixo, o `req3DSAuthentication` está definido como `true`:

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Solicitação:
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
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma Solicitação:
```XML
<request>
    <isTest>false</isTest>
    <language>en</language>
    <command>SUBMIT_TRANSACTION</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <transaction>
        <type>AUTHORIZATION_AND_CAPTURE</type>
        <paymentMethod>MASTERCARD</paymentMethod>
        <paymentCountry>CO</paymentCountry>
        <ipAddress>247.123.24.168</ipAddress>
        <userAgent>Mozilla/5.0 (Windows NT 5.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0.7</userAgent>
        <cookie>gp8pv8673fia31cevhcrakbwt</cookie>
        <deviceSessionId>901129f3909f8ca8bdacc67199a29a15edfc3a059b76d7fecf601bb5343847f8</deviceSessionId>
        <req3DSAuthentication>true</req3DSAuthentication>
        <extraParameters>
            <entry>
                <string>INSTALLMENTS_NUMBER</string>
                <string>1</string>
            </entry>
            <entry>
                <string>RESPONSE_URL</string>
                <string>https://www.yoursite.com/response-page</string>
            </entry>
        </extraParameters>
        <order>
            <language>es</language>
            <signature>cfe3eaeb7af1bd6e9e4cb7d50f8f0afb6b9452fc0936d879d1942e78fe8d03f3</signature>
            <accountId>516686</accountId>
            <description>PayULatam|Test|CO|COP|OneStep|WithCVV2|Untokenized</description>
            <referenceCode>Postman|UniqueReference|10/24/2024, 2:09:07 PM</referenceCode>
            <notifyUrl>https://www.yoursite.com/confirmation-page</notifyUrl>
            <additionalValues>
                <entry>
                    <string>TX_VALUE</string>
                    <additionalValue>
                        <value>5629338</value>
                        <currency>COP</currency>
                    </additionalValue>
                    <string>TX_TAX</string>
                    <additionalValue>
                        <value>898802</value>
                        <currency>COP</currency>
                    </additionalValue>
                    <string>TX_TAX_RETURN_BASE</string>
                    <additionalValue>
                        <value>4730536</value>
                        <currency>COP</currency>
                    </additionalValue>
                </entry>
            </additionalValues>
            <buyer>
                <merchantBuyerId>Merchant_Buyer_ID_91</merchantBuyerId>
                <fullName>May Wehner</fullName>
                <emailAddress>Leslie_Armstrong3@example.com</emailAddress>
                <contactPhone>3185555555</contactPhone>
                <dniType>CC</dniType>
                <dniNumber>1337727983</dniNumber>
                <shippingAddress>
                    <country>CO</country>
                    <state>DC</state>
                    <city>Bogotá</city>
                    <postalCode>110111</postalCode>
                    <street1>93357 Damian Ports</street1>
                    <street2>786 Jordyn Spurs</street2>
                    <phone>6016540721</phone>
                </shippingAddress>
            </buyer>
            <shippingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>988 Steve Burg</street1>
                <street2>48419 Schimmel Springs</street2>
                <phone>6016540721</phone>
            </shippingAddress>
        </order>
        <payer>
            <merchantPayerId>Merchant_Payer_ID_80</merchantPayerId>
            <fullName>Marguerite Koss</fullName>
            <emailAddress>Lelia.Trantow@example.org</emailAddress>
            <contactPhone>3155555555</contactPhone>
            <dniType>CC</dniType>
            <dniNumber>9589714725</dniNumber>
            <billingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>46217 Nikolaus Mills</street1>
                <street2>28333 Webster Islands</street2>
                <phone>6016540721</phone>
            </billingAddress>
        </payer>
        <creditCard>
            <name>APPROVED</name>
            <number>5570898637920584</number>
            <expirationDate>2025/02</expirationDate>
            <securityCode>777</securityCode>
        </creditCard>
    </transaction>
</request>

```

{{< /tab >}}
{{< /tabs >}}

## Testando a Autenticação 3DS

Para testar o processo de autenticação 3DS, utilize os valores fictícios fornecidos na tabela abaixo. Esses valores são aplicáveis aos diferentes métodos de pagamento disponíveis em cada país:

<table>
  <tr>
    <th></th>
    <th><img src="/assets/Argentina.png" width="25px"/> &nbsp;Argentina</th>
    <th><img src="/assets/Brasil.png" width="25px"/> &nbsp;Brasil</th>
    <th><img src="/assets/Colombia.png" width="25px"/> &nbsp;Colômbia</th>
    <th><img src="/assets/Peru.png" width="25px"/> &nbsp;Peru</th>
  </tr>
  <tr>
    <th>Account ID</th>
    <td>516684</td>
    <td>516685</td>
    <td>516686</td>
    <td>516688</td>
  </tr>
  <tr>
    <th>Merchant ID</th>
    <td colspan="4" style="text-align: center;">508029</td>
  </tr>
  <tr>
    <th>API Login</th>
    <td colspan="4" style="text-align: center;">pRRXKOl8ikMmt9u</td>
  </tr>
  <tr>
    <th>API Key</th>
    <td colspan="4" style="text-align: center;">4Vj8eK4rloUd272L48hsrarnUA</td>
  </tr>
  <tr>
    <th>Public Key</th>
    <td colspan="4" style="text-align: center;">PKaC6H4cEDJD919n705L544kSU</td>
  </tr>
</table>

{{% alert title="Nota" color="info"%}} 

Esses IDs de conta são apenas para fins de teste, não os utilize em ambientes de produção. 

{{% /alert %}}

## Resposta da Transação e Fluxo de Autenticação

Ao enviar uma solicitação de pagamento, você receberá uma resposta com o estado `"PENDING"` para a transação. Essa resposta também incluirá um campo em `extraParameters` chamado `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** Essa URL deve ser usada para redirecionar o pagador para concluir o processo de autenticação 3DS. O processo de autenticação pode envolver desafios como inserir uma senha única (OTP) recebida em seu telefone.

#### Exemplo de uma Resposta

No exemplo de resposta abaixo, o lojista redireciona o pagador para `https://merch-prod.payu.com`:

{{< tabs tabTotal="2" tabID="2" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>

Exemplo de uma Resposta:
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
            "THREEDS_AUTH_REDIRECT_URL": "https://merch-prod.payu.com"
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
{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Exemplo de uma Resposta:
```XML
<paymentResponse>
    <code>SUCCESS</code>
    <transactionResponse>
        <orderId>2153050798</orderId>
        <transactionId>722480e5-276e-409d-ae9e-376b801ed725</transactionId>
        <state>PENDING</state>
        <pendingReason>AWAITING_THREEDS_CALLBACK</pendingReason>
        <responseCode>PENDING_THREEDS_CALLBACK</responseCode>
        <operationDate>2024-10-24T09:09:10</operationDate>
        <extraParameters>
            <entry>
                <string>BANK_REFERENCED_CODE</string>
                <string>CREDIT</string>
            </entry>
            <entry>
                <string>THREEDS_AUTH_REDIRECT_URL</string>
                <string>https://merch-prod.payu.com</string>
            </entry>
        </extraParameters>
        <additionalInfo>
            <paymentNetwork>REDEBAN</paymentNetwork>
            <rejectionType>NONE</rejectionType>
            <cardType>CREDIT</cardType>
            <transactionType>AUTHORIZATION_AND_CAPTURE</transactionType>
        </additionalInfo>
    </transactionResponse>
</paymentResponse>

```

{{< /tab >}}
{{< /tabs >}}

## Após a Autenticação

Depois que o pagador conclui a autenticação 3DS (se necessário), a PayU receberá uma notificação. A transação será então:

* **Concluída:** Se a autenticação for bem-sucedida.
* **Recusada:** Se a autenticação falhar.

## Redirecionamento Após a Autenticação

Após o redirecionamento do pagador da `THREEDS_AUTH_REDIRECT_URL`, ele será direcionado para:

* **Página de status da transação do Checkout PayU:** Por padrão, esse é o comportamento se o lojista não tiver especificado uma URL de retorno personalizada.
* **URL de retorno personalizada do lojista:** Se fornecida, o pagador será redirecionado para a página designada do lojista após a autenticação.

