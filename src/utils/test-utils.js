import {render} from 'react-testing-library'
export const renderComponent = (node, {...options} = {}) => {
    return render(node,options)
}

export * from 'react-testing-library'
export {renderComponent}