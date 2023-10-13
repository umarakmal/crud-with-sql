import React, { useState, useEffect } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import Menu from '../../Menu'
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

const url = `${process.env.REACT_APP_BACKEND_URL}`

const UserManage = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [getids, setIds] = useState("")
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
            field: "username",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Username",
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
        {
            field: "action",
            headerClassName: "font-weight-bold small",
            cellClassName: "small ",
            headerName: "Action",
            width: 100,
            renderCell: (row) => (
                <td className="d-flex ">
                    {/* <td> */}
                    <button className="btn btn-sm btn-primary" onClick={(e) => handleModal(e, row.row._id)}>
                        <i className="nav-icon fas fa-edit" />
                    </button>
                    {/* </td> */}

                    <button
                        style={{ marginLeft: "1px" }}
                        className="btn btn-sm btn-danger"
                        onClick={(e) =>
                            window.confirm(
                                "Are you sure you want to delete?"
                            )
                                ? deleteuser(row.row._id)
                                : e.preventDefault()
                        }
                    >
                        <i className="nav-icon fas fa-trash" />
                    </button>

                </td>
            )
        },
    ];

    const handleModal = async (e, id) => {
        e.preventDefault()
        setIds(id)
        setModalShow(true)
    };

    const [getuserdata, setUserdata] = useState([]);
    const postData = async () => {

        const response = await fetch(`${url}/api/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        if (response.status === 200) {
            setUserdata(data);
        }
    }
    useEffect(() => {
        postData()
    }, [])

    const rows = getuserdata.map((element, index) => ({
        id: index + 1,
        _id: element.id,
        phone: element.phone,
        name: element.name,
        email: element.email,
        username: element.username,
    }));

    const deleteuser = async (id) => {
        const res2 = await fetch(`${url}/api/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deletedata = await res2.json();
        if (res2.status === 422 || !deletedata) {
            toast.error("Error");
        } else {
            postData()
            toast.success("Deleted Successfully!");
        }
    };

    //Edit And Add Modal
    function EditModal(props) {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            password: "",
            phone: "",
            username: "",
        });
        const nameChange = (e) => {
            setFormData({ ...formData, name: e.target.value })
        }
        const usernameChange = (e) => {
            setFormData({ ...formData, username: e.target.value })
        }
        const emailChange = (e) => {
            setFormData({ ...formData, email: e.target.value })
        }
        const passwordChange = (e) => {
            setFormData({ ...formData, password: e.target.value })
        }
        const mobileChange = (e) => {
            setFormData({ ...formData, phone: e.target.value })
        }

        useEffect(() => {
            if (props.ids) {
                const postData = async () => {
                    const response = await fetch(`${url}/api/${props.ids}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    const data = await response.json();
                    if (response.status === 200) {
                        setFormData({
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            username: data.username,
                        })
                    }
                }
                postData()
            }
        }, [props.ids])

        const handleSubmit = async (e) => {
            e.preventDefault()
            const name = formData.name
            const email = formData.email
            const password = formData.password
            const phone = formData.phone
            const username = formData.username
            if (props.ids) {
                const response = await fetch(`http://localhost:8080/api/${props.ids}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, phone, email, password, username })
                });

                if (!response.ok) {
                    toast.error('Error Occured')
                }
                await response.json();
                if (response.status === 200) {
                    postData()
                    props.onHide()
                    toast.success("Successfully Updated!")
                }
            } else {
                const response = await fetch(`http://localhost:8080/api/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, phone, email, password, username })
                });
                if (!response.ok) {
                    toast.error('Error Occured')
                }
                await response.json();
                if (response.status === 200) {
                    postData()
                    props.onHide()
                    toast.success("Successfully Created!!")
                }
            }
        }
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.ids ? "EDIT USER" : "ADD USER"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >

                        <div className="row">
                            <div className="col-sm-5">
                                {/* textarea */}
                                <div className="form-group">
                                    <label style={{ fontSize: ".7rem" }}>
                                        Name
                                    </label>
                                    <input
                                        style={{ fontSize: ".8rem" }}
                                        type="text"
                                        className="form-control form-control-sm form-control-border"
                                        id="exampleInputBorder"
                                        value={formData.name}
                                        onChange={nameChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-5">
                                {/* textarea */}
                                <div className="form-group">
                                    <label style={{ fontSize: ".7rem" }}>
                                        Username
                                    </label>
                                    <input
                                        style={{ fontSize: ".8rem" }}
                                        type="text"
                                        className="form-control form-control-sm form-control-border"
                                        id="exampleInputBorder"
                                        value={formData.username}
                                        onChange={usernameChange}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <label style={{ fontSize: ".7rem" }}>
                                        Password
                                    </label>
                                    <input
                                        style={{ fontSize: ".8rem" }}
                                        type="text"
                                        className="form-control form-control-sm form-control-border"
                                        id="exampleInputBorder"
                                        value={formData.password}
                                        onChange={passwordChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="form-group">
                                    <label style={{ fontSize: ".7rem" }}>
                                        Email
                                    </label>
                                    <input
                                        style={{ fontSize: ".8rem" }}
                                        type="text"
                                        value={formData.email}
                                        onChange={emailChange}
                                        className="form-control form-control-sm form-control-border"
                                        id="exampleInputBorder"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                                <label style={{ fontSize: ".7rem" }}>
                                    Phone
                                </label>
                                <input
                                    style={{ fontSize: ".8rem" }}
                                    type="text"
                                    className="form-control form-control-sm form-control-border"
                                    id="exampleInputBorder"
                                    value={formData.phone}
                                    onChange={mobileChange}
                                />
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit} className='btn btn-sm btn-primary'>Submit</Button>
                    <Button className='btn btn-sm btn-primary' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>
            <Header />
            <Menu />
            <div>
                <ToastContainer />
                <div className="content-wrapper">
                    <div className="content-header">

                    </div>
                    {/* /.content-header */}
                    <EditModal
                        show={modalShow}
                        ids={getids}
                        onHide={() => setModalShow(false)}
                    />
                    {/* Main content */}
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body">
                                            <h5 className="card-title">User Management</h5>
                                            <button className="btn btn-sm btn-primary " style={{ float: 'right' }} onClick={(e) => handleModal(e)}>
                                                Add User
                                            </button>
                                            <br />
                                            <hr />
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
                                                                pageSize: 8
                                                            }
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserManage