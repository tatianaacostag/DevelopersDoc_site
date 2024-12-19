---
title: "Teste Sua Solução"
linkTitle: "Teste Sua Solução"
date: 2021-04-06T15:34:20-05:00
description: >
  Aproveite o ambiente de sandbox da PayU para testar completamente sua solução antes de migrar para o ambiente de produção, onde são realizados pagamentos e transações reais.
weight: 40
---
<script>
  function openTarget() {
    var hash = location.hash.substring(1);
    if(hash) {
      var details = document.getElementById(hash);
    } 
    if(details && details.tagName.toLowerCase() === 'details') {
      details.open = true;
      details.scrollIntoView(true);
    }
  }
  window.addEventListener('DOMContentLoaded', openTarget);
</script>
Para conduzir testes com a PayU, use as credenciais fornecidas abaixo em suas solicitações, dependendo do país ao qual sua conta está associada.  

{{< testaccounts/accounts_pt >}}

{{% alert title="Notas" color="info"%}}

* Consulte a documentação de <a href="https://developers.payulatam.com/latam/pt/docs/services/3dsauthentication/payu-handled-3ds-authentication.html#testando-a-autentica%C3%A7%C3%A3o-3ds" target="_blank">Autenticação 3DS Realizada pela PayU</a> para encontrar as credenciais para testar 3DS.
* O ambiente de teste não replica os dados da sua conta de produção.

{{% /alert %}}

## Cartões de Teste {#test-Cartãos}

Você pode usar os seguintes cartões para teste:

<details id="argentina">
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
<details id="brazil">
<summary><img src="/assets/Brasil.png" width="25px"/> Brasil</summary>

| Cartão                     | Número                                   | Data de Expiração  | CVV  |
|----------------------------|------------------------------------------|--------------------|------|
| **Cartão de Crédito AMEX**       | 371341553758128                        | 2035/01           | 1234 |
| **Cartão de Crédito DINERS**     | 36490101441625                         | 2035/01           | 123  |
| **Cartão de Crédito ELO**        | 4389351648020055  <br> 4389358876174389 | 2035/01           | 123  |
| **Cartão de Crédito HIPERCARD**  | 6062825624254001                       | 2035/01           | 123  |
| **Cartão de Crédito MASTERCARD** | 5448280000000007 <br> 2223020000000005 <br> 2223000250000004 | 2035/01 | 123  |
| **Cartão de Crédito VISA**       | 4235647728025682  <br> 4895370010000005 | 2035/01           | 123  |

</details>
<details id="chile">
<summary><img src="/assets/Chile.png" width="25px"/> Chile</summary>

<table>
<thead>
  <tr>
    <th>Cartão</th>
    <th>Número</th>
    <th>Titular do cartão</th>
    <th>CVV</th>
    <th>Data de expiração</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Cartão de Crédito AMEX</b></td>
    <td>377825000000005</td>
    <td colspan="3" rowspan="2" style="vertical-align:middle"><a href="#testing-status">Use os valores de teste de acordo com o resultado esperado.</a></td>
  </tr>
  <tr>
    <td><b>Cartão de Crédito DINERS</b></td>
    <td>36525200000002</td>
  </tr>
  <tr>
    <td><b>Cartão de Crédito MASTERCARD</b></td>
    <td>5457210001000019</td>
    <td>BKN_DMC_001</td>
    <td>300</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Cartão de Débito MASTERCARD</b></td>
    <td>5204730000001003</td>
    <td>BKN_MCS_001</td>
    <td>100</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Cartão Pré-pago MASTERCARD</b></td>
    <td>5185540320000012</td>
    <td>BKN_DMC_001</td>
    <td>001</td>
    <td>12/25</td>
  </tr>
  <tr>
    <td><b>Cartão de Crédito VISA</b></td>
    <td>4761340000000035</td>
    <td>VISA_GLOBAL_3</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>Cartão Internacional VISA</b></td>
    <td>4005520000000129</td>
    <td>VISA_ECOMMERCE_03</td>
    <td>921</td>
    <td>12/27</td>
  </tr>
  <tr>
    <td><b>Cartão de Débito VISA</b></td>
    <td>4761340000000050</td>
    <td>VISA_GLOBAL_5</td>
    <td>846</td>
    <td>12/27</td>
  </tr>
</tbody>
</table>

</details>
<details id="colombia">
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
<details id="mexico">
<summary><img src="/assets/Mexico.png" width="25px"/> México</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito AMEX**       | 376675000000005                      |
| **Cartão de Crédito MASTERCARD** | 5491380000000001                     |
| **Cartão de Débito MASTERCARD**  | 5256780000000007                     |
| **Cartão de Crédito VISA**       | 4268070000000002                     |
| **Cartão de Débito VISA**        | 4415490000000004                     |

