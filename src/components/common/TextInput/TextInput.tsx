import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import {IProps} from './TextInput.d'

const TextInput = (props: IProps) => {
    const {label, apiName, value, hasError, errorMessage, message, onChange, className} = props

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        onChange(value, e.currentTarget.id)
    }

    return (
        <FormControl
        classes={{
          fullWidth: 'full-width',
          root:
            'form-control ' + className
        }}
        component="div"
        fullWidth={true}
      >
        <TextField
            label={label}
            FormHelperTextProps={{
            className: 'helper-text',
            }}
            name={apiName}
            id={apiName}
            value={value || ''}
            onChange={handleDataChange}
            inputProps={{
            maxLength: 255,
            spellCheck: false,
            }}
            error={hasError}
            helperText={
                (hasError && errorMessage) || (value && message)
            }
        />
      </FormControl>
    )
}

export default TextInput