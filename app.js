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

// responses taken from https://en.wikipedia.org/wiki/Steve_Jobs
// responses will simply be cycled through
let responses = [
    // response 1
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
    
    // response 2
    "In 1985, Jobs was forced out of Apple after a long power struggle with the company's \
    board and its then-CEO, John Sculley. That same year, Jobs took a few Apple employees \
    with him to found NeXT, a computer platform development company that specialized in \
    computers for higher-education and business markets. In addition, he helped to \
    develop the visual effects industry when he funded the computer graphics division \
    of George Lucas's Lucasfilm in 1986. The new company was Pixar, which produced the \
    first 3D computer-animated feature film Toy Story (1995) and went on to become a major \
    animation studio, producing over 25 films since.",

    // response 3
    "Schieble became pregnant with Jobs in 1954, when she and Jandali spent the summer \
    with his family in Homs. According to Jandali, Schieble deliberately did not involve \
    him in the process: \"Without telling me, Joanne upped and left to move to San Francisco \
    to have the baby without anyone knowing, including me\"",
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