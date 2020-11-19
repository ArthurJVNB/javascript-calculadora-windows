class Calculator {
    constructor(params) {
        this._displayEl = document.querySelector('#display');

        this._calcHistory = [0];

        this.test();
        this.initAll();
    }

    // TEST PURPOSES ONLY!
    test() {
    }

    initAll() {
        this.display = 0
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
            switch(button) {
                case '+':
                case '-':
                case 'X':
                case '/':
                    this.putOperator(button);
                    break;

                case ',':
                    this.putComma();
                    break;
                
                case '=':
                    this.tryCalculate();
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

    displayError() {
        this.display = 'ERROR';
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
}