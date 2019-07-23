export interface IProps {
    value?: string
    options: Array<IOption>
    label: string
    id: string
    cssClass?: string
    handleChange: any
}

export interface IOption {
    key: string
    value: string
}