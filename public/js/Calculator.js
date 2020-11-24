class Calculator {
    constructor(params) {
        this._displayEl = document.querySelector('#display');

        this._calcHistory = [0];
        this._lastOperator;
        this._lastNumber;

        this.initEventAll();
    }

    initEventAll() {
        this.display = 0
        this.clearCalcHistory();
        this.initEventTouch();
        this.initEventKeyboard();
    }
    
    initEventTouch() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.buttonEvent(button.innerHTML);
            });
        });
    }

    initEventKeyboard() {
        document.addEventListener('keyup', e => {
            this.buttonEvent(e.key);
        })
    }

    buttonEvent(button) {
        if (isNaN(button)) {
            console.log(button);
            
            if (button == 'X') {
                button = '*';
            }

            switch(button) {
                case '+':
                case '-':
                case '*':
                case '/':
                    this.putOperator(button);
                    this.lastOperator = button;
                    break;

                case ',':
                case '.':
                    this.putComma();
                    break;
                
                case '=':
                case 'Enter':
                    this.displayCalculation();
                    break;

                case 'C':
                case 'Escape':
                    this.clearAllCalculation();
                    break;

                case 'CE':
                    this.clearLastCalculation();
                    break;

                case '←':
                case 'Backspace':
                    this.eraseLastDigit();
                    break;
            }
        } else {
            this.putNumber(button);
        }

        console.log(this._calcHistory)
    }

    putNumber(value) {
        // UPDATE calcHistory
        if (this.isOperator(this.lastCalcHistory)) {
            this._calcHistory.push(value);
        } else if (this.lastCalcHistory == 0) {
            this.lastCalcHistory = value;
        } else {
            this.lastCalcHistory = this.lastCalcHistory.toString() + value.toString();
        }
        
        // UPDATE DISPLAY
        this.display = this.lastCalcHistory;
    }

    putComma() {
        if (!this.display.includes(',')) {
            this.display = this.display.toString() + ',';
        }
    }

    putOperator(operator) {
        if (this.isOperator(this.lastCalcHistory)) {
            // LAST IS AN OPERATOR
            this.lastCalcHistory = operator;
        } else {
            // LAST IS NOT AN OPERATOR
            if (this._calcHistory.length == 3) {
                let lastCalc = this.tryCalculate();
                this._calcHistory = [lastCalc];
                this.display = lastCalc;
            }

            this._calcHistory.push(operator);

        }
    }

    isOperator(value) {
        let result = false;

        switch (value) {
            case '+':
            case '-':
            case 'X':
            case '*':
            case '/':
            case '%':
                result = true;
                break;
        }

        return result;
    }

    tryCalculate() {
        try {
            let stringToEval;

            //TODO: implement autocomplete calculation

            stringToEval = this._calcHistory.join('');
            console.log(eval(stringToEval));
            return eval(stringToEval);
        } catch (error) {
            this.displayError();
        }
    }

    displayCalculation() {
        let calculation = this.tryCalculate();
        if (calculation) {
            this.clearCalcHistory();
            this.display = calculation;
        }
    }

    displayError() {
        this.display = 'ERROR';
    }

    eraseLastDigit() {
        let formatedCalc = this.lastCalcHistory.toString();

        if (!this.isOperator(formatedCalc)) {
            formatedCalc = formatedCalc.substring(0, this.lastCalcHistory.length - 1);
            
            if (formatedCalc.length <= 0) {
                formatedCalc = 0;
            }

            this.lastCalcHistory = formatedCalc;
            this.display = this.lastCalcHistory;
        }
    }

    clearAllCalculation() {
        this.clearCalcHistory();
        this.display = 0;
    }

    clearLastCalculation() {
        if (!this.isOperator(this.lastCalcHistory)) {
            this.lastCalcHistory = 0;
            this.display = this.lastCalcHistory;
        }
    }

    clearCalcHistory() {
        this._calcHistory = [0];
    }

    //#region gets and sets
    get lastOperator() {
        return this._lastOperator;
    }

    set lastOperator(value) {
        this._lastOperator = value;
    }

    get lastNumber() {
        return this._lastNumber;
    }

    set lastNumber(value) {
        this._lastNumber = value;
    }

    get lastCalcHistory() {
        return this._calcHistory[this._calcHistory.length - 1];
    }

    set lastCalcHistory(value) {
        this._calcHistory[this._calcHistory.length - 1] = value;
    }

    get display() {
        return this._displayEl.innerHTML;
    }

    set display(value) {
        this._displayEl.innerHTML = value;
    }
    //#endregion
}