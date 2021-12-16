---
title: "Integração SDK"
linkTitle: "Integração SDK"
date: 2017-01-05
description: >
  O kit de desenvolvimento de software (Software Development Kit - SDK) do PayU oferece uma solução simples para uma integração complexa.
weight: 30
tags: ["parenttopic"]
---

Assim como qualquer integração de API, você pode personalizar seu checkout de acordo com as necessidades de sua loja e o cliente permanece em seu site durante o processo de compra e pagamento. Para integrar esta opção, você deve ter uma conta PayU Business e habilidades de programação avançadas.

Você pode acessar vários métodos de pagamento (varia por país), incluindo cartões de crédito, transferências bancárias e pagamentos em dinheiro.

![API integration](/assets/api1-pt.png)

## Configurações iniciais {#initial-settings}
PayU permite que você integre com o portal de transações, ferramentas de pagamento disponíveis e Consultas através da programação de um site em Java ou PHP. É fundamental que os dados confidenciais da transação, como número do cartão de crédito e data de validade, não sejam armazenados. Recomenda-se seguir as [Melhores práticas do PCI DSS](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).

### Java
Para se integrar com a API, o SDK depende da biblioteca do Apache `HttpClient` que também depende das bibliotecas `HttpCore`, `CommonsLoggin` e `CommonsCodec`.

