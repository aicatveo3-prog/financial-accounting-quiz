# 재무회계 챕터5 추가

_Started 2026-07-01 02:39 UTC_

---

## User

이거를 목록에서 "재무회계 챕터5 (재고자산)"이라는 새 창으로 집어넣어줘. 
디자인은 원래의 챕터3,4 쪽을 참고해서 비슷하게 만들어줘. 
내용과 코드만 참고하는거야.

---

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now I understand the architecture. I'll add Chapter 5 as a new card that opens a block-worksheet screen, styled to match the existing indigo design. Let me build it.

_[tool: update_todos]_

Now the worksheet screen template, inserted after the result screen:

_[tool: dc_html_str_replace]_

Now the logic. First, add the `invData` getter and worksheet methods after the `chapters` getter:

_[tool: dc_js_str_replace]_

Now add the worksheet fields to state init:

_[tool: dc_js_str_replace]_

Now wire the worksheet values into `renderVals`. Insert computations before `partMap`:

_[tool: dc_js_str_replace]_

Now update the return object — append ch5 to home list and add worksheet keys:

_[tool: dc_js_str_replace]_

_[tool: update_todos]_

Let me screenshot the home list and the worksheet screen to verify:

_[tool: show_html]_

I need to verify the interaction works (dropdown, correct/wrong feedback). Let me screenshot to confirm the layout since this involves new interactive logic:

_[tool: show_html]_

Chapter 5 card appears. Now let me open the worksheet and test the blank interaction:

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Layout looks great. Now test the blank dropdown, a correct pick, and a wrong pick:

_[tool: save_screenshot]_

Dropdown opens with the 3 options (₩3,000 / ₩4,000 / ₩5,000). Now test picking the correct answer (₩4,000 for blank A, index 0 is ₩3,000 — correct is index 0? A:[["₩3,000","₩4,000","₩5,000"],0] → correct is ₩3,000). Let me pick the correct option and verify green feedback:

_[tool: save_screenshot]_

Correct feedback works (green ✓, progress 1/7). Let me quickly verify wrong-answer feedback on the next blank:

_[tool: save_screenshot]_

All interactions verified — dropdown, correct (green ✓), wrong (red + green correct answer beside it), shared-blank propagation (총 매출원가 reused ₩3,000 ✓), and progress. Let me clean up and finalize.

_[tool: delete_file]_

"재무회계 챕터5 (재고자산)" 카드를 목록에 추가했습니다.

_[tool: ready_for_verification]_

목록 맨 아래에 **재무회계 챕터5 (재고자산)** 카드를 챕터3·4와 같은 디자인(인디고 톤, 진행률 바)으로 추가했고, 카드를 누르면 빈칸형 워크시트 화면이 열립니다.

- 10문제 번호 탭 · 문제 원문/자료/4지선다 표시
- 풀이 뼈대는 그대로, 숫자만 빈칸(▾ ___) → 터치 시 3지선다 드롭다운
- 정답=연한 초록 ✓ 잠김 / 오답=연한 빨강 + 옆에 정답 표시(재시도 가능) / 같은 빈칸 ID는 모든 수식에 동시 반영
- 진행률 바, 상태 표시(완벽/N개 정답/빈칸 채우기), 초기화·이전·다음 버튼

기존 챕터3·4 OX 퀴즈는 그대로 두었습니다.

## User

클릭 선택하는게 너무 글자가 큰 것같아.

그리고 정답 맞추거나 틀릴 때 초록 빨강의 색깔이 너무 진한 것 같고, 체크 기호도 너무 커.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Now shrink the dropdown option text:

_[tool: dc_html_str_replace]_

Adjusted: dropdown option text smaller (11px), and softer/muted green & red feedback with a smaller, lower-opacity ✓ check.

_[tool: ready_for_verification]_

완료했습니다. 드롭다운 보기 글자를 작게 줄이고, 정답/오답 초록·빨강을 연하게, 체크(✓)도 더 작고 은은하게 바꿨습니다.

