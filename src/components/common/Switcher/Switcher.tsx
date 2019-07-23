import * as React from 'react'
import { Grid, Switch } from '@material-ui/core';
import {IProps} from './Switcher.d'

const Switcher = (props: IProps) => {
    const {switchOption1, switchOption2, switchOption1Label, switchOption2Label, handleChange} = props

    const [switchValue, setSwitchValue] = React.useState(switchOption1)

    const handleChangeInSwitch = (event: any) => {
        const finalValue = event.target.checked ? switchOption2 : switchOption1
        setSwitchValue(finalValue)
        handleChange(finalValue)
    }

    return (
        <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{switchOption1Label}</Grid>
            <Grid item>
                <Switch
                    checked={switchValue === switchOption2}
                    onChange={handleChangeInSwitch}
                    value="checkedC"
                />
            </Grid>
            <Grid item>{switchOption2Label}</Grid>
        </Grid>
    )
}

export default Switcher