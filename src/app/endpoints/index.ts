import { environment } from "src/environments/environment.development"



const endpoints = {
    LOGIN: `https://postman-echo.com/basic-auth`,
    SIGNUP: `${environment.BASE_URL}/signupx`
  };
  
  export default endpoints;