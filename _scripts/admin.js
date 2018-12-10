// eslint-disable-next-line no-unused-vars
let app = new Vue({
  el: '#app',
  components: {
    minus: httpVueLoader('_components/minus.vue')
  },
  data: {
    selectedTool: 'new',
    tools: [],
    tool: null,
    platforms: [],
    languages: []
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
    tools: function () {
      this.clearForm();
    }
  },
  created: function () {
    axios.get('/_data/tools.json')
      .then((response) => {
        let tools = response.data;
        this.tools = tools;
        this.platforms = helpers.setFilterValues(tools, 'platforms');
        this.languages = helpers.setFilterValues(tools, 'languages');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
