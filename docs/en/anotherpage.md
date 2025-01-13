# Simple documentation project with YFM


## Project Structure
Basic project contains few config files and pages with actual content. Both config files and markdown linked into the following structure:


```
input-folder
|-- .yfm (config file for whole project)
|-- toc.yaml (table of content)
|-- presets.yaml (presets for vairables)
|-- index.yaml (index page)
|-- pages (Content pages)
    |-- faq.md
    |-- how-to.md
|-- _assets (directory with pictures)
    |-- image1.png
    |-- image2.png
|-- _includes (directory for reusable content)
    |-- faq_shared_block.md
```
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Красивая Страница</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Добро пожаловать</h1>
            <p>Простой и элегантный дизайн</p>
        </div>
    </header>
    <main>
        <div class="container">
            <section class="feature-section">
                <h2>Основные особенности</h2>
                <div class="features">
                    <div class="feature">
                        <h3>Чистый дизайн</h3>
                        <p>Минималистичная и понятная структура.</p>
                    </div>
                    <div class="feature">
                        <h3>Адаптивность</h3>
                        <p>Отлично выглядит на любых устройствах.</p>
                    </div>
                    <div class="feature">
                        <h3>Простота</h3>
                        <p>Легко использовать и модифицировать.</p>
                    </div>
                </div>
            </section>
            <section class="content-section">
                <h2>Основное содержание</h2>
                 <p>
                    Здесь вы можете разместить основной контент вашего сайта. Это может быть текст, списки, таблицы и т.д. 
                    Я постарался сделать дизайн легким и понятным. Основной упор идет на типографику и чистые линии.
                    <br>
                     Постарался сделать разметку логичной и легкой для понимания.
                </p>
            </section>
        </div>
    </main>
</body>
</html>



