const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const etudiants = [
    { id: 1, nom: "John" },
    { id: 2, nom: "Gedeon" },
    { id: 3, nom: "Salem" },
    { id: 4, nom: "Jeannette" },
    { id: 5, nom: "Queen" },
];

const port = process.env.port || 3000;
app.listen(port, () => console.log(`THE SERVER IS RUNNING AT PORT ${port}`));

// Commentaire
// Root API ::::
app.get('/', (req, res) => {
    res.send('WELCOME TO MY NODE JS API');
});

// Commentaire
// Display request pamaters ::::
app.post('/api/test-post/:jour/:mois/:annee', (req, res) => {
    res.status(200).send(req.params);
});

// Commentaire
// Get all Students ::::
app.get('/api/Etudiants', (req, res) => {
    res.status(200).send(etudiants);
});

// Commentaire
// Get student by id parameter ::::
app.get('/api/Etudiants/:id', (req, res) => {
    const et = etudiants.find(e => e.id === parseInt(req.params.id));
    if (!et) return res.status(404).send('Etudiant INTROUVABLE');
    res.send(et)
});

// Commentaire
// Post Students ::::
app.post('/api/Etudiants', (req, res) => {
    const { error } = validateName(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const et = {
        id: etudiants.length + 1,
        nom: req.body.nom
    };

    etudiants.push(et);
    res.send(et);
});

// Commentaire
// Update Students ::::
app.put('/api/update/:id', (req, res) => {
    const et = etudiants.find(e => e.id === parseInt(req.params.id));
    if (!et) return res.status(404).send('ETUDIANT INTROUVABLE');

    const { error } = validateName(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    et.nom = req.body.nom;
    res.send(et);

});

// Commentaire
// Delete Student ::::
app.delete('/api/delete/:id', (req, res) => {
    const et = etudiants.find(e => e.id === parseInt(req.params.id));
    if (!et) return res.status(404).send('ETUDIANT INTROUVABLE');

    const index = etudiants.indexOf(et);
    etudiants.splice(index, 1);

    res.send(et);
});

// Commentaire
// Validation name function
function validateName(et) {
    const schema = Joi.object({
        nom: Joi.string().min(3).required()
    });
    return schema.validate(et);
}