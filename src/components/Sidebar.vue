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
    top: 67.5px; /* Start below navbar */
    width: 250px;
    height: calc(100vh - 67.5px);
    background-color: #161616;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .explanations {
    height: 100%;
    width: 100%;
    border-left: 1px solid #333;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #333;
    color: #f5f5f5;
    padding: 6px 0;
    background: #202020;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .content {
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 8px;
    color: #f5f5f5;
    font-size: 0.9rem;
    line-height: 1.4;
    overflow-y: auto;
    flex: 1;
  }

  @media (max-width: 900px) {
    .sidebar-container {
      position: relative;
      top: 0;
      width: 100%;
      height: auto;
      min-height: 300px;
    }
  }
</style>