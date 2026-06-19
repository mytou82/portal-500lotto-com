// public/site-helper.js
// A lightweight helper for in-page hint cards, keyword badges, and usage notes.

(function() {
  'use strict';

  const CONFIG = {
    portalUrl: 'https://portal-500lotto.com',
    siteName: '500彩票网官方',
    badgeLabels: ['官方', '安全', '快速'],
    hintMessages: [
      '欢迎访问 500彩票网官方 平台',
      '请认准官方域名：' + 'https://portal-500lotto.com',
      '谨防仿冒网站，确保信息安全'
    ]
  };

  /**
   * Create a hint card element with provided text and optional icon.
   * @param {string} text - The main message.
   * @param {string} [icon='ℹ️'] - A small icon prefix.
   * @returns {HTMLDivElement}
   */
  function createHintCard(text, icon) {
    icon = icon || 'ℹ️';
    const card = document.createElement('div');
    card.className = 'site-hint-card';
    card.style.cssText = [
      'background: #f0f8ff',
      'border: 1px solid #b0d4f1',
      'border-radius: 8px',
      'padding: 12px 16px',
      'margin: 12px 0',
      'font-size: 14px',
      'color: #1a3a5c',
      'box-shadow: 0 2px 4px rgba(0,0,0,0.08)',
      'display: flex',
      'align-items: center',
      'gap: 8px'
    ].join(';');
    card.innerHTML = `<span style="font-size:18px;">${icon}</span><span>${escapeHtml(text)}</span>`;
    return card;
  }

  /**
   * Create a badge element with label and color.
   * @param {string} label - Badge text.
   * @param {string} [color='#2a7faa'] - Background color.
   * @returns {HTMLSpanElement}
   */
  function createBadge(label, color) {
    color = color || '#2a7faa';
    const badge = document.createElement('span');
    badge.className = 'site-keyword-badge';
    badge.style.cssText = [
      'display: inline-block',
      'background: ' + color,
      'color: #fff',
      'padding: 4px 10px',
      'margin: 4px',
      'border-radius: 12px',
      'font-size: 12px',
      'font-weight: 600',
      'letter-spacing: 0.5px'
    ].join(';');
    badge.textContent = label;
    badge.title = '关键词：' + label;
    return badge;
  }

  /**
   * Create a usage note block with a list of instructions.
   * @param {string[]} notes - Array of note strings.
   * @returns {HTMLDivElement}
   */
  function createUsageNotes(notes) {
    const container = document.createElement('div');
    container.className = 'site-usage-notes';
    container.style.cssText = [
      'background: #fffbe6',
      'border: 1px solid #ffe58f',
      'border-radius: 6px',
      'padding: 12px 18px',
      'margin: 16px 0',
      'font-size: 13px',
      'color: #5a4a1a'
    ].join(';');
    const title = document.createElement('strong');
    title.textContent = '📌 访问说明：';
    container.appendChild(title);
    const list = document.createElement('ul');
    list.style.cssText = 'margin: 8px 0 0 0; padding-left: 20px;';
    notes.forEach(function(note) {
      const li = document.createElement('li');
      li.textContent = note;
      list.appendChild(li);
    });
    container.appendChild(list);
    return container;
  }

  /**
   * Minimal HTML escape utility.
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Render all helper components into a given container (or body).
   * @param {string|Element} [containerSelector] - CSS selector or element.
   */
  function renderHelper(containerSelector) {
    var container;
    if (containerSelector) {
      if (typeof containerSelector === 'string') {
        container = document.querySelector(containerSelector);
      } else if (containerSelector instanceof Element) {
        container = containerSelector;
      }
    }
    if (!container) {
      container = document.body;
    }

    // Hint card
    var randomHint = CONFIG.hintMessages[Math.floor(Math.random() * CONFIG.hintMessages.length)];
    var card = createHintCard(randomHint, '🔒');
    container.appendChild(card);

    // Badge row
    var badgeContainer = document.createElement('div');
    badgeContainer.style.cssText = 'margin: 8px 0;';
    CONFIG.badgeLabels.forEach(function(label) {
      var badge = createBadge(label, '#2a7faa');
      badgeContainer.appendChild(badge);
    });
    // Also add a badge for the site name
    var siteBadge = createBadge(CONFIG.siteName, '#b45309');
    badgeContainer.appendChild(siteBadge);
    container.appendChild(badgeContainer);

    // Usage notes
    var notes = [
      '本站为 ' + CONFIG.siteName + ' 信息展示页面',
      '官方入口：' + CONFIG.portalUrl,
      '请通过正规渠道访问，注意辨别网址真伪',
      '如遇异常提示，请及时联系客服'
    ];
    var notesBlock = createUsageNotes(notes);
    container.appendChild(notesBlock);

    // Add a small footer link (no external request, just a text)
    var footer = document.createElement('div');
    footer.style.cssText = 'margin-top: 20px; font-size: 12px; color: #888; text-align: center;';
    footer.textContent = '🔐 安全提示：认准 ' + CONFIG.portalUrl + ' ｜ 谨防诈骗';
    container.appendChild(footer);
  }

  // Auto-run on DOMContentLoaded (safe and passive)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderHelper();
    });
  } else {
    renderHelper();
  }

  // Expose for manual usage if needed (no third-party dependency)
  window.siteHelper = {
    render: renderHelper,
    createHintCard: createHintCard,
    createBadge: createBadge,
    createUsageNotes: createUsageNotes
  };
})();