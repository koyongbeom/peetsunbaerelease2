import { Button, Divider, fabClasses, FormControl, FormControlLabel, FormHelperText, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import styles from './styles';
import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { red } from '@mui/material/colors';

const React = require("react");

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4400'
        }
    }
})

interface props {
    classes: any,
    history : any,
}

const SignUp: React.FC<props> = (props) => {
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verifiedNumber, setVerifiedNumber] = useState("");
    const [value, setValue] = useState<any>("student");
    const [studentPhoneNumber, setStudentPhoneNumber] = useState("");
    const [forStaffPassword, setForStaffPassword] = useState("");

    const [isParent, setIsParent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    
    const [emailError, setEmailError] = useState(false);
    const [duplicatedEmailError, setDuplicatedEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = useState(false);
    const [nameError, setNameError ] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [verifiedNumberError, setVerifiedNumberError] = useState(false);
    const [expiredVerifyNumberError, setExpiredVerifyNumberError] = useState(false);
    const [studentPhoneNumberError, setStudentPhoneNumberError] = useState(false);
    const [forStaffPasswordError, setForStaffPasswordError] = useState(false);

    const [sendCertBool, setSendCertBool] = useState(false);


    //???????????? ?????? ????????? ??? ????????? ????????? ??????------------------------------------------//
    const submit = (e: any) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setVerifyPasswordError(false);
        setNameError(false);
        setPhoneNumberError(false);
        setVerifiedNumberError(false);
        setDuplicatedEmailError(false);
        setExpiredVerifyNumberError(false);
        setStudentPhoneNumberError(false);
        setForStaffPasswordError(false);


        fetch("https://peetsunbae.com/signup/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                verifyPassword: verifyPassword,
                name: name,
                phoneNumber: phoneNumber,
                verifiedNumber: verifiedNumber,
                value : value,
                studentPhoneNumber : studentPhoneNumber,
                forStaffPassword : forStaffPassword,
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    //invalid email ??? ?????? --------------------------------------------------------
                    if (result.message === "NOT_VALID_EMAIL") {
                        setEmailError(true);
                    }
                    //------------------------------------------------------------------------------
                    //????????? email ????????? ??????-------------------------------------------------------
                    if (result.message === "DUP_EMAIL_ADDRESS") {
                        setDuplicatedEmailError(true);
                    }
                    //-----------------------------------------------------------------------------
                    //8?????? ?????? ???????????? ????????? ??????-------------------------------------------------
                    if (result.message === "NOT_VALID_PASSWORD") {
                        setPasswordError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //???????????? ???????????? ???????????? ?????? ?????? ??????-----------------------------------------
                    if (result.message === "NOT_COINCIDE_PASSWORD") {
                        setVerifyPasswordError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //?????? ???????????? ??? ??????-------------------------------------------------------------
                    if (result.message === "NOT_VALID_NAME"){
                        setNameError(true);
                    }
                    //---------------------------------------------------------------------------------
                    //???????????? - ?????????????????? ??? ??????--------------------------------------------------
                    if (result.message === "NOT_VALID_PHONENUMBER") {
                        setPhoneNumberError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //????????? ??????????????? ?????? ?????? ??? ??????-----------------------------------------------
                    if (result.message === "NOT_COINCIDE_CERT" || result.message === "GET_CERT_NUMBER") {
                        setVerifiedNumberError(true);
                    }
                    //--------------------------------------------------------------------------------
                    //???????????? ???????????? ????????? ??? ??????--------------------------------------------------
                    if (result.message === "CERT_IS_EXPIRED") {
                        setExpiredVerifyNumberError(true);
                    }
                    //---------------------------------------------------------------------------------
                    //???????????? ?????? ?????? ????????? ?????? ????????? ??????------------------------------------------
                    if (result.message === "NO_STUDENT_PHONENUMBER"){
                        setStudentPhoneNumberError(true);
                    }
                    //--------------------------------------------------------------------------------
                    //?????????????????? ?????? ???????????? ????????? ??????---------------------------------------------
                    if(result.message === "NOT_CORRECT_PASSWORD"){
                        setForStaffPasswordError(true);
                    }
                    //------------------------------------------------------------------------------
                    //???????????? ???????????? ?????? ????????? ???????????? ??????---------------------------------------
                    if(result.message === "success"){
                        props.history.push("/")
                    }
                    //--------------------------------------------------------------------------------
                })
        }).catch((error: any) => {
            console.log(error);
        })
    }
    //-----------------------------------------------------------------

    //???????????? ??????----------------------------------------------------------------------------

    const sendCert = (e: any) => {
        e.preventDefault();
        setSendCertBool(true);

        fetch("https://peetsunbae.com/signup/cert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        }).then((result) => {
            result.json()
                .then((body) => {
                    console.log(body);
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    //-----------------------------------------------------------------------------------------

    //??????????????? ????????? ??? ??????-------------------------------------------------------------------
    const handleChange = (event: any) => {
        setIsParent(false);
        setIsTeacher(false);

        setValue(event.target.value);
        if (event.target.value === "parent") {
            setIsParent(true);
        }
        if (event.target.value === "teacher") {
            setIsTeacher(true);
        }
    };
    //------------------------------------------------------------------------------------------

    return (
        <main className={classes.main}>
            <div className={classes.appbar}>
                <div>
                    <img className={classes.logo1} alt="logo" src="img/logo1.svg"></img>
                </div>
                <Link to="/">
                    <div className={classes.login}>
                        <img className={classes.avatar} alt="avatar" src="img/avatarG.svg"></img>
                        <div className={classes.loginText}>?????????</div>
                    </div>
                </Link>
            </div>

            <div className={classes.body}>
                <div className={classes.signUpText}>
                    ????????????
                </div>
                <div>

                    <Box
                        component="form"
                        autoComplete="off"
                    >
                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>????????? ??????</div>
                            <OutlinedInput required={true} error={emailError} onChange={(e) => { setEmail(e.currentTarget.value); }} autoFocus placeholder="????????? ?????? ??????" />
                            {emailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>????????? ????????? ????????? ???????????????.</FormHelperText>}
                            {duplicatedEmailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>????????? ????????? ???????????????.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>????????????</div>
                            <OutlinedInput required={true} error={passwordError} onChange={(e) => { setPassword(e.currentTarget.value); }} type="password" autoFocus placeholder="8~20??? ???????????????" />
                            {passwordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>8?????? ?????? ???????????????.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>???????????? ??????</div>
                            <OutlinedInput required={true} error={verifyPasswordError} onChange={(e) => { setVerifyPassword(e.currentTarget.value); }} type="password" autoFocus placeholder="???????????? ?????? ??????" />
                            {verifyPasswordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>??????????????? ?????? ?????????.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>??????</div>
                            <OutlinedInput required={true} onChange={(e) => { setName(e.currentTarget.value); }} autoFocus placeholder="?????? ??????" />
                            {nameError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>????????? ???????????????.</FormHelperText>}
                        </FormControl>

                        <FormControl required margin="normal">
                            <div className={classes.label}>????????? ??????</div>
                            <div className={classes.phone}>
                                <OutlinedInput required={true} error={phoneNumberError} onChange={(e) => { setPhoneNumber(e.currentTarget.value); }} sx={{ width: '278px' }} autoFocus placeholder="????????? ?????? ??????(-??????)" />
                                <button onClick={sendCert} className={classes.phoneCert}>????????????</button>
                            </div>
                            {phoneNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>- ?????? ???????????????.</FormHelperText>}
                            {verifiedNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>??????????????? ?????? ????????????.</FormHelperText>}

                        </FormControl>

                        {sendCertBool && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>????????????</div>
                            <OutlinedInput required={true} error={verifiedNumberError} onChange={(e) => { setVerifiedNumber(e.currentTarget.value); }} autoFocus placeholder="???????????? ??????" />
                            {expiredVerifyNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>???????????? ???????????? ?????????????????????.</FormHelperText>}
                        </FormControl>}

                        <FormControl margin="normal" fullWidth>
                            <RadioGroup value={value} onChange={handleChange} row aria-label="job" name="row-radio-buttons-group" sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel value="student" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"??????"}</span>} />
                                <FormControlLabel value="parent" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"?????????"}</span>} />
                                <FormControlLabel value="teacher" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"???????????????"}</span>} />
                            </RadioGroup>
                        </FormControl>

                        {isParent && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>?????? ????????? ??????</div>
                            <OutlinedInput required={true} error={studentPhoneNumberError} onChange={(e) => { setStudentPhoneNumber(e.currentTarget.value); }} placeholder="?????? ????????? ?????? ??????(-??????)" />
                            {studentPhoneNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>???????????? ?????? ?????? ???????????????.</FormHelperText>}
                        </FormControl>}

                        {isTeacher && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>?????? ?????? ????????????</div>
                            <OutlinedInput type="password" required={true} error={forStaffPasswordError} onChange={(e) => { setForStaffPassword(e.currentTarget.value); }} placeholder="????????? ???????????? ??????" />
                            {forStaffPasswordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>????????? ???????????? ?????????.</FormHelperText>}
                        </FormControl>}



                        <button onClick={submit} className={classes.submit}>????????????</button>
                        <div className={classes.lastText}>
                            ?????? ??????????????????? <Link to="/"><span>?????????</span></Link>
                        </div>

                    </Box>

                </div>
            </div>
        </main>
    )
}

export default withStyles(styles)(SignUp);