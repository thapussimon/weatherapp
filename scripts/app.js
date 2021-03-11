//DOM Manipulation

const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');

const forecast=new Forecast();

//A function for Updating the UI(image & temp details & city details)
//We are going pass in the single object that we get for cityDetails & WeatherDetails here
const updateUI=(data)=>{
    //Getting the cityDetails from data for easy calling everytime
    // const cityDetails=data.cityDetails;
    //Getting weather from data for easy calling everytime
    // const weather=data.weather;

    //We can use Destructuring to get the details similarly in above line
    //We are using destructuring since its much more neater
    //Destructuring is a easy way to get properties and store them in constants
    //From the data Object we want the cityDetails property & the weather property
    const {cityDetails,weather}=data;
    
    //Update Details
    details.innerHTML=`
                <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>   
                </div>
    `;
    
    //Removing display none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
    
    //Update Day & Night Images
    
    //src of img we are going to use
    //If we are using if else statement we initialize timeSrc=null
    //let timeSrc=null

    // if(weather.IsDayTime){
    //     timeSrc="img/day.svg";
    // }else{
    //     timeSrc="img/night.svg";
    // }

    //using ternary Operator
    let timeSrc=(weather.IsDayTime)?"img/day.svg":"img/night.svg";
    

    //updating the placeholder image according to day/night time
    time.setAttribute('src',timeSrc);

    //Update Weather Info Icons
    const iconSrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);


};


//Get the data from the forecast.js file
// const updateCity=async(city)=>{
    //To make sure we are getting data from the form
    // console.log(city);

    // const cityDetails=await getCity(city);
    // const weather=await getWeather(cityDetails.Key);

    // return {
    //     cityDetails:cityDetails,
    //     weather:weather
    // }

    //since the key & value we returned in the above statement is same
    //We can make use of Object SHorthand Notation
//     return {cityDetails,weather};
// };

cityForm.addEventListener('submit',e=>{
    //To prevent the form from refreshing after we submit data
    e.preventDefault();
    //Get City Value form the form
    const city=cityForm.city.value.trim();

    
    //After Submitting data we need to clear out the form fields
    cityForm.reset();

    //Update the UI with the new City
    forecast.updateCity(city)
        .then(data=>updateUI(data))
        .catch(err=>console.log(err));

    //Set localStorage
    //SO every time a user enters a city
    //It overrides the city property
    localStorage.setItem('city',city);
    //If the user refreshes the page by accident
    //We need to check whether a localStorage property city is there or not
    //If it is there we should call the api & automatically update the UI
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data=>updateUI(data))
        .catch(err=>console.log(err))
}