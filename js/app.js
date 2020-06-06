const inputValue = document.getElementById('inputValue');
const buttonSubmit = document.getElementById('buttonSubmit');
const points = document.getElementById('points');
const totalHours = document.getElementById('totalHours');
const subbedLabel = document.getElementById('subbedLabel');
const subbedCheck = document.getElementById('subbedCheck');

let isSub = 1;
let displayPointsHolder = 0;


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

subbedCheck.addEventListener('change', () => {
    if (subbedCheck.checked) {
        subbedLabel.textContent = 'subbed';
        isSub = 2;
        if (displayPointsHolder > 0 ){
            calcFunc(displayPointsHolder, isSub);
        }
    } else {
        subbedLabel.textContent = 'Not a sub';
        isSub = 1;
        if (displayPointsHolder > 0 ){
            calcFunc(displayPointsHolder, isSub);
        }
    }
});