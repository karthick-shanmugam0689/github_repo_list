import * as React from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import {IProps, IOption} from './Selector.d'

const Selector = (props: IProps) => {
    const {value, handleChange, options, label, id, cssClass} = props

    const handleChangeInSelect = (event: any) => {
        handleChange(event.target.value)
    }

    return (
        <FormControl className={cssClass}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                native
                value={value}
                onChange={handleChangeInSelect}
                data-testid={'select-'+id}
                inputProps={{
                    id,
                  }}
            >
                <option value=""></option>
                {
                    options.map((eachOption: IOption) => {
                        return (
                            <option value={eachOption.key} key={eachOption.key}>
                                {eachOption.value}
                            </option>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default Selector