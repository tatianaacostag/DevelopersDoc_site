---
title: "Payouts"
linkTitle: "Payouts"
date: 2021-07-16T11:32:55-05:00
description: >
  Payouts é uma solução API que ajuda você a enviar facilmente vários pagamentos seguros para diferentes tipos de beneficiários (usuários, comércios, provedores, clientes etc.) e é funcionalmente adaptada às especificações do mercado LATAM.
weight: 70
---

Payouts é um serviço de integração disponível sob demanda, e sua ativação depende de uma análise de segurança e risco. Para obter mais informações ou solicitar este serviço, entre em contato com seu Representante de Vendas.

<img src="/assets/PushPayments/PushPayments_pt.png" width="70%" alt="Concepts"/><br>

Vamos explicar os pagamentos usando um exemplo. Um comércio oferece produtos e serviços disponíveis para entrega. Este comércio usa PayU como sua plataforma de pagamento online e tem uma conta onde recebe o dinheiro pago de seus clientes. Este comércio tem muitos entregadores para quem paga um valor fixo por entrega efetuada.

A cada semana, o comércio paga o valor ganho a cada mensageiro. Para fazer isso, ele pode usar Payouts para pagar diretamente de sua conta PayU em vez de gerenciar os pagamentos por conta própria. Nesse caso, o comércio deve transferir o dinheiro para suas contas ou usar fundos de outras fontes.

Para solicitar o pagamento, o comércio envia a lista de beneficiários que deseja pagar e o valor de cada um. O PayU valida esses beneficiários e programa o payout.

O valor de cada payout, mais a taxa de processamento, é deduzido de sua conta. Entre em contato com seu representante de vendas para saber a taxa de processamento para usar este serviço.

## Benefícios {##benefits}

* **Leverage regional capabilities**.<br>A complete and easy-to-use API to make payments to any bank in the processing country<sup>\*</sup>.<br><sup>\*</sup>_Available for now in Colombia, with other markets coming soon._
* **One ou multiple payouts**.<br>The API is flexible. You can create one ou multiple requests which can be new ou existing. There is no restriction for the number of records. 
* **Save time and costs**.<br>You can save operational costs and time managing all payment operations in just one place.
* **Better manage account funds and balance**.<br>You can cancel payment orders before the payout is sent to the bank. Payouts feature helps you to better manage your account funds and balance. 
* **Customizable notifications**.<br>Any changes in the payment order status are updated through our solution. You can customize the update notifications you receive. 

## Como funcionam os Payouts? {#how-does-the-payouts-feature-work}
Por meio de Payouts, você pode enviar pagamentos múltiplos e seguros, tais como desembolso de fundos a empregados, sub-merchants, fornecedores ou clientes, utilizando os fundos que tem na sua conta PayU. 

Você só precisa fornecer o valor a pagar juntamente com os dados de cada beneficiário (como nome, identificação, dados bancários etc.), e PayU transfere o valor solicitado após as validações.

<img src="/assets/PushPayments/PushPaymentsFlow_pt.png" alt="Concepts"/><br>

1. **Solicitação de Payout**: você envia uma solicitação via API com a lista de beneficiários para os quais deseja enviar os fundos, junto com o valor de cada transação e seus dados de pagamento.
2. **Validação de beneficiário**: os beneficiários são validados por meio de nossa solução (processo de Sanction Screening) e os pagamentos são agendados.
3. **Débito de fundos**: o valor de cada Payout junto com a taxa de processamento são debitados de sua conta virtual do PayU.
4. **Confirmação do processo**: o banco processa o pagamento de acordo com o [processo ACH]({{< ref "#transaction-processing" >}}). Você pode personalizar as notificações para receber alterações no status do pagamento.

### Estados de Payouts {#payout-states}
Os Payouts são realizados em duas etapas principais: a primeira etapa é quando você solicita o pagamento a um beneficiário. O segundo é quando o pedido foi aprovado e passa para a transferência dos fundos.

O procedimento transacional de Payouts possui os seguintes estados.

* **AWAITING SANCTION SCREENING**: este estado indica que o beneficiário a quem será feito o pagamento está sujeito à validação de listas restritas e demais políticas do PayU relacionadas à análise de risco. Se um beneficiário não passar na validação, o pagamento será automaticamente rejeitado.
* **AWAITING FOR SENT**: se o beneficiário passa na validação ou não está sujeito a ela, este estado indica que o pedido está pronto para ser processado. Neste estado, a comunicação com o serviço não foi realizada.
* **SENT TO CREATE**: este estado indica que a comunicação com o serviço foi concluída e o ordem de Pagamento está em processo de criação.
* **CREATED**: este estado indica que a solicitação foi criada e se tornou uma ordem de pagamento. Quando a solicitação se torna uma ordem de pagamento, ela passa pelos estados explicados em [Estados de ordem de pagamento]({{< ref "#payment-order-states" >}}). O próximo estado depende do resultado do processo da ordem de pagamento.
* **REJECTED**: este estado indica que o pedido foi rejeitado. Um pedido pode ser rejeitado quando:
  - A validação do beneficiário falhou.
  - A criação do payout falhou.
  - Você solicitou o cancelamento da solicitação de Payout e ela foi aprovada. 
