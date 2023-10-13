import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import $ from "jquery";
// import { useNavigate } from "react-router-dom";
// import { getCookie, signout } from "./auth/helpers";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
} from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";
function CustomToolbar({ setFilterButtonEl }) {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton ref={setFilterButtonEl} />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const Report = () => {
    //   const navigate = useNavigate();

    //   useEffect(() => {
    //     if (!getCookie('token'))
    //       signout(() => {
    //         navigate("/");
    //       })
    //   }, []);

    const columns = [
        {
            field: "id",
            headerName: "#",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            // width: 60,
        },
        {
            field: "name",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Name",
            // width: 150,
        },
        {
            field: "email",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Email",
            // width: 150,
        },
        {
            field: "phone",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Phone",
            // width: 150,
        },
        {
            field: "createdAt",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "CreatedAt",
            // width: 150,
        },

    ];
    const [getuserdata, setUserdata] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false);

    const postData = async (e) => {
        e.preventDefault();

        if ($("#date1").val() === "") {
            $("#date1err").show();
        }
        if ($("#date1").val() !== "") {
            $("#date1err").hide();
        }
        if ($("#date2").val() === "") {
            $("#date2err").show();
        }
        if ($("#date2").val() !== "") {
            $("#date2err").hide();
        }
        if (!startDate || !endDate) {
            return false;
        } else {
            const date1 = startDate
            const date2 = endDate

            const res = await fetch(`${url}/api/get-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date1,
                    date2,
                }),
            });
            {
                const data = await res.json();
                if (data.length > 0) {
                    setUserdata(data);
                    // setEndDate(null)
                    // setStartDate(null)
                } else {
                    // setEndDate(null)
                    // setStartDate(null)
                    setUserdata([])
                }
            }
            setShow(true);
        }
    };
    function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join("-");
    }

    const rows = getuserdata.map((element, index) => ({
        id: index + 1,
        _id: element.id,
        name: element.name,
        email: element.email,
        phone: element.phone,
        createdAt: element.createdAt ? formatDate(new Date(element.createdAt)) : null,
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
                                            Report
                                        </h5>
                                        <br />
                                        <hr />
                                        <form>
                                            <div className="row">
                                                <div className="form-group">
                                                    {/* text input */}
                                                    <div className="col-sm-12">
                                                        <label style={{ fontSize: ".7rem" }}>From</label>
                                                        <div>
                                                            <DatePicker
                                                                selected={startDate}
                                                                selectsStart
                                                                className="form-control form-control-sm"
                                                                placeholderText="Select Date"
                                                                value={startDate}
                                                                onChange={(date) => setStartDate(date)}
                                                                dateFormat="dd-MM-yyyy"
                                                                id="date1"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                            <div
                                                                style={{ display: "none", color: "red" }}
                                                                id="date1err"
                                                                className="invalid-feedback"
                                                            >
                                                                Please choose a date.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-sm-12">
                                                        <label
                                                            style={{ fontSize: ".7rem" }}
                                                            htmlFor="date2"
                                                        >
                                                            To:
                                                        </label>
                                                        <div>
                                                            <DatePicker
                                                                selected={endDate}
                                                                dateFormat="dd-MM-yyyy"
                                                                className="form-control form-control-sm"
                                                                selectsEnd
                                                                placeholderText="Select Date"
                                                                minDate={startDate}
                                                                value={endDate}
                                                                onChange={(date) => setEndDate(date)}
                                                                id="date2"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                            <div
                                                                style={{ display: "none", color: "red" }}
                                                                id="date2err"
                                                                className="invalid-feedback"
                                                            >
                                                                Please choose a date.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="mt-1 col-sm-12">
                                                        <label
                                                            style={{ fontSize: ".7rem" }}
                                                            htmlFor="date2"
                                                        ></label>
                                                        <div>
                                                            <button
                                                                type="submit"
                                                                onClick={postData}
                                                                className="btn btn-primary btn-sm"
                                                                id="submit"
                                                            >
                                                                Get Data
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mt-2">
                                                {show ? (
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
                                                ) : null}
                                            </div>
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

export default Report;
