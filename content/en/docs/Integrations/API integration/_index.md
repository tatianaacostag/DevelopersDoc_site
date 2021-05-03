---
title: "API Integration"
linkTitle: "API Integration"
date: 2021-25-03
description: >
  PayU's API integration allows your business to process transactions from different types of applications (web, mobile, IVR, etc).
weight: 20
nosidetoc: true
tags: ["parenttopic"]
---

You can connect your online store to the PayU platform and the checkout process will be handled on your website. To integrate this option you must have a PayU Business account and advanced programming skills.

Access multiple payment methods (varies per country), including credit cards, bank transfers, and cash payments.

![API integration](/assets/api1-en.png)

## Initial settings

PayU allows you to integrate with the transactional gateway, available payment tools and Queries by developing a HTTPS client to send the transaction information through SSL. It is critical that sensitive transaction data such as credit card number, expiration date, are not stored. It is recommended to follow [PCI DSS’ best practices](https://www.pcisecuritystandards.org/documents/PCI_DSS_V2.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf) (Payment Card Industry Data Security Standard).  

The transmission of transactions is secured through a TLS (Transport Layer Security) 256-bit connection from the shop's server our payment Gateway. The exchange of messages is done via JSON or XML strings and operations are distinguished by a command that is included in the request. Check out the following JSON and XML examples:  

{{< tabs tabTotal="2" tabID="1" tabName1="JSON" tabName2="XML" >}}
{{< tab tabNum="1" >}}

```JSON
POST /payments-api/4.0/service.cgi HTTP/1.1
Host: sandbox.api.payulatam.com
Content-Type: application/json; charset=utf-8
Accept: application/json
Content-Length: length
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

```XML
POST /payments-api/4.0/service.cgi HTTP/1.1
Host: sandbox.api.payulatam.com
Content-Type: application/xml; charset=utf-8
Accept: application/xml
Content-Length: length
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

You can set the language you want to use in the request through the `Content-type` and `Accept` HTTP headers. You can use all possible combinations:

{{% alert title="Considerations" color="info"%}}
* You must have an active PayU account.
* You must install a valid SSL certificate in your server and your site must be able to make SSL connections. Due to this, the virtual machine must have appropriate security extensions.
* Temporarily, do not use security certificates elliptic curve or those who have the suite of encryption `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` in your payment requests.
* You must have CGI or server languages such as Java, C#, VB, PHP, etc.
* You must be able to store your authentication credentials (API Key and API Login) safely.
* The encoding for messages must be `UTF-8`.
* The dates must have format `yyyy-MM-ddTHH:mm:ss`, the time format is 24 hours. Example: `2015-08-22T21:35:12`.
* Normally the connection guarantees response times of three seconds on average. If there is an unusual situation, the maximum response time is one minute. It is highly recommended that you set _timeouts_ when you connect with PayU.
* It is important to validate the length and numbers of credit cards by franchise, together with the security codes.
{{% /alert %}}

## How to get variables for API integration.

### API key and API Login


### Authentication signature


### _deviceSessionId_ variable


## Available features
