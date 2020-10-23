/* 
    ######################################################
    Controlador para el manejo de usuarios
        1. Login
        2. Registro
        3. Actualización de pérfil
        4. Obtener usuario
        5. Obtener listado de usuarios que no son amigos
        6. Obtener listado de usuarios que son amigos
        7. Agregar amigo
    ######################################################
*/
const mongoModel = require('../models/mongoModel');
const sha1 = require('sha1');
var uuid = require('uuid');
const AWS = require('aws-sdk');
const awsBucket = require('../aws/bucket');
const awsCognito = require('../aws/cognito');
const awsKeys = require('../aws/keys');
//AWS
const s3 = new AWS.S3(awsKeys.s3);
const cognito = new AWS.CognitoIdentityServiceProvider(awsKeys.cognito);

const login = async(req, res) => {
    let body = req.body;

    let username = body.user;
    let password = sha1(body.pass);

    let user = await mongoModel.User.findOne({ username: username, password : password},{ username:1, fullname:2, profileImage:3, modeBot:4, friends:5});
    if(user){
        res.send({
            status : 200,
            message : 'Credenciales correctas',
            user : user
        });
    }
    else{
        res.send({
            status : 400,
            message : 'Usuario o contraseña no valido'
        });
    }
};

const signin = async (req, res) => {
    let body = req.body;

    let username = body.user;
    let fullname = body.name;
    let password = sha1(body.pass);

    if(body.sourceBase64){
        //decoded image
        let base64 = body.sourceBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let bufferSource = new Buffer.from(base64[2], 'base64');
        let extension = base64[1].split('/')[1];
        //creando nombre de imagen
        let filename = `${username}-${uuid()}.${extension}`; 
        let filepath = `${awsBucket.filepath.users}${filename}`;
        //creando parametros para imagen
        let paramsUploadImage = {
            Bucket : awsBucket.name,
            Key : filepath,
            Body : bufferSource,
            ACL: 'public-read'
        }

        let userFound = await mongoModel.User.findOne({ username : username });

        if(userFound){
            res.send({
                status : 400,
                message : `El usuario '${username}' ya existe.`
            });
        }
        else{
            //subiendo imagen
            let uploadImage = await s3.upload(paramsUploadImage).promise();
            if(uploadImage){
                let newUser = {
                    username : username,
                    fullname : fullname,
                    password : password,
                    profileImage : uploadImage.Location,
                    modeBot : false,
                    friends : []
                };

                let paramsCognito = {
                    UserPoolId : awsCognito.idPool,
                    Username : username,
                    TemporaryPassword : "Abc@4321",
                    UserAttributes : [
                        {
                            Name : awsCognito.parameters.fullname,
                            Value : fullname
                        },
                        {
                            Name : awsCognito.parameters.password,
                            Value : password
                        },
                        {
                            Name : awsCognito.parameters.modeBot,
                            Value : "false"
                        }
                    ]
                };
    
                cognito.adminCreateUser(paramsCognito, (error, data) =>{
                    if(error){
                        console.log('Error al crear usuario cognito: ', error);
                    }
                });

                let userCreated = await mongoModel.User.create(newUser);
                if(userCreated){
                    res.send({
                        status : 200,
                        message : `Se creo el usuario '${username}'.`
                    });
                }
                else{
                    res.send({
                        status : 400,
                        message : `Error al crear el usuario '${username}'.`
                    });
                }
            }
            else{
                res.send({
                    status : 400,
                    message : `Error al subir imagen '${filename}'.`
                });
            }
        }
    }
    else{
        //usuario sin imagen
        let newUser = {
            username : username,
            fullname : fullname,
            password : password,
            profileImage : '',
            modeBot : false,
            friends : []
        };

        let userFound = await mongoModel.User.findOne({ username : username });

        if(userFound){
            res.send({
                status : 400,
                message : `El usuario '${username}' ya existe.`
            });
        }
        else{
            let paramsCognito = {
                UserPoolId : awsCognito.idPool,
                Username : username,
                TemporaryPassword : "Abc@4321",
                UserAttributes : [
                    {
                        Name : awsCognito.parameters.fullname,
                        Value : fullname
                    },
                    {
                        Name : awsCognito.parameters.password,
                        Value : password
                    },
                    {
                        Name : awsCognito.parameters.modeBot,
                        Value : "false"
                    }
                ]
            };

            cognito.adminCreateUser(paramsCognito, (error, data) =>{
                if(error){
                    console.log('Error al crear usuario cognito: ', error);
                }
            });

            let userCreated = await mongoModel.User.create(newUser);
            if(userCreated){
                res.send({
                    status : 200,
                    message : `Se creo el usuario '${username}'.`
                });
            }
            else{
                res.send({
                    status : 400,
                    message : `Error al crear el usuario '${username}'.`
                });
            }
        }
    }
};

