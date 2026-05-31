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
  margin-right: 250px; /* matches sidebar width */
}

.input-div {
  display: flex;
  flex-direction: column;
  width: min(90%, 900px);
  min-width: 0;
  padding: 40px 20px;
  height: calc(100vh - 95px);
  box-sizing: border-box;
}

label {
  font-size: 12px;
  margin-bottom: 4px;
}

.input-mirror-container {
  width: 100%;
  margin-bottom: 16px;
}

.regex-input {
  width: 100%;
  box-sizing: border-box;
  font-size: 15px;
  padding: 0 20px;
  height: 52px;
  background-color: transparent;
  border: 1px solid rgb(10, 49, 10);
  color: inherit;
  font-family: monospace;
}

.mirror-container {
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 150px;
}

.regex-textarea {
  position: absolute;
  inset: 0;
  font-size: 15px;
  font-family: monospace;
  border: 1px solid rgb(10, 49, 10);
  background-color: transparent;
  z-index: 1;
  resize: none;
  line-height: 22px;
  color: inherit;
  padding: 8px;
  box-sizing: border-box;
}

.mirror {
  position: absolute;
  inset: 0;
  padding: 8px;
  z-index: 2;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  color: transparent;
  font-family: monospace;
  font-size: 15px;
  line-height: 22px;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .main-content {
    margin-right: 0;
  }

  .content-container {
    flex-direction: column;
  }

  .input-div {
    height: auto;
    min-height: 60vh;
  }

  .mirror-container {
    min-height: 200px;
    height: 40vh;
  }
}

@media (max-width: 480px) {
  .input-div {
    padding: 24px 12px;
    width: 100%;
  }

  .regex-input,
  .regex-textarea,
  .mirror {
    font-size: 13px;
  }

  .regex-input {
    height: 44px;
    padding: 0 12px;
  }
}
</style>