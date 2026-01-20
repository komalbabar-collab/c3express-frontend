import moment from "moment";
var today = new Date();
var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function todaydate() {
  return moment(firstDayOfMonth).format('YYYY-MM-DD');
}

function nextday(offset = 1) {
  return moment(new Date()).format('YYYY-MM-DD');
}

const ValidateDate = (from, to) => {
  from = new Date(from)
  to = new Date(to)
  if (from >= to) {
    return false
  }
  return true
}
export {
  ValidateDate,
  todaydate,
  nextday
}