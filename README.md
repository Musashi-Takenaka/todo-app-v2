# todo-app-v2

React + Vite で作成した TODO アプリです。

## 機能

- TODO の追加
- TODO の編集
- TODO の削除
- ステータス切り替え
  - 未着手
  - 作業中
  - 完了
- 優先度の設定
  - 高
  - 中
  - 低
- 期限日の設定
- ステータスによる絞り込み
- タスク名による検索
- 作成順・優先度・期限日による並び替え
- localStorage への自動保存

## 起動方法

`start-todo-app.cmd` をダブルクリックすると起動できます。

コマンドラインから起動する場合:

```powershell
npm run dev
```

ブラウザで次の URL を開きます。

```text
http://127.0.0.1:5173/
```

## セットアップ

初回のみ依存関係をインストールします。

```powershell
npm install
```

`start-todo-app.cmd` から起動する場合は、`node_modules` がなければ自動で `npm install` を実行します。

## ビルド

```powershell
npm run build
```

ビルド結果は `dist` に出力されます。

## 構成

```text
todo-app-v2/
├─ index.html
├─ package.json
├─ start-todo-app.cmd
├─ start-todo-app.ps1
├─ vite.config.js
├─ public/
└─ src/
   ├─ App.jsx
   ├─ App.css
   ├─ index.css
   ├─ main.jsx
   ├─ components/
   │  ├─ TodoForm.jsx
   │  ├─ TodoItem.jsx
   │  └─ TodoList.jsx
   └─ utils/
      ├─ filterTodos.js
      ├─ sortTodos.js
      └─ storage/
         └─ todoStorage.js
```
