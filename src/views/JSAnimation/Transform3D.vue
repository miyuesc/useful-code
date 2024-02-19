<script setup lang="ts"></script>

<template>
  <div class="parent">
    <div class="center"></div>
    <div class="guide"></div>
  </div>
</template>

<style scoped lang="scss">
  .parent {
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    background: #1b2735;
  }
  .center,
  .guide {
    position: absolute;
  }
  .center {
    width: 400px;
    height: 400px;
    left: calc(50% - 200px);
    top: calc(50% - 200px);
    z-index: 1;
    background: #4896f1;
    border-radius: 50%;
  }
  .guide {
    width: 480px;
    height: 480px;
    left: calc(50% - 240px);
    top: calc(50% - 240px);
    transform: rotateX(45deg) rotateZ(20deg) skewX(-40deg) translateY(130px) translateX(92px);
    border-radius: 50%;
    border: 2px solid #00ff00;
    z-index: 2;
  }
</style>
