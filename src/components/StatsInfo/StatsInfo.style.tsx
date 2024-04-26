import { styled } from "styled-components";
import { LegendsColor, LegendsSize } from "../../styles/constants.style";

export const StatsContainer = styled.ol`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    padding: ${LegendsSize.padding.normal};
    background-color: ${LegendsColor.backgroundColors.primary};
`;

export const StatsItem = styled.li`
    list-style: circle;
`