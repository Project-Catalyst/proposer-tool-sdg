import axios from 'axios';

// const base_url = 'http://142.93.138.243:5000/api/v1/humanRights'

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
  countries(goals_ids, subgoals_ids){
    // return: unique countries given ids
    // list of values
    console.log(">> API.countries")
    console.log("SDG-Goals IDs")
    console.log(goals_ids)
    console.log("Subgoals IDs")
    console.log(subgoals_ids)

    // params = {
    //   G_ID: goals_ids,        // array[int]
    //   SG_ID: subgoals_ids     // array[str]
    // }

    // return axios.get(`${base_url}/countries`)
    return axios.get('_countries.json') 
  },
  regions(goals_ids, subgoals_ids){
    // return: unique regions given ids
    console.log(">> API.regions")
    // console.log("SDG-Goals IDs")
    console.log(goals_ids)
    // console.log("Subgoals IDs")
    console.log(subgoals_ids)

    //   return axios.get('base_url/endpointPath', {
    //                 params: {
    //                         G_ID: goals_ids,        // array[str]
    //                         SG_ID: subgoals_ids     // array[str]
    //                     }
    //                 })
    return axios.get('_regions.json')
  },
  themes(goals_ids, subgoals_ids){
    // return: unique themes given ids
    console.log(">> API.themes")
    // console.log("SDG-Goals IDs")
    console.log(goals_ids)
    // console.log("Subgoals IDs")
    console.log(subgoals_ids)

    //   return axios.get('base_url/endpointPath', {
    //                 params: {
    //                         G_ID: goals_ids,        // array[str]
    //                         SG_ID: subgoals_ids     // array[str]
    //                     }
    //                 })
    return axios.get('_themes.json')      
  }
}