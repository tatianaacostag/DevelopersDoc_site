---
title: "Test Your Solution"
linkTitle: "Test Your Solution"
date: 2021-04-06T15:34:20-05:00
description: >
  PayU has a sandbox environment in which, you can test your solution before moving to the live environment, where you can receive real payments and transactions.
weight: 40
---
<script>
  function openTarget() {
    var hash = location.hash.substring(1);
    if(hash) {
      var details = document.getElementById(hash);
    } 
    if(details && details.tagName.toLowerCase() === 'details') {
      details.open = true;
      details.scrollIntoView(true);
    }
  }
  window.addEventListener('DOMContentLoaded', openTarget);
</script>
If you want to perform tests through PayU, you need to use the following credentials in the request, depending on the country of your account:  

{{< testaccounts/accounts >}}

The test environment does not replicate data from your production account.

## Test cards
You can use the following cards for testing:

<details id="argentina">
<summary><img src="/assets/Argentina.png" width="25px"/> Argentina</summary>

| Card                       | Number                              |
|----------------------------|-------------------------------------|
| **AMEX Credit Card**       | 376414000000009                     |
| **ARGENCARD Credit Card**  | 5011050000000001                    |
| **CABAL Credit Card**      | 5896570000000008                    |
| **CENCOSUD Credit Card**   | 6034930000000005 - 5197670000000002 |
| **DINERS Credit Card**     | 36481400000006                      |
| **MASTERCARD Credit Card** | 5399090000000009                    |
| **NARANJA Credit Card**    | 5895620000000002                    |
| **SHOPPING Credit Card**   | 6034880000000051                    |
| **VISA Credit Card**       | 4850110000000000 - 4036820000000001 |
| **VISA Debit Card**        | 4517730000000000                    |

</details>
<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> Brazil</summary>

| Card                       | Number                              |
|----------------------------|-------------------------------------|
| **AMEX Credit Card**       | 376611000000000                     |
| **DINERS Credit Card**     | 36213800000009                      |
| **ELO Credit Card**        | 5067310000000002                    |
| **HIPERCARD Credit Card**  | 6062825624254001                    |
| **MASTERCARD Credit Card** | 5123740000000002                    |
| **VISA Credit Card**       | 4422120000000008 - 4984460000000008 |

</details>
<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

<table>
<thead>
  <tr>
    <th>Card</th>
    <th>Number</th>
    <th>Cardholder</th>
    <th>CVV</th>
    <th>Expiration date</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>AMEX Credit Card</b></td>
    <td>377825000000005</td>
    <td colspan="3" rowspan="2" style="vertical-align:middle"><a href="#testing-status">Follow the testing values according to the expected result.</a></td>
  </tr>
  <tr>
    <td><b> DINERS Credit Card</b></td>
    <td>36525200000002</td>
  </tr>
  <tr>
    <td><b>MASTERCARD Credit Card</b></td>
    <td>5457210001000019</td>
    <td>BKN_DMC_001</td>
    <td>300</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>MASTERCARD Debit Card</b></td>
    <td>5204730000001003</td>
    <td>BKN_MCS_001</td>
    <td>100</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>MASTERCARD Prepaid Card</b></td>
    <td>5185540320000012</td>
    <td>BKN_DMC_001</td>
    <td>001</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>VISA Credit Card</b></td>
    <td>4761340000000035</td>
    <td>VISA_GLOBAL_3</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>VISA International Card</b></td>
    <td>4005520000000129</td>
    <td>VISA_ECOMMERCE_03</td>
    <td>921</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>VISA Dedit Card</b></td>
    <td>4761340000000050</td>
    <td>VISA_GLOBAL_5</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
</tbody>
</table>

</details>
<details id="colombia">
<summary><img src="/assets/Colombia.png" width="25px"/> Colombia</summary>

