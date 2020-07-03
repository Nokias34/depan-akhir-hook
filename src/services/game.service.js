import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://gaming-pakde-23422.herokuapp.com/api';

class GameDataService {

    getAll(){
        return axios.get(API_URL+"/game" , {headers : authHeader()});
    }

    getPublished(){
        return axios.get(API_URL+"/game/published" );
    }

    get(id){
        return axios.get(`${API_URL}/game/${id}`, {headers : authHeader()});
    }

    getUser(id){
        return axios.get(`${API_URL}/game/user/${id}`, {headers : authHeader()});
    }

    create(data){
      //  console.log(axios.post(API_URL+"/game",data ,{headers : authHeader()}));
        return axios.post(`${API_URL}/game`,data ,{headers : authHeader()});
    }

    update(id, data){
        return axios.put(`${API_URL}/game/${id}`, data, {headers : authHeader()});
    }

    delete(id) {
        //console.log(axios.delete(`${API_URL}/game/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/game/${id}`, {headers : authHeader()});
    }

    deleteUser(id) {
        //console.log(axios.delete(`${API_URL}/game/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/game/user/${id}`, {headers : authHeader()});
    }
    
    deleteAll() {
        return axios.delete(`${API_URL}/game`, {headers : authHeader()});
    }
    
    findByTitle(title) {
        return axios.get(`${API_URL}/game?title=${title}`, {headers : authHeader()});
    }
}

export default new GameDataService;