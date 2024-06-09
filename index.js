const myWeather = document.querySelector('.my-weather')
const inputSection = document.querySelector('.input-section')
const searchWeather = document.querySelector('.search-weather')
const grantAccess = document.querySelector('.grant-access')
const WeatherSection = document.querySelector('.weather-section')
const boxSection = document.querySelector('.box-section')
const sec1 = document.querySelector('.sec1')
const key = '608e32d016e7ab5423902da22030645b'
const inputCity = document.querySelector('#input-city')
const search = document.querySelector('.search-img')


myWeather.addEventListener('click', (e) => {
    myWeather.classList.add('active-tab')
    searchWeather.classList.remove('active-tab')
    inputSection.classList.remove('active')
    sec1.classList.add('active')

})
searchWeather.addEventListener('click', (e) => {
    searchWeather.classList.add('active-tab')
    myWeather.classList.remove('active-tab')
    inputSection.classList.add('active')
    sec1.classList.remove('active')
    // grantAccess.classList.remove('active')
    // WeatherSection.classList.remove('active')
})



document.addEventListener('DOMContentLoaded', getCoordinates)
const localCoordinates = sessionStorage.getItem('user-coordinates')
function getCoordinates() {
    if (!localCoordinates) {
        grantAccess.classList.add('active')
        WeatherSection.classList.remove('active')
    }
    else {
        const coordinates = JSON.parse(localCoordinates)
        fetchUserInfo(coordinates)
        WeatherSection.classList.add('active')
    }

}

const cityName = document.querySelector('.city')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temp')
const windspeed = document.querySelector('.wind-data')
const humidity = document.querySelector('.humidity-data')
const clouds = document.querySelector('.clouds-data')
const countryIcon = document.getElementById('countryicon')
const loading = document.querySelector('.loading')


async function fetchUserInfo(coordinates) {
    const { lat, long } = coordinates

    grantAccess.classList.remove('active')
    loading.classList.add('active')
    try {
        setTimeout(async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&lang={lang}`);
            const data = await response.json()
            console.log(data)

            loading.classList.remove('active')
            WeatherSection.classList.add('active')
            boxSection.classList.add('active')
            // windspeed.classList.add('active')
            // clouds.classList.add('active')
            // humidity.classList.add('active')
            renderWeatherInfo(data)
        }, 1000)
    }

    catch (err) {
        console.log(err)
    }

}
function renderWeatherInfo(data) {
    cityName.innerHTML = data?.name
    console.log(data?.name)
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`

    temperature.innerHTML = data?.main?.temp
    windspeed.innerHTML = data?.wind?.speed
    humidity.innerHTML = data?.main?.humidity
    clouds.innerHTML = data?.clouds?.all
    weather.innerHTML = data?.weather[0]?.description
}

const grantAccessBtn = document.getElementById('grant-location')
grantAccessBtn.addEventListener('click', (e) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else {
        alert('No geolocation Supported')
    }

})

function showPosition(position) {
    const userCoordinates = {
        long: position.coords.longitude,
        lat: position.coords.latitude
    }
    sessionStorage.setItem('user-coordinates', JSON.stringify(userCoordinates))
    fetchUserInfo(userCoordinates)
}

const loading2 = document.querySelector('.loading2')
const WeatherSectionSearch = document.querySelector('.weather-section-search')
search.addEventListener('click', async (e) => {
    loading2.classList.add('active')
    const cityValue = inputCity.value
    console.log(cityValue)


    if (typeof cityValue === "string" && cityValue != '') {
        try {
            setTimeout(async()=>{

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
                );
                const data = await response.json();
                loading2.classList.remove("active");
                console.log(data)
    
                WeatherSectionSearch.classList.add('active')
                // boxSection.classList.add('active')
    
                renderData(data)
            },2000)
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        alert('please enter valid city Name')
    }
})

function renderData(data) {

    const cityName2 = document.querySelector('.city-search')
    const weather2 = document.querySelector('.weather-search')
    const temperature2 = document.querySelector('.temp-search')
    const windspeed2 = document.querySelector('.wind-data-search')
    const humidity2 = document.querySelector('.humidity-data-search')
    const clouds2 = document.querySelector('.clouds-data-search')
    const countryIcon2 = document.getElementById('countryicon-search')


    cityName2.innerHTML = data?.name
    countryIcon2.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`

    weather2.innerHTML= data?.weather[0]?.description
    temperature2.innerHTML = data?.main?.temp
    windspeed2.innerHTML = data?.wind?.speed
    humidity2.innerHTML = data?.main?.humidity
    clouds2.innerHTML = data?.clouds?.all

}