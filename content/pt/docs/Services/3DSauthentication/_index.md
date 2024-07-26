---
title: "Autenticação 3DS"
linkTitle: "Autenticação 3DS"
date: 2024-07-01T11:32:55-05:00
description: >
  Esta seção explica a autenticação 3DS e como aproveitá-la para maior segurança no processamento de pagamentos PayU.  
weight: 20
tags: ["parenttopic"]
---

Se você já conhece o 3DS, verifique nossos métodos de integração:
* <a href="http://developers.payulatam.com/latam/pt/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">Autenticação 3DS realizada pela PayU: </a>Deixe a PayU gerenciar o processo de autenticação para você.
* <a href="http://developers.payulatam.com/latam/pt/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">Autenticação 3DS externa: </a>Integre seu serviço 3DS existente com a PayU.
* <a href="https://developers.paymentsos.com/docs/flows-and-operations/three-d-secure-two.html" target="_blank">Autenticação 3DS do PayU HUB: </a>Se a sua integração for através do PayU HUB.

## O que é 3DS?
3DS (Three-Domain Secure) é um protocolo de segurança que adiciona uma camada extra de verificação durante pagamentos online. Ele funciona se comunicando com segurança com o banco emissor do cartão do titular do cartão para confirmar sua identidade antes de autorizar a transação. Isso reduz significativamente o risco de uso não autorizado do cartão e fraude.

{{% alert title="Observação" color="info"%}}
A autenticação 3DS para PayU Latam está disponível apenas para **Argentina**, **Brasil**, **Colômbia** e **Peru**.
{{% /alert %}}

O diagrama abaixo descreve o fluxo do protocolo:

![](/assets/3DS/3DS_FLOW_PT.png)

Abaixo, um exemplo do processo de autenticação:

{{< 3dsAuth/AuthFlow_pt >}}

## Benefícios da Autenticação 3DS
* **Maior segurança e redução de fraude:** Ao verificar a identidade do titular do cartão, o 3DS ajuda a prevenir transações fraudulentas. Além disso, em caso de estorno fraudulento, a responsabilidade geralmente muda para o banco emissor.

* **Experiência do usuário aprimorada:** As implementações modernas do 3DS garantem um processo de autenticação fluido com interrupção mínima para a experiência de compra do usuário.

* **Conformidade regulatória:** O 3DS segue os padrões e regulamentações <a href="https://www.emvco.com/emv-technologies/3d-secure/" target="_blank">EMVCo</a> em muitos mercados, garantindo a conformidade para comerciantes e processadores de pagamento.

## Aproveitando o 3DS com a PayU 
A PayU Latam oferece 2 opções para integrar a autenticação 3DS ao seu processamento de pagamento:

* <a href="http://developers.payulatam.com/latam/pt/docs/services/3dsauthentication/payu-handled-3ds-authentication.html" target="_blank">Autenticação 3DS realizada pela PayU:</a> Se você não possui seu próprio serviço 3DS, a PayU pode gerenciar o processo de autenticação em seu nome.

* <a href="http://developers.payulatam.com/latam/pt/docs/services/3dsauthentication/external-3ds-authentication.html" target="_blank">Autenticação 3DS externa:</a> Este método permite que você aproveite o seu provedor de serviços 3DS existente. Você cuidará do processo de autenticação e enviará a resposta diretamente para a PayU dentro da solicitação de pagamento.

Escolha a opção que melhor se adapta à sua infraestrutura e preferências existentes.
