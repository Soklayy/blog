import { IconType } from 'react-icons'

const SkillCard = ({ Icon,name,expert }: { Icon: IconType,name?:string, expert?:string }) => {
    return (
        <div className="flex border h-fit p-3 rounded-lg justify-between items-center bg-gray-700" >
            <Icon className="w-1/4 h-fit rounded-lg text-green-400" />
            <div className='flex flex-col items-end'>
                <span className="text-xl font-sans font-bold text-white">{expert}</span>
                <span className='text-green-500 text-sm font-popin uppercase'>{name}</span>
            </div>
        </div>
    )
}

export default SkillCard