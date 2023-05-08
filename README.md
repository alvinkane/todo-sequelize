# todo-sequelize
一個使用 Node.js + Express 搭配MySQL的todo-list

## 功能 

=======

1. 使用者可以註冊帳號，也可以透過facebook登入
2. 使用者必須登入才能進入todo-list，登入後可以使用以下功能
   (1) 使用者可以新增一筆資料
   (2) 使用者可以瀏覽一筆資料
   (3) 使用者可以瀏覽全部資料
   (4) 使用者可以修改一筆資料
   (5) 使用者可以刪除一筆資料
3. 使用者登入或註冊成功或失敗會顯示訊息提醒

## 安裝流程 

1. 打開 terminal, clone 此專案
   ```
   git clone https://github.com/alvinkane/todo-sequelize.git
   ```
2. 移到存取的資料夾(todo-sequelize)
   ```
   cd todo-sequelize
   ```
3. 安裝 npm 套件
   ```
   npm install
   ```
4. 安裝 nodemon 套件(若有可省略)
5. 在專案內創造一個 env 檔案，將SKIP修改為自己的
   ```
   FACEBOOK_ID=<應用程式編號>
   FACEBOOK_SECRET=<應用程式密鑰>
   FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
   SESSION_SECRET=<自行定義>
   PORT=3000
   ```
6. 打開MySQL workbench
   建立database: todo_sequelize
   ```
   drop database if exists todo_sequelize;
   create database todo_sequelize;
   use todo_sequelize;
   ```
7. 匯入種子檔案
   ```
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```
8. 執行專案
   ```
   npm run dev
   ```
9. 出現 "This is listening on http://localhost:3000"代表成功
10. 開啟任一瀏覽器輸入 This is listening on http://localhost:3000

## 種子資料帳密
    email: root@example.com
    password: 12345678

## 使用版本
node: 14.16.0  
npm: 6.14.11  
nodemon: 2.0.21
