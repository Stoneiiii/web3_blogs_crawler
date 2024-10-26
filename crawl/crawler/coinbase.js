const { Builder, By, until } = require('selenium-webdriver');
const moment = require('moment');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options().setChromeBinaryPath('./chrome-win64/chrome.exe');

async function coinbase_cralwer() {
    let driver = await new Builder().forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build()
    let data = [];
    try {
        await driver.get('https://www.coinbase.com/en-sg/blog/landing');

        const waitElement = async (driver, locator) => {
            await driver.wait(until.elementLocated(locator), 10000);
            return await driver.findElement(locator);
        };
        let i = 0;
        // while (true) {
        while (i <= 3) {
            i = i + 1;
            let showmoreBtn = null;
            try {
                const locator = By.xpath('//div[@class="cds-flex-f1g67tkn sc-20f7f24c-0 hjmyyp"]/*');
                showmoreBtn = await waitElement(driver, locator);
                if (showmoreBtn == null || showmoreBtn.length == 0) {
                    break;
                }
            } catch (err) {
                break;
            }
            await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });", showmoreBtn);
            await driver.actions().move({ origin: showmoreBtn }).click().perform();
            await driver.sleep(1000);

            const articles = await driver.findElements(By.xpath('//div[@class="cds-flex-f1g67tkn sc-20f7f24c-0 sc-3dcf3304-0 eIJqhn iWfdgn"]'));

            console.log("当前长度：",articles.length)
        }
        console.log("finish!");
        const articles = await driver.findElements(By.xpath('//div[@class="cds-flex-f1g67tkn sc-20f7f24c-0 sc-3dcf3304-0 eIJqhn iWfdgn"]'));
        console.log("总共blogs数量：",articles.length);
        await driver.sleep(2000);
        
        for (const article of articles) {
            let articleData = {};

            // 标题
            const titleElement = await article.findElement(By.className('sc-26c31d48-0 sc-3dcf3304-4 eVjZRR fgCSlP'));
            await driver.executeScript("arguments[0].scrollIntoView();", titleElement);
            let title = await titleElement.getText();
            while (title == "") {
                await driver.sleep(1000);
                const titleElement = await article.findElement(By.className('sc-26c31d48-0 sc-3dcf3304-4 eVjZRR fgCSlP'));
                title = await titleElement.getText();
            }
            articleData.title = title;
            // console.log('Title:', title);

            // url
            const link = await article.findElement(By.css("a")).getAttribute('href');
            // console.log('Href:', link);
            articleData.url = link;


            // 时间
            const timeElement = await article.findElement(By.className('sc-26c31d48-0 kwFuzM'));
            const time = await timeElement.getText();
            const formattedChineseDate = moment(time, 'YYYY年M月D日').format('YYYY-MM-DD');
            articleData.time = formattedChineseDate;
            // console.log('Time:', formattedChineseDate);

            data.push(articleData);
        }

        for (const ele of data) {
            let temp = await getArticleBodyText(driver, ele.url);
            await driver.sleep(2000);
            ele.body = temp[0];
            ele.description = temp[1];
        }

    } finally {
        await driver.quit()
    }
    return data;
}


async function getArticleBodyText(driver, url) {
    try {
        let returnVal = [];
        await driver.get(url);

        // 正文
        const articleBodyElement = await driver.wait(
            until.elementLocated(By.className('cds-flex-f1g67tkn sc-20f7f24c-0 sc-95b4f52b-0 hOuJOx blaivw')),
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
            .replace(/&nbsp;/g, "")
            .replace(/ \(opens new window\)/g, '');
        // todo: Optimize text format 

        // console.log('articleBody:', formattedText);
        returnVal.push(formattedText);


        // 描述
        let description = null
        try {
            const descriptionElement = await driver.findElement(By.className('sc-26c31d48-0 sc-987b6e8c-0 jjgOiT eKLrGK'));
            description = await descriptionElement.getText();
        } catch (err) {
            if (err.name === 'NoSuchElementError') {
                description = "None"
            } else {
                console.error('出现其他错误:', err);
            }
        }
        // console.log('Description:', description);
        returnVal.push(description);

        return returnVal;

    } catch (err) {
        console.error('出现错误:', err);
    }
}


module.exports = {
    coinbase_cralwer
}
