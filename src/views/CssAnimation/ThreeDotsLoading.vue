<script setup lang="ts">
  const classes: string[] = [
    'dot-elastic',
    'dot-pulse',
    'dot-flashing',
    'dot-collision',
    'dot-revolution',
    'dot-carousel',
    'dot-typing',
    'dot-windmill',
    'dot-bricks',
    'dot-floating',
    'dot-fire',
    'dot-spin',
    'dot-falling',
    'dot-stretching'
  ]
</script>

<template>
  <div>
    <div class="page-desc">当前页动画来自 https://github.com/nzbin/three-dots</div>
    <div class="spin-loading-list">
      <div v-for="c in classes" :key="c" class="snippet">
        <div class="stage">
          <div :class="c"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './index';
  @import '@/css/spin-loading/three-dots-loading.scss';

  .spin-loading-list {
    gap: 20px;
  }

  .snippet {
    position: relative;
    background: #fff;
    padding: 32px 5%;
    margin: 24px 0;
    box-shadow: 0 4px 12px -2px rgba(0, 32, 128, 0.1), 0 0 0 1px rgba(60, 80, 120, 0.1);
    border-radius: 16px;
  }

  .snippet::before {
    display: inline-block;
    position: absolute;
    top: 6px;
    left: 6px;
    padding: 0 8px;
    content: attr(data-title);
    font-size: 12px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    color: white;
    background-color: rgb(255, 25, 100);
    border-radius: 10px;
    line-height: 20px;
  }

  .snippet:hover {
    cursor: pointer;
    outline: 2px solid rgb(255, 25, 100);
  }

  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 32px 0;
    margin: 0 -5%;
    overflow: hidden;
  }
</style>
