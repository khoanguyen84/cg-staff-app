import React, { useState, useEffect } from "react";
import StaffService from "../../services/staffService";
import { Link } from "react-router-dom";

function StaffList() {
    const [staffList, setStaffList] = useState([])

    useEffect(() => {
        async function getData() {
            let res = await StaffService.getStaff();
            setStaffList(res.data)
        }
        getData();
    }, [])
    return (
        <>
            <section className="staff-list-info">
                <div className="container">
                    <div className="d-flex">
                        <h5 className="text-primary me-2">Staff List</h5>
                        <Link className="btn btn-sm btn-outline-warning" to={'/staff/create'}>
                            <i className="fa fa-plus me-2"/>
                            Add Staff
                        </Link>
                    </div>
                    <p className="text-primary fst-italic">
                        Aliquip minim labore dolore ullamco mollit. Dolor excepteur eu sint officia reprehenderit fugiat laborum ex in nulla do do. Tempor nulla ullamco occaecat ullamco id exercitation ea sit voluptate officia elit do ad. Officia sint aute est cillum. Est eiusmod ex officia deserunt exercitation tempor esse elit nulla Lorem labore non consequat.
                    </p>
                </div>
            </section>
            <section className="staff-list">
                <div className="container">
                    <div className="row">
                        {
                            staffList?.map((staff) => (
                                <div className="col-sm-3 mb-3">
                                    <div className="card">
                                        <img src={staff.avatar} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{staff.name}</h5>
                                        <p className="card-text">{staff.gender}</p>
                                        <p className="card-text">{staff.email}</p>
                                        <p className="card-text">{staff.department?.name}</p>
                                        <a href="#" class="btn btn-primary">Detail</a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default StaffList;