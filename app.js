// アプリケーション状態管理
let currentStep = 0;
let selectedCards = {
    first: null,
    second: null
};

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    // PWAサポート
    registerServiceWorker();
    setupInstallPrompt();

    // ランダムなカード配置を生成
    shuffleCards();
}

// PWA: Service Worker登録
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js')
                .then(function (registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function (registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// PWA: インストールプロンプト
function setupInstallPrompt() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // インストールボタンを表示するかどうかの判断
        showInstallButton(deferredPrompt);
    });
}

function showInstallButton(deferredPrompt) {
    // 必要に応じてインストールボタンを表示
    console.log('アプリをホーム画面に追加できます');
}

// カードをシャッフル
function shuffleCards() {
    const cards = [...tarotCards];
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

// 占いを開始
function startReading() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('stepIndicator').style.display = 'flex';

    currentStep = 1;
    updateStepIndicator();
    showCardSelection(1);
}

// ステップインジケーター更新
function updateStepIndicator() {
    const steps = ['step1', 'step2', 'step3'];

    steps.forEach((stepId, index) => {
        const stepElement = document.getElementById(stepId);
        stepElement.classList.remove('active', 'completed');

        if (index + 1 === currentStep) {
            stepElement.classList.add('active');
        } else if (index + 1 < currentStep) {
            stepElement.classList.add('completed');
        }
    });
}

// カード選択画面を表示
function showCardSelection(cardNumber) {
    // 全ての選択画面を非表示
    document.querySelectorAll('.card-selection').forEach(section => {
        section.classList.remove('active');
    });

    // 指定されたカード選択画面を表示
    const selectionElement = document.getElementById(`cardSelection${cardNumber}`);
    selectionElement.classList.add('active');

    // カードグリッドを生成
    generateCardGrid(cardNumber);
}

// カードグリッドを生成
function generateCardGrid(cardNumber) {
    const gridElement = document.getElementById(`cardsGrid${cardNumber}`);
    const shuffledCards = shuffleCards();

    gridElement.innerHTML = '';

    shuffledCards.forEach(card => {
        const cardElement = createCardElement(card, cardNumber);
        gridElement.appendChild(cardElement);
    });
}

