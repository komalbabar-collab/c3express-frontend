export const MinimumDate = () => {
  const today = new Date();
  let day = today.getDate().toString();
  let month = (today.getMonth() + 1).toString(); // January is 0!
  const year = today.getFullYear().toString();

  if (day.length < 2) {
    day = '0' + day;
  }
  if (month.length < 2) {
    month = '0' + month;
  }

  return `${year}-${month}-${day}`;
}
export const getcountryNameByCode = (code) => {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(code);  // "United States"

}
// Custom validation function for ShipmentReadyTime and ShipmentReadyDate
export const TimeValidation = (value, helpers) => {
  const { ShipmentReadyTime, ShipmentReadyDate } = value;

  if (ShipmentReadyTime && ShipmentReadyTime) {
    // Check if ShipmentReadyDate is today
    const isToday = ShipmentReadyDate.toDateString() === new Date().toDateString();

    if (isToday) {
      // Check if the current time is greater than 5 PM
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();

      if (currentHour > 17 || (currentHour === 17 && currentMinute > 0)) {
        return helpers.message('  ShipmentReadyDate is not allowed for pickup for today after 5 PM.');
      }
    }
  }

  return value; // Return the value unchanged if no error
};