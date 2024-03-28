import { IconType } from "react-icons"

interface TSocialMediaIconCube {
  href?: string;
  Icon: IconType;
}

const SocialMediaIconCube = ({ href, Icon }:TSocialMediaIconCube ) => {
  return (
    <a href={href} className={`p-2 bg-gray-700 rounded-lg`}>
      <Icon className="text-green-500 hover:text-white" />
    </a>
  )
}

export default SocialMediaIconCube