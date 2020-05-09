const controllers = {
    normal: (req, res) => {
        const id = req.params.id;

        const Imagem = require('../models/Imagem');
        Imagem.findById(id, (erro, anexo ) => {
            if(erro){
                console.log(erro);
                res.status(500).json({mensagem: 'Erro ao tentar fazer o Download'});
            }else{
                if(anexo){
                    const nomeArquivo = anexo.filename;
                    const readStream = anexo.read();
                    
                    //realiza o download
                    res.attachment(nomeArquivo);
                    readStream.pipe(res);
                }else{
                    res.status(404).json({mensagem: 'Imagem Não encontrada'});
                }
            }
        });
    },
    thumb: async (req, res) => {
        const fs = require('fs');
        const resizeImg = require('resize-img');
        const id = req.params.id;

        const Imagem = require('../models/Imagem');

        const image = await resizeImg(fs.readFileSync(id), {
            width: 100,
            height: 100
        });
        fs.writeFileSync(id, image);

        Imagem.findById(id, (erro, anexo ) => {
            if(erro){
                console.log(erro);
                res.status(500).json({mensagem: 'Erro ao tentar fazer o download'});
            }else{
                if(anexo){
                    const nomeArquivoo = anexo.filename;
                    const readStream = anexo.read();

                    //realiza o download
                    res.attachment(nomeArquivoo);
                    readStream.pipe(res);
                }else{
                    res.status(404).json({mensagem: 'Imagem não encontrada!!'});
                }
            }
           
        });
    },

    listar: (req, res) => {
        const Imagem = require('../models/Imagem');
        Imagem
            .find()
            .then( 
                resposta => {
                    const imagens= resposta.map(  
                        arquivo =>{
                            return{ 
                                id: arquivo._id,
                                tamanhoEmBytes: arquivo.length,
                                nome: arquivo.filename,
                                dataUpload: arquivo.uploadDate,
                                tipo: arquivo.contentType
                            }
                        }
                    ) 
                    res.json(imagens);
                })
            .catch( erro => { console.log(erro);
                res.status(500).json({mensagem: 'Erro ao listar as imagens'});
            });
    }
}
module.exports = controllers; 