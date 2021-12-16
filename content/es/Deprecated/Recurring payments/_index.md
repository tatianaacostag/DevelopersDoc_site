---
title: "Pagos recurrentes"
linkTitle: "Pagos recurrentes"
date: 2021-09-28T13:40:06-05:00
type: docs
Description: >
   Información de Pagos recurrentes para API y SDK.
weight: 10
nosidetoc: true
---
<!-- Modal window start -->
<style>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  animation: animatetop 0.4s;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.header {
  color: white;
  background-color: #ED6A5A;
  padding: 15px;
}



</style>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <header class="header">
      <p style="display:contents;color:white"><b>Funcionalidad descontinuada</b></p>
      <span class="close" style="color:white">&times;</span>
    </header>
    <p style="padding:20px">La funcionalidad de <b><i>Pagos Recurrentes</i></b> ha sido descontinuada y por lo tanto, no se ofrece a los comercios. El siguiente artículo está disponible a modo de consulta para comercios que aún la tienen activa.<br>Esta funcionalidad <b>NO</b> será activada nuevamente.</p>
  </div>

</div>

<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var toc = document.getElementById("td-section-nav");
// var content = document.getElementsByClassName("td-content")[0];

// When the page loads, open the modal 
window.onload = function() {
  //content.style.backgroundImage = "url('/assets/deprecated.png')";
  modal.style.display = "block";
  toc.style['pointer-events'] = 'none';
  toc.style.backgroundColor = "rgba(0,0,0,-0.6)";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  toc.removeAttribute("style");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if ((event.target == modal) || (event.target.id == "td-sidebar-menu")) {
    modal.style.display = "none";
    toc.removeAttribute("style");
  }
}
</script>

<!-- Modal window end -->