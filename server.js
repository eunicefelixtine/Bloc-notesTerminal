const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const app = express();

// Récupération du chemin via la variable d'environnement (ou fallback local)
const dbPath = process.env.DB_PATH || 'database.db';

// Création du dossier /app/data s'il n'existe pas encore
const dbDir = path.dirname(dbPath);
if (dbDir && !fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialisation de SQLite
const db = new Database(dbPath);

//Creéation de la table 'documents' si elle n'existe pas
db.exec(`
CREATE TABLE IF NOT EXISTS documents (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
content TEXT,
updated_at DateTime Default CURRENT_TIMESTAMP
)
`);

app.use(express.json());
app.use(express.static(__dirname));

//GET: Récupérer tous les documents avec gestion optionnelle de recheche par mot-clé
app.get('/api/docs', (req, res) => {
  const search = req.query.q || '';
  const stmt = db.prepare(`
    SELECT id, title, updated_at 
    FROM documents 
    WHERE title LIKE ? OR content LIKE ?
    ORDER BY updated_at DESC
  `);
  const docs = stmt.all(`%${search}%`, `%${search}%`);
  res.json(docs);
});

//GET : Récupérer le contenu complet d'un document spécifiqeu
app.get('/api/docs/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM documents WHERE id = ?');
  const doc = stmt.get(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document introuvable' });
  res.json(doc);
});

//Créer un nouveau document vide
app.post('/api/docs', (req, res) => {
  const stmt = db.prepare('INSERT INTO documents (title, content) VALUES (?, ?)');
  const info = stmt.run('Document sans titre', '');
  res.status(201).json({ id: info.lastInsertRowid, title: 'Document sans titre', content: '' });
});

//PUT: sauvegarder les modifications d'un document(un peu dire comme un localStorage)
app.put('/api/docs/:id', (req, res) => {
  const { title, content } = req.body;
  const stmt = db.prepare(`
    UPDATE documents 
    SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `);
  stmt.run(title || 'Document sans titre', content, req.params.id);
  res.json({ message: 'Enregistré avec succès' });
});

//DELETE : Supprimer un document
app.delete('/api/docs/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM documents WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ message: 'Document supprimé' });
});

app.listen(3000, () => {
  console.log('Logiciel Bloc-NotesFelixtine démarré sur http://localhost:3000');
});
