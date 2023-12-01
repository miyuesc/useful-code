<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  // import * as monaco from 'monaco-editor'
  import { editor as monacoEditor, languages } from 'monaco-editor'
  import { PropType } from 'vue'
  export type Theme = 'vs' | 'hc-black' | 'vs-dark'
  export type FoldingStrategy = 'auto' | 'indentation'
  export type RenderLineHighlight = 'all' | 'line' | 'none' | 'gutter'
  export interface Options {
    automaticLayout?: boolean // 自适应布局
    foldingStrategy?: FoldingStrategy // 折叠方式  auto | indentation
    renderLineHighlight?: RenderLineHighlight // 行亮
    selectOnLineNumbers?: boolean // 显示行号
    minimap?: {
      // 关闭小地图
      enabled: boolean
    }
    readOnly: boolean // 只读
    contextmenu: boolean
    fontSize?: number // 字体大小
    scrollBeyondLastLine?: boolean // 取消代码后面一大段空白
    overviewRulerBorder?: boolean // 不要滚动条的边框
  }
  export const editorProps = {
    modelValue: {
      type: String as PropType<string>,
      default: null
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: '100%'
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: '100%'
    },
    language: {
      type: String as PropType<string>,
      default: 'javascript'
    },
    theme: {
      type: String as PropType<Theme>,
      validator(value: string): boolean {
        return ['vs', 'hc-black', 'vs-dark'].includes(value)
      },
      default: 'vs-dark'
    },
    options: {
      type: Object as PropType<Options>,
      default() {
        return {
          automaticLayout: true,
          foldingStrategy: 'indentation',
          renderLineHighlight: 'all',
          selectOnLineNumbers: true,
          minimap: {
            enabled: true
          },
          readOnly: false,
          contextmenu: true,
          fontSize: 16,
          scrollBeyondLastLine: false,
          overviewRulerBorder: false
        }
      }
    }
  }

  export default defineComponent({
    name: 'MonacoCodeEditor',
    props: editorProps,
    emits: ['update:modelValue', 'change', 'editor-mounted'],
    setup(props, { emit }) {
      let editor: monacoEditor.IStandaloneCodeEditor
      const codeEditBox = ref()

      const init = () => {
        languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: false
        })
        languages.typescript.javascriptDefaults.setCompilerOptions({
          target: languages.typescript.ScriptTarget.ES2020,
          allowNonTsExtensions: true
        })

        editor = monacoEditor.create(codeEditBox.value, {
          value: props.modelValue,
          language: props.language,
          theme: props.theme,
          ...props.options
        })

        // 监听值的变化
        editor.onDidChangeModelContent(() => {
          const value = editor.getValue() //给父组件实时返回最新文本
          emit('update:modelValue', value)
          emit('change', value)
        })

        emit('editor-mounted', editor)
      }
      watch(
        () => props.modelValue,
        (newValue) => {
          if (editor) {
            const value = editor.getValue()
            if (newValue !== value) {
              editor.setValue(newValue)
            }
          }
        }
      )

      watch(
        () => props.options,
        (newValue) => {
          editor.updateOptions(newValue)
        },
        { deep: true }
      )

      watch(
        () => props.language,
        (newValue) => {
          monacoEditor.setModelLanguage(editor.getModel()!, newValue)
        }
      )

      onBeforeUnmount(() => {
        editor.dispose()
      })

      onMounted(() => {
        init()
      })

      return { codeEditBox }
    }
  })
</script>

<template>
  <div ref="codeEditBox" class="monaco-editor-content"></div>
</template>

<style scoped>
  .monaco-editor-content {
    width: 100%;
    height: 100%;
  }
</style>
