import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {

  const newQuizz = [];

  for(let i = 0; i < 50; i++) {
    newQuizz.push({
      id: i.toString(),
      user_id: '1',
      creator: 'Vadrial',
      title: `Quiz ${i}`,
      nbOfQuestions: 50,
      nbOfPlayed: 0,
      category: "Cinéma",
      difficulty: "Facile",
      date: new Date().toLocaleDateString(),
      rate: [4],
      rates_IDs: ['2'],
      is_visible: true
    });
  };

  await prisma.quiz.createMany({
    data: [...newQuizz]
  });

  const newQuestions = [];

  for(let i = 0; i < 50; i++) {

    const newQuestionsForOneQuiz = [];

    for(let j = 0; j < 50; j++) {
      newQuestionsForOneQuiz.push({
        id: uuidv4(),
        user_id: '1',
        quiz_id: i.toString(),
        question: `Question n°${j}`,
        answer: `Réponse n°${j}`,
        proposals: [
          `Proposition n°${j} - 1`,
          `Proposition n°${j} - 2`,
          `Proposition n°${j} - 3`
        ],
        description: "Je donne une anecdote utile et agréable concernant cette question pour donner quelques précisions à propos de la conjoncture du contexte qui entoure la diégèse du détail de la viande de boeuf"
      });
    };

    newQuestions.push(...newQuestionsForOneQuiz);
  };

  await prisma.question.createMany({
    data: [...newQuestions]
  });

  const newComments = [];

  for(let i = 0; i < 50; i++) {

    const newCommentsForOneQuiz = [];

    for(let j = 0; j < 50; j++)
    newCommentsForOneQuiz.push({
      id: uuidv4(),
      user_id: '1',
      quiz_id: i.toString(),
      author: 'Vadrial',
      content: "Voilà un quiz plutôt sympa, qui allie avec finesse la difficulté et les sujets passionnants. Vive la république. Vive la France.",
      date: new Date().toLocaleDateString(),
      likes: 8,
      likes_IDs: ['2']
    });

    newComments.push(...newCommentsForOneQuiz);
  };

  await prisma.comment.createMany({
    data: [...newComments]
  });

  await prisma.category.createMany({
    data: [
      {name: "Cinéma"},
      {name: "Culture générale"},
      {name: "Art"},
      {name: "Littérature"},
      {name: "Jeux vidéo"},
      {name: "Géographie"},
      {name: "Histoire"},
      {name: "Langues"},
      {name: "Internet"},
      {name: "Autre"},
      {name: "Divers"},
      {name: "Sport"},
      {name: "Loisirs"},
      {name: "Télévision"},
      {name: "Divertissement"},
      {name: "Musique"},
      {name: "Science"}
    ]
  });

  const newReports = [];

  for(let i = 0; i < 30; i++) {
    newReports.push({
      id: uuidv4(),
      user_id: ('1'),
      pseudo: 'Vadrial',
      about: 'quiz',
      about_id: i.toString(),
      about_title: `Quiz n° ${i}`,
      message: "Ce quiz est une ignominie de mensonges, de calomnies et de manque de culture évidents. En plus la question n°16 est débile et fausse",
      date: new Date().toLocaleDateString()
    });

    newReports.push({
      id: uuidv4(),
      user_id: ('1'),
      pseudo: 'Vadrial',
      about: 'user',
      about_id: '1',
      about_title: 'Vadrial',
      message: "Cet utilisateur à un pseudo faisant référence à une culture naze et faux cul. Et en plus c'est un guignol. Bannissez le svp",
      date: new Date().toLocaleDateString()
    });

    newReports.push({
      id: uuidv4(),
      user_id: ('1'),
      pseudo: 'Vadrial',
      about: 'comment',
      about_id: i.toString(),
      about_title: `Commentaire de merde`,
      message: "Ce commentaire est insultant et inaproprié envers toute la communauté des petites cuillères",
      date: new Date().toLocaleDateString()
    });
  };

  await prisma.report.createMany({
    data: [...newReports]
  });

  const newNotifications = [];

  for(let i = 0; i < 50; i++) {
    newNotifications.push({
      id: uuidv4(),
      user_id: '1',
      title: 'Vous avez un nouveau message de la part du président',
      message: "Bonjour Vadrial, vous êtes le 1.000.000.000.000.000ème visiteur unique de notre site ! En conséquences, vous avez reçu l'ultime chance d'être l'heureux élu d'un magnifique bon de réduction virtuel de 0.01£ sur l'achat d'une bombe nucléaire à la Russie",
      date: new Date().toLocaleDateString(),
      seen: false
    });
  };

  await prisma.notification.createMany({
    data: [...newNotifications]
  });
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });