/* 
    ######################################################
    Controlador para el manejo de publicaciones
        1. Crear publicación
        2. Obtener publicaciones
        3. Obtener filtro de publicaciones
        4. Traducir descripcion publicación
    ######################################################
*/

const mongoModel = require('../models/mongoModel');
const AWS = require('aws-sdk');
var uuid = require('uuid');
const awsBucket = require('../aws/bucket');
const awsKeys = require('../aws/keys');
//AWS
const s3 = new AWS.S3(awsKeys.s3);
const rekognition = new AWS.Rekognition(awsKeys.rekognition);
const awsTranslate = new AWS.Translate(awsKeys.translate);

const create = async(req, res) => {
    let body = req.body;

    let description = body.description;
    let _id = body._id;

    let user = await mongoModel.User.findById(_id);
    if(user){
        //decoded image
        let base64 = body.sourceBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let bufferSource = new Buffer.from(base64[2], 'base64');
        let extension = base64[1].split('/')[1];
        //creando nombre de imagen
        let filename = `${user.username}-${uuid()}.${extension}`; 
        let filepath = `${awsBucket.filepath.publications}${filename}`;
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
            const imagen = uploadImage.Location.replace('https://bucket-proyecto2-grupo21.s3.amazonaws.com/', '');
            //detectando etiquetas
            let paramsRekognition = {
                Image : {
                    S3Object:
                    {
                        Bucket: awsBucket.name,
                        Name: imagen
                    }
                },
                MinConfidence : 90
            };

            let detectedLabels = await rekognition.detectLabels(paramsRekognition).promise();
            if(detectedLabels){
                let labels = [];
                for(const element of detectedLabels.Labels){
                    labels.push(element.Name.trim());
                }

                let newPublication = {
                    image : uploadImage.Location,
                    description : description,
                    date_iso : new Date(),
                    idUser : _id,
                    labels : labels
                };

                let publicationCreated = await mongoModel.Publication.create(newPublication);
                if(publicationCreated){
                    res.send({
                        status : 200,
                        message : `Se creo la publicación`
                    });
                }
                else{
                    res.send({
                        status : 400,
                        message : `Error al crear publicación`
                    });
                }
            }
            else{
                res.send({
                    status : 400,
                    message : `Error al detectar etiquetas.`
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
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`
        });
    }
};

const getAll = async(req, res) => {
    const {_id, filter} = req.params;

    let user = await mongoModel.User.findById(_id);
    if(user){
        let params = {};
        if(filter == undefined || filter.toLocaleLowerCase() == 'all'){
            params = {
                $or : [
                    { idUser : _id },
                    { idUser : { $in : user.friends } }
                ] 
            };
        }
        else{
            params = {
                $and : [
                    {
                        $or : [
                            { idUser : _id },
                            { idUser : { $in : user.friends } }
                        ]
                    },
                    {
                        labels : filter
                    }
                ]
            };
        }

        let publications = await mongoModel.Publication.find(params).sort({ date_iso : -1});
        res.send({
            status : 200,
            message : `Publicaciones`,
            publications : publications
        });
    }
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`,
            publications : []
        });
    }
};

const getFilter = async(req, res) => {
    const {_id} = req.params;

    let user = await mongoModel.User.findById(_id);
    if(user){
        let params = [
            {
                $match :
                {
                    $or : [
                        { idUser : _id },
                        { idUser : { $in : user.friends } }
                    ] 
                }
            },
            {
                $unwind : 
                {
                    path: "$labels"
                }
            },
            {
                $group :
                {
                    _id: 1, 
                    label : 
                    { 
                        $addToSet : "$labels",
                    }
                    
                }
            }
        ];

        let labels = await mongoModel.Publication.aggregate(params);
        if(labels){
            labels = labels[0].label.sort();
        }
        res.send({
            status : 200,
            message : `Filtros`,
            filters : labels
        });

    }
    else{
        res.send({
            status : 400,
            message : `No existe el usuario '${_id}'.`,
            filters : []
        });
    }
};

const translate = async(req, res) => {
    let {text} = req.body;

    let params = {
        SourceLanguageCode: 'auto',
        TargetLanguageCode: 'es',
        Text: text || 'Nothing here'
    }

    let data = await awsTranslate.translateText(params).promise();
    if(data){
        res.send({
            status : 200,
            message : `Texto traducido`,
            translate : data.TranslatedText
        });
    }
    else{
        res.send({
            status : 400,
            message : `Error al traducir texto`,
        });
    }
};

module.exports = {
    create,
    getAll,
    getFilter,
    translate
};