| Card                       | Number                                                                |
|----------------------------|-----------------------------------------------------------------------|
| **AMEX Credit Card**       | 377813000000001 - 377847626810864 - 376402004977124 - 376414000000009 |
| **CODENSA Credit Card**    | 5907120000000009                                                      |
| **CRM Credit Card**        | 5282096712463427                                                      |
| **DAVIVIENDA Credit Card** | 5247081012761500                                                      |
| **DINERS Credit Card**     | 36032400000007 - 36032404150519 - 36032440201896                      |
| **MASTERCARD Credit Card** | 5471300000000003 - 5120697176068275                                   |
| **NEQUI Credit Card**      | 4093551018099251                                                      |
| **VISA Credit Card**       | 4097440000000004 - 4037997623271984 - 4111111111111111                |
| **VISA Debit Card**        | 4509420000000008                                                      |

</details>
<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> Mexico</summary>

| Card                       | Number                               |
|----------------------------|--------------------------------------|
| **AMEX Credit Card**       | 376675000000005                      |
| **MASTERCARD Credit Card** | 5579070000000003                     |
| **MASTERCARD Debit Card**  | 5256780000000007                     |
| **VISA Credit Card**       | 4268070000000002                     |
| **VISA Debit Card**        | 4415490000000004                     |

</details>
<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> Panama</summary>

| Card                       | Number                               |
|----------------------------|--------------------------------------|
| **MASTERCARD Credit Card** | 5455040000000005                     |
| **VISA Credit Card**       | 4723030000000005                     |

</details>
<details id="peru">
<summary><img src="/assets/Peru.png" width="25px"/> Peru</summary>

| Card                       | Number                               |
|----------------------------|--------------------------------------|
| **AMEX Credit Card**       | 377753000000009                      |
| **DINERS Credit Card**     | 36239200000000                       |
| **MASTERCARD Credit Card** | 5491610000000001                     |
| **MASTERCARD Debit Card**  | 5236930000000003                     |
| **VISA Credit Card**       | 4907840000000005 - 4634010000000005  |
| **VISA Debit Card**        | 4557880000000004                     |

</details>

### Testing status
When testing Payments, you must send in the request:

* **To get _approved_ transactions**: 
  - Send `APPROVED` in the name of the cardholder.
  - Send **777** in the CVV of the card (for AMEX, use **7777**).
  - The `test` parameter and the description also define the state. If it doesn't work with `test` set as _false_, change its value to _true_.
  - Send the month of the expiration date of the card less than `6` and the year must be `2023` or higher. Example: `05/2025`.
* **To get _declined_ transactions**: 
  - Send `REJECTED` in the name of the cardholder.
  - Send **666** in the CVV of the card (for AMEX, use **6666**).
  - The `test` parameter and the description also define the state. If it doesn't work with `test` set as _false_, change its value to _true_.
  - Send the month of the expiration date of the card higher than `6` and the year must be `2023` or higher. Example: `07/2027`.
<!--* **To get _pending_ transactions**: 
  - Send `PENDING` in the name of the cardholder.
  - Send **777** in the CVV of the card (for AMEX, use **7777**).
  - Send the `test` parameter as _true_.
  - In the buyer and payer information, set the email as `manual-review-hub@email.com`.-->
* For the card number you must enter a valid number, corresponding to the franchise sent in the request. You can use an online card generator for testing purposes or use one of the cards available for your country mentioned before.
* To test PSE bank transfers (Available in Colombia) in the PayU Sandbox environment, see the [PSE Test Guide (PDF)](/assets/pse-test-guide-v5.pdf).
* To test cards in Chile, use the cardholder name, CVV and expiration date displayed in the <a href="#chile" id="linkcl" onclick="document.getElementById('chile').open = true;">example cards</a>.

## Importing the Collection
Click the button below to import our collection in Postman (you may need to refresh the page if the button does not work for you). Note that we create a new environment each time you import the collection.

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
Beware that the order in which you run the requests is important, since some of the data returned by one request may be used in the next invocation. 