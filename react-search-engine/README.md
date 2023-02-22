# Developing an Wiki Search Engine :mag_right:

![image](https://user-images.githubusercontent.com/80405885/220572240-c7efc20a-489c-4450-80eb-7a344cfed978.png)

## Using the API:Search from the MediaWiki

To perform an advanced seach for wiki pages by title or context text, I used the HTTP GET request Method. The GET method is applied from a particular source, it is used to get specific variables derived from a group. 

In this code I used the React Class Component to track state and lifecycle on a React component. The component `App` includes the `extends React.Component` statement, in this statement it inheritancing to the React.Component and it gives our component acces to the React.Component's functions.
The `contructor()` function in the `App` component is called so that it gets initiated. The props are passed to the constructor. Including the `super()` statement executes the parent constructor function in this case the `React.Component`. In the "state" object is where we store the values beloging to the component in this case the wikiSearchReturnValues and the wikiSearchTerms. 
![image](https://user-images.githubusercontent.com/80405885/220573746-5120d491-f4bb-4848-92c6-8b22f171c6e5.png)

The component also uses the `render()` methos so that it can return HTML.
![image](https://user-images.githubusercontent.com/80405885/220574386-6fc0efd6-0cc7-4446-9c2f-5cf973b53b2e.png)

First thing first we needed to create an form so we can search by an input of type text the words that we are looking for in the wiki search database. So in `return()` method I added an title, a form with an input and a button which calls the react event of `onClick` and also the event of `onChange`.
![image](https://user-images.githubusercontent.com/80405885/220595106-5621d75c-3bfb-4821-b89e-2e7c0e963cb5.png)

The function changeWikiSearchTerms gives the `WikiSearchTerms` object the target value so when the search button is clicked the its function search in the wiki search backend page titles or content matching the value of `WikiSearchTerms` then fetches the urls that are a possibly match giving the title of the page, the url and a snippet of the page.
![image](https://user-images.githubusercontent.com/80405885/220597528-98cef55c-0188-4e6d-9a98-4efa4b270803.png)


