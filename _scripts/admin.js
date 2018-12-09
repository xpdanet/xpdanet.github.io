// eslint-disable-next-line no-unused-vars
let app = new Vue({
  el: '#app',
  components: {
    minus: httpVueLoader('_components/minus.vue')
  },
  data: {
    selectedTool: 'new',
    tools: null,
    tool: null
  },
  methods: {
    clearForm: function () {
      this.tool = {
        title: '',
        url: '',
        logo: '',
        deprecated: false,
        languages: [],
        platforms: [],
        pros: [],
        cons: [],
        frameworks: [],
        tools: [],
        tutorials: [],
        notableProjects: []
      };
    },
    addNew: function (section, type) {
      type = type || 'text';
      if (type === 'text') {
        this.tool[section].push('');
      }
    }
  },
  filters: {
    JSONstringify: function (val) {
      return beautifyJSON(val);
    }
  },
  watch: {
    selectedTool: function (title) {
      if (title === 'new') {
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
      this.clearForm();
    }
  }
});
