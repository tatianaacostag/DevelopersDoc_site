---
title: "Transfers"
linkTitle: "Transfers"
date: 2021-09-03T16:42:07-05:00
type: docs
Description: >
  Learn how to transfer funds from your PayU account to your bank account. Additionally, discover how to automate transfers based on schedule or amount.
weight: 20
---

In the _Transfers_ module, you can transfer the funds collected in your virtual PayU account to your registered bank account.

## Considerations

Before initiating a transfer, review the following important considerations:

* Your bank information must be up to date and validated. If you've requested a bank account update, the system will continue sending the funds to your previous account until the PayU Risk team has validated the new account.
* You can schedule transfers based on a specific amount or set a date for automated transfers.
* Each month, the first three local transfers are free of charge. Starting from the fourth transfer in a month, PayU applies a fee in most countries. Note that international transfers incur a fee from the very first transaction. The table below provides an overview of the fees for local and international transfers by country.

| Country    | Local Fee         | International Fee  |
|------------|-------------------|--------------------|
| Argentina  | 110.00 ARS        | 753.00 USD         |
| Brazil     | None              | None               |
| Chile      | 2,000.00 CLP      | 50,000.00 CLP      |
| Colombia   | 6,500.00 COP      | 30.00 USD          |
| Mexico     | 10.00 MXN         | 650.00 MXN         |
| Panama     | 30.00 USD         | 44.00 USD          |
| Peru       | 15.00 PEN         | 90.00 USD          |

{{% alert title="Notes" color="info"%}}

* Fees are subject to change over time. For the most current information or specific questions, please contact your PayU sales representative.
* International transfers are also subject to a 3% FX fee (subject to negotiation) to cover currency exchange rate costs.
* In Brazil, as PayU is not a licensed payment institution, the system automatically transfers your funds to your bank account daily at no cost. To monitor these transfers, use the _**Daily payouts**_ option (_**Transfers**_ > _**Daily Transfers**_).

{{% /alert %}}

* The first transfer may take up to five (5) days to be deposited in your bank account. As part of an administrative process, the PayU Risk team may request additional documentation to verify your initial sales.
* The second and subsequent transfers will take a maximum of three (3) business days to complete. Business days are typically Monday to Friday, excluding public holidays.

{{% alert title="Note" color="warning"%}}

The times mentioned apply only to local transfers. For international transfers, please contact your sales representative.

{{% /alert %}}

## Permission Required

To have access to this module, you need to have a profile with the following permission enabled:

* _Transfers_ > _Review_
* _Transfers_ > _Manage_<br>This permission allows you to perform transfers.	

Refer to [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Transfer Funds

You can transfer up to the total amount in your PayU account to the registered bank. Follow these steps to perform a transfer.

1. Log into your PayU account. In the left menu, expand the _**Transfers**_ menu and select _**Transfers**_.

![PrintScreen](/assets/Transfers/Transfers_01.png)

2. Complete the value to transfer or select the _**Transfer all available balance**_ option. In the right panel, the value entered is updated; furthermore, this panel shows how many free transfers you have until the end of the month.<br>If you don't have free transactions, this panel also displayed the value of the transaction along with the taxes.

![PrintScreen](/assets/Transfers/Transfers_02.png)

3. Click _**Request transfer**_. A confirmation window appears to confirm the amount to be transferred, the value to be debit from your account, and the target account.<br>Click _**OK**_ to confirm it or _**Reject**_ to discard it.

<img src="/assets/Transfers/Transfers_03.png" alt="PrintScreen" width="50%"/><br>

4. The result of the operation appears. Take into account the number of days to reflect the money in the target account.

<img src="/assets/Transfers/Transfers_04.png" alt="PrintScreen" width="50%"/><br>

As soon as the request has been successfully sent the transfer is in _In progess_ status and you can see it in the _**Created transfers report**_ section at the end of the module; also, the amount requested is debited from your balance.<br>If the transfers could not be processed, this amount backs to your account and no fee is charged for this operation.

## Schedule Transfers

You can automate the transfers and request the a withdrawal given a fixed amount or each certain time.

{{% alert title="Note" color="info"%}}
* <img src="/assets/Brasil.png" width="20px"/> _**Schedule transfer**_ is not available for Brazil.
* When scheduling transfers, you must have the enough funds by the time when the transfer is executed.
{{% /alert %}}

To schedule a transfer, follow these steps.

1. Log into your PayU account. In the left menu, expand the _**Transfers**_ menu and select _**Schedule transfer**_.

![PrintScreen](/assets/Transfers/Transfers_05.png)

2. The _**Schedule Transfers**_ module opens, here you can see all the scheduled transfers you have configured. Click _**Schedule Transfer**_ to set up a new schedule.

![PrintScreen](/assets/Transfers/Transfers_06.png)

{{% alert title="Options" color="info"%}}
The _options_ column provides the following actions:
* Edit (<img src="/assets/Transfers/Transfers_10.png" width="2%" style="vertical-align: top;"/>): allows you to change the configuration of the schedule.
* Delete (<img src="/assets/Transfers/Transfers_11.png" width="2%" style="vertical-align: top;"/>): allows you to deactivate the schedule. Once the schedule is removed, no automatic transfers can be created.
{{% /alert %}}

3. Select how you want to schedule the transfer.

* **Schedule Transfers by Periodicity**<br>
This option lets you transfer a given amount every certain time (days, weeks, or months). To schedule this type of transfers, select the option _Periodicity_.

* **Schedule Transfers by Available Balance**<br>
This option lets you transfer a given amount every time the balance reaches a specific value. To schedule this type of transfers, select the option _Balance available_.

Provide the following options.

| Option | Description |
|-|-|
| Make a withdrawal each | Select the periodicity of the transfers you want to schedule. This option is available for transfers scheduled by periodicity.<br><br>![PrintScreen](/assets/Transfers/Transfers_07.png) |
| Select the amount to withdraw | Select the amount you want to transfer, you can select the total available balance or a fixed value.<br><br>![PrintScreen](/assets/Transfers/Transfers_08.png) |
| Amount to withdraw | Select the amount you want to transfer. This field appears when you select the option _Configure value_. |
| Start my transfers on | Select the starting date for the schedule. In this date, the first transfer is scheduled.<br><br>![PrintScreen](/assets/Transfers/Transfers_09.png) |
| Description | Provide a meaningful description for your transfer. |

4. When finish, click _**Schedule Transfer**_.