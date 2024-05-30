import { List, ListItem } from "@chakra-ui/react"
import { HeaderSideModalChild } from "../../components/Header/HeaderSideModalItemChild"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { IDashboardSideBarProps } from "./dashboard.type"
import { DASHBOARD_SIDE_MODAl_SIZE } from "./Dashboard.constant"

export const DashboardSideBar = ({
    entityList,
    isMobile
}: IDashboardSideBarProps) => {
    return !isMobile && (
        <List
            h={"100%"}
            w={`${DASHBOARD_SIDE_MODAl_SIZE}px`}
            bgColor={LegendsColor.backgroundColors.secondary}
        >
            {entityList.map((item, index) => (
                <ListItem key={`home-redirect-list-item-${index}`}>
                    <HeaderSideModalChild
                        icon={item.icon}
                        label={item.label}
                        onClick={item.onClick}
                        isMobile={false}
                        others={{
                            paddingLeft: LegendsSize.margin.small,
                            marginLeft: LegendsSize.margin.small,
                            width: "95%",
                            borderRadius: LegendsSize.borderRadius.large
                        }}
                    />
                </ListItem>
            ))}
        </List>
    )
}
