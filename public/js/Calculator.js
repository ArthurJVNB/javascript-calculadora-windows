class Calculator {
    constructor(params) {
        this._displayEl = document.querySelector('#display');

        this._calcHistory = [];
        this._lastOperator;
        this._lastNumber;

        this.initAll();
    }

    initAll() {
        this.display = 0
        this.clearCalcHistory();
        this.initTouch();
    }
    
    initTouch() {
        let buttons = document.querySelectorAll('.btn');
        
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.buttonTouchEvent(button.innerHTML);
            });
        });
    }

    buttonTouchEvent(button) {
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
                    this.putComma();
                    break;
                
                case '=':
                    this.displayCalculation();
                    break;

                case 'C':
                    this.clearAllCalculation();
                    break;

                case 'CE':
                    this.clearLastCalculation();
                    break;

                case '←':
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
            if (this._calcHistory.length > 3) {
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
            let string = this._calcHistory.join('');
            console.log(eval(string));
            return eval(string);
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
            if (formatedCalc.length > 1) {
                formatedCalc = formatedCalc[formatedCalc.length - 2];
            } else {
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
        this.lastCalcHistory = 0;
        this.display = this.lastCalcHistory;
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