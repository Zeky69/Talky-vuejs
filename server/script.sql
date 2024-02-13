-- Supprimer les tables avec dépendances en premier
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS friends;

-- Ensuite, supprimer les tables sans dépendances ou dont les dépendances ont été supprimées
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des conversations
CREATE TABLE conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255),
    private BOOLEAN DEFAULT TRUE,
    avatar VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Table des messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(id) ON DELETE SET NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE participants (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, conversation_id)
);

CREATE TABLE friends (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    friend_id INT REFERENCES users(id) ON DELETE CASCADE,
    status INT NOT NULL DEFAULT 0 , -- -1: blocked 0: pending, 1: accepted, 2: refused
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id)
);


INSERT INTO users (username, password,avatar) VALUES ('Zeky', 'mdp','zeky.webp');
INSERT INTO users (username, password,avatar) VALUES ('Enzo', 'mdp','enzo.webp');
INSERT INTO users (username, password,avatar) VALUES ('Calixte', 'mdp','calixte.webp');
INSERT INTO users (username, password,avatar) VALUES ('Manon', 'mdp','manon.webp');
INSERT INTO users (username, password,avatar) VALUES ('Tristan', 'mdp','tristan.webp');
INSERT INTO users (username, password,avatar) VALUES ('Zafam', 'mdp','zafam.webp');
-- Continuer à ajouter des utilisateurs selon le besoin.
-- Ajoutez plus d'insertions selon le besoin.
WITH conversation_id AS (
    INSERT INTO conversations (name,avatar,private) VALUES ('Play for peace','playforpeace.webp',false) RETURNING id AS conversation_id
)
INSERT INTO messages (conversation_id, sender_id, text) VALUES
                                                            ((SELECT conversation_id FROM conversation_id), 1, 'Hello, how are you?'),
                                                            ((SELECT conversation_id FROM conversation_id), 2, 'I''m doing well, thank you!'),
                                                            ((SELECT conversation_id FROM conversation_id), 1, 'Nice to hear that.');


WITH conversation_id AS (
    SELECT id AS conversation_id FROM conversations LIMIT 1
)
INSERT INTO participants (user_id, conversation_id) VALUES (1, (SELECT conversation_id FROM conversation_id)),
                                                           (2, (SELECT conversation_id FROM conversation_id)),
                                                              (3, (SELECT conversation_id FROM conversation_id));


-- Continuez avec plus d'insertions en vous assurant que les `user_id` et `conversation_id` sont valides.
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 2, 1);
INSERT INTO friends (user_id, friend_id, status) VALUES (2, 1, 1);
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 3, 1);
INSERT INTO friends (user_id, friend_id, status) VALUES (3, 1, 1);
INSERT INTO friends (user_id, friend_id, status) VALUES (4, 1, 0);
INSERT INTO friends (user_id, friend_id, status) VALUES (5, 1, 0);


WITH conversation_id AS (
    INSERT INTO conversations (name) VALUES ('Conversations 2') RETURNING id AS conversation_id
)
INSERT INTO messages (conversation_id, sender_id, text) VALUES ((SELECT conversation_id FROM conversation_id), 3, 'Salut, tu viens ce soir ?'),
                                                               ((SELECT conversation_id FROM conversation_id), 4, 'Oui, à quelle heure ?');
-- Continuer à ajouter des messages en s'assurant de la validité des ID.
WITH conversation_id AS (
    SELECT id AS conversation_id FROM conversations ORDER BY conversations.created_at DESC LIMIT 1
)
INSERT INTO participants (user_id, conversation_id) VALUES (3, (SELECT conversation_id FROM conversation_id)),
                                                           (4, (SELECT conversation_id FROM conversation_id));


-- Continuer à ajouter des participants en s'assurant de la validité des ID.
INSERT INTO friends (user_id, friend_id, status) VALUES (3, 4, 1);
INSERT INTO friends (user_id, friend_id, status) VALUES (4, 5, 0);


INSERT INTO friends (user_id, friend_id, status) VALUES (5, 3, -1);
-- Continuer à ajouter des relations d'amitié en s'assurant de la validité des ID.

UPDATE users SET password = '$2b$10$iqvISOu1GRPILQKuhIo1F.epj0IjBximRZsgjtD//a.feqBd8J7vu' WHERE id = 14;

select * from users;

select * from conversations;

select * from messages;
