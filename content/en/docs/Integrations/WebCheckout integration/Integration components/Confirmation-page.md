---
title: "Confirmation Page"
date: 2021-03-29T12:15:57-05:00
description: >
  This page allows you to get system confirmations related with the transaction results. You can update your system's inventories, orders, or databases. This page is not visible to the customer and its goal is to enable communication between systems. The data is sent via the HTTP POST method. </br>If the payer generates payment retries during the payment process, a confirmation page is generated for each transaction. This page is invoked for approved and rejected states.
weight: 30
tags: ["subtopic"]
---

The confirmation page lets you update the databases in your system; hence, this page should not include HTML code as it is not visible to the buyer. This page is optional; when a transaction is complete (i.e., when approved, rejected, or when canceled) our platform sends the variables via the HTTP POST method.

On the confirmation page, you must capture the data you want to store in the database. This capture depends on the programming language you use.
