const ru = {
  translation: {
    msStatus: {
      new: 'Подача не завершена',
      submitted: 'Статья получена',
      accepted: 'Принято',
      evaluated: 'Статья прошла оценку',
      rejected: 'Отклонено',
      revise: 'Нуждается в исправлении',
      revising: 'На исправлении',
      published: 'Опубликовано',
      unknown: 'Неизвестный статус',
    },
    reviewerStatus: {
      invited: 'Приглашен',
      rejected: 'Отклонено',
      declined: 'Отклонено',
      accepted: 'Принято',
      inProgress: 'В работе',
      completed: 'Завершено',
      unanswered: 'Без ответа',
    },
    common: {
      Ok: 'OK',
      Cancel: 'Отменить',
      'Enter search terms...': 'Найти',
      surroundMultiword:
        'Фразы, состоящие из нескольких слов, заключайте в кавычки «». Исключите термин, добавив префикс -. Укажите альтернативные совпадения, используя OR. Используйте * в качестве подстановочного знака для окончаний слов. Заключите подвыражения в круглые скобки ().',
      noOption: 'Не найдено',
      danteRangeCalendar: {
        Presets: 'Готовые',
        Today: 'Сегодня',
        Yesterday: 'Вчера',
        'Past 7 days': 'Последние 7 дней',
        'Past 30 days': 'Последние 30 дней',
        'Past 90 days': 'Последние 90 дней',
        'Past year': 'Последний год',
        Clear: 'Сбросить',
      },
      roles: {
        Admin: 'Редактор',
        'Group Manager': 'Администратор',
        User: 'Пользователь',
      },
      emailUpdate: {
        invalidEmail: 'Неправильный Email',
        emailTaken: 'Email уже занят',
        smthWentWrong: 'Что-то пошло не так',
      },
      relativeDateStrings: {
        today: 'сегодня',
        yesterday: 'вчера',
        daysAgo: '{{count}} день назад',
        daysAgo_few: '{{count}} дня назад',
        daysAgo_many: '{{count}} дней назад',
      },
      recommendations: {
        Accept: 'Принять',
        Revise: 'Нуждается в исправлении',
        Reject: 'Отклонить',
      },
      teams: {
        assign: '{{teamLabel}}',
        'Senior Editor': 'Главный редактор',
        'Handling Editor': 'Выпускающий редактор',
        Editor: 'Литературный редактор',
      },
      kanban: {
        'Last updated': 'Последнее обновление',
        'Invited via email': 'Приглашен по email',
      },
      days: {
        day: 'день',
        day_few: 'дня',
        day_many: 'дней',
      },
    },
    leftMenu: {
      'Summary Info': 'Сводная информация',
      Manuscript: 'Рукопись',
      Dashboard: 'Панель управления',
      Manuscripts: 'Статьи',
      Reports: 'Аналитика',
      Settings: 'Параметры',
      Forms: 'Формы',
      Submission: 'Подача',
      Review: 'Рецензирование',
      Decision: 'Решение',
      Tasks: 'Задачи',
      Users: 'Пользователи',
      Configuration: 'Настройки',
      Emails: 'Emails',
      CMS: 'CMS',
      Pages: 'Страницы',
      Layout: 'Макет',
      'Go to your profile': 'Перейти в ваш профиль',
    },
    profilePage: {
      'Your profile': 'Ваш профиль',
      'Profile: ': 'Профиль: ',
      Logout: 'Выход из профиля',
      Username: 'Имя пользователя',
      Email: 'Email',
      Language: 'Язык',
      Change: 'Изменить',
      usernameWarn:
        'Не может начинаться с цифры или начинаться или заканчиваться пробелами',
      userPrivilegeAlert: `Требуются права пользователя
        <br /> Убедитесь, что у вас есть соответствующие разрешения роли или
        обратитесь за помощью к системному администратору.`,
      'Drop it here': 'Отпустите здесь',
      'Change profile picture': 'Изменить фото профиля',
      'Mute all discussion email notifications':
        'Отключить все уведомления по электронной почте об обсуждениях',
      ORCID: 'ORCID',
    },
    manuscriptsTable: {
      'No matching manuscripts were found': 'Совпадений не найдено',
      'Manuscript number': 'Номер статьи',
      Created: 'Создано',
      Updated: 'Обновлено',
      'Last Status Update': 'Последнее обновление статуса',
      Status: 'Статус',
      'Your Status': 'Статус',
      Title: 'Название',
      Version: 'Версия',
      Author: 'Автор',
      Editor: 'Редактор',
      'Reviewer Status': 'Статус рецензента',
      Actions: 'Действия',
      Decision: 'Решение',
      Team: 'Исполнители',
      'No results found': 'Результаты не найдены',
      pagination: `Показано <strong>{{lastResult}}</strong> из <strong>{{totalCount}}</strong> результата`,
      pagination_few: `Показано <strong>{{lastResult}}</strong> из <strong>{{totalCount}}</strong> результатов`,
      pagination_many: `Показано <strong>{{lastResult}}</strong> из <strong>{{totalCount}}</strong> результатов`,
      reviewAccept: 'Принять',
      reviewReject: 'Отклонить',
      reviewDo: 'Рецензировать',
      reviewCompleted: 'Готово',
      reviewContinue: 'Продолжить',
      all: 'Все',
      Search: 'Поиск',
      actions: {
        Evaluation: 'Оценка',
        Control: 'Контроль',
        View: 'Просмотр',
        Archive: 'В архив',
        Production: 'Редактирование',
        Publish: 'Опубликовать',
        confirmArchive:
          'Подтвердите, если действительно хотите переместить рукопись в архив',
        confirmArchiveButton: 'Архивировать',
        cancelArchiveButton: 'Отменить',
        'Publishing error': 'Ошибка публикации',
        'Some targets failed to publish':
          'Не удалось опубликовать некоторые рукописи.',
      },
    },
    dashboardPage: {
      Dashboard: 'Панель управления',
      'New submission': 'Загрузить новую статью',
      'New Alerts': 'Новые оповещения',
      'My Submissions': 'Мои статьи',
      'To Review': 'Статьи для рецензирования',
      "Manuscripts I'm Editor of": 'Статьи для редактирования',
      mySubmissions: {
        'My Submissions': 'Мои статьи',
      },
      toReview: {
        'To Review': 'Статьи для рецензирования',
      },
      edit: {
        "Manuscripts I'm editor of": 'Статьи для редактирования',
      },
    },
    reviewPage: {
      Versions: 'Версии',
      'Anonymous Reviewer': 'Анонимный рецензент',
      Submit: 'Отправить',
    },
    reviewVerdict: {
      accept: 'Принять',
      revise: 'Нуждается в исправлении',
      reject: 'Отклонить',
    },
    manuscriptsPage: {
      Manuscripts: 'Статьи',
      manuscriptInvalid:
        'Эта рукопись содержит неполные или недопустимые поля. Исправьте их и повторите попытку.',
      importPending: 'импорт',
      Refreshing: 'Обновление',
      Refresh: 'Обновить',
      'Select All': 'Выбрать все',
      selectedArticles: '{{count}} статья выбрана',
      selectedArticles_few: '{{count}} статьи выбрано',
      selectedArticles_many: '{{count}} статей выбрано',
      Archive: 'Архивировать',
    },
    decisionPage: {
      'Current version': 'Текущая версия',
      Team: 'Исполнители',
      Decision: 'Решение',
      'Manuscript text': 'Текст статьи',
      Metadata: 'Основные данные',
      'Tasks & Notifications': 'Задачи и уведомления',
      'Assign Editors': 'Назначить редактора',
      'Reviewer Status': 'Этап рецензирования',
      Version: 'Версия',
      'See Declined': 'Посмотреть отказавшихся ({{count}})',
      'Hide Declined': 'Скрыть',
      'No Declined Reviewers': 'Нет отказавшихся рецензентов',
      'Invite Reviewers': 'Назначить рецензентов',
      'New User': 'Новый пользователь',
      selectUser: 'Выбрать',
      'Invite reviewer': 'Назначить рецензента',
      'Invite and Notify': 'Пригласить и уведомить',
      'User email address opted out':
        'Адрес электронной почты пользователя отключен',
      inviteUser: {
        Email: 'Email',
        Name: 'ФИО',
      },
      declinedInvitation: 'Отклонено {{dateString}}',
      'Invited via email': 'Приглашен по email',
      'View Details': 'Просмотр',
      decisionTab: {
        'Archived version': 'Версия в архиве',
        notCurrentVersion:
          'Это не текущая, а архивная версия рукописи, доступная только для чтения.',
        'Completed Reviews': 'Рецензирование завершено',
        noReviews: 'Нет завершенных рецензий.',
        reviewNum: 'Рецензия {{num}}',
        'Anonmyous Reviewer': 'Анонимный рецензент',
        'Hide review': 'Скрыть рецензию',
        'Hide reviewer name': 'Скрыть имя рецензента',
        reviewModalShow: 'Показать',
        reviewModalHide: 'Свернуть',
        Submit: 'Отправить',
        Publishing: 'Публикация',
        publishOnlyAccepted:
          'К публикации допускаются рукописи принятые по итогам рецензирования.',
        publishingNewEntry:
          'Публикация добавит новую запись на общедоступный веб-сайт и не может быть отменена.',
        Publish: 'Опубликовать',
        Republish: 'Опубликовать заново',
        publishedOn: 'Опубликовано {{date}}',
        doisToBeRegistered: 'Будут зарегестрированы DOI: {{dois}}',
        noDoisToBeRegistered: 'Нет DOI для регистрации при публикации.',
      },
      metadataTab: {
        'Manuscript Number': 'Номер статьи:',
      },
      tasksTab: {
        Notifications: 'Уведомления',
        'New User': 'Новый пользователь',
        'Choose receiver': 'Выбрать получателя',
        'Choose notification template': 'Уведомление',
        Notify: 'Уведомить',
        'User email address opted out':
          'Адрес электронной почты пользователя отключен',
        Tasks: 'Задачи',
        newUser: {
          Email: 'Email',
          Name: 'ФИО',
        },
      },
      'Add another person': 'Добавить',
      'Delete this author': 'Удалить',
    },
    editorSection: {
      noFileLoaded: 'Файл рукописи не загружен',
      noSupportedView: 'Файл не поддерживается для отображения',
    },
    cmsPage: {
      pages: {
        addNew: 'Добавить новую страницу',
        'New Page': 'Новая страница',
        Pages: 'Страницы',
        Publish: 'Опубликовать',
        'Saving data': 'Сохранение данных',
        Rebuilding: 'Пересоздание...',
        Published: 'Опубликовано',
        Save: 'Сохранить',
        Delete: 'Удалить',
        fields: {
          title: 'Заголовок страницы*',
          url: 'URL',
        },
        'New edits on page': 'Новые изменения на странице',
        'Edited on': 'Изменено {{date}}',
        'Published on': 'Опубликовано {{date}}',
        'Not published yet': 'Еще не опубликовано',
      },
      layout: {
        Layout: 'Макет',
        Publish: 'Опубликовать',
        'Saving data': 'Сохранение данных',
        'Rebuilding Site': 'Пересоздание сайта...',
        Published: 'Опубликовано',
        'Brand logo': 'Логотип',
        'Brand Color': 'Цвета',
        fields: {
          primaryColor: 'Основной цвет',
          secondaryColor: 'Дополнительный цвет',
        },
        Header: 'Шапка сайта',
        useCheckbox:
          'Используйте флажок, чтобы показать или скрыть страницу в меню. Зажмите и перетащите, чтобы упорядочить.',
        Footer: 'Подвал сайта',
        Partners: 'Партнеры',
        'Footer Text': 'Тест подвала',
        'Footer Page links': 'Ссылки страниц',
      },
    },
    authorsInput: {
      firstName: {
        label: 'Имя',
        placeholder: 'Имя',
      },
      lastName: {
        label: 'Фамилия',
        placeholder: 'Фамилия',
      },
      email: {
        label: 'Email',
        placeholder: 'Email',
      },
      affiliation: {
        label: 'Принадлежность',
        placeholder: 'Место работы',
      },
    },
    dragndrop: {
      'Drag and drop your files here': 'Перетащите файлы сюда',
      'Your file has been uploaded': 'Ваши файлы были загружены',
      Remove: 'Удалить',
    },
    productionPage: {
      Production: 'Редактирование',
      'No supported view of the file':
        'Нет поддерживаемого представления файла',
      Download: 'Загрузить',
    },
    invitationResults: {
      author: 'автор',
      reviewer: 'рецензент',
      declinedAndOptedOut:
        '{{invitationType}} отклонил приглашение и отключил свой email',
      declined: '{{invitationType}} отклонил приглашение',
      accepted: '{{invitationType}} принял приглашение',
    },
    configPage: {
      Configuration: 'Настройки',
      'Instance Type': 'Тип элемента',
      'Group Identity': 'Групповая идентификация',
      'Brand name': 'Название журнала',
      'Brand primary colour': 'Основной фирменный цвет',
      'Brand secondary colour': 'Дополнительный фирменный цвет',
      Logo: 'Логотип',
      Dashboard: 'Панель управления',
      landingPage:
        'Лендинг страница входа в систему для пользователей в роли администратора',
      'Dashboard Page': 'Страница панели управления',
      'Manuscript Page': 'Страница со статьями',
      pagesVisibleToRegistered:
        'Страницы панели управления, доступные зарегистрированным пользователям',
      'My Submissions': 'Мои статьи',
      'To Review': 'Статьи для рецензирования',
      "Manuscripts I'm editor of": 'Статьи для редактирования',
      'Manuscripts page': 'Страница со статьями',
      'List columns to display on the Manuscripts page':
        'Список полей, отображаемых на странице со статьями',
      numberOfManuscripts: 'Количество отображаемых статей на странице',
      hourManuscriptsImported: 'Время ежедневного импорта статей (UTC)',
      daysManuscriptRemain:
        'Срок, в течение которого статья находится в разделе “Рукописи”, прежде чем будет автоматически помещена в архив',
      importFromSematic:
        "Импортировать рукописи из Sematic Scholar не позже, чем через 'x' дней",
      newSubmissionActionVisisble:
        'Функция “Добавить новую рукопись”, доступная в разделе “Рукописи”',
      displayActionToSelect:
        'Отображать в разделе "Рукописи” функцию "Выбрать" для рукописей на рецензирование',
      importManuscriptsManually:
        'Импортировать рукописи вручную с помощью функции "Обновить"',
      'Control panel': 'Панель управления',
      'Display manuscript short id': 'Показывать краткий ID статей',
      'Reviewers can see submitted reviews':
        'Рецензентам доступен просмотр отправленных рецензий',
      'Authors can see individual peer reviews':
        'Авторам доступен просмотр отдельных рецензий',
      'Control pages visible to editors':
        'Редакторам доступен просмотр разделов управления',
      Team: 'Исполнители',
      Submission: 'Подача',
      allowToSubmitNewVersion:
        'Авторам доступна возможность подачи новой версии статьи в любое время',
      'Review page': 'Раздел "Рецензирование"',
      showSummary: 'Рецензентам доступен просмотр раздела “Решение”',
      Publishing: 'Публикация',
      Hypothesis: 'Гипотезы',
      'Hypothesis API key': 'API-ключ для гипотез',
      'Hypothesis group id': 'ID группы гипотез',
      shouldAllowTagging: 'Применить теги гипотез в форме подачи',
      reverseFieldOrder:
        'Изменить порядок полей форм "Подача/Решение", публикуемых в гипотезе',
      Crossref: 'Crossref',
      journalName: 'Название журнала',
      journalAbbreviatedName: 'Сокращенное название',
      journalHomepage: 'Домашняя страница',
      crossrefLogin: 'Имя пользователя Crossref',
      crossrefPassword: 'Пароль Crossref',
      crossrefRegistrant: 'ID в Crossref',
      crossrefDepositorName: 'Имя владельца',
      crossrefDepositorEmail: 'Email владельца',
      publicationType: 'Выбрать тип публикации',
      doiPrefix: 'Префикс DOI в Crossref',
      publishedArticleLocationPrefix:
        'Размещение опубликованной статьи в Crossref',
      licenseUrl: 'URL-адрес лицензии на публикацию',
      useSandbox: 'Опубликовать в Crossref sandbox',
      Webhook: 'Вебхук',
      webhookUrl: 'URL-адрес',
      webhookToken: 'Токен',
      webhookRef: 'Ссылка',
      'Task Manager': 'Диспетчер задач',
      teamTimezone:
        'Установить часовой пояс в Диспетчере для сроков выполнения задач',
      Emails: 'Почта',
      gmailAuthEmail: 'Адрес электронной почты Gmail',
      gmailSenderEmail: 'Адрес электронной почты Gmail отправителя',
      gmailAuthPassword: 'Пароль Gmail',
      eventNotification: 'Уведомления',
      reviewRejectedEmailTemplate: 'Рецензент отклонил приглашение',
      reviewerInvitationPrimaryEmailTemplate: 'Приглашение рецензента',
      evaluationCompleteEmailTemplate: 'Рецензия отправлена',
      submissionConfirmationEmailTemplate: 'Рукопись подана',
      alertUnreadMessageDigestTemplate: 'Непрочитанные сообщения в обсуждении',
      Reports: 'Аналитика',
      reportShowInMenu:
        'Администратору и редактору доступен раздел “Аналитика”',
      'User Management': 'Управление пользователями',
      userIsAdmin:
        'Всем пользователям назначаются роли администратора и редактора',
      kotahiApiTokens: 'Токены Kotahi API',
      Submit: 'Подтвердить',
      article: 'Статья',
      'peer review': 'Рецензия',
      showTabs: {
        Team: 'Исполнители',
        Decision: 'Решение',
        'Manuscript text': 'Текст статьи',
        Metadata: 'Основные данные',
        'Tasks & Notifications': 'Задачи и уведомления',
      },
      crossrefRetrievalEmail:
        'Адрес электронной почты, который будет использоваться для поиска цитат',
      crossrefSearchResultCount:
        'Количество результатов, возвращаемых при поиске по цитированию',
      crossrefStyleName: 'Выбор стиля форматирования цитат',
      crossrefLocaleName: 'Выберите язык для цитирования',
      production: {
        Production: 'Редактирование',
        'Email to use for citation search':
          'Электронная почта для поиска цитирований',
        'Number of results to return from citation search':
          'Количество результатов для возврата из поиска цитирований',
        'Select style formatting for citations':
          'Выберите формат стиля для цитирования',
        apa: 'Американская психологическая ассоциация (APA)',
        cmos: 'Руководство стиля Чикаго (CMOS)',
        cse: 'Совет редакторов науки (CSE)',
        'Select locale for citations': 'Выберите локаль для цитирования',
      },
    },
    reportsPage: {
      Reports: 'Аналитика',
      Show: 'Показать',
      activityForManuscripts: 'для статей, полученных',
      activityForManuscriptsTooltip: `Данные о рукописях, поступивших в систему в указанные даты
                <br />
                Границы дат установлены в полночь по всемирному времени.`,
      'Editors workflow': 'Активность редакторов',
      'All manuscripts': 'Все рукописи',
      Submitted: 'Подано',
      'Editor assigned': 'Назначен редактор',
      'Decision complete': 'Принято решение',
      Accepted: 'Рукопись принята',
      Published: 'Опубликовано',
      'Reviewers workflow': 'Активность рецензентов',
      'Reviewer invited': 'Рецензент приглашен',
      'Invite accepted': 'На рецензировании',
      'Review completed': 'Рецензирование завершено',
      'Manuscripts published today': 'Опубликовано сегодня',
      'From midnight local time': 'Начиная с полуночи по местному времени',
      Average: 'Среднее значение',
      'Manuscripts in progress': 'В процессе обработки',
      'Based on the selected date range': 'Исходя из выбранного диапазона дат',
      reviwingAndEditing:
        'Сроки рецензирования и редактирования отдельных рукописей',
      'Days spent on': 'Количество дней на',
      daysSpentReview: 'рецензирование,',
      daysSpentPostreview: 'публикацию',
      'or incomplete': '(или еще не завершено)',
      'Submission date': 'Дата подачи рукописи',
      summaryInfo: {
        'Average time to publish': 'Среднее время до публикации',
        roundedDays: '{{days}} день',
        roundedDays_few: '{{days}} дня',
        roundedDays_many: '{{days}} дней',
        'From submission to published':
          'От получения рукописи до ее публикации',
        'Average time to review': 'Среднее время до рецензирования',
        awaitingRevision: 'Ожидает исправлений',
        unassigned: 'Рукопись не обработана',
        reviewed: 'Рецензирование завершено',
      },
      reportTypes: {
        Summmary: 'Все данные',
        Manuscript: 'Только рукописи',
        Editor: 'Редакторов',
        Reviewer: 'Рецензентов',
        Author: 'Авторов',
      },
      tables: {
        manuscripts: {
          'Manuscript number': 'Номер статьи',
          'Entry date': 'Дата получения',
          Title: 'Название',
          Author: 'Автор',
          Editors: 'Редакторы',
          Reviewers: 'Рецензенты',
          Status: 'Статус',
          'Published date': 'Дата публикации',
          reviewDuration: 'Рецензия заняла <strong>{{durations}}</strong> день',
          reviewDuration_few:
            'Рецензия заняла <strong>{{durations}}</strong> дня',
          reviewDuration_many:
            'Рецензия заняла <strong>{{durations}}</strong> дней',
          prevReviewDuration:
            'Предыдущая рецензия заняла <strong>{{durations}}</strong> день',
          prevReviewDuration_few:
            'Предыдущая рецензия заняла <strong>{{durations}}</strong> дня',
          prevReviewDuration_many:
            'Предыдущая рецензия заняла <strong>{{durations}}</strong> дней',
          reviewDurations:
            'Рецензии заняли <strong>{{durations}}</strong> дней',
          prevReviewDurations:
            'Предыдущие рецензии заняли <strong>{{durations}}</strong> дней',
        },
        editor: {
          'Editor name': 'Редактор',
          'Manuscripts assigned': 'Назначено рукописей',
          'Assigned for review': 'Назначено для рецензирования',
          Revised: 'Проверено',
          Rejected: 'Отклонено',
          Accepted: 'Принято',
          Published: 'Опубликовано',
        },
        reviewer: {
          'Reviewer name': 'Рецензент',
          'Review invites': 'Предложено на рецензирование',
          'Invites declined': 'Отклонено предложений',
          'Reviews completed': 'Завершено',
          'Average review duration': 'Среднее время рецензирования',
          'Recommended to accept': 'Рекомендовано к принятию',
          'Recommended to revise': 'Рекомендовано к исправлению',
          'Recommended to reject': 'Рекомендовано отклонить',
          days: '{{days}} день',
          days_few: '{{days}} дня',
          days_many: '{{days}} дней',
        },
        author: {
          'Author name': 'Автор',
          revisionRequested: 'Требуются исправления',
        },
      },
    },
    emailtemplatesPage: {
      'Email Templates': 'Шаблоны писем',
      Subject: 'Тема письма',
      CC: 'Копия письма',
      Body: 'Текст',
    },
    loginPage: {
      kotahiUses:
        'Мы используем ORCID <0>icon</0> для идентификации Авторов и сотрудников редакции.',
      'Login with ORCID': 'Войти с ORCID',
      'Register with ORCID': 'Зарегистрироваться с ORCID',
    },
    frontPage: {
      recent: 'Последние публикации {{brandName}}',
      Dashboard: 'Панель управления',
      Login: 'Вход',
    },
    declineReviewPage: {
      youHaveDeclined: 'Вы отклонили приглашение принять участие в рецензии.',
      reason: 'Пожалуйста, поделитесь причиной отклонения приглашения ниже.',
      messageHere: 'Ваш ответ',
      dontWantContact: 'Я не хочу, чтобы со мной снова связывались',
      'Submit Feedback': 'Отправить',
      'Decline Invitation': 'Отклонить приглашение',
      thanks: 'Благодарим Вас за ответ.',
    },
    reviewPreviewPage: {
      Summary: 'Содержание',
      Back: 'Назад',
    },
    sharedReviews: {
      'Other Reviews': 'Другие отзывы',
    },
    linkExpiredPage:
      'Срок действия этой ссылки-приглашения истек. Пожалуйста, свяжитесь с администратором для отправки нового приглашения.',
    waxEditor: {
      'Front matter tools': 'Инструменты титульной части',
      'Back matter tools': 'Инструменты заключения',
      'Front matter': 'Титульная часть',
      'Change to front matter': 'Изменить на титульную часть',
      'Funding Group': 'Финансирование',
      'Funding source': 'Источник финансирования',
      'Change to funding source': 'Изменить на источник финансирования',
      'Award ID': 'Номер гранта',
      'Change to award ID': 'Изменить на номер гранта',
      'Funding statement': 'Положение о финансировании',
      'Change to funding statement': 'Изменить на положение о финансировании',
      Keywords: 'Ключевые слова',
      Keyword: 'Ключевое слово',
      'Change to keyword': 'Изменить на ключевое слово',
      'Keyword list': 'Список ключевых слов',
      'Change to keyword list': 'Изменить на список ключевых слов',
      Abstract: 'Аннотация',
      'Change to abstract': 'Изменить на аннотацию',
      Appendices: 'Приложения',
      Appendix: 'Приложение',
      'Change to appendix': 'Изменить на приложение',
      Acknowledgements: 'Благодарности',
      'Change to acknowledgements': 'Изменить на благодарности',
      Glossary: 'Глоссарий',
      'Glossary section': 'Раздел глоссария',
      'Change to glossary section': 'Сменить на раздел глоссария',
      'Glossary term': 'Термин из глоссария',
      'Change to glossary term': 'Изменить на термин из глоссария',
      'Glossary item': 'Элемент глоссария',
      'Change to glossary item': 'Изменить на элемент глоссария',
      Citations: 'Ссылки',
      'Reference list': 'Список литературы',
      'Change to reference list': 'Изменить на список литературы',
      Reference: 'Литература',
      'Change to reference': 'Изменить на литературу',
    },
    manuscriptSubmit: {
      'Current version': 'Текущая версия',
      'Edit submission info': 'Редактировать информацию о поданной статье',
      'Manuscript text': 'Текст статьи',
      'Submit your research object': 'Представьте Ваш объект исследования',
      'Errors in your submission': 'Ошибки в вашей рукописи',
      errorsList:
        'В Вашей рукописи есть ошибки, пожалуйста, исправьте следующее:',
      Submit: 'Отправить',
      or: 'или',
      'get back to your submission': 'Вернуться назад',
      'Submit a new version': 'Отправить новую версию',
      submitVersionButton: 'Отправить новую версию',
      canModify:
        'Вы можете изменить и повторно отправить новую версию своей рукописи.',
      askedToRevise: `Вам было предложено <strong>пересмотреть</strong> свою рукопись: ознакомьтесь,пожалуйста, с приведенными ниже рецензиями и решением. Вы можете внести изменения и повторно отправить новый вариант рукописи. `,
      'Submitted info': 'Отправленная информация',
      Reviews: 'Рецензии',
      'No reviews to show': 'Нет рецензий для показа.',
      'No completed reviews': 'Нет завершенных рецензий.',
      Metadata: 'Основные данные',
    },
    chat: {
      'Your message here...': 'Введите сообщение',
      Send: 'Отправить',
      noDiscussion:
        'По данной рукописи обсуждений еще нет. Чтобы начать беседу, введите сообщение ниже.',
      'Unread messages': 'Непрочитанные сообщения',
      'Admin discussion': 'Обсуждение',
      'Group Manager discussion': 'Обсуждение',
      'Show admin discussion': 'Показать обсуждение',
      'Show group manager discussion': 'Показать обсуждение',
      'Hide Chat': 'Скрыть чат',
      'Discussion with author': 'Чат с Автором',
      'Editorial discussion': 'Чат редакции',
      edit: 'Редактировать',
      delete: 'Удалить',
      Edited: 'Отредактировано',
      'Open video chat': 'Открыть видеочат',
      Formatting: 'Форматирование',
      'Hide formatting': 'Скрыть форматирование',
    },
    taskManager: {
      list: {
        'Add your first task...': 'Добавьте вашу первую задачу...',
        'Add a new task': 'Добавить новую задачу',
        Title: 'Название',
        Assignee: 'Исполнитель',
        'Duration in days': 'Срок в днях',
        'Duration/Due Date': 'Срок/дата исполнения',
        'Unregistered User': 'Незарегистрированный пользователь',
        'User Roles': 'Роли пользователя',
        'Registered Users': 'Зарегистрированные пользователи',
        userRoles: {
          Reviewer: 'Рецензент',
          Editor: 'Редактор',
          Author: 'Автор',
        },
      },
      task: {
        durationDaysNone: 'Нет',
        selectAssignee: 'Выбрать',
        'Give your task a name': 'Дайте название задаче',
        Edit: 'Редактировать',
        Delete: 'Удалить',
        'Click to mark as done': 'Нажмите, чтобы отметить как выполнено',
        statuses: {
          Paused: 'На паузе',
          Pause: 'Пауза',
          'In progress': 'В работе',
          Continue: 'Продолжить',
          Done: 'Выполнено',
          Start: 'Начать',
        },
        unregisteredUser: {
          Email: 'Email',
          Name: 'ФИО',
        },
      },
    },
    tasksPage: {
      'Task Template Builder': 'Конструктор типовых задач',
    },
    usersTable: {
      Users: 'Пользователи',
      Name: 'Имя',
      Created: 'Зарегистрирован',
      'Last Online': 'Последняя активность',
      Roles: 'Назначенные роли',
      Delete: 'Удалить',
      Yes: 'Да',
      Cancel: 'Отменить',
      None: 'Нет',
    },
    modals: {
      inviteDeclined: {
        'Invitation Decline': `{{name}} - Приглашение отклонено`,
        Declined: 'Отказ: {{dateString}}',
        Reviewer: 'Рецензент:',
        Status: 'Статус',
        declinedBadge: 'Отклонено',
        'Opted Out': 'Отказ',
        'Declined Reason': 'Причина отказа',
        'No reason provided': 'Причина не указана.',
      },
      reviewReport: {
        'Review Report': `Отчет о рецензировании от {{name}}`,
        'Last Updated': 'Последнее обновление: {{dateString}}',
        Reviewer: 'Рецензент:',
        Status: 'Статус',
        reviewNotCompleted: `Рецензирование не завершено`,
        Delete: 'Удалить',
        Shared: 'Показывать другим рецензентам',
        Recommendation: 'Рекомендации',
        'Hide Review': 'Скрыть',
        'Hide Reviewer Name': 'Скрыть имя рецензента',
      },
      inviteReviewer: {
        'Invite Reviewer': 'Пригласить рецензента',
        Shared: 'Показывать другим рецензентам',
        'Email Notification': 'Уведомления по Email',
        Cancel: 'Отменить',
        Invite: 'Пригласить',
      },
      deleteReviewer: {
        'Delete this reviewer': 'Удалить рецензента?',
        Reviewer: 'Рецензент:',
        Ok: 'Да',
        Cancel: 'Отменить',
      },
      taskDelete: {
        permanentlyDelete: 'Удалить задачу навсегда?',
        Ok: 'Удалить',
        Cancel: 'Отменить',
      },
      taskEdit: {
        'Task details': 'Детали задачи',
        'Task title': 'Название задачи',
        'Task description': 'Описание задания',
        Save: 'Сохранить',
        'Give your task a name': 'Дайте название задаче',
        Assignee: 'Исполнитель',
        'Due date': 'Дата исполнения',
        'Duration in days': 'Срок исполнения',
        'Add Notification Recipient': 'Добавить получателя уведомления',
        Recipient: 'Получатель',
        'Select a recipient': 'Выбрать получателя',
        'Select email template': 'Выбрать шаблон письма',
        'Send notification': 'Отправить уведомление',
        Send: 'Отправить',
        days: 'дней',
        before: 'до',
        after: 'после',
        'due date': 'даты исполнения',
        'Send Now': 'Отправить сейчас',
        'Show all notifications sent':
          'Показать все отправленные уведомления ({{count}})',
        'Hide all notifications sent':
          'Скрыть все отправленные уведомления ({{count}})',
      },
      deleteField: {
        'Permanently delete this field': 'Удалить навсегда это поле?',
        Ok: 'Да',
        Cancel: 'Отменить',
      },
      deleteForm: {
        'Permanently delete this form': 'Удалить навсегда эту форму?',
        Ok: 'Да',
        Cancel: 'Отменить',
      },
      assignUserRole: {
        text:
          'Вы хотите назначить роль <strong>{{role}}</strong> для пользователя {{user}}?',
      },
      removeUserRole: {
        text:
          'Вы хотите удалить роль <strong>{{role}}</strong> для пользователя {{user}}?',
      },
      deleteUser: {
        'Permanently delete user': 'Удалить пользователя {{userName}}?',
        Delete: 'Удалить',
        Cancel: 'Отмена',
      },
      cmsPageDelete: {
        Cancel: 'Отменить',
        Delete: 'Удалить',
        permanentlyDelete: 'Удалить страницу {{pageName}}?',
      },
      deleteMessage: {
        'Are you sure you want to delete this message?':
          'Вы уверены, что хотите удалить это сообщение?',
      },
      editMessage: {
        'Edit message': 'Редактировать сообщение',
        save: 'Сохранить',
        cancel: 'Отменить',
      },
      publishError: {
        'Some targets failed to publish':
          'Не удалось опубликовать некоторые цели.',
        'Publishing error': 'Ошибка публикации',
      },
    },
    newSubmission: {
      'New submission': 'Загрузить новую статью',
      'Submission created': 'Загружено',
      'Upload Manuscript': 'Загрузить рукопись',
      dragNDrop: 'Перетащите файлы сюда',
      acceptedFiletypes: 'Принимаемые форматы файлов: pdf,epub,zip,docx,latex',
      converting:
        'Ваша рукопись преобразуется в редактируемую версию. Это может занять некоторое время.',
      'Submit a URL instead': 'Вставить URL-адрес вместо файла',
      errorUploading: 'Файл не распознан',
    },
    formBuilder: {
      'New Form': 'Новая форма',
      'Create Form': 'Создать форму',
      'Update Form': 'Обновить форму',
      'Form purpose identifier': 'Идентификатор назначения формы',
      'Form Name': 'Название формы',
      Description: 'Описание',
      'Submit on Popup': 'Всплывающее окно при подаче',
      submitYes: 'Да',
      submitNo: 'Нет',
      'Popup Title': 'Название всплывающего окна',
      'Field Properties': 'Свойства поля',
      'Field type': 'Тип поля',
      'Field title': 'Название поля',
      'Field name': 'Название (Внутреннее название поля)',
      'Field placeholder': 'Замещающий текст',
      internalNameDescription:
        'Используйте  выражение "Укажите название поля", либо один из следующих вариантов: "Название" для названия рукописи, "Аннотация" для аннотации, "Название файла" для дополнительных файлов, или "Визуальная аннотация" для визуальной аннотации, или "Файл рукописи" для файла рукописи.',
      'Field description': 'Описание поля',
      'Field options': 'Параметры поля',
      'Field shortDescription':
        'Краткое название (необязательно: используется в сокращенных списках)',
      'Field validate': 'Параметры проверки',
      'Field hideFromReviewers': 'Скрыть от рецензентов?',
      'Field hideFromAuthors': 'Скрыть от Авторов?',
      'Field permitPublishing':
        'Показать при совместном использовании или публикации?',
      'Field publishingTag': 'Тег Hypothesis',
      'FieldDescription publishingTag':
        'Вы можете указать тег для использования при публикации этого поля в виде аннотации Hypothesis.',
      'Label to display': 'Значение для отображения',
      'Color label': 'Выбрать цвет',
      'Enter label': 'Введите значение',
      'Internal name': 'Значение',
      'Enter name': 'Введите значение',
      'Add another option': 'Добавить другой параметр',
      'Delete this option': 'Убрать этот параметр',
      validateInputPlaceholder: 'Выбрать',
      'Field parse': 'Парсинг',
      'Field format': 'Особое оформление',
      'Field doiValidation': 'Утвердить в качестве DOI?',
      'Field doiUniqueSuffixValidation':
        'Утвердить в качестве суффикса DOI с гарантией его уникальности?',
      'Update Field': 'Обновить поле',
      'Correct invalid values before updating':
        'Исправьте неверные значения перед обновлением',
      'Add Field': 'Добавить поле',
      'New Field': 'Новое поле',
      'Field inline': 'Строчное поле',
      'Field sectioncss': 'Дополнительное стили CSS',
      typeOptions: {
        Select: 'Выбор',
        ManuscriptFile: 'Файл рукописи',
        SupplementaryFiles: 'Вложения',
        VisualAbstract: 'Одиночное изображение',
        AuthorsInput: 'Список участников',
        LinksInput: 'Список ссылок (URI)',
        AbstractEditor: 'Форматированный текст',
        TextField: 'Текст',
        CheckboxGroup: 'Флажки',
        RadioGroup: 'Переключатели',
        undefined: '',
        ThreadedDiscussion: 'Обсуждение',
      },
      submission: {
        title: 'Настройка формы подачи',
      },
      review: {
        title: 'Конструктор формы рецензирования',
      },
      decision: {
        title: 'Конструктор формы решения',
      },
    },
    fields: {
      hideFromReviewers: {
        true: 'Да',
        false: 'Нет',
      },
      hideFromAuthors: {
        true: 'Да',
        false: 'Нет',
      },
      permitPublishing: {
        false: 'Никогда',
        true:
          'Для конкретного случая (Редактор принимает решение при совместном использовании/публикации)',
        always: 'Всегда',
      },
      validate: {
        required: 'Обязательно',
        minChars: 'Минимум знаков',
        maxChars: 'Максимум знаков',
        minSize: 'Минимальное количество позиций',
        labels: {
          minChars: 'Минимальное количество знаков',
          maxChars: 'Максимальное количество знаков',
          minSize: 'Минимальное количество позиций',
        },
      },
      parse: {
        false: 'Не выбрано',
        split: 'Разделить запятыми',
      },
      format: {
        false: 'Не выбрано',
        join: 'Объединить при помощи запятых',
      },
      doiValidation: {
        true: 'Да',
        false: 'Нет',
      },
      doiUniqueSuffixValidation: {
        true: 'Да',
        false: 'Нет',
      },
      inline: {
        true: 'Да',
        false: 'Нет',
      },
    },
  },
}

export default ru
