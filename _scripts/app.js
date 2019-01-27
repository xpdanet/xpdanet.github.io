const defaultFilterType = 'subtractive';
// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  components: {
    'github-corner': httpVueLoader('/_components/github-corner.vue'),
    'site-logo': httpVueLoader('/_components/site-logo.vue'),
    'base-card': httpVueLoader('/_components/base-card.vue')
  },
  data: {
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
    getToolsData: function () {
      helpers.getToolsData()
        .then((response) => {
          this.tools = response.tools;
          this.platforms = helpers.setFilterValues(response.tools, 'platforms');
          this.languages = helpers.setFilterValues(response.tools, 'languages');
          this.networkError = response.networkError;
          this.applyUrlFilters();
        });
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

        query = query.split('#').join('%23');

        let newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + query;
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
        params.languages.forEach((filterLanguage) => {
          this.activateByName(this.languages, filterLanguage, activate);
        });
      }
      if (params.platforms) {
        params.platforms.forEach((filterLanguage) => {
          this.activateByName(this.platforms, filterLanguage, activate);
        });
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
      let enabledItems = filterType.filter((language) => {
        return language.enabled;
      });
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
      let filteredTools = tools.filter((tool) => {
        let toolContainsEnabledFilterType = tool[filterTypes].some((toolFilterType) => {
          let hasMatchingFilterTypeTitle = enabledFilterTypes.some((enabledFilterType) => {
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
      let filteredTools = tools.filter((tool) => {
        let hasAllSelectedFilterTypes = true;
        enabledFilterTypes.forEach((filterType) => {
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
