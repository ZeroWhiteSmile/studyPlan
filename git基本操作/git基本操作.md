## 远程仓库

1.从仓库克隆代码
```
git clone http/https地址
```

2.列出远程仓库名
```
git  remote 
```
<img src='/img/git_remote.png' />
![](/img/git_remote.png')


3.列出远程仓库地址
```
git  remote -v
```
<img src='../img/git_remote_v.png' />


4.删除本地指定的远程地址
```
git  remote rm origin
||
git remote remove origin // origin可以使别的名字
```


5.远程仓库-添加远程仓库

```
git  init
git  remote add origin 仓库地址
```
注: 拉取(刷新比对状态)远程仓库：git fetch origin(origin是仓库名字)


6.修改远程仓库

```
git  remote set-url origin 仓库地址
```
<img src='../img/set_url_origin.png' />


## 查看当前分支状态

```
git staus
```
<img src='../img/git_status.png' />


## 查看分支名

1.查看本地分支名
```
git branch
```
<img src='../img/git_branch.png' />

2.查看远程分支名
```
git branch -r
```
<img src='../img/git_branch_r.png' />

3.查看所有远程名和本地分支名(红色远程分支,白色本地分支,绿色当前分支)
```
git branch -a
```
<img src='../img/git_branch_a.png' />


## 切换分支(本地和远程分支)

1.切换到本地分支
```
git checkout 分支名
```
<img src='../img/checkout.png' />

2.切换到远程分支
```
git checkout  remotes/origin/分支名
```
<img src='../img/checkout.png' />


## 删除分支

1.删除本地分支

```
git branch -d 分支名
```
<img src='../img/branch_d.png' />
<img src='../img/branch_d_after.png' />

注意:
-d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的.
如果想强制删除一个分支，可以使用-D选项

2.删除远程分支

```
git push origin --delete 远程分支名称
|
git push origin  :test // 推送一个空分支到远程分支相当于删除远程,本地的还存在
```
<img src='../img/branch_dekete.png' />


## 修改当前所在分支名称

切换到本地或者远程分支，然后修改分支名称。
```
git branch -m 分支名
```
<img src='../img/branch_m.png' />

**注意：更改名称时候不区分大小写,相同名字大小写会认为是一个分支。**

modification 英 /,mɒdɪfɪ'keɪʃ(ə)n/  美 /,mɑdɪfɪ'keʃən/ n. 修改，修正；改变 复数 modifications


## 合并分支(将另外一个分支合并到当前分支)
```
git merge 分支名
git merge origin/分支名
```
<img src='../img/merge.png' />

<img src='../img/merge1.png' />


## 手动建立和远程分支的一种追踪关系(tracking)

```
git  branch --set-upstream-to=远程分支名字 本地分支名字
||
git  branch --track=远程分支名字 本地分支名字
```
<img src='../img/__set__upstream.png' />
<img src='../img/__track.png' />

stream 英 /striːm/  美 /strim/ n. 溪流；流动；潮流；光线 vi. 流；涌进；飘扬 vt. 流出；涌出；使飘动
track  英 /træk/  美 /træk/ n. 轨道；足迹，踪迹；小道 vt. 追踪；通过；循路而行；用纤拉 vi. 追踪；走；留下足迹
unset 复原 复位 释放环境变量 英 /ʌn'set/ adj. 未装配的；未坚固的 vt. 使……移动；扰乱；[计] 复原


## 手动撤销和远程分支的一种追踪关系(tracking)
```
git  branch --unset-upstream 远程分支名字
```
<img src='../img/__unset_upstream.png' />


## 远程分支

1.删除远程分支
```
git push origin --delete 远程分支名字
|
git push origin  :test // 推送一个空分支到远程分支相当于删除远程,本地的还存在
```
<img src='../img/delete.PNG' />


2.创建远程分支

先创建本地分支 -> 在推送分支到远程
```
git push origin 本地分支名字:远程分支名字
```
<img src='../img/creater.PNG' />


3.刷新远程分支
```
git fetch origin --prune
```
<img src='../img/fetchOriginPrune.png' />

prune 英 /pruːn/  美 /prun/ vi. 删除；减少 vt. 修剪；删除；剪去 n. 深紫红色；傻瓜；李子干 过去式 pruned过去分词 pruned现在分词 pruning复数 prunes第三人称单数 prunes


## 本地分支

1.创建本地分支的上游分支
* 方法一：设置上游分支
```
git branch --set-upstream-to=remotes/origin/分支名 本地分支名
```
<img src='../img/upstream.PNG' />

* 方法二：设置上游分支并且推送代码
```
git push --set-upstream origin 远程分支名字
```
<img src='../img/gitPush__setUpstreamOrigin_.png' />


2.创建一个新分支

* 创建并且切换到本地新分支

```
git checkout -b 分支名
```
<img src='../img/branch.png' />

* 创建新分支不切换到新分支

```
git branch 分支名
```
<img src='../img/branch1.png' />


3.拉取并且合并远程仓库到本地

* 默认已存在自动track追踪远程分支时pull

```
git  pull
```

* 完整pull命令(不存在自动track追踪远程分支时)

```
git  pull  origin  远程分支名字(不需要前缀指向) 本地分支名字
||
git  pull  origin  远程分支名字(不需要前缀指向)
```
<img src='../img/pull.png' />

注:等同于先做git fetch，再执行git merge。


4.刷新(fetch)

```
git  fetch
```

5.将修改添加到索引(add)

* 他会监控工作区的状态树，使用它会把工作时的所有变化提交到暂存区，包括文件内容修改(modified)删除以及新文件(new)，但不包括被忽略的文件。

```
git  add . 或者 git add 文件名/目录名
```

* 他会将被修改的文件提交到暂存区，不会提交新文件（untracked file）。

```
git  add -u
```

* git add .和git add -u两个功能的合集（git add --all的缩写）

```
git  add -A
```

* 添加documentation目录及其子目录下所有*.txt文件的内容：

```
git  add  documentation/*.txt
```


* 将以Controller结尾的文件的所有修改添加到暂存区

```
git  add  *controller
```

* 将所有以Hello开头的文件的修改添加到暂存区

```
git  add  hello*
```
<img src='../img/add_1.png' />

* 命令查看所有修改过或已删除文件但没有提交commit的文件，并通过其revert子命令可以查看<path>中所有未跟踪的文件，同时进入一个子命令系统(按两下ctrl + c退出)。

```
git  add  -i
```

staged 已暂存(已commit)  /'stedʒɪd/  adj. 分期的 v. stage过去式及过去分词
revert  /rɪ'vɜːt/  美 /rɪ'vɝt/ vi. 回复；重提；返祖遗传；归还vt. 使回复原状n. 恢复原状者


6.将暂存区里的改动给提交到本地的版本库(commit)

```
git  commit -m '提交注释'
```
<img src='../img/commit.png' />


* 没有加入-m 后会弹出vim

```
git  commit 
```

根据提示进如vim:
1.摁键盘i(编辑模式切换),最下面有所变化出入插入模式
<img src='../img/mode_i.png' />

2.此时光标在最上面，输入要替提交的说明'comment',嗯Esc退出插入模式,然后输入:(命令行模式),光标跑到了最下面
<img src='../img/mode_m.png' />

3.输入wq之后，摁回车即可，就要回到了原始的命令行界面


* -a参数,即使文件没有经过git add添加到暂存区，也可以提交。

```
git  commit -a -m '提交注释' (-a参数,即使它们没有经过git add添加到暂存区)
```

7.将本地版本库的分支推送到远程服务器上对应的分支(git push)

* 不存在追踪关系的远程分支时候远程分支名称

```
git  push origin 远程分支名称
```

* 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支，等同于 git push origin --delete master

```
git  push origin  :remotes/master
```

* 如果当前分支与远程分支存在追踪关系，则本地分支和远程分支都可以省略，将当前分支推送到origin主机的对应分支 

```
git  push origin
```

* 推送时候建立上游追踪分支

```
git push --set-upstream origin 远程分支名字
```


## 存储操作(stash)-储藏

stash英 /stæʃ/  n. 藏匿处；藏匿物 vt. 存放；贮藏 vi. 存放；藏起来


1.当你不想提交进行了一半的工作,而你想转到其他分支上进行一些工作,解决这个问题的办法就是git stash命令。
'储藏'可以获取你工作目录的中间状态——也就是你**修改过的被追踪的文件暂存的变更**——并将它保存到一个未完结变更的堆栈中，随时可以重新应用。
```
git stash
```
<img src='../img/git_stash.png' />


2.暂存工作区**被修改的跟踪文件**并且**添加注释**，但是未跟踪文件(新增的文件)不被存储。
```
git stash push -m(--message的缩写)（已commit的）
```

3.使用git stash push -u -m '说明'命令可以将**未跟踪文件和跟踪文件**一并存储并且**添加注释**：
```
git stash push -u(--include--untracked的缩写) -m（未commit的、已commit的）
```
<img src='../img/stash_push_u.png' />
untracked 英 /ʌn'trækt/ adj. 无足迹的；无路径的；（经济萧条以后）开始回升的


4.查看暂存列表
```
git stash list
```
<img src='../img/git_stash_list.png' />

5.你可以重新应用你刚刚实施的储藏:

如果你不指明，Git 默认使用最近的储藏并尝试应用它,

如果你想应用更早的储藏，你可以通过名字指定它，像这样：git stash apply stash@{2}。

```
git stash apply
```
<img src='../img/stash_apply.png' />

apply 英 /ə'plaɪ/ 美 /ə'plaɪ/ vt. 申请；涂，敷；应用 vi. 申请；涂，敷；适用；请求  过去式 applied过去分词 applied现在分词 applying


6.对文件的变更被重新应用，但是被暂存的文件没有重新被暂存。想那样的话，你必须在运行 git stash apply 命令时带上一个 --index 的选项来告诉命令重新应用被暂存的变更。
```
git stash apply --index
```

7.要移除stash，你可以运行 git stash drop，加上你希望移除的储藏的名字：

drop英 /drɒp/ 美 /drɑp/   vt. 滴；使降低；使终止；随口漏出  vi. 下降；终止  n. 滴；落下；空投；微量；滴剂
过去式 dropped或dropt过去分词 dropped或dropt现在分词 dropping
```
git stash drop stash名
```
<img src='../img/stash_drop.png' />

8.删除删除所有stash
```
git stash clear
```
stash英 /stæʃ/  n. 藏匿处；藏匿物 vt. 存放；贮藏 vi. 存放；藏起来
<img src='../img/stash_clear.png' />