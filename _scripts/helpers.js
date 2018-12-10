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
  }
};
