# 재무회계 챕터4 창 생성

_Started 2026-06-29 01:52 UTC_

---

## User

Save as standalone HTML: OX 퀴즈.dc.html

## Assistant

_[tool: read_file]_

_[tool: grep]_

The file already has a thumbnail and only references a CDN font (handled automatically by the bundler) plus support.js. No code-referenced resources to lift. Running the bundler.

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

Clean. Delivering the standalone file.

_[tool: present_fs_item_for_download]_

Done — standalone HTML exported and ready to download above. Works fully offline (font is inlined).

## User

새로 "재무회계 챕터4 (재무제표 표시)" 창을 새로 만들어줘. 

그리고 이 문제들을 추가해줘. 그대로 똑같이 추가해주면됨. 글자의 변형 조금도 없이 그대로 사용해.

---

## Assistant

문제 내용이 메시지에 포함되지 않았어요 (`---` 뒤가 비어 있습니다). 추가할 문제들을 붙여넣어 주세요.

그동안 기존 퀴즈 구조를 파악해 새 챕터를 같은 형식으로 만들 준비를 해두겠습니다.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

I've now read the full structure of the existing quiz — I understand exactly how parts, questions (O/X + 해설), and the optional theory sections are organized, so I can replicate it precisely.

But I still need the actual questions. Your message ended at `---` with no content after it. Please paste the 재무제표 표시 문제들 (and 해설 if you have them) and I'll build 챕터4 in the identical format, with the text used verbatim.

_[tool: snip]_

The questions still didn't come through — please paste them and I'll build 챕터4 right away.

## User

새로 "재무회계 챕터4 (재무제표 표시)" 창을 새로 만들어줘. 

그리고 이 문제들을 추가해줘. 그대로 똑같이 추가해주면됨. 글자의 변형 조금도 없이 그대로 사용해.

## Assistant

Now I have all 103 questions. Let me read the theory-card portion of the template (lines 120–280) that I haven't seen, to decide how to handle the theory section cleanly since you only gave questions + 해설.

_[tool: read_file]_

I have everything I need. Creating the new chapter as a Design Component, mirroring the existing app's structure (home → 파트 목록 → 퀴즈 → 결과), with all 103 questions placed verbatim across 21 parts.

Note: your explanations used markdown `**bold**` markers around emphasized phrases. Those render as literal asterisks in this app (which has no markdown), so I strip only the `**` symbols — every word stays exactly as written. Since you gave only questions + 해설 (no 이론 정리 content), I omit the theory card that chapter 3 had, rather than show an empty one.

_[tool: dc_write]_

_[tool: show_html]_

_[tool: ready_for_verification]_

"재무회계 챕터4 (재무제표 표시)" 창을 만들었습니다. 챕터3과 동일한 구조(홈 → 21개 파트 목록 → 퀴즈 → 결과)이며, 103문제를 파트별로 그대로 넣었습니다.

참고: 해설에 쓰신 `**강조**` 마크다운 기호는 이 앱에서 별표 문자로 그대로 보이기 때문에 `**` 기호만 제거했고, 글자 내용은 한 자도 바꾸지 않았습니다. 이론 정리는 따로 주신 내용이 없어 챕터3의 빈 카드 대신 생략했습니다 — 필요하시면 내용 주시면 추가하겠습니다.

## User

아니 챕터3 밑에 챕터4를 추가해달라는 뜻이었어.
이전 챕터3도 복구하고 챕터3 밑에 챕터4를 새 창으로 넣어줘

## Assistant

챕터4를 별도 파일로 만든 게 아니라, 기존 챕터3 앱의 목록에 챕터4를 한 항목 더 추가하는 의미였군요. 챕터3 앱(`OX 퀴즈.dc.html`)을 그대로 두고 목록에 챕터3 → 챕터4 순서로 두 챕터를 넣어, 각 챕터가 자기 퀴즈로 들어가도록 통합하겠습니다.

먼저 로직(다중 챕터 지원)부터 수정합니다.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now add the chapter-4 data and the multi-chapter getters before `label()`:

_[tool: dc_js_str_replace]_

Now update `renderVals` — multi-chapter theory, home cards, and chapter-aware answers:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the multi-replaces for chapter-aware answers, and the return-object update:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the template: home list → two chapter cards, dynamic chapter title, and hide the theory card when a chapter has none.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Now wrap the theory card so it only shows for chapters that have theory:

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: delete_file]_

