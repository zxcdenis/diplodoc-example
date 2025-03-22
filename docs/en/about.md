# Basic "About page"

This is an example for basic documentation project.
It contains simple structure with couple of pages (this page, another page) and nested sub-section.

Diplodoc provides you with a unique name how this project can be reached on https://diplodoc.com like
"https://common---gh-aje0e4eg9hffg001r5e5.viewer.diplodoc.com/en/"

If you would like to extend your project - please refer to YFM Project Organization guide

All changes for this project can be done within you public github repository called "diplodoc-example/docs".
To make changes and apply them:

- go to your repo under "diplodoc-example/docs"
- make changes for project structure or content
- commit & push into your repository
- go to "Actions" tab for docs repository
- run "Release" action and wait till completion
- done, updates should be available for everyone.

In case if you would like to make proxy from your own domain to this Documentation - please Contact Us - we will support you accordingly till appropriate documentation creation.

[Ссылка на кат](test_page.md#acnhor-cut)
   
## Key Actions Summary

| Action | Description |
|---|---|
| **Navigate** | Go to the diplodoc-example/docs repository on GitHub. |
| **Edit** | Make changes to project structure or content within the repository. |
| **Commit & Push** | Commit your changes and push them to the repository. |
| **Run Workflow** | Navigate to the "Actions" tab and run the "Release" workflow. |
| **Wait** | Wait for the workflow to complete. |
| **View** | Your updates are now available to everyone. |
`

**Что я добавил:**

*   **Заголовок "Key Actions Summary":**  Я добавил заголовок для таблицы, чтобы пояснить, о чём она.
*   **Таблица:** Я создал таблицу в Markdown, содержащую два столбца: "Action" (действие) и "Description" (описание).
*   **Содержание таблицы:** Я заполнил таблицу ключевыми действиями из вашего текста, чтобы их было проще воспринимать.

**Как это будет выглядеть:**

При отображении в Markdown-редакторе или на сайте, который поддерживает Markdown, эта таблица будет выглядеть структурированно и аккуратно, облегчая восприятие информации.

**Почему таблица полезна:**

*   **Структурирует информацию:** Таблица помогает сгруппировать и организовать информацию о ключевых действиях.
*   **Улучшает читаемость:** Табличный формат делает информацию более понятной и легкой для восприятия.
*   **Выделяет ключевые моменты:** Таблица акцентирует внимание на важных шагах в процессе.

Теперь этот документ будет более наглядным и удобным для использования.


# Справочник API

С помощью API можно отправить URL одной или нескольких страниц сайта в&nbsp;Яндекс с&nbsp;поддержкой протокола IndexNow.

## Отправка одной страницы

{% list tabs %}

- Формат запроса {#request-format}

  
  GET https://yandex.com/indexnow
    ? url=<String>
    & key=<String>
    & [keyLocation=<String>]
  ```
  
  #|
  ||
  **Параметр**
  |
  **Тип**
  |
  **Обязательно**
  |
  **Описание**
  ||
  ||
  `url`
  |
  String
  |
  Да
  |
  Адрес страницы, данные о которой вы хотите передавать. Должен соответствовать стандарту [RFC3986](https://www.ietf.org/rfc/rfc3986.txt).
  ||
  ||
  `key`
  |
  String
  |
  Да
  |
  [Ключ для подтверждения прав на сайт]. При отправке запроса поисковая система сверяет это значение с&nbsp;содержимым файла.
  ||
  ||
  `keyLocation` {#key-loc}
  |
  String
  |
  Нет
  |
  Указание на расположение файла с ключом, если он размещен не&nbsp;[в&nbsp;корневой директории сайта](key.md#how-to).
  ||
  |#


- Формат ответа {#response-format}

  HTTP-код 200 OK

  ```javascript
  content-type: application/json
  ```

  Другие коды ответа: {#another-cods}

  #|
  ||
  **Код**
  |
  **Причина**
  | 
  **Описание**
  ||
  ||
  202
  | 
  Accepted
  |
  Новый ключ ожидает проверки. Если вы уверены в корректности ключа, подождите некоторое время и отправьте несколько других адресов. 
  
  Если код изменился на 200 OK, ключ проверен и адреса переданы. 
  
  Если остался код 202, ключ не добавлен в&nbsp;базу после проверки. Подождите&nbsp;еще. 
  ||
  ||
  403
  |
  Invalid key
  |
  Ключ не удалось загрузить или он не&nbsp;подходит к&nbsp;указанным в&nbsp;запросе адресам.
  ||
  ||
  405
  |
  Method not allowed
  |
  Методы GET и POST поддерживаются.
  ||
  ||
  422
  |
  Invalid key location
  | 
  Параметр `keyLocation` указан неверно.
  ||
  ||
  422
  |
  Invalid url
  |
  В запросе указан неверный URL-адрес или переданный ключ не&nbsp;подходит для его обработки.
  ||
  ||
  422
  |
  Key must be at least 8 characters
  |
  Ключ включает в себя меньше 8 символов.
  ||
  ||
  422
  |
  Key must be no longer than 128 characters
  |
  Ключ включает в себя больше 128 символов.
  ||
  ||
  422
  |
  Key must consist of a-Z0-9 or '-'
  |
  Ключ содержит неподходящие символы.
  ||
  ||
  422
  |
  No key provided
  |
  В запросе отсутствует параметр `key`.
  ||
  ||
  422
  |
  No url provided
  |
  В запросе отсутствует параметр `url`.
  ||
  ||
  429
  |
  Too Many Requests
  |
  Превышено количество запросов для одного IP-адреса.
  ||
  |#


{% endlist %}


## Отправка нескольких страниц


{% list tabs %}

- Формат запроса {#request-format}

  ```
  POST https://yandex.com/indexnow
  ```
  
  
  Чтобы передавать информацию о&nbsp;нескольких страницах, используйте формат&nbsp;JSON:

  ```javascript
  POST /indexnow HTTP/1.1
  Content-Type: application/json; charset=utf-8
  Content-Length: 286
  Host: yandex.com
  {
    "host": "www.example.com",
    "key": "EdD8dkmdNLlxREi2LkhJjYOH2kyQbJqM3cBKT5fX",
    "keyLocation": "https://www.example.com/myIndexNowKey63638.html",
    "urlList": [
      "https://www.example.com/url1",
      "https://www.example.com/folder/url2",
      "https://www.example.com/url3"
    ]
  }
  ```


  #|
  ||
  **Параметр**
  |
  **Тип**
  |
  **Обязательно**
  |
  **Описание**
  ||
  ||
  `host`
  |
  String
  |
  Да
  |
  Адрес вашего сайта.
  ||
  ||
  `key`
  |
  String
  |
  Да
  |
  Ключ для подтверждения прав на сайт.
  ||
  ||
  `keyLocation`
  |
  String
  |
  Нет
  |
  Указание на расположение ключа, если он размещен не&nbsp;.
  ||
  ||
  `urlList`
  |
  Array
  |
  Да
  |
  Содержит адреса страниц (String), данные о&nbsp;которых вы хотите передавать.
  
  В одном запросе можно передавать до&nbsp;10&nbsp;000 адресов.
  ||
  |#


- Формат ответа {#response-format}

  HTTP-код 200&nbsp;OK

  ```javascript
  content-type: application/json
  ```

  Другие коды ответа:


  #|
  ||
  **Код**
  |
  **Причина**
  |
  **Описание**
  ||
  ||
  202
  |
  Accepted
  |
  Новый ключ ожидает
п
роверки. Если вы уверены в корректности ключа, подождите некоторое время и отправьте несколько других адресов. 
  
  Если код изменился на 200&nbsp;OK, ключ проверен и адреса переданы. 
  
  Если остался код 202, ключ не был добавлен в базу после проверки. Подждите еще.
  ||
  ||
  400
  |
  Invalid params
  |
  В теле запроса переданы некорректные параметры.
  ||
  ||
  403
  | 
  Invalid key
  |
  Ключ не удалось загрузить или он не&nbsp;подходит к&nbsp;указанным в&nbsp;запросе адресам.
  ||
  ||
  405
  |
  Method not allowed
  |
  Методы GET и POST поддерживаются.
  ||
  ||
  422
  |
  Invalid key location
  |
  Параметр `keyLocation` указан неверно.
  ||
  ||
  422
  |
  Invalid url
  |
  В&nbsp;запросе указан неверный URL-адрес или переданный ключ не&nbsp;подходит для&nbsp;его обработки.
  ||
  ||
  422
  |
  Key must be at least 8 characters
  | 
  Ключ включает в&nbsp;себя меньше 8&nbsp;символов.
  ||
  ||
  422
  |
  Key must be no longer than 128 characters
  |
  Ключ включает в&nbsp;себя больше 128&nbsp;символов.
  ||
  ||
  422
  |
  Key must consist of a-Z0-9 or '-'
  |
  Ключ содержит неподходящие символы.
  ||
  ||
  422
  |
  No host provided
  |
  В запросе отсутствует параметр `host`.
  ||
  ||
  422
  |
  No key provided
  |
  В запросе отсутствует параметр `key`.
  ||
  ||
  422
  |
  No more than 10000 urls allowed
  |
  Параметр `urlList` содержит больше 10&nbsp;000 URL-адресов.
  ||
  ||
  422
  |
  No url provided
  |
  В запросе отсутствует параметр `url`.
  ||
  ||
  422
  |
  Url list has to be an array
  |
  Отсутствует параметр `urlList` или он не&nbsp;является массивом.
  ||
  ||
  422
  |
  Url list cannot be empty
  |
  Передан пустой параметр `urlList`.
  ||
  ||
  422
  |
  Url has to be an array of string
  |
  Параметр `urlList` должен содержать данные типа String.
  ||
  ||
  429
  |
  Too Many Requests
  |
  Превышено количество запросов для&nbsp;одного IP-адреса.
  ||
  |#


{% endlist %}

## Вопросы и ответы {#qanda}


{% cut "Насколько часто можно передавать запросы?" %}

Ограничений на количество запросов нет. Вы можете регулировать их частоту — Яндекс использует алгоритмы, которые препятствуют слишком большому потоку запросов.

{% endcut %}

{% cut "Можно ли отправлять один и тот же URL-адрес несколько раз в&nbsp;день?" %}

Мы не&nbsp;рекомендуем оправлять слишком часто один и тот же адрес. Если это необходимо, делайте паузу между отправками 10&nbsp;минут. 

{% endcut %}

{% cut "Можно ли отправлять страницы с HTTP-кодом 404 через API?" %}

Да, можно использовать IndexNow, чтобы сообщать о&nbsp;страницах с&nbsp;кодом 404 или 410.

{% endcut %}

{% cut "Можно ли передавать страницы с HTTP-кодом 301 или 302 (перенаправление)?" %}

Да, можно передавать адреса с&nbsp;информацией о&nbsp;редиректе или других изменениях.

{% endcut %}

<div class="cut-button">

{% cut "Написать в службу поддержки" %}

 
Если у вас есть вопрос о&nbsp;работе инструмента, выберите подходящий вариант:

{% list tabs accordion %}

- В поиск не попадают проиндексированные страницы

  Посмотрите рекомендации в разделе .
  
- Нужно удалить проиндексированные страницы из поиска

  Воспользуйтесь рекомендациями, как ). Поисковая выдача обновляется в&nbsp;течение двух&nbsp;недель.  
  

{% endlist %}








<!--[*url]: Адрес страницы, данные о которой вы хотите передавать. Должен соответствовать стандарту [RFC3986](https://www.ietf.org/rfc/rfc3986.txt).