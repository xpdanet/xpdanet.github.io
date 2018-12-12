// eslint-disable-next-line no-unused-vars
let helpers = {
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
  }
};
