# 学生管理系统

## 系统和软件信息
```
Mac OS 11.4
Node v16.13.1
MySQL v8.0.20
```

## 运行项目
```
# 数据库
# 登录mysql
cd db
mysq -u root -p
#创建数据数据 
mysql> create database hhq;
#切换数据库
mysql> use hhq;
#导入数据
mysql> source hq.sql

# 备份命令 
# mysqldump -u root -p db_name table_name1,table_name2... > hq.sql
# 例子：
mysqldump -u root -p hhq hq_user > hq.sql


#后端
cd server_end
npm install
npm run dev 

#前端
cd client_end
open index.html

```

## gitignore 不生效解决
```
git rm -r --cached .
git add . 
git commit -m 'update .gitignore'
git push

```