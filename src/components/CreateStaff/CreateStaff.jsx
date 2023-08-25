import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DepartmentService from "../../services/departmentService";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import StaffService from "../../services/staffService";
import { toast } from "react-toastify";
import useFetchDepartment from "../../hooks/useFetchDepartment";
import noAvatar from '../../assets/images/noAvatar.jpg'
import FileServive from "../../services/fileService";
import Helper from "../../helper/helper";


const schema = yup.object({
    email: yup.string().email("Please enter a valid email").required(),
    name: yup.string()
        .min(5, "username phải nhiều hơn 5 ký tự")
        .max(20)
        .required()
})

function CreateStaff() {
    const [departmentList, setDepartmentList] = useState([])
    useEffect(() => {
        async function getData() {
            let res = await DepartmentService.getDepartments();
            setDepartmentList(res.data)
        }

        getData();

        // cleanup function
        // return async () => {
        //     if(uploadedAvatar){
        //         let filename = Helper.getFilename(uploadedAvatar)
        //         await FileServive.destroyAvatar(filename)
        //     }
        // }
    }, [])
    // const departmentList = useFetchDepartment();

    const [selectAvatar, setSelectAvatar] = useState({
        file: null,
        fakeUrl: ''
    })
    const [uploadedAvatar, setUploadedAvatar] = useState()
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const handleCreateStaff = async (data) => {
        data = {
            ...data,
            department: JSON.parse(data.department),
            avatar: uploadedAvatar || ''
        }

        console.log(data);
        let createRes = await StaffService.createStaff(data);
        if (createRes && createRes.data) {
            toast.success(`Staff: ${createRes?.data?.name} created success`);
            navigate('/staff/list')
        }
    }

    const handleSelectAvatar = (e) => {
        const temporaryAvatarUrl = URL.createObjectURL(e.target.files[0])
        setSelectAvatar({
            file: e.target.files[0],
            fakeUrl: temporaryAvatarUrl
        })
    }

    const handleUploadAvatar = async () => {
        setUploading(true);
        const uploadResult = await FileServive.uploadAvatar(selectAvatar.file);
        if (uploadResult?.data && Object.keys(uploadResult?.data).length) {
            setUploadedAvatar(uploadResult?.data.url);
            toast.info("Avatar uploaded success", {position: "bottom-right", autoClose: 2 * 1000});
            setUploading(false);
        }
    }

    return (
        <>
            <section className="staff-list-info">
                <div className="container">
                    <div className="d-flex">
                        <h5 className="text-primary me-2">Create Staff</h5>
                        <Link className="btn btn-sm btn-outline-warning" to={'/staff/list'}>
                            <i className="fa fa-arrow-left me-2" />
                            Back to Staff list
                        </Link>
                    </div>
                    <p className="text-primary fst-italic">
                        Duis incididunt sit cupidatat aliquip quis reprehenderit. In mollit enim consectetur in ullamco officia enim officia pariatur. Ipsum aute deserunt pariatur quis Lorem eiusmod officia elit sint ipsum fugiat nulla exercitation. Tempor deserunt proident sint sunt ea incididunt reprehenderit. Occaecat aliqua nisi quis incididunt sint duis proident laboris. Duis cillum ex velit id. Sunt elit laboris labore pariatur.
                    </p>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={handleSubmit(handleCreateStaff)}>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Name</label>
                                    <input type="text" className="form-control" {...register("name")} />
                                    <span className="text-danger">{errors?.name?.message}</span>

                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Email</label>
                                    <input type="email" className="form-control" {...register('email', {
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        },
                                    })} />
                                    <span className="text-danger">{errors?.email?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable me-2">Gender</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" value={"male"} defaultChecked={true} {...register('gender')} />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" value={'female'} {...register('gender')} />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Department</label>
                                    <select className="form-control" {...register("department")}>
                                        {
                                            departmentList?.map((depart) => (
                                                <option key={depart.id} value={JSON.stringify(depart)}>{depart.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <button type="submit" className="btn btn-sm btn-danger">Create</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img role="button" src={selectAvatar.fakeUrl || noAvatar} className="card-img-top" alt=""
                                    onClick={() => document.getElementById('fileUpload').click()}
                                />
                            </div>
                            <div className="card-footer">
                                <input type="file" accept="image/*" className="d-none" id="fileUpload"
                                    onChange={handleSelectAvatar}
                                />
                                <div className="d-grid gap-2">
                                    {
                                        uploading ? (
                                            <button className="btn btn-sm btn-dark" type="button" disabled="">
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                Uploading...
                                            </button>
                                        ) : (
                                            <button className="btn btn-sm btn-dark"
                                                onClick={handleUploadAvatar}
                                            >Upload</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default CreateStaff;