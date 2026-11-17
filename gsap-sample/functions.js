/* ==================================================================
   GSAP のサンプル
   基本の形:gsap.to("どれを", { どう変えるか, 何秒で })
   ボタンが押されたら(addEventListener)、GSAP で箱を動かす
   11〜16 は、ボタンではなくスクロールで動く(ScrollTrigger)
   ================================================================== */
gsap.registerPlugin(ScrollTrigger);   // スクロール連動を使うときに、最初に1回書く

// ── 1. gsap.to:今の状態 → 指定した状態へ ──
// いちばんよく使う形。今いる場所から、x: 300 の場所へ1秒かけて動く。
document.getElementById("btn-to").addEventListener("click", () => {
  gsap.set("#box-to", { x: 0 });                  // 最初の位置にもどす
  gsap.to("#box-to", { x: 300, duration: 1 });     // 右へ 300px、1秒で
});

// ── 2. gsap.from:指定した状態 → 今の状態へ ──
// to の逆。左の外(x: -300)で透明な状態から、今の場所へ現れる。
document.getElementById("btn-from").addEventListener("click", () => {
  gsap.from("#box-from", { x: -300, opacity: 0, duration: 1 });
});

// ── 3. gsap.fromTo:始まりと終わりを両方決める ──
// 1つめの { } が始まり、2つめの { } が終わり。小さい状態から、大きくなりながら右へ。
document.getElementById("btn-fromto").addEventListener("click", () => {
  gsap.fromTo("#box-fromto",
    { x: 0, scale: 0.3 },                         // 始まり
    { x: 300, scale: 1, duration: 1 });           // 終わり
});

// ── 4. gsap.set:時間をかけず、一瞬で ──
// duration がない。押した瞬間に x: 300 の場所へ移る。最初の位置にもどすときにも使う。
document.getElementById("btn-set").addEventListener("click", () => {
  gsap.set("#box-set", { x: 300 });                // 一瞬で右へ
});

// ── 5. ease:速さの変化を変える ──
// 同じ距離・同じ時間でも、ease で印象が変わる。none は一定、power2.out は最後にゆっくり、back.out は少し行き過ぎてもどる。
document.getElementById("btn-ease").addEventListener("click", () => {
  gsap.set(".small", { x: 0 });
  gsap.to("#box-ease1", { x: 300, duration: 1, ease: "none" });
  gsap.to("#box-ease2", { x: 300, duration: 1, ease: "power2.out" });
  gsap.to("#box-ease3", { x: 300, duration: 1, ease: "back.out(2)" });
});

// ── 6. 位置のほかに、動かせるもの ──
// 回転(rotation)、大きさ(scale)、色(backgroundColor)、角の丸み(borderRadius)も、同じ書き方で動かせる。
document.getElementById("btn-props").addEventListener("click", () => {
  gsap.set("#box-props", {                        // 最初の状態にもどす
    rotation: 0, scale: 1, backgroundColor: "#2b4a7a", borderRadius: 0 });
  gsap.to("#box-props", {
    rotation: 180,                 // 180度回す
    scale: 1.4,                    // 1.4倍にする
    backgroundColor: "#e0894f",    // 色を変える
    borderRadius: 40,              // 角を丸くする
    duration: 1.2
  });
});

// ── 7. repeat と yoyo:くり返す ──
// repeat は「最初の1回のあと、何回くり返すか」。yoyo: true にすると、くり返すたびに向きが逆になるので、行き・帰りで1回ずつ数える。repeat: 5 で、行き帰りが3往復。-1 にすると、ずっとくり返す。
document.getElementById("btn-repeat").addEventListener("click", () => {
  gsap.set("#box-repeat", { x: 0 });
  gsap.to("#box-repeat", { x: 300, duration: 0.5, repeat: 5, yoyo: true });   // 3往復
});

// ── 8. stagger:少しずつずらす ──
// 同じ class の箱をまとめて動かし、0.1秒ずつずらして順番に動かす。第5章の産地の点で使っている。
document.getElementById("btn-stagger").addEventListener("click", () => {
  gsap.fromTo(".dot",
    { y: 0 },
    { y: -40, duration: 0.3, stagger: 0.1, repeat: 1, yoyo: true });
});

// ── 9. timeline:動きを順番に並べる ──
// tl.to を書いた順に、1つ終わったら次が動く。第6章の蔵で使っている。
document.getElementById("btn-timeline").addEventListener("click", () => {
  gsap.set(".tl", { x: 0 });
  const tl = gsap.timeline();
  tl.to("#tl-1", { x: 300, duration: 0.5 });       // 1つめ
  tl.to("#tl-2", { x: 300, duration: 0.5 });       // 1つめが終わったら 2つめ
  tl.to("#tl-3", { x: 300, duration: 0.5 });       // 2つめが終わったら 3つめ
});

// ── 10. パスアニメーション:線を描く ──
// SVG の線(path)の長さを測り、「線とすき間」をずらして、描いているように見せる。第5章の地図のルートと同じしくみ。
document.getElementById("btn-path").addEventListener("click", () => {
  const path = document.getElementById("path");
  const len = path.getTotalLength();               // 線の長さを測る
  gsap.fromTo(path,
    { strokeDasharray: len, strokeDashoffset: len },  // 見えない状態から
    { strokeDashoffset: 0, duration: 2 });            // 全部見える状態へ
});


