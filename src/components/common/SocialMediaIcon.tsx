import { IconType } from "react-icons"

interface TSocialMediaIcon{
  href?:string;
  Icon: IconType
}

const SocialMediaIcon = ({ href, Icon }: TSocialMediaIcon) => {
  return (
    <a href={href}>
      <Icon className="text-green-500 hover:text-white" />
    </a>
  )
}

export default SocialMediaIcon