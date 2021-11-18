---
title: "Guia do Módulo PayU"
linkTitle: "Início"
date: 2017-01-05
type: docs
description: >
  Facilitamos para os comércios a oferta de pagamentos online, eliminando o desafio da integração com vários métodos de pagamento.
menu:
  main:
    name: Guia do Módulo PayU
    weight: 40    
---

The Módulo PayU is the system where you can securely manage your account. In this module, you can change your password, get sales reports, find the data needed to integrate your website with our platform, use tools to receive payments, and transfer money to your bank account.
Módulo PayU is ideal for businesses that need to:

* Keep control of their stocks and sales performed through PayU.
* Be updated with the information of the financial movements of their account.
* Make requests to the support team about issues in their account.

To access the Módulo PayU, go to www.payu.com, no canto superior direito, você encontra a opção de fazer login.<br>Alternativamente, você pode ir diretamente https://merchants.payulatam.com/.

![PrintScreen](/assets/Login1_en.png)

{{% alert title="Observação" color="info"%}}

You don't have a user yet? Learn how to create one [aqui]({{< ref "create-an-account.md" >}}).

{{% /alert %}}

## What you can do using the Módulo PayU
Módulo PayU allows you to perform the following operations:

* See the available funds in your PayU account and transfer them to your bank account.
* Consult the movements of your accounts, statements, and reports.
* View the status of your sales
* Find the authentication credentials to integrate with your sales platform: API Key, API Login, and merchant ID.
* Update your bank details.
* Configure your company’s logo to appear on the Web Checkout (payment gateway).
* Set the URLs of your confirmation page and answer page (if you have an API integration or Web checkout).

## Módulo PayU concepts
The Módulo PayU allows a user to manage the merchant and its related accounts.  The complexity of your Módulo PayU depends on your size. Let's explain this using the following concepts.

* **Merchant**: the merchant is the store that offers products or services. PayU defines the merchant as the legal person who hires the PayU service. If your store is legally constituted in two countries (two legal entities), each legal entity must be created as a merchant.<br>Por exemplo, _Shop ABC_ has branches in Mexico and Colombia, but the shop has constituted one company in each country, when _Shop ABC_ hires the PayU services, PayU creates two different merchants.

{{% alert title="Observação" color="info"%}}
Each merchant in PayU has a unique `Merchant ID`.
{{% /alert %}}

* **Account**: an account in PayU represents a processing country, a business line, or a hired PayU feature of a given merchant. If your shop is legally constituted in a country and sells products in many countries, you have a single merchant (your shop) in which you find an account per each country.<br>Por exemplo, _XYZ systems_ is a company legally constituted in the United States who offers the services of web hosting in Colombia, Mexico, and Peru. When _XYZ systems_ hires the PayU services, PayU creates a merchant with three accounts.<br>Moreover, an account is also one of the following:
  - A business line: when a merchant has many different business lines in a given country. Por exemplo, a software company can offer their product as one business line and the training as another. In this case, this commerce has two accounts.
  - A feature: if you hire two PayU features with a different pricing schema, each feature is represented in your Módulo PayU as an account. Por exemplo, a shop has one price to process with credit cards and one different when they process with cash payments.
* **User**: a user is a person who has a profile to manage or consult the information of an account.<br>A profile is a set of permissions to access an account. A user can have one or multiple profiles, this means that a user can access multiple accounts and multiple merchants.

The following graphics show the relation between the concepts above.

#### Multi merchant shop
The shop _Shop ABC_ has branches in Mexico and Colombia, both are legally constituted as _Shop ABC Mexico_ and _Shop ABC Colombia_, this is the relation between the previous concepts for this example:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts1.png" width="50%"/><br>

* The Módulo PayU for _Shop ABC_ has two merchants: _Shop ABC Mexico_ and _Shop ABC Colombia_, each merchant has an account as they process only in the country where they are constituted.

* _Shop ABC_ has four users; **User 2** and **User 3** can access both accounts, meanwhile **User 1** can only access the Colombian account and **User 4** to the Mexican account. 

{{% alert title="Observação" color="info"%}}

In this case, each merchant may have multiple accounts, if required.

{{% /alert %}}

#### Single merchant shop with multiple accounts
_XYZ systems_ is a company legally constituted in the United States who offers the services of web hosting in Colombia, Mexico, and Peru; in addition, _XYZ systems_ has two business lines in Colombia: web hosting and training. This is the relation between the previous concepts for this example:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts2.png" width="50%"/><br>

* The Módulo PayU for _XYZ systems_ has a single merchant as they are legally constituted in the United States. As _XYZ systems_ processes in three countries, this merchant has four accounts; two for Colombia (one per each business line), one for Mexico and one for Peru.

* _Shop ABC_ has four users; **User 3** can access all the accounts, meanwhile, the other users can access their assigned country.

{{% alert title="Observação" color="info"%}}

Merchants can be outside of our processing countries. Nevertheless, they must have an intermediary bank account in each country they want to process.

{{% /alert %}}

#### Single merchants with single accounts
This is the most common case when using the Módulo PayU. A shop is legally constituted in a country where it offers its products or services, this is the relation between the previous concepts for this example:

<img src="/assets/MerchantPanel/MerchantPanel_Concepts3.png" width="50%"/><br>

* The Módulo PayU for this shop has a single account and a single merchant, where all its users can access according to the profile they have.