const formatDate = (date) =>
  new Intl.DateTimeFormat('es').format(new Date(date));
module.exports = formatDate;
