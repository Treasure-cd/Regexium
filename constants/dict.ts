interface RSD {
  regex: RegExp;
  label: string;
}

export const regexDictionary: Record<string, string> = {
  // Character Classes
  '\\d': 'Digit: Matches any single digit from 0 to 9.',
  '\\D': 'Non-digit: Matches any character that is not a digit.',
  '\\w': 'Word character: Matches letters (A-Z, a-z), digits (0-9), and underscore (_).',
  '\\W': 'Non-word character: Matches any character that is not a word character.',
  '\\s': 'Whitespace: Matches spaces, tabs (\\t), line breaks (\\n, \\r), and other whitespace.',
  '\\S': 'Non-whitespace: Matches any character that is not whitespace.',
  
  // Anchors
  '^': 'Start anchor: Matches the beginning of the string or line (with m flag).',
  '$': 'End anchor: Matches the end of the string or line (with m flag).',
  '\\b': 'Word boundary: Matches the position between a word character and a non-word character.',
  '\\B': 'Non-word boundary: Matches where \\b does not match.',
  
  // Quantifiers
  '*': 'Zero or more: Matches the preceding element 0 or more times (greedy).',
  '+': 'One or more: Matches the preceding element 1 or more times (greedy).',
  '?': 'Optional: Matches the preceding element 0 or 1 time. Also makes quantifiers non-greedy.',
  '{n}': 'Exact count: Matches exactly n occurrences of the preceding element.',
  '{n,}': 'At least n: Matches n or more occurrences of the preceding element.',
  '{n,m}': 'Range: Matches between n and m occurrences of the preceding element (inclusive).',
  '*?': 'Lazy zero or more: Non-greedy version of * (matches as few as possible).',
  '+?': 'Lazy one or more: Non-greedy version of + (matches as few as possible).',
  '??': 'Lazy optional: Non-greedy version of ? (prefers 0 matches).',
  
  // Wildcards & Operators
  '.': 'Any character: Matches any single character except line breaks (unless s flag is used).',
  '|': 'Alternation (OR): Matches either the expression before or after the |.',
  
  // Grouping & Capturing
  '()': 'Capturing group: Groups multiple tokens and captures the matched text for backreferences.',
  '(?:)': 'Non-capturing group: Groups tokens without creating a capture (better performance).',
  '(?<name>)': 'Named capturing group: Captures the match and assigns it a name for easier reference.',
  
  // Lookarounds
  '(?=)': 'Positive lookahead: Asserts that what follows matches the pattern (doesn\'t consume).',
  '(?!)': 'Negative lookahead: Asserts that what follows does NOT match the pattern.',
  '(?<=)': 'Positive lookbehind: Asserts that what precedes matches the pattern.',
  '(?<!)': 'Negative lookbehind: Asserts that what precedes does NOT match the pattern.',
  
  // Character Sets
  '[]': 'Character set: Matches any single character contained within the brackets.',
  '[^]': 'Negated set: Matches any character NOT in the brackets.',
  '[a-z]': 'Range: Matches any character in the specified range (e.g., lowercase letters).',
  
  // Special Characters
  '\\': 'Escape character: Escapes special regex characters to match them literally (e.g., \\. matches a period).',
  '\\n': 'Newline: Matches a line feed character.',
  '\\r': 'Carriage return: Matches a carriage return character.',
  '\\t': 'Tab: Matches a horizontal tab character.',
  '\\0': 'Null character: Matches a null character.',
  '\\x': 'Hex escape: Matches a character by its hexadecimal code (e.g., \\x41 = A).',
  '\\u': 'Unicode escape: Matches a character by its Unicode code point (e.g., \\u0041 = A).',
};

