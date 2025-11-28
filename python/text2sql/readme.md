# AIGC 时代如何搞数据库

1. sql?
   传统的 CRUD 操作

2. AIGC sql 自然语义数据库操作

## sqlite3 

1. 简单，好用的文本关系型数据库

2. 微信

本地数据库，Mysql 不合适

操作 sqlite，带来本地数据库

1. 链接一下
   
数据库独立于后端业务（http、web 等）
    独立的数据库实体
    sqlite3.connect('test.db')

    sql?
    sql 是数据库能理解的语法

    llm 的出现，使数据库操作更简单，更自然
    自然语言去操作数据库，生成 sql 

    cursor 游标
    cursor.excute(sql语句)

## sql prompt engineer

1. AI sql 助手

sql 也是文本，只不过它是数据库的专业语言

AIGC 在擅长不过

前端借助prompt弥补sql短板，或提高sql编写效率

2. prompt 设计规则

提供了上下文的数据库 schema 信息
自然语言的查询指令给它
告诉它只能做什么