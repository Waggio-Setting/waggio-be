import * as dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// 🔐 API 키는 .env에서 가져오기  #수정필요
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 프롬프트 정의 (JSON 출력 포함)
const prompt = `
당신은 급여 요약을 도와주는 AI 비서입니다.
다음은 소규모 기업의 급여 명세서이며, CSV 형식으로 구성되어 있습니다.
각 행은 한 명의 직원 정보를 나타냅니다.

CSV 항목:
Full Name, SIN, Pay Date, Employment Type, Hourly Rate, Hours Worked, Salary, Vacation Pay %, Bonus, Bank Name, Bank Account #, Transit Number, Institution #

🔹 각 직원에 대해 다음 정보를 요약해 주세요:
1. 직원 이름
2. 고용 형태 (Full-time / Part-time / Contract)
3. 총 지급액: 연봉/시급 + 보너스 + 휴가수당
4. 휴가수당 비율
5. 실수령액
6. 급여 지급일
7. 은행 정보: 은행 이름 + 계좌번호 끝 4자리

📌 규칙:
- 휴가수당은 기본 4%입니다.
- SIN, Transit Number, Institution #는 출력하지 마세요.
- 모든 금액은 CAD로 소수점 없이 표기해주세요.

📌 결과는 아래와 같은 JSON 배열로 출력해주세요:
[
  {
    "name": "John Smith",
    "type": "Full-time",
    "total": "$4700",
    "vacationRate": "4%",
    "netPay": "$4500",
    "payDate": "2025-07-01",
    "bank": "TD (****3210)"
  }
]
`;

// export async function getPayrollSummaryFromGemini(csvText) {
//   const fullPrompt = `${prompt}\n\nCSV 데이터:\n${csvText}`;

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const result = await model.generateContent(fullPrompt);
//   const response = result.response;

//   return response.text(); // JSON 형태 문자열
// }


//테스트
async function run() {
  const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});


  const result = await model.generateContent("Hello from Gemini!");
  const text = result.response.text();
  
  console.log(text);
}

run();

