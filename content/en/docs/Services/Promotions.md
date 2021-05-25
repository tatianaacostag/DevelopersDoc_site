---
title: "Installments and Promotions"
linkTitle: "Installments and Promotions"
date: 2021-03-26T14:02:05-05:00
description: >
    Promotions feature lets you consult the valid promotions, along with their associate costs, characteristics, and further relevant information available for your customers. Promotions API applies only to Argentina and Mexico.
weight: 50
---

## What are Installments and Promotions
With Installments and Promotions, you can offer to your customer the possibility to buy your products paying in a determined number of installments. Regardless of the number of installments selected by your customer, you will receive the full amount of the purchase minus the commission free agreed with PayU.

To perform the configuration of Installments and Promotions based on the agreements you have with bank entities, contact your sales representative.

## How does Promotions and Installments works in PayU
To use promotions, you need to first consult the available promotions for your shop; then, select the promotion that fits to your needs and finally, send the payment request along with the promotion Id selected and the number of installments.

The following sequence of events explains better the promotions flow.

![Promotions Flow](/assets/Promotions/PromotionsFlow.png)

## Authentication for Promotions
For Promotions, you need to authenticate and authorize the petitions received by your server using a HMAC based mechanism. To authenticate, you need to know your ```MerchantPublicKey```, you can get this information in your PayU Module (**_Settings_** > **_Technical configuration_** > **_Public Key_**).

![PrintScreen](/assets/Promotions/PublicKey.png)

### Configuring the authentication
You must include in the ```Authorization``` in the header, this header follows this structure:

```java
"Hmac" + " " + MerchantPublicKey + ":" + Signature
```
<br>

Where ```Signature``` is created as follows:

```java
Signature = Base64(HMAC-SHA256(MerchantApiKey,ContentToSign)) 
```
<br>

And ```ContentToSign``` corresponds to:

```java
HTTP-Verb + "\n" + "\n" + "\n" +
Date + "\n" +
URI
```

{{% alert title="Note" color="info"%}}

It is mandatory to include the three line breaks (```\n```) after the ```HTTP-Verb```

{{% /alert %}}

The following examples shows how to create the Authentication header using the following test values:

**ContentToSign**:
```java
GET 
    

Fri, 28 Apr 2017 18:32:01 GMT
/payments-api/rest/v4.9/pricing
```
<br>

**MerchantApiKey**:
```java
4Vj8eK4rloUd272L48hsrarnUA
```
<br>

**MerchantPublicKey**:
```java
PKaC6H4cEDJD919n705L544kSU
```
<br>

Crypt the ```ContentToSign``` using ```MerchantApiKey``` as passphrase. Then, concatenate the result with the ```MerchantPublicKey```as explained before, the result is as follows:

**Authorization**
```java
Hmac PKaC6H4cEDJD919n705L544kSU:sIxh54sANfKaxO0ugX6QwhPmZRS+TGy8gmdCwr3kjP0= 
```
<br>

To avoid replay attacks, send the header ```Date``` following this format:

**Date**
```java
Mon, 11 May 2015 21:14:41 GMT
```
<br>

Due to some restrictions in REST clients, you can also send the the ```x-hmac-date``` header to meet security requirements, this header follows the same format used in ```Date```:

**x-hmac-date**
```java
Mon, 11 May 2015 21:14:41 GMT
```
<br>

## What's next?
The integration with this feature can be performed using one of our integration types:

{{% alert title="Note" color="info"%}}

Promotions API is not included in SDK integration. Nevertheless, we have developed some examples of how to invoke the API using _Java_ or _PHP_.

{{% /alert %}}

* [For API integrations, refer to this topic]({{< ref "Queries-API.md" >}})
* [For SDK integrations, refer to this topic]({{< ref "SDK Integration" >}})


<!--
{{% alert title="Note" color="info"%}}

As this is a RESTful service, we strongly recommend you do not validate the scheme.
If the schema is not validated, the integration is not affected, and you only need to perform small changes have to implement the new features when an update is added to the Web Service.

{{% /alert %}}

To integrate with Promotions API, target the requests to the following URLs:

{{% alert title="API" color="info"%}}

* _**Tests**_: `GET https://sandbox.api.payulatam.com/payments-api/rest/v4.3/pricing`
* _**Production**_: `GET https://api.payulatam.com/payments-api/rest/v4.3/pricing`

{{% /alert %}}
-->
