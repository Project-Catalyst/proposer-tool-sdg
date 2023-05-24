import axios from 'axios';
import phdiData from '@/assets/data/hdr22.json'

const base_url = 'https://proposer-sdg-tool-api.ze.lc/api/v1'

export default {
  goals(){
    return axios.get(`${base_url}/sdgGoals`)
  },
  tags(){
    return axios.get(`${base_url}/keywords`)
  },
  subgoals(goals_ids){
    let query = goals_ids.map((id) => `sdgIds=${id}`).join("&")
    return axios.get(`${base_url}/subgoals?${query}`)
  },
  metrics(subgoals_ids){
    let query = subgoals_ids.map((id) => `sgIds=${id}`).join("&")
    return axios.get(`${base_url}/metrics?${query}`)
  },
  uhriIndexes(goals_ids, subgoals_ids, countries, regions, themes){
    // assume there will always be Goals and Subgoals
    let query = goals_ids.map((id) => `sdgIds=${id}`).join("&")
    query = query + "&" + subgoals_ids.map((id) => `sgIds=${id}`).join("&")

    if(countries.length > 0){
      query = query + "&" + countries.map((el) => `countries=${el.name}`).join("&")
    }
    if(regions.length > 0){
      query = query + "&" + regions.map((el) => `regions=${el.name}`).join("&")
    }
    if(themes.length > 0){
      query = query + "&" + themes.map((el) => `themes=${el.name}`).join("&")
    }
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
  },
  phdiIndexes() {
    return new Promise((resolve) => {
      if(phdiData.length > 0){
        resolve(phdiData);
      } else { resolve([]) }
    });
  }
}
