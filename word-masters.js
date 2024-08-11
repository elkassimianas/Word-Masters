const WORDL_URL = "https://words.dev-apis.com/validate-word";

function isLetter(letter)
{
    return /^[a-zA-Z]$/.test(letter);
}

function getBoxField(caseNum)
{
    const boxLetter = ".box-" + caseNum;
    const letterBox = document.querySelector(boxLetter);
    return (letterBox);
}

function init()
{
    let index = 0;
    // let lines = 0;
    let boxObject;

    document.addEventListener("keydown", 
        function(event)
        {
            console.log(event.key)
            if (event.key == "Enter" && index == 5)
            {
                isValidWord();
            }
            else if (event.key == "Backspace" && index != 0)
            {
                boxObject.value = "";
                index -= 1;
                boxObject = getBoxField(index);
            }
            else if (!isLetter(event.key))
            {
                event.preventDefault();
            }
            else if (isLetter(event.key) && index != 5)
            {
                index += 1;
                boxObject = getBoxField(index);
                boxObject.value = event.key.toUpperCase();
            }
        }
    )
}

init();