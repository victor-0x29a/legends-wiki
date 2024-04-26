import { styled } from "styled-components";
import { LegendsColor, LegendsSize, LegendsValues } from "../../styles/constants.style";

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

    > b {
        transition-duration: ${LegendsValues.transitionDuration};
        font-weight: ${LegendsSize.fontWeight.bold};
    }

    &:hover {
        > b {
            color: ${LegendsColor.textColors.thirdiary};
        }
    }
`