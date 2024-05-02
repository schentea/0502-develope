import "dotenv/config"
import mysql, { createConnection } from "mysql2"

export const dbCon = {
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
}

//커넥션 , 풀에 담가두기 방식

//케넥션 방식
// => 요청 한번에 1번 연결 (비용 과다)

//풀 방식
// => 메모리에 저장 후 사용 

const db = mysql.createPool(dbCon).promise()

export default db;
