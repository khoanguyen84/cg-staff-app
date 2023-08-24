import axios from "axios";
import { DEPARTMENT_API_URL } from "./common";

class DepartmentService{
    static getDepartments(){
        return axios.get(DEPARTMENT_API_URL)
    }
}

export default DepartmentService;