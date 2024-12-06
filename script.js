class Calculator {
    constructor(prevoptext, curroptext) {
        this.prevoptext = prevoptext
        this.curroptext = curroptext
        this.clear()
    }

    clear() {
        this.curr_op = ''
        this.prev_op = ''
        this.op = ''
    }

    delete() {
        if (this.curr_op === '') return
        this.curr_op = this.curr_op.slice(0, -1)
    }

    appendNum(num) {
        if (num === '.' && this.curr_op.includes('.')) return
        this.curr_op += num
    }

    opSelect(op) {
        if (this.curr_op === '') return
        if (this.prev_op !== '') {
            this.compute()
        }
        this.op = op
        this.prev_op = this.curr_op
        this.curr_op = ''
    }

    compute() {
        let computation
        const p = parseFloat(this.prev_op)
        const c = parseFloat(this.curr_op)
        if (isNaN(p) || isNaN(c)) return
        switch(this.op) {
            case '+':
                computation = p + c
                break
            case '-':
                computation = p - c
                break
            case '*':
                computation = p * c
                break
            case '÷':
                computation = p / c
                break
            default:
                return
        }
        this.curr_op = computation
        this.op = ''
        this.prev_op = ''
    }

    getDisplayNum(num) {
        num = num.toString()
        const id = parseFloat(num.split('.')[0])
        const dd = num.split('.')[1]
        let integerDisplay
        if (isNaN(id)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = id.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (dd != null) {
            return `${integerDisplay}.${dd}`
        }
        else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curroptext.innerText = this.getDisplayNum(this.curr_op)
        this.prevoptext.innerText = this.getDisplayNum(this.prev_op) + ' ' + this.op
    }
}


const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-op]')
const eqButton = document.querySelector('[data-eq]')
const delButton = document.querySelector('[data-del]')
const acButton = document.querySelector('[data-ac]')
const prevoptext = document.querySelector('[data-prev-op]')
const curroptext = document.querySelector('[data-curr-op]')


const calc = new Calculator(prevoptext, curroptext)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText)
        calc.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.opSelect(button.innerText)
        calc.updateDisplay()
    })
})

eqButton.addEventListener('click', () => {
    calc.compute()
    calc.updateDisplay()
})

acButton.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay()
})

delButton.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay()
})
