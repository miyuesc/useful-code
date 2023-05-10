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
      author: 'Chokcoco',
      name: 'Inspiration',
      website: 'https://csscoco.com/inspiration/#/',
      github: 'https://github.com/chokcoco/CSS-Inspiration',
      desc: '这里可以让你寻找到使用或者是学习 CSS 的灵感，以分类的形式，展示不同 CSS 属性或者不同的课题使用 CSS 来解决的各种方法。'
    },
    {
      author: 'Chokcoco',
      name: 'Css 3',
      github: 'https://github.com/chokcoco/css3-',
      desc: 'CSS3 实现各类 3D && 3D 行星动画效果'
    },
    {
      author: 'XboxYan',
      name: 'coupon',
      github: 'https://github.com/XboxYan/coupon',
      website: 'https://coupon.codelabo.cn/',
      desc: '生成各种优惠券元素的CSS代码'
    },
    {
      author: 'animate-css',
      name: 'animate.css',
      website: 'https://animate.style/',
      github: 'https://github.com/animate-css/animate.css',
      desc: '一个跨浏览器的CSS动画库。就像一件简单的事情一样容易使用。'
    },
    {
      author: 'LeaVerou',
      name: 'css3patterns',
      website: 'https://projects.verou.me/css3patterns/#',
      github: 'https://github.com/LeaVerou/css3patterns',
      desc: '利用CSS渐变实现的多种背景图片'
    },
    {
      author: 'jonsuh',
      name: 'hamburgers',
      website: 'https://jonsuh.com/hamburgers/',
      github: 'https://github.com/jonsuh/hamburgers',
      desc: '一些简约且美观的菜单按钮图标动画'
    },
    {
      author: 'sdras',
      name: 'cssgridgenerator',
      website: 'https://cssgrid-generator.netlify.app/',
      github: 'https://github.com/sdras/cssgridgenerator',
      desc: 'CSS grid 布局样式生成器'
    },
    {
      author: 'l-hammer',
      name: 'You-need-to-know-css',
      website: 'https://lhammer.cn/You-need-to-know-css/#/',
      github: 'https://github.com/l-hammer/You-need-to-know-css',
      desc: 'Web开发者应该掌握的CSS tricks'
    },
    {
      author: 'codrops',
      name: 'PageTransitions',
      website: 'https://tympanus.net/Development/PageTransitions/',
      github: 'https://github.com/codrops/PageTransitions',
      desc: '一个使用CSS动画的各种页面过渡效果的展示集。'
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
      key: 'desc'
    }
  ]

  const goToSource = (source: SourceItem) => {
    window.open(source.website, '_blank')
  }
</script>

<template>
  <div class="sources">
    <h1>{{ $t('CssSources') }}</h1>
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
