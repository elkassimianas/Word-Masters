const POST_URL = "https://words.dev-apis.com/validate-word";
const GET_URL = "https://words.dev-apis.com/word-of-the-day";
const LoadingDiv = document.getElementsByClassName('info-bar')[0];

async function isValidWord(checkword) {
    setLoading(true);
    const response = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify( {
          word: checkword
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    
    const data = await response.json();
    if (!response.ok) {
        console.log(data.description);
        return ;
    }
    setLoading(false);
    return (data.validWord);
}

async function getDayWord() {
    setLoading(true);
    const promise = await fetch(GET_URL);
    const data = await promise.json();
    setLoading(false);
    return data.word;
}

function validWord (word, validWord, idIndex) { 
    let idName;
    let boxNum;

    const vwordParts = validWord.split("");
    const map = makeMap(vwordParts);

    for (let i = 0; i < 5; i++) {
        if (word[i] === validWord[i]) {
            boxNum = idIndex + i;
            idName = "box-" + boxNum;
            const box = document.getElementById(idName);
            box.classList.add('color-valid');
            map[word[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (word[i] === validWord[i]) {
            // do nothing
        }
        else if (validWord.includes(word[i]) && map[word[i]] > 0) {
            boxNum = idIndex + i;
            idName = "box-" + boxNum;
            const box = document.getElementById(idName);
            box.classList.add('color-wrong-place');
            map[word[i]]--;
        }
        else {
            boxNum = idIndex + i;
            idName = "box-" + boxNum;
            const box = document.getElementById(idName);
            box.classList.add('color-not-valid');
        }
    }
    if (word === validWord) {
        alert(`You win`);
        const headers = document.getElementsByClassName('header');
        for (let i = 0; i < headers.length; i++) {
            headers[i].classList.add('colorRotate');
        }
        return (1)
    }
    if (idIndex + 4 >= 30) {
        alert(`You lose, the word was ${validWord}`);
        return(1);
    }
}

function makeMap(array) {
    const obj = {};

    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++;
        }
        else {
            obj[letter] = 1;
        }
    }
    return obj;
}

function notValid(boxNum) {
    let idName = "";

    for (let i = boxNum; i < boxNum + 5; i++) {
        idName = "box-" + i;
        const box = document.getElementById(idName);
        box.classList.add('warning-border');
    }

    for (let i = boxNum; i < boxNum + 5; i++) {
        idName = "box-" + i;
        const box = document.getElementById(idName);
        setTimeout(() => {
            box.classList.remove('warning-border');
        }, 500);
    }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
    LoadingDiv.classList.toggle('show', isLoading);
}

function getBoxField(caseNum) {
    const boxLetter = "box-" + caseNum;
    const letterBox = document.getElementById(boxLetter);
    return (letterBox);
}

async function init() {
    let index = 1;
    let word = "";
    let lines = [1, 5];
    let boxObject;
    let vWord;

    boxObject = getBoxField(index);
    vWord = await getDayWord();
    document.addEventListener("keydown", 
        async function(event) {
            if (event.key == "Enter" && (index === lines[1])) {
                if(await isValidWord(word)) {
                    if (validWord(word, vWord, index - 4))
                            index = -35;
                    index++;
                    boxObject = getBoxField(index);
                    lines[0] += 5;
                    lines[1] += 5;
                    word = "";
                }
                else
                    notValid(index - 4);
            }
            else if (event.key == "Backspace" && (index >= lines[0])) {
                if ((index > lines[0]) && (word.length <= 4))
                    index--;
                boxObject = getBoxField(index);
                word = word.substring(0, word.length - 1);
                boxObject.value = "";
                if ((index === 5) && word.length === 5) {
                    index--;
                    boxObject = getBoxField(index);
                }
            }
            else if (!isLetter(event.key))
                event.preventDefault();
            else if (isLetter(event.key) && ((index >= lines[0]) && (index <= lines[1])))
            {
                if (word.length < 5) {
                    word += event.key;
                    boxObject.value = event.key.toUpperCase();
                }
                else if (word.length === 5) {
                    word = word.slice(0, -1) + event.key;
                    boxObject.value = event.key.toUpperCase();
                }
                if (index < lines[1]) {
                    index++;
                    boxObject = getBoxField(index);
                }
            }
        }
    )
}

init();