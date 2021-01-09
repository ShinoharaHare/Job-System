import { Router } from 'express'
import { Types } from 'mongoose'
import { sendNots } from '@/server/notification'

const router = Router()

/*  YOUR TEST FUNCTION  */
async function testSendNots1() {
    const testUserIDs = [Types.ObjectId('5fd8d9db47ffff17921b50c9'), 
                         Types.ObjectId('5fc7c26ad9008562403f7281')];
    return await sendNots(testUserIDs, 'I’m a title for test', 
    'This is a test, this is a test. This is a test? This is a test! From testSendNots1()');
}

async function testSendNots2() {
    const testUserIDs = [Types.ObjectId('0fd0eeb94dd4a0504478a60f'), 
                         Types.ObjectId('0fc7c26ad9008562403f7281')];
    return await sendNots(testUserIDs, 'I’m a title for test', 
    'This is a test, this is a test. This is a test? This is a test! From testSendNots2()');
}

router.get('/',async(req, res) => {
    res.json({
        testSendNots1: (await testSendNots1() == 2)? "PASS" : "FAIL",
        testSendNots2: (await testSendNots2() != 2)? "PASS" : "FAIL"
    });
});



export default router