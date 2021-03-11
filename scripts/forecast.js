class Forecast{
    constructor(){
        this.key="gkR28meCa1JF1xPuuSeSgGSCleDzXrou";
        this.weatherURL="http://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURL="http://dataservice.accuweather.com/locations/v1/cities/search";

    }
    async updateCity(city){
    //To make sure we are getting data from the form
    // console.log(city);

    const cityDetails=await this.getCity(city);
    const weather=await this.getWeather(cityDetails.Key);

    // return {
    //     cityDetails:cityDetails,
    //     weather:weather
    // }

    //since the key & value we returned in the above statement is same
    //We can make use of Object SHorthand Notation
    return {cityDetails,weather};

    }

    async getCity(city){
        const query=`?apikey=${this.key}&q=${city}`;

        const response=await fetch(this.cityURL+query);
        const data=await response.json();
        //We are taking the closest match thats why we are returning the first array
        return data[0];
    }
    async getWeather(id){
        const query=`${id}?apikey=${this.key}`;

        const response=await fetch(this.weatherURL+query);
        const data=await response.json();
        // console.log(data);
        return data[0];

    }
};


//The below are the Procedural Programming approach to solve this

//Interacting with weather api
// const key="gkR28meCa1JF1xPuuSeSgGSCleDzXrou";

//Get Weather Info
//The id is the Key(The City Key) we get from getCity()
// const getWeather=async (id)=>{
//     const baseUrl="http://dataservice.accuweather.com/currentconditions/v1/";
//     const query=`${id}?apikey=${key}`;

//     const response=await fetch(baseUrl+query);
//     const data=await response.json();
//     // console.log(data);
//     return data[0];
// };

//Getting City info
//The city name is passed to this funtion 
// const getCity=async (city)=>{

//     const baseUrl="http://dataservice.accuweather.com/locations/v1/cities/search";
//     const query=`?apikey=${key}&q=${city}`;

//     const response=await fetch(baseUrl+query);
//     const data=await response.json();
//     //We are taking the closest match thats why we are returning the first array
//     return data[0];
// };

//The getCity returns a promise which we target using then()
//And then we use the Key we get to pass onto the getWeather()
//The getWeather() returns a promise which we then target using then()
//The below code is used for Testing Purposes
// getCity("Thrissur")
//     .then(data=>{
//         return getWeather(data.Key);
//     })
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err));