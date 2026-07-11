<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadcrumbList = computed(() => {
  return route.matched.filter((item) => {
    return item.meta?.title && !item.meta?.hidden
  })
})
</script>
<template>
  <div class="breadcrumb">
    <span v-for="(item, index) in breadcrumbList" :key="item.path" class='breadcrumb-item'>
      <span>{{ item.meta.title }}</span>
      <span v-if="index < breadcrumbList.length - 1" class="separator">/</span>
    </span>
  </div>
</template>
<style scoped>
.breadcrumb {
  font-size: 14px;
  color: #606266;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.separator {
  margin: 0 8px;
  color: #c0c4cc;
}
</style>