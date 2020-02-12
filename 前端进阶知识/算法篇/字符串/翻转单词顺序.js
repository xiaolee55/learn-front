function ReverseSentence(str)
{
    if(!str){return ''}
    return str.split(' ').reverse().join(' ');
}