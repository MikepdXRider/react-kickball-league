export default function changeTimeZone(time){
    const date = new Date(time);
    return date.toLocaleDateString()
}