## User

클릭하는 쪽에서 글자 크기를 조금 더 줄였으면 좋겠어.

그리고 문제 쪽은 조금 검정으로 더 했으면 좋겠어

## Assistant

_[tool: dc_html_str_replace]_

Now darken the problem's data bullets and choices:

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

드롭다운 보기 글자를 10px로 더 줄였고, 문제의 자료 불릿과 선택지 색을 더 진하게(검정에 가깝게) 조정했습니다.

## User

글자 굵기가 너무 심한 거 같아. 
굵기를 조금 낮춰주고 글자 크기도조금 낮춰주고 좀 더 검은색으로 전체적으로 해줘

## Assistant

_[tool: read_file]_

Let me adjust the worksheet step/formula styling — lower weight, slightly smaller, darker (more black).

_[tool: str_replace_edit]_

수식 영역 전체의 글자 굵기를 낮추고(600→500대), 크기도 살짝 줄이고(13.5→12.5px 등), 색을 더 진하게(검정에 가깝게) 조정했습니다. 정답/오답 태그 글씨 굵기도 함께 낮췄습니다.

_[tool: ready_for_verification]_

완료했습니다.

## User

이제 이 문제들을 재고자산 챕터5 에 11~20번으로 추가해줘!

## Assistant

Adding problems 11–20 to the invData array. Let me insert them after item 10:

_[tool: dc_js_str_replace]_

Problems 11–20 added (total now 20). Let me verify — jump to problem 20 (has the most blanks, A–S) to confirm parsing works:

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

The eval showed the home screen — navigation didn't persist across calls. Let me verify the data parses correctly in one batched call:

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

Only 10 tabs — the new problems aren't showing. Let me check:

_[tool: grep]_

The file has all 20 problems — the live instance just held a stale version. Let me reload and confirm:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

20 tabs now. Let me confirm problem 20 renders its blanks and a correct pick locks green:

_[tool: eval_js]_

Problem 20 renders all its blanks (24 blank buttons across the 6 steps). Everything's wired. Finalizing.

11~20번 문제를 재고자산 챕터5에 추가했습니다 — 이제 총 20문제입니다. 각 문제는 기존과 동일한 빈칸형 워크시트 방식으로, 선입선출/총평균/이동평균, 순매출·순매입·매출원가, 매출총이익·영업이익 계산까지 풀이 뼈대의 숫자를 보기에서 골라 채우도록 구성했습니다.

_[tool: ready_for_verification]_

완료했습니다. 재고자산 챕터5에 11~20번 문제를 추가하여 총 20문제가 되었고, 홈 목록의 진행률 표시(0/20)도 자동으로 갱신됩니다.

## User

이쪽에 마우스를 가져가서 스크롤하면 왼쪽 오른쪽 이동할 수 있게 해줘

## Assistant

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

문제 번호 탭 위에서 마우스 휠(세로 스크롤)을 굴리면 좌우로 이동하도록 했습니다.

_[tool: ready_for_verification]_

완료했습니다. 이제 번호 탭 영역에 마우스를 올리고 휠을 굴리면 좌우로 스크롤됩니다.

## User

좌우로 스크롤되긴 하는데, 상하로도같이 스크롤되서 자동으로 마우스가 밖으로 빠져나와.
상하는 그때는 고정됬으면 좋겠어

## Assistant

The problem is React's `onWheel` is passive, so `preventDefault()` doesn't block page scroll. I'll attach a non-passive native listener via a ref instead:

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

번호 탭 위에서 휠을 굴릴 때 세로 스크롤은 막고 가로로만 이동하도록 고쳤습니다. (비패시브 네이티브 리스너로 처리해서 이제 `preventDefault`가 실제로 적용됩니다.)

_[tool: ready_for_verification]_

