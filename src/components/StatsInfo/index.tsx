import { useContext, useMemo } from "react";

import { I18nContext } from "../../shared/contexts/i18n.context";

import { Stats } from "../../shared/i18n/stats.i18n";

import { StatsContainer, StatsItem } from "./StatsInfo.style";

import type { IStatsInfoProps } from "./StatsInfo.type";

const StatsInfo = ({ stats, isCentralized }: IStatsInfoProps) => {
    const { translate } = useContext(I18nContext);
    const StatsData = useMemo(() => Object.entries(stats).map(([key, value]) => ({
        key: translate(Stats, key),
        value
    })), [stats, translate]);

    return (
        <StatsContainer className={isCentralized ? 'center' : ''}>
            {StatsData.map(({ key, value }, index) => (
                <StatsItem key={`${key}:${value}-#${index}-${stats}`}>
                    {key}: {value}
                </StatsItem>
            ))}
        </StatsContainer>
    )
}

export default StatsInfo
