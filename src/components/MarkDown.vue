<template>
  <div :style="{height:height+'px'}" class="markdown-container">
    <textarea id="markDown" ></textarea>
  </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import SimpleMDE from 'simplemde'
export default {
  data () {
    return {
      editor: null,
      value: ''
    }
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 150
    },
    toolbar: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.simplemde = new SimpleMDE({
        element: document.getElementById('markDown'),
        autoDownloadFontAwesome: false,
        autofocus: this.autofocus,
        toolbar: this.toolbar.length > 0 ? this.toolbar : undefined,
        spellChecker: false,
        insertTexts: {
          link: ['[', ']( )']
        },
        // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
        placeholder: this.placeholder
      })
      this.simplemde.codemirror.on('change', () => {
        this.value = this.simplemde.value()
        this.$emit('input', this.simplemde.value())
      })
    })
  },
  methods: {
    getValue () {
      return this.value
    }
  },
  /* 组件切换的时候销毁这个markdown */
  destroyed () {
    this.simplemde.toTextArea()
    this.simplemde = null
  },
  watch: {
    value (newVal) {
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
