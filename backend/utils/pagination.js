const { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } = require("./constant");

module.exports.pagination = (query = {}) => {
  let { page, pageSize } = query;
  if (isNaN(page)) page = DEFAULT_PAGE_NO;
  if (isNaN(pageSize)) pageSize = DEFAULT_PAGE_SIZE;

  page = page > DEFAULT_PAGE_NO ? page * pageSize : 0;

  return { page, pageSize };
};
