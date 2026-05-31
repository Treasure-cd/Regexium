<template>
  <nav>
    <div class="logo">
      <span class="text">REGEX<span class="green-text">IUM</span></span>
    </div>
    <div class="links">
      <button class="nav-button" @click="showAboutModal = true">
        About
      </button>

      <a
        href="https://github.com/Treasure-cd/Regexium"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        aria-label="GitHub Repository"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.18a10.94 10.94 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.6.23 2.78.11 3.07.73.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
        </svg>
      </a>
    </div>
    

  </nav>
  <div
  v-if="showAboutModal"
  class="modal-overlay"
  @click="showAboutModal = false"
>
  <div class="modal" @click.stop>
    <button
      class="close-button"
      @click="showAboutModal = false"
    >
      ×
    </button>

    <h2>About Regexium</h2>

    <p>
      Regexium is a regex learning and practice tool designed to help
      developers understand regular expressions through examples,
      challenges, and experimentation.
    </p>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const showAboutModal = ref(false)
</script>

<style scoped>
nav {
  background-color: #161616;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  padding: 12px 40px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
}

.text, .green-text {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bold;
  font-size: 25px;
}

.green-text {
  color: var(--primary);
}

.links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 6px 12px;
}

.nav-button:hover {
  opacity: 0.75;
}

.github-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  color: inherit;
  opacity: 0.85;
}

.github-link:hover {
  opacity: 1;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #161616;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  color: inherit;
}

.modal h2 {
  margin-top: 0;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 480px) {
  nav {
    padding: 10px 16px;
  }

  .text, .green-text {
    font-size: 20px;
  }

  .nav-button {
    padding: 6px 8px;
  }
}
</style>