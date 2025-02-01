const validateData = (row, sheetName) => {
  const errors = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (!row.Name) {
    errors.push("Name is mandatory");
  }
  if (!row.Amount || isNaN(row.Amount) || row.Amount <= 0) {
    errors.push("Amount must be numeric and greater than zero");
  }
  if (!row.Date || isNaN(new Date(row.Date))) {
    errors.push("Date is mandatory and must be valid");
  } else {
    const date = new Date(row.Date);
    if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
      errors.push("Date must fall within the current month");
    }
  }
  if (!row.Verified || !["Yes", "No"].includes(row.Verified)) {
    errors.push("Verified must be either Yes or No");
  }

  return errors;
};

module.exports = { validateData };