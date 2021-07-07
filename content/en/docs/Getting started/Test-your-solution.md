---
title: "Test Your Solution"
linkTitle: "Test Your Solution"
date: 2021-04-06T15:34:20-05:00
description: >
  PayU has a sandbox environment in which, you can test your solution before moving to the live environment, where you can receive real payments and transactions.
weight: 40
---

If you want to perform tests through PayU, you need to use the following credentials in the request, depending on the country of your account:  

{{< testaccounts/accounts >}}

The test environment does not replicate data from your production account.

## Test cards
You can use the following cards for testing:

<details>
<summary><img src="/assets/Argentina.png" width="25px"/> Argentina</summary>

| Card                       | Number                              |
|---------------------------|-------------------------------------|
| **AMEX Credit Card**      | 376414000000009                     |
| **ARGENCARD Credit Card** | 5011050000000000                    |
| **CABAL Credit Card**     | 5896570000000000                    |
| **CENCOSUD Credit Card**  | 6034930000000005 - 5197670000000002 |
| **MASTER Credit Card**    | 5399090000000000                    |
| **NARANJA Credit Card**   | 5895620000000000                    |
| **VISA Credit Card**      | 4850110000000000 - 4036820000000001 |
| **VISA Debit Card**       | 4517730000000000                    |

</details>
<details>
<summary><img src="/assets/Brasil.png" width="25px"/> Brazil</summary>

| Card                      | Number                              |
|---------------------------|-------------------------------------|
| **AMEX Credit Card**      | 376611000000000                     |
| **DINERS Credit Card**    | 36213800000009                      |
| **ELO Credit Card**       | 5067310000000002                    |
| **HIPERCARD Credit Card** | 6062820000000003                    |
| **MASTER Credit Card**    | 5123740000000002                    |
| **VISA Credit Card**      | 4422120000000008 - 4984460000000008 |

</details>
<details>
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

| Card                      | Number                               |
|---------------------------|--------------------------------------|
| **VISA Credit Card**      | 4938590000000010                     |
| **MASTER Credit Card**    | 5435630000000000                     |
| **AMEX Credit Card**      | 377825000000005                      |
| **DINERS Credit Card**    | 36525200000002                       |

</details>
<details>
<summary><img src="/assets/Colombia.png" width="25px"/> Colombia</summary>

| Card                      | Number                               |
|---------------------------|--------------------------------------|
| **AMEX Credit Card**      | 377813000000001                      |
| **DINERS Credit Card**    | 36032400000007                       |
| **CODENSA Credit Card**   | 5907121111111110                     |
| **CRM Credit Card**       | 6271800000000000                     |
| **MASTER Credit Card**    | 5471300000000000                     |
| **MASTER Credit Card2**   | 2221000000000000                     |
| **VISA Credit Card**      | 4097440000000000                     |
| **VISA Debit Card**       | 4509420000000000                     |

</details>
<details>
<summary><img src="/assets/Mexico.png" width="25px"/> Mexico</summary>

| Card                      | Number                               |
|---------------------------|--------------------------------------|
| **AMEX Credit Card**      | 376675000000005                      |
| **MASTER Credit Card**    | 5579070000000000                     |
| **MASTER Debit Card**     | 5256780000000000                     |
| **VISA Credit Card**      | 4268070000000000                     |
| **VISA Debit Card**       | 4415490000000000                     |
</details>
<details>
<summary><img src="/assets/Panama.png" width="25px"/> Panama</summary>

| Card                    | Number                               |
|-------------------------|--------------------------------------|
| **MASTER Credit Card**  | 5455040000000005                     |
| **VISA Credit Card**    | 4723030000000005                     |
</details>
<details>
<summary><img src="/assets/Peru.png" width="25px"/> Peru</summary>

| Card                    | Number                               |
|-------------------------|--------------------------------------|
| **AMEX Credit Card**    | 377753000000009                      |
| **DINERS Credit Card**  | 36239200000000                       |
| **MASTER Credit Card**  | 5491610000000000                     |
| **MASTER Debit Card**   | 5236930000000000                     |
| **VISA Credit Card**    | 4907840000000005 - 4634010000000005  |
| **VISA Debit Card**     | 4557880000000000                     |
</details>

### Testing status
When using the Payments, you must send in the request:
* The `test` parameter as `true`.
* Set **777** in the CVV of the card (for AMEX, use **7777**).
* Send the name of the transaction status in the name of the cardholder.
    - For approved transactions, send **APPROVED** value.
    - For rejected transactions, send **REJECTED** value.
    - For pending transactions, send **PENDING** value.
* For the card number you must enter a valid card number, corresponding to the franchise sent in the request. You can use an online card generator for testing purposes.
* To test PSE bank transfers (Available in Colombia) in the PayU Sandbox environment, see the [PSE Test Guide (PDF)](/assets/pse-test-guide-v5.pdf).

## Importing the Collection
Click the button below to import our collection in Postman (you may need to refresh the page if the button does not work for you. Note that we create a new environment each time you import the collection.

{{< postman/postman_flow_collection >}}
<br>

After you run the collection, you need to set the environment variables and the globals.

### Setting your Environment Variables
Our collection has one environment named `PayU API Sandbox`. We recommend you invoke the collection’s API requests in a Sandbox environment only.

If you want to change the PayU's testing accounts, configure the `api_key`, `api_login`, `merchant_id` and `account-[country]` variables. You can leave all the other variables unchanged.

### Importing globals
Globals are the variables required to process transactions in our Payment gateway such as currency, transaction amount, confirmation and response pages and more.

Import the globals for the collection to configure the values sent to the requests. 

1. Download the globals file <a href="/assets/globals/PayU%20Latam.postman_globals.json" download>here</a>.

2. In the Postman collection, click _**Import**_ next to your workspace name and locate the json file recently downloaded.

3. When finish, click _**Import**_.

To change the amount of a transaction, update the value for the `tx_value_[Country]` according to the country you want to test.

## Running the Requests in the Correct Order
Beware that the order in which you run the requests is important, since some of the data returned by one request may be used in the next. 