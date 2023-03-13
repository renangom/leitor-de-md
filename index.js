import fs from 'fs';
import chalk from "chalk";

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

function pegaArquivo(caminhoDoArquivo) {
    fs.readFile(caminhoDoArquivo, {encoding:'utf-8'}, (err, data) => {
        if(err){
            trataErro(err);
        }
        console.log(chalk.green(data));
    })
}

pegaArquivo('./arquivos/texto.md');