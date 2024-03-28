import { IoMenu } from "react-icons/io5";
import { FaGoogle, FaUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/feature/Auth/auth.slide";
import kh from '../../assets/kh.png';
import uk from '../../assets/uk.webp'
import { useTranslation } from "react-i18next";

export default function Header() {
    const user = useAppSelector((state) => state.auth.user)
    const { i18n, t } = useTranslation()
    const dispatch = useAppDispatch()
    const [openMenu, setOpenMenu] = useState(false)

    const logoutHandler = () => {
        dispatch(logout())
    }

    const changeLanguageHandler = () => {
        if (i18n.resolvedLanguage === 'en') {
            i18n.changeLanguage('km')
        } else {
            i18n.changeLanguage('en')
        }
    }

    const loginHandler = () => {
        window.location.assign(process.env.GOOGLE_LOGIN || '')
    }

    return (
        <header className="flex justify-between items-center bg-gray-900 shadow px-5 py-2 lg:px-40 h-16 sticky top-0 z-50">
            <div className="flex items-center gap-2 text-green-500">
                <IoMenu className="w-8 h-8 md:hidden  cursor-pointer" onClick={() => setOpenMenu(!openMenu)} />
                <Link to={'/'} className="text-2xl font-bayon text-white font-bold uppercase flex">ឡា<span className="text-green-500 font-bayon flex items-center">យ.</span>
                </Link>
            </div>
            <nav className={`md:items-center flex text-white duration-300 flex-col md:flex-row  absolute md:static top-[4rem] gap-6 bg-gray-800 md:bg-transparent p-4 w-full md:w-fit left-0 capitalize ${openMenu ? 'openMenu' : 'closeMenu md:[clip-path:polygon(0_0,100%_0,100%_99%,0_99%)]'}`}>
                {(t('menu', { ns: 'button' }) as unknown as Array<any>)?.map((menu: any, key: number) => (
                    <NavLink
                        to={menu.url}
                        className="hover:text-green-500 font-semibold duration-300 active:"
                        key={key}>
                        {menu.title}
                    </NavLink>
                ))}
            </nav>
            <div className="flex gap-3 items-center text-white">
                <button onClick={changeLanguageHandler} className="border-2 w-8 h-6 flex-shrink-0 border-green-500 rounded-sm">
                    <img src={i18n.resolvedLanguage === 'km' ? kh : uk} className="w-full object-fill h-full" />
                </button>
                {
                    user?.id ?
                        <>
                            <NavLink to='profile' className=' aria-[current]:text-green-500 text-white flex-auto'>
                                < FaUser className="text-2xl cursor-pointer" />
                            </NavLink>
                            <button className="primary-button font-medium text-sm px-1 w-16 flex-shrink-0 py-1 font-bayon" onClick={logoutHandler}>
                                {t('logout', { ns: 'button' })}
                            </button>
                        </>
                        : <a onClick={loginHandler} target="_self">
                            <FaGoogle className="text-2xl cursor-pointer text-green-500" title="Login with Google" />
                        </a>
                }
            </div>
        </header>
    );
}
