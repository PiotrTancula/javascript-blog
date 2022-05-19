// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

{

  const titleClickHandler = function (event) {

    event.preventDefault();

    const clickedElement = this;

    console.log('Link was clicked!');

    /*  [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(' .titles a.active');

    for (let activeLink of activeLinks) {

      activeLink.classList.remove('active');

    }

    /*  [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');


    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll(' .post.active');

    for (let activeArticle of activeArticles) {

      activeArticle.classList.remove('active');

    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';


    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      console.log(articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      console.log(articleTitle);

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log(linkHTML);

      /* insert link into titleList */

      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /* insert link into HTML variable */

      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    console.log(links);

    for (let link of links) {

      link.addEventListener('click', titleClickHandler);

    }
  }

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag  + '</a></li>';

        /* add generated code to HTML variable */

        html = html + linkHTML + ' ';

      }

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

      articleTagsWrapper.innerHTML = html;

      console.log(articleTagsWrapper);

      /* END LOOP: for every article: */

    }

  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log( 'clickedElement ' + this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('constant href which reads the href attribute of the clicked element ' + href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    console.log('constant tag which extracts the tag from the href constant ' + tag);

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    console.log(activeTags);

    /* START LOOP: for each active tag link */

    for (let tag of activeTags) {

      /* remove class active */

      tag.classList.remove('active');

    }

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagHref = document.querySelectorAll('[href="' + href + '"]');

    console.log(tagHref);

    /* START LOOP: for each found tag link */

    for (let tag of tagHref) {

      /* add class active */

      tag.classList.add('active');

    }

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags() {

    /* find all links to tags */

    const links = '.list-horizontal li a';

    const allLinksToTags = document.querySelectorAll(links);

    console.log(allLinksToTags);

    /* START LOOP: for each link */

    for (let link of allLinksToTags) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

    }

    /* END LOOP: for each link */

  }

  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors(){

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);

      const authorTags = article.getAttribute('data-author');

      let html = '';

      const linkHTML = '<a href="#author-' + authorTags + '">' + authorTags  + '</a>';

      html = html + linkHTML;

      articleAuthorSelector.innerHTML = html;

    }
  }

  generateAuthors();

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event) {

    event.preventDefault();

    const clickedElement = this;

    console.log(clickedElement);

    const href = clickedElement.getAttribute('href');

    const allAuthors = document.querySelectorAll(optArticleAuthorSelector);

    for (let author of allAuthors) {

      author.classList.remove('active');

    }

    clickedElement.classList.add('active');

    console.log(clickedElement);

    const activeAuthor = document.querySelectorAll('a.active[href^="#author-"]');

    const authorInfo = href.replace('#author-', '');

    console.log(authorInfo);

    generateTitleLinks('[data-author="' + authorInfo + '"]');

  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors() {

    const authors = '.post-author a';

    const authorsList = document.querySelectorAll(authors);

    for (let author of authorsList) {
      author.addEventListener('click', authorClickHandler);

    }

  }

  addClickListenersToAuthors();

}