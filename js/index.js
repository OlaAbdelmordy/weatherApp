
clearCondition =document.getElementById("currentCondition_id");
currIcon=document.getElementById("currentIcon_id");

// const nav_hover=document.querySelectorAll('.nav-item');
//  const nav_item =document.querySelectorAll('.nav-link');
 

//   nav_item.addEventListener("mouseover", event =>{
//     nav_hover.classlist.add('nav_border');
//   });
//   nav_item.addEventListener("mouseout", event =>{
//     nav_hover.classlist.remove('nav_border');
//   });
  
const searchInput= document.getElementById("search_id");
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){

      const Lat =  pos.coords.latitude;
      const Long =  pos.coords.longitude;
      getWeatherData(`${Lat},${Long}`);
    })

}

async function getWeatherData(country){
   let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${country}&days=3&key=ae023cceb44c4236b94134319242006`);
    let data =await response.json();

    if(!data.error){
      displayTodayWeather(data);
      displayTomorrowForcast(data);
      displayAfterTomorrowForcast(data);
    }
   

}
searchInput.addEventListener('input', function(e){
  getWeatherData(e.target.value);
})

function displayTodayWeather(data){
  const todayDate= data.current.last_updated;
  let date = new Date(todayDate);

  const currentWeekDay= date.toLocaleString('en-us',{weekday:'long'});
  const todayNum = date.getDate();
  const currentMonth=date.toLocaleString('en-us', {month:'long'});

  const cityName =data.location.name;
  const todayTemp =data.current.temp_c;
  const currentCondition =data.current.condition.text;
  const currentIcon= data.current.condition.icon;

  const currentHum =data.current.humidity;
  const currentWind =data.current.wind_kph;
  const currWindDirection= data.current.wind_dir;

  weekDay_id.innerHTML =currentWeekDay;
  dayNum_id.innerHTML= `${todayNum} ${currentMonth}`;
  cityName_id.innerHTML =cityName;
  todayTemp_id.innerHTML =todayTemp;
  clearCondition.innerHTML =currentCondition;
  currIcon.setAttribute('src', `https:${currentIcon}`);
  currentHum_id.innerHTML =currentHum;
  currWind_id.innerHTML =currentWind;
  currWindDirection_id.innerHTML =currWindDirection;
  
}
function displayTomorrowForcast({forecast}){
  const tomorrowName=new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'});
  const secondDayMaxTemp= forecast.forecastday[1].day.maxtemp_c;
  const secondDayMinTemp= forecast.forecastday[1].day.mintemp_c;
  const secondCardCondition=forecast.forecastday[1].day.condition.text;

  tomorrowName_id.innerHTML=tomorrowName;
  secondDayicon_id.setAttribute('src',`https:${forecast.forecastday[1].day.condition.icon}`);
  secondDayMaxTemp_id.innerHTML=secondDayMaxTemp;
  secondDayMinTemp_id.innerHTML=secondDayMinTemp;
  secondCardCondition_id.innerHTML=secondCardCondition;
  // console.log(forecast.forecastday);

}

function displayAfterTomorrowForcast({forecast}){
  const AtomorrowName=new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'});
  const thirdDayMaxTemp= forecast.forecastday[2].day.maxtemp_c;
  const thirdDayMinTemp= forecast.forecastday[2].day.mintemp_c;
  const thirdCardCondition=forecast.forecastday[2].day.condition.text;

  AtomorrowName_id.innerHTML=AtomorrowName;
  thirdDayicon_id.setAttribute('src',`https:${forecast.forecastday[2].day.condition.icon}`);
  thirdDayMaxTemp_id.innerHTML=thirdDayMaxTemp;
  thirdDayMinTemp_id.innerHTML=thirdDayMinTemp;
  thirdCardCondition_id.innerHTML=thirdCardCondition;
 
}