완료했습니다. 이제 탭 위에서 휠을 굴리면 가로로만 이동하고, 세로 페이지 스크롤은 고정됩니다.

## User

문제를 다 풀면 해설이 나왔으면 좋겠어.
여기에서 해설만 추출해서 문제 다 풀면 해설이 나오게 해줘.

## Assistant

All 20 problems will get explanations that appear once every blank is correct. I'll store the explanations in a separate lookup and render a "해설" reveal card. First, the explanation data:

_[tool: dc_js_str_replace]_

Now expose the explanation values in renderVals:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now add the computation before the return. Let me anchor on the existing worksheet computation block:

_[tool: dc_js_str_replace]_

Now the template — insert the explanation reveal card before the sticky bottom bar:

_[tool: str_replace_edit]_

Let me verify by solving problem 03 (fewest blanks) completely and checking the explanation appears:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

React state updates are async, so I need delays between open and pick. Let me use an async loop:

_[tool: eval_js]_

Let me reset and inspect what the dropdown actually looks like:

_[tool: eval_js]_

The dropdown works — my loop's waits were too short. Let me run the full fill with proper delays:

_[tool: eval_js]_

_[tool: eval_js]_

All blanks filled → explanation card appeared with "정답 ① ₩7,500". Let me screenshot to confirm it looks good:

_[tool: save_screenshot]_

The explanation card renders cleanly — step-by-step reasoning, "자주 하는 실수", and "포인트", all revealed once every blank is correct. Let me clean up the screenshot and finalize.

_[tool: delete_file]_

문제의 모든 빈칸을 정답으로 채우면, 그 문제의 상세 해설이 아래에 나타나도록 했습니다. 20문제 전부에 해설을 넣었습니다.

각 해설은 세 부분으로 구성됩니다:
- **핵심 + 정답** (초록 배지에 정답 표시)
- **단계별 풀이** (계산 과정을 단계별 카드로)
- **자주 하는 실수**(해당되는 문제만) + **포인트**

빈칸이 하나라도 틀리거나 비어 있으면 해설은 숨겨지고, 전부 맞히는 순간 스르륵 나타납니다.

_[tool: ready_for_verification]_

완료했습니다. 이제 각 문제의 빈칸을 모두 정답으로 채우면 상세 해설(핵심·단계별 풀이·자주 하는 실수·포인트)이 나타납니다.

## User

여기서 해설만 그대로 변형 없이 해설만 발췌해서 그대로 썼으면 좋겠어. 

그리고 만약 문제를 안풀어도 해설보기 버튼을 눌러서 곧바로 해설이 뜨게도 해줘. 
해설 보기 해설닫기 버튼도 구현해줘

## Assistant

This needs the full verbatim explanations plus a show/hide toggle. Let me read the current explanation code to replace it precisely.

_[tool: grep]_

_[tool: read_file]_

This is a big change: full verbatim explanations plus a show/hide toggle. I'll render the explanations as markdown (kept verbatim) via a small markdown→HTML converter, keep the existing brief data for 11–20, and add a 해설 보기/닫기 button. First, rename the existing getter and add the verbatim markdown + converter:

_[tool: dc_js_str_replace]_

Now add the verbatim markdown getter and the converter helpers before `enterWorksheet`:

_[tool: dc_js_str_replace]_

Now update the renderVals block that computed the old exp values:

_[tool: dc_js_str_replace]_

Now update the return keys:

_[tool: dc_js_str_replace]_

Now add `wExpOpen` to state init:

_[tool: dc_js_str_replace]_

Now the template — replace the explanation card's inner content with the rendered markdown, and add the toggle button. First the card body:

_[tool: str_replace_edit]_

Now add the 해설 보기/닫기 toggle button in the sticky bottom bar, above the status row:

_[tool: str_replace_edit]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

Now click "해설 보기" on problem 1 (without solving) to test the toggle:

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: eval_js]_

Explanation rendered (with tables), button toggled to "해설 닫기". Let me screenshot at the explanation location:

