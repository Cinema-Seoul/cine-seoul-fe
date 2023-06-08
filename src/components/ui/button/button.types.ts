export const _Variant = ['tonal', 'contained', 'text'] as const;
export const _Tint = ['primary', 'neutral'] as const;
export const _Size = ['sm', 'md', 'lg'] as const;

export type Variant = typeof _Variant[number];
export type Tint = typeof _Tint[number];
export type Size = typeof _Size[number];