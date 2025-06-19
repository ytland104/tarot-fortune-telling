# ✨ 美女と野獣 年代別タロット占い ✨

年代に応じて最適化されたメッセージを提供する、モバイル対応タロット占いWebアプリです。高校生から シニアまで、それぞれの人生ステージに寄り添った占い体験を提供します。

## 🌟 特徴

- 👥 **年代別データベース**: 高校生・大学生・社会人・シニアの4つの年代に対応
- 📱 **モバイルファースト設計**: スマートフォンでの操作に完全最適化
- 🔮 **14枚の特別カード**: 美女と野獣をテーマにしたオリジナルタロットカード
- 📖 **カード意味表示**: 選択したカードの詳細な意味をポップアップで確認
- ⚖️ **正逆選択機能**: 直感的な正位置・逆位置の選択
- 💫 **PWA対応**: ホーム画面に追加してアプリのように使用可能
- 🎨 **美しいUI**: レスポンシブデザインとタッチ最適化

## 🎮 デモ

このアプリはGitHub Pagesで公開されています：
**[https://ytland104.github.io/tarot-fortune-telling/](https://ytland104.github.io/tarot-fortune-telling/)**

## 🚀 使用方法

### 基本の流れ
1. **年代選択**: 高校生・大学生・社会人・シニアから選択
2. **1枚目カード選択**: 14枚から直感でカードを選択
3. **カード意味確認**: ポップアップでカードの意味を確認
4. **正逆選択**: そのカードの正位置・逆位置を選択
5. **2枚目カード選択**: 同様に2枚目のカードを選択・設定
6. **結果表示**: 年代に応じた詳細なメッセージを確認
7. **リスタート**: 「もう一度占う」で最初から再開

### 年代別メッセージ
- 🎓 **高校生**: 文化祭風の親しみやすいメッセージ
- 📚 **大学生**: キャンパスライフに寄り添うアドバイス
- 💼 **社会人**: キャリアと人生設計に関する指針
- 🌸 **シニア**: 人生経験を活かした新たな挑戦への励まし

### ファイル構成
```
タロットフォルダ/
├── index.html              # メインHTMLファイル
├── app.js                  # メインJavaScriptファイル
├── tarot-data-complete.js  # 全年代のカードデータベース
├── tarot-data.js          # 基本カードデータ
├── manifest.json          # PWA設定
├── sw.js                 # Service Worker
├── PRODUCT_DOCUMENT.md   # 技術仕様書
└── README.md            # このファイル
```

## 🎯 対応機能

### コア機能
- 年代別データベース切り替え
- 14枚タロットカード選択システム
- カード意味表示モーダル
- 正位置・逆位置選択
- 年代に応じた占い結果生成

### PWA機能
- オフライン動作対応
- ホーム画面への追加
- アプリライクな操作感
- Service Worker による高速読み込み

### モバイル最適化
- タッチ操作に最適化されたUI
- レスポンシブグリッドレイアウト
- 5列カードレイアウト（モバイル）
- タップ時のフィードバックアニメーション

## 🛠️ セットアップ

### ローカル環境での使用
1. このリポジトリをクローンまたはダウンロード
```bash
git clone https://github.com/ytland104/tarot-fortune-telling.git
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

### ブラウザ対応
- iOS Safari 12+
- Android Chrome 80+
- PC/Mac用モダンブラウザ
- PWA対応ブラウザ

### 画面サイズ対応
- **Desktop (1024px+)**: 5列カードレイアウト
- **Tablet (768px-1023px)**: 4列カードレイアウト
- **Mobile (480px-767px)**: 5列コンパクトレイアウト
- **Small Mobile (~479px)**: 5列最小レイアウト

## 🎨 カスタマイズ

### 年代別データの編集
`tarot-data-complete.js`を編集して、各年代のメッセージを変更できます：

```javascript
// 高校生版データベース
const tarotCardsHighSchool = [ ... ];

// 大学生版データベース
const tarotCardsUniversity = [ ... ];

// 社会人版データベース
const tarotCardsProfessional = [ ... ];

// シニア版データベース
const tarotCardsSenior = [ ... ];
```

### カード内容の変更
各カードは以下の構造を持ちます：
```javascript
{
  id: 1,
  nameEn: "The Fool",
  nameJp: "愚者",
  positive: {
    meaning: "新しい始まり",
    description: "年代に応じたメッセージ",
    situation: "現在の状況の解釈",
    advice: "具体的なアドバイス"
  },
  negative: {
    // 逆位置の内容
  }
}
```

### デザインの変更
`index.html`内のCSSを編集して、色やレイアウトを変更できます。

## 🔧 技術仕様

### アーキテクチャ
- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **データ管理**: ローカルストレージ + JavaScript配列
- **デプロイ**: 静的サイト（GitHub Pages対応）

### 状態管理
```javascript
const gameState = {
  currentAgeGroup: string,    // 選択された年代
  selectedCards: array,       // 選択されたカード
  cardOrientations: array,    // 正逆の選択
  currentStep: number         // 現在のステップ
}
```

## 🔧 注意事項

- PWA機能を完全に使用するにはHTTPSでホストする必要があります
- 一部の古いブラウザでは動作しない場合があります
- アイコンファイル（icon-192.png, icon-512.png）は現在プレースホルダーです

## 🤝 貢献

バグ報告や機能追加の提案はIssueまでお気軽にどうぞ！

### 開発ロードマップ
- [ ] 多言語対応（英語版）
- [ ] 新しいタロットカードの追加
- [ ] アニメーション効果の強化
- [ ] 利用統計の収集機能

## 📝 ライセンス・著作権

### 著作権
このプロジェクトは**附高祭実行委員会**の著作物です。  
© 2025 附高祭実行委員会 All rights reserved.

### ライセンス
このプロジェクトはMITライセンスの下で公開されています。
詳細は[LICENSE](LICENSE)ファイルをご覧ください。

### 利用について
- 個人利用・学習目的での利用は自由です
- 商用利用や再配布の際は附高祭実行委員会までご連絡ください
- 改変・派生作品を作成する場合は、元の著作権表示を保持してください

---

*あなたの人生ステージに寄り添う、魔法のメッセージをお届けします... ✨* 