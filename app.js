// Return a row that contains a <p> element
function createConversationRow(text, is_prompt) {
    let row = document.createElement("div");
    row.className = "row";
    let paragraph = document.createElement("p");
    paragraph.className = is_prompt ? "prompt-text" : "response-text";
    paragraph.innerText = text;
    row.appendChild(paragraph);

    return {"row": row, "paragraph": paragraph};
}

function capturePromptText(promptID) {
    let prompt = document.getElementById(promptID);
    let promptText = prompt.value;
    prompt.value = "";
    return promptText;
}

// Take an HTML node and some text, gradually fill the HTML node with the text;
// Assumes that the inner text is empty; will not clear existing inner text
async function type(node, text, sleep_interval) {
    for (var i = 0; i < text.length; i++) {
        node.innerText = text.substring(0, i+1);
        await new Promise(r => setTimeout(r, sleep_interval));
    }
}

// responses will simply be cycled through
let responses = [
    // Tell me about Steve Jobs: https://en.wikipedia.org/wiki/Steve_Jobs
    "Jobs was born in San Francisco to a Syrian father and German-American mother. \
    He was adopted shortly after his birth. Jobs attended Reed College in 1972 before \
    withdrawing that same year. In 1974, he traveled through India seeking \
    enlightenment before later studying Zen Buddhism. He and Wozniak co-founded \
    Apple in 1976 to sell Wozniak's Apple I personal computer. Together the duo gained \
    fame and wealth a year later with production and sale of the Apple II, one of the \
    first highly successful mass-produced microcomputers. Jobs saw the commercial \
    potential of the Xerox Alto in 1979, which was mouse-driven and had a graphical \
    user interface (GUI). This led to the development of the unsuccessful Apple Lisa \
    in 1983, followed by the breakthrough Macintosh in 1984, the first mass-produced \
    computer with a GUI. The Macintosh introduced the desktop publishing industry in \
    1985 with the addition of the Apple LaserWriter, the first laser printer to feature \
    vector graphics.",
    
    // Tell me about Albert Einstein: https://en.wikipedia.org/wiki/Albert_Einstein
    "Albert Einstein ( 14 March 1879 - 18 April 1955) was a German-born theoretical\
    physicist, widely acknowledged to be one of the greatest and most influential \
    physicists of all time. Einstein is best known for developing the theory of \
    relativity, but he also made important contributions to the development of \
    the theory of quantum mechanics. Relativity and quantum mechanics are the two \
    pillars of modern physics. His mass-energy equivalence formula E = mc2, which \
    arises from relativity theory, has been dubbed \"the world's most famous equation\". \
    His work is also known for its influence on the philosophy of science. He received \
    the 1921 Nobel Prize in Physics \"for his services to theoretical physics, and \
    especially for his discovery of the law of the photoelectric effect\", a pivotal \
    step in the development of quantum theory. His intellectual achievements and originality \
    resulted in \"Einstein\" becoming synonymous with \"genius\". Einsteinium, one \
    of the synthetic elements in the periodic table, was named in his honor.",

    // Tell me about Winston Churchill: https://en.wikipedia.org/wiki/Winston_Churchill
    "Sir Winston Leonard Spencer Churchill (30 November 1874 - 24 January 1965) was \
    a British statesman, soldier, and writer who served as Prime Minister of the \
    United Kingdom twice, from 1940 to 1945 during the Second World War, and again \
    from 1951 to 1955. Apart from two years between 1922 and 1924, he was a Member \
    of Parliament (MP) from 1900 to 1964 and represented a total of five constituencies. \
    Ideologically an economic liberal and imperialist, he was for most of his career \
    a member of the Conservative Party, which he led from 1940 to 1955. He was a \
    member of the Liberal Party from 1904 to 1924.",
]

let counter = 0;

const convWindow = document.getElementById("conversation-window");
const delayRange = document.getElementById("text-delay");

addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let promptText = capturePromptText("prompt");
        let prompt = createConversationRow(promptText, true);
        let resp = createConversationRow("", false);
        convWindow.appendChild(prompt.row);
        convWindow.appendChild(resp.row);
        type(resp.paragraph, responses[counter % responses.length], delayRange.value);

        counter++;
    }
})