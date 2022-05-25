---
title: "Relatórios"
linkTitle: "Relatórios"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Información de los reportes mostrados en el Módulo Administrativo.
weight: 24
---

{{% alert title="Observação" color="warning"%}}
Este tópico foi descontinuado e não está sendo oferecido a novos comerciantes.
{{% /alert %}}

## Relatórios de ordens
Uma ordem pode estar associada a várias transações, a PayU armazena as tentativas de pagamento relacionadas a uma ordem; por exemplo, se você vende sapatos e seu cliente tenta pagar com um cartão; ou se você vende sapatos e o seu cliente tenta pagar com um cartão de crédito VISA que não é válido, ele poderá realizar o pagamento novamente com um cartão de crédito MasterCard, cada tentativa de pagamento será registrada dentro da ordem como uma transação diferente.  

1. Você pode acessar o menu _**Relatórios**_, clicando sobre a opção _**Ordens**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes1-pt.jpg)
 
2. Você pode filtrar este relatório por:
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Estado**_: Permite que você selecione o status das ordens que você deseja consultar.

<details>
<summary>Estados da ordem</summary>
<br>

* _Iniciada_: Estado inicial com o qual a ordem é criada, seja porque o pagador ainda não tenha selecionado um meio de pagamento ou porque se trata de uma reserva.
* _Em progresso_: Ainda é esperado o pagamento da ordem (estado comum para pagamento em dinheiro, já que precisa que o pagador consigne o dinheiro para a entidade financeira).
* _Capturada_: Ordem que foi paga.
* _Cancelada_: Ordem que foi cancelada por decisão do pagador, ou porque o tempo de pagamento expirou.
* _Declinada_: O processo foi finalizado, seja por recusa do módulo antifraude, ou da entidade bancária.
* _Reembolsada_: Foi realizada a devolução do dinheiro proveniente de uma venda.

</details>
<br>

* _**Tipo de transação**_: Permite que você escolha o tipo da transação relacionada a uma ordem. Uma ordem pode ter diferentes tipos de transações associadas.

<details>
<summary>Tipos de transação</summary>
<br>

* _Autorização_: Transação autorizada.
* _Autorização e Captura_: Transação autorizada e pagada.
* _Captura_: Transacción de pago.
* _Cancelamento_: Transação cancelada antes de realizar o movimento financeiro.
* _Anulação_: Transação que já realizou movimento financeiro e que precisa de um cancelamento (prévia para reembolso).
* _Reembolso_: Devolução do dinheiro.

</details>
<br>

* _**Meio de pagamento**_: apresenta cada uma das possíveis opções em que os seus clientes possam realizar um pagamento, seja por bandeiras como VISA ou MasterCard, ou por meios de pagamentos em dinheiro como <!--Baloto, -->OXXO e BCP; o por transferência.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.
 
 
{{% alert title="Observação" color="info"%}}
Você pode consultar dados relacionados à ordem como o identificador, a referência de venda do e-mail do pagador na opção de busca avançada.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes2-pt.jpg)

3. O resultado da consulta é o conjunto de ordens que cumprem as condições definidas nos filtros do relatório, mostrando informação pontual como o ID da ordem, o número de referência da venda e o valor da transação entre outros.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes3-pt.jpg)

4. Caso você deseje ampliar a informação, poderá clicar sobre uma das ordens; o sistema mostrará uma tela com a informação detalhada, incluindo as transações associadas.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/ordenes4-pt.jpg)

## Relatório de transações
A partir deste relatório, você poderá consultar todas as transações relacionadas a um processo de pagamento e a ordem a qual pertencem. Também poderá obter informação mais específica sobre tentativas de pagamento de uma ordem, reversões feitas, dados do pagador etc.

{{% alert title="Observação" color="info"%}}
Em alguns casos, os dados do comprador e do pagador podem diferir já que a pessoa que ordena a compra através da página web não é a mesma que realiza o pagamento.
{{% /alert %}}
 
1. Você pode acessar o menu _**Relatórios**_ clicando sobre a opção _**Transações**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones1-pt.jpg)
 
2. Você poderá realizar a consulta filtrando por:
* _**Conta**_: Caso você possua várias contas, você consegue selecionar com qual delas você deseja realizar a consulta de transações.
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Estado**_: Permite que selecciones el estado de las transacciones que deseas consultar.
 
<details>
<summary>Estados da transação</summary>
<br>

* _Aprovada_: O resultado da transação foi satisfatório.
* _Declinada_: A transação foi cancelada.
* _Erro_: Erro de processamento da transação.
* _Pendente_: Pendente pela resposta da transação.
* _Expirada_: O tempo de espera da resposta na transação terminou.

</details>
<br>

* _**Código de resposta**_: Apresenta um listado dos possíveis códigos de resposta que pode ter uma transação e permite filtrar a consulta por um código específico.
* _**Tipos de transação**_: Permite que você escolha o tipo da transação relacionada a uma ordem:

<details>
<summary>Tipos de transação</summary>
<br>

* _Autorização_: Transação autorizada.
* _Autorização e Captura_: Transação autorizada e pagada.
* _Captura_: Transacción de pago.
* _Cancelamento_: Transação cancelada antes de realizar o movimento financeiro.
* _Anulação_: Transação que já realizou movimento financeiro e que precisa de um cancelamento (prévia para reembolso).
* _Reembolso_: Devolução do dinheiro.

</details>
<br>

* _**País**_: Permite que você consulte o país desde o qual foi gerada a venda.
* _**Meio de pagamento**_: apresenta cada uma das possíveis opções em que os seus clientes possam realizar um pagamento, seja por bandeiras como VISA ou MasterCard, ou por meios de pagamentos em dinheiro como <!--Baloto, -->OXXO e BCP; o por transferência.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.
 
![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones2-pt.jpg)
 
3. O resultado da consulta é o conjunto de transações que cumprem as condições definidas nos filtros do relatório, mostrando informação como o ID da ordem que está relacionada a uma transação, a data em que foi considerada, o ID e o valor entre outros.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/transacciones3-pt.jpg)

## Relatório Gráfico
Esta opção permite gerar os gráficos com a informação das vendas ou das transações geradas em um período de tempo específico.

1. Você pode acessar o menu _**Relatório**_ clicando na opção _**Gráficos**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico1-es.jpg)

2. O relatório permite que você filtre por:
* _**Linha de tempo**_: Te permite realizar la consulta en varios tipos de rango de tiempos, permitiéndote ver la información por días, semanas o meses.
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Estado**_: Permite que você selecione o estado das transações que você deseja consultar.

<details>
<summary>Estados da transação</summary>
<br>

* _Aprovada_: O resultado da transação foi satisfatório.
* _Declinada_: A transação foi cancelada.
* _Erro_: Error de procesamiento de la transacción.
* _Pendente_: Pendente pela resposta da transação.
* _Expirada_: O tempo de espera da resposta na transação terminou.

</details>
<br>

* _**País**_: Permite que você realize a consulta de transações segundo o país no qual esta foi gerada.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico2-pt.jpg)
 
3. O resultado da consulta pode ser visualizado por meio de um gráfico de linhas ou por um gráfico de colunas, que resumem o comportamento das transações segundo as condições definidas no filtro.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/grafico3-pt.jpg)
 
## Certificado de retenções
Se sua loja é Colombiana e deve apresentar o certificado de retenções para declaração de renda, o módulo administrativo permite que você gere de maneira automática um documento com a informação necessária.    

1. Você pode acessar o menu _**Relatórios**_ clicando sobre a opção _**Certificado de retenção**_ e filtrar de acordo com o período de tempo e a conta na Colômbia com a qual será criado o relatório.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones1-pt.jpg)
 
2. O resultado da consulta pode ser baixado em um documento em formato PDF que contém toda a informação necessária pela legislação colombiana para sua declaração de renda.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/retenciones2.jpg)
 
## Transferências entre contas PayU
Estes relatórios permitem que você consulte todas as operações de transferência de saldo disponível que tenham sido consideradas desde e até para suas contas PayU latam.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu1-pt.jpg)
 
1. Você poderá consultar aquelas transferências que foram realizadas desde suas contas no módulo de _**Relatórios**_ e clicando sobre _**Transferências realizadas**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu2-pt.jpg)

E de igual forma, você poderá consultar aquelas transferências que foram realizadas para suas contas no módulo de _**reportes**_ e clicando sobre _**Transferências recebidas".

2. Nos dois relatórios, você pode realizar a consulta segundo o período de tempo em que a operação foi considerada, as contas envolvidas e o valor da transferência.

{{% alert title="Observação" color="info"%}}
Se você quer realizar a consulta de transferências para contas que não pertencem à sua loja, você deve ter o número _**Conta ID**_, que identifica a conta PayU que você deseja consultar em nosso sistema.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu4-pt.jpg)

3. O resultado da consulta será o relatório consolidado de transferências entre contas PayU que cumpram com os valores solicitados.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/cuentaspayu5-pt.jpg)

## Modelos cobrança de contas no Brasil
Se você tem uma conta no Brasil que funcione através do modelo de repasse flexível – Float x dias ou do modelo de Repasse conforme acquirer, nestes relatórios você poderá ver como as transações estão sendo abonadas dia-a-dia, permitindo que você tenha um melhor controle do dinheiro proveniente das suas vendas no Brasil.

### Repasse flexível - Float x dias
Nesse modelo, sua loja receberá a totalidade do dinheiro de uma venda, uma vez que seja transcorrida a quantidade de dias que foram definidos para a sua conta. 

**Exemplo**: Se sua conta está configurada para abono de dinheiro a D+5 dias, e seu cliente realiza uma compra no dia 1 de janeiro, você receberá o abono do seu dinheiro no dia 6 de janeiro.
En este modelo tu comercio recibirá la totalidad del dinero de una venta una vez hayan transcurrido la cantidad de días que se definieron para tu cuenta.

