---
title: "Sandbox"
linkTitle: "Sandbox"
date: 2021-03-29T16:49:29-05:00
Description: >
  Article to play in the sandbox to make new functions
weight: 60
notopicssection: true
---
<script>


  function performSearch(table, elem1, elem2) {
    var filter = searchBox.value.toUpperCase();
    var trs = table.tBodies[0].getElementsByTagName("tr");
    var results = 0;

    for (var i = 0; i < trs.length; i++) {
      var tds = trs[i].getElementsByTagName("td");
      trs[i].style.display = "none";
      
      for (var j = 0; j < tds.length; j++) {
        if (tds[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          trs[i].style.display = "";
          results++;
          continue;
        }
      }
    }

    //var txtDiv = document.getElementById("ResultsDiv").innerHTML;
    if(results == 0) {
      table.style.display = "none";
      elem1.style.display = "none";
      elem2.style.display = "none";
    } else {
      table.style.display = "";
      elem1.style.display = "";
      elem2.style.display = "";
    }
    return results;
  }

  function findTables() {
    var allH2 = document.getElementsByTagName("h2");
    for (var e=0; e<allH2.length; e++) {
      allH2[e].style.display = "";
    }  
    var allTables = document.getElementsByTagName("table");
    for(var i=0; i<allTables.length; i++) {
      var table = allTables[i];
      var sibling1 = table.previousElementSibling;
      var sibling2 = sibling1;
      if(sibling1.tagName == "P") {
        sibling2 = sibling1.previousElementSibling;
      }
      performSearch(table, sibling1, sibling2);
    }
    var elements = document.querySelectorAll('h2:not([style*="display: none"])');
    //document.getElementById("ResultsDiv").innerHTML = "Number of visible h2: "+elements.length;
    for (e=0; e<elements.length; e++) {
      var hideH2 = true;
      let sib = elements[e].nextElementSibling;
      while (sib) {
        if(sib.tagName.toUpperCase() == "TABLE") {
          if(sib.style.display != "none") {
            hideH2 = false;
            break;
          }
        } else if(sib.tagName.toUpperCase() == "H2") {
          break;
        }
        sib = sib.nextElementSibling;
      }

      if(hideH2) {
        elements[e].style.display = "none";
        elements[e].nextElementSibling.style.display = "none";
      } else {
        elements[e].style.display = "";
        elements[e].nextElementSibling.style.display = "";
      }
    }
    
  }

</script>

<input type="text" id="searchBox" placeholder=" Search for names.." onkeyup="findTables()">
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="btn-green">Clear</button>

<div id="ResultsDiv"></div>

## Heading2 1

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is | left-aligned  | $1600 |
| col 2 is |   centered    |   $12 |
| col 3 is | right-aligned |    $1 |

## Heading2 4
This is a paragraph

| Disk 0 | Disk 1 | Disk 2 | Disk 3  |
|:------:|:------:|:------:|:-------:|
|   A1   |   A2   |   A3   | Ap(1-3) |
|   A4   |   A5   |   A6   | Ap(4-6) |
|   B1   |   B2   |   B3   | Bp(1-3) |
|   B4   |   B5   |   B6   | Bp(4-6) |

## Heading2 5

| Animal  | Sounds |
|---------|--------|
| Cat     | Meow   |
| Dog     | Woof   |
| Cricket | Chirp  |

## Tema importante
This is the paragraph

### Soy Heading 3

| Stade  | DFG (CKD-EPI) | Définition |
|:------:|:-------------:|------------|
|  uno   |      dos      | tres       |
| cuatro |     cinco     | seis       |

## Heading2 8
This is the paragraph

### Heading3 1

| Stade | DFG (CKD-EPI) | Définition                      |
|:-----:|:-------------:|---------------------------------|
|   1   |    &gt; 90    | MRC avec DFG normal ou augmenté |
|   2   |     60-89     | MRC avec DFG légèrement diminué |
|  3A   |     45-59     | IRC modérée                     |
|  3B   |     30-44     | IRC modérée                     |
|   4   |     15-29     | IRC sévère                      |
|   5   |     < 15      | IRC terminale                   |

### Heading3 2
This is a paragraph

| Syntax    | Description |
|-----------|-------------|
| Header    | Title       |
| Paragraph | Text        |

### Heading3 3

| Syntax    | Description |   Test Text |
|:----------|:-----------:|------------:|
| Header    |    Title    | Here's this |
| Paragraph |    Text     |    And more |