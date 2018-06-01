import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Vengeful } from './single/Venge';
import { gifRender, download } from './single/gifRender';

const templates = [
    require('./config/wangjingze.json'),
    require('./config/weisuoyuwei.json'),
    require('./config/lianliankan.json'),
    require('./config/dagong.json'),
]

const Vendors = 'https://cdn.jsdelivr.net/gh/wincerchan/Meme-generator@0.2/public';

const messages = [
    <p>服务器在国外，加载图片在晚上高峰期可能会很慢；</p>,
    <p>由于下载采用了<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="noopener noreferrer" target="_blank">Blob</a> 协议，故仅新版 Chrome、Firefox、Opera、Edge 支持下载，其它浏览器请点击预览后右击保存。</p>
]

class Title extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title = 'Meme · ' + this.props.title;
    }
    render() {
        return null;
    }
}

templates.forEach((element, i) => {
    templates[i].component = () => (
        <section className="section container" >
            <Title title={element.name} />
            <h1 className="title">Meme</h1>
            <p className="subtitle">——{element.name}</p>
            <hr />
            <div id="contentWjz">
                <img src={Vendors + element.gif} id="gifMeme" alt="meme" />
            </div>
            <div id="success-notification" className="notification is-success">
                <button className="delete" onClick={() => document.querySelector('#success-notification').style.display = 'none'}></button>
                生成完毕。
            </div>
            {
                element.config.map((sentence, index) =>
                    <div className="field" key={index}>
                        <label className="label">第 {index + 1} 句：</label>
                        <div className="control">
                            <input className="input is-info sentence" type="text" placeholder={sentence.default} />
                        </div>
                    </div>)
            }
            <div className="button-width">
                <button id="preveiw" className="button is-link is-outlined" onClick={() => gifRender(element)}>戳我预览</button>
                <button id="download" className="button is-link is-outlined" onClick={() => download(element)}>戳我下载</button>
            </div>
            <progress className="progress is-success" id="progress" value="0" max="100">233</progress>
            <article className="message is-warning content">
                <div className="message-body">
                    <p>Tips:</p>
                    <ol className="message-text">
                        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
                    </ol>
                </div>
            </article>
        </section >
    );
})


class Section extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Vengeful} />
                    {templates.map((item, i) =>
                        <Route key={i} path={item.url} component={item.component} />
                    )}
                </div>

            </Router>
        )
    }
}

export default Section;
export { templates, Vendors }