_[tool: set_project_title]_

챕터3 앱에 챕터4를 통합했습니다. 홈 목록에 챕터3 → 챕터4 두 카드가 나오고, 각 카드를 누르면 해당 챕터의 파트 목록·퀴즈·결과로 들어갑니다. 챕터3은 기존 그대로(이론 정리 포함) 유지되고, 챕터4는 이론 정리가 없어 그 카드는 표시되지 않습니다. 진행 상황도 챕터별로 따로 저장됩니다.

(이전에 만든 별도 챕터4 파일은 이 통합 목록으로 대체되어 삭제했습니다.)

_[tool: ready_for_verification]_

완료했습니다. 이제 `OX 퀴즈` 앱 홈에서 챕터3 아래에 챕터4가 추가되어, 각각 눌러서 풀 수 있습니다.

## User

Save as standalone HTML: OX 퀴즈.dc.html

## Assistant

The file already has the thumbnail template and only references the Pretendard CDN font (an HTML attribute the bundler resolves). No JS-referenced assets. Running the bundler.

_[tool: super_inline_html]_

_[tool: show_html]_

Renders cleanly — both chapters listed (챕터3: 146문제, 챕터4: 103문제). Delivering the standalone file.

_[tool: present_fs_item_for_download]_

챕터3·챕터4가 모두 담긴 standalone HTML을 위 카드에서 받으실 수 있습니다. 오프라인에서 완전히 동작합니다.

## User

완전히 같은 내용을 다른 문장으로 반복하고 있는 쌍이 5개 있어요:
중복 쌍남길 것삭제할 것이유Q19 ≈ Q20Q19Q20둘 다 "매출채권 손실충당금 차감 = 상계에 해당한다" (❌)Q42 ≈ Q43Q42Q43둘 다 "무조건의 권리 없으면 유동부채" (⭕)Q50 ≈ Q51Q50Q51둘 다 "약정 위반 + 보고기간 후 합의 → 유동부채" (⭕)Q54 ≈ Q55Q54Q55둘 다 "특별손익 본문·주석 어디에도 불가" (⭕)Q80 ≈ Q81Q80Q81둘 다 "성격별은 기능별 배분 불필요 → 간단" (⭕)


→ 이 5개 문제를 삭제하고 번호를 하나씩 당겼어. 이대로 반영해줄 수 있어?

## Assistant

새 98문항 버전(중복 5쌍 중 5개 삭제 + 재번호)을 반영합니다. 통합 앱의 챕터4 데이터에서 해당 5개 항목만 삭제하면 됩니다 — 남기신 문항/번호는 그대로입니다.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

5개 항목 삭제 완료 — 챕터4가 98문항이 됐습니다. 갱신된 내용으로 standalone도 다시 만듭니다.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

Chapter 4 now shows 21개 파트 · 98문제. Regenerating the standalone and delivering it.

_[tool: super_inline_html]_

_[tool: present_fs_item_for_download]_

반영했습니다. 챕터4는 중복 5개를 뺀 98문항이 되었고, 갱신된 standalone HTML을 위 카드에서 받으실 수 있습니다.

## User

이걸 파트1~4까지 이론 정리로 추가해줄래? 
원리는 재무회계 챕터3처럼 똑같아.

챕터4에 이론정리로 이걸 그대로 글자 수정없이 그대로 똑같이 쓰면됨.

## Assistant

챕터3와 동일한 이론 블록 시스템으로 챕터4 파트1~4 이론 정리를 추가합니다. 먼저 파트별로 이론 유무를 판단하도록 `hasTheory`를 고치고, `theoryList4`를 추가합니다.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Let me verify chapter 4's theory renders for Part 1 and that Part 5 has no theory card.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: eval_js]_

Theory renders now (earlier read was a navigation-timing fluke). Let me confirm Part 5 (no theory yet) hides the card, and screenshot Part 1's theory.

_[tool: eval_js]_

Part 5 correctly shows no theory card. Now screenshot Part 1's theory:

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

The theory renders cleanly — purple "핵심 한 줄" box, numbered headings, and the 3-column table. Regenerating the standalone and delivering.

_[tool: super_inline_html]_

_[tool: present_fs_item_for_download]_

