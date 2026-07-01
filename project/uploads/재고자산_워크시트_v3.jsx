import { useState, useEffect, useRef } from "react";

const DATA = [
  {
    id:"01", sub:"계속기록법 + 개별법", src:"13년 국가직 9급",
    q:"(주)한국의 2012년도 거래는 다음과 같다. 계속기록법을 적용하였을 경우 매출원가는? (단, 개별법을 적용한다.)",
    data:["1월 1일 전기 이월된 상품은 ₩3,000이다.","2월 9일 (주)대한으로부터 상품을 현금으로 구입하였는데, 매입대금 ₩8,000에는 매입운임 ₩1,000이 포함되어 있지 않다.","3월 8일 기초상품을 (주)민국에 현금으로 ₩4,000에 판매하였다.","7월 9일 (주)대한으로부터 구입한 상품 중 절반을 (주)민국에 외상으로 ₩5,000에 판매하였다."],
    choices:["① ₩7,500","② ₩7,000","③ ₩4,500","④ ₩4,000"], ans:"① ₩7,500",
    b:{ A:[["₩3,000","₩4,000","₩5,000"],0], B:[["₩7,000","₩8,000","₩9,000"],1], C:[["₩0","₩1,000","₩2,000"],1], D:[["₩8,000","₩9,000","₩10,000"],1], E:[["25%","50%","100%"],1], F:[["₩4,000","₩4,500","₩5,000"],1], G:[["₩7,000","₩7,500","₩8,000"],1] },
    s:[ ["3월 8일 매출원가",["매출원가 = {A}"]], ["7월 9일 매출원가",["매입원가 = {B} + {C} = {D}","매출원가 = {D} × {E} = {F}"]], ["총 매출원가",["총 매출원가 = {A} + {F} = {G}"]] ]
  },
  {
    id:"02", sub:"선입선출법", src:"23년 국가직 9급",
    q:"다음은 (주)한국의 20×1년 상품과 관련된 자료이다. (주)한국이 선입선출법을 적용할 경우, 20×1년 기말재고자산 금액은? (단, 재고자산에 대한 감모 및 평가손실은 발생하지 않았다.)",
    data:["기초상품재고액은 ₩5,000(개당 취득원가 ₩500)이다.","기중에 상품 100개(개당 매입가격 ₩500)를 매입하였으며, 매입운임으로 개당 ₩50이 지출되었다.","기중에 매입한 상품 중 하자가 있어 개당 ₩50의 할인(매입에누리)을 받았다.","기중에 상품 50개를 판매하였다."],
    choices:["① ₩25,000","② ₩30,000","③ ₩35,000","④ ₩40,000"], ans:"② ₩30,000",
    b:{ A:[["₩450","₩500","₩550"],1], B:[["₩0","₩50","₩100"],1], C:[["₩0","₩50","₩100"],1], D:[["₩450","₩500","₩550"],1], E:[["10개","50개","100개"],0], F:[["50개","100개","110개"],1], G:[["10개","50개","60개"],1], H:[["50개","60개","110개"],1], I:[["₩25,000","₩30,000","₩33,000"],1] },
    s:[ ["단위당 원가",["단위당 원가 = {A} + {B} − {C} = {D}"]], ["기말재고수량",["기말재고수량 = {E} + {F} − {G} = {H}"]], ["기말재고금액",["기말재고금액 = {H} × {D} = {I}"]] ]
  },
  {
    id:"03", sub:"선입선출법", src:"14년 국가직 7급",
    q:"다음은 (주)한국의 재고자산과 관련된 자료이다. 선입선출법으로 평가할 경우 매출총이익은? (단, 재고자산과 관련된 감모손실이나 평가손실 등 다른 원가는 없다.)",
    data:["10/1 기초재고 10개 × ₩100","10/8 매입 30개 × ₩110","10/15 매출 25개 × ₩140","10/30 매입 15개 × ₩120"],
    choices:["① ₩850","② ₩950","③ ₩1,050","④ ₩1,150"], ans:"① ₩850",
    b:{ A:[["10개","25개","30개"],1], B:[["₩110","₩120","₩140"],2], C:[["₩2,750","₩3,500","₩3,600"],1], D:[["10","15","25"],0], E:[["₩100","₩110","₩140"],0], F:[["₩1,000","₩1,100","₩1,500"],0], G:[["10","15","25"],1], H:[["₩100","₩110","₩120"],1], I:[["₩1,100","₩1,650","₩1,800"],1], J:[["₩2,500","₩2,650","₩2,750"],1], K:[["₩850","₩950","₩1,050"],0] },
    s:[ ["매출액",["매출액 = {A} × {B} = {C}"]], ["매출원가 (선입선출법)",["1순위 : 기초재고 {D}개 × {E} = {F}","2순위 : 10/8분 {G}개 × {H} = {I}","매출원가 = {F} + {I} = {J}"]], ["매출총이익",["매출총이익 = {C} − {J} = {K}"]] ]
  },
  {
    id:"04", sub:"실사법 + 선입선출법", src:"10년 국가직 9급",
    q:"(주)갑의 10월 한달 간의 상품매입과 매출에 관한 자료는 아래와 같다. 회사는 실사법에 의해 기말재고수량을 파악하고, 원가흐름에 대한 가정으로 선입선출법을 적용한다. 10월 31일 현재 실사결과 상품재고수량은 100개로 파악되었다. (주)갑의 10월 31일 현재 상품재고액은?",
    data:["10/1 전월이월 100개 × ₩1,000 = ₩100,000","10/10 매입 300개 × ₩1,200 = ₩360,000","10/11 매입에누리(10/10 매입) ₩30,000","10/20 매출 350개 × ₩2,000 = ₩700,000","10/25 매입 50개 × ₩1,300 = ₩65,000"],
    choices:["① ₩65,000","② ₩75,000","③ ₩120,000","④ ₩125,000"], ans:"③ ₩120,000",
    b:{ A:[["₩330,000","₩360,000","₩390,000"],1], B:[["₩0","₩30,000","₩60,000"],1], C:[["₩300,000","₩330,000","₩360,000"],1], D:[["100개","200개","300개"],2], E:[["₩1,000","₩1,100","₩1,200"],1], F:[["50","100","300"],0], G:[["₩1,100","₩1,200","₩1,300"],2], H:[["₩55,000","₩60,000","₩65,000"],2], I:[["50","100","250"],0], J:[["₩55,000","₩60,000","₩120,000"],0], K:[["₩115,000","₩120,000","₩125,000"],1] },
    s:[ ["10/10 매입단가 수정",["수정 매입금액 = {A} − {B} = {C}","수정 단가 = {C} ÷ {D} = {E}"]], ["기말재고 구성 (최근분부터 역순)",["10/25분 : {F}개 × {G} = {H}","10/10분(잔여) : {I}개 × {E} = {J}","기말재고 = {H} + {J} = {K}"]] ]
  },
  {
    id:"05", sub:"계속기록법 + 선입선출법", src:"22년 국가직 9급",
    q:"다음은 (주)한국의 20×1년 상품 매입 및 매출 관련 자료이다. 선입선출법을 적용할 경우, 20×1년도 기말재고자산과 매출총이익을 바르게 연결한 것은? (단, 재고자산 감모 및 평가손실은 발생하지 않았으며, 재고자산 수량결정은 계속기록법에 의한다.)",
    data:["1/1 기초재고 20개 × ₩150","5/1 매입 30개 × ₩200","7/1 매출 25개 × ₩300","9/1 매입 20개 × ₩180","11/1 매출 25개 × ₩320"],
    choices:["① 기말재고 ₩3,000 / 매출총이익 ₩5,900","② 기말재고 ₩3,000 / 매출총이익 ₩6,500","③ 기말재고 ₩3,600 / 매출총이익 ₩5,900","④ 기말재고 ₩3,600 / 매출총이익 ₩6,500"], ans:"④",
    b:{ A:[["15","20","25"],1], B:[["₩150","₩200","₩300"],0], C:[["₩3,000","₩4,000","₩5,000"],0], D:[["5","10","25"],0], E:[["₩150","₩180","₩200"],2], F:[["₩750","₩1,000","₩2,000"],1], G:[["₩3,750","₩4,000","₩5,000"],1], H:[["5","20","25"],2], I:[["₩180","₩200","₩320"],1], J:[["₩3,600","₩5,000","₩8,000"],1], K:[["15","20","25"],1], L:[["₩150","₩180","₩200"],1], M:[["₩3,000","₩3,600","₩4,000"],1], N:[["20","25","50"],1], O:[["₩150","₩300","₩320"],1], P:[["20","25","30"],1], Q:[["₩300","₩320","₩500"],1], R:[["₩15,100","₩15,500","₩16,000"],1], S:[["₩8,000","₩9,000","₩10,000"],1], T:[["₩5,900","₩6,500","₩7,500"],1] },
    s:[ ["7/1 매출원가",["1순위 : 기초재고 {A}개 × {B} = {C}","2순위 : 5/1분 {D}개 × {E} = {F}","7/1 매출원가 = {C} + {F} = {G}"]], ["11/1 매출원가",["1순위 : 5/1 잔여 {H}개 × {I} = {J}"]], ["기말재고",["기말재고 = {K}개 × {L} = {M}"]], ["매출총이익",["매출액 = {N}×{O} + {P}×{Q} = {R}","총매출원가 = {G} + {J} = {S}","매출총이익 = {R} − {S} = {T}"]] ]
  },
  {
    id:"06", sub:"선입선출법 vs 총평균법", src:"11년 지방직 9급",
    q:"다음은 (주)대한의 2010년 3월의 재고자산 입고 및 출고에 관한 자료이다. 선입선출법을 적용하는 경우와 총평균법을 적용하는 경우, (주)대한의 2010년 3월 31일 현재 재고자산금액은?",
    data:["3/1 월초재고 20개 × ₩100","3/7 매입 20개 × ₩100","3/11 매출 20개 × ₩150","3/14 매입 20개 × ₩130","3/27 매출 20개 × ₩200","3/31 월말재고 20개"],
    choices:["① FIFO ₩2,200 / 총평균 ₩2,200","② FIFO ₩2,200 / 총평균 ₩2,600","③ FIFO ₩2,600 / 총평균 ₩2,200","④ FIFO ₩2,600 / 총평균 ₩2,600"], ans:"③",
    b:{ A:[["10","20","40"],1], B:[["₩100","₩110","₩130"],2], C:[["₩2,000","₩2,200","₩2,600"],2], D:[["₩2,000","₩2,600","₩4,000"],0], E:[["₩2,000","₩2,600","₩4,000"],0], F:[["₩2,000","₩2,600","₩4,000"],1], G:[["20","40","60"],2], H:[["₩100","₩110","₩130"],1], I:[["10","20","40"],1], J:[["₩2,000","₩2,200","₩2,600"],1] },
    s:[ ["선입선출법",["기말재고 = {A}개 × {B} = {C}"]], ["총평균법",["총평균단가 = ({D}+{E}+{F}) ÷ {G}개 = {H}","기말재고 = {I}개 × {H} = {J}"]] ]
  },
  {
    id:"07", sub:"실지재고조사법 + 총평균법", src:"13년 지방직 9급",
    q:"다음은 (주)한국의 2013년 1월의 재고자산 입고 및 판매와 관련된 자료이다. 실지재고조사법을 사용하고 평균법을 적용할 경우 기말재고액과 매출원가는?",
    data:["1.1 입고 1,000개 × ₩11","1.5 입고 1,000개 × ₩13","1.10 입고 1,000개 × ₩15","1.15 판매 2,500개","1.25 입고 1,000개 × ₩17"],
    choices:["① 기말재고 ₩21,000 / 매출원가 ₩31,500","② 기말재고 ₩21,000 / 매출원가 ₩35,000","③ 기말재고 ₩24,500 / 매출원가 ₩31,500","④ 기말재고 ₩24,500 / 매출원가 ₩35,000"], ans:"②",
    b:{ A:[["₩10,000","₩11,000","₩13,000"],1], B:[["₩11,000","₩13,000","₩15,000"],1], C:[["₩13,000","₩15,000","₩17,000"],1], D:[["₩15,000","₩17,000","₩19,000"],1], E:[["3,000","4,000","4,500"],1], F:[["₩13","₩14","₩15"],1], G:[["1,500","2,500","3,000"],1], H:[["500","1,000","1,500"],2], I:[["₩14,000","₩21,000","₩24,500"],1], J:[["₩31,500","₩35,000","₩37,500"],1] },
    s:[ ["총평균단가",["총평균단가 = ({A}+{B}+{C}+{D}) ÷ {E}개 = {F}"]], ["기말재고",["기말재고수량 = {E} − {G} = {H}","기말재고액 = {H}개 × {F} = {I}"]], ["매출원가",["매출원가 = {G}개 × {F} = {J}"]] ]
  },
  {
    id:"08", sub:"계속기록법 + 이동평균법", src:"15년 지방직 9급",
    q:"다음은 (주)한국의 2015년 1월의 상품매매에 관한 기록이다. 계속기록법에 의한 이동평균법으로 상품거래를 기록할 경우 2015년 1월의 매출총이익은?",
    data:["1/1 전기이월 150개 × ₩100","1/15 현금매입 50개 × ₩140","1/20 현금매출 100개 × ₩150","1/25 현금매입 100개 × ₩150","1/28 현금매출 100개 × ₩160"],
    choices:["① ₩2,000","② ₩4,000","③ ₩7,000","④ ₩9,000"], ans:"③ ₩7,000",
    b:{ A:[["₩7,000","₩15,000","₩22,000"],1], B:[["₩5,000","₩7,000","₩15,000"],1], C:[["50","100","150"],2], D:[["50","100","150"],0], E:[["₩100","₩110","₩120"],1], F:[["50","100","150"],1], G:[["₩10,000","₩11,000","₩15,000"],1], H:[["₩7,000","₩11,000","₩15,000"],1], I:[["₩11,000","₩15,000","₩22,000"],1], J:[["50","100","200"],1], K:[["50","100","150"],1], L:[["₩120","₩125","₩130"],2], M:[["50","100","200"],1], N:[["₩12,000","₩13,000","₩15,000"],1], O:[["₩15,000","₩16,000","₩31,000"],0], P:[["₩15,000","₩16,000","₩31,000"],1], Q:[["₩31,000","₩24,000","₩22,000"],0], R:[["₩2,000","₩7,000","₩9,000"],1] },
    s:[ ["1/15 매입 후 이동평균단가",["= ({A} + {B}) ÷ ({C} + {D}) = {E}"]], ["1/20 매출원가",["매출원가① = {F}개 × {E} = {G}"]], ["1/25 매입 후 이동평균단가",["= ({H} + {I}) ÷ ({J} + {K}) = {L}"]], ["1/28 매출원가",["매출원가② = {M}개 × {L} = {N}"]], ["매출총이익",["매출액 = {O} + {P} = {Q}","매출총이익 = {Q} − ({G}+{N}) = {R}"]] ]
  },
  {
    id:"09", sub:"선입선출법 vs 이동평균법", src:"20년 서울시 7급",
    q:"다음은 (주)서울의 재고자산과 관련된 자료이다. 재고자산에 대한 원가흐름의 가정으로 선입선출법을 적용하는 경우 평균법을 적용하는 경우 대비 매출원가의 감소액은? (단, 재고자산과 관련된 감모손실이나 평가손실 등 다른 원가는 없으며, (주)서울은 재고자산 매매거래에 대해 계속기록법을 적용한다.)",
    data:["1/1 기초재고 100개 × ₩10","5/8 매입 50개 × ₩13","8/23 매출 80개","11/15 매입 30개 × ₩14"],
    choices:["① ₩80","② ₩120","③ ₩200","④ ₩240"], ans:"① ₩80",
    b:{ A:[["50","80","100"],1], B:[["₩10","₩11","₩13"],0], C:[["₩800","₩880","₩1,040"],0], D:[["₩650","₩1,000","₩1,400"],1], E:[["₩500","₩650","₩1,000"],1], F:[["50","80","100"],2], G:[["30","50","100"],1], H:[["₩10","₩11","₩12"],1], I:[["50","80","100"],1], J:[["₩800","₩880","₩960"],1], K:[["₩40","₩80","₩120"],1] },
    s:[ ["선입선출법 매출원가",["매출원가 = {A}개 × {B} = {C}"]], ["이동평균법",["5/8 이동평균단가 = ({D}+{E}) ÷ ({F}+{G}) = {H}","매출원가 = {I}개 × {H} = {J}"]], ["감소액",["감소액 = {J} − {C} = {K}"]] ]
  },
  {
    id:"10", sub:"총평균법 vs 이동평균법", src:"16년 국가직 7급",
    q:"(주)한국은 재고자산에 대해 가중평균법을 적용하고 있으며, 2016년 상품거래 내역은 다음과 같다. 상품거래와 관련하여 실지재고조사법과 계속기록법을 각각 적용할 경우, 2016년도 매출원가는? (단, 상품과 관련된 감모손실과 평가손실은 발생하지 않았다.)",
    data:["1/1 기초재고 100개 × ₩8 = ₩800","3/4 매입 300개 × ₩9 = ₩2,700","6/20 매출 200개","9/25 매입 100개 × ₩10 = ₩1,000","12/31 기말재고 300개"],
    choices:["① 실사 ₩1,800 / 계속 ₩1,700","② 실사 ₩1,750 / 계속 ₩1,700","③ 실사 ₩1,700 / 계속 ₩1,750","④ 실사 ₩1,800 / 계속 ₩1,750"], ans:"④",
    b:{ A:[["₩800","₩1,000","₩2,700"],0], B:[["₩800","₩2,700","₩3,500"],1], C:[["₩1,000","₩2,700","₩3,500"],0], D:[["400","500","600"],1], E:[["₩8.75","₩9","₩9.50"],1], F:[["100","200","300"],1], G:[["₩1,750","₩1,800","₩2,700"],1], H:[["₩800","₩1,000","₩2,700"],0], I:[["₩1,000","₩2,700","₩3,500"],1], J:[["100","200","300"],0], K:[["100","200","300"],2], L:[["₩8.75","₩9","₩9.50"],0], M:[["100","200","300"],1], N:[["₩1,750","₩1,800","₩2,700"],0] },
    s:[ ["실지재고조사법 (총평균법)",["총평균단가 = ({A}+{B}+{C}) ÷ {D}개 = {E}","매출원가 = {F}개 × {E} = {G}"]], ["계속기록법 (이동평균법)",["3/4 이동평균단가 = ({H}+{I}) ÷ ({J}+{K})개 = {L}","매출원가 = {M}개 × {L} = {N}"]] ]
  },
];

