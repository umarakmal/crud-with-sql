import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { getCookie, signout } from "./auth/helpers";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";
function CustomToolbar({ setFilterButtonEl }) {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton ref={setFilterButtonEl} />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const DataTable = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!getCookie('token'))
    //         signout(() => {
    //             navigate("/");
    //         })
    // }, [navigate]);
    const [isLoading, setIsLoading] = useState(false);
    const [isData, setIsData] = useState(false);
    const columns = [
        {
            field: "id",
            headerName: "S.No.",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            width: 60,
        },
        {
            field: "name",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Name",
            width: 150,
        },
        {
            field: "phone",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Mobile No.",
            width: 100,
        },
        {
            field: "email",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Email",
            width: 100,
        },
    ];

    const [getuserdata, setUserdata] = useState([]);

    // const postData = async () => {
    //     const res = await fetch(`${url}/api/test`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     {
    //         const data = await res.json();
    //         if (data.length > 0) {
    //             console.log(data);
    //             setUserdata(data);
    //         } else {
    //             setUserdata([])
    //         }
    //     }
    // };

    useEffect(() => {
        const postData = async () => {
            setIsLoading(true);
            setIsData(false)
            // console.log(`${url}/api/test`);
            const response = await fetch(`${url}/api/test`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            if (response.status === 200) {
                // console.log(data);
                setIsLoading(false);
                setIsData(true)
                setUserdata(data);
            }
        }
        postData()
    }, [])

    // function padTo2Digits(num) {
    //     return num.toString().padStart(2, "0");
    // }

    // function formatDate(date) {
    //     return [
    //         padTo2Digits(date.getDate()),
    //         padTo2Digits(date.getMonth() + 1),
    //         date.getFullYear(),
    //     ].join("-");
    // }

    const rows = getuserdata.map((element, index) => ({
        id: index + 1,
        _id: element.id,
        phone: element.phone,
        name: element.name,
        email: element.email,
    }));

    return (
        <>
            <Header />
            <Menu />
            <ToastContainer />
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header"></div>
                {/* /.content-header */}
                {/* Main content */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card card-primary card-outline">
                                    <div className="card-body">
                                        <h5 style={{ fontSize: "1rem" }} className="card-title">
                                            Datatable
                                        </h5>
                                        <br />
                                        <hr />
                                        <form>
                                            {isLoading && <center><Spinner animation="border" role="status">
                                                <span className="visually-hidden"></span>
                                            </Spinner></center>}
                                            {isData ?
                                                <div className="card mt-2">
                                                    <DataGrid
                                                        style={{ fontWeight: "400" }}
                                                        slots={{
                                                            toolbar: CustomToolbar,
                                                        }}
                                                        density="compact"
                                                        autoHeight
                                                        getRowId={(element) => element._id}
                                                        rows={rows}
                                                        columns={columns}
                                                        pageSizeOptions={[8]}
                                                        initialState={{
                                                            pagination: {
                                                                paginationModel: {
                                                                    pageSize: 8,
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                : null}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DataTable;
