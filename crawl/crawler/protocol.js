const { Builder, By, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options().setChromeBinaryPath('./chrome-win64/chrome.exe');

async function protocol_cralwer() {
    let driver = await new Builder().forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build()

    let data = [];
    try {
        await driver.get('https://www.protocol.ai/blog/')
        const articles = await driver.findElements(By.css('article'));
        for (let i = 1; i <= articles.length; i++) {
            let articleData = {};

            // 标题
            const titleElement = await driver.findElement(By.xpath(`//article[${i}]/div[2]/header/a/h1`));
            await driver.executeScript("arguments[0].scrollIntoView();", titleElement);
            let title = await titleElement.getText();
            while (title == "") {
                await driver.sleep(1000);
                const titleElement = await driver.findElement(By.xpath(`//article[${i}]/div[2]/header/a/h1`));
                title = await titleElement.getText();
            }
            articleData.title = title;
            // console.log('Title:', title);

            // url
            const link = await driver.findElement(By.xpath(`//article[${i}]/div[2]/header/a`)).getAttribute('href');
            // console.log('Href:', link);
            articleData.url = link;


            // 时间
            const timeElement = await driver.findElement(By.xpath(`//article[${i}]/div[2]/div/div/div[2]/time`));
            const time = await timeElement.getAttribute('datetime');
            articleData.time = time;
            // console.log('Time:', time);

            // 描述
            let description = null
            try {
                const descriptionElement = await driver.findElement(By.xpath(`//article[${i}]/div[2]/footer/p`));
                description = await descriptionElement.getText();
            } catch (err) {
                if (err.name === 'NoSuchElementError') {
                    description = "None"
                } else {
                    console.error('出现其他错误:', err);
                }
            }
            // console.log('Description:', description);
            articleData.description = description;

            data.push(articleData);
        }

        for (const ele of data) {
            ele.body = await getArticleBodyText(driver, ele.url);
        }

        
    } finally {
        await driver.quit()
    }
    return data;
}


async function getArticleBodyText(driver, url) {
    try {
        await driver.get(url);

        const articleBodyElement = await driver.wait(
            until.elementLocated(By.css('div[itemprop="articleBody"]')),
            10000
        );

        const articleBodyHTML = await articleBodyElement.getAttribute('innerHTML');

        const formattedText = articleBodyHTML
            .replace(/<p[^>]*>/g, '\n')
            .replace(/<\/p>/g, '')
            .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
            .replace(/<strong[^>]*>(.*?)<\/strong>/g, '$1')
            .replace(/<br\s*\/?>/g, '\n')
            .replace(/<[^>]+>/g, '')
            .replace(/ \(opens new window\)/g, '');
            // todo: Optimize text format 

        // console.log('articleBody:', formattedText);
        return formattedText;

    } catch (err) {
        console.error('出现错误:', err);
    }
}


module.exports = {
    protocol_cralwer
}