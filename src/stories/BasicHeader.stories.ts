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

export const WithIconOnRight : Story = {
    args: {
        icon: 'Icon',
        title: 'Home',
        subtitle: 'Welcome to the home page',
        position: 'right',
        imageDetails: null
    }
}

export const WithIconOnBottom : Story = {
    args: {
        icon: 'Icon',
        title: 'Home',
        subtitle: 'Welcome to the home page',
        position: 'bottom',
        imageDetails: null
    }
}

export const WithALongSubtitle : Story = {
    args: {
        title: 'Home',
        subtitle: 'Welcome to the home page. This is a long subtitle that not only welcomes you but also gives you a brief overview of what you can expect from this page. Enjoy your stay!',
        position: 'bottom',
        imageDetails: {
            src: 'https://random.imagecdn.app/200/200',
            alt: 'Image cdn'
        }
    }
}