_[tool: save_screenshot]_

The verbatim explanation renders beautifully — full text with headings, bold, bullets. Let me scroll further to confirm the code block and table render:

_[tool: save_screenshot]_

Code blocks, tables (오답 선택지 분석, 매출액/매출원가 비교), bold, and the ✅ marker all render correctly and verbatim. Let me clean up the screenshots and finalize.

_[tool: delete_file]_

두 가지를 반영했습니다:

1. **해설을 원문 그대로** — 문제 01~10은 보내주신 상세 해설 전문(핵심·지문 분석·거래별 분석·풀이 과정·오답 선택지 분석·함께 알아두면 좋은 것)을 표·코드블록·굵은 글씨까지 변형 없이 그대로 렌더링합니다. (11~20은 기존 요약 해설 유지)

2. **해설 보기 / 해설 닫기 버튼** — 문제를 풀지 않아도 하단의 "해설 보기" 버튼을 누르면 즉시 해설이 열리고, "해설 닫기"로 접힙니다. 모든 빈칸을 맞히면 자동으로 열리며, 그 상태에서도 버튼으로 닫을 수 있습니다.

_[tool: ready_for_verification]_

완료했습니다. 문제 01~10은 원문 해설을 그대로 표시하고, "해설 보기 / 해설 닫기" 버튼으로 언제든 해설을 펼치거나 접을 수 있습니다.

## User

11~20번도 해설만 추출해서 해설을 이것을 그대로 수정 없이 사용할 수 있어?

## Assistant

I'll add the verbatim explanations for problems 11–20 to `invExpMd`, replacing the brief-generated ones. Let me insert them right after the "10" entry:

_[tool: dc_js_str_replace]_

Now problems 11–20 will use the verbatim markdown instead of the brief version. Let me verify problem 20 renders its full explanation:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

Problem 20's full verbatim explanation renders (손익계산서 구조 code block, 오답 분석 + 매출총이익/영업이익/당기순이익 comparison tables). Let me screenshot to confirm visual quality:

_[tool: save_screenshot]_

Renders perfectly — the 손익계산서 구조 diagram, step-by-step code blocks, all verbatim. Let me clean up and finalize.

_[tool: delete_file]_

네, 가능합니다. 문제 11~20의 상세 해설 전문도 보내주신 그대로(핵심·풀이 과정·오답 선택지 분석·함께 알아두면 좋은 것, 표·코드블록·부등호까지) 수정 없이 적용했습니다.

이제 20문제 전부 원문 해설을 표시하며, "해설 보기 / 해설 닫기" 버튼으로 언제든 펼치고 접을 수 있습니다.

_[tool: ready_for_verification]_

완료했습니다. 문제 11~20도 원문 해설을 그대로 사용하며, 이제 20문제 전부 상세 해설이 표시됩니다.

## User

🔷 문제 13

(주)한국의 6월 중 재고자산 거래가 다음과 같을 때 이에 대한 설명으로 옳지 않은 것은?

<span style="color:gray">▸12년 국가직 7급</span>

일자적요수량단가6월 1일월초재고100개₩106월 9일매입300개₩156월 16일매출200개₩256월 20일매입100개₩206월 28일매출200개₩30

① 회사가 총평균법을 사용할 경우 매출원가는 ₩6,000이다.

② 회사가 선입선출법을 사용할 경우 월말재고자산금액은 ₩2,000이다.

③ 총평균법을 사용할 경우보다 이동평균법을 사용할 경우 순이익이 더 크다.

④ 계속기록법과 선입선출법을 사용할 경우보다 실지재고조사법과 선입선출법을 사용할 경우 매출원가가 더 크다.


13번 문제를 원문으로 사용해줘

## Assistant

_[tool: dc_js_str_replace]_

Long statement choices won't read well in the 2-column grid. Let me make the choices switch to a single column when they're long sentences:

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

