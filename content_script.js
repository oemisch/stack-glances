// use mocks for debugging, Stack Overflow has a quota limit of 300 requests per day without registration
const useMock = false;
let foundResult = false;
const answerNum = 5;
let answers;
let answerIndex = 0;

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
    // const container = document.querySelector('.appbar'); // use to show results in left list
    const container = document.getElementById('rhs_block');
    if (container) {
        if(container.querySelector('.extracted-so-answer')) {
            container.querySelector('.extracted-so-answer').remove();
        }
        container.prepend(resultBox);

        container.querySelectorAll('code').forEach(code => {
            code.addEventListener('click', e => {
                copyToClipboard(code.textContent);
            });
        });
    }
}

function template(answer) {
    const container = document.createElement('div');
    container.classList.add('extracted-so-answer');
    const template = /*html*/`
        <div class="extracted-so-answer__header">
            <h3>
                ${answer.is_accepted ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="margin-right: 8px;" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="green" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>' : ''}
                Response from Stack Overflow (${answer.score} upvotes)
                <a href="${answer.link}" style='margin-left: 8px; display: inherit;'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                </a>
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
    `;
    container.innerHTML = template;
    return container;
}

const copyToClipboard = str => {
    const el = document.createElement('textarea'); 
    el.value = str;                                
    el.setAttribute('readonly', '');               
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                     
    document.body.appendChild(el);                 
    const selected =            
      document.getSelection().rangeCount > 0       
        ? document.getSelection().getRangeAt(0)    
        : false;                                   
    el.select();                                   
    document.execCommand('copy');                  
    document.body.removeChild(el);                 
    if (selected) {                                
      document.getSelection().removeAllRanges();   
      document.getSelection().addRange(selected);  
    }
  };