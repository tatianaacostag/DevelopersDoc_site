---
title: "Installments and Promotions"
linkTitle: "Installments and Promotions"
date: 2021-03-26T14:02:05-05:00
description: >
    Promotions feature lets you consult the valid promotions, along with their associate costs, characteristics, and further relevant information available for your customers. Promotions API applies only to Argentina.
weight: 50
---

## How does Promotions and Installments works in PayU
To use promotions, you need to first consult the available promotions for your shop, then select one and finally, send the payment request along with the promotion Id selected.

The following sequence of events explains better the promotions flow.

![Promotions Flow](/assets/Promotions/PromotionsFlow.png)

## Authentication for Promotions
For Promotions, you need to authenticate and authorize the petitions received by your server using a HMAC based mechanism. To authenticate, you need to know your ```MerchantPublicKey```, you can get this information in your PayU Module (**_Settings_** > **_Technical configuration_** > **_Public Key_**).

![PublicKey](/assets/Promotions/PublicKey.png)

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
