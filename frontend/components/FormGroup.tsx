import { FC, ReactNode, useEffect, useCallback } from 'react'

interface FormGroupProps {
    errorMessage?: string
    children: ReactNode,
    isRequired: boolean,
}

const FormGroup: FC<FormGroupProps> = ({ errorMessage, children, isRequired }) => {

    const input = useCallback((node: HTMLDivElement) => {
        if (!node) return
        const input = node.querySelector('input') || node.querySelector('textarea') || node.querySelector('select')

        input?.classList.add('form-validation-input')
        if (errorMessage) {
            input?.setAttribute('is-valid', 'no')
        } else {
            if (isRequired && input?.value.length === 0) {
                input?.setAttribute('is-valid', 'no')
            } else {
                input?.setAttribute('is-valid', 'yes')
            }
        }
    }, [errorMessage, isRequired])

    return <div className='form-group' ref={input}>
        {children}
        {errorMessage && (
            <p className='text-danger'>
                {errorMessage}
            </p>
        )}
    </div>

}

export default FormGroup