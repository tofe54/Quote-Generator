import React, { useState, useEffect } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from "@fortawesome/free-brands-svg-icons"
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons"

let quoteUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"



function App() {

  const [quote, setQuote] = useState("What goes around, comes around")
  const [author, setAuthor] = useState("Justin Timberlake")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsed = await response.json()
    setQuotesArray(parsed.quotes)
    console.log(parsed)
  }

  useEffect(() => {
    fetchQuotes(quoteUrl)
  }, [quoteUrl])

  function getRandomQuote() {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }



  return (
    <div className="App">
      <header className="App-header" style={
        { backgroundColor: accentColor, color: accentColor }}>
        <div id='quote-box' style={
          { color: accentColor }}>
          <p id='text'>
           <span id='quote-icon'><FontAwesomeIcon icon={faQuoteLeft} /></span> {quote}"
          </p>
          <p id='author'>- <em>{author}</em></p>
          <div className="button">
            <a style={
              { backgroundColor: accentColor }} href={`https://twitter.com/intent/tweet?text=${quote}-${author}&hashtags=quote`} id='tweet-quote'>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon> </a>
            <button id='new-quote' onClick={() => getRandomQuote()} style={
              { backgroundColor: accentColor }}>New Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

