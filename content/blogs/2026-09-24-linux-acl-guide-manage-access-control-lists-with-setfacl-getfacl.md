---
title: "Linux ACL Guide: Manage Access Control Lists with setfacl & getfacl"
date: 2026-09-25
readTime: 6 min read
year: "2026"
topics: Linux , Security
snippet: >+
  Complete guide to Linux Access Control Lists (ACL). Learn to use setfacl and
  getfacl to manage file permissions beyond chmod. Practical examples and
  commands.

image: /assets/blog/screenshot_2.png
---
There are many challenges in managing Linux in a modern business environment, including that we must be able to manage who has access to information or what is commonly called the Access Control List. To do that, you can use *basic linux filesystem permissions*.

> **TL;DR** — Linux ACLs extend `chmod` with per-user and per-group permissions. Use `setfacl` to grant access without changing ownership, `getfacl` to inspect. Key commands: `setfacl -m u:user:rwx /path`, `setfacl -m g:group:rwx /path`, `setfacl -x u:user /path`, `setfacl -d -m u:user:rwx /path` (default for new files). This guide walks through each in a real deployment scenario.

### What You’ll Learn

![](/assets/blog/screenshot_5.png)

* How ACLs differ from basic Linux permissions
* Setting per-user and per-group permissions with 

  `setfacl`
* Viewing and removing ACLs with 

  `getfacl`

   and 

  `setfacl -x`
* Using default ACLs so new files inherit the right permissions
* A complete web server deployment case study

### Review Basic Linux Permissions

There are 3 types of permissions on Linux filesystems, here is a simple explanation:

* **U**

   ser or user owner
* **G**

   roup or owner group
* **O**

   ther or someone other than above

Of the three types of permissions above, each can be given 3 types of access, namely:

* **R**

   ead
* **W**

   rite
* e 

  **X**

   ecute

For example there is a directory containing files from the development department with the following permissions:

From the above example, the development user (owner user) can read and write to the directory. Members of the development group (or owner group) can also read and write directories, while other people or others cannot write. For the record, the above example allows other to read or view the directory contents.

### Linux Access Control List (ACL)

In certain situations, basic permissions can be tricky because each file and directory can only have one user and one group owner at a time. This type of situation can be resolved by Linux Access Control Lists (ACLs).

ACLs make it possible to apply a more specific set of permissions to a file or directory without changing ownership and permissions.

### Set ACLs

This section discusses using the Access Control List or ACL on Linux. This allows an easier time to set up permissions for automated tasks such as implementing web applications.

Make sure the ACL is installed, if you haven’t already run the command `sudo apt install acl`. On RHEL-based systems: `sudo yum install acl`.

In this case it will show the ACL setting on the directory. These ACL permissions can be inherited by the parent directories. Setting the default ACL for a location is very effective, as it ignores the need to always reset user / group permissions after any file operation (eg creating a new file).

#### Viewing ACLs

To be able to see the current ACL in a specific directory use the command `getfacl`:

#### Installing ACLs

The syntax for setting an ACL looks like this:

Set ACLs for specific users and directories:

Syntax description above:

* `setfacl`

  : Set ACL
* `-R`

  : Recursive into files and directories
* `-m`

  : Modifying ACLs (-x for removing)
* `u:johndoe:rwx`

  : User johndoe will get 

  `rwx`

   permissions
* `/var/www`

  : Gives permissions to directory 

  `/var/www`

Set ACLs for groups in a specific directory:

Syntax description above:

* `g:www-data:rwx`

  : Members of the 

  `www-data`

   group get 

  `rwx`

   permissions

#### Removes ACLs

Syntax description above:

* `-x`

  : Delete ACL’s for 

  `g:www-data`

   in 

  `/var/www`

### Sample case

To better understand, below is a case example in implementing a web application. There are 2 users with different permissions. Also read how to configure the initial server for deploying web applications [here](https://adityacprtm.dev/blog/kentuk-awal-untuk-mengamanan-server-baru).

#### Create User

Create the first user named jane and add it to the sudo group to be able to perform the `sudo` command.

The second user is named `bob`, `bob` is the user who can deploy the website and is a member of the `www-data` group.

To make sure the files in the web root belong to the group of `www-data`, run the command below. This is not required for ACL permissions, but is done for consistency.

#### Use of ACLs

Users will be granted permission to `read/write/execute` files and directories using ACLs instead of basic Linux permissions.

See set ACL by default, this is separate from basic user/group permissions.

Next, give jane user permission to change the web files in the `/var/www` directory. Jane doesn’t technically need this, as she can use the `sudo` command.

Above specifies the ACL for an existing file or directory, here it will recursively (-R) set the default (-d flag) for future files or directories.

Check the command above has been added successfully

> The previous two commands can be combined to set defaults and permissions: `setfacl -R -m u:jane:rwx,d:u:jane:rwx /var/www`

Next, grant group-based permissions via ACLs to web files. This more efficient way for the user allows editing of web files, regardless of who owns the files as long as they are members of the group.

Or use default (-d) for the future

If so, now TIAP USER who is a member of the `www-data` group can edit files in the `/var/www` directory. To make sure the ACL is checked by running the following command:

That’s it! We can also read articles from the Redhat website about ACL [here](https://www.redhat.com/sysadmin/linux-access-control-lists).

### Related Commands & Further Reading

* **`chmod`**

   — 

  [standard Linux file permissions](https://adityacprtm.dev/blog/easy-ways-to-manage-access-control-list-acl-on-linux#review-basic-linux-permissions)

   underpin ACLs. ACLs supplement, not replace, chmod.
* **`chown`**

   — change file owner/group. Often used alongside ACLs to set group ownership.
* **`umask`**

   — controls default permission bits for new files. ACL defaults override umask.
* **`ls -l`**

   — files with ACL entries show a 

  `+`

   suffix on the permission string (e.g. 

  `drwxrwxr-x+`

  ).
* For a deeper dive into Linux server security, see 

  [initial server setup guide](https://adityacprtm.dev/blog/kentuk-awal-untuk-mengamanan-server-baru)

  .
