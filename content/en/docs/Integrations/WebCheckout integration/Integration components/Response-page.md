---
title: "Response Page"
linkTitle: "Response Page"
date: 2021-03-29T12:15:39-05:00
description: >
  The Response page is a mandatory page and lets you show the result of the transaction to the payer. Our system redirects the payer to this page once the transaction has been performed. The data with the payment results is sent to your system via HTTP GET method </br>This page is invoked for all the transaction states: approved, rejected, in validation, awaiting payment (for cash), etc.

weight: 20
tags: ["subtopic"]
---

In this topic, you find how to send data from one transaction to PayU. You must generate an HTML form with the transaction data using the HTTP POST method and pointing it to our system.

If you want PayU to show always the transaction information, make sure you don't send a value in the ```responseUrl``` parameter of the payment form, and leave it blank in PayU Biz. In this case, the buyer can return to your website.
