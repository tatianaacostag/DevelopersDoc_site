---
title: "Autenticação 3DS Realizada pela PayU"
linkTitle: "Autenticação 3DS Realizada pela PayU"
date: 2024-07-01T11:32:55-05:00
description: >
  A autenticação 3DS realizada pela PayU evita que você precise gerenciar o processo de integração 3DS. A PayU cuida de tudo, desde a comunicação com o banco emissor até o gerenciamento do fluxo de autenticação.  
weight: 21
tags: ["subtopic"]
---

Para habilitar a autenticação 3DS, entre em contato com seu representante PayU ou suporte técnico. Uma vez habilitada, inclua o parâmetro `req3DSAuthentication` nas suas solicitações de pagamento usando a API de Pagamentos da PayU.

{{% alert title="Notas" color="info"%}}

* A autenticação 3DS com a PayU Latam está disponível apenas na **Argentina**, **Brasil**, **Colômbia**, **México** e **Peru**.
* Se você utiliza uma <a href="https://developers.payulatam.com/latam/pt/docs/integrations/webcheckout-integration.html" target="_blank">integração WebCheckout</a>, entre em contato com seu representante da PayU ou com o suporte técnico para confirmar se a autenticação 3DS está disponível para suas transações.
* **Redes suportadas:** Visa e Mastercard.

{{% /alert %}}

### Parâmetro `req3DSAuthentication`

Este parâmetro permite especificar se uma transação requer autenticação 3DS. O parâmetro suporta os seguintes valores:

* `"true"`: Exige autenticação 3DS para a transação.
* `"false"`: Desativa a autenticação 3DS para a transação.

**Se sua solicitação não incluir `req3DSAuthentication`,** o motor de risco da PayU determinará se a transação requer autenticação 3DS com base na sua avaliação de risco.

#### Parâmetros para Autenticação 3DS

A tabela abaixo descreve os principais parâmetros associados à autenticação 3DS. Para uma lista completa de parâmetros aplicáveis a transações com cartão de crédito ou débito, consulte a <a href="https://developers.payulatam.com/latam/pt/docs/integrations/api-integration.html" target="_blank">documentação da API de Pagamentos</a> do seu país.

| Nome do Campo | Formato | Tamanho | Descrição |
|-|-|-|-|
| `transaction > req3DSAuthentication` | Booleano | 4-5 caracteres | Especifica se a autenticação 3DS é exigida (`true` ou `false`). Se omitido, o motor de risco da PayU decide se a autenticação é necessária. |
| `transaction > order > notifyUrl` | Alfanumérico | Até 255 caracteres | URL de webhook que sua integração utiliza para receber o status final da transação (por exemplo, aprovada ou rejeitada) da PayU. Para uma lista detalhada de possíveis status, consulte a <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" target="_blank">documentação de códigos de resposta</a>. |
| `transaction > extraParameters > RESPONSE_URL` | Alfanumérico | Até 255 caracteres | URL para onde a integração redireciona o usuário após a autenticação, geralmente o site do comerciante. Se omitido, a integração redireciona o usuário para a página padrão de status de transação da PayU. Para uma lista detalhada de possíveis status, consulte a <a href="https://developers.payulatam.com/latam/pt/docs/getting-started/response-codes-and-variables.html#response-codes-sent-to-the-response-page" target="_blank">documentação de códigos de resposta</a>. |

#### Exemplo de uma Solicitação

No exemplo de solicitação a seguir, `req3DSAuthentication` está definido como `true` para exigir autenticação 3DS:

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
    <language>en</language>
    <command>SUBMIT_TRANSACTION</command>
    <merchant>
        <apiLogin>pRRXKOl8ikMmt9u</apiLogin>
        <apiKey>4Vj8eK4rloUd272L48hsrarnUA</apiKey>
    </merchant>
    <transaction>
        <order>
            <language>en</language>
            <signature>8b9abb9dcae76d331e4493a559e8a76a0a9296e6944d460303d5639d9230c485</signature>
            <accountId>512321</accountId>
            <description>PayULatamAPI|Test|CO|COL</description>
            <referenceCode>REFERENCIA_PRUEBA_12345</referenceCode>
            <notifyUrl>https://merchant-mywebhook.com</notifyUrl>
            <buyer>
                <merchantBuyerId>Merchant_Buyer_ID_123</merchantBuyerId>
                <fullName>John Doe</fullName>
                <emailAddress>john.doe@email.com</emailAddress>
                <contactPhone>3155555555</contactPhone>
                <dniType>CC</dniType>
                <dniNumber>123456789</dniNumber>
                <shippingAddress>
                    <country>CO</country>
                    <state>DC</state>
                    <city>Bogotá</city>
                    <postalCode>110111</postalCode>
                    <street1>Calle 100</street1>
                    <street2>Cra 9</street2>
                    <phone>6011234567</phone>
                </shippingAddress>
            </buyer>
            <shippingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </shippingAddress>
            <additionalValues>
                <TX_VALUE>
                    <value>100</value>
                    <currency>COP</currency>
                </TX_VALUE>
                <TX_TAX>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX>
                <TX_TAX_RETURN_BASE>
                    <value>0</value>
                    <currency>COP</currency>
                </TX_TAX_RETURN_BASE>
            </additionalValues>
        </order>
        <payer>
            <merchantPayerId>Merchant_Payer_ID_123</merchantPayerId>
            <fullName>John Doe</fullName>
            <emailAddress>john.doe@email.com</emailAddress>
            <contactPhone>3155555555</contactPhone>
            <dniType>CC</dniType>
            <dniNumber>123456789</dniNumber>
            <billingAddress>
                <country>CO</country>
                <state>DC</state>
                <city>Bogotá</city>
                <postalCode>110111</postalCode>
                <street1>Calle 100</street1>
                <street2>Cra 9</street2>
                <phone>6011234567</phone>
            </billingAddress>
        </payer>
        <creditCard>
            <name>APPROVED</name>
            <number>5570898637920584</number>
            <expirationDate>2025/12</expirationDate>
            <securityCode>777</securityCode>
            <processWithoutCvv2>false</processWithoutCvv2>
        </creditCard>
        <extraParameters>
            <INSTALLMENTS_NUMBER>1</INSTALLMENTS_NUMBER>
            <RESPONSE_URL>https://merchant.shoppingresult.com</RESPONSE_URL>
        </extraParameters>
        <type>AUTHORIZATION_AND_CAPTURE</type>
        <paymentMethod>MASTERCARD</paymentMethod>
        <paymentCountry>CO</paymentCountry>
        <ipAddress>45.6.10.241</ipAddress>
        <userAgent>Mozilla/5.0 (Windows; U; Windows NT 6.0) AppleWebKit/531.2.0 (KHTML, like Gecko) Chrome/21.0.885.0 Safari/531.2.0</userAgent>
        <cookie>sefejihsxeai037qhkwa3jex9</cookie>
        <deviceSessionId>cb066830a3dcbdaf7234fd230d1959b0c6b3ae3ad5265490d55802a61738b537</deviceSessionId>
        <integrationMethod>POST_API_v4_0</integrationMethod>
        <req3DSAuthentication>true</req3DSAuthentication>
        <source>WEB</source>
    </transaction>
    <test>false</test>
