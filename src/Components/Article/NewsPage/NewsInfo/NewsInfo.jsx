import './newsInfo.scss';

const NewsInfo = (props) => {


    return (
        <div className='news_info'>
            <p>{props.text}</p>
            <img src={props.img} alt="car" />
            <p>{props.text2}</p>
            <span className='tag'>{props.tags}</span>
        </div>
    )
}

export default NewsInfo