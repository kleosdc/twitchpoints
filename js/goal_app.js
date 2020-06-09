const subbedLabel = document.getElementById('subbedLabel');
const subbedCheck = document.getElementById('subbedCheck');

const monthlySubLabel = document.getElementById('monthlySubLabel');
const monthlySub = document.getElementById('monthlySub');

const monthlyCheerLabel = document.getElementById('monthlyCheerLabel');
const monthlyCheer = document.getElementById('monthlyCheer');

const followLabel = document.getElementById('followLabel');
const followCheck = document.getElementById('followCheck');

const dailyStreaks = document.getElementsByClassName('dailyStreaks')[0];
const streak2x = document.getElementById('streak2x');
const streak3x = document.getElementById('streak3x');
const streak4x = document.getElementById('streak4x');
const streak5x = document.getElementById('streak5x');

// Points grabber
const points = document.getElementById('points');
const msp = document.getElementById('msp');
const mcp = document.getElementById('mcp');
const fp = document.getElementById('fp');
const rp = document.getElementById('rp');
const wsp = document.getElementById('wsp');
const ehp = document.getElementById('ehp');

// Inc & Decr
const incr = document.getElementById('increments');
const decr = document.getElementById('decrements');
const descrementsRaid = document.getElementById('descrementsRaid');
const incrementsRaid = document.getElementById('incrementsRaid');

const bodyIncDecHours = document.getElementById('hoursDay');
const raidAmounts = document.getElementById('raidAmounts');
const hoursPerc = document.getElementById('hoursPerc');
const raidPerc = document.getElementById('raidsMonths');
const raidsCount = document.getElementById('raidsCount');

// Slider pointers
const sliderHoursDaily = document.getElementById('hoursDaily');
const hoursADayP = document.getElementById('hoursADay');
const raidSlider = document.getElementById('raidSlider');
const raidParticipated = document.getElementById('raidParticipated');

// Buttons reset
const resetHours = document.getElementById('resetHours');
const resetRaids = document.getElementById('resetRaids');
const resetStreaks = document.getElementById('resetStreaks');

// Default values
let totalSubPoints = 0;
let totalMonthlySubPoints = 0;
let totalMonthlyCheerPoints = 0;
let totalFollowPoints = 0;
let totalRaidPoints = 0;

let isSub = 1; // x2
let isSubPoints = 9600;
let isTruePoints = 9600;
let isMonthlySub = 0; // 500
let isMonthlyCheer = 0; // 350
let isFollower = 0; // 300
let isRaids = 250; // 250ea
let isRaidsTotal = 0;
let isStreak = 0;
let pointsStreakEarned = 0;




subbedCheck.checked = false;
monthlySub.checked = false;
monthlyCheer.checked = false;
followCheck.checked = false;
streak2x.checked = false;
streak3x.checked = false;
streak4x.checked = false;
streak5x.checked = false;


let raidStatus = 0;
let val = 0;


// Default loads
hoursPerc.textContent = `${returnPerc(parseInt(hoursADayP.textContent), 24)}%`;
hoursPerc.style.width = `${returnPerc(parseInt(hoursADayP.textContent), 24)}%`;
updateTotalPoints(timesOf2(parseInt(isSubPoints), parseInt(hoursADayP.textContent)), totalSubPoints, ehp, '+', 'Earned Total Month points (5-minute + click-to-claim)');


raidPerc.textContent = `${returnPerc(parseInt(raidsCount.textContent), 30)}%`;
raidPerc.style.width = `${returnPerc(parseInt(raidsCount.textContent), 30)}%`;
returnTotal();


function updatePointsStatus(symbol, element, message, value) {
    element.textContent = `${symbol}${value} ${message}`;
}


function returnPerc(value, maxValue) {
    return Math.round((value / maxValue) * 100)
}


function returnTotal() {
    let total = isTruePoints + pointsStreakEarned + totalMonthlySubPoints + totalFollowPoints + totalMonthlyCheerPoints + totalRaidPoints;
    updatePointsStatus('', points, '', total);
}

function updateStats(element, symbol, points, message) {
    element.textContent = `${symbol}${points} ${message}`;
}


// Operators  + - * /
function sumOf2(a, b) {
    return a + b;
}

function minusOf2(a, b) {
    return a - b;
}

function timesOf2(a, b) {
    return a * b;
}

function divideOf2(a, b) {
    return a / b;
}

function updateTotalPoints(operator, element, element_, symbol_, message_) {
    element = operator;
    updateStats(element_, symbol_, element, message_);
}

