import { Meta, StoryObj } from "@storybook/react";
import StatsInfo from "../components/StatsInfo";

const meta = {
    title: "Item/Stats",
    component: StatsInfo
} satisfies Meta<typeof StatsInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        stats: {
            strength: '10'
        }
    }
}

export const WithSeveralStats: Story = {
    args: {
        stats: {
            strength: '10',
            dexterity: '5',
            magic: '2',
            durability: '100',
            damage: '20',
            protection: '15'
        }
    }
}

export const WithUnknownStat: Story = {
    args: {
        stats: {
            strength: '10',
            unknown: '5'
        }
    }
}