// カード要素を作成
function createCardElement(card, cardNumber) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card card-${card.id}`;
    cardDiv.innerHTML = getCardDisplayName(card);

    // クリックとタッチの両方のイベントを追加
    const selectCardHandler = () => selectCard(card, cardNumber, cardDiv);
    cardDiv.addEventListener('click', selectCardHandler);
    cardDiv.addEventListener('touchstart', selectCardHandler);

    // タップでの選択を視覚化
    cardDiv.style.cursor = 'pointer';
    cardDiv.style.touchAction = 'manipulation';

    return cardDiv;
}

// カードを選択
function selectCard(card, cardNumber, cardElement) {
    // 他のカードを無効化
    const allCards = cardElement.parentElement.querySelectorAll('.card');
    allCards.forEach(otherCard => {
        if (otherCard !== cardElement) {
            otherCard.style.opacity = '0.5';
            otherCard.style.pointerEvents = 'none';
        }
    });

    // 視覚的フィードバック
    cardElement.classList.add('selected');

    // カードの意味をポップアップで表示
    showCardMeaningModal(card, cardNumber, cardElement);
}

// 正位置/逆位置選択画面を表示
function showOrientationSelection(card, cardNumber, cardElement) {
    const selectionElement = document.getElementById(`cardSelection${cardNumber}`);
    const orientationDiv = document.createElement('div');
    orientationDiv.className = 'orientation-selection';
    orientationDiv.innerHTML = `
        <h3>「${card.nameJp}」の向きを選択してください</h3>
        <p>実際のカードの向きに合わせて選択してください</p>
        <div class="orientation-buttons">
            <button class="btn btn-primary orientation-btn" onclick="confirmCardSelection('${card.id}', ${cardNumber}, true)">
                正位置 ↑<br>
                <small>${card.positive.meaning}</small>
            </button>
            <button class="btn btn-secondary orientation-btn" onclick="confirmCardSelection('${card.id}', ${cardNumber}, false)">
                逆位置 ↓<br>
                <small>${card.negative.meaning}</small>
            </button>
        </div>
    `;

    // 既存の向き選択画面があれば削除
    const existingOrientation = selectionElement.querySelector('.orientation-selection');
    if (existingOrientation) {
        existingOrientation.remove();
    }

    selectionElement.appendChild(orientationDiv);

    // アニメーション
    setTimeout(() => {
        orientationDiv.style.opacity = '1';
        orientationDiv.style.transform = 'translateY(0)';
    }, 100);
}

// カード選択を確定
function confirmCardSelection(cardId, cardNumber, isPositive) {
    const card = tarotCards.find(c => c.id == cardId);

    // 選択されたカードを保存
    if (cardNumber === 1) {
        selectedCards.first = { card, isPositive };
    } else {
        selectedCards.second = { card, isPositive };
    }

    // 選択されたカードを表示
    showSelectedCard(card, isPositive, cardNumber);

    // 向き選択画面を削除
    const orientationSelection = document.querySelector('.orientation-selection');
    if (orientationSelection) {
        orientationSelection.remove();
    }

    // 次のステップに進む
    setTimeout(() => {
        if (cardNumber === 1) {
            currentStep = 2;
            updateStepIndicator();
            showCardSelection(2);
        } else {
            currentStep = 3;
            updateStepIndicator();
            showResult();
        }
    }, 1500);
}

// 選択されたカードを表示
function showSelectedCard(card, isPositive, cardNumber) {
    const selectedCardsContainer = document.getElementById(`selectedCards${cardNumber}`);

    const selectedCardDiv = document.createElement('div');
    selectedCardDiv.className = 'selected-card';

    const orientation = isPositive ? '正位置' : '逆位置';
    const meaning = isPositive ? card.positive.meaning : card.negative.meaning;

    selectedCardDiv.innerHTML = `
        <h3>${card.nameJp} (${orientation})</h3>
        <div class="card">${getCardDisplayName(card)}</div>
        <p>${meaning}</p>
    `;

    selectedCardsContainer.appendChild(selectedCardDiv);
}

// 結果を表示
function showResult() {
    // カード選択画面を非表示
    document.querySelectorAll('.card-selection').forEach(section => {
        section.classList.remove('active');
    });

    // 結果画面を表示
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.add('active');

    // 結果カードを生成
    generateResultCards();
}

// 結果カードを生成
function generateResultCards() {
    const resultCardsContainer = document.getElementById('resultCards');
    resultCardsContainer.innerHTML = '';

    // 1枚目のカード結果
    const firstResultCard = createResultCard(
        selectedCards.first.card,
        selectedCards.first.isPositive,
        1,
        '現在の状況'
    );

    // 2枚目のカード結果
    const secondResultCard = createResultCard(
        selectedCards.second.card,
        selectedCards.second.isPositive,
        2,
        'アドバイス・未来への展開'
    );

    resultCardsContainer.appendChild(firstResultCard);
    resultCardsContainer.appendChild(secondResultCard);
}

// 結果カードを作成
function createResultCard(card, isPositive, position, title) {
    const resultCardDiv = document.createElement('div');
    resultCardDiv.className = 'result-card';

    const orientation = isPositive ? '正位置' : '逆位置';
    const resultText = getResultText(card, position, isPositive);

    resultCardDiv.innerHTML = `
        <h3>${title}</h3>
        <h4>${card.nameJp} (${orientation})</h4>
        <div class="result-text">${resultText}</div>
    `;

    return resultCardDiv;
}

// 占いをリセット
function resetReading() {
    // 状態をリセット
    currentStep = 0;
    selectedCards = { first: null, second: null };

    // UIをリセット
    document.getElementById('resultSection').classList.remove('active');
    document.getElementById('stepIndicator').style.display = 'none';
    document.getElementById('startScreen').classList.remove('hidden');

    // 選択されたカードの表示をクリア
    document.getElementById('selectedCards1').innerHTML = '';
    document.getElementById('selectedCards2').innerHTML = '';
}

// 結果をシェア
function shareResult() {
    if (navigator.share) {
        // Web Share API を使用
        const firstCard = selectedCards.first;
        const secondCard = selectedCards.second;

        const shareText = `✨美女と野獣タロット占い結果✨\n\n現在の状況: ${firstCard.card.nameJp} (${firstCard.isPositive ? '正位置' : '逆位置'})\nアドバイス: ${secondCard.card.nameJp} (${secondCard.isPositive ? '正位置' : '逆位置'})\n\n#タロット占い #美女と野獣`;

        navigator.share({
            title: '✨美女と野獣タロット占い結果✨',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('シェアエラー:', err));
    } else {
        // フォールバック: クリップボードにコピー
        const shareText = `✨美女と野獣タロット占い結果✨\n\n現在の状況: ${selectedCards.first.card.nameJp} (${selectedCards.first.isPositive ? '正位置' : '逆位置'})\nアドバイス: ${selectedCards.second.card.nameJp} (${selectedCards.second.isPositive ? '正位置' : '逆位置'})\n\n#タロット占い #美女と野獣`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('結果をクリップボードにコピーしました！');
            });
        } else {
            // 最終フォールバック
            alert('この結果をシェアしてね！\n\n' + shareText);
        }
    }
}