function buttonRecord(e, updateContent, maxAmount, minAmount, updatePerc, value) {
        if (e.tagName === 'BUTTON') {
            if (e.textContent === '+' && parseInt(updateContent.textContent) < maxAmount) {
                
                updateContent.textContent++;
                updatePerc.textContent = `${returnPerc(parseInt(updateContent.textContent), maxAmount)}%`;
                updatePerc.style.width = `${returnPerc(parseInt(updateContent.textContent), maxAmount)}%`;

                if (e.parentElement.id === 'hoursDay') {
                    if (updateContent == hoursADayP) {
                        updateTotalPoints(timesOf2(parseInt(isSubPoints), parseInt(hoursADayP.textContent)), totalSubPoints, ehp, '+', 'Earned Total Month points (5-minute + click-to-claim)');
                        isTruePoints += value;
                    }
                }
                
                if (updateContent == raidsCount) {
                    totalRaidPoints += isRaids;
                    updatePointsStatus('+', rp, 'Raid points', totalRaidPoints);
                    updatePointsStatus('', raidParticipated, 'Raid participations in a month', raidsCount.textContent);
                }
            }
            if (e.textContent === '-' && parseInt(updateContent.textContent) > minAmount) {
                updateContent.textContent--;
                updatePerc.textContent = `${returnPerc(parseInt(updateContent.textContent), maxAmount)}%`;
                updatePerc.style.width = `${returnPerc(parseInt(updateContent.textContent), maxAmount)}%`;
                
                if (e.parentElement.id === 'hoursDay') {
                    if (updateContent == hoursADayP) {
                        updateTotalPoints(timesOf2(parseInt(isSubPoints), parseInt(hoursADayP.textContent)), totalSubPoints, ehp, '+', 'Earned Total Month points (5-minute + click-to-claim)');
                        isTruePoints -= value;
                    }
                }
                
                if (updateContent == raidsCount) {
                    totalRaidPoints -= isRaids;
                    updatePointsStatus('', raidParticipated, 'Raid participations in a month', raidsCount.textContent);
                    if (totalRaidPoints != 0) {
                        updatePointsStatus('+', rp, 'Raid points', totalRaidPoints);
                    } else {
                        updatePointsStatus('', rp, 'Raid points', 'None');
                    }
                }
            }
            returnTotal();
        }
}

bodyIncDecHours.addEventListener('click', (e) => {
    buttonRecord(e.target, hoursADayP, 24, 1, hoursPerc, isSubPoints);
});

raidAmounts.addEventListener('click', (e) => {
    buttonRecord(e.target, raidsCount, 30, 0, raidPerc, isRaids);
});


function hoursDefault() {
    hoursADayP.textContent = '1';
    hoursPerc.textContent = `${returnPerc(parseInt(hoursADayP.textContent), 24)}%`;
    hoursPerc.style.width = `${returnPerc(parseInt(hoursADayP.textContent), 24)}%`;
}

function raidDefault() {
    raidsCount.textContent = '0';
    raidPerc.textContent = `${returnPerc(parseInt(raidsCount.textContent), 30)}%`;
    raidPerc.style.width = `${returnPerc(parseInt(raidsCount.textContent), 30)}%`;
}

function updateLabel(whatAmount, value, thisValue, thisValue2, whatUpdate, val1, val2, symbol, lab, msg, trueValue) {
    whatAmount = value;
    updateTotalPoints(sumOf2(parseInt(thisValue), parseInt(thisValue2)), whatAmount, whatUpdate, val1, val2);
    updatePointsStatus(symbol, lab, msg, trueValue);
}

