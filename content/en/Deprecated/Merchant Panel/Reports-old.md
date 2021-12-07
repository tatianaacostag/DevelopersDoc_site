---
title: "Reports"
linkTitle: "Reports"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Information of the reports displayed in the Merchant Panel.
weight: 24
---

{{% alert title="Note" color="warning"%}}
This article has been deprecated and it is not offered for new commerces.
{{% /alert %}}

## Orders report
With these reports you can see the overview of the sales made through your PayU account and know the status of each of them (if they are in process, paid or refunded). An order can have several associated transactions. PayU stores payment attempts related to an order. For example if you sell your shoes to a client and he tries to pay with an invalid VISA credit card, he can then pay again with a MasterCard credit card. Each payment attempt is recorded in the order as a separate transaction.  

1. You can access this feature in the _**Reports**_ menu by clicking on _**Orders**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes1-en.jpg)
 
2. You can filter this report by:
* _**Range of dates**_: You can define the range of dates between which you want to generate the query. The query limit is 3 months.
* _**Status**_: Allows you to select the status of the orders you want to see.

<details>
<summary>Order status</summary>
<br>

* _Initiated_: The initial status of the order. The payer has not selected a payment method or it is a reservation.
* _In progress_: The payment of the order has been selected but not completed (common state with cash payments because it requires the payer to deposit the money in the financial institution).
* _Captured_: The order was paid.
* _Cancelled_: The payer canceled the order, or the payment time expired.
* _Declined_: The process was not completed, either because of rejection by our anti-fraud module or the financial institution.
* _Refunded_: The funds from a sale were returned.

</details>
<br>

* _**Transaction type**_: Allows you to choose the type of transaction related to an order. An order can have different types of transactions associated with it.

<details>
<summary>Transaction status</summary>
<br>

* _Authorization_: Authorized transaction.
* _Authorization and Capture_: Authorized and paid transaction
* _Capture_: Payment transaction.
* _Cancellation_: Transaction canceled before financial movement
* _Annulment_: Transaction in which the financial movement has been already made and cancellation is required (before reimbursement).
* _Reimbursement_: Return of money.

</details>
<br>

* _**Payment method**_: Displays each of the possible options in which your customers can make a payment, either by franchise (e.g VISA, MasterCard) or by cash payments (e.g. Baloto, OXXO, and BCP), or by bank transfer.
* _**Format**_: This shows you the query on the screen when you choose the HTML format or exports the results to a excel file.
 
{{% alert title="Note" color="info"%}}
In the advanced search option, you can check data related to the order including the identifier, the sales reference, or email of the payer.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes2-en.jpg)

3. The results of the query are displaying in a set of orders that match the conditions defined in the report’s filters. This will show detailed information such as the ID of the order, the reference number of the sale, and the value of the transaction, among others.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes3-en.jpg)

4. In case you want more information, you can click on one of the orders. The system will display a screen with detailed information, including associated transactions.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes4-en.jpg)

## Transactions report
This report will allow you to check all transactions related to a payment process and the order to which they belong. You can get detailed information about attempts to pay an order, reversals performed, payer data, etc.

{{% alert title="Note" color="info"%}}
The data of the buyer and the payer may differ because the person placing the order through the website is not the same who makes the payment.
{{% /alert %}}
 
1. You can access this feature in the _**Reports**_ menu by clicking on the _**Transactions**_ option.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones1-en.jpg)
 
2. You can generate your query filter by:
* _**Account**_: If you have multiple accounts, you can select which you want to query transactions.
* _**Date Ranges**_: You can define the date range in which you want to query. The query limit is 3 months between the specified dates.
* _**Status**_: Allows you to select the status of the transactions you want to check.
 
<details>
<summary>States of the transaction</summary>
<br>

* _Approved_: The result of the transaction was successful
* _Declined_: The transaction was canceled.
* _Error_: Transaction processing error.
* _Pending_: Pending transaction response.
* _Expired_: The timeout of the transaction response has ended.

</details>
<br>

