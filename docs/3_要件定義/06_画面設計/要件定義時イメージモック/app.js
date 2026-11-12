const screens=[
['SCR-002','SKUマスタ管理','システム','SKUコード,商品コード,JANコード','一覧確認,登録,変更,参照'],['SCR-003','商品マスタ管理','システム','商品コード,商品名','一覧確認,登録,変更,参照'],['SCR-004','商品カテゴリマスタ管理','システム','カテゴリコード,カテゴリ名','一覧確認,登録,変更,参照'],['SCR-005','会社マスタ管理','システム','会社コード,会社名','一覧確認,登録,変更,参照'],['SCR-006','会社別名マスタ管理','システム','会社名,会社別名','一覧確認,登録,変更,参照'],['SCR-007','ロケーションマスタ管理','システム','ロケーションコード','一覧確認,登録,変更,参照'],['SCR-008','棚段マスタ管理','システム','棚コード,段コード','一覧確認,登録,変更,参照'],['SCR-009','CSV取込設定管理','システム','会社名','一覧確認,登録,変更,参照'],['SCR-010','社員マスタ管理','システム','社員コード,社員名','一覧確認,登録,変更,参照'],['SCR-011','オリコンマスタ管理','システム','オリコン番号','一覧確認,登録,変更,参照'],
['SCR-012','商品情報一覧','共通','商品コード,商品名,SKUコード,JANコード','商品検索,一覧確認,商品・SKU基本情報確認'],
['SCR-013','CSV取込・取込結果一覧','入荷','取込日,会社名','CSV指定・取込,取込結果確認,エラー内容確認'],['SCR-014','入荷予定一覧','入荷','会社,入荷予定番号,取込日,入荷予定日,入荷商品名,入荷商品コード,入荷SKUコード','検索,一覧確認,詳細表示,入荷受付,入庫対象確認'],['SCR-015','入荷予定詳細','入荷','SKUコード,商品コード,商品名','詳細確認,予定数量変更,削除・取消'],['SCR-016','入荷検品','入荷','','商品・数量・期限情報確認,数量修正,検品結果登録'],['SCR-017','オリコン・ロケーション割当','入荷','','ロット情報確認,オリコン割当,推奨保管場所確認,保管場所指定,入庫実績登録'],
['SCR-018','在庫一覧・在庫照会','在庫','商品コード,商品名,SKUコード','在庫検索,一覧確認,在庫詳細表示'],['SCR-019','在庫詳細','在庫','ロット番号,オリコン番号,ロケーションコード,棚コード,段コード','在庫詳細確認,在庫数量調整,ロット詳細表示,在庫移動画面への遷移'],['SCR-020','ロット一覧','在庫','商品コード,商品名,SKUコード,ロット番号,期限情報','ロット検索,一覧確認,ロット詳細表示'],['SCR-021','ロット詳細・修正','在庫','','ロット詳細確認,関連在庫確認,ロット情報修正'],['SCR-027','在庫移動','在庫','オリコン番号','移動対象オリコン確認,移動先ロケーション・棚・段指定,在庫移動実行'],
['SCR-022','出荷データ一覧','出荷','注文番号,商品コード,商品名,出荷日,取込み日','検索,一覧確認,詳細表示,仮引当開始,再引当,ピッキングリスト表示・印刷,出荷検品への遷移'],['SCR-023','出荷データ詳細','出荷','商品コード,商品名','詳細確認,出荷データ変更・削除,出荷情報修正,仮引当開始,ピッキングリスト表示・印刷,出荷検品への遷移,出荷確定'],['SCR-024','仮引当','出荷','','引当可能在庫確認,仮引当実行,仮引当結果確認,仮引当削除,未出荷分再引当'],['SCR-025','本引当','出荷','','本引当登録,本引当数量変更,本引当解除,出荷指示作成,追加出荷指示作成'],['SCR-026','出荷検品','出荷','','検品対象確認,JANコード照合,検品数量入力,差異確認,検品結果登録,検品完了確認']];

// ============================================================
// DOM / 基本データ
// ============================================================
const app=document.querySelector('#app');
 let logged=false;

