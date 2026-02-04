const {db, firebaseAdmin} = require('../config/firebase');

const userExist = async(phoneNum) => {

    //check phone number exist
    const userQuery = await db.collection('users')
    .where('phoneNum', '==', phoneNum)
    .get()

    if(!userQuery.empty) return true;
    return false;
}

module.exports = userExist;