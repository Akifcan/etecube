export interface FormProps<T> {
    value: T,
    errorMessage?: string
}

class Validation {

    input = ''

    maxValue = 0
    minValue = 0
    validations: string[] = []

    listening: boolean = false

    form?: HTMLFormElement

    listenForm() {
        const valid = new Event('valid');
        const notValid = new Event('not-valid');

        setTimeout(() => {
            const notValidElements = this.form!.querySelectorAll(`[is-valid="no"]`)

            if (notValidElements.length === 0) {
                this.form!.dispatchEvent(valid)
            } else {
                this.form!.dispatchEvent(notValid)
            }
        }, 0);


    }

    constructor(form?: HTMLFormElement) {
        if (form) {
            this.form = form
        }
    }

    setValue(value: string) {
        this.validations = []
        this.input = value
        return this
    }

    customRegex(regex: string) {
        this.validations.push(`regex|${regex}`)
        return this
    }

    notEmpty() {
        this.validations.push('not-empty')
        return this
    }

    email() {
        this.validations.push('email')
        return this
    }

    minLength(value: number) {
        this.validations.push('min-length')
        this.minValue = value
        return this
    }

    maxLength(value: number) {
        this.validations.push('max-length')
        this.maxValue = value
        return this
    }

    validate() {
        let message: string | undefined
        for (let i = 0; i < this.validations.length; i++) {
            const current = this.validations[i]
            if (current === 'not-empty') {
                if (!this.input.length) {
                    message = "Please fill this area."
                }
                continue
            }
            if (current === 'email') {
                if (!/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(this.input)) {
                    message = 'Your email address format is wrong.'
                }
                continue
            }
            if (current === 'min-length') {
                if (this.input.length < this.minValue) {
                    message = `Please enter at least ${this.minValue} character.`
                }
                continue
            }
            if (current === 'max-length') {
                if (this.input.length > this.maxValue) {
                    message = `Please not enter no longer ${this.maxValue} character.`
                }
                continue
            }
            if (current.includes('regex')) {
                const regExp = new RegExp(current.split('regex|')[1])
                if (!regExp.test(this.input)) {
                    message = 'Please enter format correctly'
                }
                continue
            }
        }

        if (this.form) {
            if (!this.listening) {
                this.listenForm()
            } else {
                this.listening = true
            }
        }

        return message

    }



}

export default Validation