import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, makeStyles } from '@material-ui/core';
import { LOGIN_SUCCESS } from '../store/actionTypes';

function initialState() {
    return { username: '', password: '' }
}
const useStyles = makeStyles((theme) => ({
    form: {
      padding: 30
    }
  }));
  
const Login = (props) => {
    const styles = useStyles();
    const [values, setValues] = useState(initialState);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    function onSubmit(event) {
        event.preventDefault();
        login(values);
        setError(error);
        setValues(initialState);
    }
    function login({ username, password }) {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.myId !== -1) {
                    console.log(data.myId)
                    props.closeDialog()
                    dispatch({type:LOGIN_SUCCESS, data: {
                        userId:data.myId,
                        myFavs:data.myFavs
                        }
                    })
                }
            })
    }
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <label>
                <p>Email</p>
                <Input type="text" id="username" name="username" onChange={onChange} value={values.username}></Input>
            </label>
            <br /><br />
            <label>
                <p>Senha</p>
                <Input type="password" id="password" name="password" onChange={onChange} value={values.password}></Input>
            </label>
            <br /><br />
            <Button type="submit">Login</Button>
            {error ? <span> Deu erro! </span> : <></>}
        </form>
    )
}

export default Login