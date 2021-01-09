import { Router } from 'express'
import * as AccountBackend from '@/server/AccountBackend'
const router = Router()
router.get('/',async(req, res)=>{
    res.json({
        testGetVerCode1:await testGetVerCode1(),
        testGetVerCode2:await testGetVerCode2(),
        //testCheckVerCode2:await testCheckVerCode2(),
        testCheckVerCode3:await testCheckVerCode3(),
        testResetPassword1:await testResetPassword1(),
        testResetPassword2:await testResetPassword2(),
        testBlock1:await testBlock1(),
        testBlock2:await testBlock2(),
        testMakeID1:testMakeID1(),
        testMakeID2:testMakeID2(),
        testMakeID3:testMakeID3(),
    })
})
export default router


async function testGetVerCode1(){
    const res = await AccountBackend.getVerCode("hungjiewu@gmail.com")
    return res === 200
}

async function testGetVerCode2(){
    const res = await AccountBackend.getVerCode("123@gmail.com")
    return res === 401
}

// async function testCheckVerCode1(){
//     const res = await AccountBackend.checkVerCode("hungjiewu@gmail.com","2BJkDe")
//     return res === 200
// }

// async function testCheckVerCode2(){
//     const res = await AccountBackend.checkVerCode("hungjiewu@gmail.com","VpFOSk")
//     return res === 402
// }

async function testCheckVerCode3(){
    const res = await AccountBackend.checkVerCode("hungjiewu@gmail.com","VpFOSk")
    return res === 401
}

async function testResetPassword1(){
    const res = await AccountBackend.resetPassword("hungjiewu@gmail.com","ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
    return res === 200
}

async function testResetPassword2(){
    const res = await AccountBackend.resetPassword("123@gmail.com","ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1")
    return res === 401
}

async function testAddFavorite1(){
    const res = await AccountBackend.addFavorite(Object("5fe3444644aeb23ee87a38d8"),Object("5fda358ce62d0018189a0961"))
    return res === 200
}

async function testAddFavorite2(){
    const res = await AccountBackend.addFavorite(Object("5fe3444644aeb23ee87a38d8"),Object("8fda358ce62d0018189a0961"))
    return res === 401
}

async function testBlock1(){
    const res = await AccountBackend.block(Object("5fe3444644aeb23ee87a38d8"),Object("5fd0eeb94dd4a0504478a60f"))
    return res === 200
}

async function testBlock2(){
    const res = await AccountBackend.block(Object("5fe3444644aeb23ee87a38d8"),Object("8fd0eeb94dd4a0504478a60f"))
    return res === 401
}

function testMakeID1(){
    const res = AccountBackend.makeid(5)
    return res.length === 5
}

function testMakeID2(){
    const res = AccountBackend.makeid(-1)
    return res.length === 0
}

function testMakeID3(){
    const res = AccountBackend.makeid(100)
    return res.length === 100
}