// バイブレーション（対応端末のみ）
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// カード意味ポップアップを表示
function showCardMeaningModal(card, cardNumber, cardElement) {
    const modal = document.getElementById('cardMeaningModal');
    const modalCardName = document.getElementById('modalCardName');
    const modalCardNameEn = document.getElementById('modalCardNameEn');
    const modalPositiveMeaning = document.getElementById('modalPositiveMeaning');
    const modalNegativeMeaning = document.getElementById('modalNegativeMeaning');

    // モーダルの内容を設定
    modalCardName.textContent = card.nameJp;
    modalCardNameEn.textContent = card.nameEn;
    modalPositiveMeaning.textContent = card.positive.meaning;
    modalNegativeMeaning.textContent = card.negative.meaning;

    // モーダルを表示
    modal.style.display = 'block';

    // モーダル外をクリックで閉じる
    modal.onclick = function (event) {
        if (event.target === modal) {
            closeCardMeaningModal();
        }
    };

    // モーダルのデータを保存（閉じた後に正逆選択を表示するため）
    modal.dataset.cardId = card.id;
    modal.dataset.cardNumber = cardNumber;
}

// カード意味ポップアップを閉じる
function closeCardMeaningModal() {
    const modal = document.getElementById('cardMeaningModal');
    const cardId = modal.dataset.cardId;
    const cardNumber = modal.dataset.cardNumber;

    // モーダルを非表示
    modal.style.display = 'none';

    // 選択されたカードを取得
    const card = tarotCards.find(c => c.id == cardId);
    const selectedCardElement = document.querySelector(`.card-${cardId}.selected`);

    // 正位置/逆位置選択画面を表示
    showOrientationSelection(card, parseInt(cardNumber), selectedCardElement);
}

// 年代グループを選択
function selectAgeGroup(ageGroup) {
    // 全ての年代ボタンから選択状態を削除
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // 選択されたボタンに選択状態を追加
    document.querySelector(`[data-age="${ageGroup}"]`).classList.add('selected');

    // 年代グループを設定
    setAgeGroup(ageGroup);

    // 占いを始めるボタンを有効化
    document.getElementById('startReadingBtn').disabled = false;
} 