---
title: "Autenticação 3DS"
date: 2021-12-07T10:25:17-05:00
description: >
  3DS (em inglês **Three-Domain Secure**) permite realizar um processo de autenticação intuitivo e amigável para o cliente. 3DS acrescenta camadas adicionais de segurança para reduzir a fraude, impedindo a utilização não autorizada de cartões de crédito. 
weight: 20
---

## O que é 3DS? {#what-is-3ds}
3DS (em inglês **Three-Domain Secure**) é um protocolo de mensagens que permite aos emissores autenticar os seus titulares de cartões durante as compras on-line. Esta autenticação é realizada antes de a transacção ser autorizada e segue este fluxo.

![](/assets/3DS/3DS_whatis_pt.png)

O infográfico seguinte explica o fluxo de autenticação 3DS.

{{< 3dsAuth/AuthFlow_pt >}}

## Benefícios do 3DS{#3ds-benefits}
3DS (em inglês **Three-Domain Secure**) acrescenta camadas adicionais de segurança para reduzir a fraude, impedindo a utilização não autorizada de cartões de crédito, protegendo-o de estornos de fraude. 

Usando o 3DS, pode ter:

* **Mais aprovação, menos fraude.**<br>
O intercâmbio de dados entre comerciantes e emitentes apoia melhores decisões de autorização e detecção de fraudes. Em caso de fraude, o emissor é responsável perante o comprador.

* **Melhoria da experiência do utilizador.**<br>
3DS permite uma melhor integração do processo de autenticação na experiência de compra do utilizador final. Reduz o atrito do utilizador numa maior percentagem de transacções.

* **Cumpre os regulamentos e normas da [EMVCo](https://www.emvco.com/emv-technologies/3d-secure/).**<br>
Apoia uma forte autenticação de clientes para emissores, adquirentes e serviços de pagamento em mercados regulamentados.

## Solução de Autenticação 3DS {#3ds-authentication-solution}
A Autenticação 3DS, disponível para o Brasil e Colômbia, é oferecida através de API sob duas modalidades:

* _**Pass Through**_: se tiver o seu próprio serviço 3DS Authentication, pode enviar-nos a resposta de autenticação no pedido de pagamento. Sob esta modalidade, é responsável pela integração com um _**MPI**_ ou um _**3DS Server**_.<br>Para mais informações, queira contactar o seu representante de vendas.

* _**Fluxo de duas chamadas**_: se desejar autenticar a transacção utilizando PayU, pode integrar através do **PayU Hub**<sup>\*</sup> utilizando o [Serviço de Autenticação](https://developers.paymentsos.com/docs/threed-d-secure-authentication-service.html) que funciona num fluxo de duas chamadas; uma para autenticação e outra para autorização.<br>Para autenticação, deve ligar-se ao PayU Hub, onde obterá a resposta de autenticação.<br>Para autorização, pode optar por utilizar **PayU Latam** ou **PayU Hub**.

<sup>\*</sup>O **PayU Hub** é a solução de pagamento sem fronteiras globais. Com uma integração API única, processa pagamentos locais com métodos de pagamento relevantes em 18 mercados.

{{% alert title="Observação" color="info"%}}
A Autenticação 3DS é suportada para os cartões Visa e MasterCard.
{{% /alert %}}

Leve em conta o seguinte ao utilizar a Autenticação 3DS:

* O Serviço de Autenticação é separado do Serviço de Autorização.
* A Autorização deve incluir a resposta de Autenticação.

### Benefícios da nossa solução {#benefits-of-our-solution}
Quando utiliza o Serviço de Autenticação oferecido pelo **PayU Hub** (Fluxo de duas chamadas), tem os seguintes benefícios.

* PayU está conectado a un servidor 3DS (MPI), no es necesario que lo hagas por tu cuenta. ¡Menos proveedores y contratos!
* Você controla e decide quando autenticar uma transação.
* Sem custos adicionais<sup>\*</sup> - a autenticação é um serviço gratuito oferecido pelo PayU!
* Mínimo ou nenhum ajuste contratual para aceder ao serviço 3DS.
* Se migrar para o HUB, poderá ter benefícios adicionais da nossa solução global.

<sup>\*</sup> _Os adquirentes podem cobrar uma taxa de autenticação, se assim for, esta taxa ser-lhe-á transmitida._

### Como integrar 3DS? {#how-to-integrate-3ds}
A Autenticação 3DS é um serviço disponível a pedido, contacte o seu Key Account Manager ou o Apoio Técnico para o activar.<br>Dependendo do cenário escolhido para utilizar a Autenticação 3DS, o procedimento de integração varia.

#### Pass Through
Quando está integrado com um _**MPI**_ ou um _**3DS Server**_, só precisa de nos enviar a resposta de autenticação no pedido de pagamento. Veja o seu país de processamento para um exemplo de como enviamos os parâmetros devolvidos na resposta:

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Brazil.md#considerations" >}}'><img src="/assets/Brasil.png" width="10%"/></a>
  </div>
  <div style="float: left;width: 50%;text-align: center;">
    <a href='{{< ref "Payments-API-Colombia.md#considerations" >}}'><img src="/assets/Colombia.png" width="10%"/></a>
  </div>
</div>
<br>

#### Fluxo de duas chamadas {#flujo-de-dos-llamados}
Siga estes passos para se integrar com o nosso serviço de Autenticação:

1. Para começar, abra uma conta no **PayU Hub**.<br>Clique [aqui](https://control.paymentsos.com/signup) para criar uma conta.

2. Actualize a sua integração. Peça à sua equipa de desenvolvimento para actualizar a sua integração de modo a que esta se ligue agora ao API do **PayU Hub**.

3. Tudo o que resta agora são alguns testes, e é tudo - dar o passo da produção. 

Tudo o resto permanece igual!

* A sua oferta actual permanece a mesma. Pode continuar a oferecer os seus métodos de pagamento actuais através de **PayU Latam** ou **PayU Hub***.
* Novo processo de Onboarding? Claro que não! Já está connosco, por isso não precisamos de mais nada.
* Os pagamentos continuam a ser tratados pelas plataformas locais, por isso certificamo-nos de que os mesmos dados estão disponíveis para si.
