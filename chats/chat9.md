# 문제 복사 요청

_Started 2026-07-01 07:18 UTC_

---

## User

21번~30번을 이 문제로 똑같이 그대로 채워줘. 문제의 내용을 수정하거나 변형을 하지마.

## Assistant

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: eval_js_user_view]_

The user is viewing problem #12 (선입선출법 vs 가중평균법). They want 21–30 to be exact duplicates of it. Let me read #12's full definition.

_[tool: read_file]_

Now let me check the `invExpBrief` object to see if #12 has an entry there that I should also duplicate.

_[tool: grep]_

Let me read #12's full `invExpBrief` entry and check `invExpMd`.

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

Let me check how `invData` count and labels are derived, to make sure appending 21–30 renders cleanly.

_[tool: grep]_

The nav label — let me confirm whether it comes from `id` or from index.

_[tool: read_file]_

Labels come from array index, so I'll append 10 exact copies of the #12 object (id kept as `"12"`, so its explanation resolves identically) right after #20. This is the most faithful duplication.

_[tool: run_script]_

The path has characters the script sandbox rejects. I'll use a direct string edit instead, anchoring on the end of #20 and inserting 10 copies of the #12 object.

_[tool: str_replace_edit]_

Now problems 21–30 exist as exact copies. Let me verify it renders — 30 problems in the worksheet.

_[tool: eval_js_user_view]_

The user's view hasn't reloaded yet. Let me open the updated file and verify.

_[tool: ready_for_verification]_

21~30번을 12번 문제(선입선출법 vs 가중평균법)의 내용 그대로 10개 복제해 워크시트 끝에 추가했습니다. 문제·보기·빈칸·풀이·해설 모두 원본과 동일하며, 총 문제 수는 30문제가 됩니다.

## User

21번~30번 문제가 다 똑같은데? 너 잘못했어.
21번~30번 문제 그대로 이거로 넣어줘.

## Assistant

I understand — the pasted content has the real problems 21–30. Let me study the exact data structure so I build them correctly.

_[tool: read_file]_

_[tool: read_file]_

Now let me look at the invExpMd structure to build the detailed markdown explanations.

_[tool: read_file]_

Let me check how the worksheet renders blanks/steps and how the tables in markdown are handled.

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

Now I understand the full structure. Let me read the exact current text of the duplicated block so I can replace it precisely.

_[tool: read_file]_

The dupes are identical, so I'll replace the whole run at once. Let me find #20's end (the unique anchor) and the array closer.

_[tool: grep]_

_[tool: grep]_

Now I'll replace all 10 identical dupes with the real problems 21–30 in one edit, anchored on #20's unique closing line.

_[tool: str_replace_edit]_

invData is fixed. Now I'll add explanation entries. Let me find where `invExpBrief` and `invExpMd` end.

_[tool: grep]_

_[tool: read_file]_

Now I'll add the invExpBrief entries for 21–30 (used for the answer chip).

_[tool: str_replace_edit]_

Now the detailed markdown explanations. Let me find the end of `invExpMd`.

_[tool: read_file]_

Now I'll append the 10 detailed markdown explanations.

_[tool: str_replace_edit]_

Let me verify the worksheet count is derived (not hardcoded to 20) and that it renders cleanly.

_[tool: grep]_

All counts derive from `invData.length`, so the nav and progress now show 30 automatically. Let me verify it renders cleanly and problem 21 displays correctly.

_[tool: eval_js]_

_[tool: show_html]_

_[tool: ready_for_verification]_

21~30번을 붙여주신 실제 문제로 교체했습니다. 각 문제는 자료·보기·정답·빈칸 풀이·상세 해설까지 원문 그대로 반영했고, 워크시트는 이제 30문제로 표시됩니다.

- 21 기초상품재고액 역산 (③)
- 22 총매입액 역산 (①)
- 23 매출액 역산 (②)
- 24 T계정 매출총이익 (③)
- 25 기말 외상매출금 (②)
- 26 매입채무 T계정 매출액 (②)
- 27 양쪽 T계정 매출총이익 (②)
- 28 당기 매출분 현금회수액 (④)
- 29 매입채무 현금지급액 (①)
- 30 재고자산 이론 (②)

