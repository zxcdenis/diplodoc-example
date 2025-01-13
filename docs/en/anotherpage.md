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
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <header>
        <h1>Добро пожаловать на мою страницу</h1>
        <p>Здесь вы найдете интересную информацию.</p>
    </header>
    <main>
        <div class="cards-container">
            <div class="card">
                <img src="https://via.placeholder.com/200x150/4a90e2/ffffff?text=Картинка+1" alt="Картинка 1">
                <h3>Заголовок карточки 1</h3>
                <p>Краткое описание карточки 1.</p>
                <a href="#">Читать дальше</a>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/200x150/50e3c2/ffffff?text=Картинка+2" alt="Картинка 2">
                <h3>Заголовок карточки 2</h3>
                <p>Краткое описание карточки 2.</p>
                <a href="#">Читать дальше</a>
            </div>
             <div class="card">
                <img src="https://via.placeholder.com/200x150/ffb647/ffffff?text=Картинка+3" alt="Картинка 3">
                <h3>Заголовок карточки 3</h3>
                <p>Краткое описание карточки 3.</p>
                <a href="#">Читать дальше</a>
            </div>
        </div>
    </main>
    <footer>
        <p>&copy; 2024 Моя Страница</p>
    </footer>
</body>
</html>


