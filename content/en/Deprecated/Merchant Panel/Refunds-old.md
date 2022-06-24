---
title: "Refunds"
linkTitle: "Refunds"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Information of the Refunds module in the Merchant Panel.
weight: 25
---

{{% alert title="Note" color="warning"%}}
This article has been deprecated and it is not offered for new commerces.
{{% /alert %}}

## What is a refund?
A refund is made every time a business voluntarily decides to refund the money spent to the cardholder due to the following reasons:  
* The client does not like the product and returns it.
* The business’ stock is depleted and it is not able to deliver the product to the client.
 
## How to carry out a refund?
To proceed with a transaction refund, the following steps must be completed. The transaction must be _**approved**_ and free of any pending dispute process.

1. **Consult the transaction that you want to refund**:<br>
To verify a transaction, you must go to the administrative section on the _**Report**_ menu, then select _**Transactions**_ option and look for the specific operation to reimburse based on the money spent during the purchase.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reportes.png)
 
2. **Submit the request of refund**:<br>
After identifying the transaction, you can expand it to see more details and be sure of continuing with the process. If in effect this is the right transaction, you have to click the _**Refund**_ button located in the _**Transaction detail**_ section.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_clic.png)
 
3. **Enter information related with the refund request**:<br>
You will be requested with the following additional information to fulfill it: Reversion code, type of transaction (refund or partial reversion), reversion amount<sup>\*</sup> and comment.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_dialog.png)
 
{{% alert title="Bear in mind" color="info"%}}
<sup>\*</sup> _Partial reversal_: if the amount regarding the requested partial reversal exceeds the total of the transaction, you will not be able to proceed with partial refund. You must also consider that the current transaction may be affected by other partial reversal requests.

Partial reversals only apply to Brazil, Peru and Argentina.
{{% /alert %}}

4. **Confirmation of a refund request**: 
Prior to submit your refund request, the information related to the transaction you previously selected will be shown jointly with the last provided data; in this sense, you will be requested to confirm the filling of such request by means of the _**Send**_ option. On the contrary, you may discontinue the process by choosing _**Cancel**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_validacion1.png)
 
## What are the possible results after submitting a refund request?
After confirming the filling of the refund request, the system, depending on the case, may issue one of the following answers:

### Passed refund request
If your request is complying with all required conditions, you may see the following confirmation message.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_aprobado.png)

### The refund request awaits approval by the corresponding department
In this case, the request must be reviewed and passed by the corresponding department in charge of this process, and it will await to be attended and processed. You may consult the status from your _**Secure**_ account, and then go to the _**Report**_ section, option: _**Refund**_.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/pendiente_aprobacion.png)

{{% alert title="Bear in mind" color="info"%}}
* If the transaction if a _**partial reversal**_, the requests will stay in all cases as pending.
* Partial reversals only apply to Brazil, Peru and Argentina.
* The estimated time to answer your request by the department in charge of such area is two (2) working days for all countries (Argentina, Brazil, Chile, Colombia, Mexico, Peru, Panama).
* The time of refund to purchasers varies in all countries.
{{% /alert %}}

### Rejection of refund request
A refund request may be rejected due to the following:

* **There is already a refund request**:<br>
If the transaction is already related to a previous refund request, which waits for its approval, the system will indicate that the request is rejected due to this reason.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_existente.png)

* **There is not credit in your account**:<br>
If you do not have within the available balance of your account, the amount corresponding to the money of the transaction or to the value of the refund request (See the partial reversions<sup>\*</sup>), you are not able to submit a request related to the transaction of said account; as a result, your request will be declined.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/saldo_insuficiente.png)

* **The transaction awaits a dispute request**:<br>
If the transaction awaits a dispute, the system will indicate that the request is rejected and will not submit it. In this case, you may consult the status in the dispute section.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/disputa_pendiente.png)
 
## Where can I get the information of the refund request status?
To know in details the status of your request, you may use your Secure account and go to the _**Report**_ section and in the _**Refund**_ section, you will verify the status of all refund requests. If you want to know the status of a request or a specific one as well, you may apply criteria or search filters to look for said information.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-en/reembolsos/reembolso_consulta.png)