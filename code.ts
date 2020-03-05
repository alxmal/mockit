// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".

const maleNames: string[] = [
    'Ираклий Кулибаба',
    'Болеслав Воронов',
    'Василий Уваров',
    'Зигмунд Бобылёв',
    'Давид Киселёв',
    'Чарльз Цушко',
    'Лукиллиан Корнилов',
    'Ленар Шашков',
    'Борис Зимин',
    'Эдуард Петровский',
    'Фёдор Терентьев',
    'Харитон Авдеев',
    'Иннокентий Алексеев',
    'Герман Хитрук',
    'Родион Костин',
    'Елисей Милославский',
    'Лука Александров',
    'Еремей Майборода',
    'Фёдор Сысоев',
    'Алексей Кириленко',
    'Филипп Давыдов',
    'Орест Данилов',
    'Даниил Алексеев',
    'Цефас Шевченко',
    'Чеслав Семочко',
    'Елисей Федотов',
    'Яромир Саксаганский',
    'Алексей Фокин',
    'Чеслав Яковенко'
];

const femaleNames: string[] = [
    'Жаклин Кудряшова',
    'Флорентина Комиссарова',
    'Шанетта Голубева',
    'Инна Потапова',
    'Розалина Зайцева',
    'Божена Исакова',
    'Мария Шарова',
    'Генриетта Саксаганска',
    'Жасмин Григорьева',
    'Ева Соболева',
    'Элина Павленко',
    'Светлана Кузьмина',
    'Нина Логинова',
    'Рада Острожска',
    'Евгения Шарапова',
    'Нонна Фомина',
    'Нелли Марочко',
    'Шарлота Кириллова',
    'Чечилия Тимошенко',
    'Фаина Корнейчук',
    'Дарья Родионова',
    'Жанна Медведева',
    'Яся Белякова',
    'Харитина Волкова',
    'Розалина Толочко',
    'Лидия Тарасова',
    'Прасковья Овчинникова',
    'Екатерина Смирнова',
    'Клавдия Власова',
    'Олеся Мельникова'
];

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(names: string[]): string {
    let max = names.length;
    const randomIndex = randomInt(0, max);
    return names[randomIndex];
}

figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
    if (msg.type === 'generate-name') {
        const selectedNodes = figma.currentPage.selection;
        if (selectedNodes) {
            for (let node of selectedNodes) {
                if (node.type === 'TEXT') {
                    let isFontsMissing = node.hasMissingFont;
                    let font = node.fontName;
                    await figma.loadFontAsync(node.fontName as FontName);
                    msg.options.gender === 'male'
                        ? (node.characters = getRandomName(maleNames))
                        : (node.characters = getRandomName(femaleNames));
                }
            }
        }
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};
