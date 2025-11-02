<template>
  <nav>
    <div class="logo">
      <span class="text">REGEX<span class="green-text">IUM</span></span>
    </div>
    <div class="links">
      <a href="#">About</a>
    <a href="#">Support</a>
    </div>
    

  </nav>
</template>

<script setup>
// Your script setup code here
</script>

<style scoped>
  nav {
    background-color: #161616;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    top: 0;
    margin-bottom: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .links {
    margin-right: 40px;
    margin-top: 10px;
  }

  a {
    padding: 1px 20px;
  }
  .logo {
    margin-left: 40px;
  }

  .text, .green-text {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bold;
    font-size: 25px;
  }

  .green-text {
    color: var(--primary)
  }

  
</style>