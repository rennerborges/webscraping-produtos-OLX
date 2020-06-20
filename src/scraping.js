const axios = require('axios');
const cheerio = require('cheerio');


const siteAlvo = 'https://go.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios';

const dados = [];

const dadosBrutos = async (link) => {
    try {
        const res = await axios.get(link);
        return res.data;
    } catch (error) {
        console.log(`Ocorreu algum problema ao extrair o dados! Erro: ${error}`)
    }
}

const listaLinks = async () => {
    try {
        const html = await dadosBrutos(siteAlvo);
        const $ = await cheerio.load(html);
        $('#ad-list a').each((i, link) => {
            dados[i] = $(link).attr('href');
            console.log(dados)
        })
    } catch (error) {
        console.log(`Ocorreu algum problema ao extrair o dados! Erro: ${error}`)
    }
}

listaLinks();