Problem 13 now shows the four full-length choices in a clean single column, verbatim. Let me clean up.

_[tool: delete_file]_

13번 문제의 선택지를 원문 그대로(네 문장 전체)로 바꿨습니다. 문장형 선택지는 한 줄에 하나씩(단일 열) 표시되도록 해서 읽기 편하게 했습니다.

## User

해설에서 전체적으로 이런 스크롤 바가 나타나지 않게 해줘

## Assistant

The scrollbar comes from the code blocks (`<pre>`) overflowing on narrow width. I'll make them wrap instead:

_[tool: dc_js_str_replace]_

Let me also let table headers wrap so tables don't scroll horizontally:

_[tool: dc_js_str_replace]_

Let me verify problem 13's explanation no longer shows a horizontal scrollbar:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

One table still overflows — let me add word-break to the table cells:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: grep]_

_[tool: read_file]_

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

I'll check all problems' explanations for any overflow by iterating through them:

_[tool: eval_js]_

_[tool: eval_js]_

Each has 1 — likely the number-tab rail (which intentionally scrolls). Let me confirm it's not in the explanation:

_[tool: eval_js]_

That's the number-tab rail, which is intentionally scrollable (the wheel-scroll feature). The explanation content itself no longer overflows. Let me screenshot problem 13's explanation to confirm the fix:

_[tool: save_screenshot]_

Let me capture the code block area where the scrollbar previously appeared:

_[tool: save_screenshot]_

The automated check already confirmed no `<pre>` or table overflows — only the tab rail (intentional). Let me do a final direct confirmation on problem 13's code blocks:

_[tool: eval_js]_

All code blocks and tables now fit with zero overflow. Now problem 14 — I'll set its full original choices (currently they were moved into `data` with empty choices):

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

_[tool: save_screenshot]_

The page has stale state. Let me reload:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: show_to_user]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: save_screenshot]_

Problem 14 now shows the four full-length choices verbatim, in a clean single column, with the shortened question. Let me clean up the screenshots.

_[tool: delete_file]_

14번 문제도 원문 그대로 반영했습니다 — 네 개의 선택지 전문을 표시하고, 문장형이라 한 줄에 하나씩(단일 열) 보이도록 했습니다. 함께 요청하셨던 해설 코드블록·표의 가로 스크롤바도 모두 제거되어 줄바꿈으로 표시됩니다.

_[tool: ready_for_verification]_

완료했습니다. 14번 문제 원문 선택지 반영과 해설 스크롤바 제거가 모두 적용됐습니다.

## User

문제를 원문을 그대로 수정없이 그대로 사용해줘.

## Assistant

_[tool: snip]_

_[tool: snip]_

I'll rewrite problems 11–20's question/data/choices to match the originals verbatim:

_[tool: str_replace_edit]_

Now let me verify a few of the updated problems render correctly:

_[tool: save_screenshot]_

Preview showed stale data. Let me reload and re-check problem 17:

_[tool: save_screenshot]_

Problem 17 now lists all 12 items verbatim (매출총액, 매입에누리, 임차료, 매입총액, 매출운임, 급여, 매입운임, 매출할인, 매입할인, 이자수익, 기말상품재고, 기계처분손실). Let me confirm problems 11 and 20 (two-column answer choices):

_[tool: save_screenshot]_

Problems 11 and 20 now show verbatim data and full two-column answer choices in a clean single column. Let me clean up screenshots and finalize.

_[tool: delete_file]_

11~20번 문제의 지문·자료·선택지를 모두 원문 그대로 반영했습니다. 자료 항목은 원문처럼 한 줄에 하나씩 나열하고, 선택지도 전문(선입선출법/평균법·매출총이익/영업이익 등)을 그대로 표시했습니다.

_[tool: ready_for_verification]_

완료했습니다. 11~20번 문제 원문(지문·자료·선택지)을 수정 없이 그대로 반영했습니다.

## User

