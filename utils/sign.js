import md5 from "js-md5"
export default function getSign(timeStrap){
    const secret = 'lmqwhosyourdaddy666';
    return md5(timeStrap + secret)
}