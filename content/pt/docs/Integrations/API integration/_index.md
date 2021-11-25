---
title: "Integração API"
linkTitle: "Integração API"
date: 2021-25-03
description: >
  A integração API do PayU permite que sua empresa processe transações de diferentes tipos de aplicativos (site, móvel, IVR etc).
weight: 20
tags: ["parenttopic"]
---

Você pode conectar sua loja online à plataforma PayU e o processo de checkout será feito em seu site. Para integrar esta opção, você deve ter uma conta PayU Business e habilidades de programação avançadas.

Você pode acessar vários métodos de pagamento (varia por país), incluindo cartões de crédito, transferências bancárias e pagamentos em dinheiro.

![API integration](/assets/api1-pt.png)

## Configurações iniciais {#initial-settings}
PayU permite que você integre com o portal de transações, ferramentas de pagamento disponíveis e Consultas, programando um cliente HTTPS para enviar as informações da transação através de SSL. É fundamental que os dados confidenciais da transação, como número do cartão de crédito e data de validade, não sejam armazenados. Recomenda-se seguir as [Melhores práticas do PCI DSS](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).  

A transmissão das transações é protegida através de uma conexão TLS (Transport Layer Security) de 256 bits do servidor da loja nosso portal de pagamento. A troca de mensagens é feita por meio de strings JSON ou XML e as operações são diferenciadas por um comando incluído na solicitação. Confira os seguintes exemplos de JSON e XML:

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}
<br>
POST /payments-api/4.0/service.cgi HTTP/1.1<br>
Host: sandbox.api.payulatam.com<br>
Content-Tipo: application/json; charset=utf-8<br>
Accept: application/json<br>
Content-Length: length

```JSON
{
   "test": false,
   "language": "en",
   "command": "GET_PAYMENT_METHODS",
   "merchant": {
      "apiLogin": "xxxxxxxxxxxxx",
      "apiKey": "xxxxxxxxxxxxx"
   }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>
POST /payments-api/4.0/service.cgi HTTP/1.1<br>
Host: sandbox.api.payulatam.com<br>
Content-Tipo: application/json; charset=utf-8<br>
Accept: application/xml<br>
Content-Length: length<br>

```XML
<request>
   <language>en</language>
   <command>GET_PAYMENT_METHODS</command>
   <merchant>
      <apiLogin>xxxxxxxxxxxxx</apiLogin>
      <apiKey>xxxxxxxxxxxxx</apiKey>
   </merchant>
   <isTest>false</isTest>
</request>
```

{{< /tab >}}
{{< /tabs >}}
<br>

Você pode definir o idioma que deseja usar na solicitação por meio dos cabeçalhos HTTP `Content-type` e `Accept`. Você pode usar todas as combinações possíveis:

| CONTENT-TYPE       | ACCEPT             |
|--------------------|--------------------|
| `application/xml`  | `application/xml`  |
| `application/json` | `application/json` |
| `application/xml`  | `application/json` |
| `application/json` | `application/xml`  |

## Observações {#considerations}
* Você deve ter uma conta PayU ativa.
* Você deve instalar um certificado SSL válido em seu servidor e seu site deve ser capaz de fazer conexões SSL. Por isso, a máquina virtual deve ter extensões de segurança adequadas.
* Temporariamente, não use certificados de segurança de curva elíptica ou que tenham o pacote de criptografia TLS_ECDHE_ECDSA_WITH_RC4_128_SHA em suas ordens de pagamento.
* Você deve ter CGI ou linguagens de servidor como Java, C #, VB, PHP etc.
* Você deve ser capaz de armazenar suas credenciais de autenticação (API Key e API Login) com segurança.
* A codificação das mensagens deve ser  `UTF-8`.
* As datas devem ter formato `yyyy-MM-ddTHH:mm:ss`, o formato da hora é 24 horas. Exemplo: `2015-08-22T21:35:12`.
* Normalmente a conexão garante tempos de resposta de três segundos em média. Se houver uma situação incomum, o tempo máximo de resposta é de um minuto. É altamente recomendável que você defina _timeouts_ quando se conectar com PayU.
* É importante validar a duração e o número dos cartões de crédito por franquia, juntamente com os códigos de segurança.


## Recursos disponíveis {#available-features}
