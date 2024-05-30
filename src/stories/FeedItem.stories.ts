import { Meta, StoryObj } from "@storybook/react";
import { FeedItem } from "../components/FeedItem/FeedItem";

const meta = {
    title: "Feed/Item",
    component: FeedItem
} satisfies Meta<typeof FeedItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        description: "This is a description",
        title: "This is a title",
        image: {
            src: "https://via.placeholder.com/120",
            alt: "This is an image"
        },
        entityId: 1,
        onClick: console.log
    }
}
