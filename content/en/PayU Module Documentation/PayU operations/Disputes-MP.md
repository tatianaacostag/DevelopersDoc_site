---
title: "Disputes"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Learn how to manage the Dispute process requested by your customers. This includes, see the disputes created, provide the evidence to resolve a dispute or refund the amount paid by the customer.
weight: 40
---

![Concepts](/assets/Disputes/Disputes_en.png)

{{% alert title="Note" color="info"%}}
For introductory terms about a dispute refer to this [article]({{< ref "disputes.md" >}}).
{{% /alert %}}

## Permission required
To have access to this module, you need to have a profile with the following permission enabled:

* _Reports_ > _Refunds and disputes_
* _Reports_ > _Resolve disputes with buyers (manage chargebacks)_

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Why is it important to reply to a Dispute? 
* The Merchant can generate mistrust with the client.
* If you don't address the disputes, PayU takes the amount from your account.
* The reservation fund could be higher by the risk area.
* It damages the score of the PayU code facing the payment networks.
* The disputed amount will be frozen until the dispute is solved.

It is important to reply to a dispute by providing evidence before the deadline stipulated by the bank. After the deadline, it is not possible to upload the corresponding evidence for a dispute and the amount may be debited from your account.

For more information about the deadlines defined, refer to [maximum days to provide evidence]({{< ref "disputes.md#maximum-days-to-provide-evidence" >}}).

## How to resolve disputes?
A dispute begins when a buyer does not know a charge made to their credit card. Once the bank is notified, the formal process begins to determine the validity of the purchase.

{{% alert title="Tip" color="info"%}}
If you have the cardholder’s data, the best way to manage a dispute process is to contact them. If the reason for the dispute is just ignorance (the customer didn't recall the purchase or your commerce), you can ask them to call their bank to withdraw the complaint and so the dispute process is resolved in your favor.
{{% /alert %}}

1. When we are notified by the bank that a dispute process has been launched, you are notified about that process. To configure the e-mail or the URL to receive dispute notifications, refer to [Technical configurations]({{< ref "technical-configuration.md#disputes" >}}).

2. Log into your PayU account. In the left menu, expand the _**Transactions**_ menu and select _**Disputes**_.

![PrintScreen](/assets/Disputes/Disputes_02.png)

3. The _**Disputes**_ module opens, scroll down the page and locate the dispute you have opened. You can use the available filters to find your dispute if it is required.

![PrintScreen](/assets/Disputes/Disputes_03.png)

4. The order details appear at the right of the screen. Click _**Resolve dispute**_ at the end of the panel.

<img src="/assets/Disputes/Disputes_04.png" alt="PrintScreen" width="60%"/><br>

5. In the pop up window, you can find the details about why your customer request the dispute process and the dead line to provide evidence to resolve the dispute. Click the _**Attach file**_ link to upload all the evidence you have.

<img src="/assets/Disputes/Disputes_05.png" alt="PrintScreen" width="60%"/>

{{% alert title="Note" color="info"%}}
If you accept that the dispute is not a mistake, you can start a [Refund]({{< ref "Refunds-MP.md" >}}) process by clicking _**Or refund this value**_.
{{% /alert %}}

6. Upload the evidence files to resolve the dispute and click _**Save evidence**_. It is mandatory to save the evidence first before send it to review. The files uploaded here should not be larger than 10MB and must be PDF files.

<img src="/assets/Disputes/Disputes_06.png" alt="PrintScreen" width="60%"/><br>

When finish, click _**Send for review**_.

7. A confirmation window appears informing that the evidence has been send. 

<img src="/assets/Disputes/Disputes_07.png" alt="PrintScreen" width="60%"/><br>

8. At this point, we send the documents to the issuing bank or the network that processed the transaction, from whom the resolution of the case depends.<br><br>
The dispute case may result in won (no chargeback), Lost (chargeback) or refunded. In the case of refunds, the trade is who makes the return to the buyer and the bank does not generate the chargeback. Refer to [dispute states]({{< ref "Disputes.md#dispute-states" >}}) to know all the states of a dispute.

When the financial entity communicates the result of the dispute, the case is automatically updated in the PayU Module.