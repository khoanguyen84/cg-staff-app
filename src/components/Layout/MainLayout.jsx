import React from "react";
import Navbar from "./Navbar";

function MainLayout(props) {
    const {children} = props;
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
export default MainLayout;