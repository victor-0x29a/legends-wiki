import { GiLegArmor, GiSuperMushroom, GiSkullWithSyringe } from "react-icons/gi"
import { ARMOR_ENTITY, BOSS_ENTITY, COLLECTIBLE_ENTITY } from "../constants"

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
    }
]
