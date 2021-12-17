---
title: "Teste sua solução"
linkTitle: "Teste sua solução"
date: 2021-04-06T15:34:20-05:00
description: >
  PayU oferece um espaço onde você pode testar sua solução antes de colocar no ar, onde você poderá receber pagamentos e transações reais.
weight: 40
---

Se desejar fazer testes com o PayU, será necessário usar as seguintes credenciais na solicitação, dependendo do país de sua conta:  

{{< testaccounts/accounts_pt >}}

O ambiente de teste não reproduz dados de sua conta de produção.

## Cartões de teste {#test-Cartãos}
Você pode usar os seguintes cartões para teste:

<details>
<summary><img src="/assets/Argentina.png" width="25px"/> Argentina</summary>

| Cartão                           | Número                              |
|----------------------------------|-------------------------------------|
| **Cartão de Crédito AMEX**       | 376414000000009                     |
| **Cartão de Crédito ARGENCARD**  | 5011050000000001                    |
| **Cartão de Crédito CABAL**      | 5896570000000008                    |
| **Cartão de Crédito CENCOSUD**   | 6034930000000005 - 5197670000000002 |
| **Cartão de Crédito DINERS**     | 36481400000006                      |
| **Cartão de Crédito MASTERCARD** | 5399090000000009                    |
| **Cartão de Crédito NARANJA**    | 5895620000000002                    |
| **Cartão de crédito SHOPPING**   | 6034880000000051                    |
| **Cartão de Crédito VISA**       | 4850110000000000 - 4036820000000001 |
| **Cartão de Débito VISA**        | 4517730000000000                    |  

</details>
<details>
<summary><img src="/assets/Brasil.png" width="25px"/> Brasil</summary>

| Cartão                           | Número                              |
|----------------------------------|-------------------------------------|
| **Cartão de Crédito AMEX**       | 376611000000000                     |
| **Cartão de Crédito DINERS**     | 36213800000009                      |
| **Cartão de Crédito ELO**        | 5067310000000002                    |
| **Cartão de Crédito HIPERCARD**  | 6062825624254001                    |
| **Cartão de Crédito MASTERCARD** | 5123740000000002                    |
| **Cartão de Crédito VISA**       | 4422120000000008 - 4984460000000008 |

</details>
<details>
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito AMEX**       | 377825000000005                      |
| **Cartão de Crédito DINERS**     | 36525200000002                       |
| **Cartão de Crédito MASTERCARD** | 5435630000000008                     |
| **Cartão de Crédito VISA**       | 4051885600446623 - 4938590000000017  |

</details>
<details>
<summary><img src="/assets/Colombia.png" width="25px"/> Colômbia</summary>

| Cartão                           | Número                                                                |
|----------------------------------|-----------------------------------------------------------------------|
| **Cartão de Crédito AMEX**       | 377813000000001 - 377847626810864 - 376402004977124 - 376414000000009 |
| **Cartão de Crédito CODENSA**    | 5907120000000009                                                      |
| **Cartão de Crédito CRM**        | 5282096712463427                                                      |
| **Cartão de Crédito DAVIVIENDA** | 5247081012761500                                                      |
| **Cartão de Crédito DINERS**     | 36032400000007 - 36032404150519 - 36032440201896                      |
| **Cartão de Crédito MASTERCARD** | 5471300000000003 - 5120697176068275                                   |
| **Cartão de Crédito NEQUI**      | 4093551018099251                                                      |
| **Cartão de Crédito VISA**       | 4097440000000004 - 4037997623271984 - 4111111111111111                |
| **Cartão de Débito VISA**        | 4509420000000008                                                      |

</details>
<details>
<summary><img src="/assets/Mexico.png" width="25px"/> México</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito AMEX**       | 376675000000005                      |
| **Cartão de Crédito MASTERCARD** | 5579070000000003                     |
| **Cartão de Débito MASTERCARD**  | 5256780000000007                     |
| **Cartão de Crédito VISA**       | 4268070000000002                     |
| **Cartão de Débito VISA**        | 4415490000000004                     |

</details>
<details>
<summary><img src="/assets/Panama.png" width="25px"/> Panama</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito MASTERCARD** | 5455040000000005                     |
| **Cartão de Crédito VISA**       | 4723030000000005                     |

