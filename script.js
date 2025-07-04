const display = document.getElementById('result');

function appendCharacter(char) {
    if (display.value === "Error") {
        clearDisplay();
    }
    display.value += char;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    if (display.value === "Error") {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    try {
        // Replace multiple operators with the last one, except for negative numbers
        let expression = display.value;
        // Allow negative numbers at the beginning of the expression or after an operator
        expression = expression.replace(/(?<![0-9.)])([-+*/])[-+*/]+/g, "$1");
        // Handle cases like '5*-+3' becoming '5*3' (should be '5*-3')
        // This regex is a bit complex, might need refinement for all edge cases.
        // For now, let's rely on eval's behavior and user input correction.

        // Basic security: restrict characters to numbers, operators, and parentheses
        if (/[^0-9+\-*/().]/.test(expression)) {
            display.value = "Error";
            return;
        }
        
        // Avoid eval if possible, but for a simple calculator it's often used.
        // For a production app, consider a proper parsing library or a custom parser.
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (display.value === "Error") {
        clearDisplay();
    }

    if (key >= '0' && key <= '9') {
        appendCharacter(key);
    } else if (key === '.') {
        appendCharacter('.');
    } else if (key === '+') {
        appendCharacter('+');
    } else if (key === '-') {
        appendCharacter('-');
    } else if (key === '*') {
        appendCharacter('*');
    } else if (key === '/') {
        appendCharacter('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent form submission if inside a form
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
