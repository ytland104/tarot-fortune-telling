# タロット占いアプリ プロダクトドキュメント

## 1. 要件定義

### 1.1 プロダクト概要
美女と野獣をテーマにした年代別タロット占いWebアプリケーション。ユーザーの年代に応じて最適化されたメッセージでタロット占いを提供する。

### 1.2 機能要件

#### 1.2.1 基本機能
- **年代選択機能**: 高校生、大学生、社会人、シニアの4つの年代から選択
- **カード選択機能**: 14枚のタロットカードから2枚を選択
- **カード意味表示機能**: 選択されたカードの意味をポップアップで表示
- **正逆判定機能**: 各カードの正位置・逆位置をランダム判定
- **結果表示機能**: 年代に応じたメッセージで占い結果を表示
- **リスタート機能**: 占いを最初からやり直す機能

#### 1.2.2 年代別データベース
- **高校生版**: 文化祭風の親しみやすいメッセージ
- **大学生版**: キャンパスライフに寄り添うアドバイス
- **社会人版**: キャリアと人生設計に関する指針
- **シニア版**: 人生経験を活かした新たな挑戦への励ま

#### 1.2.3 UI/UX要件
- **モバイルファースト設計**: スマートフォンでの利用を最優先
- **レスポンシブデザイン**: 各デバイスサイズに最適化
- **直感的操作**: タップ操作での簡単なカード選択
- **視覚的フィードバック**: カード選択時のアニメーション効果

### 1.3 非機能要件

#### 1.3.1 パフォーマンス
- ページ読み込み時間: 3秒以内
- カード選択からの反応時間: 1秒以内

#### 1.3.2 対応環境
- **ブラウザ**: Chrome, Safari, Firefox, Edge (最新版)
- **デバイス**: スマートフォン、タブレット、PC
- **PWA対応**: オフライン機能、ホーム画面追加

## 2. システム設計

### 2.1 アーキテクチャ概要
- **フロントエンド**: HTML5, CSS3, Vanilla JavaScript
- **データ管理**: ローカルストレージ + JavaScript配列
- **デプロイ**: GitHub Pages (静的サイト)

### 2.2 データ構造

#### 2.2.1 カードデータ
```javascript
{
  id: number,
  nameEn: string,
  nameJp: string,
  positive: {
    meaning: string,
    description: string,
    situation: string,
    advice: string
  },
  negative: {
    meaning: string,
    description: string,
    situation: string,
    advice: string
  }
}
```

#### 2.2.2 年代別データベース
```javascript
const ageGroupDatabases = {
  'highschool': tarotCardsHighSchool,
  'university': tarotCardsUniversity,
  'professional': tarotCardsProfessional,
  'senior': tarotCardsSenior
}
```

### 2.3 コンポーネント設計

#### 2.3.1 主要コンポーネント
- **AgeSelector**: 年代選択画面
- **CardSelector**: カード選択画面
- **CardMeaningModal**: カード意味表示モーダル
- **OrientationSelector**: 正逆選択画面
- **ResultDisplay**: 結果表示画面

#### 2.3.2 状態管理
```javascript
const gameState = {
  currentAgeGroup: string,
  selectedCards: array,
  cardOrientations: array,
  currentStep: number
}
```

### 2.4 レスポンシブデザイン
- **Desktop (1024px+)**: 5列カードレイアウト
- **Tablet (768px-1023px)**: 4列カードレイアウト
- **Mobile (480px-767px)**: 5列コンパクトレイアウト
- **Small Mobile (~479px)**: 5列最小レイアウト

## 3. シーケンス図

### 3.1 基本占いフロー

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant A as アプリ
    participant D as データベース
    
    U->>A: アプリ起動
    A->>U: 年代選択画面表示
    U->>A: 年代選択（例：大学生）
    A->>D: 大学生データベース読み込み
    D->>A: カードデータ返却
    A->>U: カード選択画面表示（14枚）
    
    U->>A: 1枚目カード選択
    A->>D: カード意味データ取得
    D->>A: 正位置・逆位置意味返却
    A->>U: カード意味ポップアップ表示
    U->>A: ポップアップ閉じる
    A->>U: 1枚目正逆選択画面表示
    U->>A: 正位置選択
    
    A->>U: 2枚目カード選択画面表示
    U->>A: 2枚目カード選択
    A->>D: カード意味データ取得
    D->>A: 正位置・逆位置意味返却
    A->>U: カード意味ポップアップ表示
    U->>A: ポップアップ閉じる
    A->>U: 2枚目正逆選択画面表示
    U->>A: 逆位置選択
    
    A->>D: 結果生成リクエスト
    D->>A: 年代別メッセージ返却
    A->>U: 占い結果表示
    U->>A: もう一度占う
    A->>U: 年代選択画面に戻る
```

### 3.2 エラーハンドリング

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant A as アプリ
    participant E as エラーハンドラー
    
    U->>A: 不正な操作
    A->>E: エラー検出
    E->>A: エラー種別判定
    
    alt データ読み込みエラー
        A->>U: 「データ読み込みに失敗しました」
    else カード選択エラー
        A->>U: 「カードを選択してください」
    else 年代未選択エラー
        A->>U: 「年代を選択してください」
    end
    
    A->>U: 前の画面に戻る
```

### 3.3 PWA機能

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant B as ブラウザ
    participant SW as ServiceWorker
    participant C as キャッシュ
    
    U->>B: アプリ初回アクセス
    B->>SW: ServiceWorker登録
    SW->>C: 静的リソースキャッシュ
    C->>SW: キャッシュ完了
    SW->>B: インストール完了
    B->>U: 「ホーム画面に追加」提案
    
    U->>B: オフライン状態でアクセス
    B->>SW: リソース要求
    SW->>C: キャッシュから取得
    C->>SW: リソース返却
    SW->>B: アプリ表示
    B->>U: 正常動作（オフライン）
```

## 4. 開発・運用

### 4.1 開発環境
- **エディタ**: VS Code / Cursor
- **バージョン管理**: Git + GitHub
- **デプロイ**: GitHub Actions → GitHub Pages
- **テスト**: 手動テスト + ブラウザ開発者ツール

### 4.2 品質管理
- **コードレビュー**: Pull Request ベース
- **テスト項目**: 各年代での動作確認、レスポンシブ確認
- **パフォーマンス**: Lighthouse スコア確認

### 4.3 今後の拡張計画
- **多言語対応**: 英語版の追加
- **カード追加**: 新しいタロットカードの実装
- **アニメーション強化**: より豊かな視覚効果
- **データ分析**: 利用統計の収集と分析 