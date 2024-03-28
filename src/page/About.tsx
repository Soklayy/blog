import { FaFacebook, FaGithub, FaGraduationCap, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa6";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { BsTelephoneFill } from "react-icons/bs";
import bgHerro from "../assets/lotties/bg-herro.json"
import Lottie from "lottie-react";
import SocialMediaIconCube from "../components/common/SocialMediaIconCube";

const About = () => {
    return (
        <section className="min-h-[calc(100%-13.25rem)] flex max-w-6xl m-auto relative">
            <Lottie animationData={bgHerro} className='absolute h-full w-full -z-10' />

            <div className="max-w-3xl m-auto w-full flex flex-col items-center py-10 bg-gray-200 bg-opacity-90 gap-5 px-3 rounded-lg">
                <h2 className="font-bayon text-3xl text-gray-900">ប្រវត្តិសង្ខេប</h2>
                <div className="w-full space-y-3">
                    <p className="flex gap-2 text-lg items-center"><FaCheckCircle className="text-xl text-green-600" /> <span>ឈ្មោះ</span> <span className="font-bold">យ៉ន សុខឡាយ</span></p>
                    <p className="flex gap-2 text-lg items-center"><FaMapMarkerAlt className="text-xl text-green-600" /> <span>ទីកន្លែងកំណើត</span> <span className="font-bold">កំពង់ចាម</span></p>
                    <h3 className="flex gap-2 text-lg items-center"><FaGraduationCap className="text-xl text-green-600" />ការសិក្សា</h3>
                    <div className="w-full pl-5">
                        <p className="flex gap-2 text-lg items-center"><span className="text-3xl flex text-green-600">•</span> <span>2017-2020</span>
                            <span className="font-bold">មធ្យមសិក្សាទុតិយភូមិ(បាក់ឌុប) វិទ្យាល័យហ៊ុនសែនស្គន់</span>
                        </p>
                        <p className="flex gap-2 text-lg items-center"><span className="text-3xl flex text-green-600">•</span> <span>2020-now</span>
                            <span className="font-bold">បរិញ្ញាបត្រវិស្វកម្មបច្ចេកវិទ្យាព័ត៌មាន សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (ITE)</span>
                        </p>
                    </div>
                    <p className="flex gap-2 text-lg items-center"><PiBagFill className="text-xl flex text-green-600" /><span>បទពិសោធន៍ការងារ</span>​<span className="font-bold">(none)</span></p>
                    <div className="space-y-3 flex flex-col justify-center items-center">
                        <h2 className="text-green-500 font-bold text-center text-sm font-sans">Social Media</h2>
                        <div className="flex flex-wrap gap-4 text-xl">
                            <SocialMediaIconCube href="https://www.youtube.com/@soklay34" Icon={FaYoutube} />
                            <SocialMediaIconCube href="https://web.facebook.com/itsoklay" Icon={FaFacebook} />
                            <SocialMediaIconCube href="https://github.com/Soklayy" Icon={FaGithub} />
                            <SocialMediaIconCube href="https://www.linkedin.com/in/soklay-yorn-a2b728288/" Icon={FaLinkedin} />
                            <SocialMediaIconCube href="https://t.me/soklayy" Icon={FaTelegram} />
                            <SocialMediaIconCube href="tel:066866677" Icon={BsTelephoneFill}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About