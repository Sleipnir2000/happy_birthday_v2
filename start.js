/*
 * Represent a discrete hour glass which triggers some specified action after being activated some specified number of times. 
 */
class HourGlass {
    constructor(times, action) {
     if (!Number.isInteger(times) || times < 1) {
         throw "times must be an integer greater than 0";
     } 
     if (!(action instanceof Function)) {
         throw "action must be a function";
     }
     this.times = times;
     this.action = action;
    }
 
    activate() {
     this.times -= 1;
     if (this.times === 0) {
         this.action();
     }
    }
 }

// instructions begin
const isCandlesOn = new Array(6).fill(false);
const COLOR_LIGHTING_CANDLE = "#f79347";
const COLOR_UNLIGHT_CANDLE = "#c0c0c0";
const ACTION_LIMIT = 10;
const hourGlass = new HourGlass(ACTION_LIMIT, () => {
    alert("💥💥💥💥💥💥💥💥💥💥💥💥💥💥")
    window.location.href = "https://wwwwwwwww.jodi.org/100cc/hqx/i900.html"
});
alert("谜题：点燃所有🕯️");

function lightCandle(index) {
    const candle = document.getElementById(`candle_${index}`);
    candle.style.color = COLOR_LIGHTING_CANDLE;
    for (let flame of document.getElementsByClassName(`flame_${index}`)) {
        flame.style.color = COLOR_LIGHTING_CANDLE;
    }
    isCandlesOn[index] = true;
    console.log(isCandlesOn);
}

function extinguishCandle(index) {
    const candle = document.getElementById(`candle_${index}`);
    candle.style.color = COLOR_UNLIGHT_CANDLE;
    for (let flame of document.getElementsByClassName(`flame_${index}`)) {
        flame.style.color = COLOR_UNLIGHT_CANDLE;
    }
    isCandlesOn[index] = false;
    console.log(isCandlesOn);
}

function touchCandle(event) {
    const candle = event.target;
    const index = parseInt(candle.id.charAt(candle.id.length - 1));
    if (!isCandlesOn[index]) {
        lightCandle(index);
        if (index === 0) {
            // do nothing 
        } else if ([1,2].includes(index)) {
            extinguishCandle(index - 1);
        } else if (index === 3) {
            extinguishCandle(index - 1);
            extinguishCandle(index + 1);
        } else if ([4,5].includes(index)) {
            extinguishCandle((index + 1) % 6);
        } else {
            console.error(`Invalid candle index ${index}`);
        }
    } else {
        extinguishCandle(index);
    }
    if (isCandlesOn.reduce((acc,val) => acc && val)) {
        alert("All candles on!");
    }
    hourGlass.activate();
}

// Add click listener for candles
const candles = document.getElementsByClassName("candle");
for (let i=0; i<candles.length; ++i) {
    const candle = candles[i];
    candle.addEventListener("click", touchCandle);
}