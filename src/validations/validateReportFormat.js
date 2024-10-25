const validFormats = require('../utils/validReportsFormats');
const validateReportFormat = function (reportFormat) {
  return validFormats.includes(reportFormat);
};
module.exports = validateReportFormat;
