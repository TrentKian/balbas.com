function searchQuestion() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm.trim()) {
        alert("Please enter a question!");
        return;
    }

    fetch('search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `question=${encodeURIComponent(searchTerm)}`
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.error) {
        resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
        return;
    }

    if (data.length === 0) {
        resultsDiv.innerHTML = `<p>No results found.</p>`;
        return;
    }

    data.forEach(item => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<strong>Q:</strong> ${item.question}`;

        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.innerHTML = `<strong>A:</strong> ${item.answer}`;

        resultsDiv.appendChild(questionDiv);
        resultsDiv.appendChild(answerDiv);
    });
}