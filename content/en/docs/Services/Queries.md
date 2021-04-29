---
title: "Queries for transactions"
linkTitle: "Queries for transactions"
date: 2021-03-26T09:12:41-05:00
description: >
  Using the Queries feature, you can check the status of the transactions generated from placed orders. Furthermore, you can get information related to the payment flow such as the available payment methods. 
weight: 20
---

## Considerations
Before using the _Queries_ feature, take into account the following considerations:

* It is recommended to use _Queries_ for transactions in `PENDING` state.
* According to the payment method, the time to perform the query may vary. Nevertheless, it is recommended to perform the first query seven minutes after the transaction is created.
* Do not retry a query of a transaction when PayU indicates that the transaction does not exist.
* Bank transfer transactions are only available every ten minutes.

## Query criteria
To query transactions, PayU allows you to search by any of the following criteria.