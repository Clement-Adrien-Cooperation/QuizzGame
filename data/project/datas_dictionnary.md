# DICTIONNAIRE DE DONNÉES

## USERS

| Champ | Type | Specificité | Description |
| --- |  ---  | --- | --- |
| id | INT | PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNIQUE | Identifiant de l'utilisateur |
| pseudo | TEXT | NOT NULL, VARCHAR(30) | Pseudo de l'utilisateur |
| email | TEXT | NOT NULL, VARCHAR(100) | Adresse mail de l'utilisateur |
| password | TEXT | NOT NULL, VARCHAR(100) | Mot de passe de l'utilisateur |
| avatar | INT | NOT NULL, DEFAULT | ID de l'avatar de l'utilisateur |
| role | TEXT | NOT NULL, DEFAULT | Rôle de l'utilisateur (admin ou non) |
| is_banished | BOOL | NOT NULL, DEFAULT | État du bannissement de l'utilisateur |


## QUIZZ

| Champ | Type | Specificité | Description
| --- |  ---  | --- | --- |
| id | INT | PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNIQUE | Identifiant du quizz |
| user_id | INT | NOT NULL | ID du créateur du quizz |
| title | TEXT | NOT NULL, VARCHAR(50) | Titre du quizz |
| description | TEXT | VARCHAR(200) | Description du quizz | 
| category | TEXT | NOT NULL, VARCHAR(20) | Catégorie du quizz |
| difficulty | INT | NOT NULL, DEFAULT | Difficulté du quizz |
| lang | TEXT | NOT NULL, VARCHAR(10) | Langue du quizz |
| image | TEXT | NOT NULL, DEFAULT | Image du quizz |
| is_visible | BOOL | NOT NULL, DEFAULT | État de la visibilité du quizz |
| created_at | INT | NOT NULL | date de création du quizz |


## COMMENT

| Champ | Type | Specificité | Description
| --- |  ---  | --- | --- |
| id | INT | PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNIQUE | Identifiant du commentaire |
| user_id | INT | NOT NULL | Identifiant de l'user qui a déposé le commentaire |
| quiz_id | INT | NOT NULL | Identifiant du quizz où se trouve le commentaire |
| description | TEXT | NOT NULL, VARCHAR(500) | contenu du commentaire |

 


## QUESTIONS

| Champ | Type | Specificité | Description
| --- |  ---  | --- | --- |
| id | INT | PRIMARY KEY, NOT NULL, AUTO_INCREMENT, UNIQUE | Identifiant du commentaire |
| quiz_id | INT | NOT NULL | Identifiant du quizz |
| question | TEXT | NOT NULL, VARCHAR(600) | question du quizz |
| proposition | TEXT | NOT NULL, VARCHAR(200) | proposition possible pour répondre à la question |
| answer | TEXT | NOT NULL, VARCHAR(200) | bonne réponse à la question |