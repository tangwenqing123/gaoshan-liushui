/* ============================================================
   高山流水 · 结果页渲染（6模块 + 六维雷达图 + 付费墙）
   ============================================================ */

/** 渲染结果页 */
function renderResult(persona, picks, dims) {
  // ===== 模块①：知音画像（免费） =====
  const card = document.getElementById("p-card");
  card.style.setProperty("--c1", persona.colors[0]);
  card.style.setProperty("--c2", persona.colors[1]);
  card.classList.toggle("hidden", !!persona.hidden);

  const emoji = document.getElementById("p-emoji");
  emoji.style.background = "linear-gradient(135deg, " + persona.colors[0] + ", " + persona.colors[1] + ")";
  document.getElementById("p-emoji").textContent = persona.emoji;
  document.getElementById("p-name").textContent = persona.name;
  document.getElementById("p-title").textContent = persona.title;
  document.getElementById("p-allusion").textContent = persona.allusion;
  document.getElementById("p-quote").textContent = "「" + persona.quote + "」";

  const descBox = document.getElementById("p-desc");
  descBox.innerHTML = "";
  persona.desc.forEach((t, i) => {
    const p = document.createElement("p");
    p.textContent = t;
    p.style.animationDelay = (0.55 + i * 0.12) + "s";
    descBox.appendChild(p);
  });
  const chips = document.createElement("div");
  chips.className = "chips";
  persona.strengths.forEach(s => {
    const c = document.createElement("span");
    c.className = "chip";
    c.textContent = s;
    chips.appendChild(c);
  });
  descBox.appendChild(chips);

  const advice = document.getElementById("p-advice");
  advice.innerHTML = "<b>知音寄语</b><br/>" + persona.advice;

  // ===== 模块②：六维命格（免费） =====
  renderDimensions(dims, persona);

  // ===== 付费墙 + 付费内容 =====
  renderPaywallAndContent(persona, dims);

  // ===== 用户的选择痕迹 =====
  const picksBox = document.getElementById("p-picks");
  picksBox.innerHTML = "";
  if (picks && picks.length) {
    const h = document.createElement("h4");
    h.textContent = "你选择的金句";
    picksBox.appendChild(h);
    picks.forEach(q => {
      const div = document.createElement("div");
      div.className = "pick-item";
      div.textContent = "「" + q.text + "」——" + q.author;
      picksBox.appendChild(div);
    });
  }
}

/** 渲染六维命格模块 */
function renderDimensions(dims, persona) {
  if (!dims) {
    dims = { "才情": 50, "旷达": 50, "深情": 50, "孤高": 50, "谋略": 50, "通透": 50 };
  }
  // 绘制雷达图
  const canvas = document.getElementById("radar-canvas");
  if (canvas && typeof drawRadar === "function") {
    setTimeout(() => {
      drawRadar(canvas, dims, { c1: persona.colors[0], c2: persona.colors[1] });
    }, 100);
  }
  // 维度解读
  const insightsBox = document.getElementById("dim-insights");
  if (insightsBox && typeof getDimensionInsights === "function") {
    const insights = getDimensionInsights(dims);
    insightsBox.innerHTML = "";
    insights.forEach(item => {
      const div = document.createElement("div");
      div.className = "dim-insight-item";
      div.innerHTML =
        '<span class="dim-icon">' + item.icon + '</span>' +
        '<div>' +
          '<span class="dim-name">' + item.name + '</span>' +
          '<span class="dim-score">' + item.score + '分</span>' +
          '<div class="dim-desc">' + item.desc + '</div>' +
        '</div>';
      insightsBox.appendChild(div);
    });
  }
}

/** 渲染付费墙和付费内容 */
function renderPaywallAndContent(persona, dims) {
  const container = document.getElementById("paywall-container");
  const paidSections = document.querySelectorAll(".paid-content");

  const unlock = function() {
    paidSections.forEach(s => s.classList.add("unlocked"));
    if (container) container.innerHTML = "";
    renderPaidContent(persona, dims);
  };

  if (typeof isUnlocked === "function" && isUnlocked()) {
    unlock();
  } else if (container && typeof renderPaywall === "function") {
    renderPaywall(container, unlock);
  }
}

