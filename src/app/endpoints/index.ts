import { environment } from "src/environments/environment.development"



const endpoints = {
    LOGIN: `${environment.BASE_URL}/login`,
    SIGNUP: `${environment.BASE_URL}/signupx`
  };
  
  export default endpoints;