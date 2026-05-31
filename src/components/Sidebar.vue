<template>
  <div class="sidebar-container">
    <div class="explanations">
      <div class="title">EXPLANATIONS</div>
      <div class="content">
        {{ explanations }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ explanations: string }>()
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  right: 0;
  top: 55px;
  width: 250px;
  height: calc(100vh - 55px);
  background-color: #161616;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.explanations {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid #333;
}

.title {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.08em;
  text-align: center;
  border-bottom: 1px solid #333;
  color: #f5f5f5;
  padding: 15px 0;
  background: #202020;
  position: sticky;
  top: 0;
  z-index: 1;
  flex-shrink: 0;
}

.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 12px;
  color: #ccc;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-y: auto;
  flex: 1;
}

@media (max-width: 900px) {
  .sidebar-container {
    position: static;
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-top: 1px solid #333;
  }
}
</style>