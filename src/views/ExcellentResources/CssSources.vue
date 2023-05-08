<script lang="ts" setup>
  import { ref, shallowRef } from 'vue'

  type SourceItem = {
    author: string
    name: string
    address: string
  }

  const name = ref<string | undefined>('JuejinMainPage')

  const sourcesList = shallowRef<SourceItem[]>([
    { author: 'Chokcoco', name: 'Inspiration', address: 'https://csscoco.com/inspiration/#/' },
    { author: 'Chokcoco', name: 'Css 3', address: 'https://github.com/chokcoco/css3-' },
    { author: 'animate-css', name: 'animate.css', address: 'https://animate.style/' },
    {
      author: 'LeaVerou',
      name: 'css3patterns',
      address: 'https://projects.verou.me/css3patterns/#'
    },
    {
      author: 'jonsuh',
      name: 'hamburgers',
      address: 'https://jonsuh.com/hamburgers/'
    },
    { author: 'sdras', name: 'cssgridgenerator', address: 'https://cssgrid-generator.netlify.app/' }
  ])

  const goToSource = (source: SourceItem) => {
    window.open(source.address, '_blank')
  }
</script>

<template>
  <div class="sources">
    <h1>{{ $t('CssSources') }}</h1>
    <div class="sources-list">
      <div v-for="s in sourcesList" :key="s.name" class="sources-list_item">
        <div class="sources-list_item-author">{{ s.author }}：</div>
        <div class="sources-list_item-name">《{{ s.name }}》</div>
        <div class="sources-list_item-address" @click="goToSource(s)">{{ s.address }}</div>
      </div>
    </div>
  </div>
</template>