</details>
<details>
<summary><img src="/assets/Peru.png" width="25px"/> Peru</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito AMEX**       | 377753000000009                      |
| **Cartão de Crédito DINERS**     | 36239200000000                       |
| **Cartão de Crédito MASTERCARD** | 5491610000000001                     |
| **Cartão de Débito MASTERCARD**  | 5236930000000003                     |
| **Cartão de Crédito VISA**       | 4907840000000005 - 4634010000000005  |
| **Cartão de Débito VISA**        | 4557880000000004                     |

</details>

### Testando estados {#testing-status}
Para testar Pagamentos, você deve enviar a solicitação:

* **Para transações _aprovadas_**: 
  - Envie o valor `APPROVED` em nome do titular do cartão.
  - Definir **777** no CVV do cartão (para AMEX, use **7777**).
  - O parâmetro `test` e a descrição também definem o estado. Se não funcionar com `test` definido como _false_, altere seu valor para _true_.
  - Envie o mês de vencimento do cartão menor que `6` e o ​​ano deve ser `2023` ou maior. Exemplo: `05/2025`.
* **Para transações _rejeitadas_**: 
  - Envie o valor `REJECTED` em nome do titular do cartão.
  - Definir **666** no CVV do cartão (para AMEX, use **6666**).
  - O parâmetro `test` e a descrição também definem o estado. Se não funcionar com `test` definido como _false_, altere seu valor para _true_.
  - Envie o mês de vencimento do cartão maior que `6` e o ​​ano deve ser `2023` ou maior. Exemplo: `07/2027`.
* **Para transações _pendentes_**: 
  - Envie o valor `PENDING` em nome do titular do cartão.
  - Definir **777** no CVV do cartão (para AMEX, use **7777**).
  - Envie o parâmetro `test` como _true_.
  - Nas informações de comprador e pagador, atribua o endereço de e-mail `manual-review-hub@email.com`.
* Para o número do cartão, é preciso inserir um número válido, correspondente à franquia enviada na solicitação. Você pode usar um gerador de cartão online para fins de teste ou usar um dos cartões mencionados anteriormente que estejam disponíveis para o seu país.
* Para testar as transferências bancárias PSE (disponíveis na Colômbia) no ambiente PayU Sandbox, consulte o [Guia de teste PSE (PDF - em espanhol)](/assets/pse-test-guide-v5-es.pdf).

## Como importar a coleção {#importing-the-collection}
Clique no botão abaixo para importar nossa coleção no Postman (pode ser necessário atualizar a página se o botão não funcionar para você). Observe que criamos um novo ambiente cada vez que você importa a coleção.

{{< postman/postman_flow_collection >}}
<br>

Depois de executar a coleção, você precisa definir os parâmetros globais e variáveis de ambiente.

### Setting your Environment Variables {#setting-your-environment-variables}
Nossa coleção tem um ambiente chamado `PayU API Sandbox`. Recomendamos que você invoque as solicitações de API da coleção apenas em um ambiente Sandbox.

Se você deseja alterar as contas de teste do PayU, configure as variáveis `api_key`, `api_login`, `merchant_id` e `account-[país]`. Você pode deixar todas as outras variáveis inalteradas.

### Como importar variáveis globais {#setting-your-environment-variables}
As variáveis globais são necessárias para processar transações em nosso portal de pagamentos, como moeda, valor da transação, páginas de confirmação e resposta e muito mais.

Importe as variáveis globais da coleção para configurar os valores enviados às solicitações. 

1. Baixe o arquivo de variáveis globais <a href="/assets/globals/PayU%20Latam.postman_globals.json" download>aqui</a>.

2. Na coleção Postman, clique em _**Import**_ próximo ao nome do seu espaço de trabalho e localize o arquivo json baixado recentemente.

3. Quando terminar, clique em _**Import**_.

Para alterar o valor de uma transação, atualize o valor para o  `tx_value_[país]` de acordo com o país que você deseja testar.de acordo com o país que você deseja testar.

## Execute as solicitações na ordem correta {#running-the-requests-in-the-correct-order}
Observe que a ordem em que você executa as solicitações é importante, pois alguns dos dados retornados por uma solicitação podem ser usados na próxima invocação.