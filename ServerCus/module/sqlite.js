const sqlite3 = require('sqlite3').verbose();
const database = './ecommerce.db';
const databasecorsi = './corsi.db';

module.exports = {
    getProdotti: function (callback) {
        let db = new sqlite3.Database(database);

        var Prodotti = [];


        let sql = `SELECT * FROM CATALOGO`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var prodotto = {};
                prodotto.codice=row.CodiceProd;
                prodotto.nome = row.NomeProd;
                prodotto.prezzo = row.Prezzo;
                prodotto.pDisponibili = row.Quantità;
                prodotto.immagine = row.Immagine;
                //prodotto.quantita = 1; 
                console.log("prodotto", prodotto);
                Prodotti.push(prodotto);
                
                
            });
            //call the callback
            callback(Prodotti)

        });

        db.close();

    },

    cancellaProdotti: function(utente,codice){
        let db = new sqlite3.Database(database);
        let sql = 'DELETE FROM CARRELLO WHERE UTENTE = ? AND CODICE = ?'
        db.run(sql,utente,codice,function(err){
            if(err){
                console.error(err.message);
            }
            console.log('Hai eliminato i prodotti correttamente');
        });
        db.close();
    },

    

    aggiungiOrdine: function (utente,codice,data,quantita,nome,prezzo,img) {
        let db = new sqlite3.Database(database);
        let sql = `INSERT INTO ORDINI (Utente,Codice,Data,Nome,Quantita,Prezzo,Immagine)  
        VALUES (?,?,?,?,?,?,?)`;
        db.run(sql,utente,codice,data,nome,quantita,prezzo,img, function(err){
            if (err) {
                console.error(err.message);
                }
            console.log('Hai immesso correttamente il prodotto negli ordini!');
    
            });
        db.close();
      
    },

    aggiungiAlCarrello: function (utente,codice,numProd,nomeProd,prezzo,img) {
        let db = new sqlite3.Database(database);
        let sql = `INSERT INTO CARRELLO (Utente,Codice,numProdotti,nomeProdotto,Prezzo,Immagine)  
        VALUES (?,?,?,?,?,?)`;
        db.run(sql,utente,codice,numProd,nomeProd,prezzo,img, function(err){
            if (err) {
                console.error(err.message);
                }
            console.log('Hai immesso correttamente il prodotto nel db!');
    
            });
        db.close();
      
    },

    getCarrello: function (callback,utente) {
        let db = new sqlite3.Database(database);

        var Prodotti = []


        let sql = `SELECT * FROM CARRELLO WHERE UTENTE = ?`;

        db.all(sql,utente, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var prodotto = {}; 
                prodotto.codice=row.Codice;
                prodotto.utente = row.Utente;
                prodotto.nome = row.nomeProdotto;
                prodotto.prezzo = row.Prezzo;
                prodotto.quantita = row.numProdotti;
                prodotto.immagine = row.Immagine;
                console.log("prodotto", prodotto);
                Prodotti.push(prodotto);
                
            });
            //call the callback
            callback(Prodotti)

        });


        db.close();

    },

    getOrdini: function (callback,utente) {
        let db = new sqlite3.Database(database);

        var Prodotti = []


        let sql = `SELECT * FROM ORDINI WHERE UTENTE = ?`;

        db.all(sql,utente, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var prodotto = {}; 
                prodotto.codice=row.Codice;
                prodotto.utente = row.Utente;
                prodotto.nome = row.nomeProdotto;
                prodotto.prezzo = row.Prezzo;
                prodotto.quantita = row.Quantita;
                prodotto.immagine = row.Immagine;
                prodotto.data = row.Data;
                console.log("prodotto", prodotto);
                Prodotti.push(prodotto);
                
            });
            //call the callback
            callback(Prodotti)

        });


        db.close();

    },

    aggiornaQuantità: function(nProdOrd,codice){
        let db = new sqlite3.Database(database);
        let sql = 'UPDATE Catalogo SET Quantità = Quantità - ? WHERE CodiceProd = ?'
        db.run(sql,nProdOrd,codice,function(err){
            if(err){
                console.error(err.message);
            }
            console.log('Hai aggiornato le quantita');
        });
        db.close();
    },

    ripristinaQuantità: function(nProdOrd,codice){
        let db = new sqlite3.Database(database);
        let sql = 'UPDATE Catalogo SET Quantità = Quantità + ? WHERE CodiceProd = ?'
        db.run(sql,nProdOrd,codice,function(err){
            if(err){
                console.error(err.message);
            }
            console.log('Hai aggiornato le quantita');
        });
        db.close();
    },

    aggiungiAiPreferiti: function (utente,codice,prezzo,nome,img) {
        let db = new sqlite3.Database(database);
        let sql = `INSERT INTO PREFERITI (Utente,Codice,Prezzo,Nome,Immagine)  
        VALUES (?,?,?,?,?)`;
        db.run(sql,utente,codice,prezzo,nome,img, function(err){
            if (err) {
                console.error(err.message);
                }
            console.log('Hai immesso correttamente il prodotto nei preferiti');
    
            });
        db.close();
      
    },

    getPreferiti: function (callback,utente) {
        let db = new sqlite3.Database(database);

        var Prodotti = []


        let sql = `SELECT * FROM PREFERITI WHERE UTENTE = ?`;

        db.all(sql,utente, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var prodotto = {}; 
                prodotto.codice=row.Codice;
                prodotto.utente = row.Utente;
                prodotto.nome = row.Nome;
                prodotto.prezzo = row.Prezzo;
                prodotto.immagine = row.Immagine;
                
                console.log("preferito", prodotto);
                Prodotti.push(prodotto);
                
            });
            //call the callback
            callback(Prodotti)

        });


        db.close();

    },

    cancellaPreferito: function(utente,codice){
        let db = new sqlite3.Database(database);
        let sql = 'DELETE FROM PREFERITI WHERE UTENTE = ? AND CODICE = ?'
        db.run(sql,utente,codice,function(err){
            if(err){
                console.error(err.message);
            }
            console.log('Hai eliminato i prodotti correttamente');
        });
        db.close();
    },

    getCorsi: function (callback) {
        let db = new sqlite3.Database(databasecorsi);

        var Corsi = [];


        let sql = `SELECT * FROM CORSI`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var corso = {};
                corso.nome = row.Nome;
                corso.istruttore=row.Istruttore;
                corso.descrizione = row.Descrizione;
                corso.giorni = row.Giorni;
                corso.orario = row.Orario;
                corso.immagine = row.Immagine;
                Corsi.push(corso);
                
                
            });
            //call the callback
            callback(Corsi)

        });

        db.close();

    },

    aggiungiIscritto: function (utente,nomecorso,giorni,orario,immagine) {
        let db = new sqlite3.Database(databasecorsi);
        let sql = `INSERT INTO ISCRITTI (NomeUtente,NomeCorso,Orario,Giorni,Immagine)  
        VALUES (?,?,?,?,?)`;
        db.run(sql,utente,nomecorso,giorni,orario,immagine, function(err){
            if (err) {
                console.error(err.message);
                }
            console.log('Ti sei iscritto correttamente');
    
            });
        db.close();
      
    },

    getMieiCorsi: function (callback,utente) {
        let db = new sqlite3.Database(databasecorsi);

        var Corsi = []


        let sql = `SELECT * FROM ISCRITTI WHERE NOMEUTENTE = ?`;

        db.all(sql,utente, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var corso = {}; 
                corso.nome = row.NomeCorso;
                corso.giorni = row.Giorni;
                corso.orario = row.Orario;
                corso.immagine = row.Immagine;
                Corsi.push(corso);
                
            });
            //call the callback
            callback(Corsi)

        });


        db.close();

    },

    rimuoviCorso: function(utente,corso){
        let db = new sqlite3.Database(databasecorsi);
        let sql = 'DELETE FROM ISCRITTI WHERE NOMEUTENTE = ? AND NOMECORSO = ?'
        db.run(sql,utente,corso,function(err){
            if(err){
                console.error(err.message);
            }
            console.log('Iscrizione annullata');
        });
        db.close();
    },

    creaAbbonato: function (utente,scadenza) {
        let db = new sqlite3.Database(databasecorsi);
        let sql = `INSERT INTO ABBONATI (Utente,Scadenza)  
        VALUES (?,?)`;
        db.run(sql,utente,scadenza, function(err){
            if (err) {
                console.error(err.message);
                }
            console.log('Hai immesso correttamente il nuovo abbonato');
    
            });
        db.close();
      
    },

    rinnovaAbbonamento: function(nuovaScadenza,utente){
        let db = new sqlite3.Database(databasecorsi);
        let sql = 'UPDATE ABBONATI SET SCADENZA = ? WHERE UTENTE = ?'
        db.run(sql,nuovaScadenza,utente,function(err){
            if(err){
                console.error(err.message);
            }
            console.log("Hai rinnovato l' abbonamento");
        });
        db.close();
    },

    getScadenza: function (callback,utente) {
        let db = new sqlite3.Database(databasecorsi);

        var Scadenza = [];


        let sql = `SELECT SCADENZA FROM ABBONATI WHERE UTENTE = ?`;

        db.all(sql,utente, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                
                var scadenza = {}; 
                scadenza.scadenza = row.Scadenza;
                
                Scadenza.push(scadenza);
                
            });
            //call the callback
            callback(Scadenza);

        });


        db.close();

    },
    




    





}
