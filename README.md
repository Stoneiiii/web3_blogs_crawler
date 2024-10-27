## Introduction

这是一个基于nodejs的爬虫的后端。采用微服务架构。
使用express搭建轻量级后端GraphQL服务，和调用微服务。
### The main libraries used
Crawler：
- selenium
- moment.js
- Seneca
  
Backend:
- express
- graphql
- apollo server


Database：
- MySQL
- XmySQl

## Explanation
- Integrate the web3 web crawler as a microservice framework based on Seneca. Decouple it from other services to facilitate future expansion and maintenance of the crawler service.
- Use Xmysql to generate a REST API for MySQL, which will be used by GraphQL in the Express backend. This setup aligns with the actual architecture where the database is also separated from the backend.

## Getting started
### Database
1. Create a database and table 
Create a table according to the following definition:
```sql
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    time DATETIME,
    title VARCHAR(255),
    url VARCHAR(255) UNIQUE,
    articlebody TEXT
);
```
2. Configure the database connection information in the following file
    ...\blog_crawler\database\connect.js
3. Configuring the nodejs environment
```
npm i
```
4. Starting mysql service and xmysql service
```
xmysql -h localhost -u qqwww520kk -p password -d mysqldb --portNumber 3456
```
### Crawler Microservices
1. Configuring the nodejs environment
```
cd craler
npm i
```
2. Starting Microservices
```
node crawler_server.js
```
3. Client request(other terminal)
```
node coinbase_server.js
```

### Backend
1. Configuring the nodejs environment
```
cd blog_crawler
npm i
```
2. Running
```
npm run service
```
3. GraphQL website
```
http://localhost:4000/graphql
```
4. Running a crawler
```
http://localhost:4000/runcrawler/*
```
e.g. http://localhost:4000/runcrawler/coinbase
- coinbase
- ethereum
- protocol
