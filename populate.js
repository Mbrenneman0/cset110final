/*
This script is to be used to populate the portfolio page
with examples of my work. Using this script will make it easier to add
new projects to the portfolio.
*/

/*
Notes:
could fine grain personal access tokens allow specific access without need to keep
token private?

look into .env files and .gitignore

documentation to look into:
https://github.com/octokit/octokit.js/#usage
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#types-of-personal-access-tokens
https://docs.github.com/en/actions/tutorials/authenticate-with-github_token

*/

//oktokit is a package that allows easier use of the github API
import {Octokit} from "https://esm.sh/octokit";
let oktokit = Octokit;

let htmlTemplate =
`<h3></h3>
<div class="img-box">
    <img src="" alt="">
    <div class="example-hover">
        <p class="description"></p>
        <div class="example-links">
            <a href="" target="_blank">View Page</a>
            <a href="" target="_blank">Github Repo</a>
        </div>
    </div>
</div>`;

let container = document.getElementsByClassName("container")[0];

let projects = []; //this array will contain objects of the example class

const resizeObserver = new ResizeObserver(() => {resize()});
resizeObserver.observe(container);

class Example{
    constructor(url, pagesUrl, name, description, imgUrl)
    {
        //init object attributes from constructor params
        // this.url = url;
        // this.name = name;
        // this.description = description;
        // this.imgUrl = imgUrl;

        //init DOM
        this.element = document.createElement("div");
        this.element.classList.add("example-box");
        this.element.innerHTML = htmlTemplate;

        this.nameField = this.element.getElementsByTagName("h3")[0];
        this.nameField.innerText = name;

        this.imgUrl = this.element.getElementsByTagName("img")[0];
        this.imgUrl.src = imgUrl;

        this.descriptionField = this.element.getElementsByClassName("description")[0];
        this.descriptionField.innerText = description;

        this.repoLink = this.element.getElementsByTagName("a")[1];
        this.repoLink.href = url;

        this.pagesLink = this.element.getElementsByTagName("a")[0];
        this.pagesLink.href = pagesUrl;

        container.appendChild(this.element);
        
        console.log(this.element);

    }
}

function resize()
{
    //sets the number of columns based on width and number of projects
    let maxCols = Math.floor(container.clientWidth/420);
    let cols = maxCols;
    for(let i = maxCols; i > 0; i--)
    {
        let remainder = projects.length%i;
        if (remainder === 0 || remainder >= i/2) //last row will always be at least half the available columns
        {
            cols = i;
            break;
        }
    }

    let gridTemplateString = ""
    for(let i = 0; i < cols; i++)
    {
        gridTemplateString += " auto"
    }
    gridTemplateString = gridTemplateString.trimStart(); //removes first space
    container.style.gridTemplateColumns = gridTemplateString;

}

projects.push(new Example(
    "https://github.com/Mbrenneman0/BreakoutJS",
    "https://mbrenneman0.github.io/BreakoutJS/",
    "BreakoutJS",
    "A remake of the classic 1976 game, Breakout. Uses CanvasRenderingContext2d to draw and animate the game in the canvas element.",
    "images/Breakout.JPG"
));

projects.push(new Example(
    "https://github.com/Mbrenneman0/HeadfirstWebsite",
    "https://mbrenneman0.github.io/HeadfirstWebsite/",
    "Omnifood",
    "This is a clone of the Omnifood example website completed in the CSET 110 class.",
    "images/Omnifood.JPG"
));

projects.push(new Example(
    "https://github.com/Mbrenneman0/CSET115Final",
    "https://mbrenneman0.github.io/CSET115Final/",
    "TicTacToe",
    "A classic game of Tic Tac Toe, demonstrating the use of a two dimensional array initialized from the Document Object Model. Also features a cool hover effect using a mouse listener in javascript.",
    "images/TicTacToe.JPG"
));

projects.push(new Example(
    "https://github.com/Mbrenneman0/cset105final",
    "https://mbrenneman0.github.io/cset105final/",
    "Grocery List",
    "A classic game of Tic Tac Toe, demonstrating the use of a two dimensional array initialized from the Document Object Model. Also features a cool hover effect using a mouse listener in javascript.",
    "images/GroceryList.JPG"
));

projects.push(new Example(
    "https://github.com/Mbrenneman0/cset110weeklyassignment1",
    "https://mbrenneman0.github.io/cset110weeklyassignment1/",
    "Mustachio",
    "A classic game of Tic Tac Toe, demonstrating the use of a two dimensional array initialized from the Document Object Model. Also features a cool hover effect using a mouse listener in javascript.",
    "images/Mustachio.JPG"
));

projects.push(new Example(
    "https://github.com/Mbrenneman0/cset105final2",
    "https://mbrenneman0.github.io/cset105final2/",
    "Quiz",
    "A classic game of Tic Tac Toe, demonstrating the use of a two dimensional array initialized from the Document Object Model. Also features a cool hover effect using a mouse listener in javascript.",
    "images/quiz.JPG"
));

//after all Example objects are created, set the number of grid columns:
resize();
