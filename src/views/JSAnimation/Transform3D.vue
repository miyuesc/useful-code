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
  }
  .center,
  .guide {
    position: absolute;
    left: 300px;
    top: 200px;
  }
  .center {
    width: 400px;
    height: 400px;
    background: #1b2735;
    z-index: 1;
  }
  .guide {
    width: 200px;
    height: 200px;
    transform: rotateY(30deg) skewX(20deg);
    border-radius: 50%;
    border: 2px solid #00ff00;
    z-index: 2;
  }
</style>
