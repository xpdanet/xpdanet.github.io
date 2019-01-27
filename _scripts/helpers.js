// eslint-disable-next-line no-unused-vars
let helpers = {
  getToolsData: function () {
    return axios.get('/_data/tools.json')
      .then((response) => {
        let data = [];
        let networkError = false;
        try {
          data = response.data.split('\n');
          data = data.filter((line) => {
            return !line.trim().startsWith('//');
          }).join('\n');
          data = JSON.parse(data);
        } catch (err) {
          if (err) {
            networkError = true;
          }
        }
        return {
          tools: data,
          networkError: networkError
        };
      })
      .catch((err) => {
        if (err) {
          return {
            tools: [],
            networkError: true
          };
        }
      });
  },
  /**
   * Creates a sorted array of objects without duplicates containing
   * a count of usage for platforms and languages.
   * @param {array}   tools       Array of objects for each tool on the site
   * @param {string}  filterType  'platforms' or 'languages'
   */
  setFilterValues: function (tools, filterType) {
    let items = {};
    // Eliminate duplicates, get a count of usage
    tools.forEach((tool) => {
      tool[filterType].forEach((item) => {
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
  listAllSites: function (tools) {
    let sites = {};
    if (tools && tools.length) {
      tools.forEach((tool) => {
        if (tool.tutorials && tool.tutorials.length) {
          tool.tutorials.forEach((tutorial) => {
            if (!sites[tutorial.site]) {
              sites[tutorial.site] = 1;
            } else {
              sites[tutorial.site] = sites[tutorial.site] + 1;
            }
          });
        }
      });
    }

    let sitesArray = [];
    for (let site in sites) {
      sitesArray.push({
        title: site,
        amount: sites[site]
      });
    }

    return sitesArray;
  },
  listAllFrameworks: function (tools) {
    let frameworks = {};
    if (tools && tools.length) {
      tools.forEach((tool) => {
        if (tool.frameworks && tool.frameworks.length) {
          tool.frameworks.forEach((framework) => {
            if (!frameworks[framework.framework]) {
              frameworks[framework.framework] = 1;
            } else {
              frameworks[framework.framework] = frameworks[framework.framework] + 1;
            }
          });
        }
      });
    }

    let frameworksArray = [];
    for (let framework in frameworks) {
      frameworksArray.push({
        title: framework,
        amount: frameworks[framework]
      });
    }

    return frameworksArray;
  },
  /**
   * Gets the URL params from window.location. Converts to an object.
   * @return {object} filters  Returns an object in this shape:
   *   {
   *     filter: 'subtractive',
   *     lang: ['JS', 'HTML'],
   *     platforms: ['Windows', 'Linux']
   *   }
   */
  parseURLFilters: function () {
    let search = window.location.search.replace('?', '');
    search = search.split('%23').join('#');
    search = search.split('&');

    let params = {};
    search.forEach(function (param) {
      let name = param.split('=')[0];
      let val = param.split('=')[1];
      params[name] = val;
    });

    if (params.filter) {
      params.filter = params.filter.toLowerCase();
      if (params.filter !== 'subtractive' && params.filter !== 'additive') {
        delete params.filter;
      }
    }

    if (params.languages) {
      try {
        params.languages = JSON.parse(decodeURI(params.languages));
      } catch (err) {
        console.log('Could not parse language filters: ' + params.languages);
      }
      if (!Array.isArray(params.languages)) {
        delete params.languages;
      }
    }

    if (params.platforms) {
      try {
        params.platforms = JSON.parse(decodeURI(params.platforms));
      } catch (err) {
        console.log('Could not parse platfrom filters: ' + params.platforms);
      }
      if (!Array.isArray(params.platforms)) {
        delete params.platforms;
      }
    }

    return params;
  }
};
