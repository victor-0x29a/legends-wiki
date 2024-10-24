import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { LegendsSize } from "../../styles/constants.style";

export const FB_PROFILE = "https://www.facebook.com"
export const IG_PROFILE = "https://www.instagram.com"
export const TTK_PROFILE = "https://www.tiktok.com"
export const TT_PROFILE = "https://www.twitter.com"
export const YT_PROFILE = "https://www.youtube.com"

const DEFAULT_ICON_SIZE = 35

const DEFAULT_ICON_PROPS = {
    size: DEFAULT_ICON_SIZE,
    style: {
        marginTop: LegendsSize.margin.normal
    }
}

export const SocialMedias = [
    {
        logo: <FaInstagramSquare {...DEFAULT_ICON_PROPS} />,
        link: IG_PROFILE,
    },
    {
        logo: <FaFacebookSquare {...DEFAULT_ICON_PROPS} />,
        link: FB_PROFILE,
    },
    {
        logo: <AiFillTikTok {...DEFAULT_ICON_PROPS} />,
        link: TTK_PROFILE,
    },
    {
        logo: <FaTwitterSquare {...DEFAULT_ICON_PROPS} />,
        link: TT_PROFILE,
    },
    {
        logo: <FaYoutube {...DEFAULT_ICON_PROPS} />,
        link: YT_PROFILE,
    }
]
