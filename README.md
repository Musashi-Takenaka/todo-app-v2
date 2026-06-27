# todo-app-v2

React + Vite で作成したシンプルな TODO アプリです。

## 機能

- TODO の追加
- TODO の削除
- TODO の状態切り替え
  - todo
  - doing
  - done
- 優先度の設定
  - high
  - medium
  - low
- 期限日の設定
- 状態による絞り込み
- 作成順・優先度・期限日による並び替え

## セットアップ

```bash
npm install
```

## 開発サーバー

ダブルクリックで起動する場合:

```text
start-todo-app.cmd
```

コマンドラインから起動する場合:

```bash
npm run dev
```

起動後、表示されたローカル URL をブラウザで開きます。

例:

```text
http://127.0.0.1:5173/
```

## ビルド

```bash
npm run build
```

ビルド結果は `dist` に出力されます。

## 主な構成

```text
todo-app-v2/
├─ index.html
├─ package.json
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
      └─ sortTodos.js
```
