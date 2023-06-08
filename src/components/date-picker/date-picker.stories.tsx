import DatePicker from "./date-picker";

import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "w-96",
    selected: new Date(),
  },
};