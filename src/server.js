//역할
//1. 데이터 전송
//2. 유효성 검사
//3. 예외처리 + 로그저장
import "dotenv/config"
import cors from "cors";
import express from "express";
import { coursePage, introducePage, mainPage } from "./controller/webController.js";
import { middle } from "./middle/testMiddle.js";
import db from "./config/db.js";
import { getCourseList } from "./controller/courseController.js";



const PORT = 8000
const app = express()
const corsOptions ={
  origin:["http://localhost:3000", "http://localhost"],
  credential : true,
  method : ['GET','POST']
}
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html")

//미들웨어 폴더 구성 후 사용
//파일 허용 부분
app.use("/css", express.static("src/client/css"))
app.use("/file", express.static("src/client/file"))
app.use("/js", express.static("src/client/js"))
app.use(cors(corsOptions))
// JSON 형식 변환 미들웨어
app.use(express.json())

// 웹 라우터
app.get("/", mainPage)
app.get("/introduce", introducePage)
app.get("/course", coursePage)

// api라우터
app.get("/api/course",getCourseList)
app.post("/testdb", async (req, res) => {
  const data = req.body;
  const QUERY = "INSERT INTO course (course_name, course_latitude, course_longitude, course_qr) VALUES (?, ?, ?, ?)"
  await db.execute(QUERY, [data.course_name, data.course_latitude, data.course_longitude, data.course_qr])
  res.send("gkdl")
})


//테스트 용
//쿼리스트링 방식
// 중요한건 안보냄
// http://localhost:8000/test?name=choi
app.get("/test",middle, (req, res) => {
  
 const data = req.query
 const name = data.name
 console.log(name)
  res.send("응답")
})

app.listen(PORT, () => {
  console.info(`Server is listening http://localhost:${PORT}`)
})

//리팩토링 => 기능 변경 X 코드를 보기 좋게 O