챕터4 파트1~4에 이론 정리를 챕터3과 동일한 방식으로 추가했습니다(텍스트는 그대로). 이론이 있는 파트1~4만 "이론 정리" 카드가 뜨고, 파트5 이후는 표시되지 않습니다. 갱신된 standalone은 위 카드에서 받으실 수 있습니다.

이어서 파트5~21 이론 정리도 보내주시면 같은 형식으로 채워 넣겠습니다.

## User

Part 5. 상계표시

핵심 한 줄: 자산과 부채, 수익과 비용은 원칙적으로 서로 빼서 순액으로 표시하면 안 된다.


5-1. 원칙: 상계 금지

K-IFRS에서 요구하거나 허용하지 않는 한, 자산↔부채, 수익↔비용은 서로 상계하지 않는다. 각각 따로 표시해야 정보이용자가 중요한 정보를 놓치지 않는다.


5-2. 상계가 허용되는 세 가지 대표 사례

사례숫자 예시왜 상계를 허용하나?비유동자산 처분손익처분대금 1억 – 장부금액 8,000만 – 처분비용 200만 = 처분이익 1,800만하나의 거래이므로 순액이 실질 반영충당부채 비용 – 제3자 보전금액보증수리비 5,000만 – 보험 보전 2,000만 = 순비용 3,000만순수 부담액만 보여주는 것이 실질적외환손익, 단기매매 금융상품 손익외환이익 3,000만 – 외환손실 1,200만 = 순이익 1,800만빈번한 유사 거래 → 순액이 유용

단, 외환손익·단기매매 손익의 차익과 차손이 중요한 경우에는 구분 표시해야 한다.

예: 외환이익 50억, 외환손실 48억 → 순액 2억만 보면 위험이 안 보임 → 구분 표시 필요


5-3. 상계에 해당하지 않는 것 — 평가충당금 차감

구분상계표시평가충당금 차감하는 일서로 다른 항목을 서로 빼기같은 자산 내에서 장부금액 조정본질A항목 – B항목A항목 원래 금액 – A항목 가치 하락분예시매출과 매입을 서로 빼서 순액매출채권 500 – 손실충당금 30 = 470상계인가?⭕ 상계임❌ 상계 아님

대표 사례:


매출채권 – 손실충당금 → 상계 아님
재고자산 – 재고자산평가충당금 → 상계 아님



⚠️ 시험 함정 포인트


"평가충당금 차감은 상계에 해당한다" → ❌ (해당하지 않음)
"중요성을 고려하지 않고 순액 표시" → ❌ (중요하면 구분 표시)




Part 6. 보고빈도

핵심 한 줄: 재무제표는 최소 1년에 한 번 만들어야 하지만, 보고기간이 1년을 초과하거나 미달할 수 있다.


6-1. 원칙

전체 재무제표(비교정보 포함)는 적어도 1년마다 작성한다.

실무적으로 52주를 보고기간으로 선호하는 기업이 있으며, 이러한 보고관행을 금지하지 않는다.


6-2. 보고기간이 1년이 아닌 경우

보고기간종료일을 변경하면 보고기간이 1년을 초과하거나 미달할 수 있다.

예: 12월 결산 → 3월 결산으로 변경 시, 변경하는 해에는 15개월(초과) 또는 3개월(미달)

이 경우 추가 공시 필요:


재무제표 해당 기간
1년을 초과/미달하게 된 이유
재무제표 금액이 완전하게 비교가능하지는 않다는 사실



6-3. 표시 단위

재무제표를 천 단위·백만 단위로 표시하면 이해가능성이 제고된다. (중립성이 아님!)

허용 조건: ① 금액 단위를 공시할 것, ② 중요한 정보가 누락되지 않을 것


⚠️ 시험 함정 포인트


"보고기간은 1년을 초과할 수 없다" → ❌ (초과 가능)
"천 단위 표시 시 중립성 제고" → ❌ (이해가능성 제고)




Part 7. 비교정보

핵심 한 줄: 올해 숫자만 보여주는 게 아니라, 작년 숫자도 함께 보여줘야 한다.


정보 유형비교정보 제공금액 정보 (숫자)전기 비교정보를 반드시 표시서술형 정보 (글)목적적합하다면 비교정보 표시


소급 재작성 시 — 재무상태표 세 개 공시

회계정책 변경 등으로 소급 재작성할 경우, 일반적인 두 개가 아니라 세 개의 재무상태표를 공시한다.

공시 시점당기 말전기 말전기 초 ← 추가


