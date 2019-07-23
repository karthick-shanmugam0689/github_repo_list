export interface IProps {
    label: string 
    apiName: string,
    className?: string,
    value?: string, 
    hasError?: boolean, 
    errorMessage?: string, 
    message?: string, 
    onChange: any
}