</details>
<details id="panama">
<summary><img src="/assets/Panama.png" width="25px"/> Panama</summary>

| Cartão                           | Número                               |
|----------------------------------|--------------------------------------|
| **Cartão de Crédito MASTERCARD** | 5455040000000005                     |
| **Cartão de Crédito VISA**       | 4723030000000005                     |

</details>
<details id="peru">
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

### Testando Status {#testing-statuses}

Ao testar pagamentos, certifique-se de incluir os seguintes valores na requisição de acordo com o status desejado:

* **Para obter transações _aprovadas_**: 
  - Inclua `APPROVED` no nome do titular do cartão.
  - Use **777** como o CVV do cartão (para AMEX, use **7777**).
  - O parâmetro `test` e a descrição também influenciam o status. Se não funcionar com `test` configurado como _false_, altere o valor para _true_.
  - Ao inserir a data de validade do cartão, certifique-se de que o mês seja **menor** que `6` e que o ano seja posterior ao ano atual. Por exemplo: `05/202_`.
<p>

* **Para obter transações _recusadas_**: 
  - Inclua `REJECTED` no nome do titular do cartão.
  - Use **666** como o CVV do cartão (para AMEX, use **666**).
  - O parâmetro `test` e a descrição também influenciam o status. Se não funcionar com `test` configurado como _false_, altere o valor para _true_.
  - Ao inserir a data de validade do cartão, certifique-se de que o mês seja **maior** que `6` e que o ano seja posterior ao ano atual. Por exemplo: `07/202_`.

<!--* **Para obter transações _pendentes_**: 
  - Envie `PENDING` no nome do titular do cartão.
  - Envie **777** como o CVV do cartão (para AMEX, use **7777**).
  - Envie o parâmetro `test` como _true_.
  - Na informação do comprador e do pagador, insira o e-mail `manual-review-hub@email.com`.-->

* **Para o número do cartão**, use um número válido que corresponda à bandeira enviada na requisição. Você pode usar um gerador online de cartões de crédito ou selecionar um dos cartões para seu país mencionados anteriormente.

* **Para testar transferências bancárias via PSE** (disponível na Colômbia) no ambiente Sandbox da PayU, consulte o [Guia de Testes PSE (PDF)](/assets/pse-test-guide-v5-es.pdf).

* **Para testar cartões no Chile**, use os valores de nome do titular, CVV e data de validade mostrados nas <a href="#chile" id="linkcl" onclick="document.getElementById('chile').open = true;">cartões de exemplo</a>.

## Importando a Coleção {#importing-the-collection}

Clique no botão abaixo para importar nossa coleção no Postman (pode ser necessário atualizar a página se o botão não funcionar para você). Observe que criamos um novo ambiente cada vez que você importa a coleção.

{{< postman/postman_flow_collection >}}
<br>

Depois de executar a coleção, você precisa definir os parâmetros globais e variáveis de ambiente.

### Configurando Suas Variáveis ​​de Ambiente {#setting-your-environment-variables}

Nossa coleção tem um ambiente chamado `PayU API Sandbox`. Recomendamos que você invoque as solicitações de API da coleção apenas em um ambiente Sandbox.

Se você deseja alterar as contas de teste do PayU, configure as variáveis `api_key`, `api_login`, `merchant_id` e `account-[país]`. Você pode deixar todas as outras variáveis inalteradas.

### Importando os Globals {#importing-globals}

As variáveis globais são necessárias para processar transações em nosso portal de pagamentos, como moeda, valor da transação, páginas de confirmação e resposta e muito mais.

Importe as variáveis globais da coleção para configurar os valores enviados às solicitações. 

1. Baixe o arquivo de variáveis globais <a href="/assets/globals/PayU%20Latam.postman_globals.json" download>aqui</a>.

2. Na coleção Postman, clique em _**Import**_ próximo ao nome do seu espaço de trabalho e localize o arquivo json baixado recentemente.

3. Quando terminar, clique em _**Import**_.

Para alterar o valor de uma transação, atualize o valor para o  `tx_value_[país]` de acordo com o país que você deseja testar.de acordo com o país que você deseja testar.

## Execute as Solicitações na Ordem Correta {#running-the-requests-in-the-correct-order}

Observe que a ordem em que você executa as solicitações é importante, pois alguns dos dados retornados por uma solicitação podem ser usados na próxima invocação.