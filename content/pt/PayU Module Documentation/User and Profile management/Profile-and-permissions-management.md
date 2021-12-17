---
title: "Gerenciamento de perfis e permissões"
linkTitle: "Gerenciamento de perfis e permissões"
date: 2021-08-27T16:07:39-05:00
type: docs
Description: >
   Aprenda a criar, atualizar e remover as permissões que você pode atribuir aos seus usuários.
weight: 20
---

Um _Perfil_ é uma série de permissões para que um usuário acesse um recurso de um _conta_. Um _usuário_ usando um _perfil_ pode acessar quantas contas houver em cada comércio.

Para obter mais informações sobre comércios, contas e muito mais, leia [conceitos por trás do Módulo PayU]({{< ref"PayU Module Documentation#payu-module-concepts" >}}).

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Listar Perfis_
* _Gerenciar Perfis_

## Perfis padrão {#default-profiles}
Por padrão, PayU fornece três perfis para que seus usuários acessem as contas. Esses perfis são:

* **Administrador**: este perfil habilita todas as permissões da conta. Um usuário com direito a este perfil pode criar, consultar, atualizar e excluir (ou desabilitar) as informações relacionadas à conta. Além disso, este usuário pode ver e baixar todos os relatórios, visualizar as informações técnicas, resolver disputas, gerenciar usuários, realizar transferências e gerenciar perfis.
* **Consultar e editar**: este perfil é equivalente a um perfil de _manager_. Um usuário com direito a este perfil pode criar, consultar, atualizar e excluir (ou desabilitar) as informações relacionadas à conta. Além disso, esse usuário pode ver e baixar todos os relatórios, ver as informações técnicas, resolver disputas e revisar os usuários e perfis criados.
* **Somente consultar**: este perfil pode acessar a conta no modo somente leitura. Um usuário com direito a este perfil pode criar e consultar as informações relacionadas à conta, baixar alguns dos relatórios e visualizar as transferências da conta. Além disso, este usuário **não pode** ver os detalhes técnicos ou ter acesso aos usuários e perfis.

Esses perfis não podem ser excluídos e suas permissões são fixas. Se alguma dessas permissões não atenderem às suas necessidades, você deve [criar uma]({{< ref"#create-profiles" >}}).

## Gerenciamento de perfis e permissões {#profile-and-permission-management}
Para gerenciar usuários, abra sua conta PayU e clique no menu _**Configuração**_ na parte superior da tela. Em seguida, selecione _**Perfis e permissões**_.

![PrintScreen](/assets/Profiles/Profiles_01_pt.png)

O módulo _**Gestão de serviços e permissões**_ abrirá. Aqui você encontra uma tabela com todas as permissões de acesso ao módulo PayU e os perfis com acesso a eles.

![PrintScreen](/assets/Profiles/Profiles_02_pt.png)
 
### Criar perfis {#create-profiles}
Quando nenhum dos [perfis padrão]({{< ref"#default-profiles" >}}) atende aos seus requisitos, você pode criar um e atribuir um conjunto personalizado de permissões. Para criar um perfil, siga estas etapas.

1. No módulo _**Gestão de serviços e permissões**_, clique _**Criar perfil personalizado**_.

![PrintScreen](/assets/Profiles/Profiles_03_pt.png)

2. Uma nova coluna é adicionada à tabela. Forneça um nome significativo para seu perfil personalizado.

![PrintScreen](/assets/Profiles/Profiles_04_pt.png)

3. Depois de definir o nome, você pode atribuir quantas permissões precisar, clicando na caixa de seleção de cada linha.

![PrintScreen](/assets/Profiles/Profiles_05_pt.png)

4. Quando terminar, clique em _**Salvar configuraçãos**_. Se você clicar em _**Apagar mudanças**_, o perfil não será salvo e a coluna será excluída da tabela.

### Editar perfis {#edit-profiles}
Ao editar um perfil, você pode renomeá-lo, além de atribuir ou remover permissões.

* Para renomear um determinado perfil, clique no símbolo▾ ao lado de seu nome. Clique em _**Mudar nome**_.<br><br>![PrintScreen](/assets/Profiles/Profiles_06_pt.png)<br>Isso permite que o campo de nome do perfil atualize.

* Para atribuir ou remover uma permissão, basta clicar na caixa de seleção da permissão

Quando terminar, clique em _**Salvar configuraçãos**_. Se você clicar em _**Apagar mudanças**_, todas as alterações de renomeação e alteração de permissão serão descartadas.

### Apagar perfis {#delete-profiles}
Para excluir um determinado perfil, clique no símbolo▾ ao lado do nome dele. Clique em _**Remover**_.

![PrintScreen](/assets/Profiles/Profiles_07_pt.png)

Se houver usuários com direito ao perfil que você está prestes a excluir, será solicitado que você defina um novo perfil para eles. Selecione o novo perfil no menu suspenso e clique em _**Eliminar e eassociar**_.

<img src="/assets/Profiles/Profiles_08_pt.png" alt="PrintScreen" width="50%"/><br>

Assim que você apagar o perfil, sua coluna será removida da tabela e nenhum usuário poderá ter este perfil.