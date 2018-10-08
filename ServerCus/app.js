/*console.log("Inizializzo il server!");*/

const express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var sqlite = require("./module/sqlite.js");

const app = express();
app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

app.use(methodOverride());
app.use(cors());


/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */


app.get('/prodotti', function (req, res) {
  sqlite.getProdotti( function (Prodotti) {
    var prodotti ={};
    var productList={};
    prodotti.Prodotti =Prodotti;
    
    var stringProdotti=JSON.stringify(prodotti);// prodotto stringato del db da parsare 
    
    var allProductJsonParsed= JSON.parse(stringProdotti);
    
    var obj = allProductJsonParsed;
    productList=allProductJsonParsed;
    
    //var prodottiList=JSON.stringify(obj);
    res.json(productList);
    //console.log("prodotti catalogo inviati");

  })
});

app.post('/aggiornaCarrello',function(req,res){
  //console.log('req.body= ',req.body);
  var prodottoReq=JSON.parse(req.body);
  var utente = prodottoReq.utente;
  var codice = prodottoReq.codice;
  var numProd= prodottoReq.quantita;
  var nomeProd = prodottoReq.nome;
  var prezzo = prodottoReq.prezzo; 
  var img = prodottoReq.immagine;

  sqlite.aggiungiAlCarrello(utente,codice,numProd,nomeProd,prezzo,img); 
  sqlite.aggiornaQuantità(numProd,codice); 
});

