const { Builder, By, until } = require('selenium-webdriver');
const moment = require('moment');

const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options().setChromeBinaryPath('./chrome-win64/chrome.exe')
    // .addArguments('--lang=en')
    ;

async function ethereum_cralwer() {
    let driver = await new Builder().forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build()

    let data = [];
    try {
        await driver.get('https://blog.ethereum.org/')
        let isNextPage = true;
    
        while (isNextPage) {
            const articles = await driver.findElements(By.xpath('//div[@class="css-4sxuq5"]/*'));
            for (const article of articles) {
                let articleData = {};

                // 标题
                const titleElement = await article.findElement(By.className('chakra-link css-qbxetx'));
                await driver.executeScript("arguments[0].scrollIntoView();", titleElement);
                let title = await titleElement.getText();
                while (title == "") {
                    await driver.sleep(1000);
                    const titleElement = await article.findElement(By.className('chakra-link css-qbxetx'));
                    title = await titleElement.getText();
                }
                articleData.title = title;
                // console.log('Title:', title);

                // url
                const link = await titleElement.getAttribute('href');
                // console.log('Href:', link);
                articleData.url = link;


                // 时间
                const timeElement = await article.findElement(By.className('chakra-text css-1uh66ln'));
                const time = await timeElement.getText();
                // format time
                // const formattedEnglishDate = dayjs(englishDate).format('YYYY-MM-DD');
                const formattedChineseDate = moment(time, 'YYYY年M月D日').format('YYYY-MM-DD');
                articleData.time = formattedChineseDate;
                // console.log('Time:', formattedDate);

                // 描述
                let description = null
                try {
                    const descriptionElement = await driver.findElement(By.className('chakra-text css-jxubeb'));
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

            // next page
            try {
                const nextButtonElement = await driver.findElements(By.xpath('//div[@class="css-rw1w99"]/*'));
                const isDisplayed = await nextButtonElement[1].isDisplayed(); 
                if (isDisplayed) {
                    await nextButtonElement[1].click();
                }else{
                    isNextPage = false;
                }
            }catch (err) {
                if (err.name === 'NoSuchElementError') {
                    isNextPage = false;
                }else {
                    console.error('出现其他错误:', err);
                }
            }

        }

        // console.log("");
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
            until.elementLocated(By.css('article')),
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

        // console.log('articleBody:', formattedText);
        return formattedText;

    } catch (err) {
        console.error('出现错误:', err);
    }
}


module.exports = {
    ethereum_cralwer
}
