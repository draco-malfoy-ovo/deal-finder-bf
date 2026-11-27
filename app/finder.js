// TrueTag finder logic: scoring, rendering, search, filters and sorting.
// Plain browser script, no modules and no network: it works from the data
// in deals-data.js and the elements index.html declares.

(function () {
  'use strict';

  var VERDICTS = {
    verified: { label: 'Verified low', bonus: 20, hint: 'Price checks out as a genuine low for this item.' },
    conditions: { label: 'Real, with a catch', bonus: 10, hint: 'A real saving, with a condition printed on the card.' },
    marketing: { label: 'Mostly marketing', bonus: 0, hint: 'The headline discount does not survive scrutiny — read the note.' },
  };

  function discountPct(deal) {
    return Math.round((1 - deal.price / deal.usual) * 100);
  }

  function savings(deal) {
    return Math.round((deal.usual - deal.price) * 100) / 100;
  }

  function dealScore(deal) {
    var bonus = Math.min(30, Math.round(savings(deal) / 50));
    var raw = discountPct(deal) + bonus + VERDICTS[deal.verdict].bonus;
    return Math.max(1, Math.min(99, raw));
  }

  function money(n) {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var state = { query: '', category: 'All', store: 'All', minDiscount: 0, sort: 'score' };

  var els = {
    grid: document.getElementById('grid'),
    count: document.getElementById('count'),
    search: document.getElementById('search'),
    chips: document.getElementById('chips'),
    storeSel: document.getElementById('storeSel'),
    discSel: document.getElementById('discSel'),
    sortSel: document.getElementById('sortSel'),
    empty: document.getElementById('empty'),
  };

  function categories() {
    var seen = [];
    window.DEALS.forEach(function (d) {
      if (seen.indexOf(d.category) === -1) seen.push(d.category);
    });
    return ['All'].concat(seen);
  }

  function stores() {
    var seen = [];
    window.DEALS.forEach(function (d) {
      if (seen.indexOf(d.store) === -1) seen.push(d.store);
    });
    return seen;
  }

  function buildControls() {
    els.chips.innerHTML = categories()
      .map(function (c) {
        var n = c === 'All' ? window.DEALS.length : window.DEALS.filter(function (d) { return d.category === c; }).length;
        return '<button type="button" class="chip' + (state.category === c ? ' on' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + ' · ' + n + '</button>';
      })
      .join('');
    Array.prototype.forEach.call(els.chips.querySelectorAll('.chip'), function (btn) {
      btn.addEventListener('click', function () {
        state.category = btn.getAttribute('data-cat');
        buildControls();
        render();
      });
    });

    els.storeSel.innerHTML =
      '<option value="All">All stores</option>' +
      stores()
        .map(function (s) {
          return '<option value="' + esc(s) + '"' + (state.store === s ? ' selected' : '') + '>' + esc(s) + '</option>';
        })
        .join('');
  }

  function matches(deal) {
    if (state.category !== 'All' && deal.category !== state.category) return false;
    if (state.store !== 'All' && deal.store !== state.store) return false;
    if (discountPct(deal) < state.minDiscount) return false;
    if (state.query) {
      var hay = (deal.product + ' ' + deal.store + ' ' + deal.category + ' ' + deal.blurb).toLowerCase();
      if (hay.indexOf(state.query.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function sortDeals(list) {
    var by = {
      score: function (a, b) { return dealScore(b) - dealScore(a); },
      discount: function (a, b) { return discountPct(b) - discountPct(a); },
      savings: function (a, b) { return savings(b) - savings(a); },
      priceLow: function (a, b) { return a.price - b.price; },
      priceHigh: function (a, b) { return b.price - a.price; },
    };
    return list.slice().sort(by[state.sort] || by.score);
  }

  function cardHtml(deal) {
    var pct = discountPct(deal);
    var v = VERDICTS[deal.verdict];
    var also = deal.alsoAt
      .map(function (a) {
        return '<span class="also">Also at ' + esc(a.store) + ': <b>' + money(a.price) + '</b></span>';
      })
      .join('');
    return (
      '<article class="card v-' + deal.verdict + '">' +
      '<div class="card-top">' +
      '<span class="cat">' + esc(deal.category) + '</span>' +
      '<span class="verdict" title="' + esc(v.hint) + '">' + esc(v.label) + '</span>' +
      '</div>' +
      '<h3>' + esc(deal.product) + '</h3>' +
      '<p class="blurb">' + esc(deal.blurb) + '</p>' +
      '<div class="price-row">' +
      '<span class="price">' + money(deal.price) + '</span>' +
      '<span class="usual">' + money(deal.usual) + '</span>' +
      '<span class="off">−' + pct + '%</span>' +
      '</div>' +
      '<p class="save">You save ' + money(savings(deal)) + ' at ' + esc(deal.store) + ' · ' + esc(deal.ends) + '</p>' +
      '<div class="score-row"><span class="score-label">Deal score</span>' +
      '<span class="score-bar"><span class="score-fill" style="width:' + dealScore(deal) + '%"></span></span>' +
      '<span class="score-num">' + dealScore(deal) + '</span></div>' +
      '<p class="note">' + esc(deal.note) + '</p>' +
      (also ? '<p class="also-row">' + also + '</p>' : '') +
      '<p class="checked">Price checked ' + esc(window.DEAL_CHECKED_LABEL) + ' · Source: ' + esc(deal.source) + '</p>' +
      '<a class="go" href="' + esc(deal.url) + '" target="_blank" rel="noopener">View deal at ' + esc(deal.store) + ' →</a>' +
      '</article>'
    );
  }

  function render() {
    var list = sortDeals(window.DEALS.filter(matches));
    els.grid.innerHTML = list.map(cardHtml).join('');
    els.count.textContent =
      'Showing ' + list.length + ' of ' + window.DEALS.length + ' checked deals' +
      (state.category !== 'All' ? ' in ' + state.category : '') +
      (state.store !== 'All' ? ' at ' + state.store : '') +
      (state.minDiscount > 0 ? ', at least ' + state.minDiscount + '% off' : '') +
      (state.query ? ', matching “' + state.query + '”' : '');
    els.empty.hidden = list.length !== 0;
  }

  els.search.addEventListener('input', function () {
    state.query = els.search.value.trim();
    render();
  });
  els.storeSel.addEventListener('change', function () {
    state.store = els.storeSel.value;
    render();
  });
  els.discSel.addEventListener('change', function () {
    state.minDiscount = parseInt(els.discSel.value, 10) || 0;
    render();
  });
  els.sortSel.addEventListener('change', function () {
    state.sort = els.sortSel.value;
    render();
  });

  buildControls();
  render();
})();
