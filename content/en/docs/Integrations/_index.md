---
title: "Integrations"
linkTitle: "Integrations"
date: 2021-04-07T10:01:55-05:00
Description: >
  According to your business needs, select how to integrate your shop with the PayU services and tools.
weight: 40
---

Implement PayU with the aggregator model or gateway, using PayU’s financial agreements or your own. Select the integration that fits best with your needs:

{{< overview/navblocks >}}

## How to get variables for integration
Regardless of the integration selected, you may require any of the following variables in the request of the methods.

### API key and API Login
1. Log in to [PayU.com](payu.com) and click the login option located at the top of the page. Alternatively, you can log in to https://merchants.payulatam.com/.

2. Click _**Settings**_ and then select _**Technical configuration**_.

![PrintScreen](/assets/IntegrationVariables_01.png)

3. In this window, you find both the API key and API Login which allows you to authenticate you commerce during the integration procedure.

![PrintScreen](/assets/IntegrationVariables_02.png)

{{% alert title="Warning" color="warning"%}}

Both keys are unique per commerce in PayU, therefore, you must keep this information secured and their usage or disclosure is under your responsibility. 

{{% /alert %}}  

### Authentication signature
The variable `signature` is used to validate the payments performed through the platform, ensuring their authenticity. This variable is a string value encrypted using MD5 or SHA algorithms and follows this structure.

```
ApiKey~merchantId~referenceCode~tx_value~currency
```

Let's build a `signature` using the following test values:

* **ApiKey**: `4Vj8eK4rloUd272L48hsrarnUA`
* **merchantId**: `508029`
* **referenceCode**: `TestPayU`
* **tx_value**: `3`
* **currency**: `USD`

The string is these values concatenated with the tilde character (~):

```
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~3~USD
```

After you apply the MD5 algorithm, the `signature` value is:

```
ba9ffa71559580175585e45ce70b6c37
```

### _deviceSessionId_ variable
The _deviceSessionId_ is a code with the information of the device where the transaction was generated and provides a unique identifier for the device. This variable lets us identify attackers.

1. To perform either API or SDK integration, you need to include the following script in your payment form:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></script>
<noscript>
   <iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></iframe>
</noscript>
````
<br>

2. It is important to generate the `deviceSessionId` per each transaction. To generate the `deviceSessionId` get the `session_id` of the cookie and concatenate it with the current timestamp along with the milliseconds. Then, encrypt the result using MD5.

Example in PHP

```` PHP
$deviceSessionId = md5(session_id().microtime())
````
<br>

For example, if the `$deviceSessionId` is `d66f949f19b33e88c202b579cfc549b3`, the script is as follows:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></script>
<noscript>
	<iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></iframe>
</noscript>
````
<br>

3. Finally, you must send the `$deviceSessionId` in the variable according to the integration selected:

* For **API**: `transaction.deviceSessionId`
* For **SDK JAVA**: `PayU.PARAMETERS.DEVICE_SESSION_ID`
* For **SDK PHP**: `PayUParameters::DEVICE_SESSION_ID`