// Get Elements

const createNodeBtn = document.getElementById("create-node-btn");
const nodeList = document.getElementById("node-list");



// Logic

((x) => console.log(x)) ("JOJ");



// Event Listeners

// Create new node 
createNodeBtn.addEventListener("click", () => {
    let newNode = stringToElement(`
    <li class="node">
        <div class="wave-type">
            <span>Wave</span>
            <select>
                <option value="sine">Sine</option>
                <option value="triangle">Triangle</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="square">Square</option>
                <option value="function">Function</option>
                <option value="polynomial">Polynomial</option>
            </select>
        </div>
        <div class="node-contents regular-wave">
            <div class="freq-slider-container">
                <span>Frequency</span>
                <input type="range" class="slider freq-slider" min="0" max="100">
            </div>
            <div class="amp-slider-container">
                <span>Amplitude</span>
                <input type="range" class="slider amp-slider" min="0" max="100">
            </div>
            <div class="period-slider-container">
                <span>Period</span>
                <input type="range" class="slider period-slider" min="0" max="100">
            </div>
        </div>
        <div class="btn-container">
            <button class="btn del-node-btn"><p>Delete node</p></button>
        </div>
    </li>`);
    
    // update node type on creation and add event listener to update on a change TODO
    let typeSelect = newNode.getElementsByClassName("wave-type")[0];
    typeSelect.addEventListener("change", updateNodeType);

    // delete node button
    let delNodeBtn = newNode.getElementsByClassName("del-node-btn")[0];
    delNodeBtn.addEventListener("click", deleteNode);

    nodeList.appendChild(newNode);
});



// Functions

function stringToElement(string) {
    const template = document.createElement("template");
    template.innerHTML = string.trim();
    return template.content.firstElementChild;
}

// Add/remove html to node depending on it's type.
function updateNodeType(e) {
    let node = e.target.parentElement.parentElement;
    let contents;

    // Determine which contents need to be added
    switch (e.target.value) {
        case "sine":
        case "triangle":
        case "sawtooth":
        case "square":
            // To improve performance and preserve slider values - just return if nothing needs to be changed. Repeated for each case
            if (node.getElementsByClassName("node-contents")[0].classList.contains("regular-wave")) {
                return;
            }

            // Add new contents
            contents = stringToElement(`
            <div class="node-contents regular-wave">
                <div class="freq-slider-container">
                    <span>Frequency</span>
                    <input type="range" class="slider freq-slider" min="0" max="100">
                </div>
                <div class="amp-slider-container">
                    <span>Amplitude</span>
                    <input type="range" class="slider amp-slider" min="0" max="100">
                </div>
                <div class="period-slider-container">
                    <span>Period</span>
                    <input type="range" class="slider period-slider" min="0" max="100">
                </div>
            </div>
            `);
            break;

        case "function":
            if (node.getElementsByClassName("node-contents")[0].classList.contains("function-wave")) {
                return;
            }

            // Add new contents
            contents = stringToElement(`
            <div class="node-contents function-wave">
                <span>Function</span>
                <input type="text" name="wave-function">
                <br>
                <span>Lower bound</span>
                <input type="number" name="lower-bound">
                <br>
                <span>Uppder bound</span>
                <input type="number" name="upper-bound">
            </div>
            `);
            break;
        case "polynomial":
            if (node.getElementsByClassName("node-contents")[0].classList.contains("polynomial-wave")) {
                return;
            }
            
            // Add new contents
            contents = stringToElement(`
            <div class="node-contents"></div>
            `);
            node.appendChild(contents);
            break;
        default:
            alert("Error choosing node type.");
    }
    
    // Adding and removing contents
    node.appendChild(contents);
    node.children[1].remove();
}

function deleteNode(e) {
    let node = e.target.closest(".node");
    node.remove();
}




// Other
let audio1 = new Audio();
audio1.src = "music\\Better Together - Jack Johnson.mp3";


let audioContext = new AudioContext();
audioContext.createBuffer(1, audioContext.sampleRate * 10, audioContext.sampleRate);


