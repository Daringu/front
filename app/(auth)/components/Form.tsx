'use client'
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { IFormState } from "../../../interfaces";
import { Variant, inputEvent } from "../../../types";
import { FormEvent } from 'react'

interface IForm {
    value: IFormState,
    onSubmit: (e: FormEvent<HTMLFormElement>) => {},
    onChange: (e: inputEvent) => void,
    variant: Variant,
    isLoading: boolean,
    changeVariant: () => void
}

const Form: React.FC<IForm> = ({ onSubmit, value, isLoading, onChange, changeVariant, variant }) => {
    return (
        <form onSubmit={onSubmit} className="flex lg:flex-row transition-all flex-wrap  flex-col gap-4" >
            <TextField placeholder="Your nickname"
                type="text"
                error={!value.nickname.isValid}
                label='Nickname'
                id="nickname"
                name="nickname"
                onChange={onChange}
                value={value.nickname.value}
                disabled={isLoading}
                className="flex-grow"
                required
                helperText='nickname should be longer than 3 chars'
            />
            {variant === 'REGISTRATION' && <TextField placeholder="Your email"
                error={!value.email.isValid}
                type="email"
                label='Email'
                id="email "
                name="email"
                value={value.email.value}
                disabled={isLoading}
                onChange={onChange}
                className="flex-grow"
                required
                helperText='email should be valid'
            />}
            <TextField
                placeholder="Your password"
                error={!value.password.isValid}
                label='Password'
                id="password"
                name="password"
                value={value.password.value}
                type="password"
                onChange={onChange}
                disabled={isLoading}
                className="flex-grow"
                required
                helperText="longer than 5 chars"
            />
            <LoadingButton type="submit" id="loading-button" size="large" variant="outlined" loading={isLoading}>{variant === 'LOGIN' ? 'Login' : 'Registrate'}</LoadingButton>
            <Button disabled={isLoading} className="flex-grow" variant="outlined" onClick={changeVariant}>{variant === 'LOGIN' ? "Don't have an account? Create one" : "Already have an account? Sign in"}</Button>
        </form>
    );
}

export default Form;