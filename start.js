
const isCandlesOn = new Array(6).fill(false);
const COLOR_LIGHTING_CANDLE = "#f79347";

function lightCandle(index) {
    const candle = document.getElementById(`candle_${index}`);
    candle.style.color = COLOR_LIGHTING_CANDLE;
    isCandlesOn[index] = true;
    console.log(isCandlesOn);
}

function extinguishCandle(index) {
    const candle = document.getElementById(`candle_${index}`);
    candle.style.color = "black";
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
}

// Add click listener for candles
const candles = document.getElementsByClassName("candle");
for (let i=0; i<candles.length; ++i) {
    const candle = candles[i];
    candle.addEventListener("click", touchCandle);
}