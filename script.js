
        const form = document.getElementById('transaction-form');
        const tableBody = document.querySelector('#transaction-table tbody');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpenseEl = document.getElementById('total-expense');
    const totalSavingsEl = document.getElementById('total-savings');
    const balanceEl = document.getElementById('balance');

        let transactions = [];

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = document.getElementById('type').value;

            if (description && !isNaN(amount) && type) {
                const transaction = { id: Date.now(), description, amount, type };
                transactions.push(transaction);
                addTransactionToTable(transaction);
                updateSummary();
                form.reset();
            }
        });

        function addTransactionToTable(transaction) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.type}</td>
                <td><button class="remove-btn" onclick="removeTransaction(${transaction.id})">Remove</button></td>
            `;
            tableBody.appendChild(row);
        }

        function removeTransaction(id) {
            transactions = transactions.filter(t => t.id !== id);
            renderTransactions();
            updateSummary();
        }

        function renderTransactions() {
            tableBody.innerHTML = '';
            transactions.forEach(addTransactionToTable);
        }

        function updateSummary() {
            const income = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + t.amount, 0);
            const expense = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
            const savings = transactions 
                .filter(t => t.type === 'savings')
                .reduce((sum, t) => sum + t.amount, 0);   
            const balance = income - expense - savings;

            totalIncomeEl.textContent = income.toFixed(2);
            totalExpenseEl.textContent = expense.toFixed(2);
            totalSavingsEl.textContent = savings.toFixed(2);
            balanceEl.textContent = balance.toFixed(2);
        }