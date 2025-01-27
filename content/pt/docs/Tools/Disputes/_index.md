---
title: "Disputas"
linkTitle: "Disputas"
date: 2021-04-12T08:34:58-05:00
description: >
  Esta seção fornece uma visão geral do mecanismo de disputas no PayU.
weight: 60
tags: ["parenttopic"]
---

* Para instruções detalhadas sobre como lidar com disputas no Painel de Gerenciamento da sua conta PayU, consulte a documentação do <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Módulo de Disputas</a>.

* Para informações técnicas sobre o sistema de notificações, consulte a documentação do <a href="https://developers.payulatam.com/latam/pt/docs/tools/disputes/disputes-webhook.html" target="_blank">Webhook de Disputas</a>.

## Visão Geral das Disputas

As disputas ocorrem quando compradores registram reclamações com os bancos emissores de seus cartões sobre transações. O banco notifica o PayU sobre a disputa, e criamos um registro correspondente em nosso sistema. Em seguida, notificamos você com base no método de notificação escolhido.

O diagrama a seguir ilustra o fluxo do processo de disputas no PayU, detalhando cada etapa desde a notificação até a resolução.
<br>

{{< disputes/disputes_flow_pt >}}

### Motivos Comuns para Disputas

Os compradores podem contestar transações por diversos motivos, incluindo o não recebimento de mercadorias, produtos defeituosos ou cobranças não autorizadas. Aqui estão os motivos típicos de disputas:  

- **Fraude**: Transações realizadas sem autorização, geralmente devido a um cartão perdido ou roubado.  
- **Pagamento Não Reconhecido**: O titular do cartão não reconhece o nome do comerciante no extrato.  
- **Produto Não Entregue**: O produto ou serviço não foi recebido.  
- **Produto Insatisfatório**: O produto ou serviço não atendeu às expectativas.  
- **Cobranças Duplicadas**: O titular do cartão foi cobrado várias vezes pela mesma transação.  
- **Divergência de Valor**: O valor cobrado não corresponde ao valor da compra.  
- **Não Especificado**: Disputas iniciadas pelos bancos sem um motivo claro.  

{{% alert title="Importante" color="warning"%}}

* Os métodos de notificação para disputas variam entre as entidades financeiras; o PayU não pode garantir que as entidades sempre fornecerão os motivos.
* O PayU atua apenas como intermediário para ajudar os comerciantes a apresentar evidências em disputas. A decisão final cabe ao banco emissor.
* Os valores em disputa são congelados e indisponíveis para transferência até a resolução.
* Os compradores podem contestar transações dentro de **120 dias** para cartões locais e **180 dias** para cartões internacionais.

{{% /alert %}} 

## Gerenciando Disputas com o PayU

O processo de disputas segue um fluxo estruturado, que pode ser gerenciado diretamente pelo Painel de Gerenciamento em sua conta PayU. Para mais detalhes, consulte o <a href="https://developers.payulatam.com/latam/pt/payu-module-documentation/payu-operations/disputes-mp.html" target="_blank">Módulo de Disputas</a>.

### 1. Notificação de Disputa

O PayU notificará você com base no método de notificação configurado no módulo de Disputas, onde você também poderá verificar os detalhes da disputa.

### 2. Revisão dos Detalhes da Disputa

Utilize o Painel de Gerenciamento para visualizar e gerenciar suas disputas em andamento.

### 3. Apresentação de Evidências

Responda às disputas enviando as evidências necessárias através do módulo de Disputas antes do prazo estabelecido pelo banco ou pela rede de processamento. Após o prazo, não será possível enviar evidências para essa disputa.

#### Evidências Úteis

- Detalhes do cliente (nome, ID, e-mail, endereço de entrega, número do cartão, etc.).  
- Comprovante de entrega assinado pelo titular do cartão.  
- Recibos de venda ou faturas.  
- Aceitação de termos, condições ou pagamentos assinados pelo titular do cartão.  
- Políticas de reembolso e cancelamento.  
- Histórico transacional.  
- Outros documentos de suporte. 

#### Prazos para Envio de Evidências

Os dias máximos para envio de evidências variam por país: 

| País       | Dias para Enviar Evidências |
|------------|-----------------------------|
| Argentina  | 5 dias úteis                |
| Brasil     | 12 dias úteis               |
| Chile      | 5 dias úteis                |
| Colômbia   | 2 dias úteis                |
| México     | 12 dias corridos            |
| Panamá     | 8 dias úteis                |
| Peru       | 6 dias úteis                |

### 4. Resolução e Decisão Final

Após enviar as evidências, nossa integração as encaminha para o banco ou rede de processamento para análise. Os resultados podem incluir:  
- **Ganhou**: A entidade bancária resolve a disputa a seu favor, sem deduções.  
- **Perdeu**: A entidade bancária emite um chargeback, e custos associados podem ser aplicados.  
- **Reembolsado**: Você reembolsa voluntariamente o comprador.

O Painel de Gerenciamento da sua conta PayU atualizará o status da disputa com base na resolução, e o sistema notificará você.

## Estados da Disputa

Cada disputa segue uma série de estados ao longo do processo:

| Estado                    | Descrição                                                                 |
|---------------------------|---------------------------------------------------------------------------|
| **Notificado**            | Estado inicial, onde as evidências devem ser enviadas.                   |
| **Em Análise**            | As evidências estão sendo analisadas pelo banco ou rede.                 |
| **Sem Evidências Enviadas**| O comerciante perdeu o prazo para envio das evidências.                  |
| **Perdeu**                | A disputa foi resolvida a favor do comprador, resultando em um chargeback. |
| **Ganhou**                | A disputa foi resolvida a favor do comerciante.                          |
| **Expirado**              | Após 120 dias sem resposta do banco, os fundos são liberados.            |
| **Reembolsado**           | O comerciante autorizou um reembolso, evitando um chargeback.            |

Abaixo está um diagrama ilustrando o processo de resolução de disputas:

<div>
{{< disputes/Disputes_PT >}}
</div>

## Dicas Antifraude

Proteja seu negócio contra fraudes seguindo estas dicas:
1. Monitore aumentos súbitos no volume de compras ou valores de transações incomuns.  
2. Observe múltiplas compras de um único cliente ou para o mesmo endereço.  
3. Implemente processos rigorosos de verificação para transações grandes ou incomuns.