function login(){logged=true;
 renderHome()}

function logout(){logged=false;
renderLogin()}

function renderLogin(){app.innerHTML=`<section class="login"><div class="login-card"><div class="brand">KAKUU WMS</div><p class="sub">SCR-001 ログイン画面｜要件定義モック</p><div class="field"><label>ユーザーID</label><input value="demo001"></div><div class="field"><label>パスワード</label><input type="password" value="password"></div><button class="btn primary" style="width:100%" onclick="login()">ログイン</button><p class="sub">※モックのため認証処理は行いません。</p></div></section>`}
const groupNames={システム:'マスタ管理',共通:'商品参照',入荷:'入荷管理',在庫:'在庫管理',出荷:'出荷管理'};

// ============================================================
// 共通メニュー制御
// ============================================================
let menuCollapsed=false;

const menuOpen={システム:false,共通:false,入荷:false,在庫:false,出荷:false};

function toggleSidebar(){
  menuCollapsed=!menuCollapsed;

  document.querySelector('.layout')?.classList.toggle('menu-collapsed',menuCollapsed);

}

function toggleMenuGroup(g){
  menuOpen[g]=!menuOpen[g];

  const item=document.querySelector(`[data-menu-group="${g}"]`);

  if(item) item.classList.toggle('open',menuOpen[g]);

}

function renderSideMenu(active=''){
  const groups=['入荷','出荷','在庫','共通','システム'];

  return `<nav class="side">
    <div class="side-head">
      <b class="side-title">共通メニュー</b>
      <button class="side-collapse" onclick="toggleSidebar()" title="共通メニューを伸縮">
        <span class="collapse-open">◀</span><span class="collapse-close">▶</span>
      </button>
    </div>
    <div class="side-groups">
      ${groups.map(g=>`
        <section class="side-group ${menuOpen[g]?'open':''} ${active===g?'active-group':''}" data-menu-group="${g}">
          <button class="group-toggle" onclick="toggleMenuGroup('${g}')">
            <span class="group-label">${groupNames[g]}</span>
            <span class="group-chevron">⌄</span>
          </button>
          <div class="expandable-menu">
            <div class="expandable-inner">
              ${screens.filter(s=>s[2]===g).map(s=>`
                <button class="screen-link" onclick="renderScreen('${s[0]}')" title="${s[0]} ${s[1]}">
                  <span class="screen-code">${s[0]}</span>
                  <span class="screen-name">${s[1]}</span>
                </button>`).join('')}
            </div>
          </div>
        </section>`).join('')}
    </div>
  </nav>`;

}

function shell(content,active=''){
  app.innerHTML=`<div class="shell"><header class="header"><div class="brand">KAKUU WMS</div><button class="btn ghost" onclick="renderHome()">ホーム</button><div class="spacer"></div><span class="user">社員：モック利用者</span><button class="btn ghost" onclick="logout()">ログアウト</button></header><div class="layout ${menuCollapsed?'menu-collapsed':''}">${renderSideMenu(active)}<main class="main">${content}</main></div></div>`;

}

// ============================================================
// ホーム画面
// ============================================================
function renderHome(){shell(`<div class="crumb">CMN-002 共通メニュー</div><div class="title-row"><h1>共通メニュー</h1></div><div class="notice">このモックは要件定義時点の画面構成・主検索・主操作を確認するためのものです。配置、列、ページング、活性条件など基本設計で未確定の内容は仮表示です。</div><div class="menu-grid">${['システム','共通','入荷','在庫','出荷'].map(g=>`<div class="menu-card" onclick="renderGroup('${g}')"><h3>${groupNames[g]}</h3><div class="sub">${screens.filter(s=>s[2]===g).length}画面</div></div>`).join('')}</div>`)}

