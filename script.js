
let currentDate = new Date();
let currentHour = currentDate.getHours()
let formatDate = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()
$("#currentDate").html(formatDate);
let history = JSON.parse(localStorage.getItem('history')) || [];

$(document).on('click', '.btns', function () {
    let city;
    if ($(this).text() === 'Search') {
        city = $(".citySearch").val();
    } else {
        city = $(this).text()
    }
    runSearch(city)
})

function runSearch(q) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=27254921fe98837775faa360d2cb4843`

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            emptyInfo();
            appendCurrent(response)
            !history.includes(q) ? history.push(q) : '';
            localStorage.setItem('history', JSON.stringify(history))
            renderHistory();
            let secondQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=27254921fe98837775faa360d2cb4843`
            let ahead = Math.floor((24 - currentHour) / 3)
            $.ajax({
                url: secondQueryURL,
                method: "GET",
            })
                .then(function (response) {
                    $(".firstDate").append(response.list[ahead].dt_txt);
                    $(".secondDate").append(response.list[ahead + 8].dt_txt);
                    $(".thirdDate").append(response.list[ahead + 16].dt_txt);
                    $(".fourthDate").append(response.list[ahead + 24].dt_txt);
                    $(".fifthDate").append(response.list[ahead + 32].dt_txt);
                    $(".firstTemp").append("Temp: " + Math.round((((response.list[ahead].main.temp) - 273.15) * 1.80 + 32)) + " F");
                    $(".secondTemp").append("Temp: " + Math.round((((response.list[ahead + 8].main.temp) - 273.15) * 1.80 + 32)) + " F");
                    $(".thirdTemp").append("Temp: " + Math.round((((response.list[ahead + 16].main.temp) - 273.15) * 1.80 + 32)) + " F");
                    $(".fourthTemp").append("Temp: " + Math.round((((response.list[ahead + 24].main.temp) - 273.15) * 1.80 + 32)) + " F");
                    $(".fifthTemp").append("Temp: " + Math.round((((response.list[ahead + 32].main.temp) - 273.15) * 1.80 + 32)) + " F");
                    $(".firstHum").append("Humidity: " + response.list[0].main.humidity + "%");
                    $(".secondHum").append("Humidity: " + response.list[7].main.humidity + "%");
                    $(".thirdHum").append("Humidity: " + response.list[15].main.humidity + "%");
                    $(".fourthHum").append("Humidity: " + response.list[23].main.humidity + "%");
                    $(".fifthHum").append("Humidity: " + response.list[31].main.humidity + "%");
                });
        }).catch(err => {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=27254921fe98837775faa360d2cb4843`,
                method: "GET"
            }).then(function (data) {
                appendCurrent(data)
            })
        });


};

function appendCurrent(response) {
    $(".city").append(response.name);
    $(".wind").append("Wind Speed: " + response.wind.speed + " mph & " + response.wind.deg + " degrees");
    $(".humidity").append("Humidity: " + response.main.humidity + "%");
    $(".temp").append("Temperature: " + Math.round((((response.main.temp) - 273.15) * 1.80 + 32)) + " F");
    // $('#icon').append(`<img src='https://openweathermap.org/img/wn/${response.weather[0].icon}@1x.png'/>`)
}

function renderHistory() {
    $(".historyList").empty();
    history.forEach(item => {
        $(".historyList").append(`<button class='btn btns' style='width:100%'>${item}</button>`)
    })
}


function emptyInfo() {
    $(".city").empty();
    $(".wind").empty();
    $(".humidity").empty();
    $(".temp").empty();

    $(".firstDate").empty();
    $(".secondDate").empty();
    $(".thirdDate").empty();
    $(".fourthDate").empty();
    $(".fifthDate").empty();

    $(".firstTemp").empty();
    $(".secondTemp").empty();
    $(".thirdTemp").empty();
    $(".fourthTemp").empty();
    $(".fifthTemp").empty();

    $(".firstHum").empty();
    $(".secondHum").empty();
    $(".thirdHum").empty();
    $(".fourthHum").empty();
    $(".fifthHum").empty();
}

renderHistory();

