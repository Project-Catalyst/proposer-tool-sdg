import axios from 'axios';

const base_url = 'http://142.93.138.243:5000/api/v1'

export default {
  goals(){
    return axios.get(`${base_url}/sdgGoals`)
  },
  tags(){
    return axios.get(`${base_url}/keywords`)
  },
  uhriIndexes(goals_ids, subgoals_ids, countries, regions, themes){
    
    console.log(">> API.uhriIndexes")
    console.log("GOALS:")
    console.log(goals_ids)
    console.log("SUB-GOALS:")
    console.log(subgoals_ids)
    
    // assume there will always be Goals and Subgoals
    let query = goals_ids.map((id) => `sdgIds=${id}`).join("&")
    query = query + "&" + subgoals_ids.map((id) => `sgIds="${id}"`).join("&")

    if(countries.length > 0){
      query = query + "&" + countries.map((el) => `country="${el.name}"`).join("&")
    }
    if(regions.length > 0){
      query = query + "&" + regions.map((el) => `region="${el.name}"`).join("&")
    }
    if(themes.length > 0){
      query = query + "&" + themes.map((el) => `theme="${el.name}"`).join("&")
    }
    console.log('QUERY:')
    console.log(query)

    return axios.get(`${base_url}/humanRights?${query}`)
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