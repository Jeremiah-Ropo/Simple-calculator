const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === 'add') return firstNum + secondNum
    if ( operator === 'subtract') return firstNum - secondNum 
    if ( operator === 'multiply') return firstNum * secondNum
    if ( operator === 'divide') return firstNum / secondNum
}


keys.addEventListener('click', e => {
    if(e.target.matches('button')) {
        //Do something

        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previouskeyType = calculator.dataset.previouskeyType

        if (!action){
            if (displayedNum === '0' || previouskeyType === 'operator' || previouskeyType === 'calculate'){
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previouskeyType = 'number'
        }

        if (
            action === 'add' || action === 'subtract' ||
            action === 'multiply' || action === 'divide'
        ) { 
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            if (firstValue && operator && previouskeyType !== 'operator' || previouskeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                // Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                // if there are no calculation, set displayedNum
                calculator.dataset.firstValue = displayedNum
            }
            key.classList.add('is-depressed')
            Array.from(key.parentNode.children).forEach(
                 k => k.classList.remove('is-depressed')
            )
            calculator.dataset.previouskeyType = 'operator'
            calculator.dataset.operator = action
            calculator.dataset.firstValue = displayedNum
        } 

        if ( action === 'decimal'){
            if (!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            } else if (previouskeyType === 'operator' || previouskeyType === 'calculate'){
                display.textContent = '0.'
            }
            calculator.dataset.previouskeyType = 'decimal'
        }

        if ( action === 'clear' ){
            if (key.textContent === 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previouskeyType = ''
            }else{
                key.textContent = 'AC'
            }
            display.textContent = 0


            calculator.dataset.previouskeyType = 'clear'
        }
        if ( action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
        if ( action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            if (firstValue){
                if (previouskeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
            display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.previouskeyType = 'calculate'
            calculator.dataset.modValue = secondValue
        }
    }
})








