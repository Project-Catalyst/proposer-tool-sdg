import axios from 'axios';

const base_url = 'http://142.93.138.243:5000/api/v1'

export default {
  uhriIndexes(goals_ids, subgoals_ids, country, region, theme){
    // Return:
    // UHRI TITLES
    console.log(">> API.titles")
    console.log(goals_ids)
    console.log(subgoals_ids)
    console.log(country)
    console.log(region)
    console.log(theme)
    
    // return axios.get('base_url/endpointPath', {
    //             params: {
    //                     G_ID: goals_ids,        // array[str]
    //                     SG_ID: subgoals_ids,    // array[str]
    //                     COUNTRY: country,       // TYPE?
    //                     REGION: region,         // TYPE?
    //                     THEME: theme,           // TYPE?
    //                 }
    //             })
    return axios.get('_texts.json')
  },
  countries(){
    return axios.get(`${base_url}/countries`)
  },
  regions(){
    return axios.get(`${base_url}/regions`)
  },
  themes(){
    return axios.get(`${base_url}/themes`)   
  }
}