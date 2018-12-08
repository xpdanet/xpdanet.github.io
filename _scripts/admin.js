// eslint-disable-next-line no-unused-vars
let app = new Vue({
  el: '#app',
  data: {
    selectedTool: null,
    tools: null,
    tool: null
  },
  methods: {
    clearForm: function () {
      console.log('clearForm');
    }
  },
  filters: {
    JSONstringify: function (val) {
      return beautifyJSON(val);
    }
  },
  watch: {
    selectedTool: function (title) {
      if (!title) {
        this.tool = null;
      } else if (title === 'new') {
        this.clearForm();
      } else {
        this.tools.forEach((tool) => {
          if (tool.title === title) {
            this.tool = tool;
          }
        });
      }
    },
    tools: function (val) {
      this.selectedTool = 'NW.js';
      this.tool = val[0];
    }
  }
});
