---
title: "SDK Integration"
linkTitle: "SDK Integration"
date: 2017-01-05
description: >
  PayU's Software Development Kit (SDKs) provides a simple solution for a complex integration.
weight: 30
tags: ["parenttopic"]
---

Similar to any API integration, you can customize your checkout according to your shop's needs and the customer stays on your site during the purchase and payment process. To integrate this option you must have a PayU Business account and advanced programming skills.

Access multiple payment methods (varies per country), including credit cards, bank transfers, and cash payments.

![API integration](/assets/api1-en.png)

## Initial settings
PayU allows you to integrate with the transactional gateway, available payment tools and Queries by developing a web site in Java or PHP. It is critical that sensitive transaction data such as credit card number, expiration date, are not stored. It is recommended to follow [PCI DSS’ best practices](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).

### Java
To integrate with the API, the SDK relies on the Apache's library `HttpClient` which also relies on the libraries `HttpCore`, `CommonsLoggin` and `CommonsCodec`.

In general, you need the following libraries in your classpath:
* [HttpClient-4.4.1.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpclient/4.4.1)
* [HttpCore-4.4.4.jar](https://mvnrepository.com/artifact/org.apache.httpcomponents/httpcore/4.4.4)
* [Commons-loggin-1.1.1.jar](https://mvnrepository.com/artifact/commons-logging/commons-logging/1.1.1)
* [Commons-codec-1.6.jar](https://mvnrepository.com/artifact/commons-codec/commons-codec/1.6)
* [Commons-lang3-3.5.jar](https://mvnrepository.com/artifact/org.apache.commons/commons-lang3/3.5)

<a href="https://github.com/developers-payu-latam/developers-payu-latam.github.io/raw/master/sdk/java/payu-java-sdk-1.5.0.zip" target="_blank" class="payu-btn-green">Download SDK Java 1.5.0</a>

Before performing any operation with the SDK, you need to assign some values to the `PayU` class, which apply to all the SDK operations and must be configured with your commerce data. The following table shows the values you need to configure.

| Parameter name | Size | Type | Mandatory | Description |
|-|-|-|:-:|-|
| `language` | 2 | Language | Yes | The language used for error messages in the system and in emails that are sent to the buyer and seller. It is currently supported in `en` (English), `es` (Spanish) and `pt` (Portuguese). |
| `isTest` |  | boolean | Yes | Assign `true` if it's a test request. Otherwise, assign `false`. Depending on the type of transaction or operation, the behavior may vary depending on the value of this field. |
| `apiLogin` | Min:12 Max:32 | String | Yes | Your API Login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `apiKey` | Min:6 Max:32 | String | Yes | Your API Key. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `merchantId` |  | String | No | The merchant identifier, it's used to generate the signatures to verify payment transactions. <br>This parameter is mandatory when you want to check the transaction, unless you send the signature. |
| `paymentsUrl` | Min:1 | String | No | The URL of the page to where you will send the requests related to payments. By default, this parameter takes the production URL. |
| `reportsUrl` | Min:1 | String | No | The URL of the page to where you will send the requests related to the reports. By default, this parameter takes the production URL. |

Example

```JAVA
PayU.apiKey = "xxxxxxxxxxxx"; // Enter your API key here
PayU.apiLogin = "xxxxxxxxxxxx"; // Enter your API Login here
PayU.language = Language.en; // Enter the language here
PayU.isTest = false; // assign true if you are in test mode
LoggerUtil.setLogLevel(Level.ALL); // Include it only if you want to see the full log trace. Otherwise, you can remove it.
PayU.paymentsUrl = "https://api.payulatam.com/payments-api/"; // Include it if you want to test in a specific payment server and assign its URL.
PayU.reportsUrl = "https://api.payulatam.com/reports-api/"; // Include it if you want to test in a specific report server and assign its URL.
```
<br>

To execute the operations provided by the PayU's SDK, you must send to the method a parameter map as an argument, this map has all the required information to process a transaction. Example:

```JAVA
Map<String, String>  parameters = new HashMap <String, String>();
parameters.put(PayU.PARAMETERS.TRANSACTION_ID, transactionId);
parameters.put(PayU.PARAMETERS.ORDER_ID, orderId.toString());
```
<br>

To ease the usage, you find a set of constants in the interface `PayU.PARAMETERS`, which contains the names of the parameters used in the SDK methods.

{{% alert title="Note" color="info"%}}
From version 1.2.X, it is needed to add the certificate of the Payu's Payments API(https://api.payulatam.com/payments-api/) in the Java key folder. This folder is located in path _**[Java-Installation-Folder]/jdk/jre/lib/security/cacerts**_.
{{% /alert %}}

### PHP
To integrate with the API, the SDK can be executed in machines with PHP version greater than or equals to 5.2.1. Furthermore, the following PHP extensions are required in your server:

* curl
* xml
* mbstring
* json

<a href="https://github.com/developers-payu-latam/developers-payu-latam.github.io/blob/master/sdk/php/payu-php-sdk-4.5.8.zip" target="_blank" class="payu-btn-green">Download SDK PHP 4.5.8</a>

To have access to the SDK features, you need to include the `PayU` class located in _**[PayU-php-sdk-Path]/lib/PayU.php**_. 

```PHP
<?php
require_once '[PayU-php-sdk-Path]/lib/PayU.php';
...
?>
```
<br>

Before performing any operation with the SDK, you need to assign some values to the `PayU` class, which apply to all the SDK operations and must be configured with your commerce data. The following table shows the values you need to configure.

| Parameter name | Size | Type | Mandatory | Description |
|-|-|-|:-:|-|
| `PayU::$language` | 2 | Language | Yes | The language used for error messages in the system and in emails that are sent to the buyer and seller. It is currently supported in en (English), es (Spanish) and pt (Portuguese). |
| `PayU::$isTest` |  | boolean | Yes | Assign `true` if it's a test request. Otherwise, assign `false`. Depending on the type of transaction or operation, the behavior may vary depending on the value of this field. |
| `PayU::$apiLogin` | Min:12 Max:32 | String | Yes | Your API Login. [How do I get my API Login]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$apiKey` | Min:6 Max:32 | String | Yes | Your API Key. [How do I get my API Key]({{< ref "integrations.html#api-key-and-api-login" >}}) |
| `PayU::$merchantId` |  | String | No | The merchant identifier, it's used to generate the signatures to verify payment transactions. <br>This parameter is mandatory when you want to check the transaction, unless you send the signature. |

Example

```PHP
<?php
PayU::$apiKey = "xxxxxxxxxxxx"; // Enter your API key here
PayU::$apiLogin = "xxxxxxxxxxxx"; // Enter your API Login here
PayU::$merchantId = "1"; // Enter your Merchant Id here
PayU::$language = SupportedLanguages::ES; // Enter the language here
PayU::$isTest = false; // assign true if you are in test mode
...
?>
```
<br>

Furthermore, you need to configure the API to redirect the requests using the `Environment` class:

```PHP
<?php
// Payments URL
Environment::setPaymentsCustomUrl("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi");
// Reports URL
Environment::setReportsCustomUrl("https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi");
...
?>
```

## Considerations
* You must have an active PayU account.
* You must install a valid SSL certificate in your server and your site must be able to make SSL connections. Due to this, the virtual machine must have appropriate security extensions.
* Temporarily, do not use security certificates elliptic curve or those who have the suite of encryption `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` in your payment requests.
* You must have CGI or server languages such as Java, C#, VB, PHP, etc.
* You must be able to store your authentication credentials (API Key and API Login) safely.
* The encoding for messages must be `UTF-8`.
* The dates must have format `yyyy-MM-ddTHH:mm:ss`, the time format is 24 hours. Example: `2015-08-22T21:35:12`.
* Normally the connection guarantees response times of three seconds on average. If there is an unusual situation, the maximum response time is one minute. It is highly recommended that you set _timeouts_ when you connect with PayU.
* It is important to validate the length and numbers of credit cards by franchise, together with the security codes.

## Available features