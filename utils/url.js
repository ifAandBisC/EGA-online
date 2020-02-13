var Root = "http://exam.sumixer.com/career-api/";
// var Root = "http://10.0.0.66:8083/career-api/";

module.exports = {
  // User:
  // login:
  'login': Root + 'login/wechatStudent?code=',
  // check session:
  'checkSession': Root + 'login/check',

  // Classes:
  // join class:
  'joinClass': Root + 'user/join?classId=',
  // show all classes:
  'viewClass': Root + 'viewClass/class/',

  // Exam:
  // get all exams:
  'getExams': Root + 'viewExam/class/',
  // get details of an exam
  'getExam': Root + 'viewExam/getExamDetail',
  // get all transcripts
  'getTranscripts': Root + 'transcript/all',
  // get one perticular transcript
  'getTranscriptDetail': Root + 'transcript/detail?transcriptId=',

  // Paper:
  // get questions separated by page in the paper:
  'getQuestions': Root + 'question/student/',
  // upload students' answers:
  'submitAnswers': Root + 'answer'

}