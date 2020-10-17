(function() {
    var cors_api_host = '127.0.0.1:5500';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();   

/*function getWeather(woeid) {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {

        return result.json();
    })
    .then(data => {

        const today = data.consolidated_weather[0];
        console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`)
    })
    .catch(error => console.log(error));
}

getWeather(2487956);
getWeather(44418);*/

async function getCityAW(city = 'London'){
    try{
        //const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}/`);
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`);
        const data = await result.json();
 
        //const tomorrow = data.consolidated_weather[1];
        //console.log(`Temperatures in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);

        return data;
    } catch(error) {
        console(error);
    }
}
 
getCityAW();

async function getWeatherAW(woeid){
    try{
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);

        return data;
    } catch(error) {
        console(error);
    }
}
 
getCityAW('paris').then(woeid => {
    getWeatherAW(woeid[0].woeid).then(data => {
        console.log(data)
    });
});

document.getElementById('myCity').addEventListener('keypress', (e) => {
    const inputVal = this.value;
    if(e.keyCode === 13 || e.which === 13){
        getCityAW(inputVal).then(woeid => {
            getWeatherAW(woeid[0].woeid).then(data => {
                console.log(data)
            });
        });
    }
})