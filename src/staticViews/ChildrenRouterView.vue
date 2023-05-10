<template>
  <router-view v-slot="{ Component }">
    <transition name="scale">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup></script>