/** 渲染付费内容（模块③④⑤⑥） */
function renderPaidContent(persona, dims) {
  // 模块③：性格优势
  const strengthsBox = document.getElementById("strengths-content");
  if (strengthsBox) {
    strengthsBox.innerHTML = "";
    const traits = buildStrengthTraits(persona, dims);
    traits.forEach(t => {
      const div = document.createElement("div");
      div.className = "trait-item";
      div.innerHTML = '<div class="trait-name">' + t.name + '</div><div class="trait-desc">' + t.desc + '</div>';
      strengthsBox.appendChild(div);
    });
  }

  // 模块④：隐藏弱点
  const weaknessesBox = document.getElementById("weaknesses-content");
  if (weaknessesBox) {
    weaknessesBox.innerHTML = "";
    const weaknesses = buildWeaknesses(persona, dims);
    weaknesses.forEach(w => {
      const div = document.createElement("div");
      div.className = "trait-item";
      div.style.borderLeftColor = "#c45c5c";
      div.innerHTML = '<div class="trait-name">' + w.name + '</div><div class="trait-desc">' + w.desc + '</div>';
      weaknessesBox.appendChild(div);
    });
  }

  // 模块⑤：处世之道
  const lifeBox = document.getElementById("life-content");
  if (lifeBox) {
    lifeBox.innerHTML =
      '<div class="content-block">' +
        '<h4>🎯 适合的职业方向</h4>' +
        '<p>' + persona.career + '。你在这些领域能发挥天赋，也更容易获得成就感。</p>' +
      '</div>' +
      '<div class="content-block">' +
        '<h4>💞 情感模式与理想相处</h4>' +
        '<p>' + persona.partner + '。</p>' +
        '<p>你的口头禅是「' + persona.tagline + '」——这正是你在关系里最真实的样子。</p>' +
      '</div>' +
      '<div class="content-block">' +
        '<h4>🤝 人际关系建议</h4>' +
        '<p>' + buildRelationshipAdvice(persona, dims) + '</p>' +
      '</div>';
  }

  // 模块⑥：翻盘心法
  const breakthroughBox = document.getElementById("breakthrough-content");
  if (breakthroughBox) {
    breakthroughBox.innerHTML =
      '<div class="content-block">' +
        '<h4>⚡ 你当前最可能遇到的困境</h4>' +
        '<p>' + buildCurrentChallenge(persona, dims) + '</p>' +
      '</div>' +
      '<div class="content-block">' +
        '<h4>🚀 突破方向</h4>' +
        '<p>' + buildBreakthrough(persona, dims) + '</p>' +
      '</div>' +
      '<div class="content-block" style="background:#faf8ff;border-radius:10px;padding:14px;">' +
        '<h4 style="color:#8b6fbf;">💡 一句话行动建议</h4>' +
        '<p style="font-weight:600;color:#555;font-size:15px;">' + persona.advice + '</p>' +
      '</div>';
  }
}

/** 构建性格优势（基于人格strengths + 六维最高分维度） */
function buildStrengthTraits(persona, dims) {
  const traits = [];
  // 前两个strengths
  if (persona.strengths && persona.strengths[0]) {
    traits.push({
      name: persona.strengths[0],
      desc: "这是你最鲜明的特质，在人群中一眼就能被认出。它让你在关键时刻脱颖而出，也是别人最欣赏你的地方。"
    });
  }
  if (persona.strengths && persona.strengths[1]) {
    traits.push({
      name: persona.strengths[1],
      desc: "这个特质藏在你的日常里，可能你自己都没意识到它有多珍贵。它是你与人相处、面对困境时的隐形铠甲。"
    });
  }
  // 六维最高分维度
  if (dims) {
    const topDim = Object.keys(dims).reduce((a, b) => dims[a] >= dims[b] ? a : b);
    traits.push({
      name: topDim + "维度突出",
      desc: "你的" + topDim + "得分高达" + dims[topDim] + "分，这是你灵魂的底色。它决定了你看世界的角度和做事的方式。"
    });
  }
  return traits;
}