/* ==================================================================
   スクロールで動かす(ScrollTrigger)
   ================================================================== */

// ── 11. ScrollTrigger の基本:画面のある位置に来たら動かす ──
// trigger は「どの要素の位置を見るか」、start は「要素のどこ」と「画面のどこ」の2語。"top 80%" は「箱の上端が、画面の上から80%の線に来たら」。scrub がないので、線を越えた瞬間に1秒で最後まで動く。markers: true で、右に線が出る。
gsap.to("#box-st", {
  x: 300,
  duration: 1,
  scrollTrigger: {
    trigger: "#box-st",        // この箱の位置を見る
    start: "top 80%",          // 箱の上端が、画面の上から80%に来たら
    markers: true,             // 線を表示(確かめたら消す)
  },
});

// ── 12. scrub:スクロールに合わせて動かす ──
// scrub を付けると、スクロール量がそのまま動きの進み具合になる。戻すと戻る。上の箱は scrub: true(ぴったり)、下の箱は scrub: 1(1秒遅れてなめらかに追いつく)。end で終わりの位置も決める。第4章の樽と同じしくみ。
gsap.to("#box-scrub", {
  x: 300,
  ease: "none",                // スクロールと同じ割合で進める
  scrollTrigger: {
    trigger: "#box-scrub",
    start: "top 80%",          // 80%の線に来たら始まり
    end: "top 30%",            // 30%の線に来たら終わり
    scrub: true,               // ぴったり追いかける
    markers: true,
  },
});
gsap.to("#box-scrub2", {
  x: 300,
  ease: "none",
  scrollTrigger: {
    trigger: "#box-scrub",     // 上の箱と同じ位置を見る
    start: "top 80%",
    end: "top 30%",
    scrub: 1,                  // 1秒遅れて、なめらかに追いつく
  },
});

// ── 13. pin:画面に固定して、その間に動かす ──
// このカードが画面の上に来ると、カードが止まり(pin)、600px スクロールする間に箱が動く。動き終わると、またふつうにスクロールする。end: "+=600" は「始まりから 600px 先」。第4章・第6章と同じしくみ。
gsap.to("#box-pin", {
  x: 300,
  rotation: 360,
  ease: "none",
  scrollTrigger: {
    trigger: "#card-pin",      // このカード全体を
    start: "top top",          // 画面の上端に来たら
    end: "+=600",              // そこから 600px スクロールする間
    scrub: true,
    pin: true,                 // 画面に固定する
  },
});

// ── 14. コールバック:入った・出たで、処理を呼ぶ ──
// ScrollTrigger.create は、動きを付けずに「区間に入った・出た」だけを知らせる。下へ進んで入ると onEnter、下へ抜けると onLeave、上へ戻って入ると onEnterBack、上へ戻って出ると onLeaveBack。箱の中の文字と色が変わる。第5章の地図と同じしくみ。
const cbBox = document.getElementById("box-cb");
function showName(name, color) {   // 箱の文字と色を変える
  cbBox.textContent = name;
  gsap.to(cbBox, { backgroundColor: color });
}
ScrollTrigger.create({
  trigger: "#box-cb",
  start: "top 60%",            // 箱の上端が60%の線に来たら区間に入る
  end: "bottom 40%",           // 箱の下端が40%の線に来たら区間を出る
  onEnter:     () => showName("onEnter",     "#e0894f"),  // 下へ進んで入った
  onLeave:     () => showName("onLeave",     "#8c7851"),  // 下へ進んで出た
  onEnterBack: () => showName("onEnterBack", "#6aa84f"),  // 上へ戻って入った
  onLeaveBack: () => showName("onLeaveBack", "#2b4a7a"),  // 上へ戻って出た
});

// ── 15. once:一度だけ動かす ──
// once: true にすると、最初に区間に入ったときに1回だけ呼ばれ、そのあとは何もしない。上に戻ってもう一度来ても、動かない。ページの最後のお椀と同じしくみ。
ScrollTrigger.create({
  trigger: "#box-once",
  start: "top 70%",
  once: true,                  // 一度だけ
  onEnter: () => gsap.to("#box-once", { x: 300, rotation: 360, duration: 1 }),
});

// ── 16. timeline + ScrollTrigger:順番に並べた動きを、スクロールで進める ──
// timeline に scrollTrigger を付けると、並べた動き全体がスクロールで進む。カードを固定している間に、3つの箱が順番に動く。第6章の蔵と同じしくみ。
const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#card-tlst",
    start: "top top",
    end: "+=900",              // 900px スクロールする間に、全部が進む
    scrub: 1,
    pin: true,
  },
});
tl2.to("#tl2-1", { x: 300 });   // 1つめ
tl2.to("#tl2-2", { x: 300 });   // 1つめが終わったら 2つめ
tl2.to("#tl2-3", { x: 300 });   // 2つめが終わったら 3つめ
