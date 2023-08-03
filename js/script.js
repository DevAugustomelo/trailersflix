
'use strict';



// API - VIA CEP

const cep = document.getElementById('cep');

const autoLimpar = (e) =>{
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('endereco').value = '';
}

const autoInputFormulario = (endereco) => {
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('endereco').value = endereco.logradouro;
}

const pesquisarCep = async() => {
    autoLimpar();
    const cep = document.getElementById('cep').value;
    const  url = `https://viacep.com.br/ws/${cep}/json`;
    var enumerico = !isNaN(cep)
    if( cep.length == 8 && enumerico){

        const retorno = await fetch(url);
        const endereco = await retorno.json();
    
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'cep não existe';
            document.getElementsByClassName('form-control').style.color = 'red';
        }else{
    
            autoInputFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'cep INVÁLIDO';
    }
}

cep.addEventListener('focusout', pesquisarCep)