* **PROCESSING COMPLETED**: este estado indica que o processo de Payout foi concluído.
* **AWAITING TO CANCEL**: este estado indica que você solicitou o cancelamento de uma solicitação de Payout. Leve em conta que você pode solicitar o cancelamento de uma ordem de Payout quando este não estiver em processo Bancário.<br>Neste estado, a comunicação com o serviço não foi realizada.
* **SENT FOR CANCELLATION**: este estado indica que a comunicação com o serviço foi concluída e o ordem de Payout está em processo de cancelamento.
* **CANCELLATION FAILED**: este estado indica que o pedido de cancelamento não pode ser executado devido às políticas do PayU ou porque o pedido não está sendo processado pelo PayU.

O diagrama a seguir ilustra as mudanças de estado:

<img src="/assets/PushPayments/PushPaymentsStates_pt.png" width="80%" alt="Concepts"/>

### Estados de ordem de pagamento {#payment-order-states}
Assim que o Payout for aprovado, ele será transformado em ordem de pagamento. A seguir estão os estados de uma ordem de pagamento.

* **REQUEST_BY_THE_MERCHANT**: este é o estado inicial da transação, uma vez que você envia a lista de beneficiários a serem pagos e os beneficiários são aprovados, a transação entra neste estado.
* **IN_VALIDATION**: devido às políticas do PayU, cada pagamento pode estar sujeito a validação. Esse estado indica que sua solicitação deve ser analisada de acordo com nossas políticas internas. Se a validação falha, o pagamento que não atendeu às políticas é rejeitado.
* **IN_PAYU_PROCESS**: este estado indica que PayU iniciou o processo de pagamento.
* **AWAITING_BANK_SENT**: este estado indica que PayU iniciou a transferência do valor para o beneficiário.
* **IN_BANKING_PROCESS**: teste estado indica que o pagamento está sendo processado na conta bancária do beneficiário. Nesta etapa, você não pode cancelar a solicitação.
* **CONFIRMED_BY_THE_BANK**: este estado indica que o beneficiário recebeu o valor transferido.
* **REJECTED**: este estado indica que a transação foi rejeitada pelo PayU (devido a violação da política) ou pelo Banco (devido a erros nas informações bancárias).

O diagrama a seguir ilustra as mudanças de estado:

<img src="/assets/PushPayments/PushPaymentsSteps_pt.png" width="60%" alt="Concepts"/>

### Validação de transação {#transaction-validation}
Cada solicitação de Payout é validada para verificar se a pessoa que receberá o dinheiro não está incluída nas listas restritas. Esta validação pode demorar até 24 horas o que pode atrasar o procedimento de pagamento.

Quando uma pessoa precisa ser verificada, PayU verifica primeiro no cache de validação, de modo que uma pessoa só é validada uma vez no quadro de cache.

Se uma pessoa não aprova a validação, o Payout não é realizado e você é notificado, caso tenha configurado as notificações dos resultados da validação.

## Observações {#considerations}
Leve em conta as seguintes informações:

* Payouts não é um serviço incluído como padrão. Você deve solicitar e assinar um anexo ao contrato para definir a taxa e demais condições. Para contratar este serviço, entre em contato com seu gerente de contas.
* Os comércios são responsáveis pela integridade e precisão dos dados de beneficiários. PayU não valida se os dados fornecidos pelo estabelecimento estão completos e corretos. Além disso, a atualização dos dados deve ser solicitada pelos estabelecimentos.<br>PayU não se responsabiliza por transações malsucedidas devido a dados incorretos.
* Os Payouts permitem apenas pagamentos locais. O comércio pode ser internacional (sob análise de segurança e risco), mas só pode solicitar Payouts usando os fundos coletados no país de processamento.<br>Por exemplo, se o vendedor _ABC_ processa pagamentos na Colômbia e no Peru, ele pode solicitar pagamentos a beneficiários na Colômbia usando os fundos arrecadados na Colômbia, mas não pode solicitar pagamentos a beneficiários no Peru usando os fundos arrecadados na Colômbia.
* Depois que o payout é criado, ele segue o fluxo regular no PayU. Isso significa que você pode ver o payout criado em seu módulo PayU.
* O comércio deve comprovar a relação entre ele e seus beneficiários para garantir que a transação seja legítima.
* Os Payouts dirigidos a Daviplata não são suportados.
<!-- * For Gambling commerces, Payouts cannot be used to make refunds. Therefore, it is necessary to guarantee that the commerce is paying a prize. -->

