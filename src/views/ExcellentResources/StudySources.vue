<script lang="ts" setup>
  import { shallowRef, h } from 'vue'
  import { NDataTable, NTag, NButton } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import type { DataTableColumns } from 'naive-ui'

  const { t } = useI18n()

  type SourceItem = {
    author: string
    name: string
    website?: string
    github?: string
    desc?: string
  }

  const sourcesList = shallowRef<SourceItem[]>([
    {
      author: 'jobbole',
      name: 'awesome-css-cn',
      github: 'https://github.com/jobbole/awesome-css-cn',
      desc: 'CSS 资源大全中文版，内容包括：CSS预处理器、框架、CSS结构、代码风格指南、命名习惯等等。'
    },
    {
      author: 'jobbole',
      name: 'awesome-javascript-cn',
      github: 'https://github.com/jobbole/awesome-javascript-cn',
      desc: 'JavaScript 资源大全中文版，内容包括：包管理器、加载器、测试框架、运行器、QA、MVC框架和库、模板引擎等。由「开源前哨」和「前端大全」微信公号团队维护更新。'
    },
    {
      author: 'pcottle',
      name: 'learnGitBranching',
      github: 'https://github.com/pcottle/learnGitBranching',
      website: 'https://learngitbranching.js.org/?locale=zh_CN',
      desc: '一个互动的git可视化和教程。有志于学习git的学生可以使用这个应用程序来教育和挑战自己，以掌握git!'
    },
    {
      author: 'dwqs',
      name: 'front-end-handbook',
      github: 'https://github.com/dwqs/front-end-handbook',
      website: 'https://dwqs.gitbooks.io/frontenddevhandbook/content/',
      desc: '前端开发者手册(2021)'
    },
    {
      author: 'joshbuchea',
      name: 'head',
      github: 'https://github.com/joshbuchea/head',
      website: 'https://htmlhead.dev/',
      desc: 'HTML <head> 元素的简单指南'
    },
    {
      author: 'Fyrd & Lensco',
      name: 'Can I Use',
      github: '',
      website: 'https://caniuse.com/',
      desc: '检测属性或者方法的兼容性'
    }
  ])

  const tableColumns: DataTableColumns<SourceItem> = [
    {
      title: t('sources.Author'),
      key: 'author',
      minWidth: 200,
      render(row) {
        return h(
          NTag,
          { type: 'info', bordered: false },
          {
            default: () => row.author
          }
        )
      }
    },
    {
      title: t('sources.Name'),
      minWidth: 200,
      key: 'name'
    },
    {
      title: t('sources.Website'),
      key: 'website',
      minWidth: 200,
      render(row) {
        if (row.website) {
          return h(
            NButton,
            { text: true, type: 'info', tag: 'a', href: row.website, target: '_blank' },
            {
              default: () => row.website
            }
          )
        }
        return h('span', '-')
      }
    },
    {
      title: t('sources.Github'),
      key: 'github',
      minWidth: 200,
      render(row) {
        if (row.github) {
          return h(
            NButton,
            { text: true, type: 'info', tag: 'a', href: row.github, target: '_blank' },
            {
              default: () => row.github
            }
          )
        }
        return h('span', '-')
      }
    },
    {
      title: t('sources.Description'),
      minWidth: 300,
      key: 'desc'
    }
  ]

  const goToSource = (source: SourceItem) => {
    window.open(source.website, '_blank')
  }
</script>

<template>
  <div class="sources">
    <h1>{{ $t('StudySources') }}</h1>
    <!--    <div class="sources-list">-->
    <!--      <div v-for="s in sourcesList" :key="s.name" class="sources-list_item">-->
    <!--        <div class="sources-list_item-author">{{ s.author }}：</div>-->
    <!--        <div class="sources-list_item-name">《{{ s.name }}》</div>-->
    <!--        <div class="sources-list_item-website" @click="goToSource(s)">{{ s.website }}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <n-data-table :data="sourcesList" :columns="tableColumns" />
  </div>
</template>
