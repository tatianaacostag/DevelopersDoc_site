---
title: "WebCheckout Variables"
date: 2021-03-29T12:16:35-05:00
description: >
  In this section, you find relevant data used during the integration process, such as the variable tables, languages, and currencies admitted in the PayU’s platform.
weight: 20
draft: true
---

<details>
<summary>Response codes sent to the response page</summary>

| lap Transaction State | transaction State | pol Transaction State | lapResponseCode | pol Response Code | Description |
|---|---|---|---|---|---|
| ```APPROVED``` | 4 (Approved) | 4 (Approved) | ```APPROVED``` | 1 | Transaction approved |
| ```DECLINED``` | 6 (Declined) | 6 (Rejected) | ```PAYMENT_NETWORK_REJECTED``` | 4 | Transaction rejected by the payment network |
|  |  |  | ```ENTITY_DECLINED``` | 5 | Transaction declined by the bank |
|  |  |  | ```INSUFFICIENT_FUNDS``` | 6 | Insufficient funds |
|  |  |  | ```INVALID_CARD``` | 7 | Invalid Card |
|  |  |  | ```CONTACT_THE_ENTITY``` | 8 | Please contact your financial entity |
|  |  |  | ```BANK_ACCOUNT_ACTIVATION_ERROR``` | 8 | Automatic debit not allowed |
|  |  |  | ```BANK_ACCOUNT_NOT_AUTHORIZED_FOR_AUTOMATIC_DEBIT``` | 8 | Automatic debit not allowed |
|  |  |  | ```INVALID_AGENCY_BANK_ACCOUNT``` | 8 | Automatic debit not allowed |


</details>
