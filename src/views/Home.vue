<template>
  <section class="w-full flex justify-center items-start">
    <div class="w-9/12 h-full flex flex-col border border-gray-200">
        <!------------------------------------------------------------------------------------------------------------->
        <div class="flex border-b border-gray-200">
            <div class="w-2/12 flex items-center justify-start">
                <font-awesome-icon
                        :icon="['fas', 'user-circle']"
                        size="3x"
                        class="cursor-pointer text-gray-300 ml-4"
                />
            </div>
            <div class="flex justify-center items-center w-4/12 border-r border-gray-200 py-6 px-6">
                <input class="shadow appearance-none w-full border rounded py-1 px-2 text-gray-700 leading-tight"
                       id="search" type="text"
                       placeholder="Search...">
                <font-awesome-icon
                        :icon="['fas', 'notes-medical']"
                        size="2x"
                        v-on:click="btnAddNote"
                        class="cursor-pointer text-blue-500 ml-4"
                />
            </div>
            <div class="w-6/12 flex items-center justify-end px-6">
                <font-awesome-icon
                        :icon="['fas', 'history']"
                        size="lg"
                        class="cursor-pointer text-blue-500 ml-4"
                />
                <font-awesome-icon
                        :icon="['far', 'share-square']"
                        size="lg"
                        class="cursor-pointer text-blue-500 ml-4"
                />
                <font-awesome-icon
                        :icon="['far', 'trash-alt']"
                        size="lg"
                        class="cursor-pointer text-blue-500 ml-4"
                        v-on:click="removeNote(selectedNote)"
                />
                <font-awesome-icon
                        :icon="['fas', 'info-circle']"
                        size="lg"
                        class="cursor-pointer text-blue-500 ml-4"
                />
            </div>
        </div>
        <!------------------------------------------------------------------------------------------------------------->
        <div class="flex flex-auto">
          <!----------------------------------------------------------------------------------------------------------->
          <div class="flex flex-col items-start border-r border-gray-200 w-2/12 text-left">
            <div class="border-b border-gray-200 w-full pt-6 pb-3 px-5">
              <div class="flex items-center mb-3 font-bold text-blue-400">
                <font-awesome-icon
                        :icon="['fas', 'clipboard-list']"
                        size="lg"
                        class="cursor-pointer"
                />
                <h3 class="ml-3">All notes</h3>
              </div>
              <div class="flex items-center mb-3 font-bold text-orange-400">
                <font-awesome-icon
                        :icon="['far', 'star']"
                        size="lg"
                        class="cursor-pointer -ml-1"
                />
                <h3 class="ml-2">Favoris</h3>
              </div>
                <div class="flex items-center mb-3 font-bold text-red-400">
                    <font-awesome-icon
                            :icon="['far', 'trash-alt']"
                            size="lg"
                            class="cursor-pointer"
                    />
                    <h3 class="ml-2">Trash</h3>
                </div>
            </div>
            <div class="w-full pt-3 pb-6 px-5">
              <h3 class="mb-3">Histoire</h3>
              <h3 class="mb-3">Cuisine</h3>
              <h3 class="mb-3">Sport</h3>
            </div>
          </div>
          <!----------------------------------------------------------------------------------------------------------->
          <div class="border-r border-gray-200 w-4/12 py-4 px-6 flex flex-col-reverse justify-end overflow-auto">
            <div v-for="(item, index) in notes"
                 class="text-left py-4 cursor-pointer"
                 v-on:click="noteSelect(item, index)">
              <h2 class="font-bold mb-2 text-lg" v-bind:class="{ 'text-blue-400': (selectedNote === index) }">{{item.title}}</h2>
              <h3 class="text-gray-500" v-bind:class="{ 'text-blue-300': (selectedNote === index) }">{{item.content}}</h3>
            </div>
          </div>
          <!----------------------------------------------------------------------------------------------------------->
          <div class="w-6/12 paddingContent relative">
            <textarea name="area" id="textarea"
                  class="w-full h-full resize-none py-4 px-6 text-xl"
                  v-model="noteEdit" v-on:blur="blurTextarea">
            </textarea>
<!--             <button v-on:click="submitNote"-->
             <button class="polygonBtn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-24 border-b-4 border-l-4 border-blue-700 hover:border-blue-500 absolute bottom-0 right-0">
                 Confirm
              </button>
              <p class="absolute bottom-0 left-0"> {{nbCaract}} / 800</p>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
          notes: [],
          noteEdit: null,
          selectedNote: null,
          newNote: false,
      }
    },
      computed: {
          nbCaract: function () {
              if (this.noteEdit && this.noteEdit.length >=1) {
                  return this.noteEdit.length
              } else {
                  return 0
              }
          }
      },
    mounted() {
      if(localStorage.getItem('notes')) {
          try {
              this.notes = JSON.parse(localStorage.getItem('notes'));
          } catch(e) {
              localStorage.removeItem('notes');
          }
      }
    },
    watch: {
        newNote: function (val) {
            if (val) {
                document.getElementById('textarea').focus()
            }
        },
        noteEdit: function (val) {
            if (this.selectedNote) {
                this.notes[this.selectedNote].title = val.split('\n')[0]
                this.notes[this.selectedNote].content = val.split('\n').length <= 1 ? '' : val.substring(val.indexOf('\n')+1)
            } else if (val && this.newNote && val.length >= 1) {
                this.notes[this.notes.length - 1].title = val.split('\n')[0]
                this.notes[this.notes.length - 1].content = val.split('\n').length <= 1 ? '' : val.substring(val.indexOf('\n')+1)
            }
            this.saveNote()
        }
    },
    methods: {
        blurTextarea () {
            if (this.noteEdit === null || this.noteEdit.length === 0 ) {
                if (this.newNote) {
                    this.removeNote(this.notes.length - 1)
                } else if (this.selectedNote) {
                    this.removeNote(this.selectedNote)
                }
            }
        },
        btnAddNote () {
            if (!this.newNote) {
                this.noteEdit  = null
                this.newNote = true
                this.selectedNote = false
                this.notes.push({
                    title: '',
                    content: ''
                })
            }
        },
        noteSelect (item, index) {
            this.newNote = false
            this.selectedNote = index
            this.noteEdit = item.title + '\n' + item.content
        },
        // submitNote () {
        //     if (this.newNote) { // Si ajout note
        //         this.notes.push(
        //             {
        //                 title: this.noteEdit.split('\n')[0],
        //                 content: this.noteEdit.substring(this.noteEdit.indexOf('\n')+1)
        //             }
        //         )
        //         this.selectedNote = this.notes.length - 1
        //     } else if (this.selectedNote) { // Si edition note
        //         console.log(this.notes[this.selectedNote].title)
        //         this.notes[this.selectedNote].title = this.noteEdit.split('\n')[0]
        //         this.notes[this.selectedNote].content = this.noteEdit.substring(this.noteEdit.indexOf('\n')+1)
        //     }
        //     this.saveNote()
        // },
        removeNote(index) {
            this.notes.splice(index, 1)
            this.saveNote()
        },
        saveNote() {
            let parsed = JSON.stringify(this.notes);
            localStorage.setItem('notes', parsed);
        }
    }
  }
</script>
