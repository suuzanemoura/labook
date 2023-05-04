-- Active: 1682699659403@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT('NORMAL') NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        upload_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "Suzane",
        "suzane@email.com",
        "Su@123456",
        "ADMIN"
    ), (
        "u002",
        "Bryan",
        "bryan@email.com",
        "Bryan@123456",
        "NORMAL"
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES (
        "p001",
        "u001",
        "Começando o último projeto de backend da Labenu!"
    ), (
        "p002",
        "u001",
        "Que preguiça de fazer projeto em uma sexta-feira chuvosa! haha"
    ), (
        "p003",
        "u002",
        "Buscando indicações de vagas junior para minha esposa!"
    );