'use client'
import {useState, useContext, useEffect, useCallback} from 'react'
import { Variant, inputEvent } from "../../../types";
import Image from "next/image";
import Logo from '@/public/logo.png'
import { FormEvent } from 'react'
import { toast } from "react-toastify";
import Form from '../components/Form';
import Validation from '@/tools/validate';
import { fieldNameType } from '../../../types';
import { IFormState } from '../../../interfaces';
import { AuthStoreContext } from '@/context/AuthStoreContext';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';


const Auth = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [value, setValue] = useState<IFormState>({
        nickname: {
            value: '',
            isValid: true
        },
        email: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        },
    })
    const { AuthStore } = useContext(AuthStoreContext)
    const router = useRouter()
    const onChange = (e: inputEvent) => {
        let isValid = true;
        const fieldName: fieldNameType = e.target.name as fieldNameType
        const inputValue: string = e.target.value

        isValid = Validation.validate(fieldName, inputValue)

        setValue({
            ...value,
            [fieldName]: {
                value: inputValue,
                isValid
            }
        })
    }

    const changeVariant =useCallback( () => {
        if (variant === 'LOGIN') {
            setVariant('REGISTRATION')
        } else {
            setVariant('LOGIN')
        }
    },[variant])

    const onSubmit =useCallback( async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (variant === 'LOGIN') {
                await AuthStore.login(value.nickname.value, value.password.value);
                toast.success(`Successfully logged in`)
                router.replace('/')
            } else {
                await AuthStore.registrate(value.nickname.value, value.password.value, value.email.value)
                router.replace('/')
                toast.success(`Successfully registered`)
                toast.info(`Activation link has been sent to your email ${AuthStore.user.email}`, {
                    closeOnClick: true,
                    position: 'top-center',
                    autoClose: 1000,
                    pauseOnHover: true
                })
            }

        } catch (error: any) {
            toast.error(error, {
                autoClose: 1000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: false,
                theme: 'light'
            })
        }
    },[variant,value,router,AuthStore])
    return (
        <div className="flex flex-col hover:shadow-xl transition-all items-center sm:max-w-sm lg:max-w-lg gap-4 border-2 border-solid border-cyan-300 py-10 px-4 bg-cyan-100 rounded-3xl">
            <Image style={{ maxHeight: '200px', maxWidth: '150px' }} alt="logo" src={Logo.src} width={Logo.width} height={Logo.height} />
            {!AuthStore.isAuth && <Form onSubmit={onSubmit} variant={variant} isLoading={AuthStore.isLoading} changeVariant={changeVariant} value={value} onChange={onChange} />}
        </div>
    );
}
export default observer(Auth);