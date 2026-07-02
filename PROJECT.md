# 재무회계 OX 퀴즈 · 빈칸 워크시트

Claude Design 핸드오프(`project/OX 퀴즈.dc.html`)를 **React + Vite**로 실제 구현한 모바일 우선 학습 앱입니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 화면 구성

- **홈** — 챕터 목록(진행률 바). 챕터3·4는 O/X 퀴즈, 챕터5는 빈칸 워크시트.
- **목차(TOC)** — 챕터별 파트 목록 + 파트별 진척도.
- **퀴즈** — 파트별 O/X 문제. 상단에 접이식 **이론 정리** 패널(ON/OFF 토글, localStorage에 저장). 답하면 초록 ✓ / 빨강 ✕ + 해설(문장별 줄바꿈)이 펼쳐짐.
- **결과** — 점수 + 문제별 ⭕/❌ 다시 보기.
- **워크시트(챕터5)** — 풀이 뼈대의 숫자를 드롭다운으로 채우는 빈칸 문제. 모두 맞히면(또는 "해설 보기" 버튼) 원문 해설이 나타남.

## 콘텐츠

문제·정답·해설·이론 정리는 모두 원본 디자인에서 **글자 변형 없이 그대로** 옮겼습니다.

- 챕터3 (개념체계): 15개 파트 · 146문제 + 파트별 이론
- 챕터4 (재무제표 표시): 21개 파트 · 98문제 + 파트별 이론
- 챕터5 (재고자산): 50개 빈칸 워크시트 + 원문 해설 (해설 원문은 `src/data/exp/*.md`)

## 구조

```
index.html                진입점 (Pretendard 폰트 CDN)
src/
  main.jsx                React 렌더 루트
  App.jsx                 상태·로직·화면 분기 (원본 렌더 로직 포팅)
  styles.css              리셋 · 키프레임 · :active 프레스 피드백
  data/
    index.js              챕터 조립
    questions.js          ch3Data · ch4Data (원문 그대로 추출)
    theory.js             theoryList · theoryList4
    worksheet.js          invData · invExpBrief · invExpMd
  lib/
    css.js               인라인 CSS 문자열 → React style 객체 변환
    helpers.js           breakSentences · splitPartName · mdToHtml · buildBriefMd
  components/
    HomeScreen.jsx  TocScreen.jsx  QuizScreen.jsx
    TheoryPanel.jsx  ResultScreen.jsx  WorksheetScreen.jsx
```

원본 핸드오프 파일과 대화 기록은 `project/`, `chats/`에 그대로 보존되어 있습니다.
