const mainPageContent = {
  headingText: 'Учебный проект студента факультета Веб-разработки.',
  navTabSection: {
    links: [
      {
        heading: 'О проекте',
        path: '/#aboutProject',
        id: 1,
      },
      {
        heading: 'Технологии',
        path: '/#techs',
        id: 2,
      },
      {
        heading: 'Студент',
        path: '/#about-me',
        id: 3,
      },
    ],
  },
  aboutProjectSection: {
    sectionHeading: 'О проекте',
    cards: [
      {
        heading: 'Дипломный проект включал 5 этапов',
        description: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
        id: 1,
      },
      {
        heading: 'На выполнение диплома ушло 5 недель',
        description: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
        id: 2,
      },
    ],
    timeline: [
      {
        time: '1 неделя',
        duty: 'Back-end',
        id: 1,
      },
      {
        time: '4 недели',
        duty: 'Front-end',
        id: 2,
      },
    ],
  },
  techsSection: {
    sectionHeading: 'Технологии',
    contentHeading: '7 технологи',
    description: 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.',
    skills: [
      { skill: 'HTML', id: 1 },
      { skill: 'CSS', id: 2 },
      { skill: 'JS', id: 3 },
      { skill: 'React', id: 4 },
      { skill: 'Git', id: 5 },
    ],
  },
  aboutMeSection: {
    sectionHeading: 'Frontend-разработчик',
    personBio: {
      name: 'Егор',
      position: 'Frontend-разработчик, 25 лет',
      aboutMe: `Я родился и живу в Саратове, закончил факультет экономики СГУ.
      У меня есть жена и дочь.Я люблю слушать музыку, а ещё увлекаюсь бегом.Недавно начал кодить.
      С 2015 года работал в компании «СКБ Контур».После того, как прошёл курс по веб- разработке,
      начал заниматься фриланс- заказами и ушёл с постоянной работы.`,
    },
    personalLinks: [
      { socialNetwork: 'Github', link: 'https://github.com/proehavshiy', id: 1 },
      { socialNetwork: 'Telegram', link: 'https://tlgg.ru/proehavshiy', id: 2 },
    ],
    avatar: 'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
    portfolio: [
      {
        name: 'Статичный сайт',
        link: 'http://example.com/',
        id: 1,
      },
      {
        name: 'Адаптивный сайт',
        link: 'http://example.com/',
        id: 2,
      },
      {
        name: 'Одностраничное приложение',
        link: 'http://example.com/',
        id: 3,
      },
    ],
  },
};

export default mainPageContent;