#### Consultar seus pagamentos recebidos
1. Você poderá consultar seus pagamentos recebidos no módulo de _**Relatórios**_ y haciendo clic sobre _**Pagos recibidos**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-pt.png)
 
2. Segundo o modelo de acreditação e os parâmetros que você tenha configurado em sua conta te permite filtrar por:
* _**Conta**_: Caso você possua várias contas, você consegue selecionar com qual delas você deseja realizar a consulta de transações.
* _**Método de acreditação**_: Permite que você selecione entre os dois modelos disponíveis de acreditação para realizar a consulta, que neste caso é D+X dias.
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Id de la orden**_: Te permite ingresar un número de orden específico para mirar si este ya fue acreditado a tu cuenta.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias2-pt.png)
 
3. O relatório mostrará a data em que foi considerada a transação de venda, a data em que foi acreditado na conta. Mostrará também a data em que foi considerada a transação da venda, a data em que foi acreditada na conta, e os dados mais importantes correspondentes à transação como, por exemplo: Id da ordem ao qual está relacionada a transação, a referência, o valor da venda, o valor do conceito de interesses da transação.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-pt.png)

#### Consultar seus pagamentos pendentes
1. Você poderá consultar seus pagamentos no módulo de _**Relatórios**_ e clicando sobre _**Pagamentos pendentes**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-pt.png)
 
2. O relatório permite filtrar por:
* _**Conta**_: Caso você possua várias contas, você consegue selecionar com qual delas você deseja realizar a consulta de transações.
* _**Método de acreditação**_: Permite que você selecione entre os dois modelos disponíveis de acreditação para realizar a consulta, que neste caso é D+X dias.
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias5-pt.png)
 
3. O relatório mostrará a data em que foi considerada a transação da venda, a data em que será acreditada a venda, a quantidade de dias faltantes e os dados mais importantes correspondentes para a transação como são o Id da ordem para o qual está relacionada à transação, a referência, o valor da venta e o valor por conceito de interesses da transação.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-pt.png)

### Modelo para parcelamentos
Sua loja receberá o dinheiro das vendas realizadas mês a mês de acordo com a quantidade de parcelas definidas pelo seu cliente no momento da compra.

**Exemplo**: Se o seu cliente realiza uma compra no dia 1 de janeiro diferida a 6 meses, a partir do dia da compra mês a mês será abonada a quantidade de dinheiro correspondente à parcela durante 6 meses.   

#### Consultar seus pagamentos recebidos
1. Você poderá consultar seus pagamentos recebidos no módulo de _**Relatórios**_ e clicando sobre _**Pagamentos recebidos**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias1-pt.png)
 
2. Segundo o modelo de acreditação e os parâmetros que você tenha configurado em sua conta te permite filtrar por:
* _**Conta**_: Caso você possua várias contas, você consegue selecionar com qual delas você deseja realizar a consulta de transações.
* _**Método de acreditação**_: Permite que você selecione entre os dois modelos disponíveis de acreditação para realizar a consulta, que neste caso é D+X dias.
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Id de la orden**_: Te permite ingresar un número de orden específico para mirar si este ya fue acreditado a tu cuenta.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias8-pt.png)
 
3. O relatório mostrará a data em que foi considerada a transação, a data na qual a última parcela foi acreditada para a conta, e a data que na próxima parcela será acreditada, a quantidade de parcelas que foram diferidas na compra e na quantidade de parcelas que foram pagas, além dos mais importantes correspondentes à transação, sendo eles o Id da ordem para a qual está relacionada a transação (a referência, o valor da venda e o valor por conceito de interesses da transação).

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias3-pt.png)

#### Consultar seus pagamentos pendentes
1. Você poderá consultar seus pagamentos no módulo de _**Relatórios**_ e clicando sobre _**Pagamentos pendentes**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias4-pt.png)
 
2. O relatório permite filtrar por:
* _**Conta**_: Caso você possua várias contas, você consegue selecionar com qual delas você deseja realizar a consulta de transações.
* _**Método de acreditação**_: Permite que você selecione entre os dois modelos disponíveis de acreditação para realizar a consulta, que neste caso é D+X dias
* _**Ranking de datas**_: Permite que você defina o ranking de datas entre as quais você deseja realizar a consulta. O limite da consulta é de 3 meses.
* _**Formato**_: Permite que você veja o resultado da consulta na tela ao escolher o formato HTML, ou exporte o resultado para um arquivo Excel.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias7-pt.png)
 
3. O relatório mostrará a data em que foi considerada a transação de venda, a data em que será acreditada na conta, e os dados mais importantes correspondentes à transação como, por exemplo, o Id da ordem que está relacionada à transação, a referência, a quantidade de parcelas para quais foram diferidas a compra, a qualidade de parcelas faltantes para serem acreditadas, o valor da venda e o valor por conceito de interesses da transação.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/d+xdias6-pt.png)

{{% alert title="Observação" color="info"%}}
Se a sua conta tem fundo de reserva, a porcentagem dele será retida durante o abono para sua conta PayU.
{{% /alert %}}