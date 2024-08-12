const POST_URL = "https://words.dev-apis.com/validate-word";
const GET_URL = "https://words.dev-apis.com/word-of-the-day";

async function isValidWord(checkword)
{
    const response = await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(
        {
          word: checkword
        }),
        headers:
        {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    
    const data = await response.json();
    if (!response.ok)
    {
        console.log(data.description);
        return ;
    }
    console.log(`POST: ${data.validWord}`);
    return (data.validWord);
}

async function getDayWord() {
    const promise = await fetch(GET_URL);
    const data = await promise.json();
    return data.word;
}

function validWord (word, validWord)
{
    console.log(`FUNCTION :: word of the day: ${validWord}`);
}

function notValid()
{
    const box = document.getElementById("box-1");
    box.style.border = "3px solid red"; 
}

function isLetter(letter)
{
    return /^[a-zA-Z]$/.test(letter);
}

function getBoxField(caseNum)
{
    const boxLetter = "box-" + caseNum;
    const letterBox = document.getElementById(boxLetter);
    return (letterBox);
}

async function init()
{
    let index = 0;
    let word = "";
    // let lines = 0;
    let boxObject;
    let vWord;

    vWord = await getDayWord();
    document.addEventListener("keydown", 
        async function(event)
        {
            if (event.key == "Enter" && index === 5)
            {
                if(await isValidWord(word))
                    validWord(word, vWord);
                else
                    notValid();
            }
            else if (event.key == "Backspace" && index !== 0)
            {
                boxObject.value = "";
                index--;
                word = word.substring(0, word.length - 1);
                boxObject = getBoxField(index);
            }
            else if (!isLetter(event.key))
                event.preventDefault();
            else if (isLetter(event.key) && index !== 5)
            {
                index++;
                boxObject = getBoxField(index);
                boxObject.value = event.key.toUpperCase();
                word += event.key;
            }
        }
    )
}

init();