/** 构建隐藏弱点（基于六维最低分维度 + 人格特征） */
function buildWeaknesses(persona, dims) {
  const weaknesses = [];
  if (dims) {
    const sorted = Object.keys(dims).sort((a, b) => dims[a] - dims[b]);
    const low1 = sorted[0], low2 = sorted[1];
    weaknesses.push({
      name: low1 + "维度的盲区",
      desc: "你的" + low1 + "得分只有" + dims[low1] + "分。这不是缺点，而是你还没开发的潜力。在这个维度上，你容易低估自己或忽略某些信号。"
    });
    weaknesses.push({
      name: low2 + "维度的张力",
      desc: low2 + "维度的" + dims[low2] + "分，让你在某些场景下会感到拉扯。当你面对需要这个维度的任务时，可能会比别人多花一些力气。"
    });
  }
  weaknesses.push({
    name: "过度发挥优势的反噬",
    desc: "你最突出的特质，用过头了就会变成负担。比如" + (persona.strengths ? persona.strengths[0] : "你的核心特质") + "，当它被过度使用时，可能会让你显得固执或让别人感到压力。"
  });
  return weaknesses;
}

/** 构建人际关系建议 */
function buildRelationshipAdvice(persona, dims) {
  if (!dims) return "保持真诚，做你自己就好。";
  const highSocial = dims["深情"] >= 60 || dims["旷达"] >= 60;
  const lowSocial = dims["孤高"] >= 70;
  if (lowSocial) {
    return "你不擅长也不喜欢无效社交，这完全没问题。把精力留给少数几个真正懂你的人，比在人群中勉强自己更有价值。但偶尔也可以试着走出舒适区，你会发现新的连接。";
  }
  if (highSocial) {
    return "你天生善于与人连接，这是你的天赋。但要注意，在照顾别人情绪的同时，别忘了给自己留空间。你的感受同样重要，不需要总是做那个「接住」别人的人。";
  }
  return "你在社交中收放自如，既能享受独处，也能融入群体。保持这个平衡，就是你最好的状态。";
}

/** 构建当前困境 */
function buildCurrentChallenge(persona, dims) {
  if (!dims) return "每个人都会有迷茫的时刻，这很正常。";
  const lowAction = dims["谋略"] < 50;
  const lowEmotion = dims["通透"] < 50;
  const highIdeal = dims["孤高"] >= 70;
  if (highIdeal && lowAction) {
    return "你心里有很高的追求，但行动力偶尔会跟不上想法。你容易陷入「想很多但做很少」的状态，然后因为没有进展而焦虑。这不是能力问题，而是需要找到把想法落地的方法。";
  }
  if (lowEmotion) {
    return "你容易在情绪里打转，有些事明明知道该放下，却总是忍不住反复回想。你对自己要求很高，当现实达不到期待时，会比别人更难释怀。";
  }
  return "你当前的状态其实不错，只是偶尔会在「坚持自我」和「适应环境」之间摇摆。这是成长的必经之路，不用急着找到答案。";
}

/** 构建突破方向 */
function buildBreakthrough(persona, dims) {
  if (!dims) return "从小事做起，每天进步一点点。";
  const lowAction = dims["谋略"] < 50;
  const lowEmotion = dims["通透"] < 50;
  if (lowAction) {
    return "把大目标拆成小步骤，每天只做一件事。你不需要一下子做到完美，先完成再完美。当你开始行动，焦虑自然会减少。记住：" + persona.advice + "";
  }
  if (lowEmotion) {
    return "练习「放下」的能力。当你又开始反复想一件事时，试着问自己：这件事一年后还重要吗？如果答案是否定的，那就让它过去。你的精力值得用在更有价值的地方。";
  }
  return "你已经走在正确的路上了。继续保持你的节奏，同时保持开放——有时候，计划之外的风景才是最惊喜的。";
}

/** 调试模式：列出全部人格卡片用于预览 */
function renderAllPersonas() {
  const box = document.getElementById("p-picks");
  box.innerHTML = "";
  const h = document.createElement("h4");
  h.textContent = "全部人格卡（调试预览）";
  box.appendChild(h);
  PERSONAS.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "btn btn-ghost btn-skip";
    btn.style.margin = "6px";
    btn.textContent = p.emoji + " " + p.name + " · " + p.title + (p.hidden ? "（隐藏）" : "");
    btn.onclick = () => showResult(p, []);
    box.appendChild(btn);
  });
}