근데 선택지 중에서 이렇게 튀어나가서 잘리는 경우가 있는데, 튀어나가면 약간 오른쪽으로 밀거나 왼쪽으로 밀 수 있어? 튀어나가지 않게

## Assistant

_[tool: snip]_

The dropdown popup gets clipped near screen edges. I'll add a ref that nudges it back into view after it opens. Let me find where the blank segments are built:

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

Now I'll add a `dropRef` clamp function to each blank segment. First define the helper and add it to the segment:

_[tool: dc_js_str_replace]_

Now define the `dropClamp` method. Let me add it near `wToggle`:

_[tool: dc_js_str_replace]_

Now add the `ref` to the dropdown div in the template:

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now let me test — go to problem 18 and open the last blank (which was clipping on the left):

_[tool: save_screenshot]_

The dropdown now stays fully within the card — clamped to the edge instead of clipping. Let me verify a right-edge blank too, then finalize:

_[tool: save_screenshot]_

The third blank's dropdown (90% 95% 100%) also stays fully within the card, near the right edge without clipping. The clamp works on both sides. Let me clean up.

_[tool: delete_file]_

선택지(드롭다운)가 화면 밖으로 튀어나가 잘리던 문제를 고쳤습니다. 이제 드롭다운이 열릴 때 위치를 확인해서 왼쪽이나 오른쪽으로 밀어 항상 카드 안에 들어오도록 했습니다. (왼쪽 끝·오른쪽 끝 빈칸 모두 잘리지 않습니다.)

_[tool: ready_for_verification]_

완료했습니다. 드롭다운이 화면 밖으로 튀어나가지 않고 항상 카드 안으로 들어오도록 좌우로 자동 조정됩니다.

## User

빈칸을 채워보세요
↺

이거를 해설보기 위로 올리는게 좋을 것 같고, 버튼이 너무 커서 클릭되는 버튼도 아닌데, 좀 헷갈려. 어떻게 UX 디자인을 하면 좋을까?

## Assistant

_[tool: snip]_

_[tool: grep]_

_[tool: read_file]_

Good UX call. The status box reads like a button but isn't, and it should sit above 해설 보기. I'll turn the status into a plain, non-interactive status line at the top, and make reset a small, clearly-labeled "초기화" button. Let me expose a `wCanReset` flag and rebuild the bar:

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

Let me screenshot the new bottom bar in three states (empty, partial, perfect):

_[tool: save_screenshot]_

The empty status is now a subtle line (no button-look), reset is hidden when nothing's filled. Let me verify the filled state shows the small "초기화" button and status:

_[tool: eval_js]_

_[tool: save_screenshot]_

Much cleaner. The status is now a subtle non-interactive line, the "↺ 초기화" is a small clearly-labeled button that appears only when there's something to reset, and the order is status → 해설 보기 → 이전/다음. Let me clean up.

_[tool: delete_file]_

하단 바를 다시 정리했습니다:

- **상태 표시를 맨 위로** 올리고, 버튼처럼 보이던 큰 박스를 없앴습니다. 이제 "· 빈칸을 채워보세요"처럼 옅은 글자 한 줄로만 표시돼서 클릭 대상이 아님이 분명합니다. (정답 맞히면 "🎉 완벽해요 · 정답 ③", 다 채우면 점수로 바뀝니다.)
- **초기화 버튼**은 작게 "↺ 초기화"로 라벨을 붙여 명확한 버튼으로 만들고, 채운 게 있을 때만 나타나게 했습니다.
- 순서: **상태 → 해설 보기 → 이전/다음** 으로 정리했습니다.

이렇게 하면 "정보(상태)"와 "동작(버튼)"이 시각적으로 구분돼서 덜 헷갈립니다.

_[tool: ready_for_verification]_

완료했습니다. 상태 표시를 맨 위 옅은 텍스트 한 줄로 바꾸고, 초기화는 작은 라벨 버튼으로 명확히 구분했습니다.

