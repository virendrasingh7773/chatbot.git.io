// color piker
let color = document.getElementById("color");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
color.addEventListener("input", colorfunction)
function colorfunction() {
    header.style.cssText = `background-color: ${color.value};`
    footer.style.cssText = `background-color: ${color.value};`
}
// -----------------
let searchbox = document.getElementsByClassName("search")[0];
let searchicon = document.getElementById("search-icon");
let input = document.getElementById("input");
let conversation = document.getElementsByClassName("conversation")[0];
let loading = document.getElementsByClassName("loading")[0];
searchicon.addEventListener("click", clickfunction);
function clickfunction() {
    if (input.value == "") {
        input.placeholder = "Type something to Search"
    }
    else {
        loading.style.cssText = "display:flex;"
        myfunction(input.value)
    }
}
// language selection
let lanbtn = document.getElementsByClassName("btn")
function langfunction(){
    lanbtn[1].classList.remove("language")
    lanbtn[0].classList.add("language")
}
function langfunction2(){
    lanbtn[0].classList.remove("language")
    lanbtn[1].classList.add("language")
}
let language = document.getElementsByClassName("language")

let count = 0;
let apiKey = "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"
// let apikey = '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';
// let apiKey = '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'
// let apiKey = "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"
const myfunction = async (message) => {
    try {
             
    
        let data = await fetch('https://api.openai.com/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify(
                    {
                        // model: "text-davinci-003",
                        model: "gpt-3.5-turbo",
                        // prompt: message +"in"+language[0].innerHTML,
                        messages: [{role: 'user', content: message}],
                        // prompt: "hello gpt",
                        max_tokens: 3000,
                        // temperature: 1
                    }
                    )
            })





        let newdata = await data.json()
        let quebox = document.createElement("div");
        let que_p = document.createElement("p")
        quebox.className = "que-box"
        conversation.appendChild(quebox)
        que_p.innerHTML = input.value;
        quebox.appendChild(que_p)
        let ansbox = document.createElement("div");
        let ans_p = document.createElement("p")
        ansbox.className = "ans-box"
        conversation.appendChild(ansbox)
        ans_p.innerHTML = newdata.choices[0].message.content;
        ans_p.id = "ans_p" + count
        ansbox.appendChild(ans_p)
        let copy = document.createElement("iconify-icon")
        copy.icon = "fluent:copy-24-regular"
        copy.className = "copy"
        copy.id = "copy" + count
        ansbox.appendChild(copy)
        loading.style.cssText = "display:none"
        input.value = "";
        copy.addEventListener("click", () => {
            copy.icon = "fluent:copy-24-filled"
            setTimeout(() => {
                copy.icon = "fluent:copy-24-regular"
            }, 1000);
        })
        console.log(count)
        copy.onclick = copyfunction(ans_p.id)
        count++

    } catch (error) {
        loading.innerHTML = "Not Found"
        loading.style.cssText = "color:red"
    }
}


function copyfunction(id) {
    let copymsg = document.getElementById(id).innerHTML;
    navigator.clipboard.writeText(copymsg)
}