import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03

const weatherProcessor = new WeatherDataProcessor();

const params = {
    idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
    idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message",
    sitySelector: 'select[name="city"]',
    minMaxDates: getMinMaxDates(weatherProcessor.getPeriodInDays()),
    cities: weatherProcessor.getCities()
};
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");
function getMinMaxDates(periodInDays) {
    const date = new Date();
    const beginningDay = date.toISOString().substring(0, 10);
    const day = date.getDate();
    date.setDate(day + periodInDays);
    const finishDay = date.toISOString().substring(0, 10);
    return { minDate: beginningDay, maxDate: finishDay };
}

dataForm.addSubmitHandler( (dataFF) => {
    const promiseData = weatherProcessor.getData(dataFF);
    promiseData.then( data => temperatureList.showResult(data));
})


// dataForm.addSubmitHandler(async (dataFF) => {
//     const promiseData = await weatherProcessor.getData(dataFF);
//     promiseData.then(data => temperatureList.showResult(data));
// })
