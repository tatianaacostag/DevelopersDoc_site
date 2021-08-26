---
title: "Understanding the PayU module"
linkTitle: "Understanding the PayU module"
date: 2021-08-17T14:47:21-05:00
type: docs
Description: > 
  Once you log in the PayU module, you can see the options available to manage your account, know your sales status, control your finances, transfer money from your PayU account, and more.
weight: 30
tags: ["parenttopic"]
---

## Prerequisites
Before moving on with the explanation of how the PayU module is organized, you need the following:
* Have a user in PayU module. Learn how to create one [here]({{< ref "create-an-account.md" >}}).
* Have read and understand the [concepts behind the PayU Module](/payu-module-documentation.html#payu-module-concepts).

## PayU Module web application
PayU module is divided in four main groups:

1. [Account options]({{< ref"#1-account-options" >}}).
2. [Settings and user options]({{< ref"#2-settings-and-user-options" >}}).
3. [Main panel]({{< ref"#3-main-panel" >}}).
4. [Footer]({{< ref"#4-footer" >}}).

![PrintScreen](/assets/MerchantPanel/MerchantPanel_01.png)

### 1. Account options 
This panel has the options required to manage the accounts associated to the current merchant. In this panel you find the following options:

<div class="variables"></div>

| Option | Sub option | Available in | Description |
|---|---|:---:|---|
| Merchant ID |  | <img src="/assets/World.png" width="20px"/> | ID number of your shop in PayU’s system. This ID is required when you want to use [Integrations](/docs/integrations.html).  |
| Account | Account information | <img src="/assets/World.png" width="20px"/> | Displays the name and ID of the selected account.<br>This option also to change the account and perform operation related to it. Click the **▾** symbol to find these options or change the account.<br><br><img src="/assets/MerchantPanel/MerchantPanel_02.png" alt="PrintScreen" width="40%"/> |
|  | My business information | <img src="/assets/World.png" width="20px"/> | Shows the location, main contact information of your business. Also, this option shows the people associated with your business. |
|  | Your sales information | <img src="/assets/World.png" width="20px"/> | Allows you to provide the information of how you make your sales so we can improve communication with your clients.<br>Using this option, you can configure what you sell, the logo of your shop, delivery information, how you offer your products or services and how your clients can contact you. |
|  | Bank information | <img src="/assets/World.png" width="20px"/> | Shows the bank account and the Intermediary bank where you want to transfers the funds collected for this account. |
| Balance available | | <img src="/assets/World.png" width="20px"/> | Displays the balance available in the selected account. |
| Home | | <img src="/assets/World.png" width="20px"/> | Displays the welcome page of the PayU module. For more information, refer to [Home]({{< ref "#home-page" >}}) page. |
| Transactions | Sales report | <img src="/assets/World.png" width="20px"/> | Review the details of payments received, including the most used payment methods and frequent clients. |
| | Disputes | <img src="/assets/World.png" width="20px"/> | Manage the dispute processes generated in your PayU account. For more information, refer to [Disputes]({{< ref "Disputes.md" >}}). |
| | Financial Statement | <img src="/assets/World.png" width="20px"/> | Allows you to understand the money flow in your account, the applied charges and the related fees and taxes. |
| | Withholding certificate | <img src="/assets/Colombia.png" width="20px"/> | Download your Withholding Certificate according to the requested period of time. |
| Transfers | Transfers | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Allows you to send the funds collected in your PayU account to your Bank account. |
| | Schedule Transfers | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Chile.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/><img src="/assets/Mexico.png" width="20px"/><img src="/assets/Panama.png" width="20px"/><img src="/assets/Peru.png" width="20px"/> | Allows you create transfer on a daily, weekly, monthly basis. Furthermore, you can configure custom transfers as you need. |
| | Edit bank information | <img src="/assets/World.png" width="20px"/> | Allows you to request the change of the bank account and the Intermediary bank where you want to transfers the funds collected for this account. |
| Sell with PayU | Sell on the internet | <img src="/assets/World.png" width="20px"/> | Allows you to create payment requests so you can charge to your customers without having a website. For more information, refer to [Payment request]({{< ref"Payment-request.md" >}})  |
| | Cash charges | <img src="/assets/Argentina.png" width="20px"/><img src="/assets/Colombia.png" width="20px"/> | Allows you to generate payment coupons with the necessary information to let your clients make cash payments as many times as they need in the available payment points. For more information, refer to [Payment coupons]({{< ref"Payment-coupons.md" >}})  |
| | My tools | <img src="/assets/World.png" width="20px"/> | Allows you find and manage the information of _Payment links_ (Payment request) and _Payment Coupons_* you have created in your account.<br>\*Payment coupons are only available in Argentina and Colombia. |

### 2. Settings and user options.
This panel has the options required to manage your merchant and your user.

<img src="/assets/MerchantPanel/MerchantPanel_03.png" alt="PrintScreen" width="50%"/>

#### Merchant settings
This option allows you to manage users, permissions, profiles and the technical configuration of your merchant. By clicking the _**Settings**_ button, you can find the following options:

<div class="variables"></div>

| Option | Available in | Description |
|---|:---:|---|
| Asobancaria | <img src="/assets/Colombia.png" width="20px"/> | Allows you to configure how Payu generates your Asobancaria reports are generated to facilitate reconciliation with your banks.  |
| User management | <img src="/assets/World.png" width="20px"/> | Allows you to grant access to your team members so they can collect payments online or check information about your payments.  |
| Permissions and profiles | <img src="/assets/World.png" width="20px"/> | Allows you to create custom profiles with specific permissions.<br>In this section, you can also query the default permission included in the PayU Module. |
| Technical configuration | <img src="/assets/World.png" width="20px"/> | In this option, you can find the variables required to integrate PayU with your Web page. Furthermore, you can configure the notifications of processed payments and Disputes. For more information, refer to [Technical configuration]({{< ref"Technical-configuration.md" >}}) |

#### User settings
This option allows you to manage your profile. In the main view of this option, you find your email, your current profile in the PayU module (for the current account) and the account Id; click the **▾** symbol to display the available user settings.

<div class="variables"></div>

| Option          | Description                                                                             |
|-----------------|-----------------------------------------------------------------------------------------|
| Change merchant | This option is available when your user is enrolled to more than one merchant.          |
| My profile      | In this option, you can configure your preferences and update your password as desired. | 
| Sign off        | This option closes the session of the active user.                                      |

### 3. Main panel
This panel loads the selected option either in the left panel or in the option at the top. The _**Home**_ page is selected by default, so it loads as soon as you log in the PayU module.

To set an option as displayed by default, click the three dot menu at the top left of the panel and select _**Set as main page**_.

<img src="/assets/MerchantPanel/MerchantPanel_04.png" alt="PrintScreen" width="40%"/>

#### Home page
The home page is starting point of the Merchant panel. It shows the shortcuts to perform sales on-line, control your finances, transfers funds, learn about e-commerce and leave us comments.

![PrintScreen](/assets/MerchantPanel/MerchantPanel_05.png)

In this page, you can also take a tour using the _**Virtual tour**_ button. This button takes your through the main options to manage your account.

{{% alert title="Note" color="info"%}}
Some options are attached to the permissions configured to your user.
{{% /alert %}}

### 4. Footer
The footer provides the phone number to contact us and the link to the _**terms and conditions**_ according to the processing country.

The following are the phone numbers and contact time:

* <img src="/assets/Argentina.png" width="25px"/> (+5411) 598-42132 > Mon - Fri 09:00 - 22:00 (UTC -3:00)
* <img src="/assets/Brasil.png" width="25px"/> (+5511) 4130-5311 > Mon - Fri 09h to 18h / Sat 09h to 15h - Brasilia Time Zone (UTC -3:00)
* <img src="/assets/Chile.png" width="25px"/> (+562) 258-13949 > Mon - Fri 8:00 - 21:00 Chilean time
* <img src="/assets/Colombia.png" width="25px"/> (+571) 654-0721 > Mon - Fri 7:00 - 20:00 Colombian time (UTC -5:00)
* <img src="/assets/Mexico.png" width="25px"/> (+5255) 474 11439 > Mon - Fri 7:00 - 20:00 CDMX time
* <img src="/assets/Panama.png" width="25px"/> (+507) 836-5577 > Mon - Fri 7:00 - 20:00 Colombian time (UTC -5:00)
* <img src="/assets/Peru.png" width="25px"/> (+511) 708-5381 > Mon - Fri 7:00 - 20:00 Peruvian time (UTC -5:00)