function Blank({ id, opts, correct, val, onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const answered = val !== null;
  const isRight = answered && val === correct;
  const isWrong = answered && val !== correct;

  let style = "border-gray-300 bg-white text-gray-500";
  if (isRight) style = "border-green-200 bg-green-50/40 text-green-700/70";
  if (isWrong) style = "border-red-200 bg-red-50/40 text-red-500/80";

  const handleBlankClick = (e) => {
    e.stopPropagation();
    if (isRight) return;
    setOpen(!open);
  };

  const handleOptionClick = (e, i) => {
    e.stopPropagation();
    onPick(id, i);
    setOpen(false);
  };

  return (
    <span className="relative inline-block align-middle" ref={ref}>
      <button
        onClick={handleBlankClick}
        className={`px-2 py-0.5 rounded-md border border-dashed text-xs font-bold min-w-[56px] text-center transition-all select-none ${style} ${isRight ? "cursor-default" : "cursor-pointer hover:border-gray-400"}`}
      >
        {answered ? opts[val] : "▾ ___"}
        {isRight && <span className="ml-0.5 text-[10px] opacity-40">✓</span>}
      </button>
      {isWrong && (
        <button
          onClick={handleBlankClick}
          className="ml-1 text-[10px] font-medium text-green-600/50 px-1 py-0.5 rounded cursor-pointer hover:text-green-600/70"
        >
          {opts[correct]}
        </button>
      )}
      {open && (
        <div
          className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-xl border border-gray-200 p-1 flex gap-1"
          style={{ minWidth: "max-content" }}
        >
          {opts.map((o, i) => (
            <button
              key={i}
              onClick={(e) => handleOptionClick(e, i)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all font-medium whitespace-nowrap ${
                val === i ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

function Formula({ text, blanks, sel, onPick }) {
  const parts = text.split(/(\{[A-T]\})/);
  return (
    <div className="py-1.5 flex flex-wrap items-center gap-0.5 leading-8">
      {parts.map((p, i) => {
        const m = p.match(/^\{([A-T])\}$/);
        if (m) {
          const k = m[1];
          const d = blanks[k];
          if (!d) return <span key={i}>{p}</span>;
          return <Blank key={`${k}-${i}`} id={k} opts={d[0]} correct={d[1]} val={sel[k] ?? null} onPick={onPick} />;
        }
        return <span key={i} className="text-sm text-gray-800 whitespace-pre">{p}</span>;
      })}
    </div>
  );
}

export default function App() {
  const [pi, setPi] = useState(0);
  const [sels, setSels] = useState(() => DATA.map(() => ({})));

  const prob = DATA[pi];
  const sel = sels[pi];
  const bkeys = Object.keys(prob.b);
  const total = bkeys.length;
  const filled = bkeys.filter(k => sel[k] !== undefined).length;
  const corrCnt = bkeys.filter(k => sel[k] === prob.b[k][1]).length;
  const allCorrect = corrCnt === total && filled === total;

  const pick = (id, v) => {
    setSels(p => { const n = [...p]; n[pi] = { ...n[pi], [id]: v }; return n; });
  };
  const reset = () => {
    setSels(p => { const n = [...p]; n[pi] = {}; return n; });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-sm font-extrabold text-gray-900 tracking-tight">📦 재고자산 블록형 워크시트</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 pt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {DATA.map((p, i) => {
            const ks = Object.keys(p.b);
            const c = ks.filter(k => sels[i][k] === p.b[k][1]).length;
            const done = c === ks.length;
            const attempted = ks.some(k => sels[i][k] !== undefined);
            return (
              <button key={i} onClick={() => setPi(i)}
                className={`flex-shrink-0 w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  pi === i ? "bg-gray-800 text-white shadow"
                  : done ? "bg-gray-100 text-gray-500 border border-gray-200"
                  : attempted ? "bg-gray-50 text-gray-500 border border-gray-200"
                  : "bg-white text-gray-300 border border-gray-100 hover:border-gray-200"
                }`}
              >{String(i+1).padStart(2,"0")}</button>
            );
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 pb-20">

        <div className="mt-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">{prob.sub}</span>
              <span className="text-[10px] text-gray-300">{prob.src}</span>
            </div>
            <p className="text-[13px] font-bold text-gray-900 leading-5">{prob.q}</p>
            <div className="mt-3 space-y-1">
              {prob.data.map((d, i) => (
                <p key={i} className="text-[12px] text-gray-700 leading-4 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-300">{d}</p>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {prob.choices.map((c, i) => (
                <span key={i} className="text-[12px] text-gray-500">{c}</span>
              ))}
            </div>
          </div>

          <div className="mx-4 border-t border-gray-100" />

          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full h-1 overflow-hidden">
              <div className="h-1 rounded-full transition-all duration-500 bg-gray-300"
                style={{ width: `${total > 0 ? (corrCnt / total) * 100 : 0}%` }} />
            </div>
            <span className="text-[10px] font-bold text-gray-400">
              {filled === 0 ? `${total}칸` : `${corrCnt}/${total}`}
            </span>
          </div>

          <div className="px-4 pb-4 space-y-3">
            {prob.s.map(([title, formulas], si) => (
              <div key={si}>
                <div className="text-[11px] font-bold text-gray-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
                  {title}
                </div>
                <div className="bg-gray-50/70 rounded-lg px-3 py-1 border border-gray-100">
                  {formulas.map((f, fi) => (
                    <Formula key={fi} text={f} blanks={prob.b} sel={sel} onPick={pick} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          {allCorrect ? (
            <div className="flex-1 py-2.5 rounded-xl text-sm text-center bg-gray-50 text-gray-500 border border-gray-200">
              🎉 완벽! <span className="text-xs text-gray-400 ml-1">정답 {prob.ans}</span>
            </div>
          ) : filled === total ? (
            <div className="flex-1 py-2.5 rounded-xl text-sm text-center bg-gray-50 text-gray-500 border border-gray-200">
              {corrCnt}/{total} 정답 <span className="text-xs text-gray-400 ml-1">{prob.ans}</span>
            </div>
          ) : (
            <div className="flex-1 py-2.5 rounded-xl text-xs text-center bg-gray-50 text-gray-300 border border-gray-100">
              빈칸을 채워보세요
            </div>
          )}
          <button onClick={reset}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-300 hover:text-gray-500 transition-all text-sm"
          >↺</button>
        </div>

        <div className="mt-2 flex gap-2">
          {pi > 0 && (
            <button onClick={() => setPi(pi-1)} className="flex-1 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
              ← 이전
            </button>
          )}
          {pi < DATA.length - 1 && (
            <button onClick={() => setPi(pi+1)} className="flex-1 py-2 rounded-lg bg-gray-800 text-xs font-bold text-white hover:bg-gray-700 transition-all">
              다음 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
