<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { regexDictionary } from "../constants/dict"
import RegexVisualiser from './components/RegexVisualiser.vue'


const text = ref<string>('')
const inputText = ref<string>('')
const error = ref<string | null>(null)

const highlightedText = computed(() => {
  const found = matchRegex();
  return found
})





//to parse into regex
function parseRegex(input: string, returnString: boolean = false): RegExp | string {
  // ?: means it catches nothing
  if (!returnString && !input) return /(?:)/g
  if (returnString && !input) return ""
  
  //RegExp expects a string, so we parse (if we had a regex expression in the input) into a string.
  //Basically kinda by taking the slashes and flags out.
  if (input.startsWith('/') && input.lastIndexOf('/') > 0) {
    const last = input.lastIndexOf('/')
    const pattern = input.slice(1, last)
    const flags = input.slice(last + 1)
    const finalFlags = flags.includes('g') ? flags : flags + 'g'
    return returnString ? pattern : new RegExp(pattern, finalFlags)
    
  }
  return returnString? input: new RegExp(input, 'g')
}



function matchRegex() {
  error.value = null
  try {
    const re = parseRegex(inputText.value)
    const found = text.value.match(re)
    if (found && found.length) {
      return text.value.replace(re, match => `<mark class="highlight">${match}</mark>`)
    } else {
      return text.value
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  }
}



const regexExplanation = computed(() => {
  const input = parseRegex(inputText.value, true) as string; //this is our string.
  if (!input) return 'Enter a regular expression to see an explanation.';
  
  const explanations: string[] = [];
  const foundTokens = new Set<string>();


  for (const token in regexDictionary) {
    // just to escape special characters in the token itself for the RegExp constructor
    const escapedToken = token.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    const re = new RegExp(escapedToken, 'g');
    
    if (re.test(input) && !foundTokens.has(token)) {
      explanations.push(`${token}: ${regexDictionary[token]}`);
      foundTokens.add(token);
    }
  }

  //some specific use-cases. Also TODO: make flag selector so humans don't manually add flags
  if (input.includes('[') && input.includes(']')) {
    explanations.push('[...]: Defines a Character Set. It matches any *single* character within the brackets (e.g., `[a-z]` matches a single lowercase letter).');
  }
  
  if (inputText.value.startsWith('/') && inputText.value.lastIndexOf('/') > 0) {
    const flags = inputText.value.slice(inputText.value.lastIndexOf('/') + 1);
    if (flags.includes('g')) explanations.push('**g flag**: Global search. Finds *all* matches, not just the first.');
    if (flags.includes('i')) explanations.push('**i flag**: Case-insensitive search.');
  }


  return explanations.length > 0
    ? 'Regex Explanation\n' + explanations.join('\n\n')
    : 'No common patterns found in the dictionary.';
});

</script>

<template>
  <div class="container">
    <Navbar />
    <div class="content-container">
      <div class="main-content">
        <div class="input-div">
          <label>Your regex input here</label>
          <div class="input-mirror-container">
            <input
              type="text"
              v-model="inputText"
              class="regex-input"
              placeholder="Enter regex (e.g. [A-V] or /[A-V]/g)"
            />
            <div class="inputMirror">
              <RegexVisualiser :regexText="inputText" ></RegexVisualiser>
            </div>
            
          </div>
          <label>Your text content here</label>
          <div class="mirror-container">  
            <textarea v-model="text" class="regex-textarea" id="text-area" placeholder="Enter test string here"></textarea> 
            <div id="mirror" class="mirror" v-html="highlightedText"></div>
          </div>
        </div>
      </div>
      <Sidebar :explanations="regexExplanation" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: calc(100vh - 55px);
    margin-top: 55px;
  }

  .main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-right: 200px;
  }

  .input-div {
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 90%; 
    min-width: 300px; 
    padding: 50px 20px;
    height: calc(100vh - 105px);
  }
  
  .regex-input {
    font-size: 15px;
    padding: 20px 30px;
    height: 60px;
    display: flex;
    width: 94%;
    background-color: transparent;
    border: 1px solid rgb(10, 49, 10);
    margin: 2px;
    position: relative;
    z-index: 1;
  }

  .regex-textarea {
    position: absolute;
    margin: 2px;
    font-size: 15px;
    border: 1px solid rgb(10, 49, 10);
    background-color: transparent;
    z-index: 1;
    height: 100%;
    width: 100%;
    resize: none;
    line-height: 22px;
    color: inherit;
  }

  label {
    font-size: 12px;
  }

  .mirror-container {
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    min-height: 200px;
  }


  .input-mirror-container {
    position: relative;
    width: 100%;
    margin: 2px 0 8px 0;
  }

  .input-mirror {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    padding: 20px 30px;
    line-height: 22px; 
  }

  .mirror {
    position: absolute;
    background-color: transparent;
    margin-top: 2px;
    margin-left: 2px;
    padding: 3px;
    z-index: 2;
    white-space: pre-wrap;
    word-wrap: break-word;
    pointer-events: none;
    color: transparent;
    font-family: monospace;
    font-size: 15px;
    height: 100%;
    width: 100%;
  }

  .explanation, .error {
    margin-top: 20px;
  }

  .error {
    color: red;
  }

  @media (max-width: 900px) {
    .main-content {
      margin-right: 0;
    }

    .content-container {
      flex-direction: column;
    }
  }
  
  @media (max-width: 600px) {
    .input-div {
      width: 95%;
      padding: 30px 10px;
    }

    .regex-input, .regex-textarea, .mirror {
      font-size: 14px;
    }
    
    .regex-input {
      padding: 10px 15px;
      height: 40px; 
    }
  }
</style>