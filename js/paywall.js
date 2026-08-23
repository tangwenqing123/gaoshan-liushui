/* ============================================================
   高山流水 · 付费墙组件（版本B：好奇悬念型）
   验证期：手动收款（加微信），信任制解锁
   ============================================================ */

const PAYWALL_CONFIG = {
  // 版本B：好奇悬念型文案
  title: "你灵魂里藏着的3个秘密",
  subtitle: "测出来了，但只给你看了一半\n另一半，可能改变你对自己的认知\n一次性解锁，全部看完",
  modules: [
    "你最吸引人的3个特质",
    "你自己都没发现的盲区",
    "人际/情感/职场建议",
    "如何突破当前困境"
  ],
  price: "1.9",
  originalPrice: "9.9",
  trustText: "一杯奶茶钱，读懂自己一生",
  buttonText: "看看另一半的自己",
  altText: "或 邀请好友一起测，免费解锁完整报告",
  // 收款配置（验证期手动收款）
  wechatId: "15371031550",
  wechatName: "释怀鸟"
};

const PAYWALL_STORAGE_KEY = "gsls_unlocked";

/** 检查是否已解锁 */
function isUnlocked() {
  try {
    return localStorage.getItem(PAYWALL_STORAGE_KEY) === "1";
  } catch (e) {
    return false;
  }
}

/** 标记为已解锁 */
function setUnlocked() {
  try {
    localStorage.setItem(PAYWALL_STORAGE_KEY, "1");
  } catch (e) { /* 忽略 */ }
}

/**
 * 渲染付费墙
 * @param {HTMLElement} container - 容器元素
 * @param {Function} onUnlock - 解锁成功回调
 */
function renderPaywall(container, onUnlock) {
  if (!container) return;
  if (isUnlocked()) {
    if (onUnlock) onUnlock();
    return;
  }

  const cfg = PAYWALL_CONFIG;
  container.innerHTML =
    '<div class="paywall paywall-version-b">' +
      '<div class="pw-lock">🔮</div>' +
      '<div class="pw-title">' + cfg.title + '</div>' +
      '<div class="pw-subtitle">' + cfg.subtitle.replace(/\n/g, "<br>") + '</div>' +
      '<div class="pw-modules">' +
        cfg.modules.map(function(m) {
          return '<span class="pw-module">' + m + '</span>';
        }).join("") +
      '</div>' +
      '<div class="pw-price-row">' +
        '<span class="pw-price"><span class="pw-currency">¥</span>' + cfg.price + '</span>' +
        '<span class="pw-original">¥' + cfg.originalPrice + '</span>' +
      '</div>' +
      '<div class="pw-trust">' + cfg.trustText + '</div>' +
      '<button class="pw-btn" id="pw-unlock-btn">' + cfg.buttonText + '</button>' +
      '<div class="pw-alt"><a href="javascript:void(0)" id="pw-share-link">邀请好友一起测</a>，免费解锁完整报告</div>' +
    '</div>';

  // 绑定付费按钮
  const btn = document.getElementById("pw-unlock-btn");
  if (btn) {
    btn.addEventListener("click", function() {
      showPaymentModal(onUnlock);
    });
  }

  // 绑定分享链接
  const shareLink = document.getElementById("pw-share-link");
  if (shareLink) {
    shareLink.addEventListener("click", function() {
      showShareModal(onUnlock);
    });
  }
}

/** 显示付款模态框（验证期：手动收款） */
function showPaymentModal(onUnlock) {
  const cfg = PAYWALL_CONFIG;
  const modal = document.createElement("div");
  modal.className = "modal paywall-modal open";
  modal.innerHTML =
    '<div class="modal-inner paywall-modal-inner">' +
      '<button class="paywall-modal-close" id="pw-modal-close">×</button>' +
      '<div class="paywall-modal-title">🔓 解锁完整报告</div>' +
      '<div class="paywall-modal-price">¥' + cfg.price + ' <span>（原价¥' + cfg.originalPrice + '）</span></div>' +
      '<div class="paywall-modal-step">' +
        '<div class="paywall-step-num">1</div>' +
        '<div class="paywall-step-text">添加微信 <b>' + cfg.wechatId + '</b>（或搜索：' + cfg.wechatName + '）</div>' +
      '</div>' +
      '<div class="paywall-modal-step">' +
        '<div class="paywall-step-num">2</div>' +
        '<div class="paywall-step-text">转账 ¥' + cfg.price + '，备注「知音解锁」</div>' +
      '</div>' +
      '<div class="paywall-modal-step">' +
        '<div class="paywall-step-num">3</div>' +
        '<div class="paywall-step-text">点击下方按钮，立即解锁（信任制，稍后会通过好友确认）</div>' +
      '</div>' +
      '<button class="paywall-modal-btn" id="pw-confirm-unlock">我已付款，立即解锁</button>' +
      '<div class="paywall-modal-note">💡 验证期手动收款，如有问题请微信联系</div>' +
    '</div>';
  document.body.appendChild(modal);

  // 关闭
  document.getElementById("pw-modal-close").addEventListener("click", function() {
    modal.remove();
  });
  modal.addEventListener("click", function(e) {
    if (e.target === modal) modal.remove();
  });

  // 确认解锁
  document.getElementById("pw-confirm-unlock").addEventListener("click", function() {
    setUnlocked();
    modal.remove();
    if (onUnlock) onUnlock();
    // 埋点
    try { localStorage.setItem("gsls_pay_confirm", String((parseInt(localStorage.getItem("gsls_pay_confirm") || "0") + 1))); } catch(e) {}
  });
}

/** 显示分享模态框 */
function showShareModal(onUnlock) {
  const modal = document.createElement("div");
  modal.className = "modal paywall-modal open";
  modal.innerHTML =
    '<div class="modal-inner paywall-modal-inner">' +
      '<button class="paywall-modal-close" id="pw-share-close">×</button>' +
      '<div class="paywall-modal-title">📤 分享解锁</div>' +
      '<div class="paywall-modal-desc">将测试结果分享到朋友圈或微信群，截图后点击下方按钮即可解锁完整报告。</div>' +
      '<div class="paywall-share-tip">' +
        '💡 分享文案参考：<br>' +
        '"我在「高山流水」测出了我的灵魂知音，超准！你也来测测？"' +
      '</div>' +
      '<button class="paywall-modal-btn" id="pw-share-confirm">我已分享，立即解锁</button>' +
      '<div class="paywall-modal-note">💡 验证期信任制，分享后点击即可解锁</div>' +
    '</div>';
  document.body.appendChild(modal);

  document.getElementById("pw-share-close").addEventListener("click", function() {
    modal.remove();
  });
  modal.addEventListener("click", function(e) {
    if (e.target === modal) modal.remove();
  });

  document.getElementById("pw-share-confirm").addEventListener("click", function() {
    setUnlocked();
    modal.remove();
    if (onUnlock) onUnlock();
    try { localStorage.setItem("gsls_share_unlock", String((parseInt(localStorage.getItem("gsls_share_unlock") || "0") + 1))); } catch(e) {}
  });
}

if (typeof module !== "undefined") {
  module.exports = { PAYWALL_CONFIG, isUnlocked, setUnlocked, renderPaywall, showPaymentModal, showShareModal };
}