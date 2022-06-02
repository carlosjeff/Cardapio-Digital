export class MaskHelper{
    constructor() {
        throw new Error("Essa classe não pode ser instaciada!")
    }

    static price(value){

        let inputValue = (value.toString().replace(/\D/g,'')/100)
                            .toFixed(2)
                            .toString()
                            .replace('.', ',')
                            .replace(/(\d)(\d{3}(\d{3}),)/g, '$1.$2.$3,')
                            .replace(/(\d)(\d{3}),/g, '$1.$2,');
        
    
       return  'R$ ' + inputValue;
    }

    static priceToDecimal(input){

        return parseFloat(input.toString().replace('R$', '')
                    .replace('.', '')
                    .replace(',','.')
                    .trim()).toLocaleString('pt-br', {minimumFractionDigits: 2});
    }


    static justNumber(value){
        console.log(value);
        let inputValue = value.toString().replace(/\D/g, "") ;
        console.log(inputValue);
        return value

    }

    static firstUpperCaseCharacter(value){

        let inputValue = value;
        if(inputValue){
            let firstCharacter = inputValue[0];
            let firstCharacterUpper = firstCharacter.toUpperCase();
           return firstCharacterUpper + inputValue.substring(1);
        }
        return value;
    }
}