* _**Response Code**_: Displays a list of possible response codes a transaction may have and allows you to filter the query with a specific code.
* _**Transaction type**_: You can choose the type of transaction related with an order.

<details>
<summary>Transaction types</summary>
<br>

* _Authorization_: Authorized transaction
* _Authorization and Capture_: Authorized and paid transaction.
* _Capture_: Payment transaction.
* _Refund_: Return of funds.

</details>
<br>

* _**Country**_: Lets you see the country from which the sales transaction was generated.
* _**Method of payment**_: Displays each of the possible options that your customers can make a payment, either by franchises (e.g. VISA or MasterCard) or by cash payments (e.g. Baloto, OXXO, or BCP) or by bank transfer.
* _**Format**_: You can display the result of the query in the PayU platform when choosing the HTML format, or export the results to a CSV file.
 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones2-en.jpg)
 
3. The result of the query is a set of transactions that meet the conditions defined in the report filters. This will include information such as the ID of the order to which a transaction is related, the date on which it took place, the Id, and the value, among others.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones3-en.jpg)

## Graphic report
This option allows you to generate graphs with information of sales or transactions processed over a period of time.  

1. You can access this feature in the _**Reports**_ menu by clicking on the _**Graphic Report**_ option.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico1-en.jpg)

2. The report allows you to filter by:
* _**Timeline**_: Allows you to query various time ranges, allowing you to view reports by days, weeks, or months.
* _**Date Range**_: You can define the date range in which you want to query. The query limit is 3 months.
* _**Status**_: You can select the status of the transactions you want to query.

<details>
<summary>Status of the transaction</summary>
<br>

* _Approved_: The result of the transaction was successful
* _Declined_: The transaction was canceled.
* _Error_: Transaction processing error.
* _Pending_: Pending transaction response.
* _Expired_: The timeout of the transaction response has ended.

</details>
<br>

* _**Country**_: Allows you to search transactions according to the country where are generated.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico2-en.jpg)
 
3. The search results can be demonstrated using a line or column chart that summarizes the behavior of the transactions under the conditions defined in the filter.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico3-en.jpg)
 
## Retentions certificate
If your account is active for Colombian transactions and you must present the deductions certificate for reporting of your income tax, the administrative module allows you to generate a document with the necessary information.  

1. You can access this feature in the _**Reports**_ menu by clicking on the _**Retentions Certificate**_ and set the filter according to a time range and the account in Colombia with which the report will be created.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones1-en.jpg)
 
2. The exported file of the report is a PDF document that contains all the information required by Colombian law for income tax returns.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones2.jpg)
 
## Transfer reports between PayU accounts
This report allows you to view all the transfer operations of the available balance of your PayU accounts.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu1-en.jpg)
 
1. You can check the transfers made from your accounts in the _**Reports**_ module and by clicking on _**Transfers Made**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu2-en.jpg)

Similarly, you can check the transfers made to your accounts in the _**Reports**_ module and by clicking on _**Transfers Received**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu3-en.jpg)

2. In both reports you can perform the query according to the period of time in which the operation was conducted, the accounts involved, and the value of the transfer.

{{% alert title="Note" color="info"%}}
If you want to consult transfers made to accounts that do not belong to your shop, you must have the _**Account ID**_, the number that identifies the PayU account in our system.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu4-en.jpg)

3. The result of these queries will be a consolidated report of the transfers between PayU accounts that meet the required values.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu5-en.jpg)

## Accreditation models of accounts in brazil
If you have an account in Brazil that operates with the _**Installments**_ model or the _**Withdraw After X Days**_ model, you can see in these reports the transactions paid every day, allowing you a better control of the money from your sales in Brazil.

### Withdraw at X days
In this model your business will receive all the money from a sale once the number of days that were defined for your account have passed.

**Example**: If your account is set for payment at D +5 days, and your customer makes a purchase on January 1st, you will receive the payment on January 6th.

