---
title: "Relatório de operações"
linkTitle: "Relatório de operações"
date: 2021-12-03T15:23:45-05:00
type: docs
Description: >
  Aprende a descargar los reportes sugeridos por la **CNBV**. Estos reportes están disponibles para comercios en México.
weight: 50
---
Os relatórios de operações sugeridos pela _Comissão Nacional de Bancos e Valores Mobiliários_ (CNBV) são relatórios mensais com validade de 3 (três) meses. Ou seja, durante o mês atual, você pode baixar os relatórios do mês imediatamente anterior e dos dois meses anteriores.

{{% alert title="Nota" color="info"%}}
Para ter acesso a este módulo, você precisa ter um perfil com a permissão _Operation reports_ > _Consult operation reports_ habilitada.

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.
{{% /alert %}}

## Baixe os relatórios {#download-the-reports}
Faça login em sua conta PayU. No menu esquerdo, expanda o menu _**Transações**_ e selecione _**Relatório de operações**_.

![PrintScreen](/assets/OperationReports/OperationReports_01_es.png)

Selecione o mês de operações e os tipos de relatórios que deseja gerar e clique em _**Download**_. <br> Conforme mencionado acima, você só pode gerar relatórios dos três meses anteriores.

![PrintScreen](/assets/OperationReports/OperationReports_02_es.png)

Assim que os relatórios selecionados são gerados, uma pasta compactada com os relatórios no formato _.xlsx_ é baixada automaticamente.<br>As seções a seguir explicam os relatórios que você pode gerar junto com suas colunas.

{{% alert title="Note" color="info"%}}
Se você não tiver transações no mês selecionado, os relatórios baixados correspondem a um modelo padrão com valores zero.
{{% /alert %}}

### Encargos de transações {#transaction-charges}
Este relatório pode ser gerado para um mês específico e possui os seguintes campos:

| | Campo | Descrição |
|:-:|---|---|
| A | Monto Facturado Total | Valor total em pesos (**MXN**) das transações do mês. |
| B | Número de pagos debidamente autorizados | Número de pagamentos autorizados para o mês. |
| C | Tasa de descuento (%) | A comissão cobrada pelo banco adquirente os comércios pela instalação de Pontos de Venda (TPV) e disponibilização de acesso à rede que permite a aceitação de pagamentos com cartões bancários. Taxa de processamento fixa e/ou variável. |
| D | Monto cargado por tasa de descuento | O valor resultante em pesos (**MXN**) após a aplicação do percentual da Taxa de desconto (_**Tasa de descuento**_). Ou seja, _Coluna A_ × _Coluna C_. |
| E | Cuotas por otros conceptos o penalizaciones | Encargos adicionais além da Taxa de desconto (_**Tasa de descuento**_). |
| F | Monto total por servicios de recepción de pagos con tarjeta | El resultado de sumar la _Columna D_ y la _Columna E_, si aplica. |

### Comissões para outros conceitos ou penalidades {#commissions-for-other-concepts-or-penalties}
Este é um relatório detalhado da _Coluna C_ (_**Cuotas por otros conceptos o penalizaciones**_) no [Relatório de Encargos de transações]({{< ref"#transaction-charges" >}}). Este relatório pode ser gerado para um determinado mês e inclui todos os conceitos do mês e a soma de cada um.

### Encargos TPVs relacionado {#tpvs-related-charge}
Para baixar este relatório, desmarque as caixas _**Encargos de transações**_ e _**Comissões para outros conceitos ou penalidades**_. Este relatório pode ser gerado para um mês específico e possui os seguintes campos:

| Campo | Descrição |
|:-:|---|---|
| Uso de las terminales punto de venta | Valor em pesos (**MXN**) cobrado do cliente pela utilização do Terminal de Ponto de Venda (TPV). |
| Mantenimiento de las terminales punto de venta <sup>\*</sup> | Valor cobrado do cliente pela manutenção do Terminal de Ponto de Venda (TPV). |
| Uso de aplicaciones tecnológicas de recepción de Pagos con Tarjeta <sup>\*</sup> | Valor cobrado do cliente pela utilização do aplicativo tecnológico. |
| Cuotas por incumplimiento en facturación mínima / penalizaciones <sup>\*</sup> | Valor cobrado do cliente em caso de violação ou multa por faturamento mínimo. |
| Total cargos relacionados a terminales punto de venta | O resultado da soma de todos os conceitos relacionados ao Terminal de Ponto de Venda (TPV). |

<sup>\*</sup>Especifique a periodicidade: mensal, anual, etc.