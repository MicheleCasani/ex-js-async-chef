

// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:

// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef

// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch


// 🎯 Bonus 1
// Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.


// 🎯 Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.



async function getChefBirthday(id) {

    // Dichiaro la variabile che conterrà i dati della ricetta
    let recipes

    try {
        // 1. Faccio la prima chiamata API per recuperare la ricetta tramite l'ID
        recipes = await fetch(`https://dummyjson.com/recipes/${id}`);
        // Converto la response in formato JSON
        recipes = await recipes.json();
    }
    catch (error) {
        // Se la chiamata fallisce, lancio un errore personalizzato
        throw new Error('Errore nel recupero della ricetta');
    }

    // Controllo se la ricetta esiste e se contiene un userId (BONUS 1)
    // Questo previene errori a cascata nella seconda richiesta
    if (!recipes || !recipes.userId) {
        throw new Error('Ricetta non trovata');
    }

    // Estraggo l'userId dalla ricetta per la seconda chiamata API
    let userId = recipes.userId

    // Dichiaro la variabile che conterrà i dati dello chef
    let chef

    try {
        // 2. Faccio la seconda chiamata API per recuperare le informazioni dello chef
        chef = await fetch(`https://dummyjson.com/users/${userId}`);
        // Converto la response in formato JSON
        chef = await chef.json();
    }
    catch (error) {
        // Se la chiamata fallisce, lancio un errore personalizzato
        throw new Error('Errore nel recupero dello chef');
    }

    // Controllo aggiuntivo per verificare che i dati dello chef siano validi
    if (!chef) {
        throw new Error('Chef non trovato');
    }

    // Formatto la data di nascita usando Day.js nel formato italiano (DD/MM/YYYY)
    const formattedDate = dayjs(chef.birthDate).format('DD/MM/YYYY');
    // Restituisco la data formattata
    return formattedDate;
}

// Chiamo la funzione con ID ricetta = 1 e gestisco il risultato
getChefBirthday(1)
    // Se la Promise si risolve con successo, stampo la data formattata
    .then(birthDate => console.log(
        `La data di nascita dello chef è: ${birthDate}`
    ))
    // Se la Promise viene rigettata, stampo l'errore in console
    .catch(error => console.error(error));