import { GiLegArmor, GiSuperMushroom, GiSkullWithSyringe } from "react-icons/gi"

const defaultIconProps = { size: 20 }

export const PublicRoutes = [
    {
        label: "Armadura",
        path: "/armors",
        icon: <GiLegArmor {...defaultIconProps} />
    },
    {
        label: "Colecionáveis",
        path: "/collectibles",
        icon: <GiSuperMushroom {...defaultIconProps} />
    },
    {
        label: "Bosses",
        path: "/boss",
        icon: <GiSkullWithSyringe {...defaultIconProps} />
    }
]
