---
title: "Sandbox"
linkTitle: "Sandbox"
date: 2021-03-29T16:49:29-05:00
Description: >
  Article to play in the sandbox to make new functions
weight: 60
notopicssection: true
draft: false
---
<script src="/js/searchcodes.js"></script>

<!--element.style {
    margin: 30px 0px 0px;
    display: block;
    text-align: right;
    color: gray;
}-->
<script>

// Set the date we're counting down to
var countDownDate = new Date("Apr 30, 2022 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("days").innerHTML =  ("0" + days).slice(-2);
  document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
  document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
  document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "00";
  document.getElementById("hours").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

</script>

<div id="MainCounter" style="background-image: url('https://colombia.payu.com/wp-content/uploads/sites/5/2020/03/Default_Banner_1440x380-1.jpg');">
    <p style="color:white;text-align:center;font-size:40px;">Your system must be ready in</p>
    <div style="display: flex;justify-content: space-around;">
      <div id="DaysDiv">
        <p id="days" style="color:white;text-align:center;font-size:40px;margin-bottom: initial;"></p>
        <p style="color:white;text-align:center;">Days</p>
      </div>
      <div id="HoursDiv">
        <p id="hours" style="color:white;text-align:center;font-size:40px;margin-bottom: initial;"></p>
        <p style="color:white;text-align:center;">Hours</p>
      </div>
      <div id="MinutesDiv">
        <p id="minutes" style="color:white;text-align:center;font-size:40px;margin-bottom: initial;"></p>
        <p style="color:white;text-align:center;">Minutes</p>
      </div>
      <div id="SecondsDiv">
        <p id="seconds" style="color:white;text-align:center;font-size:40px;margin-bottom: initial;"></p>
        <p style="color:white;text-align:center;">Seconds</p>
      </div>
    </div>  
</div>