function checkBoxListener(selectedItem, event, label, trueMessage, falseMessage, value, trueValue, falseValue) {
    let lab = '';
    let msg = '';
    if (label == monthlySubLabel) {lab = msp; msg = 'Monthly Subscriber points';};
    if (label == monthlyCheerLabel) {lab = mcp; msg = 'Monthly Cheer points';};
    if (label == followLabel) {lab = fp; msg = 'Follower points';};
    selectedItem.addEventListener(event, () => {
        if (selectedItem.checked) {
            
            
            label.textContent = trueMessage;
            value = trueValue;

            if (label == monthlySubLabel) {
                totalMonthlySubPoints = 500;
                updateLabel(totalMonthlySubPoints, 500, isTruePoints, isMonthlySub, points, '', '', '+', lab, msg, trueValue);
            }

            if (label == monthlyCheerLabel) {
                totalMonthlyCheerPoints = 350;
                updateLabel(totalMonthlyCheerPoints, 350, isTruePoints, totalMonthlyCheerPoints, points, '', '', '+', lab, msg, trueValue);
            }

            if (label == followLabel) {
                totalFollowPoints = 300;
                updateLabel(totalFollowPoints, 300, isTruePoints, totalFollowPoints, points, '', '', '+', lab, msg, trueValue);
            }


            if (label == subbedLabel) {hoursDefault(); isSubPoints = 19200; isTruePoints = isSubPoints; updatePointsStatus('', points, '', parseInt(points.textContent) - (isTruePoints - 19200)); updateTotalPoints(timesOf2(parseInt(isSubPoints), parseInt(hoursADayP.textContent)), totalSubPoints, ehp, '+', 'Earned Total Month points (5-minute + click-to-claim)');};
        } else {


            label.textContent = falseMessage;
            value = falseValue;

            if (label == monthlySubLabel) {
                totalMonthlySubPoints = 0;
                updateLabel(totalMonthlySubPoints, 0, isTruePoints, isMonthlySub, points, '', '', '', lab, msg, 'None');
            }

            if (label == monthlyCheerLabel) {
                totalMonthlyCheerPoints = 0;
                updateLabel(totalMonthlyCheerPoints, 0, isTruePoints, totalMonthlyCheerPoints, points, '', '', '', lab, msg, 'None');
            }

            if (label == followLabel) {
                totalFollowPoints = 0;
                updateLabel(totalFollowPoints, 0, isTruePoints, totalFollowPoints, points, '', '', '', lab, msg, 'None');
            }

            if (label == subbedLabel) {hoursDefault(); isSubPoints = 9600; isTruePoints = isSubPoints; updatePointsStatus('', points, '', parseInt(points.textContent) - (isTruePoints - 9600)); updateTotalPoints(timesOf2(parseInt(isSubPoints), parseInt(hoursADayP.textContent)), totalSubPoints, ehp, '+', 'Earned Total Month points (5-minute + click-to-claim)');};
        }
        
        returnTotal();
    });
}

checkBoxListener(subbedCheck, 'change', subbedLabel, 'Subscriber', 'Not a Subscriber', isSub, 2, 1);
checkBoxListener(monthlySub, 'change', monthlySubLabel, 'Monthly Subscriber', 'Not a Monthly Subscriber', isMonthlySub, 500, 0);
checkBoxListener(monthlyCheer, 'change', monthlyCheerLabel, 'Monthly Cheer', 'Not a Month Cheer', isMonthlyCheer, 350, 0);
checkBoxListener(followCheck, 'change', followLabel, 'Follower', 'Not a Follower', isFollower, 300, 0);



dailyStreaks.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT'){
        if (e.target.id === 'streak2x') {isStreak = 300; updatePointsStatus('', points, '', (parseInt(points.textContent) - pointsStreakEarned)); pointsStreakEarned = 0; allStreaks(2)}
        if (e.target.id === 'streak3x') {isStreak = 350; updatePointsStatus('', points, '', (parseInt(points.textContent) - pointsStreakEarned)); pointsStreakEarned = 0; allStreaks(3)}
        if (e.target.id === 'streak4x') {isStreak = 400; updatePointsStatus('', points, '', (parseInt(points.textContent) - pointsStreakEarned)); pointsStreakEarned = 0; allStreaks(4)}
        if (e.target.id === 'streak5x') {isStreak = 450; updatePointsStatus('', points, '', (parseInt(points.textContent) - pointsStreakEarned)); pointsStreakEarned = 0; allStreaks(5)}
    }
});

function allStreaks(highestCount) {
    let dayIndex = 1;
    for (let i = 0; i < 30; i++) {
        if (dayIndex > highestCount) {
            dayIndex = 0;
        }
        if (dayIndex == 2) {
            pointsStreakEarned += 300;
        }
        if (dayIndex == 3) {
            pointsStreakEarned += 350;
        }
        if (dayIndex == 4) {
            pointsStreakEarned += 400;
        }
        if (dayIndex == 5) {
            pointsStreakEarned += 450;
            dayIndex = 4;
        }
        dayIndex++;   
    }
    updatePointsStatus('', points, '', (parseInt(points.textContent) + pointsStreakEarned));
    updatePointsStatus('+', wsp, 'Watch Streak points', pointsStreakEarned);
}