app.post('/confermaOrdine',function(req,res){
  //console.log('req.body ordine= ',req.body);
  req.body.forEach(p => {
  var dataCorrente = new Date(); 
  var data = dataCorrente.getDate() + "/" + (dataCorrente.getMonth()+1)  + "/" + dataCorrente.getFullYear();
  var utente = p.utente;
  var codice = p.codice;
  var quantita= p.quantita;
  var nomeProd = p.nome;
  var prezzo = p.prezzo; 
  var img = p.immagine;
  sqlite.aggiungiOrdine(utente,codice,data,quantita,nomeProd,prezzo,img); 
  sqlite.cancellaProdotti(utente,codice);
  });  
  //console.log(utente);
  

  
});

  

  app.post('/carrello', function (req, res) {
    
    
    var ObjUtente = JSON.parse(req.body);
    var utente = ObjUtente.eUtente;
    
    sqlite.getCarrello(function (Prodotti){
    
    var prodotti ={};
    var listaProdotti={};
    prodotti.Prodotti =Prodotti;
    
    var stringProdotti=JSON.stringify(prodotti);
    
    var prodottiObj= JSON.parse(stringProdotti);
    
    listaProdotti = prodottiObj;
    
    res.json(listaProdotti);
    //console.log("prodotti carrello inviati");
      
     
     },utente)

  });

  app.post('/ordini', function (req, res) {
    //console.log ('body req !stringify'+req.body);
    
    var ObjUtente = JSON.parse(req.body);
    var utente = ObjUtente.eUtente;
    
    sqlite.getOrdini(function (Prodotti){
    
    var prodotti ={};
    var listaProdotti={};
    prodotti.Prodotti =Prodotti;
    
    var stringProdotti=JSON.stringify(prodotti);
    
    var prodottiObj= JSON.parse(stringProdotti);
    
    listaProdotti = prodottiObj;
    
    res.json(listaProdotti);
    //console.log("prodotti carrello inviati");
      
     
     },utente)

  });

  app.post('/addPreferiti',function(req,res){
    //console.log('req.body= ',req.body);
    var prodottoReq=JSON.parse(req.body);
    var utente = prodottoReq.utente;
    var codice = prodottoReq.codice;
    var nome = prodottoReq.nome;
    var prezzo = prodottoReq.prezzo; 
    var img = prodottoReq.immagine;
    sqlite.aggiungiAiPreferiti(utente,codice,prezzo,nome,img);
    
  });

  app.post('/preferiti', function (req, res) {
    //console.log ('body req !stringify'+req.body);
    
    var ObjUtente = JSON.parse(req.body);
    var utente = ObjUtente.eUtente;
    
    sqlite.getPreferiti(function (Prodotti){
    
    var prodotti ={};
    var listaProdotti={};
    prodotti.Prodotti =Prodotti;
    
    var stringProdotti=JSON.stringify(prodotti);
    
    var prodottiObj= JSON.parse(stringProdotti);
    
    listaProdotti = prodottiObj;
    
    res.json(listaProdotti);
    console.log("prodotti carrello inviati");
      
     
     },utente)

  });

  app.get('/rimuoviProdotto/:utente/:codice/:quantita',function(req,res){
    
    
    var utente = req.params.utente;
    console.log('param remove ',utente);
    var codice = req.params.codice;
    console.log('param remove ',codice);
    var quantita = req.params.quantita;
    console.log('param remove',quantita)
    sqlite.cancellaProdotti(utente,codice);
    sqlite.ripristinaQuantità(quantita,codice);
    
  });

  app.get('/rimuoviPreferito/:utente/:codice',function(req,res){
    
    
    var utente = req.params.utente;
    //console.log('param remove ',utente);
    var codice = req.params.codice;
    //console.log('param remove ',codice);
    sqlite.cancellaPreferito(utente,codice);
    
    
  });

  app.get('/corsi', function (req, res) {
    sqlite.getCorsi( function (Corsi) {
      var corsi ={};
      var listaCorsi={};
      corsi.Corsi = Corsi;
      
      var stringCorsi=JSON.stringify(corsi);// prodotto stringato del db da parsare 
      
      var corsiJson= JSON.parse(stringCorsi);
      
      var obj = corsiJson;
      listaCorsi = corsiJson;
      
     
      res.json(listaCorsi);
     
  
    })
  });

  app.post('/addIscritto',function(req,res){
    //console.log('req.body= ',req.body);
    var prodottoReq=JSON.parse(req.body);
    var utente = prodottoReq.utente;
    var nomecorso = prodottoReq.nomeCorso;
    var giorni = prodottoReq.giorni;
    var orario = prodottoReq.orario; 
    var immagine = prodottoReq.immagine;
    sqlite.aggiungiIscritto(utente,nomecorso,giorni,orario,immagine);
    
  });

  app.post('/mieicorsi', function (req, res) {
    var ObjUtente = JSON.parse(req.body);
    var utente = ObjUtente.eUtente;
    sqlite.getMieiCorsi( function (Corsi) {
      var corsi ={};
      var listaCorsi={};
      corsi.Corsi = Corsi;
      
      var stringCorsi=JSON.stringify(corsi);// prodotto stringato del db da parsare 
      
      var corsiJson= JSON.parse(stringCorsi);
      
      var obj = corsiJson;
      listaCorsi = corsiJson;
      
     
      res.json(listaCorsi);
     
  
    },utente)
  });

  app.get('/rimuoviCorso/:utente/:corso',function(req,res){
    
    
    var utente = req.params.utente;
    var corso = req.params.corso;
    sqlite.rimuoviCorso(utente,corso);
    
    
  });

  app.get('/creaAbbonato/:utente',function(req,res){
    
    var utente = req.params.utente;
    var dataCorrente = new Date(); 
    var scadenza = dataCorrente.getDate() + "/" + (dataCorrente.getMonth()+1)  + "/" + dataCorrente.getFullYear();
    sqlite.creaAbbonato(utente,scadenza);
    
    
  });

  app.post('/rinnova',function(req,res){
    //console.log('req.body= ',req.body);
    var datiRinnovo=JSON.parse(req.body);
    var utente = datiRinnovo.utente;
    var tipoRinnovo = datiRinnovo.tipoRinnovo;
    var dataCorrente = new Date();
    switch(tipoRinnovo){
      case tipoRinnovo = 1:
      var nuovaScadenza = dataCorrente.getDate() + "/" + (dataCorrente.getMonth()+2)  + "/" + dataCorrente.getFullYear();
      sqlite.rinnovaAbbonamento(nuovaScadenza,utente);
      break;
      case tipoRinnovo = 3:
      var nuovaScadenza = dataCorrente.getDate() + "/" + (dataCorrente.getMonth()+4)  + "/" + dataCorrente.getFullYear();
      sqlite.rinnovaAbbonamento(nuovaScadenza,utente);
      break;
      case tipoRinnovo = 12:
      var nuovaScadenza = dataCorrente.getDate() + "/" + (dataCorrente.getMonth()+1)  + "/" + (dataCorrente.getFullYear()+1);
      sqlite.rinnovaAbbonamento(nuovaScadenza,utente);
      break;

    }
    
  });

  app.post('/scadenza', function (req, res) {
    var ObjUtente = JSON.parse(req.body);
    var utente = ObjUtente.eUtente;
    sqlite.getScadenza( function (Scadenza) {
      var scadenza ={};
      var listaScadenza={};
      scadenza.Scadenza = Scadenza;
      
      var stringScadenza=JSON.stringify(scadenza);// prodotto stringato del db da parsare 
      
      var scadenzaJson= JSON.parse(stringScadenza);
      
      //var obj = corsiJson;
      listaScadenza = scadenzaJson;
      
     
      res.json(listaScadenza);
     
  
    },utente)
  });





//Inizializza il server
app.listen(8080, function() {
    console.log('listening on 8080');
  });