function renderGroup(g){const cmn={システム:'CMN-003',入荷:'CMN-004',在庫:'CMN-005',出荷:'CMN-006',共通:'CMN-002'}[g];
shell(`<div class="crumb">${cmn} / ${groupNames[g]}</div><div class="title-row"><h1>${groupNames[g]}</h1></div><div class="menu-grid">${screens.filter(s=>s[2]===g).map(s=>`<div class="menu-card" onclick="renderScreen('${s[0]}')"><span class="screen-id">${s[0]}</span><h3>${s[1]}</h3><div class="sub">${s[4]}</div></div>`).join('')}</div>`,g)}

function sampleRows(s){const n=s[1];
 if(n.includes('入荷'))return [['IN-20261030-001','株式会社サンプル商事','SKU-001','24','受付前'],['IN-20261030-002','テスト食品株式会社','SKU-014','12','検品中']];
 if(n.includes('出荷')||n.includes('引当'))return [['ORD-20261030-001','SKU-001','10','8','引当中'],['ORD-20261030-002','SKU-014','5','5','本引当']];
 if(n.includes('在庫')||n.includes('ロット'))return [['SKU-001','LOT-260901','ORI-001','A-01-01','24'],['SKU-014','LOT-261015','ORI-012','B-02-03','12']];
 return [['001','サンプルデータA','CODE-001','有効','2026/10/30'],['002','サンプルデータB','CODE-002','有効','2026/10/30']];
}

// ============================================================
// 各画面レンダリング
// ============================================================
function renderScreen(id){const s=screens.find(x=>x[0]===id);
const search=s[3]?s[3].split(','):[];
const acts=s[4].split(',');
const rows=sampleRows(s);
shell(`<div class="crumb">${groupNames[s[2]]} / ${s[0]}</div><div class="title-row"><div><h1>${s[1]}</h1><span class="screen-id">${s[0]}</span></div></div><div class="notice">要件定義モック：具体的な表示項目・列順・ボタン配置・活性条件は基本設計で確定します。</div>${search.length?`<section class="card"><h2>主検索</h2><div class="search-grid">${search.map(x=>`<div class="field"><label>${x}</label><input placeholder="${x}を入力"></div>`).join('')}</div><div class="actions"><button class="btn primary" onclick="toast('検索しました（モック）')">検索</button><button class="btn ghost" onclick="renderScreen('${id}')">クリア</button><button class="btn ghost" onclick="toast('他検索は基本設計で入力形式を詳細化します')">他検索</button></div></section>`:''}<section class="card"><h2>主な操作</h2><div class="actions">${acts.map(a=>`<button class="btn ${a.includes('削除')||a.includes('解除')?'danger':a.includes('登録')||a.includes('確定')||a.includes('実行')?'primary':'ghost'}" onclick="action('${a}','${id}')">${a}</button>`).join('')}</div></section><section class="card"><h2>${s[1].includes('詳細')||s[1].includes('検品')||s[1].includes('割当')||s[1].includes('引当')||s[1].includes('移動')?'対象情報':'一覧'}</h2><div class="table-wrap"><table><thead><tr><th>識別情報</th><th>関連情報</th><th>コード/ロット</th><th>数量/場所</th><th>状態</th></tr></thead><tbody>${rows.map(r=>`<tr>${r.map((v,i)=>`<td>${i===4?`<span class="status">${v}</span>`:v}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`,s[2])}

function action(a,id){if(a.includes('詳細')&&id==='SCR-014')return renderScreen('SCR-015');
if(a.includes('詳細')&&id==='SCR-018')return renderScreen('SCR-019');
if(a.includes('ロット詳細'))return renderScreen('SCR-021');
if(a.includes('在庫移動'))return renderScreen('SCR-027');
if(a.includes('仮引当'))return renderScreen('SCR-024');
if(a.includes('本引当'))return renderScreen('SCR-025');
if(a.includes('出荷検品'))return renderScreen('SCR-026');
toast(`${a}（モック動作）`)}

function toast(t){const m=document.createElement('div');
m.className='modal';
m.innerHTML=`<div class="modal-box"><h3>モック操作</h3><p>${t}</p><button class="btn primary">閉じる</button></div>`;
m.querySelector('button').onclick=()=>m.remove();
document.body.appendChild(m)}
renderLogin();
