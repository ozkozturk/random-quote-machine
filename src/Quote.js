import React from "react";
import "./App.css"

class Quote extends React.Component {
    state = {
        quotes: [],
        index: 0
    }

    componentDidMount() {
        this.getQuotes();
    }

    getQuotes = () => {
        let url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({quotes: data.quotes}, this.getRandomIndex))
    }

    getRandomIndex = () => {
        const { quotes } = this.state
        if(quotes.length > 0) {
            const index = Math.floor(Math.random() * quotes.length)
            this.setState({index})
        }
    }


    render() {
        const { index, quotes} = this.state;
        const quote = quotes[index];
        const sendTweet = () => {
            window.open(`https://twitter.com/intent/tweet?text=+"${quote.quote}"-(${quote.author})`)
        }
        return(
            <div className="container">
                <div>
                    {
                        quote &&
                        <blockquote className="quote-box">
                            <p>{quote.quote}</p>
                            <footer>
                                <cite className="author">-{quote.author}</cite>
                            </footer>
                        </blockquote>
                    }
                </div>
                <div className="buttons">
                    <button onClick={this.getRandomIndex}>quote</button>
                    <button onClick={sendTweet}> tweet</button>
                </div>
            </div>
        )
    }
}

export default Quote;
