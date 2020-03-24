// Date Range Picker
var today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);
$('#startDate').datepicker({
  uiLibrary: 'bootstrap4',
  iconsLibrary: 'fontawesome',
  maxDate: function() {
    return $('#endDate').val();
  }
});
$('#endDate').datepicker({
  uiLibrary: 'bootstrap4',
  iconsLibrary: 'fontawesome',
  minDate: function() {
    return $('#startDate').val();
  }
});
// Single Date Picker
$('#datepicker').datepicker({
  uiLibrary: 'bootstrap4',
  iconsLibrary: 'fontawesome'
});

// Time Picker
$('#timepicker').timepicker({
  uiLibrary: 'bootstrap4',
  format: 'HH:MM',
  mode: '24hr'
});
