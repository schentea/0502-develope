import db from "../config/db.js"

export const getCourseList = async (req,res) => {

  //비지니스 로직 (service) => repository
  //코스 리스트 가져오기
  //서버 죽음 방지 (trycatch 문 사용)
  try {
    const QUERY = "select * from course;"
  
    //then => result의 쓸데없는 값은 버리고 결과값만 가져오기 
    const result = await db.execute(QUERY).then(result => result[0])
    
    res.status(200).json({status : "성공", message:"코스 데이터 리스트 전송 완료" , data : result})
    
  } catch (error) {
    res.status(500).json({status:"실패", message : "코스 데이터 가져오기 실패"})
  }
}