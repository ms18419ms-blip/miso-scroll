/* ==================================================================
   DOM 操作のサンプル
   基本の形:「〇〇されたら(反応する)→ 要素をつかんで → 書き換える」
   ================================================================== */

// ── サンプル1:ボタンが押されたら、下の文字を書き換える ─────────
let count = 0;                                            // 押された回数を覚えておく

// 反応する:#count-btn が「click」されたら、{ } の中を実行する
document.getElementById("count-btn").addEventListener("click", () => {
  count = count + 1;
  // つかんで → 書き換える:#message の中の文字(textContent)を変える
  document.getElementById("message").textContent = count + "回押されました";
});


// ── サンプル2:ボタンが押されたら、CSS(背景色)を書き換える ──────
document.getElementById("color-btn").addEventListener("click", () => {
  // つかんで → 書き換える:#color-card の style.backgroundColor を変える
  document.getElementById("color-card").style.backgroundColor = "#f6d9a8";
});


// ── サンプル3:何度も使う処理は function にまとめる ────────────
// 「#picked の文字を書き換える」処理に、showPicked という名前を付けておく
function showPicked(name) {
  document.getElementById("picked").textContent = name + " をえらびました";
}

// 3つのボタンに、同じ反応をつける。押されたら showPicked を呼ぶだけ
document.querySelectorAll(".pick-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    showPicked(btn.dataset.name);                          // data-name の値を渡す
  });
});
