export const filterResults = (results, filters, dietary) => {
  if (filters.length === 0 && dietary.length === 0) {
    return results;
  }

  return results.filter(item => {
    const isCategory = filters.length ? filters.includes(item.category) : true;

    if (!isCategory) {
      return false;
    }

    if (dietary.length && (!item.dietary || item.dietary.length === 0)) {
      return false;
    }

    const isDietary = dietary.length
      ? item.dietary.some(d => dietary.includes(d))
      : true;

    if (!isDietary) {
      return false;
    }

    return true;
  });
};
