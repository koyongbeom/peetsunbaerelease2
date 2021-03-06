import { Alert, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';
import { Socket } from 'socket.io-client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

interface props {
    socket : Socket;
}

const Upload: React.FC<props> = (props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [files, setFiles] = useState<any>([]);
    const [filenames, setFileNames] = useState<string[]>([]);

    const [titleExist, setTitleExist] = useState(false);
    const [descriptionExist, setDescriptionExsit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);

    const buttonStyles = {
        display: "flex",
        justifyContent: "flex-end",
    }

    const spanStyles = {
        fontFamily: "Apple_R",
        fontSize: "14px"
    }

    const spanStyles2 = {
        fontFamily: "Apple_B",
        fontSize: "14px"
    }

    const imageBox = {

    }

    const divStyle = {
        marginBottom: "12px"
    }

    const imageStyle = {
        width: "32px",
        marginLeft: "6px",
        cursor: "pointer"
    }

    const filenameDiv = {
        display: "flex",
        alignItems: "center",

    }

    const filenameStyle = {
        display: "flex",
        alignItems: "center",
        marginLeft: "12px",
        marginBottom: "6px",
    }

    const filenameDivStyle = {
        fontFamily: "Apple_R"
    }

    const times = {
        width: "12px",
        marginRight: "16px",
        verticalAlign: "text-bottom",
        marginLeft: "6px",
        cursor: "pointer"
    }

    const writeTitle = (event: any) => {
        setTitle(event.target.value);
        setUploadBool(false);
        if(event.target.value){
            setTitleExist(true);
        }else{
            setTitleExist(false);
        }
    }

    const writeDescription = (event: any) => {
        setDescription(event.target.value);
        setUploadBool(false);
        if(event.target.value){
            setDescriptionExsit(true);
        }else{
            setDescriptionExsit(false);
        }
    }

    const fileOnChange = (event: any) => {
        if (event.target) {
            const length = event.target.files.length;
            var i;
            var newFilenames = filenames;
            var newFiles = files;
            for (i = 0; i < length; i++) {
                newFilenames = [...newFilenames, event.target.files[i].name];
                newFiles.push(event.target.files[i]);
            }
            setFiles(newFiles);
            setFileNames(newFilenames);
        }
    }

    const deleteImage = (event: any) => {
        if (event.target) {
            console.log(files.length);
            var newFilenames = filenames;
            var newFiles = files;
            newFilenames = newFilenames.filter((filename) => (filename !== event.target.dataset.name));
            newFiles = newFiles.filter((file: any) => (file.name !== event.target.dataset.name));
            setFileNames(newFilenames);
            setFiles(newFiles);
        }
    }

    const submit = (e : any) => {
        e.preventDefault();
        setLoading(true);

        var formData = new FormData();
        var message = { title: title, description: description };
        formData.append("message", JSON.stringify(message));

        files.forEach((file: any) => {
            formData.append('notification_picture', file);
        })

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/notification/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials : "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                    if (response.message === "success") {
                        setTitle("");
                        setDescription("");
                        setFiles([]);
                        setFileNames([]);
                        setUploadBool(true);
                        setTitleExist(false);
                        setDescriptionExsit(false);
                        props.socket.emit("newNotification");


                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }





    return (
        <div>
            <form encType="multipart/formdata">

                <div>
                    <div style={divStyle}>??????</div>
                    <TextField value={title} onChange={writeTitle} required sx={{ backgroundColor: "white", marginBottom: 3 }} id="title" fullWidth variant="outlined" placeholder="????????? ???????????????" />
                </div>

                <div>
                    <div style={divStyle}>????????? ??????</div>
                    <TextField value={description} onChange={writeDescription} required sx={{ backgroundColor: "white", marginBottom: 1 }} id="description" multiline rows={12} fullWidth variant="outlined" placeholder="????????? ???????????????" />
                </div>

                <div style={filenameDiv}>

                    <label htmlFor="file">
                        <img style={imageStyle} src="img/images-light.svg" alt="images">
                        </img>
                    </label>
                    <div style={filenameStyle}>
                        {filenames.map((filename) => (<div style={filenameDivStyle} data-name={filename} key={filename}>{filename}<img onClick={(e) => { deleteImage(e); }} style={times} data-name={filename} alt="cancel" src="img/times-light.svg"></img></div>))}
                    </div>
                    <input onChange={(e) => { fileOnChange(e) }} type="file" name="file" id="file" accept="image/*" multiple hidden />
                </div>


                {loading &&
                <Box sx={{width : '100%', marginTop : 3, marginBottom : 3}}>
                    <LinearProgress />
                </Box>
                }



                {uploadBool &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span style={spanStyles2}>????????? ?????? !</span></Alert>
                    </Stack>
                }


                <div style={buttonStyles}>
                    <Link to="/dashboard/home">
                        <Button sx={{ marginRight: 2 }} variant="outlined" size="large" component="label">
                            <span style={spanStyles2}>??????</span>
                        </Button>
                    </Link>
                    <Button disabled={!titleExist || !descriptionExist} onClick={(e : any)=>{submit(e);}} variant="outlined" size="large" component="label">
                        <span style={spanStyles2}>?????? ?????????</span>
                    </Button>
                </div>



            </form>
        </div>
    )
}

export default Upload;