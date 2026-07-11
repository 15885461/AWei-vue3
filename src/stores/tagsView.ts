import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface TagView {
  path: string
  fullPath: string
  title: string
}

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<TagView[]>([])

  function addView(route: RouteLocationNormalizedLoaded) {
    const title = route.meta?.title as string | undefined
    if (!title) return
    const isExist = visitedViews.value.some((item) => item.path === route.path)
    if (isExist) return
    visitedViews.value.push({
      path: route.path,
      fullPath: route.fullPath,
      title,
    })
  }
  return {
    visitedViews,
    addView,
  }
})
