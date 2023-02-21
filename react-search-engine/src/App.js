import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style/Style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wikiSearchReturnValues: [],
      wikiSearchTerms: ''
    }
  }

  useWikiSearchEngine = (e) => {
    e.preventDefault();

    this.setState({
      wikiSearchReturnValues: []
    });

    const pointerToThis = this;

    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
      action: 'query',
      list: 'search',
      srsearch: this.state.WikiSearchTerms,
      format: 'json'
    };

    url = url + '?origin=*';
    Object.keys(params).forEach((key) => {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(function (response) {
        //console.log(response)
        for (var key in response.query.search) {
          pointerToThis.state.wikiSearchReturnValues.push({
            queryResultPageFullURL: 'no link',
            queryResultPageID: response.query.search[key].pageid,
            queryResultPageTitle: response.query.search[key].title,
            queryResultPageSnippet: response.query.search[key].snippet
          })
        }
      })
      .then(
        function (response) {
          for (var key2 in pointerToThis.state.wikiSearchReturnValues) {
            // console.log(pointerToThis.state.wikiSearchReturnValues);
            let page = pointerToThis.state.wikiSearchReturnValues[key2];
            let pageID = page.queryResultPageID;
            let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

            fetch(urlForRetrievingPageURLByPageID)
              .then(
                function (response) {
                  return response.json();
                }
              )
              .then(
                function (response) {
                  page.queryResultPageFullURL = response.query.pages[pageID].fullurl;

                  pointerToThis.forceUpdate();
                })
          }
        }
      )
      .catch(function (error) { console.log(error); });

  }
  changeWikiSearchTerms = (e) => {
    this.setState({
      WikiSearchTerms: e.target.value
    });
  }
  render() {
    let wikiSearchResults = [];
    for (var key3 in this.state.wikiSearchReturnValues) {
      wikiSearchResults.push(
        <div className="searchResultDiv" key={key3}>
          <span className="link"><a href={this.state.wikiSearchReturnValues[key3].queryResultPageFullURL}>{this.state.wikiSearchReturnValues[key3].queryResultPageFullURL}</a></span>
          <p className="article-title"><a href={this.state.wikiSearchReturnValues[key3].queryResultPageFullURL}>{this.state.wikiSearchReturnValues[key3].queryResultPageTitle}</a></p>
          <p className="description" dangerouslySetInnerHTML={{ __html: this.state.wikiSearchReturnValues[key3].queryResultPageSnippet }}></p>
        </div>
      )
    }
    return (
      <>
        <div className="container">
          <div className="title">
            <h1>Wiki Search Engine</h1>
          </div>
          <form className="search-container">
            <input type='text' onChange={this.changeWikiSearchTerms} value={this.state.WikiSearchTerms || ''} placeholder='Search Wiki Articles'></input>
            <button type="submit" onClick={this.useWikiSearchEngine}><FontAwesomeIcon className="search-icon" icon={faSearch} /></button>
          </form>
          <div className="search-results">
            {wikiSearchResults}
          </div>
        </div>
      </>
    );
  }

}

export default App;
