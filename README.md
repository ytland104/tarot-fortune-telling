# ✨ 美女と野獣タロット占い ✨

高校文化祭向けの携帯対応タロット占いWebアプリです。Webサーバー不要で動作する静的サイトとして設計されています。

## 🌟 特徴

- 📱 **携帯完全対応**: スマートフォンでの操作に最適化
- 🔮 **14枚の特別カード**: 美女と野獣をテーマにしたオリジナルカード
- ⚡ **簡単操作**: タップするだけで占い結果が表示
- 💫 **PWA対応**: ホーム画面に追加してアプリのように使用可能
- 🎨 **美しいUI**: グラデーションとアニメーションで魅力的な体験

## 🎮 デモ

このアプリはGitHub Pagesで公開されています：
**[https://[username].github.io/tarot-fortune-telling/](https://[username].github.io/tarot-fortune-telling/)**

## 🚀 使用方法

### 基本の流れ
1. 「占いを始める」ボタンをタップ
2. 直感で1枚目のカードを選択（現在の状況）
3. 直感で2枚目のカードを選択（アドバイス・未来）
4. 結果画面で詳細なメッセージを確認
5. 「結果をシェア」で友達に共有

### ファイル構成
```
タロットフォルダ/
├── index.html          # メインHTMLファイル
├── tarot-data.js        # カードデータ（一部）
├── tarot-data-complete.js # 完全なカードデータ
├── app.js              # メインJavaScriptファイル
├── manifest.json       # PWA設定
├── sw.js              # Service Worker
└── README.md          # このファイル
```

## 🎯 対応機能

### カード機能
- ランダムなカード配置
- 正位置/逆位置の自動判定
- 詳細な占い結果表示
- 2枚引きタロット読み

### PWA機能
- オフライン動作
- ホーム画面への追加
- アプリライクな操作感
- レスポンシブデザイン

### シェア機能
- Web Share API対応
- クリップボードコピー対応
- SNS投稿用テキスト生成

## 🛠️ セットアップ

### ローカル環境での使用
1. このリポジトリをクローンまたはダウンロード
```bash
git clone https://github.com/[username]/tarot-fortune-telling.git
cd tarot-fortune-telling
```
2. `index.html`をWebブラウザで開く

### GitHub Pagesでの公開
1. このリポジトリをフォーク
2. GitHubのSettings > Pages > Source で「Deploy from a branch」を選択
3. ブランチを「main」に設定
4. 数分後に `https://[username].github.io/tarot-fortune-telling/` でアクセス可能

### 推奨ホスティング
- GitHub Pages（無料・簡単）
- Netlify
- Vercel
- Firebase Hosting

## 📱 対応環境

- iOS Safari 12+
- Android Chrome 80+
- PC/Mac用モダンブラウザ
- PWA対応ブラウザ

## 🎨 カスタマイズ

### カードデータの編集
`tarot-data-complete.js`を編集して、カードの内容やメッセージを変更できます。

### デザインの変更
`index.html`内のCSSを編集して、色やレイアウトを変更できます。

## 🔧 注意事項

- PWA機能を完全に使用するにはHTTPSでホストする必要があります
- 一部の古いブラウザでは動作しない場合があります
- アイコンファイル（icon-192.png, icon-512.png）は現在プレースホルダーです

## 🤝 貢献

バグ報告や機能追加の提案はIssueまでお気軽にどうぞ！

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
詳細は[LICENSE](LICENSE)ファイルをご覧ください。

---

*文化祭が素敵な思い出になりますように... ✨* 