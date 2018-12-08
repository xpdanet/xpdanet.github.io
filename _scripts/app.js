// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    filterType: 'subtractive',
    languages: {},
    platforms: {},
    tools: null,
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
      },
      {

      }
    ]
  },
  methods: {
    toggleActive: function (item) {
      item.enabled = !item.enabled;
    },
    /**
     * Creates a sorted array of objects without duplicates containing
     * a count of usage for platforms and languages.
     * @param {string}  filterType  'platforms' or 'languages'
     */
    setFilterValues: function (filterType) {
      let items = {};
      // Eliminate duplicates, get a count of usage
      this.tools.forEach(function (tool) {
        tool[filterType].forEach(function (item) {
          if (items[item]) {
            items[item].amount++;
          } else {
            items[item] = {
              amount: 1,
              enabled: true
            };
          }
        });
      });

      // convert back to array
      let itemsArray = [];
      for (let item in items) {
        let itemObject = items[item];
        itemObject.title = item;
        itemsArray.push(itemObject);
      }

      // sort by usage
      itemsArray.sort(function (nextItem, currentItem) {
        return currentItem.amount - nextItem.amount;
      });

      return itemsArray;
    },
    setAllFiltersOnOff: function (bool) {
      for (let language in this.languages) {
        this.languages[language].enabled = bool;
      }
      for (let platform in this.platforms) {
        this.platforms[platform].enabled = bool;
      }
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
    this.platforms = this.setFilterValues('platforms');
    this.languages = this.setFilterValues('languages');
  }
});
