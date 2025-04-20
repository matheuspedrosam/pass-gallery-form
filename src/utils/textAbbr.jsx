export default function textAbbr(text, maxLength){
    return text.length < maxLength ? text : <abbr title={text} className='no-underline'>{text.slice(0, maxLength)}...</abbr>
}