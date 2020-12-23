import { Types } from 'mongoose'
import { Account } from '@/server/models'

export const sendNots = (users: Types.ObjectId[], title: string, messege: string) => { // type???
    //                (condition, )
    Account.updateMany({
        _id: { "$in": users }
    }, {
        "$push": {
            notification: {
                name: title,
                content: messege
            }
        }
    }, (err, result)=>{
        if(err){
            console.error(err);
        }else{
            console.log(result);
            return 'done';  //  test 
        }
    })
}

// 未完成!!!!!  // 將使用者特定通知設定為已讀
export const messageSetRead = (userId: any, msgId: any)=>{
    // Object attribute is a bad idea!!!!!!!!!!!!!!!!
    // https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay?answertab=votes#tab-top
    return;
    Account.findOne({
        _id: userId,
        notification: { 
            _id: msgId
        }
    }, (err, result)=>{
        if(err){
            console.error(err);
        }else{
            console.log(result);
            return 'done';
        }
    })
}