const update = async (req, res) => {
    const {_id} = req.params;
    let body = req.body;
    
    let username = body.user;
    let fullname = body.name;
    let password = sha1(body.pass);
    let modeBot = body.modeBot;
    
    let user = await mongoModel.User.findOne({"_id" : _id, password : password});
    if(user){
        //si cambio username
        let updateUser = true;
        if(user.username != username){
            let findUser = await mongoModel.User.findOne({ username: username });
            if(findUser){
                updateUser = false;
                res.send({
                    status : 400,
                    message : `El usuario '${username}' ya existe.`
                });
            }
        }

        if(updateUser){
            if(body.sourceBase64){
                //decoded image
                let base64 = body.sourceBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                let bufferSource = new Buffer.from(base64[2], 'base64');
                let extension = base64[1].split('/')[1];
                //creando nombre de imagen
                let filename = `${username}-${uuid()}.${extension}`; 
                let filepath = `${awsBucket.filepath.users}${filename}`;
                //creando parametros para imagen
                let paramsUploadImage = {
                    Bucket : awsBucket.name,
                    Key : filepath,
                    Body : bufferSource,
                    ACL: 'public-read'
                }

                //subiendo imagen
                let uploadImage = await s3.upload(paramsUploadImage).promise();
                if(uploadImage){
                    let newUser = {
                        username : username == undefined ? user.username : username,
                        fullname : fullname == undefined ? user.fullname : fullname,
                        profileImage : uploadImage.Location,
                        modeBot : modeBot == undefined ? user.modeBot : modeBot
                    };

                    //actualizando cognito
                    if(user.username != username){
                        //eliminar el registro anterior y vuelve a crear uno
                        let paramsCognito = {
                            UserPoolId : awsCognito.idPool,
                            Username : username,
                            TemporaryPassword : "Abc@4321",
                            UserAttributes : [
                                {
                                    Name : awsCognito.parameters.fullname,
                                    Value : newUser.fullname
                                },
                                {
                                    Name : awsCognito.parameters.password,
                                    Value : user.password
                                },
                                {
                                    Name : awsCognito.parameters.modeBot,
                                    Value : newUser.modeBot.toString()
                                }
                            ]
                        };
            
                        cognito.adminCreateUser(paramsCognito, (error, data) =>{
                            if(error){
                                console.log('Error al crear usuario cognito: ', error);
                            }
                            else{
                                paramsCognito = {
                                    UserPoolId : awsCognito.idPool,
                                    Username : user.username
                                };

                                cognito.adminDeleteUser(paramsCognito, (error, data) =>{
                                    if(error){
                                        console.log('Error al eliminar usuario cognito: ', error);
                                    }
                                });
                            }
                        });
                    }
                    else{
                        //actualiza parametros
                        let paramsCognito = {
                            UserPoolId : awsCognito.idPool,
                            Username : username,
                            UserAttributes : [
                                {
                                    Name : awsCognito.parameters.fullname,
                                    Value : newUser.fullname
                                },
                                {
                                    Name : awsCognito.parameters.modeBot,
                                    Value : newUser.modeBot.toString()
                                }
                            ]
                        };
            
                        cognito.adminUpdateUserAttributes(paramsCognito, (error, data) =>{
                            if(error){
                                console.log('Error al actualizar usuario cognito: ', error);
                            }
                        });
                    }

                    await mongoModel.User.updateOne({"_id" : _id}, {$set : newUser})
                        .then(()=>{
                            res.send({
                                status : 200,
                                message : `Usuario actualizado.`,
                                user : newUser
                            });
                        })
                        .catch((err)=>{
                            res.send({
                                status : 400,
                                message : `Error al actualizar usuario.`,
                                err : err
                            });
                        });
                }
                else{
                    res.send({
                        status : 400,
                        message : `Error al subir imagen '${filename}'.`
                    });
                }
            }
            else{
                //usuario sin imagen
                let newUser = {
                    username : username == undefined ? user.username : username,
                    fullname : fullname == undefined ? user.fullname : fullname,
                    modeBot : modeBot == undefined ? user.modeBot : modeBot
                };

                //actualizando cognito
                if(user.username != username){
                    //eliminar el registro anterior y vuelve a crear uno
                    let paramsCognito = {
                        UserPoolId : awsCognito.idPool,
                        Username : username,
                        TemporaryPassword : "Abc@4321",
                        UserAttributes : [
                            {
                                Name : awsCognito.parameters.fullname,
                                Value : newUser.fullname
                            },
                            {
                                Name : awsCognito.parameters.password,
                                Value : user.password
                            },
                            {
                                Name : awsCognito.parameters.modeBot,
                                Value : newUser.modeBot.toString()
                            }
                        ]
                    };
        
                    cognito.adminCreateUser(paramsCognito, (error, data) =>{
                        if(error){
                            console.log('Error al crear usuario cognito: ', error);
                        }
                        else{
                            paramsCognito = {
                                UserPoolId : awsCognito.idPool,
                                Username : user.username
                            };

                            cognito.adminDeleteUser(paramsCognito, (error, data) =>{
                                if(error){
                                    console.log('Error al eliminar usuario cognito: ', error);
                                }
                            });
                        }
                    });
                }
                else{
                    //actualiza parametros
                    let paramsCognito = {
                        UserPoolId : awsCognito.idPool,
                        Username : username,
                        UserAttributes : [
                            {
                                Name : awsCognito.parameters.fullname,
                                Value : newUser.fullname
                            },
                            {
                                Name : awsCognito.parameters.modeBot,
                                Value : newUser.modeBot.toString()
                            }
                        ]
                    };
        
                    cognito.adminUpdateUserAttributes(paramsCognito, (error, data) =>{
                        if(error){
                            console.log('Error al actualizar usuario cognito: ', error);
                        }
                    });
                }

                await mongoModel.User.updateOne({"_id" : _id}, {$set : newUser})
                    .then(()=>{
                        res.send({
                            status : 200,
                            message : `Usuario actualizado.`,
                            user : newUser
                        });
                    })
                    .catch((err)=>{
                        res.send({
                            status : 400,
                            message : `Error al actualizar usuario.`,
                            err : err
                        });
                    });
            }
        }
    }
    else{
        res.send({
            status : 400,
            message : `Usuario o contraseña no valido.`
        });
    }
};

