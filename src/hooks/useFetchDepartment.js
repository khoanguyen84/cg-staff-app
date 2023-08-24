import { useState, useEffect } from "react"
import DepartmentService from "../services/departmentService";

const useFetchDepartment = () => {
    const [departmentList, setDepartmentList] = useState([])
    useEffect(() => {
        async function getData() {
            let res = await DepartmentService.getDepartments();
            setDepartmentList(res.data)
        }

        getData();
    }, [])

    return departmentList;
}

export default useFetchDepartment;