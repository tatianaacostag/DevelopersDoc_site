---
title: "Profile y Permissions Management"
linkTitle: "Profile y Permissions Management"
date: 2021-08-27T16:07:39-05:00
type: docs
Description: >
   Learn how to create, update, y remove the set of permissions you can assign to your users.
weight: 20
---

A _Profile_ is a set of permissions that allows a user to access to a feature of an _account_. A _user_ using a _profile_ can access to as many account there are in each merchant.

For further information about merchants, accounts, y more, read the [concepts behind the PayU Module](/payu-module-documentation.html#payu-module-concepts).

## Permission required
To have access to this module, you need to have a profile with the following permission enabled:

* _Review permissions y profiles_
* _Create, edit y delete profiles y permissions_

Refer to [Profiles y Permissions]({{< ref"Profile-and-permissions-management.md" >}}) for more information.

## Default profiles
By default, PayU provides three profiles that allow your users to access the accounts. These profiles are:

* **Administrator**: this profile has enabled all the permission of the account. A user entitled to this profile can create, review, update, y delete (or disable) the information related to the account. Furthermore, this user can see y download all the reports, view the technical information, resolve disputes, manage users, perform transfers, y manage profiles. 
* **Read y write**: this profile is the equivalent of a _manager_ profile. A user entitled to this profile can create, review, update, y delete (or disable) the information related to the account. Furthermore, this user can see y download all the reports, view the technical information, resolve disputes, y review the users y profiles created.
* **Only read**: this profile can access the account in read-only mode. A user entitled to this profile can create, review the information related to the account, download some of the reports, view the transfers of the account. Furthermore, this user **cannot** see the technical details or has access to the users y profiles.

These profiles cannot be deleted y their set of permissions are fixed, if any of these permissions does not meet your needs, you should [create one]({{< ref"#create-profiles" >}}).

## Profile y Permission management
To manage users, open you PayU account y click _**Configuración**_ menu at the top the screen y then, select _**Perfiles y permisos**_.

![PrintScreen](/assets/Profiles/Profiles_01.png)

The _**Profiles y permissions management**_ module opens, here, you can find a table with all the permissions to access PayU module y the profiles with access to them.

![PrintScreen](/assets/Profiles/Profiles_02.png)
 
### Create profiles
When none of the [default profiles]({{< ref"#default-profiles" >}}) meets you requirements, you can create one y assign a customized set of permissions. To create a profile follow these steps.

1. In the _**Profiles y permissions management**_ module, click _**Create custom profile**_.

![PrintScreen](/assets/Profiles/Profiles_03.png)

2. A new column is added to the table. Provide a meaningful name for your custom profile..

![PrintScreen](/assets/Profiles/Profiles_04.png)

3. Once you set the name, you can assign as many permission as you need by clicking the checkbox of each row.

![PrintScreen](/assets/Profiles/Profiles_05.png)

4. When finish, click _**Save settings**_. If you click _**Delete changes**_, the profile is not saved y the column is deleted form the table.

### Edit profiles
When editing a profile, you can either rename it, or assign or remove permissions.

* To rename a given profile, click the ▾ symbol next to its name. Then, click _**Change name**_.<br><br>![PrintScreen](/assets/Profiles/Profiles_06.png)<br>This enables the name field of the profile to update it.

* To assign or remove a permission, just click the checkbox of the permission.

When finish, click _**Save settings**_. If you click _**Delete changes**_, all the changes for both renaming y permission change are discarded.

### Delete profiles
To delete a given profile by click the ▾ symbol next to its name. Then, click _**Delete**_.

![PrintScreen](/assets/Profiles/Profiles_07.png)

If there are users entitled to the profile you are about to delete, you are prompted to set a new profile for them. Select the new profile from the dropdown menu y click _**Delete y reassign**_.

<img src="/assets/Profiles/Profiles_08.png" alt="PrintScreen" width="50%"/><br>

As soon as you delete the profile, its column is removed from the table y no user will be able to have this profile.