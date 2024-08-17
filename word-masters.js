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

function validWord (word, validWord, idIndex)
{
    
    
    // let idName;
    console.log(`validWord: ${validWord}`);
    // let duplicate;
    console.log(`inIndex: ${idIndex}`);
    for(let index = 0; index < 5; index++)
    {
        for(let i = 0; i < 5; i++)
        {
            if ((word[index] === validWord[i]) && (index === i))
            {
                // duplicate += word[index];
                idName = "box-" + idIndex;
                const box = document.getElementById(idName);
                // if (index === i)
                    box.classList.add('color-valid');
                // else if (index !== i)
                    // box.classList.add(`color-not-valid`);
                break ;
            }
            else if ((word[index] !== validWord[i]) && (i === 4))
            {
                idName = "box-" + idIndex;
                const box = document.getElementById(idName);
                box.classList.add('color-not-valid');
            }
        }
        idIndex++;
    }
    //         else if ((word[index] === validWord[i]) && (index !== i))
    //         {
    //             let double = 0;

    //             duplicate += word[index];
    //             idIndex += index;
    //             idName = "box-" + idIndex;
    //             for (let idup = 0; idup < duplicate.length; idup++)
    //             {
    //                 if (duplicate[idup] === validWord[i])
    //                     double = 1;
    //                 else
    //                     double = 0;
    //             }
    //             if (!double)
    //             {
    //                 const box = document.getElementById(idName);
    //                 box.classList.add(`color-wrong-place`)
    //             }
    //         }
    //         else if ((word[index] !== validWord[i]) && (i === 4))
    //         {
    //             duplicate += word[index];
    //             idIndex += index;
    //             idName = "box-" + idIndex;
    //             const box = document.getElementById(idName);
    //             box.classList.add(`color-not-valid`);
    //         }
    //     }
    // }
}

function notValid(boxNum) {
    
    let idName = "";

    for (let i = boxNum; i < boxNum + 5; i++)
    {
        idName = "box-" + i;
        const box = document.getElementById(idName);
        box.classList.add('warning-border');
    }
    for (let i = boxNum; i < boxNum + 5; i++)
    {
        idName = "box-" + i;
        const box = document.getElementById(idName);
        setTimeout(() => {
            box.classList.remove('warning-border');
        }, 500);
    }
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
    let index = 1;
    let word = "";
    let lines = [1, 5];
    let boxObject;
    let vWord;

    boxObject = getBoxField(index);
    vWord = await getDayWord();
    document.addEventListener("keydown", 
        async function(event)
        {
            if (event.key == "Enter" && (index === lines[1]))
            {
                console.log(`Event Key ENTER: ${event.key}`);
                console.log(`Word: ${word}`);
                if(await isValidWord(word))
                {
                    validWord(word, vWord, index - 4);
                    index++;
                    console.log(`index: ${index}`);
                    boxObject = getBoxField(index);
                    lines[0] += 5;
                    lines[1] += 5;
                    word = "";
                }
                else
                    notValid(index - 4);
            }
            else if (event.key == "Backspace" && (index >= lines[0]))
            {
                console.log(`index BACKSPACE: ${index}`);
                if ((index > lines[0]) && (word.length <= 4))
                    index--;
                boxObject = getBoxField(index);
                word = word.substring(0, word.length - 1);
                boxObject.value = "";
                if ((index === 5) && word.length === 5)
                {
                    index--;
                    boxObject = getBoxField(index);
                }
            }
            else if (!isLetter(event.key))
                event.preventDefault();
            else if (isLetter(event.key) && ((index >= lines[0]) && (index <= lines[1])))
            {
                if (word.length < 5)
                {
                    word += event.key;
                    boxObject.value = event.key.toUpperCase();
                }
                else if (word.length === 5)
                {
                    word = word.slice(0, -1) + event.key;
                    boxObject.value = event.key.toUpperCase();
                }
                if (index < lines[1])
                {
                    index++;
                    boxObject = getBoxField(index);
                }
            }
        }
    )
}

init();