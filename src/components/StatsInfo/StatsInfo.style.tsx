import { styled } from "styled-components";
import { LegendsColor, LegendsSize } from "../../styles/constants.style";

export const StatsContainer = styled.ol`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    padding: ${LegendsSize.padding.normal};
    background-color: ${LegendsColor.backgroundColors.primary};
    border-radius: ${LegendsSize.borderRadius.normal};

    &.center {
        justify-content: center;
    }
`;

export const StatsItem = styled.li`
    list-style: circle;
    display: list-item;
    margin: ${LegendsSize.margin.normal};
    cursor: default;
`