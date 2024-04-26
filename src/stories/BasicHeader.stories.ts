import { Meta, StoryObj } from "@storybook/react";
import BasicHeader from "../components/BasicHeader";

const meta = {
    title: "Item/BasicHeader",
    component: BasicHeader
} satisfies Meta<typeof BasicHeader>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultBottom: Story = {
    args: {
        imageDetails: {
            src: 'https://random.imagecdn.app/200/200',
            alt: 'Image cdn'
        },
        title: 'Home',
        subtitle: 'Welcome to the home page',
        position: 'bottom'
    }
}

export const DefaultRight: Story = {
    args: {
        imageDetails: {
            src: 'https://random.imagecdn.app/200/200',
            alt: 'Image cdn'
        },
        title: 'Home',
        subtitle: 'Welcome to the home page',
        position: 'right'
    }
}

export const BottomWithChild: Story = {
    args: {
        imageDetails: {
            src: 'https://random.imagecdn.app/200/200',
            alt: 'Image cdn'
        },
        title: 'Home',
        subtitle: 'Welcome to the home page',
        position: 'bottom',
        bottomChild: 'Bottom child'
    }
}