// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML)
}

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

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {

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

      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

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

  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags) {

    const params = {

      min: 99999,
      max: 0

    };

    for (let tag in tags) {

      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }

      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }

      console.log(tag + ' is used ' + tags[tag] + ' times');

    }

    return params;

  }

  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;

  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */

    let allTags = {};

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

        // const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to HTML variable */

        html = html + linkHTML + ' ';

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      }

      /* END LOOP: for each tag */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);

      /* insert HTML of all the links into the tags wrapper */

      articleTagsWrapper.innerHTML = html;

      console.log(articleTagsWrapper);

      /* END LOOP: for every article: */

      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);

      /* [NEW] create variable for all links HTML code */
      // let allTagsHTML = '';
      const allTagsData = {tags: []};

      /* [NEW] START LOOP: for each tag in allTags: */
      for (let tag in allTags) {

        const tagLinkHTML = '<li><a href="#tag-' + tag + '" class=' + calculateTagClass(allTags[tag], tagsParams) + '> ' + ' ' + tag + ' ' + ' </a></li>';
        console.log('tagLinkHTML:', tagLinkHTML);

        /* [NEW] generate code of a link and add it to allTagsHTML */
        // allTagsHTML += tagLinkHTML;
        // '<li><a href="#tag-' + tag + ' class="tagLinkHTML" ">' + tag  + '</a></li>' + ' (' + allTags[tag] + ') ';

        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      // tagList.innerHTML = allTagsHTML;
      tagList.innerHTML = templates.tagCloudLink(allTagsData);

    }

  }

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    console.log('clickedElement ' + this);

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

    const links = 'a[href^="#tag-"]';

    const allLinksToTags = document.querySelectorAll(links);

    console.log(allLinksToTags);

    /* START LOOP: for each link */

    for (let link of allLinksToTags) {

      /* add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

    }

    /* END LOOP: for each link */

  }

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors() {

    const allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);

      const authorTags = article.getAttribute('data-author');

      // const linkHTML = '<a href="#author-' + authorTags + '">' + authorTags + '</a>';

      const linkHTMLData = {id: authorTags, title: authorTags};
      const linkHTML = templates.authorLink(linkHTMLData);

      articleAuthorSelector.innerHTML = linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allAuthors[authorTags]) {
        /* [NEW] add tag to allTags object */
        allAuthors[authorTags] = 1;
      } else {
        allAuthors[authorTags]++;
      }
      console.log(allAuthors);

      const authorlist = document.querySelector(optAuthorsListSelector);

      const authorParams = calculateTagsParams(allAuthors);

      console.log('tagsParams:', authorParams);

      let allAuthorsHTML = '';

      for (let author in allAuthors) {

        const authorLinkHTML = '<li><a href="#author-' + author + '" class=' + calculateTagClass(allAuthors[author], authorParams) + '> ' + ' ' + author + ' '  + allAuthors[author]+ ' </a></li>';

        console.log('tagLinkHTML:', authorLinkHTML);

        console.log(authorLinkHTML);

        /* [NEW] generate code of a link and add it to allTagsHTML */
        allAuthorsHTML += authorLinkHTML;
        // '<li><a href="#tag-' + tag + ' class="tagLinkHTML" ">' + tag  + '</a></li>' + ' (' + allTags[tag] + ') ';
        console.log(allAuthorsHTML);

      }

      authorlist.innerHTML = allAuthorsHTML;
    }
  }

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

    const relatedAuthors = document.querySelectorAll('a[href="' + href + '"]');
    for (const author of relatedAuthors) {
      author.classList.add('active');
    }

    const authorInfo = href.replace('#author-', '');

    console.log(authorInfo);

    generateTitleLinks('[data-author="' + authorInfo + '"]');

  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors() {

    const authors = 'a[href^="#author-"]';

    const authorsList = document.querySelectorAll(authors);

    for (let author of authorsList) {
      author.addEventListener('click', authorClickHandler);

    }

  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors';



  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();



}