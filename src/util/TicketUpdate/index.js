export const splitTimeStamp = (currentTime,digit=false) =>  digit ? currentTime.slice(0,currentTime.length - 1) : currentTime.split('').pop();

const updateTickerValue = (currentTime) => {
    let tickerValue = null;
    if(splitTimeStamp(currentTime) === "m"){
        tickerValue =  currentTime === "59m" ? "1h" : parseInt(splitTimeStamp(currentTime,true)) + 1;
    }else if(splitTimeStamp(currentTime) === "h"){
        tickerValue =  parseInt(splitTimeStamp(currentTime,true)) * 60 + 1;
        
    }
    return tickerValue;
}

const updateTimeStamp = (currentTime) => {
    let tickerValue = updateTickerValue(currentTime);
    let timeStamp = currentTime;
    if(currentTime === "now"){
        timeStamp = "1m";
    }
    else{
        if(splitTimeStamp(currentTime) === "h"){
            if(tickerValue % 60  === 0){
                timeStamp = (tickerValue/ 60) +"h";
            }
            else{
                timeStamp = Math.floor(tickerValue / 60) +"h";
            }
        }
        else{
            timeStamp = tickerValue === "1h" ? tickerValue : String(tickerValue+"m");
        }
    }
    return timeStamp;
}


export const tickerUpdate = (currentTime) => {
    let updatedTimeStamp = currentTime === "0" ? "now" : updateTimeStamp(currentTime);
    return updatedTimeStamp;
}