#### Consult your received payments
1. You can check your payments received in the _**Reports**_ module by clicking on _**Received Payments**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-pt.png)
 
2. According to the accreditation model and the parameters that you have configured in your account, the report allows you to filter by:
* _**Account**_: Allows you to select the account with which you want to query payments received.
* _**Accreditation model**_: Allows you to select between the two available models of accreditation to perform the query, which in this case is D + X days.
* _**Date Range**_: You can define the date range in which you want to query. The query limit is 3 months between the entered dates.
* _**Order Id**_: Allows you to enter a specific order number to see if was credited in your account.
* _**Output format**_: Displays the result of the query on the screen when you choose the HTML format, or export the results to a CSV file.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias2-pt.png)
 
3. The report will show the date on which the sale was conducted, the date it was credited to the account, and the most important data relating to the transaction such as the order Id to which the transaction relates, reference, value of the sale and value of interest of the transaction

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-pt.png)

#### Check your pending payments
1. You can check your payments in the _**Reports**_ module and clicking on _**Pending Payments**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-pt.png)
 
2. The report allows filtering by:
* _**Account**_: Select the account from which you want to query outstanding payments.
* _**Accreditation model**_: Select between the two available accreditation models to perform the query, in this case D + X days.
* _**Date Range**_: You can define the date range in which you want to query. The query limit is 3 months between the entered dates.
* _**Output format**_: Displays the result of the query on the screen when you choose the HTML format, or export the results to an CSV file.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias5-pt.png)
 
3. The report will show the date of the transaction, the date of accreditation of the sale, the remaining days, and the most important data relating to the transaction such as the Order ID related to the transaction, the reference, the value of the sale and value of interest of the transaction.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-pt.png)

### Installments model
Your store will receive the money every month from the sales according to the number of installments defined by your customer at the time of purchase. 

**Example**: If your customer makes a purchase on January 1 deferred to 6 months, from the date of purchase the amount of money will be pay corresponding to the installments during 6 months.

#### Check your received payments
1. You can check your received payments in the _**Reports**_ module and clicking on _**Paid Payments**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-pt.png)
 
2. According to the accreditation model and the parameters that you have configured in your account, the report allows you to filter by:
* _**Account**_: Allows you to select the account with which you want to query received payments.
* _**Accreditation model**_: Allows you to select between the two available accreditation models to perform the query, which in this case is by quotas.
* _**Date range**_: You can define the date range in which you want to query. The query limit is 3 months between the entered dates.
* _**Order Id**_: Allows you to enter a specific order number to see if was accredited in your account.
* _**Output format**_: Displays the result of the query within the PayU module when you choose the HTML format, or export the results to a CSV file.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias8-pt.png)
 
3. The report will display the date on which the transaction took place, the date when the last payment was credited to the account, the date on which the next installment will be credited, the amount of fees to which the purchase was deferred, and the amount of fees that have been paid. Additionally, the report will show the most important data related to the transaction, such as the order Id to which the transaction relates, the value of the sale, and the value of interest on the transaction.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-pt.png)

#### Check your pending payments
1. You can check your received payments in the form of _**Reports**_ and clicking on _**Pending Payments**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-pt.png)
 
2. The report allows filtering by:
* _**Account**_: Select the account from which you want to search the pending payments.
* _**Accreditation model**_: You can define the date range in which you want to search. The query limit is 3 months between the entered dates
* _**Date range**_: You can define the date range in which you want to search. The query limit is 3 months between the entered dates.
* _**Output format**_: Displays the result of the search on the screen when you choose the HTML format, or export the results to an Excel file.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias7-pt.png)
 
3. The report will show the date of the sale, the date on which the last installment was paid. The most important data relating to the transaction such as the Order ID to which the transaction relates, the reference, the amount of fees the purchase was deferred to, the amount of pending payments to be accredited, the value of the sale, and the interest value of the transaction.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-pt.png)

{{% alert title="Note" color="info"%}}
If your account has a reserve fund, a percentage of this will be held during the credit to your PayU account.
{{% /alert %}}