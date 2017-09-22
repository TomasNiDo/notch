<template>
   <div class="note-area">
        <textarea></textarea>
    </div>
</template>

<script>
export default {
    props: ['value', 'preview'],

    methods: {
        initEditor(el, val) {
            return new SimpleMDE({
                element: el,
                initialValue: val,
                spellChecker: false,
                placeholder: "Type here...",
                toolbar: ["bold", "italic", "strikethrough", "heading", "|", "unordered-list", "ordered-list", "table", "|", "quote", "code", "image", "link", "|", "preview", "guide"],
                toolbarTips: true,
                status: false,
                autoDownloadFontAwesome: true,
                forceSync: true,
            });
         }
     },

    mounted() {
        const md = this.initEditor(this.$el.childNodes[0], this.value);

        md.codemirror.focus();
        md.codemirror.setCursor(100);

        md.codemirror.on("change", () => {
          const val = this.md.value();
          this.$emit('input', val);
        });

        this.md = md;
        if (this.preview) this.md.togglePreview();
    }
};
 </script>
