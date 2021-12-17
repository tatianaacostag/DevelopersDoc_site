---
title: "Configurar integração"
linkTitle: "Configurar integração"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Obtenha as configurações de integração mostradas no Módulo Administrativo.
weight: 28
nosidetoc: true
---

{{% alert title="Observação" color="warning"%}}
Este tópico foi descontinuado e não está sendo oferecido a novos comerciantes.
{{% /alert %}}

## Informação técnica
Nesta sessão, você encontrará a informação necessária para realizar a integração técnica de sua página web com nossa plataforma transacional.

1. Você poderá ver esta informação entrando em menu _**Dados da loja**_, clicando sobre a opção _**Informação técnica**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica1-pt.jpg)

Os seguintes dados técnicos serão exibidos:

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica2-pt.jpg)

2. Você pode mudar seu logotipo clicando o botão de pesquisa da imagem.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/tecnica3-pt.jpg)
 
## Configuração de contas
Nesta sessão, você poderá configurar propriedades técnicas pertencentes a à cada conta ativa, como: a configuração de URLs para as páginas de resposta e confirmação:
* A configuração de URLs para as páginas de resposta e confirmação
* Habilitar as opções de envio dos emails ao comprador e à sua loja no momento de realizar uma venda.
* Definir um número de referência único para cada venda que você realize através do seu website.

Você poderá ver esta informação entrando no menu _**Dados da loja**_, clicando sobre a opção _**Configuração da conta**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/configuracion1-pt.jpg)

Você encontrará as propriedades que poderá configurar:
* **Selecionar a conta**: Você deve escolher a conta para fazer a respectiva configuração, ao escolher será mostrado o país correspondente à esta conta.
* **URL resposta**: É a página para qual será direcionado o comprador, uma vez que a transação é finalizada na PayU, nesta página se mostrará o estado da transação.
* **URL confirmação**: É a página para a qual a PayU enviará a confirmação de pagamento para o seu sistema, com o fim de atualizar os inventários e bases de dados, uma vez que a transação chegue ao seu estado final. Esta página não é obrigatória.
* **E-mail para o comprador**: Ao habilitar esta opção será enviado desde PayU um e-mail para o comprador, confirmando se o pagamento foi aprovado ou recusado.
* **E-mail para o vendedor**: Ao habilitar esta opção será enviado desde PayU um e-mail para a sua loja, confirmando se o pagamento foi aprovado ou recusado.
* **Habilitar página de confirmação**: Ao habilitar esta opção você enviará a confirmação de pagamento para a página de confirmação configurada uma vez que a transação chegue ao seu estado final.
* **Validar referência única**: Ao habilitar esta opção se validará na PayU que você utiliza uma única referência para todas suas vendas. Caso contrário, cada venda que você realize, terá sua própria referência de venda
* **Transação no modo de teste**: Ao habilitar esta opção as transações que são realizadas, através do seu site web ou por meio de solicitação de pagamento, serão marcadas como de teste e o pagamento não será real. É necessário desabilitar esta conta quando você queira começar a receber pagamentos reais.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/activar8-pt.jpg)