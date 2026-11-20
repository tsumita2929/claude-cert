// 問題集（index.html）の動作を、ブラウザなしで一通り確かめる簡易テスト。
// 使い方: node shared/quiz/smoke.js CCDV-F/index.html [もう1つの index.html ...]
// 画面の中身は見ない。全画面・全操作が例外なく動き、要所の文言が出ることだけを確認する。
const fs = require('fs');

function run(file) {
  const page = fs.readFileSync(file, 'utf8');
  const m = page.match(/<script>\n([\s\S]*?)\n<\/script>/);
  if (!m) throw new Error('script が見つかりません');
  const exam = JSON.parse(page.match(/const EXAM = (\{.*\});\n/)[1]);
  const ls = {}; const listeners = {}; const docListeners = {};
  let html = '';
  const app = { set innerHTML(v) { html = v; }, get innerHTML() { return html; }, addEventListener(t, f) { listeners[t] = f; } };
  const sandbox = {
    localStorage: { getItem: k => ls[k] ?? null, setItem: (k, v) => { ls[k] = String(v); }, removeItem: k => { delete ls[k]; } },
    document: { getElementById: id => (id === 'app' ? app : null), activeElement: null, addEventListener(t, f) { docListeners[t] = f; } },
    window: { scrollTo() {} },
    setInterval: () => 0,
  };
  new Function(...Object.keys(sandbox), m[1])(...Object.values(sandbox));

  const click = (action, data = {}) => {
    const el = { dataset: { action, ...data }, disabled: false, getAttribute: () => null };
    listeners.click({ target: { closest: () => el } });
  };
  const key = k => docListeners.keydown({ key: k, target: { closest: () => null }, preventDefault() {} });
  const has = s => { if (!html.includes(s)) throw new Error('画面に見つからない文言: ' + s); };
  const hasNot = (s, why) => { if (html.includes(s)) throw new Error(`${why}（画面に ${s} がある）`); };
  const session = () => JSON.parse(ls[`${exam.storage}.session.v1`]);

  has(`${exam.code} 問題集`); has('練習を始める'); has(exam.name.replace(/&/g, '&amp;'));
  has(`${exam.questions}<small> 問`); has(`${exam.minutes}<small> 分`);
  for (const d of exam.domains) has(`data-domain="${d.code}"`);

  // 練習：1問目に答えて解説を見て、2問目へ進み、途中で終了
  click('start-practice'); has('回答する');
  // 論点名は正解の手がかりになるので、回答の前には出さない（回答のあとの解説では出す）
  hasNot('class="q-topic"', '練習で、回答の前に論点名が出ています'); has('class="q-dom"');
  key('1'); key('2'); key('Enter'); has('解説'); has('class="q-topic"');
  key('Enter'); has('問</small>2');
  click('finish'); has('練習の結果');
  click('review', { idx: '0' }); has('結果へ');
  click('back-result'); click('home'); has('結果を見る');

  // ドメインごとの練習が、どのドメインでも始められる
  for (const d of exam.domains) {
    click('domain-practice', { domain: d.code }); has('回答する');
    if (!session().ids.every(id => id.startsWith(d.code + '-'))) throw new Error(`${d.code} の練習に他ドメインの問題が混ざっています`);
    click('home');
  }
  click('all-domains'); click('all-domains');

  // シナリオごとの練習（シナリオ形式の試験だけ）
  for (const sc of exam.scenarios || []) {
    click('scenario-practice', { scenario: sc.id }); has('シナリオ：' + sc.name);
    click('home');
  }

  // 模擬試験：出題数、ドメインの配分、採点まで
  click('start-exam'); has('問題一覧');
  // 模擬試験は本番に合わせ、採点まで論点名・分野・問題ID（分野が分かる）を出さない
  for (const c of ['q-topic', 'q-dom', 'q-id']) hasNot(`class="${c}"`, '模擬試験の途中で、手がかりになる表示が出ています');
  const s = session();
  const want = Math.min(exam.questions, (page.match(/"id":"D\d-\d\d"/g) || []).length);
  if (s.ids.length !== want) throw new Error(`模擬試験の出題数が ${s.ids.length}（期待 ${want}）`);
  if (new Set(s.ids).size !== s.ids.length) throw new Error('模擬試験に同じ問題が重複しています');
  const dist = {};
  s.ids.forEach(id => { const d = id.split('-')[0]; dist[d] = (dist[d] || 0) + 1; });
  // どの分野も、配点から見た出題数を大きく下回らない（収録数が足りる分野について。シナリオ形式は、選ばれた
  // シナリオに左右されるので、5%ぶんの不足まで認める）
  const inBank = {};
  (page.match(/"id":"D\d-\d\d"/g) || []).forEach(m => { const d = m.slice(6, 8); inBank[d] = (inBank[d] || 0) + 1; });
  const sumW = exam.domains.reduce((a, d) => a + d.weight, 0);
  const slack = exam.scenarioPick ? Math.max(1, Math.round(want * 0.05)) : 1;
  for (const d of exam.domains) {
    const need = Math.min(Math.floor(want * d.weight / sumW), inBank[d.code] || 0);
    if ((dist[d.code] || 0) < need - slack) throw new Error(`模擬試験で ${d.code} が ${dist[d.code] || 0}問（配点からは ${need}問ほど）`);
  }
  // シナリオ形式の試験：決まった数のシナリオだけから出題され、同じシナリオの問題がまとまっている
  let scenariosUsed = null;
  if (exam.scenarioPick && (exam.scenarios || []).length) {
    const scnOf = Object.fromEntries([...page.matchAll(/"id":"(D\d-\d\d)","domain":"D\d","scenario":"(S\d)"/g)].map(m => [m[1], m[2]]));
    const seq = s.ids.map(id => scnOf[id]);
    if (seq.some(x => !x)) throw new Error('シナリオのない問題が模擬試験に出ています');
    const runs = seq.filter((x, i) => i === 0 || x !== seq[i - 1]);
    scenariosUsed = new Set(seq).size;
    if (scenariosUsed !== exam.scenarioPick) throw new Error(`模擬試験のシナリオ数が ${scenariosUsed}（期待 ${exam.scenarioPick}）`);
    if (runs.length !== scenariosUsed) throw new Error('同じシナリオの問題がまとまっていません');
    has('シナリオ：');
  }
  // 模擬試験の途中で練習を始めようとしても、黙って破棄されない
  click('home'); click('start-practice'); has('破棄しますか');
  if (session().mode !== 'exam') throw new Error('模擬試験の途中で練習を始めたら、試験が消えました');
  click('discard-no'); click('resume'); has('問題一覧');
  key('2'); key('ArrowRight'); click('flag'); click('goto', { idx: '5' });
  click('finish'); has('採点すると回答は変更できません'); click('finish-yes'); has('模擬試験の結果');
  click('review', { idx: '0' }); has('class="q-topic"'); has('class="q-dom"'); click('back-result');
  click('retry-wrong'); has('回答する');
  click('home'); click('reset'); click('reset-yes');
  return { exam: exam.code, examQuestions: s.ids.length, dist, scenariosUsed };
}

let failed = false;
for (const file of process.argv.slice(2)) {
  try {
    for (let i = 0; i < 5; i++) var r = run(file); // 乱数に左右されないよう5回
    console.log(`OK  ${r.exam}: 模擬試験 ${r.examQuestions}問 ${JSON.stringify(r.dist)}${r.scenariosUsed ? ` シナリオ ${r.scenariosUsed}つ` : ''}`);
  } catch (e) {
    failed = true;
    console.log(`NG  ${file}: ${e.message}`);
  }
}
process.exit(failed ? 1 : 0);
