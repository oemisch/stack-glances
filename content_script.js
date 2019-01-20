// use mocks for debugging, Stack Overflow has a quota limit of 300 requests per day without registration
const useMock = true;
let foundResult = false;
const answerNum = 5;
let answers;
let answerIndex = 0;

const images = {
    check: chrome.extension.getURL("icons/check.svg"),
    left: chrome.extension.getURL("icons/left.svg"),
    right: chrome.extension.getURL("icons/right.svg")
};

document.querySelectorAll('#search .g').forEach(result => {
    if (!foundResult && result.textContent.indexOf('stackoverflow') !== -1) {
        foundResult = true;
        const question_id = /\b(?:\/questions\/)([0-9]+)(?:\/)/g.exec(result.querySelector('.r a').getAttribute('href'))[1];
        console.log('Found result with question id:', question_id);
        if (!useMock) {
            fetch(`https://api.stackexchange.com/2.2/questions/${question_id}/answers?pagesize=${answerNum}&order=desc&sort=votes&site=stackoverflow&filter=!-*jbN.9m(dML`)
                .then(response => response.json())
                .then(data => {
                    answers = data.items;
                    showAnswer();
                })
                .catch(e => {
                    console.error('Error while loading StackOverflow answers', e);
                });
        } else {
            answers = mock_data.items;
            showAnswer();
        }
    }
});

function showAnswer(index = -1) {
    if(index !== -1) {
        answerIndex = index;
    } else {
        answerIndex = answers.findIndex(a => a.is_accepted) || 0;
    }
    answerIndex = Math.min(answers.length - 1, answerIndex);
    answerIndex = Math.max(0, answerIndex);
    const answer = answers[answerIndex];

    const resultBox = template(answer);
    const appBar = document.querySelector('.appbar');

    if(document.querySelector('#topstuff .extracted-so-answer')) {
        document.querySelector('#topstuff .extracted-so-answer').remove();
    }
    document.getElementById('topstuff').appendChild(resultBox);
}

function template(answer) {
    const container = document.createElement('div');
    container.classList.add('extracted-so-answer');
    const template = /*html*/`
        <div class="extracted-so-answer__header">
            <h3>
                ${answer.is_accepted ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="margin-right: 8px;" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="green" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' : ''}
                Response from Stack Overflow (${answer.score} upvotes)
            </h3>
            <div class="extracted-so-answer__controls">
                <a href="#" onclick="showAnswer(answerIndex - 1)" class="${answerIndex === 0 ? 'disabled' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </a>
                <a href="#" onclick="showAnswer(answerIndex + 1)" class="${answers.length <= answerIndex + 1 ? 'disabled' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </a>
            </div>
        </div>
        <div class="extracted-so-answer__answer">
            ${answer.body}
        </div>
        <a href="${answer.link}">Open Answer</a>
    `;
    container.innerHTML = template;
    return container;
}