const defaultFilterType = 'subtractive';
// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  components: {
    'github-corner': httpVueLoader('/_components/github-corner.vue'),
    'site-logo': httpVueLoader('/_components/site-logo.vue'),
    'news-alerts': httpVueLoader('/_components/news-alerts.vue'),
    'base-card': httpVueLoader('/_components/base-card.vue'),
    'unreviewed-card': httpVueLoader('/_components/unreviewed-card.vue')
  },
  data: {
    listMode: true,
    selectedTool: null,
    filterType: defaultFilterType,
    networkError: false,
    languages: [],
    platforms: [],
    tools: [],
    articles: [
      {
        title: 'Why I prefer NW.js over Electron? (2018 comparison)',
        author: 'Osama Abbas',
        url: 'https://medium.com/@pw.osama/e60b7289752',
        site: 'Medium',
        tags: [
          'NW.js',
          'Electron'
        ]
      }
    ]
  },
  methods: {
    expandCard: function (tool) {
      this.selectedTool = tool;
      this.listMode = false;
      this.setUrlFilters();
    },
    shrinkCard: function () {
      this.selectedTool = null;
      this.listMode = true;
      this.setUrlFilters();
    },
    getToolsData: function () {
      helpers.getToolsData()
        .then(function (response) {
          this.tools = response.tools;
          this.platforms = helpers.setFilterValues(response.tools, 'platforms');
          this.languages = helpers.setFilterValues(response.tools, 'languages');
          this.networkError = response.networkError;
          this.applyUrlFilters();
        }.bind(this));
    },
    setUrlFilters: function () {
      if (history.pushState) {
        let filter = '';
        let languages = '';
        let platforms = '';
        let trackedLanguages = '';
        let trackedPlatforms = '';

        if (this.filterType !== defaultFilterType) {
          filter = 'filter=' + this.filterType;
          trackedLanguages = this.enabledLanguages.map(function (language) {
            return language.title;
          });
          trackedPlatforms = this.enabledPlatforms.map(function (platform) {
            return platform.title;
          });
        } else {
          trackedLanguages = this.languages.filter(function (language) {
            return !language.enabled;
          }).map(function (language) {
            return language.title;
          });
          trackedPlatforms = this.platforms.filter(function (platform) {
            return !platform.enabled;
          }).map(function (platform) {
            return platform.title;
          });
        }

        if (trackedLanguages.length) {
          languages = 'languages=' + encodeURI(JSON.stringify(trackedLanguages));
        }
        if (trackedPlatforms.length) {
          platforms = 'platforms=' + encodeURI(JSON.stringify(trackedPlatforms));
        }

        let query = [
          filter,
          languages,
          platforms
        ].filter(function (item) {
          return item;
        }).join('&').trim();

        query = '?' + query.split('#').join('%23');

        if (query === '?') {
          query = '';
        }

        let hash = '';
        if (this.selectedTool) {
          hash = '#' + this.selectedTool.title.split('#').join('%23');
        }

        let newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + query + hash;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    },
    applyUrlFilters: function () {
      let params = helpers.parseURLFilters();
      this.filterType = params.filter || this.filterType;
      let activate;
      if (this.filterType === 'additive') {
        this.setAllFiltersOnOff(false);
        activate = true;
      } else {
        this.setAllFiltersOnOff(true);
        activate = false;
      }
      if (params.languages) {
        params.languages.forEach(function (filterLanguage) {
          this.activateByName(this.languages, filterLanguage, activate);
        }.bind(this));
      }
      if (params.platforms) {
        params.platforms.forEach(function (filterLanguage) {
          this.activateByName(this.platforms, filterLanguage, activate);
        }.bind(this));
      }

      let selectedTool = null;
      if (params.tool) {
        selectedTool = this.tools.find(function (tool) {
          return tool.title === params.tool;
        });
      }

      if (selectedTool) {
        this.selectedTool = selectedTool;
        this.listMode = false;
      } else {
        this.listMode = true;
      }
    },
    toggleActive: function (item) {
      item.enabled = !item.enabled;
      this.setUrlFilters();
    },
    /**
     * Activates or Deactivates a filter based on name passed in
     * @param  {array}   items  Languages or Platforms list
     * @param  {string}  name   Name of a filter (Windows, HTML, Linux, JS)
     * @param  {boolean} bool   true = activate, false = deactivate
     */
    activateByName: function (items, name, bool) {
      items.forEach(function (item) {
        if (item.title === name) {
          item.enabled = bool;
        }
      });
    },
    setAllFiltersOnOff: function (bool) {
      this.languages.forEach(function (language) {
        language.enabled = bool;
      });
      this.platforms.forEach(function (platform) {
        platform.enabled = bool;
      });
    },
    enabledFilters: function (filterType) {
      let enabledItems = filterType.filter(function (language) {
        return language.enabled;
      }.bind(this));
      return enabledItems;
    },
    /**
     * Applies a subtractive filter
     * @param  {array}  tools               The list of tools to filter
     * @param  {array}  enabledFilterTypes  List of enabled platforms or languages
     * @param  {string} filterType          'platforms' or 'languages'
     * @return {array}                      The filtered array of tools
     */
    subtractiveFilter: function (tools, enabledFilterTypes, filterTypes) {
      let filteredTools = tools.filter(function (tool) {
        let toolContainsEnabledFilterType = tool[filterTypes].some(function (toolFilterType) {
          let hasMatchingFilterTypeTitle = enabledFilterTypes.some(function (enabledFilterType) {
            return enabledFilterType.title === toolFilterType;
          });

          return hasMatchingFilterTypeTitle;
        });

        return toolContainsEnabledFilterType;
      });

      return filteredTools;
    },
    /**
     * Applies an additive filter
     * @param  {array}  tools               The list of tools to filter
     * @param  {array}  enabledFilterTypes  List of enabled platforms or languages
     * @param  {string} filterTypes         'platforms' or 'languages'
     * @return {array}                      The filtered array of tools
     */
    additiveFilter: function (tools, enabledFilterTypes, filterTypes) {
      let filteredTools = tools.filter(function (tool) {
        let hasAllSelectedFilterTypes = true;
        enabledFilterTypes.forEach(function (filterType) {
          if (!tool[filterTypes].includes(filterType.title)) {
            hasAllSelectedFilterTypes = false;
          }
        });

        return hasAllSelectedFilterTypes;
      });
      return filteredTools;
    },
    filterTypeChanged: function () {
      if (this.filterType === 'additive') {
        this.setAllFiltersOnOff(false);
      } else if (this.filterType === 'subtractive') {
        this.setAllFiltersOnOff(true);
      }
      this.setUrlFilters();
    }
  },
  computed: {
    enabledLanguages: function () {
      return this.enabledFilters(this.languages);
    },
    enabledPlatforms: function () {
      return this.enabledFilters(this.platforms);
    },
    subtractiveFilteredByPlatformAndLanguage: function () {
      let filteredByPlatform = this.subtractiveFilter(this.tools, this.enabledPlatforms, 'platforms');
      return this.subtractiveFilter(filteredByPlatform, this.enabledLanguages, 'languages');
    },
    additiveFilteredByPlatformAndLanguage: function () {
      let filteredByPlatform = this.additiveFilter(this.tools, this.enabledPlatforms, 'platforms');
      return this.additiveFilter(filteredByPlatform, this.enabledLanguages, 'languages');
    },
    filteredTools: function () {
      if (this.filterType === 'subtractive') {
        return this.subtractiveFilteredByPlatformAndLanguage;
      }
      return this.additiveFilteredByPlatformAndLanguage;
    }
  },
  created: function () {
    this.getToolsData();
  }
});
