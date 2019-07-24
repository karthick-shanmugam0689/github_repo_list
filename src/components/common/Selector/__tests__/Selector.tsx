import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {MemoryRouter} from 'react-router-dom'
import Selector from '../Selector'
import {
    render,
    waitForElement,
    getByTestId,
    fireEvent,
} from '@testing-library/react'

describe('Selector Test Cases', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div')
      const handleChange = jest.fn()
      ReactDOM.render(
        <MemoryRouter>
          <Selector
            value=""
            options={[]}
            label="Selector"
            id="selector"
            handleChange={handleChange}
          />
        </MemoryRouter>,
        div
      )
      ReactDOM.unmountComponentAtNode(div)
    })
  
    it('render with options', async () => {
        const handleChange = jest.fn()
  
        render(
            <MemoryRouter>
                <Selector
                    value=""
                    options={options}
                    label="Selector"
                    id="selector"
                    handleChange={handleChange}
                />
            </MemoryRouter>
        )
  
        const eventTwo = {
            target: {
            value: 'Two',
            },
        }
        const container = document.body
        await waitForElement(() => getByTestId(container, 'select-selector'))

        fireEvent.change(
            getByTestId(container, 'select-selector').getElementsByTagName(
            'select'
            )[0],
            eventTwo
        )
        expect(handleChange).toHaveBeenCalledWith(
            'Two'
        )

        const eventOne = {
            target: {
            value: 'One',
            },
        }

        fireEvent.change(
            getByTestId(container, 'select-selector').getElementsByTagName(
            'select'
            )[0],
            eventOne
        )
        expect(handleChange).toHaveBeenCalledWith(
            'One'
        )
    })
  })


const options = [
    {
        key: 'One',
        value: 'One',
    },
    {
        key: 'Two',
        value: 'Two',
    },
]
  
