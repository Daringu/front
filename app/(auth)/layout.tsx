import image from '@/public/download.jpg'

interface IAuth {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuth> = ({ children }) => {

    return (
        <div style={{ backgroundImage: `url(${image.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="flex justify-center items-center h-full w-full">
            {children}
        </div>
    );
}

export default AuthLayout;