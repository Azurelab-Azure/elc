<template>
  <div class="relative inline-block group">
    <slot />
    
    <Transition name="tooltip">
      <div 
        v-if="showTooltip" 
        class="absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg"
        :class="positionClass"
      >
        {{ content }}
        <div 
          class="absolute w-2 h-2 bg-gray-900 transform rotate-45"
          :class="arrowClass"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}>(), {
  position: 'top'
});

const showTooltip = ref(false);

const positionClass = computed(() => {
  switch (props.position) {
    case 'top': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    case 'bottom': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    case 'left': return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
    case 'right': return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
    default: return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
  }
});

const arrowClass = computed(() => {
  switch (props.position) {
    case 'top': return 'bottom-[-4px] left-1/2 transform -translate-x-1/2';
    case 'bottom': return 'top-[-4px] left-1/2 transform -translate-x-1/2';
    case 'left': return 'right-[-4px] top-1/2 transform -translate-y-1/2';
    case 'right': return 'left-[-4px] top-1/2 transform -translate-y-1/2';
    default: return 'bottom-[-4px] left-1/2 transform -translate-x-1/2';
  }
});

const show = () => { showTooltip.value = true; };
const hide = () => { showTooltip.value = false; };

defineExpose({ show, hide });
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>