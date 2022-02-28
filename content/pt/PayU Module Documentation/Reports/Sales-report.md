---
title: "Relatório de Vendas"
linkTitle: "Relatório de Vendas"
date: 2021-09-03T16:45:07-05:00
type: docs
Description: >
  Revise os detalhes de pagamentos recebidos, métodos de pagamento mais usados e clientes frequentes.
weight: 10
---

{{% alert title="Observação" color="info"%}}
O relatório de vendas exibido no painel do comércio está limitado a **20 mil** linhas para exibição e download. Se você precisar exibir mais linhas ou colunas no relatório, entre em contato com seu representante de vendas.
{{% /alert %}}

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com permissão _Relatórios_ > _Relatório de Vendas_ habilitada.

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Consulte o relatório {#consult-the-report}
Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transações**_ e selecione _**Relatório de Vendas**_.

![PrintScreen](/assets/Refunds/Refunds_pt_04.png)

No relatório, há uma caixa de filtro e a lista de suas vendas mais recentes. Por padrão, o relatório mostra as informações de vendas<sup>\*</sup> dos últimos sete dias, do mais recente ao mais antigo. 

<sup>*</sup>_Limitado aos 20 mil registros principais._

![PrintScreen](/assets/Reports/Reports_10_pt.png)

O relatório tem as seguintes colunas:

| Coluna              | Descrição                                                                           |
|---------------------|-------------------------------------------------------------------------------------|
| Ordem               | Esta coluna mostra o identificador da ordem e a data da venda.                      |
| Referência          | Esta coluna mostra a referência de venda e o nome do produto ou serviço oferecido.  |
| Comprador           | Esta coluna mostra o nome e o endereço de e-mail da pessoa que realiza a compra.    |
| Valor               | Valor da venda.                                                                     |
| Meio de pagamento   | Informação da forma de pagamento utilizada pelo comprador.                          |
| Status              | Status atual da ordem.                                                              |

{{% alert title="Observação" color="info"%}}
Se você precisar exibir mais informações, entre em contato com seu representante de vendas.
{{% /alert %}}

Consulte [Detalhes da ordem]({{< ref "#transaction-details" >}}) para saber todos os detalhes da transação da venda.

## Filtrar o relatório {##filter-the-report}
Você pode usar a barra de pesquisa acima do gráfico ou o calendário para definir filtros. Você pode filtrar por _**Referência**_, _**Ordem**_, _**Comprador**_, _**Valor**_, _**status**_, ou _**Tipo de meio de pagamento**_.

Para definir um filtro, clique no campo _**Filtrar minhas vendas**_ na parte superior da tabela do relatório.

<img src="/assets/Reports/Reports_11_pt.png" alt="PrintScreen" width="60%"/><br>

Configure os valores para os filtros e clique em _**Buscar**_. Depois de clicar, a tabela do filtro mostra as vendas que atendem aos critérios selecionados.

Além desses filtros, você pode definir um período em que o comprador realizou a venda usando o filtro de datas no canto superior direito.

<img src="/assets/Reports/Reports_12_pt.png" alt="PrintScreen" width="60%"/><br>

O intervalo de datas deste filtro é um (1) mês antes da data de término. Se você exceder esse intervalo, o relatório exibirá as informações de um (1) mês após a data de início.<br>Para ver as informações de uma determinada data, defina a mesma para a data de início e de término.

## Detalhes da transação {#transaction-details}
Você pode consultar os detalhes da transação online. Para fazer isso, clique na ordem que deseja consultar na tabela de relatórios. Os detalhes da transação aparecem no painel direito.

![PrintScreen](/assets/Reports/Reports_13_pt.png)

O painel _**Detalhes da transação**_ tem as seguintes seções:

<img src="/assets/Reports/Reports_14_pt.png" alt="PrintScreen" width="50%"/><br>

<div class="variables"></div>

|  | Nome | Descrição |
|:---:|---|---|
| 1 | Informação da ordem |	Esta seção mostra o ID da ordem, sua última data de atualização, seu status, a descrição do status e a referência de venda.<br>Esta seção também mostra um botão para permitir que você imprima os detalhes da ordem. |
| 2 | Produto ou serviço | Descrição do produto ou serviço que você forneceu na venda |
| 3 | Meio de pagamento | Informação do meio de pagamento utilizado na compra. As informações exibidas nesta seção variam de acordo com a forma de pagamento.<br>Para pagamentos em dinheiro pendentes, esta seção permite que você veja o recibo de pagamento gerado para o comprador. |
| 4 | Valores | Esta seção mostra os valores envolvidos nesta transação, como o _Valor cobrado_, _Valor pendente_, _Valor reembolsado_ (para reembolsos), _Valor expirado_ (para pagamentos em dinheiro). |
| 5 | Informações do comprador | Informações da pessoa que realizou a compra. |
| 6 | Informações de entrega | Informações das opções de entrega. |
| 7 | Está compra foi | Transações associadas a esta compra. Clique no símbolo **▾** para encontrar [detalhes de cada transação]({{< ref "#transaction-history" >}}).<br><br>![PrintScreen](/assets/Reports/Reports_15_pt.png) |
| 8 | Ações | Ações disponíveis sobre as ações. |

### Histórico de transações {#transaction-history}
Ao expandir a seção _**Está compra foi**_, você pode ver os detalhes de cada transação associada a uma ordem.

<img src="/assets/Reports/Reports_16_pt.png" alt="PrintScreen" width="50%"/><br>

As informações disponíveis incluem os valores debitados da sua conta, a forma de pagamento, as informações do pagador e muito mais.

## Baixar o relatório {#download-the-report}
Para baixar o relatório, clique no botão _**Baixar**_ localizado na parte superior ou inferior da tabela do relatório.

![PrintScreen](/assets/Reports/Reports_17_pt.png)

Uma janela pop-up aparecerá onde você pode selecionar as opções para gerar o relatório:
* **Relatório**: permite gerar um relatório com o status das ordens e o status final da última transação ou tentativa de compra relacionada a essa ordem.
* **Versão do antigo Módulo Administrativo**: permite gerar um relatório com todas as transações e mostra as informações do comprador e do pagador (e-mail, nome, número do documento)<sup>\*</sup>.

<img src="/assets/Reports/Reports_18_pt.png" alt="PrintScreen" width="50%"/>

{{% alert title="Observação" color="info"%}}
<sup>\*</sup> Caso o formato do arquivo não atenda às suas necessidades, entre em contato com o seu executivo de vendas para saber mais sobre a opção de envio de arquivos por SFTP e os modelos que temos para este relatório.
{{% /alert %}}

O relatório é baixado automaticamente em formato Excel (_.csv_). O nome do relatório usa os seguintes formatos:
* Opção **Relatório**: _[DataDeDownloadEmMilis]\_orders\_[AccountId].csv_
* Opção **Versão do antigo Módulo Administrativo**: _[AccountId]\_[DataDeDownload]\_transactions.csv_<sup>\*</sup>

<sup>\*</sup> _Data de download em formato **dd-mm-yy-hh-mm-ss**_

<div style="display: flex;">
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/1632771735723_orders_546703.csv">Baixe um exemplo do arquivo gerado usando a opção <i><b>Relatório</b></i>.</a>
  </div>
  <div style="float: left;width: 50%;text-align: center;margin: 10px;">
    <a href="/assets/SampleReports/546703_27-09-2021-14-52-58.486_transactions.csv">Baixe um exemplo do arquivo gerado usando a opção <i><b>Versão do antigo Módulo Administrativo</b></i>.</a>
  </div>
</div>

{{% alert title="Observação" color="info"%}}
O relatório gerado é armazenado durante 90 dias na seção [Meus relatórios baixados]({{< ref "Reports.md#my-downloaded-reports" >}}).
{{% /alert %}}