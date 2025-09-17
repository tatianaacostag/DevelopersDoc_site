---
title: "Smart Check – Automatic Reverification"
linkTitle: "Smart Check – Automatic Reverification"
date: 2025-03-26T15:09:39-05:00
description: >
  Smart Check is PayU LATAM’s automatic merchant reverification solution, designed to optimize compliance processes (KYC/AML).
weight: 60
---

With this feature, merchants update their information directly from the <a href="https://merchants.payulatam.com/login/auth" target="_blank">Merchant Panel</a>, while the system automatically performs validations and screenings, reducing the manual workload of risk and compliance teams.

## How does Smart Check work?

The reverification flow consists of the following steps:

### 1. Case creation

Reverification begins with the generation of a case, as follows:

* **Automatic:** based on the frequency defined in the AML section of the merchant account.  
* **Manual:** in specific situations, such as reactivation processes.  
* Cases are initially assigned to the **Automatic Reverification** user.

### 2. Digital form

The merchant receives a form in the **Merchant Panel** and has up to **80 configurable days** to complete it.

### 3. Automatic validations

The system performs the following processes:

* **Web Scraper:** validates the economic activity against the registered website.  
* **Adverse Media:** searches for negative news, sanctions, or relationships with PEPs.  
* **Identity Validation & OCR:** verifies documents and legal representatives.  
* **Risk matrix:** is automatically generated and executed based on declared data and active subaccounts.  

### 4. Result

At the end of the validations, the system determines the outcome of the case based on the findings.

* **Automatic approval:** the case is closed if no alerts are detected.  
* **Manual review:** the case is assigned to analysts if any findings are detected (e.g., prohibited MCC, document inconsistencies, or sanctioned CRP).  

## Key benefits

The implementation of Smart Check provides significant advantages for both merchants and risk/compliance teams, streamlining the management of reverification processes.

* Reduced manual effort in KYC/AML processes.  
* Automatic approval of low-risk cases.  
* Greater traceability and security in the reported information.  
* Flexibility in response times and management rules.  

## Case statuses

In Salesforce, cases move through the following statuses:

* `Created:` Case created, form pending.  
* `Waiting:` Form available to the merchant.  
* `Filled:` Form completed and submitted.  
* `Form Expired:` The merchant did not respond within the timeframe.  
* `Working:` Validations in progress.  
* `Close Approved:` Case automatically approved.  
* `Manual Review:` Case assigned to analysts due to alerts or inconsistencies.  

### Additional considerations

When implementing Smart Check, it is important to consider certain operational aspects and limitations that may affect case management:

* In **Phase 1**, the approved information is updated only in Salesforce. Integration with Admin is planned for **Phase 2**.  
* In multi-country operations, case creation may require manual management.  
* Some scenarios may trigger a manual review (for example, when Complif does not confirm the legal representatives in the Chamber of Commerce).