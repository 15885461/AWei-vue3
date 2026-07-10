<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import AppMain from './components/AppMain.vue'
</script>
<template>
  <div class="layout">
    <Sidebar />
    <div class="layout-main">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
</style>