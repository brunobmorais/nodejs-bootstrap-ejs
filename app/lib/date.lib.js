
module.exports.getDateDatabase = () =>{
    let date = new Date();
    let dateformat = (date.getFullYear() + "-" + ((date.getMonth() + 1)) + "-" + (date.getDate())+" "+date.getHours()+":"+date.getMinutes()) ;
    return dateformat;
};