const getOne = async (req, res) => {
    const {_id} = req.params;

    let user = await mongoModel.User.findOne({ "_id": _id },{ username:1, fullname:2, profileImage:3, modeBot:4, friends:5 });
    if(user){
        res.send({
            status : 200,
            user : user
        });
    }
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`
        });
    }
};

const getNotFriends = async (req, res) => {
    const {_id} = req.params;

    let user = await mongoModel.User.findById(_id);
    if(user){
        let users = await mongoModel.User.find({
            $and : [
                { username: { $ne : user.username } },
                { _id : { $nin : user.friends } }
            ] 
        }).select('username fullname profileImage modeBot friends').exec();

        res.send({
            status : 200,
            users : users
        });
    }
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`,
            users : []
        });
    }
};

const getFriends = async (req, res) => {
    const {_id} = req.params;

    let user = await mongoModel.User.findById(_id);
    if(user){
        let friends = await mongoModel.User.find({
            _id : { $in : user.friends}
        }).select('username fullname profileImage modeBot friends').exec();

        res.send({
            status : 200,
            users : friends
        });
    }
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`,
            users : []
        });
    }
};

const addFriend = async (req, res) => {
    let body = req.body;

    let currentUser = body.currentUser;
    let userFriend = body.userFriend;

    let user = await mongoModel.User.updateOne({_id : currentUser}, { $addToSet: {friends : userFriend} });

    if(user){
        res.send({
            status : 200,
            message : `Se agrego correctamente '${userFriend}'.`
        });
    }
    else{
        res.send({
            status : 400,
            message : `Error al actualizar usuario '${currentUser}'.`
        });
    }

};

module.exports = {
    login,
    signin,
    update,
    getOne,
    getNotFriends,
    getFriends,
    addFriend
};