표시·분류 변경 시 비교금액 재분류

재무제표 항목의 표시나 분류를 변경한 경우, 전기 수치도 새로운 방식에 맞춰 재분류해야 한다.

공시 사항: ① 재분류의 성격, ② 재분류된 금액, ③ 재분류의 이유, ④ 전기 기초 금액

실무적으로 적용할 수 없는 경우에는 재분류하지 않을 수 있다.


⚠️ 시험 함정 포인트


"서술형 정보는 당기 정보만 표시" → ❌ (목적적합하면 비교정보 포함)


---
파트5~7도 똑같이 글자 수정 없이 그대로 추가해줘

## Assistant

챕터4 파트5~7 이론 정리를 같은 형식으로 이어 붙입니다.

_[tool: dc_js_str_replace]_

Now regenerate the standalone and deliver.

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: eval_js]_

Part 7 theory renders correctly in the standalone build. Delivering.

_[tool: present_fs_item_for_download]_

파트5~7 이론 정리를 동일 형식으로 추가했습니다(텍스트 그대로). 갱신된 standalone은 위 카드에서 받으실 수 있습니다. 파트8~21도 보내주시면 이어서 채우겠습니다.

## User

파트8~11도 똑같이 글자 수정 없이 그대로 추가해줘

## Assistant

챕터4 파트8~11 이론 정리를 이어서 추가합니다.

_[tool: dc_js_str_replace]_

Regenerating the standalone and delivering.

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: eval_js]_

Part 11 theory renders fully in the standalone. Delivering.

_[tool: present_fs_item_for_download]_

파트8~11 이론 정리를 동일 형식으로 추가했습니다(텍스트 그대로). 갱신된 standalone은 위 카드에서 받으실 수 있습니다. 파트12~21도 보내주시면 마저 채우겠습니다.

## User

파트12~16도 똑같이 글자 수정 없이 그대로 추가해줘

## Assistant

챕터4 파트12~16 이론 정리를 이어서 추가합니다.

_[tool: dc_js_str_replace]_

Regenerating the standalone and delivering.

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: eval_js]_

Part 16 renders fully. Delivering the updated standalone.

_[tool: present_fs_item_for_download]_

파트12~16 이론 정리를 동일 형식으로 추가했습니다(텍스트 그대로). 갱신된 standalone은 위 카드에서 받으실 수 있습니다. 마지막 파트17~21도 보내주시면 완성하겠습니다.

## User

파트17~18도 똑같이 글자 수정 없이 그대로 추가해줘

## Assistant

파트17~18은 흐름도(트리)가 있어, 그 정렬을 살리기 위해 monospace `pre` 블록 타입을 추가한 뒤 이론을 넣겠습니다.

먼저 블록 타입 추가:

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

Now append parts 17–18:

_[tool: dc_js_str_replace]_

Now verify the flow-diagram (pre block) and tables render, then rebuild the standalone.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: save_screenshot]_

The flow-diagram renders correctly in a monospace box with preserved tree alignment (horizontally scrollable). The 3-column table and section headings look good. Rebuilding the standalone and delivering.

_[tool: super_inline_html]_

_[tool: present_fs_item_for_download]_

파트17~18 이론 정리를 추가했습니다(텍스트 그대로). 17-2 판별 흐름도는 정렬이 유지되도록 monospace 코드 박스로 표시했습니다. 갱신된 standalone은 위 카드에서 받으실 수 있습니다.

남은 파트19~21도 보내주시면 마무리하겠습니다.

## User

파트19~21도 똑같이 글자 수정 없이 그대로 추가해줘

## Assistant

마지막 파트19~21 이론 정리를 추가해 챕터4 전 파트를 완성합니다.

_[tool: dc_js_str_replace]_

Now verify all 21 parts have theory and regenerate the standalone.

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: show_html]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

On ch4 TOC. Let me open Part 21 directly.

_[tool: eval_js]_

Part 21 renders fully — all 21 parts of chapter 4 now have theory. Regenerating the standalone and delivering.

_[tool: super_inline_html]_

_[tool: present_fs_item_for_download]_

파트19~21까지 추가해 챕터4 전체 21개 파트에 이론 정리가 모두 들어갔습니다(텍스트 그대로). 챕터3·챕터4 모두 완성된 최종 standalone HTML을 위 카드에서 받으실 수 있습니다.