</request>

```

{{< /tab >}}
{{< /tabs >}}

## Testando a Autenticação 3DS

Para testar o processo de autenticação 3DS, utilize os valores fictícios fornecidos na tabela abaixo. Esses valores são aplicáveis aos diferentes métodos de pagamento disponíveis em cada país:

<table>
  <tr>
    <th></th>
    <th style="text-align: center;">Argentina<br/><img src="/assets/Argentina.png" width="25px"/></th>
    <th style="text-align: center;">Brasil<br/><img src="/assets/Brasil.png" width="25px"/></th>
    <th style="text-align: center;">Colômbia<br/><img src="/assets/Colombia.png" width="25px"/></th>
    <th style="text-align: center;">México<br/><img src="/assets/Mexico.png" width="25px"/></th>
    <th style="text-align: center;">Peru<br/><img src="/assets/Peru.png" width="25px"/></th>
  </tr>
  <tr>
    <th>Account ID</th>
    <td style="text-align: center;">516684</td>
    <td style="text-align: center;">516685</td>
    <td style="text-align: center;">516686</td>
    <td style="text-align: center;">516687</td>
    <td style="text-align: center;">516688</td>
  </tr>
  <tr>
    <th>Merchant ID</th>
    <td colspan="5" style="text-align: center;">508029</td>
  </tr>
  <tr>
    <th>API Login</th>
    <td colspan="5" style="text-align: center;">pRRXKOl8ikMmt9u</td>
  </tr>
  <tr>
    <th>API Key</th>
    <td colspan="5" style="text-align: center;">4Vj8eK4rloUd272L48hsrarnUA</td>
  </tr>
  <tr>
    <th>Public Key</th>
    <td colspan="5" style="text-align: center;">PKaC6H4cEDJD919n705L544kSU</td>
  </tr>
</table>

{{% alert title="Nota" color="info"%}} 

Esses IDs de conta são apenas para fins de teste, não os utilize em ambientes de produção. 

{{% /alert %}}

## Resposta da Transação e Fluxo de Autenticação

Ao enviar uma solicitação de pagamento, você receberá uma resposta com o estado `"PENDING"` para a transação. Essa resposta também incluirá um campo em `extraParameters` chamado `THREEDS_AUTH_REDIRECT_URL`.

* **`THREEDS_AUTH_REDIRECT_URL`:** Essa URL deve ser usada para redirecionar o pagador para concluir o processo de autenticação 3DS. O processo de autenticação pode envolver desafios como inserir uma senha única (OTP) recebida em seu telefone.

O diagrama abaixo ilustra o processo completo de uma transação utilizando a autenticação 3DS da PayU, destacando etapas-chave como envio da solicitação, autenticação e gerenciamento da resposta.

{{< 3dsAuth/3dsflow_pt >}}

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

Conforme mostrado no diagrama da seção acima, assim que o pagador concluir a autenticação 3DS (se necessário), a PayU receberá uma notificação. A transação será então:

* **Concluída:** Se a autenticação for bem-sucedida.
* **Recusada:** Se a autenticação falhar.

### Redirecionamento Após a Autenticação

Após o redirecionamento do pagador da `THREEDS_AUTH_REDIRECT_URL`, ele será direcionado para:

* **Página de status da transação do Checkout PayU:** Por padrão, esse é o comportamento se o lojista não tiver especificado uma URL de retorno personalizada.
* **URL de retorno personalizada do lojista:** Se fornecida, o pagador será redirecionado para a página designada do lojista após a autenticação.

