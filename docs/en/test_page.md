---
metadata:
    - name: keywords
      content: 'справка к50'
---

# Добро пожаловать на мою пробную страницу Markdown!

Эта страница создана для демонстрации возможностей языка разметки Markdown. Здесь вы найдете примеры различных элементов, которые можно использовать для форматирования текста.

## Заголовки

Заголовки обозначаются с помощью символа `#`. Чем больше `#`, тем меньше заголовок.

### Заголовок третьего уровня

#### Заголовок четвертого уровня

##### Заголовок пятого уровня

###### Заголовок шестого уровня

## Текстввв

Обычный текст просто пишется, как есть.

Для **выделения текста жирным шрифтом** используйте двойные звездочки `**текст**` или двойные подчеркивания `__текст__`.

Для *выделения текста курсивом* используйте одинарные звездочки `*текст*` или одинарные подчеркивания `_текст_`.

Для ~~зачеркивания текста~~ используйте двойные тильды `~~текст~~`.

Комбинируйте выделения: ***жирный курсив***

## Списки

### Неупорядоченные списки

Неупорядоченные списки можно создавать с помощью символов `*`, `-` или `+`.

*   Первый элемент
*   Второй элемент
    *   Вложенный элемент
*   Третий элемент

### Упорядоченные списки

Упорядоченные списки создаются с помощью цифр, за которыми следует точка.

1.  Первый элемент
2.  Второй элемент
    1.  Вложенный элемент
3.  Третий элемент

## Ссылки

