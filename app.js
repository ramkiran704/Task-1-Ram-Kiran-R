const CORE_INITIAL_STATE = {
    transactions: [],
    budgets: {
        groceries: { spent: 0, limit: 300 },
        utilities: { spent: 0, limit: 150 },
        entertainment: { spent: 0, limit: 100 },
        others: { spent: 0, limit: 50 }
    }
};

function readState() {
    const rawData = localStorage.getItem('decodelabs_state');
    return rawData ? JSON.parse(rawData) : JSON.parse(JSON.stringify(CORE_INITIAL_STATE));
}

function commitState(state) {
    localStorage.setItem('decodelabs_state', JSON.stringify(state));
}

function refreshSums(state) {
    for (let cat in state.budgets) { state.budgets[cat].spent = 0; }
    state.transactions.forEach(item => {
        const key = item.category.toLowerCase();
        if (state.budgets[key]) { state.budgets[key].spent += item.amount; }
    });
    commitState(state);
}

document.addEventListener('DOMContentLoaded', () => {
    const state = readState();
    refreshSums(state);
    const path = window.location.pathname;

    if (path === '/dashboard' || path === '/dashboard.html') {
        renderDashboard(state);
    } else if (path === '/budgets' || path === '/budgets.html') {
        renderBudgets(state);
    } else if (path === '/transactions' || path === '/transactions.html') {
        renderLedger(state);
    }
});

function renderDashboard(state) {
    const form = document.getElementById('transaction-form');
    const list = document.getElementById('transaction-list');
    paintBars(state);
    injectRows(state, list, 5);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.getElementById('desc').value.trim();
            const amount = parseFloat(document.getElementById('amount').value);
            const category = document.getElementById('category').value;

            state.transactions.push({
                uid: Date.now(),
                description: desc,
                amount: amount,
                category: category,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            });

            refreshSums(state);
            paintBars(state);
            injectRows(state, list, 5);
            form.reset();
        });
    }
}

function renderBudgets(state) {
    const form = document.getElementById('budget-cap-form');
    paintBars(state);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const key = document.getElementById('budget-category').value.toLowerCase();
            const limit = parseFloat(document.getElementById('cap-amount').value);

            if (state.budgets[key]) {
                state.budgets[key].limit = limit;
                commitState(state);
                paintBars(state);
                form.reset();
                alert(`Limit changed for ${key.toUpperCase()}`);
            }
        });
    }
}

function renderLedger(state) {
    const list = document.querySelector('.transaction-list');
    injectRows(state, list, null);
}
function paintBars(state) {
    for (let key in state.budgets) {
        const textNode = document.getElementById(`${key}-text`);
        const fillNode = document.getElementById(`${key}-progress`);
        if (textNode && fillNode) {
            const node = state.budgets[key];
            const pct = node.limit > 0 ? Math.min((node.spent / node.limit) * 100, 100) : 0;
            textNode.textContent = `$${node.spent.toFixed(2)} / $${node.limit.toFixed(2)}`;
            fillNode.style.width = `${pct}%`;
            fillNode.className = "progress-fill";
            if (pct >= 100) fillNode.classList.add('progress-red');
            else if (pct >= 80) fillNode.classList.add('progress-yellow');
            else fillNode.classList.add('progress-green');
        }
    }
}
function injectRows(state, container, limit) {
    if (!container) return;
    container.innerHTML = '';
    const items = [...state.transactions].reverse();
    const sliced = limit ? items.slice(0, limit) : items;

    if (sliced.length === 0) {
        container.innerHTML = `<li>No entries saved.</li>`;
        return;
    }
    sliced.forEach(x => {
        const li = document.createElement('li');
        li.className = "ledger-item-node";
        li.innerHTML = `<div><strong>${x.description}</strong><small>${x.category} &bull; ${x.date}</small></div><span class="currency-tag">-$${x.amount.toFixed(2)}</span>`;
        container.appendChild(li);
    });
}