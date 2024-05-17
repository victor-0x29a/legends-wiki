import { GiLegArmor, GiSuperMushroom, GiSkullWithSyringe } from "react-icons/gi"
import { BiExit, BiLayer } from "react-icons/bi";
import { ARMOR_ENTITY, BOSS_ENTITY, COLLECTIBLE_ENTITY } from "../constants"
import { FaGear } from "react-icons/fa6";

const defaultIconProps = { size: 20 }

export const PublicRoutes = [
    {
        label: "Armadura",
        path: `/${ARMOR_ENTITY}`,
        icon: <GiLegArmor {...defaultIconProps} />
    },
    {
        label: "Colecionáveis",
        path: `/${COLLECTIBLE_ENTITY}`,
        icon: <GiSuperMushroom {...defaultIconProps} />
    },
    {
        label: "Bosses",
        path: `/${BOSS_ENTITY}`,
        icon: <GiSkullWithSyringe {...defaultIconProps} />
    },
    {
        label: "Itens",
        path: "/item",
        icon: <GiSuperMushroom {...defaultIconProps} />
    }
]

export const PrivateRoutes = [
    {
        label: "Hub",
        path: "/auth",
        icon: <BiLayer {...defaultIconProps} />
    },
    {
        label: "Entities",
        path: "/entity",
        icon: <FaGear {...defaultIconProps} />
    },
    {
        label: "Users",
        path: "/users",
        icon: <FaGear {...defaultIconProps} />
    },
    {
        label: "Leave",
        path: "/logout",
        icon: <BiExit {...defaultIconProps} />
    }
]
