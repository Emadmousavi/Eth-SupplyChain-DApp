import React, {useRef, useState} from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleDataContext";
import Navbar from "../../components/Navbar";
import { useStyles } from "../../components/Styles";
import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader";

export default function Manufacture(props) {
    const supplyChainContract = props.supplyChainContract;
    const classes = useStyles();
    const { roles } = useRole();
    const [loading, setLoading] = React.useState(false);
    const [fvalid, setfvalid] = React.useState(false);

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedCID, setUploadedCID] = useState(null);

    const navItem = [
        ["Add Product", "/manufacturer/manufacture"],
        ["Ship Product", "/manufacturer/ship"],
        ["All Products", "/manufacturer/allManufacture"],
    ];
    const [manuForm, setManuForm] = React.useState({
        id: 0,
        manufacturerName: "",
        manufacturerDetails: "",
        manufacturerLongitude: "",
        manufacturerLatitude: "",
        productName: "",
        productCode: 0,
        productPrice: 0,
        productCategory: "",
    });

    const handleFileUpload = async (event) => {
        try {
            const file = event.target.files[0]
            console.log("selectedFile: ", file)
            const uploadUrl = 'http://127.0.0.1:8500/bzz:/';

            const response = await axios.post(uploadUrl, file, {
              headers: {
                'Content-Type': 'application/octet-stream',
              },
            }).then((cid) => {
              console.log("cid: ", cid.data)
              setUploadedCID(cid.data);
            });

        } catch (error) {
          console.error('Error uploading file:', error);
        }

    };

    const handleFileUplo = async () => {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
          console.log("selectedFile: ",selectedFile)
    
          // Replace the following URL with your Swarm node's HTTP API endpoint
          const uploadUrl = 'http://127.0.0.1:8500/bzz:/';
    
          const response = await axios.post(uploadUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then((cid) => {
            console.log("cid: ", cid)
          });

          const cid = response.headers.location;
          setUploadedCID(cid);
          alert('File uploaded successfully! CID: ' + cid);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    };

    const handleChangeManufacturerForm = async (e) => {
        setManuForm({
            ...manuForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitManufacturerForm = async () => {
        setLoading(true);
        
        if (manuForm.manufacturerName !== "" && manuForm.manufacturerDetails !== "" && manuForm.manufacturerLongitude !== "" && manuForm.manufacturerLatitude !== "" && manuForm.productName !== "" && manuForm.productCode !== 0 && manuForm.productPrice !== 0 && manuForm.productCategory !== "") {
            setfvalid(false);
            await supplyChainContract.methods.manufactureProduct(manuForm.manufacturerName, manuForm.manufacturerDetails, manuForm.manufacturerLongitude, manuForm.manufacturerLatitude, manuForm.productName, parseInt(manuForm.productCode), parseInt(manuForm.productPrice), manuForm.productCategory, uploadedCID).send({ from: roles.manufacturer, gas: 999999 })
                // .then(console.log)
                .on('transactionHash', function (hash) {
                    console.log("product added, tx hash:", hash)
                    handleSetTxhash(hash);
                });
                setManuForm({
                    id: 0,
                    manufacturerName: "",
                    manufacturerDetails: "",
                    manufacturerLongitude: "",
                    manufacturerLatitude: "",
                    productName: "",
                    productCode: 0,
                    productPrice: 0,
                    productCategory: "",
                })
                setUploadedCID("")
        } else {
            setfvalid(true);
        }
        setLoading(false);
    };

    const handleSetTxhash = async (hash) => {
        await supplyChainContract.methods
            .setTransactionHashOnManufacture(hash)
            .send({ from: roles.manufacturer, gas: 900000 });
    };

    const createProduct = async () => {
        setLoading(true);
        for (var i = 0; i < 5; i++) {
            await supplyChainContract.methods
                .manufactureProduct(
                    "product" + i,
                    "manufacturer" + 1,
                    "98",
                    "89",
                    "mi" + i,
                    99 + i,
                    12000,
                    "electronics"
                )
                .send({ from: roles.manufacturer, gas: 999999 })
                .on("transactionHash", function (hash) {
                    handleSetTxhash(hash);
                });
        }
        setLoading(false);
    };

    return (
        <>
            <Navbar pageTitle={"Manufacturer"} navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className={classes.FormWrap}>
                            <h1 className={classes.pageHeading}>Add Product</h1>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="manufacturerName"
                                        variant="outlined"
                                        value={manuForm.manufacturerName}
                                        onChange={handleChangeManufacturerForm}
                                        label="Manufacturer Name"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="manufacturerDetails"
                                        variant="outlined"
                                        value={manuForm.manufacturerDetails}
                                        onChange={handleChangeManufacturerForm}
                                        label="Manufacturer Details"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="manufacturerLongitude"
                                        variant="outlined"
                                        value={manuForm.manufacturerLongitude}
                                        onChange={handleChangeManufacturerForm}
                                        label="Longitude"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="manufacturerLatitude"
                                        variant="outlined"
                                        value={manuForm.manufacturerLatitude}
                                        onChange={handleChangeManufacturerForm}
                                        label="Latitude"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="productName"
                                        variant="outlined"
                                        value={manuForm.productName}
                                        onChange={handleChangeManufacturerForm}
                                        label="Product Name"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="productCode"
                                        variant="outlined"
                                        value={manuForm.productCode}
                                        onChange={handleChangeManufacturerForm}
                                        label="Product Code"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="productPrice"
                                        variant="outlined"
                                        value={manuForm.productPrice}
                                        onChange={handleChangeManufacturerForm}
                                        label="Product Price"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="productCategory"
                                        variant="outlined"
                                        value={manuForm.productCategory}
                                        onChange={handleChangeManufacturerForm}
                                        label="Product Category"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        name="Attachment"
                                        variant="outlined"
                                        value="Attachment"
                                        label="Attachment"
                                        onChange={handleChangeManufacturerForm}
                                        style={{ width: "100%" }}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    />
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        id="file-input"
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }} // Hide the file input
                                        onChange={handleFileUpload}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large" // Set the button size to large
                                        style={{ width: '100%', cursor: 'pointer' }} // Additional styling
                                        onClick={() => {
                                            fileInputRef.current.click(); // Trigger the hidden file input
                                        }}
                                    >
                                        Upload File
                                    </Button>
                                </Grid>
                                {/* Display the CID if available */}
                                {uploadedCID && (
                                  <Grid item xs={12}>
                                    <TextField
                                      variant="outlined"
                                      value={uploadedCID}
                                      label="CID"
                                      style={{ width: '100%' }}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
                                  </Grid>
                                )}
                            </Grid>
                            <br />
                            <p><b style={{ color: "red" }}>{fvalid ? "Please enter all data" : ""}</b></p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmitManufacturerForm}
                            >
                                SUBMIT
              </Button>

                            <br />
                            <br />


                        </div>
                    </>
                )}
            </Navbar>
        </>
    );
}
