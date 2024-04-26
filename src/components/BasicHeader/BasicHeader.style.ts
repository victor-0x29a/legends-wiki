import styled from "styled-components";
import { LegendsSize } from "../../styles/constants.style";

export const BasicHeaderContainer = styled.header`
    display: flex;
    width: auto;

    &.right {
        justify-content: row;
        > .labels {
            margin-left: ${LegendsSize.margin.small};
        }
    }

    &.bottom {
        justify-content: center;
        flex-direction: column;
        > .labels {
            margin-top: ${LegendsSize.margin.small};
        }
    }

    > h2 {
        font-size: ${LegendsSize.fontSize.large};
    }

    > p {
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: ${LegendsSize.fontSize.small};
    }

    > .content {
        display: flex;
        flex-direction: row;
        > img {
            margin-right: ${LegendsSize.margin.small};
            width: 100px;
            height: 100px;
            border-radius: ${LegendsSize.borderRadius.small};
            image-rendering: optimizeSpeed;
            object-fit: cover;
        }
    }
`