export const regexSpecificDictionary: RSD[] = [
  // Character Classes (order matters - more specific first)
  { 
    regex: /\\D/, 
    label: "Non-digit character (matches anything except 0-9)"
  },
  { 
    regex: /\\d/, 
    label: "Digit (matches any single digit 0-9)"
  },
  { 
    regex: /\\W/, 
    label: "Non-word character (matches anything except A-Z, a-z, 0-9, and _)"
  },
  { 
    regex: /\\w/, 
    label: "Word character (matches letters, digits, and underscore)"
  },
  { 
    regex: /\\S/, 
    label: "Non-whitespace character (matches anything except spaces, tabs, and line breaks)"
  },
  { 
    regex: /\\s/, 
    label: "Whitespace character (matches spaces, tabs, and line breaks)"
  },
  { 
    regex: /\\B/, 
    label: "Non-word boundary (positions that are NOT between word and non-word characters)"
  },
  { 
    regex: /\\b/, 
    label: "Word boundary (position between word and non-word characters)"
  },

  // Special escape sequences
  { 
    regex: /\\n/, 
    label: "Newline character (matches line feed LF)"
  },
  { 
    regex: /\\r/, 
    label: "Carriage return (matches CR character)"
  },
  { 
    regex: /\\t/g, 
    label: "Tab character (matches horizontal tab)"
  },
  { 
    regex: /\\0/, 
    label: "Null character (matches null byte)"
  },
  { 
    regex: /\\x[0-9A-Fa-f]{2}/, 
    label: "Hex escape sequence (matches character by hex code, e.g., \\x41 = 'A')"
  },
  { 
    regex: /\\u[0-9A-Fa-f]{4}/, 
    label: "Unicode escape sequence (matches character by Unicode, e.g., \\u0041 = 'A')"
  },

  // Lookarounds (must come before parentheses)
  { 
    regex: /\(\?<=[^)]*\)/, 
    label: "Positive lookbehind (?<=...) - asserts preceding text matches"
  },
  { 
    regex: /\(\?<![^)]*\)/, 
    label: "Negative lookbehind (?<!...) - asserts preceding text does NOT match"
  },
  { 
    regex: /\(\?=[^)]*\)/, 
    label: "Positive lookahead (?=...) - asserts following text matches"
  },
  { 
    regex: /\(\?![^)]*\)/, 
    label: "Negative lookahead (?!...) - asserts following text does NOT match"
  },
  { 
    regex: /\(\?<[a-zA-Z_][a-zA-Z0-9_]*>[^)]*\)/, 
    label: "Named capturing group (?<name>...) - captures match with named identifier"
  },
  { 
    regex: /\(\?:[^)]*\)/, 
    label: "Non-capturing group (?:...) - groups without creating backreference"
  },

  // Quantifiers
  { 
    regex: /\{\s*\d+\s*,\s*\d+\s*\}/, 
    label: "Range quantifier {n,m} - matches between n and m times (inclusive)"
  },
  { 
    regex: /\{\s*\d+\s*,\s*\}/, 
    label: "At-least quantifier {n,} - matches n or more times"
  },
  { 
    regex: /\{\s*\d+\s*\}/, 
    label: "Exact quantifier {n} - matches exactly n times"
  },
  { 
    regex: /\+\?/, 
    label: "Lazy one-or-more (+?) - non-greedy: matches 1+ times, as few as possible"
  },
  { 
    regex: /\*\?/, 
    label: "Lazy zero-or-more (*?) - non-greedy: matches 0+ times, as few as possible"
  },
  { 
    regex: /\?\?/, 
    label: "Lazy optional (??) - non-greedy: prefers not to match"
  },
  { 
    regex: /\+/, 
    label: "One or more (+) - matches 1 or more of preceding element"
  },
  { 
    regex: /\*/, 
    label: "Zero or more (*) - matches 0 or more of preceding element"
  },
  { 
    regex: /\?/, 
    label: "Optional (?) - matches 0 or 1 of preceding element"
  },

  // Anchors
  { 
    regex: /\^/, 
    label: "Start anchor (^) - matches beginning of string/line"
  },
  { 
    regex: /\$/, 
    label: "End anchor ($) - matches end of string/line"
  },

  // Character Sets - must come before individual brackets
  { 
    regex: /\[[^\]]*\]/, 
    label: "Character set [...] - matches any single character in the set"
  },

  // Grouping & Operators
  { 
    regex: /\(/, 
    label: "Start group ( - begins a capturing group"
  },
  { 
    regex: /\)/, 
    label: "End group ) - closes a capturing group"
  },
  { 
    regex: /\|/, 
    label: "Alternation (OR) - matches either left or right side"
  },
  { 
    regex: /\./, 
    label: "Any character (.) - matches any character except newline"
  },

  // Backslash - should be last as it's a general escape
  { 
    regex: /\\/, 
    label: "Escape character (\\) - escapes special characters to match literally"
  },
];