## Processamento de transação {#transaction-processing}
Payouts usam transferências ACH (**A**utomated **C**learing **H**ouse) para envio dos pagamentos aos beneficiários, ou seja, as transações são processadas em lotes durante o dia. O momento em que a transação será processada é explicado na tabela a seguir:

| *IN_BANKING_PROCESS* state time   | Tempo de processamento ACH | Tempo estimado de resposta        |
|:---------------------------------:|:--------------------------:|:---------------------------------:|
| 05:31 p.m. - 07:20 a.m.           | 9:00 a.m.                  | 7:55 p.m.                         |
| 07:21 a.m. - 09:45 a.m.           | 11:30 a.m.                 | 10:40 a.m.<br>*Próximo dia útil*. |
| 09:46 a.m. - 12:30 p.m.           | 2:00 p.m.                  | 1:45 p.m.<br>*Próximo dia útil*.  |
| 12:31 p.m. - 02:50 p.m.           | 4:00 p.m.                  | 4:40 p.m.<br>*Próximo dia útil*.  |
| 02:59 p.m. - 04:20 p.m.           | 6:00 p.m.                  | 6:20 p.m.<br>*Próximo dia útil*.  |

*Transações que chegam ao estado **IN_BANKING_PROCESS** após as 16h20 são processadas no próximo dia útil.*

{{% alert title="Observação" color="info"%}}

Os pedidos de Payout podem não estar no estado **IN_BANKING_PROCESS** depois de enviados, e dependendo da validação do beneficiário, podem demorar até *24* horas.

{{% /alert %}}

## Notificações {#notifications}
Ao usar Payouts, você pode criar um WebHook para configurar notificações sobre mudanças de status. Recomenda-se configurar o WebHook antes de enviar a solicitação de Payout ao configurar notificações.

Você pode configurar um WebHook para um ou mais dos seguintes eventos:
* **Criação de transferência**: envia uma notificação quando uma solicitação de payout é criada.
* **Atualização de transferência**: envia uma notificação quando a validação da triagem de sanção rejeita o beneficiário.
* **•	Resultado de validação**: senvia uma notificação quando o beneficiário aprovou a validação da triagem de sanção e quando a transferência foi rejeitada pelo banco.

Para saber como criar WebHooks, consulte [este artigo]({{< ref "payouts-api.md#create-or-update-a-webhook" >}}).

### Variáveis nas notificações {#variables-in-the-notifications}
As seguintes variáveis são enviadas ao WebHook quando ocorre algum dos eventos explicados anteriormente.

| Variável                  | Formato      | Descrição                                                               |
|---------------------------|--------------|-------------------------------------------------------------------------|
| `pushPaymentId`           | Alfanumérico | Id do pagamento criado.                                                 |
| `creationDate`            | Numérico     | Data em que o pagamento foi criado.<br>Esta data está em milissegundos. |
| `value`                   | Numérico     | Quantia solicitada a ser transferida para o beneficiário.               |
| `currency`                | Alfanumérico | Moeda do valor solicitado.                                              |
| `state`                   | Alfanumérico | Atual [Estado de Payout]({{< ref"#payout-states" >}}).                  |
| `status`                  | Alfanumérico | Atual [Estado da ordem de Payout]({{< ref"#payment-order-states" >}}).  | 
| `errorCode`               | Alfanumérico | Erro gerado após a validação da sanction screening.                     |
| `errorMessage`            | Alfanumérico | Mensagem de erro gerada após a validação da sanction screening.         |
| `supplierBankAccountId`   | Alfanumérico | Id da conta bancária do beneficiário gerado pela solicitação de payout. |
| `fullName`                | Alfanumérico | Nome do beneficiário do Payout.                                         |
| `documentNumber`          | Numérico     | Número do documento do beneficiário do Payout.                          |
| `country`                 | Alfanumérico | País do beneficiário do Payout.                                         |
| `validationState`         | Alfanumérico | Resultado da validação realizada pelo PayU.                             |
| `dateOfTheNextValidation` | Numérico     | Data em que o beneficiário será validado por sanction screening.<br>Esta data está em milissegundos. |

## O que acontece agora? {#whats-next}
A integração com este recurso é realizada usando [Integrações de API]({{< ref "payouts-api.html" >}}).