const inputValue = document.getElementById('inputValue');
const buttonSubmit = document.getElementById('buttonSubmit');
const points = document.getElementById('points');
const totalHours = document.getElementById('totalHours');
const subbedLabel = document.getElementById('subbedLabel');

const subBox = document.getElementById('checkBoxSub');

const subbedCheck = document.getElementById('subbedCheck');

const tierOne = document.getElementById('tierOne');
const tierTwo = document.getElementById('tierTwo');
const tierThree = document.getElementById('tierThree');


let isSub = 1;
let displayPointsHolder = 0;

subbedCheck.checked = true;


function calculateHours(value, isSub) {
    if (value > 0) {return (value / (320 * isSub))}
}

function calculateTrueHours(value, isSub) {
    if (calculateHours(value, isSub) != undefined) {
        let hoursDecimal = `${calculateHours(value, isSub)}`;
        let hours_split = hoursDecimal.split('.');

        const hour = hours_split[0];
        const minutes = (parseFloat(`0.${hours_split[1]}`) * 60);
        let minutes_split = `${minutes}`.split('.');

        const minute = minutes_split[0];
        const seconds = Math.round((parseFloat(`0.${minutes_split[1]}`) * 60));
    
        return `${hour} <h5>hours</h5> ${minute} <h5>minutes</h5> ${seconds} <h5>seconds</h5>`
    }
    
}

function buttonSubmitGreater0 (pointsCalculate, subValid) {
    points.textContent = `${pointsCalculate} points`;
    totalHours.innerHTML = calculateTrueHours(pointsCalculate, subValid);
    inputValue.value = '';
}

function buttonSubmit0() {
    totalHours.innerHTML = `<h3> Points need to be greater than 0 </h3>`;
    points.textContent = `0 points`;
    inputValue.value = '';
}

function calcFunc(points, subValid) {
    calculateTrueHours(points, subValid);
    if (displayPointsHolder > 0) {
        buttonSubmitGreater0(displayPointsHolder, isSub);
    } else {
        buttonSubmit0();
    }
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  setInputFilter(document.getElementById("inputValue"), function(value) {
    return /^\d*$/.test(value); });

buttonSubmit.addEventListener('click', () => {
    displayPointsHolder = inputValue.value;
    calcFunc(displayPointsHolder, isSub);
});

function isOneChecked() {
    // All <input> tags...
    var chx = document.getElementsByTagName('input');
    for (var i=0; i<chx.length; i++) {
      // If you have more than one radio group, also check the name attribute
      // for the one you want as in && chx[i].name == 'choose'
      // Return true from the function on first match of a checked item
      if (chx[i].type == 'radio' && chx[i].checked) {
        return true;
      } 
    }
    // End of the loop, return false
    return false;
}

subBox.addEventListener('change', () => {
    

    // if (subbedCheck.checked) {
    //     subbedLabel.textContent = 'subbed';
    //     isSub = 2;
    //     if (displayPointsHolder > 0 ){
    //         calcFunc(displayPointsHolder, isSub);
    //     }
    // } else {
    //     subbedLabel.textContent = 'Not a sub';
    //     isSub = 1;
    //     if (displayPointsHolder > 0 ){
    //         calcFunc(displayPointsHolder, isSub);
    //     }
    // }
    //console.log(tierOne.checked);
    if (subbedCheck.checked) {
        // console.log(isOneChecked());
        // console.log('unsubbed');
        isSub = 1;
    } else if (tierOne.checked) {
        // console.log(isOneChecked());
        // console.log('tier 1');
        isSub = 1.2;
    } else if (tierTwo.checked) {
        // console.log(isOneChecked());
        // console.log('tier 2');
        isSub = 1.4;
    } else if (tierThree.checked) {
        // console.log(isOneChecked());
        // console.log('tier 3');
        isSub = 2;
    }
    calcFunc(displayPointsHolder, isSub);
    console.log(displayPointsHolder);
    
});
