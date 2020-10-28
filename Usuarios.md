# AWS
## Usuarios

### administrador_200915347
* **Nombre:** Fernando Reyes
* **Rol:** Administrador
* **Descripcion:** Usuario encargado de la creacion, monitoreo y mantenimiento de Buckets en S3, Cognito, Translate, Rekognition.
* **Grupos:** Administradores
* **Politicas Asociadas:** AdministratorAccess

### semi1-cognito
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del mantenimiento de usuarios en Cognito.
* **Politicas Asociadas:** CognitoSemi1FullAccess

### semi1-rekognition
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del acceso al servicio de Rekognition.
* **Politicas Asociadas:** AmazonRekognitionFullAccess

### semi1-s3
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del mantenimiento de Buckets en S3.
* **Politicas Asociadas:** AmazonS3FullAccess

### semi1-translate
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del monitoreo de las métricas de Aws Translate.
* **Politicas Asociadas:** TranslateFullAccess

## Políticas
### CognitoSemi1FullAccess
* **Descripcion:** Política creada para el acceso seguro al Pool de usuarios en Cognito.
* **JSON:**
````js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "cognito-idp:ForgotPassword",
                "cognito-idp:GlobalSignOut",
                "cognito-idp:ConfirmSignUp",
                "cognito-idp:CreateUserPool",
                "cognito-idp:ForgetDevice",
                "cognito-idp:GetUserAttributeVerificationCode",
                "cognito-idp:InitiateAuth",
                "cognito-idp:DeleteUser",
                "cognito-idp:SetUserMFAPreference",
                "cognito-idp:GetUser",
                "cognito-idp:ConfirmForgotPassword",
                "cognito-idp:SetUserSettings",
                "cognito-idp:SignUp",
                "cognito-idp:VerifyUserAttribute",
                "cognito-idp:ListDevices",
                "cognito-idp:ListUserPools",
                "cognito-idp:AssociateSoftwareToken",
                "cognito-idp:VerifySoftwareToken",
                "cognito-idp:GetDevice",
                "cognito-idp:RespondToAuthChallenge",
                "cognito-idp:DeleteUserAttributes",
                "cognito-idp:UpdateUserAttributes",
                "cognito-idp:DescribeUserPoolDomain",
                "cognito-idp:UpdateDeviceStatus",
                "cognito-idp:ChangePassword",
                "cognito-idp:ConfirmDevice",
                "cognito-idp:ResendConfirmationCode"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "cognito-idp:*",
            "Resource": "arn:aws:cognito-idp:us-east-1:901744955927:userpool/us-east-1_M6reKjtuU"
        }
    ]
}

````
### edaral
* **Rol:** Usuario raiz
* **Descripcion:** Usuario encargado del la creacion de la funcion Lambda y la API Gateway en AWS.
* **Politicas Asociadas:** FullAccess
