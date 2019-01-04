// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  components: {
    'github-corner': httpVueLoader('/_components/github-corner.vue'),
    'site-logo': httpVueLoader('/_components/site-logo.vue'),
    'base-card': httpVueLoader('/_components/base-card.vue')
  },
  data: {
    filterType: 'subtractive',
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
        });
    },
    toggleActive: function (item) {
      item.enabled = !item.enabled;
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
  watch: {
    filterType: function (type) {
      if (type === 'additive') {
        this.setAllFiltersOnOff(false);
      } else if (type === 'subtractive') {
        this.setAllFiltersOnOff(true);
      }
    }
  },
  created: function () {
    this.getToolsData();
  }
});
