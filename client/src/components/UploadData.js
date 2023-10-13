import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from '../Header'
import Menu from '../Menu'
import Footer from '../Footer'
import axios from 'axios'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const UploadData = () => {
    const [file, setFile] = useState("");
    const [totalCountCdr, setTotalCount] = useState("");

    const [btn, setBtn] = useState({
        buttonText: "Upload",
    })
    const { buttonText } = btn

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    //Upload File
    const addFile = async (e) => {
        e.preventDefault();
        if (!file) {
            return false;
        } else {
            setBtn({
                buttonText: "Uploading",
            })
            var formData = new FormData();
            formData.append("uploadFile", file);
            const res = await fetch(`${url}/api/upload-data`, {
                method: "POST",
                body: formData,
            });
            formData = await res.json();
            setBtn({
                buttonText: "Upload",
            })
            if (formData.chk === "0") {
                toast.success("Uploaded Sucessfully");

                setTotalCount(formData.totalCount);
            } else if (formData.chk === "1") {
                toast.error(formData.error);
            } else if (formData.chk === "2") {
                toast.error("Only CSV files are allowed!");
            }
        }
    };

    return (
        <div>
            <Header />
            <Menu />
            <ToastContainer />
            <div style={{ minHeight: "36rem" }} className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <div className="card card-info">
                                    <div className="card-header ">
                                        <h6 style={{ fontSize: "13px" }} className="col-md-5">
                                            Upload Data
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form
                                            id="form"
                                            noValidate
                                            className="needs-validation"
                                            encType="multipart/form-data"
                                            onSubmit={addFile}
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <label
                                                        style={{ fontSize: "12.4px" }}
                                                        className=" text-muted"
                                                    >
                                                        Upload Data
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        filename="uploadFile"
                                                        onChange={handleFile}
                                                        style={{ fontSize: "12.5px" }}
                                                        className="form-control-file"
                                                        type="file"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please choose a CSV file.
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label
                                                        style={{ fontSize: "12.4px" }}
                                                        className=" text-muted"
                                                    ></label>
                                                </div>
                                                <div className="col">
                                                    <button
                                                        style={{
                                                            marginTop: "15px",
                                                            fontSize: "12.5px",
                                                            marginRight: "10px ",
                                                        }}
                                                        type="submit"
                                                        id="uploadSubmit"
                                                        className="btn btn-info"
                                                    >
                                                        {buttonText}
                                                    </button>
                                                </div>
                                            </div>

                                            <hr></hr>
                                            <div className="row mt-4">
                                                <p
                                                    style={{ fontSize: "11.5px", fontWeight: "bold" }}
                                                    className="col-md-6"
                                                >
                                                    Total enteries uploaded :{" "}
                                                    <span style={{ color: "green" }}>
                                                        {totalCountCdr}
                                                    </span>{" "}
                                                </p>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default UploadData