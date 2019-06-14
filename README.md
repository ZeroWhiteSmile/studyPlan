# studyPlan
## ...or用命令行创建一个新的存储库
>* echo "# studyPlan" >> README.md
>* git init
>* git add README.md
>* git commit -m "first commit"
>* git remote add origin git@github.com:ZeroWhiteSmile/studyPlan.git
>* git push -u origin master
>>* -u选项会指定一个默认主机，这样后面就可以不加任何参数使用git push。

## ...or从命令行推送现有存储库
>* git remote add origin git@github.com:ZeroWhiteSmile/studyPlan.git
>* git push -u origin master

## ..or 从另一个存储库导入代码
>* 您可以使用Subversion、Mercurial或TFS项目中的代码初始化此存储库。

## markdown图示错误：request to terminta: Could not create SSL/TLS secure channel.(请求被中止: 未能创建 SSL/TLS 安全通道)
>* 1.首先要确认是否安装了 .Net Framework 4.5以上.
>* 2.桌面新建txt, 重命名为123.reg，使其变成注册表，然后写入以下内容，双击运行即可.
>>* Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001
[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\.NETFramework\v4.0.30319]
"SchUseStrongCrypto"=dword:00000001