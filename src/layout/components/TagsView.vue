<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewStore } from '@/stores/tagsView'
const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()
watch(() => route.fullPath, () => {
  tagsViewStore.addView(route)
}, { immediate: true },)
function handleClick(tag) {
  router.push(tag.fullPath)
}
</script>
<template>
  <div class="tags-view">
    <span v-for="tag in tagsViewStore.visitedViews" :key="tag.path" class="tag-item"
      :class="{ active: tag.path === route.path }" @click="handleClick(tag)">
      {{ tag.title }}
    </span>
  </div>
</template>
<style scoped>
.tags-view {
  height: 34px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.tag-item {
  padding: 4px 10px;
  border: 1px solid #dcdfe6;
  font-size: 13px;
  cursor: pointer;
  background: #fff;
}

.tag-item.active {
  color: #409eff;
  border-color: #409eff;
}
</style>