<template>
    <body class="body">
        <div class="container">
            <div class="notes row">
                <div class="column column-33 sidebar">
                    <h5>
                        <button class="button" @click.prevent="addNote">New Notch</button>
                    </h5>
                    <h1>Your Notches:</h1>
                    <ul>
                        <li v-for="(note, index) in notes"
                            :key="note.id"
                            :class="{ active: note === selected }"
                            @click="selectNote(note)"
                        >
                            <span class="note-item" :id="note.id">{{ note.body | truncate(30) }}</span>
                        </li>
                    </ul>
                </div>

                <div class="column column-77" style="position: relative">
                    <div class="note-area clearfix" v-if="notes.length">
                        <button class="button button-outline float-right" @click="deleteNote">Delete Notch</button>
                    </div>

                    <transition name="animated" mode="out-in" enter-active-class="animated fadeIn">
                        <editor v-if="selected" v-model="selected.body" :key="selected.id" :preview="preview"></editor>
                    </transition>

                    <p class="float-right">
                        This editor uses markdown syntax.
                        <a href="https://simplemde.com/markdown-guide" target="_blank">
                            Click here for markdown guide.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
const SKEY = "NOTCH";

import Truncate from '../filters/Truncate';

export default {
    filters: { Truncate },

    data() {
        return {
            notes: [],
            selected: null,
            preview: true,
        };
    },

    methods: {
        addNote() {
            this.preview = false;
            const note = { id: this.guid(), body: '# New Note' };
            this.notes.unshift(note);
            this.selected = note;
            this.save(this.notes);
        },

        selectNote(note) {
            if (note === this.selected) return;
            this.preview = true;
            this.selected = note;
        },

        save(notes) {
            if (!notes) return;
            chrome.storage.sync.set({[SKEY]: notes});
        },

        deleteNote() {
            let index = this.notes.findIndex((note) => {
                return this.selected.id == note.id;
            });

            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9B4DCA',
                confirmButtonText: 'Yes, delete notch!',
                cancelButtonText: 'No, do notch delete!'
            }).then(() => {
                this.notes.splice(index, 1);

                this.save(this.notes);
                this.selectNote(this.notes[0]);

                swal({
                    title: 'Deleted!',
                    text: "Say goodbye to your notch.",
                    type: 'success',
                    confirmButtonColor: '#9B4DCA',
                })
            })
        },

        guid() {
          return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
        },

        s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        },

        loadNotes() {
            chrome.storage.sync.get(SKEY, ({ [SKEY]: list = [] }) => {
                this.notes.push(...list);
                this.selectNote(list[0]);
            });
        },

        watchable() {
            if (!this.selected) return undefined;
            return { id: this.selected.id, body: this.selected.body };
        },

        onChange(val, prev) {
            if (!prev) return;
            this.save(this.notes);
        }
    },

    mounted() {
        this.loadNotes();

        this.$watch(
            this.watchable,
            this.onChange,
            { deep: true }
        );
    }
}
</script>

<style>
  h1 { font-size: 22px; }

  .notes.row {
    margin-top: 50px;
  }

  .CodeMirror {
    height: 500px;
  }

  li.active span {
    color: #9b4dca;
  }

  .note-area {
    width: 100%;
  }

  .note-item {
    cursor: pointer;
  }

  .swal2-confirm, .swal2-cancel {
    text-transform: none;
    letter-spacing: 0;
    height: auto;
  }
</style>
