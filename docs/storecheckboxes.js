var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues")) || {};
var $checkboxes = $("#tablecheckbox-container :checkbox");
var $checkboxesdevprocessors = $(
  "#tablecheckbox-container-dev-processors :checkbox"
);

$checkboxes.on("change", function () {
  $checkboxes.each(function () {
    checkboxValues[this.id] = this.checked;
  });
  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

$checkboxesdevprocessors.on("change", function () {
  $checkboxesdevprocessors.each(function () {
    checkboxValues[this.id] = this.checked;
  });
  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

$.each(checkboxValues, function (key, value) {
  $("#" + key).prop("checked", value);
});