[Ссылка на Google](https://www.google.com)

Вы также можете добавить подсказку при наведении курсора:

[Ссылка на Wikipedia](https://www.wikipedia.org "Перейти на Wikipedia")


{% cut "Name" %} 

Контент ката вывывывыывы

{#acnhor-cut}

{% endcut %}


## Заголовок

<ul class="custom-counter">
    <li>Текст
        <ul>
            <li>Вложенный текст</li>
        </ul>
    </li>
</ul>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Пример кастомной нумерации</title>
  <style>
    /* Сбрасываем стандартные стили для списка */
    .custom-counter {
      counter-reset: item;
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    /* Элементы первого уровня */
    .custom-counter > li {
      counter-increment: item;
      position: relative;
      padding-left: 3em; /* отступ для размещения нумерации */
      margin-bottom: 0.5em;
    }
    .custom-counter > li::before {
      content: "1." counter(item) ". ";
      position: absolute;
      left: 0;
      width: 3em;
    }
    /* Вложенные списки */
    .custom-counter li ul {
      counter-reset: subitem; /* сбрасываем счётчик вложенных пунктов */
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    /* Элементы вложенного списка */
    .custom-counter li ul > li {
      counter-increment: subitem;
      position: relative;
      padding-left: 4em;
      margin-bottom: 0.5em;
    }
    .custom-counter li ul > li::before {
      /* Используем родительский счётчик (item) и вложенный (subitem) */
      content: "1." counter(item) "." counter(subitem) ". ";
      position: absolute;
      left: 0;
      width: 4em;
    }
  </style>
</head>
<body>
  <!-- Заголовок, оформленный отдельно -->
  <h2>Заголовок</h2>
  
  <!-- Список с кастомной нумерацией -->
  <ul class="custom-counter">
    <li>Текст
      <ul>
        <li>Вложенный текст</li>
      </ul>
    </li>
  </ul>
</body>
</html>



## Изображения

Вставьте изображения с помощью синтаксиса: `![альтернативный текст](путь_к_изображению)`.
Например: `![Markdown logo](https://www.markdownguide.org/assets/images/tux.png)`

![Markdown logo](https://www.markdownguide.org/assets/images/tux.png)

## Цитаты

Цитаты оформляются с помощью символа `>`.

> Это цитата, которую можно использовать для выделения важной информации.
>
> Она может быть многострочной.

## Блоки кода

```
def hello_world():
  print("Hello, World!")

hello_world()
```

[Ссылка на кат](#acnhor-cut)


{% cut "Кааааат" %}

а
аваааааа

{% endcut %}

1. **Меню** 
 
    Быстрый доступ к статистике, информации о представителях, ко всем инструментам и дополнительным материалам для рекламных кампаний, собранных в библиотеке.<!--Если нужно увеличить таблицу, меню можно свернуть, нажав стрелку внизу.--> 
 
1. **Данные о кампаниях** 
 
    Все нужные и важные показатели отображаются на одной странице. 
 
1. **Поиск и фильтрация** 
 
    Позволяют быстро найти все объявления с определенным словом, даже если они из разных групп или кампаний, или найти все кампании с определенным количеством кликов. Например, на вкладке **Объявления** в&nbsp;фильтре выберите **Параметры** → **Изображение** → **= Включено**, чтобы показать только объявления с&nbsp;изображением. 
 
    Чтобы увидеть медийные кампании, вместо **Кампании с оплатой за клики** выберите **Кампании с оплатой за&nbsp;показы**. 
 
    <!-- Text --> 
 
1. **Вкладки навигации** 
 
    Вы можете переключаться между объектами: кампаниями, группами, объявлениями и ключевыми фразами. Сначала отметьте нужные кампании, затем перейдите на нужную вкладку, например, **Группы**. Там будут только группы выбранных кампаний. 
 
    Аналогично вы можете перейти из кампаний сразу к объявлениям или из группы к ключевым фразам и&nbsp;обратно. 
 
1. **Настройка внешнего вида таблицы** 
 
    Вы можете добавлять и удалять столбцы с данными на страницах кампаний, групп, объявлений, фраз. Нажмите ! и отметьте нужные показатели. Чтобы изменить порядок расположения данных, передвиньте показатель на нужное место. 
 
    {% if locale=='ru' %} 
<!--     #| 
 
    || 
    ![](../_assets/video-icon.png) 
    | 
    Новый интерфейс Директа. Внешний вид 
 
    {% cut "Посмотреть видео" %} 
 
    @[youtube](https://www.youtube.com/embed/weu9V30ax78) 
 
    {% endcut %} 
 
    || 
 
    |# --> 
    {% endif %} 
 
1. **Действия** 
 
    Действия помогут, если нужно выполнить какие-то операции с выбранными объектами: изменить статус или&nbsp;параметры, перейти в Мастер отчетов.

{% list tabs %}

- Вкладка 1

  {% list tabs %}

  - Подвкладка 1.1

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful Minimal Page</title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <header>
        <div class="container">
        <h1>My Beautiful Page</h1>
        <p>Design. Simplicity. Elegance.</p>
        </div>
    </header>
    <main>
        <section class="about">
        <div class="container">
            <h2>About Us</h2>
            <p>
            Welcome to our beautiful website, where we value simplicity and elegance.
            We are dedicated to creating unique and functional designs that stand out.
            </p>
        </div>
        </section>
        <section class="services">
        <div class="container">
            <h2>Our Services</h2>
            <div class="service-cards">
            <div class="card">
                <h3>Design</h3>
                <p>Creating stunning and intuitive user experiences.</p>
            </div>
            <div class="card">
                <h3>Development</h3>
                <p>Building fast, responsive, and scalable websites.</p>
            </div>
            <div class="card">
                <h3>Consulting</h3>
                <p>Helping you turn your ideas into reality.</p>
            </div>
            </div>
        </div>
        </section>
    </main>
    </body>
    </html>

    {% list tabs %}

    - Элемент 1.1.1
    - Элемент 1.1.2

    {% endlist %}

  - Подвкладка 1.2

    {% list tabs %}

    - Элемент 1.2.1
    - Элемент 1.2.2

    {% endlist %}

  {% endlist %}

- Вкладка 2

  {% list tabs %}

  - Подвкладка 2.1

    {% list tabs %}

    - Элемент 2.1.1
    - Элемент 2.1.2

    {% endlist %}

  {% endlist %}

{% endlist %}


Текст перед переменной {{ my_var }}

Переменная app_name {{ app_name }}

1. Какой-то текст{style="color:red"}
2. <p style="color: green">Еще какой-то текст</p> текст екст
3. **text**{style="color:purple; font-weight: normal;"} text