Em geral, você precisa das seguintes bibliotecas em seu classpath:
* [HttpClient-4.4.1.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient/4.4.1)
* [HttpCore-4.4.4.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpcore/4.4.4)
* [Commons-loggin-1.1.1.jar](https://mvnrepository.com/artifact/commons-logging/commons-logging/1.1.1)
* [Commons-codec-1.6.jar](https://mvnrepository.com/artifact/commons-codec/commons-codec/1.6)
* [Commons-lang3-3.5.jar](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3/3.5)

<a href="http://developers.payulatam.com/sdk/java/payu-java-sdk-1.3.9.zip" target="_blank" class="payu-btn-green">Faça download do SDK Java 1.3.9</a>

Antes de realizar qualquer operação com o SDK, você precisa atribuir alguns valores à classe `PayU`, que se aplica a todas as operações do SDK e deve ser configurada com os dados da sua loja. A tabela a seguir mostra os valores que você precisa configurar.

| Parâmetro name | Tamanho | Tipo | Obrigatório | Descrição |
|-|-|-|:-:|-|
| `language` | 2 | Language | Sim | O idioma usado para mensagens de erro no sistema e nos e-mails que são enviados ao comprador e ao vendedor. Atualmente é compatível com en  `en` (inglês), `es` (Spanish) and `pt` (português). |
| `isTest` |  | boolean | Sim | Atribuir `true` se for um pedido de teste. Caso contrário, atribua `false`. Dependendo do tipo de transação ou operação, o comportamento pode variar de acordo com o valor deste campo. |
| `apiLogin` | Mín:12 Máx:32 | String | Sim | Sua API Login. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `apiKey` | Mín:6 Máx:32 | String | Sim | Sua API key. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `merchantId` |  | String | Não | O identificador do vendedor, é usado para gerar as assinaturas para verificar as transações de pagamento. <br>Este parâmetro é obrigatório quando you want to check the transaction, unless you send the signature. |
| `paymentsUrl` | Mín:1 | String | Não | A URL da página para a qual você enviará as solicitações relacionadas a pagamentos. Por padrão, este parâmetro leva a URL de produção. |
| `reportsUrl` | Mín:1 | String | Não | A URL da página para onde você enviará as solicitações relacionadas aos relatórios. Por padrão, este parâmetro leva a URL de produção. |

Exemplo

```JAVA
PayU.apiKey = "xxxxxxxxxxxx"; // Insira aqui sua API key
PayU.apiLogin = "xxxxxxxxxxxx"; // Insira aqui sua API Login
PayU.language = Language.en; // Insira o idioma aqui
PayU.isTest = false; // atribua true se você estiver no modo de teste
LoggerUtil.setLogLevel(Level.ALL); // Inclua-o apenas se desejar ver o rastreamento completo do log. Caso contrário, você pode removê-lo.
PayU.PaymentUrl = "https://api.payulatam.com/payments-api/"; // Inclua se quiser testar em um servidor de pagamento específico e atribuir sua URL.
PayU.reportsUrl = "https://api.payulatam.com/reports-api/"; // Inclua se quiser testar em um servidor de relatório específico e atribuir sua URL.
```
<br>

Para executar as operações fornecidas pelo SDK do PayU, deve-se enviar ao método um mapa de parâmetros como argumento. Este mapa contém todas as informações necessárias para processar uma transação. Exemplo:

```JAVA
Map<String, String>  parameters = new HashMap <String, String>();
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, transactionId);
parameters.put(PayU.PARAMETERS.ORDER_ID, orderId.toString());
```
<br>

Para facilitar o uso, você encontra um conjunto de constantes na interface `PayU.PARAMETERS`, que contém os nomes dos parâmetros usados nos métodos SDK.

{{% alert title="Observação" color="info"%}}
A partir da versão 1.2.X, é necessário adicionar o certificado da API de pagamentos do PayU (https://api.payulatam.com/payments-api/) na pasta da chave Java. Esta pasta está localizada no caminho _**[Java-Installation-Folder]/jdk/jre/lib/security/cacerts**_.
{{% /alert %}}

### PHP
Para integração com a API, o SDK pode ser executado em máquinas com versão PHP maior ou igual a 5.2.1. Além disso, as seguintes extensões PHP são necessárias em seu servidor:

* curl
* xml
* mbstring
* json

<a href="http://developers.payulatam.com/sdk/php/payu-php-sdk-4.5.7.zip" target="_blank" class="payu-btn-green">Faça download do SDK PHP 4.5.7</a>

Para ter acesso aos recursos do SDK, você precisa incluir a classe `PayU` localizada em _**[PayU-php-sdk-Path]/lib/PayU.php**_. 

```PHP
<?php
require_once '[PayU-php-sdk-Path]/lib/PayU.php';
..
?>
```
<br>

Antes de realizar qualquer operação com o SDK, você precisa atribuir alguns valores à classe `PayU`, que se aplica a todas as operações do SDK e deve ser configurada com os dados da sua loja. A tabela a seguir mostra os valores que você precisa configurar.

| Parâmetro name | Tamanho | Tipo | Obrigatório | Descrição |
|-|-|-|:-:|-|
| `PayU::$language` | 2 | Language | Sim | O idioma usado para mensagens de erro no sistema e nos e-mails que são enviados ao comprador e ao vendedor. Atualmente é compatível com en  en (inglês), es (Spanish) and pt (português). |
| `PayU::$isTest` |  | boolean | Sim | Atribuir `true` se for um pedido de teste. Caso contrário, atribua `false`. Dependendo do tipo de transação ou operação, o comportamento pode variar de acordo com o valor deste campo. |
| `PayU::$apiLogin` | Mín:12 Máx:32 | String | Sim | Seu API Login. [Como faço para obter minha API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$apiKey` | Mín:6 Máx:32 | String | Sim | Sua API key. [Como faço para obter minha API key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$merchantId` |  | String | Não | O identificador do vendedor, é usado para gerar as assinaturas para verificar as transações de pagamento. <br>Este parâmetro é obrigatório quando you want to check the transaction, unless you send the signature. |

Exemplo

```PHP
<?php
PayU::$apiKey = "xxxxxxxxxxxx"; // Insira aqui sua API key
PayU::$apiLogin = "xxxxxxxxxxxx"; // Insira aqui sua API Login
PayU::$merchantId = "1"; // Insira seu Merchant Id aqui
PayU::$language = SupportedLanguages::ES; // Insira o idioma aqui
PayU::$isTest = false; // atribua true se você estiver no modo de teste
..
?>
```
<br>

lém disso, você precisa configurar a API para redirecionar as solicitações usando a classe  `Environment`:

```PHP
<?php
// Payments URL
Environment::setPaymentsCustomUrl("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi");
// Reports URL
Environment::setReportsCustomUrl("https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi");
..
?>
```

## Observações {#considerations}
* Você deve ter uma conta PayU ativa.
* Você deve instalar um certificado SSL válido em seu servidor e seu site deve ser capaz de fazer conexões SSL. Por isso, a máquina virtual deve ter extensões de segurança adequadas.
* Temporariamente, não use certificados de segurança de curva elíptica ou que tenham o pacote de criptografia `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` em seus ordems de pagamento.
* Você deve ter CGI ou linguagens de servidor como Java, C #, VB, PHP, etc.
* Você deve ser capaz de armazenar suas credenciais de autenticação (API Key e API Login) com segurança.
* A codificação das mensagens deve ser `UTF-8`.
* As datas devem ter formato `yyyy-MM-ddTHH:mm:ss`, o formato da hora é 24 horas. Exemplo: `2015-08-22T21:35:12`.
* Normalmente a conexão garante tempos de resposta de três segundos em média. Se houver uma situação incomum, o tempo máximo de resposta é de um minuto. É altamente recomendável que você defina timeouts quando se conectar com PayU.
* É importante validar a duração e o número dos cartões de crédito por franquia, juntamente com os códigos de segurança.

## Recursos disponíveis {#available-features}