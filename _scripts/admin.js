// eslint-disable-next-line no-unused-vars
let app = new Vue({
  el: '#app',
  components: {
    'site-logo': httpVueLoader('_components/site-logo.vue'),
    'base-card': httpVueLoader('_components/base-card.vue'),
    'minus': httpVueLoader('_components/minus.vue')
  },
  data: {
    networkError: false,
    selectedTool: 'new',
    tools: [],
    tool: null,
    platforms: [],
    languages: [],
    sites: [],
    frameworks: [],
    newLanguageChoice: null,
    newPlatformChoice: null
  },
  methods: {
    getToolsData: function () {
      helpers.getToolsData()
        .then((response) => {
          this.tools = response.tools;
          this.networkError = response.networkError;
        });
    },
    parseSelectedToolFromUrl: function () {
      // ?tool=Adobe%20Animate&x=true
      let params = location.search
        // remove ?
        .slice(1)
        // [ 'tool=Adobe%20Animate', 'x=true' ]
        .split('&')
        // [ ['tool', 'Adobe%20Animate'], ['x', 'true'] ]
        .map((param) => {
          return param.split('=');
        })
        // { tool: 'Adobe Animate', x: 'true' }
        .reduce((obj, [key, value]) => {
          return {
            ...obj,
            [key]: decodeURI(value)
          };
        }, {});

      if (params.tool) {
        this.selectedTool = params.tool;
      }
    },
    setToolInUrl: function (title) {
      if (history.pushState) {
        let newUrl = [
          location.protocol,
          '//',
          location.host,
          location.pathname,
          '?tool=',
          encodeURI(title)
        ].join('');

        history.pushState({ path: newUrl }, '', newUrl);
      }
    },
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
        notableProjects: [],
        notableTrailingLink: true
      };
    },
    addNew: function (section) {
      this.tool[section].push('');
    },
    addNewFramework: function () {
      this.tool.frameworks.push({
        framework: '',
        title: '',
        url: ''
      });
    },
    addNewToolTool: function () {
      this.tool.tools.push({
        type: '',
        title: '',
        url: ''
      });
    },
    addNewTutorial: function () {
      this.tool.tutorials.push({
        title: '',
        author: '',
        url: '',
        site: ''
      });
    },
    addNewNotableProject: function () {
      this.tool.notableProjects.push({
        title: '',
        url: '',
        description: ''
      });
    },
    addNewLanguageChoice: function () {
      this.tool.languages.push(this.newLanguageChoice);
    },
    addNewPlatformChoice: function () {
      this.tool.platforms.push(this.newPlatformChoice);
    },
    joinedItems: function (items) {
      let itemsArray = [];

      this[items].forEach(function (item) {
        itemsArray.push(item.title);
      });

      return itemsArray.join(', ');
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
        this.setToolInUrl(title);
      }
    },
    tools: function (tools) {
      this.platforms = helpers.setFilterValues(tools, 'platforms');
      this.languages = helpers.setFilterValues(tools, 'languages');
      this.sites = helpers.listAllSites(tools);
      this.frameworks = helpers.listAllFrameworks(tools);
      this.clearForm();
      this.parseSelectedToolFromUrl();
    }
  },
  created: function () {
    this.getToolsData();
  }
});
