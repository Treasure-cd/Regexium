<script setup lang="ts">
import { ref, computed } from 'vue'
import { regexSpecificDictionary } from '../../constants/dict'

interface RegexToken {
  text: string
  label: string | null
}

const props = defineProps<{
  regexText: string
}>()

  const explanationText = ref<string>("");
  const explanationColours: string[] = [
  '#FFFF66', 
  '#B0E6C2',
  '#B3E5FC',
  '#FFC0CB',
  '#E6E6FA',
  '#FFD580',
  '#B2EBF2',
  '#F0E68C',
  '#FFA07A',
  '#F7B2C2'
];
  const tokens = computed<RegexToken[]>(() => {
  const input = props.regexText;

  const tokenizeRegexLocal = (input: string) => {
    const localResult: RegexToken[] = [];
    let currentInput = input;
    let literalBuffer = ''; //added this so successive literal characters can be matched together

    const patterns = regexSpecificDictionary.sort(
        (a, b) => b.regex.source.length - a.regex.source.length
    );

    while (currentInput.length > 0) {
      let matchFound = false;

      for (const { regex, label } of patterns) {
        const match = currentInput.match(regex);

        if (match && match.index === 0) {
          if (literalBuffer.length > 0) {
            localResult.push({
              text: literalBuffer,
              label: `The sequence of literal characters: ${literalBuffer}` //see?
            });
            literalBuffer = '';
          }

          localResult.push({ text: match[0], label });
          currentInput = currentInput.slice(match[0].length);
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        literalBuffer += currentInput[0];
        currentInput = currentInput.slice(1);
      }
    }
    //to make trailing characters pull
    if (literalBuffer.length > 0) {
  localResult.push({
    text: literalBuffer,
    label: `The sequence of literal characters: ${literalBuffer}`
  });
}

return localResult;
};

  
  return tokenizeRegexLocal(input);
})
</script>

<template>
  <label>Hover above each expression to get an explanation</label>
  <div class="container">
    <div class="explanation-text">
    <span
      v-for="(t, i) in tokens"
      :key="i"
      :style="{
        cursor: 'pointer',
        backgroundColor: t.label ? explanationColours[Math.floor(Math.random() * 10)] : 'transparent',
        borderRadius: '3px',
        padding: '0 2px',
        fontSize: '14px',
        color: 'black'
      }"
      @mouseenter="explanationText = t.label || ''"
      @mouseleave="explanationText = ''"
      >{{ t.text }}</span
    >
    </div>
    <div class="seperator"></div>
      <div class="explanation-text">{{ explanationText || 'Hover over elements to see explanations' }}</div>
  </div>

</template>

<style scoped>
label {
  font-size: 12px;
  color: #aaa;
  display: block;
  margin-bottom: 4px;
}

.container {
  font-family: monospace;
  width: 100%;
  border: 1px solid #444;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.explanation-text {
  padding: 6px 10px;
  font-size: 13px;
  color: #ccc;
  min-height: 28px;
  white-space: pre-wrap;
  word-break: break-word;
}

.separator {
  background-color: #444;
  width: 100%;
  height: 1px;
  flex-shrink: 0;
}
</style>