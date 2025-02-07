---
title: "Disputes"
date: 2021-09-03T16:42:19-05:00
type: docs
Description: >
  Learn how to manage the dispute process for your customers, including configuring notification methods, reviewing disputes, providing evidence, or initiating refunds. For more details on how the disputes mechanism works within PayU, refer to the <a href="https://developers.payulatam.com/latam/en/docs/tools/disputes.html" target="_blank">Disputes</a> documentation.
weight: 40
---

The following diagram illustrates the flow of the disputes process in PayU, highlighting each step from notification to resolution:

{{< disputes/disputes_flow >}}

## Permissions Required
To access this module, your profile must have the following permissions enabled:

- _Reports_ > _Refunds and disputes_
- _Reports_ > _Resolve disputes with buyers (manage chargebacks)_

Refer to [Profiles and Permissions]({{< ref "Profile-and-permissions-management.md" >}}) for more details.

## Why Is It Important to Respond to a Dispute?

Responding to disputes promptly is critical to protect your business:

- Avoid damaging trust with customers.
- Prevent funds from being deducted from your account.
- Mitigate the risk of increased reserve funds imposed by the risk area.
- Preserve your PayU code score with payment networks.
- Ensure disputed amounts are not frozen for prolonged periods.

You must provide evidence before the deadline set by the bank. Missing the deadline may result in the amount being debited from your account.

For information on deadlines, refer to [Deadlines for Submitting Evidence]({{< ref "disputes.md#deadlines-for-submitting-evidence" >}}).

## Receiving Dispute Notifications

You can receive dispute notifications through two methods:

1. **Email Notifications**: Receive updates directly via email.
2. **Automatic Notifications**: Configure a URL in the _**Technical Configuration**_ section of the Management Panel to receive dispute updates via `POST`.

### Steps to Enable Notifications

1. Log into the PayU Management Panel, navigate to _**Settings**_, and select _**Technical Configuration**_.

<img src="/assets/IntegrationVariables_01.png" alt="Tech config" width="80%" style="display: block; margin: auto;" />
<br>

2. In the _**Disputes**_ tab, enter the email addresses for receiving notifications or enable the automatic notification URL, then specify the domain where you want our API to send `POST` updates. Once you have enabled one or both notification methods, click on _**Save changes**_.

<img src="/assets/Disputes/Disputes_01.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

## Resolving Disputes

Disputes occur when buyers dispute charges on their credit cards. The bank notifies PayU, and the formal process begins to validate the transaction.

{{% alert title="Tip" color="info"%}}
If you have the cardholder’s contact information, reach out to resolve the issue. If the dispute stems from confusion (e.g., unrecognized charges), ask the buyer to contact their bank and withdraw the claim. This approach often resolves disputes in your favor.
{{% /alert %}}

### Steps to Resolve Disputes

1. When notified of a dispute, configure your email or URL to receive updates. Refer to [Technical Configurations]({{< ref "technical-configuration.md#disputes" >}}).

2. Log into your PayU account, expand the _**Transactions**_ menu, and select _**Disputes**_.

<img src="/assets/Disputes/Disputes_02.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

3. In the _**Disputes**_ module, locate the dispute. Use filters if needed.

<img src="/assets/Disputes/Disputes_03.png" alt="Dispute Details" width="80%" style="display: block; margin: auto;" />
<br>

4. Review the dispute details on the right panel and click _**Resolve Dispute**_.

<img src="/assets/Disputes/Disputes_04.png" alt="Dispute Details" width="40%" style="display: block; margin: auto;" />
<br>

5. In the pop-up window, review the reason for the dispute and the deadline for submitting evidence. Click _**Attach File**_ to upload your evidence.

<img src="/assets/Disputes/Disputes_05.png" alt="Dispute Details" width="40%" style="display: block; margin: auto;" />

{{% alert title="Note" color="info"%}}
If you accept the dispute, you can initiate a [Refund]({{< ref "Refunds-MP.md" >}}) by clicking _**Or refund this value**_.
{{% /alert %}}

6. Upload evidence (PDF files under 10MB) and click _**Save Evidence**_. Once saved, click _**Send for Review**_.

<img src="/assets/Disputes/Disputes_06.png" alt="Dispute Details" width="40%" style="display: block; margin: auto;" />
<br>

7. A confirmation window will appear once your evidence is submitted.

<img src="/assets/Disputes/Disputes_07.png" alt="Dispute Details" width="40%" style="display: block; margin: auto;" />
<br>

8. PayU forwards the evidence to the issuing bank or network. The case outcome may be:

   - **Won**: The dispute is resolved in your favor (no chargeback).
   - **Lost**: The dispute results in a chargeback.
   - **Refunded**: You voluntarily refunded the buyer, avoiding a chargeback.

Refer to [Dispute States]({{< ref "Disputes.md#dispute-states" >}}) for detailed information on dispute statuses.

## Final Considerations

When the financial entity communicates the resolution, the dispute status is automatically updated in the Management Panel. Ensure you monitor dispute notifications and respond promptly to minimize risks and potential losses.