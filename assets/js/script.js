//objetos com funções em seus valores
let b7Validator = {
    handleSubmit:(event) => {
        event.preventDefault();//previne o envio automatico para podermos validar
        let send = true;

        let inputs = form.querySelectorAll('input');

        b7Validator.clearErrors();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = b7Validator.checkInput(input);
            if(check !== true) {
                send = false;
                b7Validator.showError(input, check);

            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
//no HTML usamos o | para separar cada regrar, por isso os split para pegar cada uma delas, já o segundo split em = é pq dentro de data-rules colocamos algumas regras que que tem sinal de igual e um valor atribuido, por exemplo: data-rules="required|min=2", dessa forma no segundo split conseguimos separar chave e valor desses tbm num array.
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
//O que muda a cada iteração é o conteúdo de rDetails[0], não o índice 0 em si.
//rDetails[0] é a primeira posição do novo array criado a cada iteração do loop, portanto, ele reflete a chave atual da regra sendo processada, ou required ou min.
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo obrigatório.'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return `Campo deve conter no mínimo ${rDetails[1]} caracteres.`;
                        }
                    break;
                    case 'email':
                        //criação de uma EXPRESSÂO REGULAR REGEX que verifica se o campo corresponde a esse padrão.
                        if(input.value !== '') {
                            let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Campo precisa de um e-mail válido.';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    }, 
    showError:(input, error) => {
        input.style.borderColor = '#F00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
//em JS n temos um método que coloque algo após um elemento de maneira direta, apenas antes com before, ele recebe 2 parametros que é o elemento que vamos colocar e onde. Por isso no input.ElementSibling colocamos esse elementsibling, pra ele pegar o item DEPOIS dele e assim conseguimos.
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    }, 
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', b7Validator.handleSubmit);